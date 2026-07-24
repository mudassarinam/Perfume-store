interface Props {
  customer: {
    fullName: string
    phone: string | null
    address: string | null
  }

  createdAt: Date

  status: string

  paymentStatus: string

  paymentMethod: string | null
}

export default function InvoiceCustomer({
  customer,
  createdAt,
  status,
  paymentStatus,
  paymentMethod,
}: Props) {
  return (
    <div className="mb-10 grid grid-cols-2 gap-8">

      <div>
        <h3 className="mb-3 font-semibold">
          Bill To
        </h3>

        <p>{customer.fullName}</p>

        <p>{customer.phone}</p>

        <p>{customer.address}</p>
      </div>

      <div className="space-y-2 text-right">

        <p>
          <strong>Date:</strong>{" "}
          {new Date(
            createdAt
          ).toLocaleDateString()}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {status}
        </p>

        <p>
          <strong>Payment:</strong>{" "}
          {paymentStatus}
        </p>

        <p>
          <strong>Method:</strong>{" "}
          {paymentMethod}
        </p>

      </div>

    </div>
  )
}