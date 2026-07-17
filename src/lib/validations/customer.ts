import { z } from "zod"

export const customerSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Enter a valid email address").max(191),
  phone: z.string().trim().min(1, "Phone number is required").max(20),
  address: z.string().trim().max(1000).optional(),
  city: z.string().trim().max(100).optional(),
  country: z.string().trim().max(100).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  notes: z.string().trim().max(2000).optional(),
})

export type CustomerSchema = z.infer<typeof customerSchema>
