"use server"

import { prisma } from "@/lib/prisma"
import { inventoryAdjustmentSchema } from "@/lib/validations/inventory"
import { revalidatePath } from "next/cache"

export async function adjustInventory(formData: FormData) {
  const data = inventoryAdjustmentSchema.parse({
    productId: formData.get("productId"),
    type: formData.get("type"),
    quantity: formData.get("quantity"),
    note: formData.get("note") || undefined,
  })

  await prisma.$transaction(async (transaction) => {
    const product = await transaction.product.findUnique({
      where: { id: data.productId },
      include: { inventory: true },
    })

    if (!product) {
      throw new Error("Product not found.")
    }

    const previousStock = product.inventory?.currentStock ?? product.stock
    const signedQuantity = data.type === "STOCK_OUT" ? -data.quantity : data.quantity
    const currentStock = previousStock + signedQuantity

    if (currentStock < 0) {
      throw new Error("Stock out quantity exceeds available stock.")
    }

    await transaction.inventory.upsert({
      where: { productId: product.id },
      create: {
        productId: product.id,
        currentStock,
        stockIn: data.type === "STOCK_IN" ? data.quantity : 0,
        stockOut: data.type === "STOCK_OUT" ? data.quantity : 0,
      },
      update: {
        currentStock,
        stockIn: data.type === "STOCK_IN" ? { increment: data.quantity } : undefined,
        stockOut: data.type === "STOCK_OUT" ? { increment: data.quantity } : undefined,
      },
    })

    await transaction.product.update({
      where: { id: product.id },
      data: { stock: currentStock },
    })

    await transaction.inventoryMovement.create({
      data: {
        productId: product.id,
        type: data.type,
        quantity: signedQuantity,
        previousStock,
        currentStock,
        note: data.note,
      },
    })
  })

  revalidatePath("/admin/inventory")
  revalidatePath("/admin/products")
  revalidatePath("/admin")
}
