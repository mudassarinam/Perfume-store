import { Prisma } from "@prisma/client"
import CancelOrderButton from "./CancelOrderButton"
import DeleteOrderButton from "./DeleteOrderButton"

type OrderWithRelations = Omit<
  Prisma.OrderGetPayload<{
    include: {
      customer: true
      orderItems: {
        include: {
          product: true
        }
      }
    }
  }>,
  "subtotal" | "discount" | "tax" | "grandTotal" | "paidAmount"
> & {
  subtotal: number
  discount: number
  tax: number
  grandTotal: number
  paidAmount: number
  orderItems: (Omit<
    Prisma.OrderItemGetPayload<{
      include: {
        product: true
      }
    }>,
    "unitPrice" | "discount" | "total"
  > & {
    unitPrice: number
    discount: number
    total: number
  })[]
}

interface Props {
  order: OrderWithRelations
}

export default function OrderDetails({
  order,
}: Props) {
  return (
    <div className="space-y-6">
      {/* Customer + Order Info */}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Customer Information
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Name:</strong>{" "}
              {order.customer.fullName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.customer.email || "-"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.customer.phone}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {order.customer.address || "-"}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Order Information
          </h2>

          <div className="space-y-2">
            <p>
              <strong>Order #:</strong>{" "}
              {order.orderNumber}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentStatus}
            </p>

            <p>
              <strong>Method:</strong>{" "}
              {order.paymentMethod || "-"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">
                Product
              </th>

              <th className="px-4 py-3 text-right">
                Qty
              </th>

              <th className="px-4 py-3 text-right">
                Unit Price
              </th>

              <th className="px-4 py-3 text-right">
                Discount
              </th>

              <th className="px-4 py-3 text-right">
                Total
              </th>
            </tr>
          </thead>

          <tbody>
            {order.orderItems.map((item) => (
              <tr
                key={item.id}
                className="border-t"
              >
                <td className="px-4 py-3">
                  {item.product.name}
                </td>

                <td className="px-4 py-3 text-right">
                  {item.quantity}
                </td>

                <td className="px-4 py-3 text-right">
                  $
                  {item.unitPrice.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right">
                  $
                  {item.discount.toFixed(2)}
                </td>

                <td className="px-4 py-3 text-right font-semibold">
                  $
                  {item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Order Summary
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>
              ${order.subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>
            <span>
              ${order.discount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>
              ${order.tax.toFixed(2)}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Grand Total</span>
            <span>
              ${order.grandTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Paid</span>
            <span>
              ${order.paidAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between font-semibold text-red-600">
            <span>Balance</span>
            <span>
              $
              {(
                order.grandTotal -
                order.paidAmount
              ).toFixed(2)}
            </span>
          </div>
        </div>

        {order.notes && (
          <div className="mt-6">
            <h3 className="font-semibold">
              Notes
            </h3>

            <p className="mt-2 text-muted-foreground">
              {order.notes}
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-3">
        <DeleteOrderButton
          orderId={order.id}
          status={order.status}
        />

        <CancelOrderButton
           orderId={order.id}
           status={order.status}
         />
      </div>
    </div>
  )
}