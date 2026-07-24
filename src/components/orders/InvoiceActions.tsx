"use client"

interface Props {
  orderId: number
}

export default function InvoiceActions({
  orderId,
}: Props) {
  function handlePrint() {
    window.print()
  }

  return (
    <div className="print-hidden mb-6 flex justify-end gap-3">

      <button
        onClick={handlePrint}
        className="rounded-lg bg-primary px-5 py-2 text-primary-foreground"
      >
        🖨 Print Invoice
      </button>

    </div>
  )
}