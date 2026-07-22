"use client"

interface Customer {
  id: number
  fullName: string
}

interface CustomerSelectProps {
  customers: Customer[]
  selectedCustomer: number
  paymentMethod: string
  paymentStatus: string
  onCustomerChange: (value: number) => void
  onPaymentMethodChange: (value: string) => void
  onPaymentStatusChange: (value: string) => void
}

export default function CustomerSelect({
  customers,
  selectedCustomer,
  paymentMethod,
  paymentStatus,
  onCustomerChange,
  onPaymentMethodChange,
  onPaymentStatusChange,
}: CustomerSelectProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        Customer Information
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Customer
          </label>

          <select
            value={selectedCustomer}
            onChange={(e) =>
              onCustomerChange(Number(e.target.value))
            }
            className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value={0}>
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.fullName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              onPaymentMethodChange(e.target.value)
            }
            className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="CASH">Cash</option>

            <option value="CARD">
              Card
            </option>

            <option value="BANK_TRANSFER">
              Bank Transfer
            </option>

            <option value="JAZZCASH">
              JazzCash
            </option>

            <option value="EASYPAISA">
              Easypaisa
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Payment Status
          </label>

          <select
            value={paymentStatus}
            onChange={(e) =>
              onPaymentStatusChange(e.target.value)
            }
            className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="PENDING">
              Pending
            </option>

            <option value="PARTIAL">
              Partial
            </option>

            <option value="PAID">
              Paid
            </option>

            <option value="REFUNDED">
              Refunded
            </option>
          </select>
        </div>
      </div>
    </div>
  )
}