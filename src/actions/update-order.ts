"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

interface UpdateOrderData {
  id: number
  status: string
  paymentStatus: string
  paidAmount: number
  notes: string
}

export async function updateOrder(
  data: UpdateOrderData
) {
  await prisma.order.update({
    where: {
      id: data.id,
    },
    data: {
      status: data.status as any,
      paymentStatus: data.paymentStatus as any,
      paidAmount: data.paidAmount,
      notes: data.notes,
    },
  })

  revalidatePath("/admin/orders")
  revalidatePath(`/admin/orders/${data.id}`)
  revalidatePath(`/admin/orders/${data.id}/edit`)

  redirect("/admin/orders")
}