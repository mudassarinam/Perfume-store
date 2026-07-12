"use client"

const orders = [
  {
    id: "#1001",
    customer: "Ali Khan",
    status: "Completed",
    total: "$250",
  },
  {
    id: "#1002",
    customer: "Ahmed Raza",
    status: "Pending",
    total: "$120",
  },
  {
    id: "#1003",
    customer: "Sara Malik",
    status: "Completed",
    total: "$310",
  },
  {
    id: "#1004",
    customer: "Fatima Noor",
    status: "Cancelled",
    total: "$90",
  },
]

export default function RecentOrders() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="py-3">Order ID</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Status</th>
              <th className="py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-0"
              >
                <td className="py-3">{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.status}</td>

                <td className="text-right font-medium">
                  {order.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}