"use server"

import { prisma } from "@/lib/prisma"
import { productSchema } from "@/lib/validations/product"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

function generateSlug(name: string, sku: string) {
  const nameSlug = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .slice(0, 150)
  const skuSlug = sku
    .toLowerCase()
    .trim()
    .replace(/[^\w-]/g, "")
    .slice(0, 40)

  return `${nameSlug || "product"}-${skuSlug || "item"}`
}

export async function createProduct(formData: FormData) {
  const data = productSchema.parse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    barcode: formData.get("barcode") || undefined,
    categoryId: formData.get("categoryId"),
    brandId: formData.get("brandId"),
    gender: formData.get("gender"),
    price: formData.get("price"),
    costPrice: formData.get("costPrice"),
    discount: formData.get("discount") || 0,
    stock: formData.get("stock"),
    volume: formData.get("volume") || undefined,
    description: formData.get("description") || undefined,
    featured: formData.get("featured") === "on",
    newArrival: formData.get("newArrival") === "on",
    topSeller: formData.get("topSeller") === "on",
  })

  const existing = await prisma.product.findUnique({
    where: {
      sku: data.sku,
    },
  })

  if (existing) {
    throw new Error("SKU already exists.")
  }

  await prisma.product.create({
    data: {
      name: data.name,
      slug: generateSlug(data.name, data.sku),
      sku: data.sku,
      barcode: data.barcode,
      gender: data.gender,
      price: data.price,
      costPrice: data.costPrice,
      discount: data.discount,
      stock: data.stock,
      volume: data.volume,
      description: data.description,
      featured: data.featured,
      newArrival: data.newArrival,
      topSeller: data.topSeller,
      status: "ACTIVE",
      categoryId: data.categoryId,
      brandId: data.brandId,
      inventory: {
        create: {
          currentStock: data.stock,
          stockIn: data.stock,
        },
      },
      stockMovements: data.stock > 0 ? {
        create: {
          type: "STOCK_IN",
          quantity: data.stock,
          previousStock: 0,
          currentStock: data.stock,
          note: "Initial stock",
        },
      } : undefined,
    },
  })

  redirect("/admin/products")
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"))

  if (!id) {
    throw new Error("Product ID is required.")
  }

  const data = productSchema.parse({
    name: formData.get("name"),
    sku: formData.get("sku"),
    barcode: formData.get("barcode") || undefined,
    categoryId: formData.get("categoryId"),
    brandId: formData.get("brandId"),
    gender: formData.get("gender"),
    price: formData.get("price"),
    costPrice: formData.get("costPrice"),
    discount: formData.get("discount") || 0,
    stock: formData.get("stock"),
    volume: formData.get("volume") || undefined,
    description: formData.get("description") || undefined,
    featured: formData.get("featured") === "on",
    newArrival: formData.get("newArrival") === "on",
    topSeller: formData.get("topSeller") === "on",
  })

  const existingSku = await prisma.product.findFirst({
    where: {
      sku: data.sku,
      NOT: {
        id,
      },
    },
  })

  if (existingSku) {
    throw new Error("SKU already exists.")
  }

  await prisma.$transaction(async (transaction) => {
    const product = await transaction.product.findUnique({
      where: { id },
      include: { inventory: true },
    })

    if (!product) {
      throw new Error("Product not found.")
    }

    const previousStock = product.inventory?.currentStock ?? product.stock

    await transaction.product.update({
      where: { id },
      data: {
      name: data.name,
      slug: generateSlug(data.name, data.sku),
      sku: data.sku,
      barcode: data.barcode,
      gender: data.gender,
      price: data.price,
      costPrice: data.costPrice,
      discount: data.discount,
      stock: data.stock,
      volume: data.volume,
      description: data.description,
      featured: data.featured,
      newArrival: data.newArrival,
      topSeller: data.topSeller,
      categoryId: data.categoryId,
      brandId: data.brandId,
      },
    })

    if (!product.inventory || previousStock !== data.stock) {
      const difference = data.stock - previousStock

      await transaction.inventory.upsert({
        where: { productId: id },
        create: {
          productId: id,
          currentStock: data.stock,
          stockIn: product.inventory && difference > 0 ? difference : 0,
          stockOut: product.inventory && difference < 0 ? Math.abs(difference) : 0,
        },
        update: {
          currentStock: data.stock,
          stockIn: difference > 0 ? { increment: difference } : undefined,
          stockOut: difference < 0 ? { increment: Math.abs(difference) } : undefined,
        },
      })

      if (difference !== 0) {
        await transaction.inventoryMovement.create({
          data: {
            productId: id,
            type: "ADJUSTMENT",
            quantity: difference,
            previousStock,
            currentStock: data.stock,
            note: "Product stock updated",
          },
        })
      }
    }
  })

  redirect("/admin/products")
}

export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    })

    revalidatePath("/admin/products")
  } catch {
    throw new Error(
      "Unable to delete product. It may be referenced by other records."
    )
  }
}
