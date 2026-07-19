"use client"

import Link from "next/link"
import { Plus, Search } from "lucide-react"

export default function OrderToolbar() {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:w-80">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="text"
          placeholder="Search orders..."
          className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <Link
        href="/admin/orders/new"
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Plus size={18} />
        Add Order
      </Link>
    </div>
  )
}