import { notFound } from "next/navigation"

import PageHeader from "@/components/common/PageHeader"
import OrderDetails from "@/components/orders/OrderDetails"

import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function OrderDetailsPage({
  params,
}: Props) {
  const { id } = await params

  const order = await prisma.order.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      customer: true,
      orderItems: {
        include: {
          product: true,
        },
      },
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

    orderItems: order.orderItems.map((item) => ({
      ...item,
      unitPrice: Number(item.unitPrice),
      discount: Number(item.discount),
      total: Number(item.total),
    })),
  }

  return (
    <>
      <PageHeader
        title={`Order ${serializedOrder.orderNumber}`}
        description="View complete order details"
      />

      <OrderDetails order={serializedOrder} />
    </>
  )
}