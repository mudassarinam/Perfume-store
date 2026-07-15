"use server"

import { prisma } from "@/lib/prisma"
import { productSchema } from "@/lib/validations/product"
import { redirect } from "next/navigation"

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
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
      slug: generateSlug(data.name),
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

  await prisma.product.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      slug: generateSlug(data.name),
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

  redirect("/admin/products")
}