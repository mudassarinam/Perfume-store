"use client"

import { useTransition } from "react"

import { cancelOrder } from "@/actions/cancel-order"

interface Props {
  orderId: number
  status: string
}

export default function CancelOrderButton({
  orderId,
  status,
}: Props) {
  const [isPending, startTransition] =
    useTransition()

  function handleCancel() {
    if (status === "CANCELLED") {
      alert("Order is already cancelled.")
      return
    }

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?\n\nStock will be restored."
    )

    if (!confirmed) return

    startTransition(async () => {
      await cancelOrder(orderId)
    })
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleCancel}
      className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {isPending
        ? "Cancelling..."
        : "Cancel Order"}
    </button>
  )
}