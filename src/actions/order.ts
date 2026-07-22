"use server"

import { prisma } from "@/lib/prisma"
import { orderSchema } from "@/lib/validations/order"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function generateOrderNumber(id: number) {
  return `ORD-${id.toString().padStart(6, "0")}`
}

export async function createOrder(data: unknown) {
  const parsed = orderSchema.safeParse(data)

  if (!parsed.success) {
    console.error(parsed.error.flatten())
    throw new Error("Invalid order data.")
  }

  const order = parsed.data

  await prisma.$transaction(async (tx) => {
    // Create Order
    const createdOrder = await tx.order.create({
      data: {
        orderNumber: "TEMP",
        customerId: order.customerId,
        subtotal: order.subtotal,
        discount: order.discount,
        tax: order.tax,
        grandTotal: order.grandTotal,
        paidAmount: order.paidAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        notes: order.notes,
      },
    })

    const orderNumber = generateOrderNumber(createdOrder.id)

    await tx.order.update({
      where: {
        id: createdOrder.id,
      },
      data: {
        orderNumber,
      },
    })

    // Create Order Items
    await tx.orderItem.createMany({
      data: order.items.map((item) => ({
        orderId: createdOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        total: item.total,
      })),
    })

    // Update Stock + Inventory + Inventory Movements
    for (const item of order.items) {
      const product = await tx.product.findUnique({
        where: {
          id: item.productId,
        },
        include: {
          inventory: true,
        },
      })

      if (!product) {
        throw new Error("Product not found.")
      }

      if (!product.inventory) {
        throw new Error(
          `Inventory not found for ${product.name}`
        )
      }

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} has insufficient stock.`
        )
      }

      const previousStock = product.stock

      const currentStock =
        previousStock - item.quantity

      // Update Product Stock
      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: currentStock,
        },
      })

      // Update Inventory
      await tx.inventory.update({
        where: {
          productId: product.id,
        },
        data: {
          currentStock,
          stockOut: {
            increment: item.quantity,
          },
        },
      })

      // Inventory Movement
      await tx.inventoryMovement.create({
        data: {
          productId: product.id,
          type: "STOCK_OUT",
          quantity: item.quantity,
          previousStock,
          currentStock,
          note: `Order ${orderNumber}`,
        },
      })
    }
    await tx.customer.update({
      where: {
        id: order.customerId,
      },
      data: {
        totalOrders: {
          increment: 1,
        },

        totalSpent: {
          increment: order.grandTotal,
        },

        lastOrderDate: new Date(),
      },
    })
  })

  revalidatePath("/admin/orders")
  revalidatePath("/admin/products")
  revalidatePath("/admin/inventory")

  redirect("/admin/orders")
}