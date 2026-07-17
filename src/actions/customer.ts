"use server"

import { prisma } from "@/lib/prisma"
import { customerSchema } from "@/lib/validations/customer"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

function getCustomerData(formData: FormData) {
  const data = customerSchema.parse({
    firstName: formData.get("firstName"), lastName: formData.get("lastName"),
    email: formData.get("email"), phone: formData.get("phone"),
    address: formData.get("address") || undefined, city: formData.get("city") || undefined,
    country: formData.get("country") || undefined, status: formData.get("status"),
    notes: formData.get("notes") || undefined,
  })
  return { ...data, fullName: `${data.firstName} ${data.lastName}` }
}

export async function createCustomer(formData: FormData) {
  const data = getCustomerData(formData)
  const existingCustomer = await prisma.customer.findUnique({ where: { email: data.email } })
  if (existingCustomer) throw new Error("A customer with this email already exists.")
  await prisma.customer.create({ data })
  revalidatePath("/admin/customers")
  redirect("/admin/customers")
}

export async function updateCustomer(formData: FormData) {
  const id = Number(formData.get("id"))
  if (!Number.isInteger(id) || id < 1) throw new Error("Customer ID is required.")
  const data = getCustomerData(formData)
  const existingCustomer = await prisma.customer.findFirst({ where: { email: data.email, NOT: { id } } })
  if (existingCustomer) throw new Error("A customer with this email already exists.")
  await prisma.customer.update({ where: { id }, data })
  revalidatePath("/admin/customers")
  redirect(`/admin/customers/${id}`)
}

export async function deleteCustomer(id: number) {
  try {
    await prisma.customer.delete({ where: { id } })
    revalidatePath("/admin/customers")
  } catch {
    throw new Error("Unable to delete this customer because they may have existing orders.")
  }
}
