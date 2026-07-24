interface Props {
  orderNumber: string
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
  settings,
}: Props) {
  return (
    <div className="mb-8 flex items-start justify-between border-b pb-6">
      <div>
        <h1 className="text-3xl font-bold">
          {settings?.storeName ?? "Perfume Store"}
        </h1>

        <p className="text-sm text-gray-600">
          {settings?.storeAddress}
        </p>

        <p className="text-sm text-gray-600">
          {settings?.storePhone}
        </p>

        <p className="text-sm text-gray-600">
          {settings?.storeEmail}
        </p>
      </div>

      <div className="text-right">
        <h2 className="text-2xl font-bold">
          INVOICE
        </h2>

        <p className="mt-2">
          <strong>Order:</strong>{" "}
          {orderNumber}
        </p>

        <p>
          <strong>Date:</strong>{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}