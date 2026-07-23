"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function cancelOrder(
  orderId: number
) {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        customer: true,
        orderItems: true,
      },
    })

    if (!order) {
      throw new Error("Order not found.")
    }

    if (order.status === "CANCELLED") {
      throw new Error(
        "Order is already cancelled."
      )
    }

    // Restore inventory
    for (const item of order.orderItems) {
      const product =
        await tx.product.findUnique({
          where: {
            id: item.productId,
          },
          include: {
            inventory: true,
          },
        })

      if (!product || !product.inventory) {
        continue
      }

      const previousStock = product.stock
      const currentStock =
        previousStock + item.quantity

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: currentStock,
        },
      })

      await tx.inventory.update({
        where: {
          productId: product.id,
        },
        data: {
          currentStock,
          stockIn: {
            increment: item.quantity,
          },
        },
      })

      console.log(`Order ${order.orderNumber} Cancelled`)
      await tx.inventoryMovement.create({
        data: {
          productId: product.id,
          type: "STOCK_IN",
          quantity: item.quantity,
          previousStock,
          currentStock,
          note: `Order ${order.orderNumber} Cancelled`,
        },
      })
    }

    // Update customer statistics
    await tx.customer.update({
      where: {
        id: order.customerId,
      },
      data: {
        totalOrders: {
          decrement: 1,
        },
        totalSpent: {
          decrement: order.grandTotal,
        },
      },
    })

    // Cancel order
    await tx.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: "CANCELLED",
      },
    })
  })

  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${orderId}`)

  redirect("/admin/orders")
}