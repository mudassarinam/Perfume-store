import {
  CircleCheck,
  CircleDashed,
  DollarSign,
  ShoppingCart,
} from "lucide-react"

import PageHeader from "@/components/common/PageHeader"
import OrderCard from "@/components/orders/OrderCard"
import OrderToolbar from "@/components/orders/OrderToolbar"
import OrderFilters from "@/components/orders/OrderFilters"
import OrderTable from "@/components/orders/OrderTable"
import OrderPagination from "@/components/orders/OrderPagination"

import { prisma } from "@/lib/prisma"

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const serializedOrders = orders.map((order) => ({
  ...order,
  subtotal: Number(order.subtotal),
  discount: Number(order.discount),
  tax: Number(order.tax),
  grandTotal: Number(order.grandTotal),
  paidAmount: Number(order.paidAmount),

  customer: {
    ...order.customer,
    totalSpent: Number(order.customer.totalSpent),
  },

  orderItems: order.orderItems.map((item) => ({
    ...item,
    unitPrice: Number(item.unitPrice),
    discount: Number(item.discount),
    total: Number(item.total),
  })),
}))

  const pendingOrders = serializedOrders.filter(
    (order) => order.status === "PENDING"
  ).length

  const deliveredOrders = serializedOrders.filter(
    (order) => order.status === "DELIVERED"
  ).length

  const totalRevenue = serializedOrders.reduce(
    (sum, order) => sum + order.grandTotal,
    0
  )

  return (
    <>
      <PageHeader
        title="Orders"
        description="Manage customer orders"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OrderCard
          title="Total Orders"
          value={serializedOrders.length}
          icon={<ShoppingCart size={20} />}
        />

        <OrderCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<CircleDashed size={20} />}
          tone="text-yellow-600"
        />

        <OrderCard
          title="Delivered Orders"
          value={deliveredOrders}
          icon={<CircleCheck size={20} />}
          tone="text-green-600"
        />

        <OrderCard
          title="Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSign size={20} />}
          tone="text-blue-600"
        />
      </div>

      <OrderToolbar />

      <OrderFilters />

      <OrderTable
        orders={serializedOrders}
      />

      <OrderPagination
        total={serializedOrders.length}
      />
    </>
  )
}