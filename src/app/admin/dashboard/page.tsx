import {
  Package,
  Tags,
  ShoppingCart,
  DollarSign,
} from "lucide-react"
import RecentOrders from "@/components/dashboard/RecentOrders"
import SalesChart from "@/components/dashboard/SalesChart"
import StatCard from "@/components/dashboard/StatCard"
import PageHeader from "@/components/common/PageHeader"
import LowStockProducts from "@/components/dashboard/LowStockProducts"
export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Manage your perfume store"
      />

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

      <div className="mt-8">
        <SalesChart />
      </div>
      
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentOrders />
        </div>

         <LowStockProducts />
      </div>
    </>
  )
}