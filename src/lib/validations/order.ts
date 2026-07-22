import { z } from "zod"

export const orderItemSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().min(1),
  unitPrice: z.coerce.number().min(0),
  discount: z.coerce.number().min(0).default(0),
  total: z.coerce.number().min(0),
})

export const orderSchema = z.object({
  customerId: z.coerce.number().int().positive(),

  paymentMethod: z.enum([
    "CASH",
    "CARD",
    "BANK_TRANSFER",
    "JAZZCASH",
    "EASYPAISA",
  ]),

  paymentStatus: z.enum([
    "PENDING",
    "PARTIAL",
    "PAID",
    "REFUNDED",
  ]),

  subtotal: z.coerce.number().min(0),

  discount: z.coerce.number().min(0),

  tax: z.coerce.number().min(0),

  grandTotal: z.coerce.number().min(0),

  paidAmount: z.coerce.number().min(0),

  notes: z.string().optional(),

  items: z.array(orderItemSchema).min(1),
})

export type OrderInput = z.infer<typeof orderSchema>