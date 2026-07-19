"use client"

import Link from "next/link"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { Prisma } from "@prisma/client"

type OrderWithRelations = Omit<
  Prisma.OrderGetPayload<{
    include: {
      customer: true
      orderItems: true
    }
  }>,
  "subtotal" | "discount" | "tax" | "grandTotal" | "paidAmount"
> & {
  subtotal: number
  discount: number
  tax: number
  grandTotal: number
  paidAmount: number
}

interface OrderTableProps {
  orders: OrderWithRelations[]
}

export default function OrderTable({
  orders,
}: OrderTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left">
              Order #
            </th>

            <th className="px-4 py-3 text-left">
              Customer
            </th>

            <th className="px-4 py-3 text-left">
              Items
            </th>

            <th className="px-4 py-3 text-left">
              Grand Total
            </th>

            <th className="px-4 py-3 text-left">
              Paid
            </th>

            <th className="px-4 py-3 text-left">
              Status
            </th>

            <th className="px-4 py-3 text-left">
              Payment
            </th>

            <th className="px-4 py-3 text-left">
              Date
            </th>

            <th className="px-4 py-3 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-4 font-medium">
                {order.orderNumber}
              </td>

              <td className="px-4 py-4">
                {order.customer.fullName}
              </td>

              <td className="px-4 py-4">
                {order.orderItems.length}
              </td>

              <td className="px-4 py-4 font-semibold">
                ${order.grandTotal.toFixed(2)}
              </td>

              <td className="px-4 py-4">
                ${order.paidAmount.toFixed(2)}
              </td>

              <td className="px-4 py-4">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {order.status}
                </span>
              </td>

              <td className="px-4 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {order.paymentStatus}
                </span>
              </td>

              <td className="px-4 py-4">
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td className="px-4 py-4">
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="rounded-md p-2 hover:bg-blue-100"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/admin/orders/${order.id}/edit`}
                    className="rounded-md p-2 hover:bg-yellow-100"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button className="rounded-md p-2 hover:bg-red-100">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {orders.length === 0 && (
        <div className="p-10 text-center text-muted-foreground">
          No orders found.
        </div>
      )}
    </div>
  )
}