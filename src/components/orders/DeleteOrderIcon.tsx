"use client"

import { useTransition } from "react"
import { Trash2 } from "lucide-react"

import { deleteOrder } from "@/actions/delete-order"

interface Props {
  orderId: number
  status: string
}

export default function DeleteOrderIcon({
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
      className="rounded-md p-2 hover:bg-red-100 disabled:opacity-50"
    >
      <Trash2 size={18} />
    </button>
  )
}