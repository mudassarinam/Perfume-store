"use client"

import { useTransition } from "react"

import { deleteOrder } from "@/actions/delete-order"

interface Props {
  orderId: number
  status: string
}

export default function DeleteOrderButton({
  orderId,
  status,
}: Props) {
  const [isPending, startTransition] =
    useTransition()

  function handleDelete() {
    if (
      status !== "PENDING" &&
      status !== "CANCELLED"
    ) {
      alert(
        "Only Pending or Cancelled orders can be deleted."
      )
      return
    }

    const confirmed = window.confirm(
      "Delete this order?\n\nThis action cannot be undone."
    )

    if (!confirmed) return

    startTransition(async () => {
      await deleteOrder(orderId)
    })
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
    >
      {isPending
        ? "Deleting..."
        : "Delete Order"}
    </button>
  )
}