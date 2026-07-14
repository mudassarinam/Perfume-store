import { z } from "zod"

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),

  sku: z.string().min(1, "SKU is required"),

  barcode: z.string().optional(),

  categoryId: z.coerce.number().min(1, "Category is required"),

  brandId: z.coerce.number().min(1, "Brand is required"),

  gender: z.enum(["MALE", "FEMALE", "BOTH"]),
  price: z.coerce.number().min(0),

  costPrice: z.coerce.number().min(0),

  discount: z.coerce.number().min(0).default(0),

  stock: z.coerce.number().min(0),

  volume: z.string().optional(),

  description: z.string().optional(),

  featured: z.boolean().default(false),

  newArrival: z.boolean().default(false),

  topSeller: z.boolean().default(false),
})

export type ProductSchema = z.infer<typeof productSchema>