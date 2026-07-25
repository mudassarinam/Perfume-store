interface Props {
  subtotal: number
  discount: number
  tax: number
  grandTotal: number
  paidAmount: number
  currency: string
}

function formatCurrency(
  amount: number,
  currency: string
) {
  switch (currency) {
    case "PKR":
      return `Rs. ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "USD":
      return `$${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "EUR":
      return `€${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "GBP":
      return `£${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "AED":
      return `AED ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    default:
      return amount.toFixed(2)
  }
}

export default function InvoiceSummary({
  subtotal,
  discount,
  tax,
  grandTotal,
  paidAmount,
  currency,
}: Props) {
  const remaining = grandTotal - paidAmount

  return (
    <div className="ml-auto w-80 space-y-3">

      <SummaryRow
        label="Subtotal"
        value={subtotal}
        currency={currency}
      />

      <SummaryRow
        label="Discount"
        value={discount}
        currency={currency}
      />

      <SummaryRow
        label="Tax"
        value={tax}
        currency={currency}
      />

      <hr />

      <SummaryRow
        label="Grand Total"
        value={grandTotal}
        currency={currency}
        bold
      />

      <SummaryRow
        label="Paid Amount"
        value={paidAmount}
        currency={currency}
      />

      {remaining > 0 && (
        <SummaryRow
          label="Remaining"
          value={remaining}
          currency={currency}
          bold
        />
      )}

    </div>
  )
}

function SummaryRow({
  label,
  value,
  currency,
  bold = false,
}: {
  label: string
  value: number
  currency: string
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
        {formatCurrency(value, currency)}
      </span>

    </div>
  )
}