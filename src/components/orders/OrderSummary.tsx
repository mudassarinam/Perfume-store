"use client"

interface OrderSummaryProps {
  subtotal: number
  discount: number
  tax: number
  grandTotal: number
  paidAmount: number
  notes: string

  onDiscountChange: (value: number) => void
  onTaxChange: (value: number) => void
  onPaidAmountChange: (value: number) => void
  onNotesChange: (value: string) => void
}

export default function OrderSummary({
  subtotal,
  discount,
  tax,
  grandTotal,
  paidAmount,
  notes,
  onDiscountChange,
  onTaxChange,
  onPaidAmountChange,
  onNotesChange,
}: OrderSummaryProps) {
  const balance = grandTotal - paidAmount

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">

        <SummaryRow
          label="Subtotal"
          value={subtotal}
        />

        <EditableRow
          label="Discount"
          value={discount}
          onChange={onDiscountChange}
        />

        <EditableRow
          label="Tax"
          value={tax}
          onChange={onTaxChange}
        />

        <hr />

        <SummaryRow
          label="Grand Total"
          value={grandTotal}
          bold
        />

        <EditableRow
          label="Paid Amount"
          value={paidAmount}
          onChange={onPaidAmountChange}
        />

        <SummaryRow
          label="Balance"
          value={balance}
          bold
        />

      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          rows={4}
          value={notes}
          onChange={(e) =>
            onNotesChange(e.target.value)
          }
          placeholder="Order notes..."
          className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  bold = false,
}: {
  label: string
  value: number
  bold?: boolean
}) {
  return (
    <div className="flex justify-between items-center">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>
        {label}
      </span>

      <span className={bold ? "text-lg font-bold" : ""}>
        ${value.toFixed(2)}
      </span>
    </div>
  )
}

function EditableRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (value: number) => void
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground">
        {label}
      </span>

      <input
        type="number"
        min={0}
        step="0.01"
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
        className="w-32 rounded-lg border px-3 py-2 text-right"
      />
    </div>
  )
}