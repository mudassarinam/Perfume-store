import { notFound } from "next/navigation"

import PageHeader from "@/components/common/PageHeader"
import EditOrderForm from "@/components/orders/EditOrderForm"

import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function EditOrderPage({
  params,
}: Props) {
  const { id } = await params

  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!order) {
    notFound()
  }

  const serializedOrder = {
    ...order,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    tax: Number(order.tax),
    grandTotal: Number(order.grandTotal),
    paidAmount: Number(order.paidAmount),
  }

  return (
    <>
      <PageHeader
        title={`Edit ${serializedOrder.orderNumber}`}
        description="Update order information"
      />

      <EditOrderForm
        order={serializedOrder}
      />
    </>
  )
}