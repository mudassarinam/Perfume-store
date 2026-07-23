"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function deleteOrder(
  orderId: number
) {
  await prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    })

    if (!order) {
      throw new Error("Order not found.")
    }

    if (
      order.status !== "PENDING" &&
      order.status !== "CANCELLED"
    ) {
      throw new Error(
        "Only Pending or Cancelled orders can be deleted."
      )
    }

    // If the order is still pending,
    // restore inventory and rollback customer stats.
    if (order.status === "PENDING") {
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

        if (!product || !product.inventory)
          continue

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

        await tx.inventoryMovement.create({
          data: {
            productId: product.id,
            type: "STOCK_IN",
            quantity: item.quantity,
            previousStock,
            currentStock,
            note: `Order ${order.orderNumber} Deleted`,
          },
        })
      }

      // Rollback customer statistics
      await tx.customer.update({
        where: {
          id: order.customerId,
        },
        data: {
          totalOrders: {
            decrement: 1,
          },
          totalSpent: {
            decrement: Number(order.grandTotal),
          },
        },
      })
    }

    // Delete order items
    await tx.orderItem.deleteMany({
      where: {
        orderId,
      },
    })

    // Delete order
    await tx.order.delete({
      where: {
        id: orderId,
      },
    })
  })

  revalidatePath("/admin/orders")
  revalidatePath("/admin/inventory")
  revalidatePath("/admin/customers")

  redirect("/admin/orders")
}