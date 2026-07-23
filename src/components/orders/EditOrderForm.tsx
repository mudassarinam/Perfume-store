"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { updateOrder } from "@/actions/update-order"

interface Order {
  id: number
  orderNumber: string
  status: string
  paymentStatus: string
  paymentMethod: string | null
  paidAmount: number
  notes: string | null
  subtotal: number
  discount: number
  tax: number
  grandTotal: number
}

interface Props {
  order: Order
}

export default function EditOrderForm({
  order,
}: Props) {
  const router = useRouter()

  const [isPending, startTransition] =
    useTransition()

  const [status, setStatus] = useState(
    order.status
  )

  const [paymentStatus, setPaymentStatus] =
    useState(order.paymentStatus)

  const [paidAmount, setPaidAmount] =
    useState(order.paidAmount)

  const [notes, setNotes] = useState(
    order.notes ?? ""
  )

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    startTransition(async () => {
      await updateOrder({
        id: order.id,
        status,
        paymentStatus,
        paidAmount,
        notes,
      })
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold">
          Edit Order
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Order Number
            </label>

            <input
              value={order.orderNumber}
              disabled
              className="w-full rounded-lg border bg-muted px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <input
              value={order.paymentMethod ?? "-"}
              disabled
              className="w-full rounded-lg border bg-muted px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Order Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full rounded-lg border px-4 py-2"
            >
              <option value="PENDING">
                Pending
              </option>
              <option value="CONFIRMED">
                Confirmed
              </option>
              <option value="PROCESSING">
                Processing
              </option>
              <option value="DELIVERED">
                Delivered
              </option>
              <option value="CANCELLED">
                Cancelled
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Status
            </label>

            <select
              value={paymentStatus}
              onChange={(e) =>
                setPaymentStatus(
                  e.target.value
                )
              }
              className="w-full rounded-lg border px-4 py-2"
            >
              <option value="PENDING">
                Pending
              </option>
              <option value="PARTIAL">
                Partial
              </option>
              <option value="PAID">
                Paid
              </option>
              <option value="REFUNDED">
                Refunded
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Paid Amount
            </label>

            <input
              type="number"
              step="0.01"
              value={paidAmount}
              onChange={(e) =>
                setPaidAmount(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Grand Total
            </label>

            <input
              value={`$${order.grandTotal.toFixed(
                2
              )}`}
              disabled
              className="w-full rounded-lg border bg-muted px-4 py-2"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Notes
          </label>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-primary px-5 py-2 text-primary-foreground disabled:opacity-50"
        >
          {isPending
            ? "Saving..."
            : "Save Changes"}
        </button>
      </div>
    </form>
  )
}