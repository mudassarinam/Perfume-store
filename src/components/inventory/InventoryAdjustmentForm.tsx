"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowDownToLine, ArrowUpFromLine } from "lucide-react"
import { adjustInventory } from "@/actions/inventory"

interface InventoryAdjustmentFormProps {
  productId: number
  productName: string
  currentStock: number
}

export default function InventoryAdjustmentForm({ productId, productName, currentStock }: InventoryAdjustmentFormProps) {
  const router = useRouter()
  const [movementType, setMovementType] = useState("STOCK_IN")
  const [isPending, startTransition] = useTransition()

  function submitAdjustment(formData: FormData) {
    startTransition(async () => {
      try {
        await adjustInventory(formData)
        router.push("/admin/inventory")
      } catch (error) {
        window.alert(error instanceof Error ? error.message : "Unable to update stock.")
      }
    })
  }

  return (
    <form action={submitAdjustment} className="max-w-2xl rounded-xl border bg-card p-6 shadow-sm">
      <input type="hidden" name="productId" value={productId} />
      <div className="rounded-lg bg-muted/50 p-4">
        <p className="font-semibold">{productName}</p>
        <p className="mt-1 text-sm text-muted-foreground">Current available stock: <span className="font-medium text-foreground">{currentStock} units</span></p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Movement type
          <select name="type" value={movementType} onChange={(event) => setMovementType(event.target.value)} className="rounded-lg border bg-background px-3 py-2.5">
            <option value="STOCK_IN">Add stock</option>
            <option value="STOCK_OUT">Remove stock</option>
            <option value="ADJUSTMENT">Stock correction (+/-)</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Quantity
          <input name="quantity" type="number" required min={movementType === "ADJUSTMENT" ? undefined : 1} step="1" placeholder={movementType === "ADJUSTMENT" ? "Example: -2 or 5" : "Enter quantity"} className="rounded-lg border bg-background px-3 py-2.5" />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-medium">
        Note <span className="font-normal text-muted-foreground">(optional)</span>
        <textarea name="note" rows={4} maxLength={500} className="rounded-lg border bg-background px-3 py-2.5" placeholder="For example: received supplier delivery" />
      </label>

      <div className="mt-7 flex flex-wrap justify-end gap-3">
        <button type="button" onClick={() => router.push("/admin/inventory")} disabled={isPending} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium"><ArrowLeft size={16} />Cancel</button>
        <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-60">
          {movementType === "STOCK_OUT" ? <ArrowUpFromLine size={16} /> : <ArrowDownToLine size={16} />}
          {isPending ? "Saving..." : "Save stock movement"}
        </button>
      </div>
    </form>
  )
}
