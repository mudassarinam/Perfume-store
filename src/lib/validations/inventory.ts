import { z } from "zod"

export const inventoryAdjustmentSchema = z.object({
  productId: z.coerce.number().int().positive(),
  type: z.enum(["STOCK_IN", "STOCK_OUT", "ADJUSTMENT"]),
  quantity: z.coerce.number().int(),
  note: z.string().trim().max(500).optional(),
}).superRefine((data, context) => {
  if (data.type === "ADJUSTMENT") {
    if (data.quantity === 0) {
      context.addIssue({ code: "custom", message: "Adjustment cannot be zero.", path: ["quantity"] })
    }
    return
  }

  if (data.quantity <= 0) {
    context.addIssue({ code: "custom", message: "Quantity must be greater than zero.", path: ["quantity"] })
  }
})
