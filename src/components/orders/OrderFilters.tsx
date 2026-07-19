"use client"

export default function OrderFilters() {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <select className="rounded-lg border px-4 py-2">
        <option>All Status</option>
        <option>Pending</option>
        <option>Confirmed</option>
        <option>Processing</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>

      <select className="rounded-lg border px-4 py-2">
        <option>All Payments</option>
        <option>Pending</option>
        <option>Partial</option>
        <option>Paid</option>
        <option>Refunded</option>
      </select>

      <select className="rounded-lg border px-4 py-2">
        <option>Newest First</option>
        <option>Oldest First</option>
      </select>
    </div>
  )
}