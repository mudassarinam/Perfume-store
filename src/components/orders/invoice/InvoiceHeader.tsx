interface Props {
  orderNumber: string
  createdAt: Date
  settings: {
    storeName: string
    storeEmail: string
    storePhone: string
    storeAddress: string
    currency: string
  } | null
}

export default function InvoiceHeader({
  orderNumber,
  createdAt,
  settings,
}: Props) {
  return (
    <div className="mb-8 flex items-start justify-between border-b pb-6">

      <div>
        <h1 className="text-3xl font-bold">
          {settings?.storeName ?? "Perfume Store"}
        </h1>

        <p className="text-sm text-gray-600">
          {settings?.storeAddress ?? "Lahore, Pakistan"}
        </p>

        <p className="text-sm text-gray-600">
          {settings?.storePhone ?? "+92 300 1234567"}
        </p>

        <p className="text-sm text-gray-600">
          {settings?.storeEmail ?? "info@perfumestore.com"}
        </p>
      </div>

      <div className="text-right">
        <h2 className="text-3xl font-bold tracking-wide">
          INVOICE
        </h2>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <strong>Invoice #:</strong>{" "}
            {orderNumber}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {createdAt.toLocaleDateString()}
          </p>
        </div>
      </div>

    </div>
  )
}