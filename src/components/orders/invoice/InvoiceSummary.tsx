interface Props {
  subtotal: number
  discount: number
  tax: number
  grandTotal: number
  paidAmount: number
}

export default function InvoiceSummary({
  subtotal,
  discount,
  tax,
  grandTotal,
  paidAmount,
}: Props) {
  return (
    <div className="ml-auto w-80 space-y-3">

      <SummaryRow
        label="Subtotal"
        value={subtotal}
      />

      <SummaryRow
        label="Discount"
        value={discount}
      />

      <SummaryRow
        label="Tax"
        value={tax}
      />

      <hr />

      <SummaryRow
        label="Grand Total"
        value={grandTotal}
        bold
      />

      <SummaryRow
        label="Paid Amount"
        value={paidAmount}
      />

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
    <div className="flex justify-between">

      <span
        className={
          bold
            ? "font-semibold"
            : "text-muted-foreground"
        }
      >
        {label}
      </span>

      <span
        className={
          bold
            ? "text-lg font-bold"
            : ""
        }
      >
        ${value.toFixed(2)}
      </span>

    </div>
  )
}