import {
  Package,
  Tags,
  ShoppingCart,
  DollarSign,
} from "lucide-react"

import StatCard from "@/components/dashboard/StatCard"

export default function DashboardPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Products"
          value="125"
          icon={<Package className="h-6 w-6" />}
        />

        <StatCard
          title="Categories"
          value="8"
          icon={<Tags className="h-6 w-6" />}
        />

        <StatCard
          title="Orders"
          value="54"
          icon={<ShoppingCart className="h-6 w-6" />}
        />

        <StatCard
          title="Revenue"
          value="$12,450"
          icon={<DollarSign className="h-6 w-6" />}
        />
      </div>
    </>
  )
}