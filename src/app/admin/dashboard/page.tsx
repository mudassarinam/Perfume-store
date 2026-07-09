import * as React from "react"
import DashboardCard from "@/components/admin/DashboardCard"
import { Box, Tags, ShoppingCart, BarChart2 } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard icon={<Box size={18} />} title="Total Products" value={125} />
        <DashboardCard icon={<Tags size={18} />} title="Categories" value={8} />
        <DashboardCard icon={<ShoppingCart size={18} />} title="Orders" value={54} />
        <DashboardCard icon={<BarChart2 size={18} />} title="Revenue" value="$12,450" />
      </div>
    </div>
  )
}