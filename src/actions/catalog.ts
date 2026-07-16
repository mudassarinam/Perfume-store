"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const categorySchema = z.object({ name: z.string().trim().min(2).max(191), description: z.string().trim().max(1000).optional() })
const brandSchema = z.object({ name: z.string().trim().min(2).max(191), description: z.string().trim().max(1000).optional(), website: z.string().trim().url().max(255).optional() })

export async function createCategory(formData: FormData) {
  const data = categorySchema.parse({ name: formData.get("name"), description: formData.get("description") || undefined })
  await prisma.category.create({ data })
  revalidatePath("/admin/categories")
}

export async function createBrand(formData: FormData) {
  const data = brandSchema.parse({ name: formData.get("name"), description: formData.get("description") || undefined, website: formData.get("website") || undefined })
  await prisma.brand.create({ data })
  revalidatePath("/admin/brands")
}
