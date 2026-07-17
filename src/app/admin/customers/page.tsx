import { CircleCheck, CircleX, Trophy, Users } from "lucide-react"
import PageHeader from "@/components/common/PageHeader"
import CustomerToolbar from "@/components/customers/CustomerToolbar"
import CustomerFilters from "@/components/customers/CustomerFilters"
import CustomerPagination from "@/components/customers/CustomerPagination"
import CustomerTable from "@/components/customers/CustomerTable"
import CustomerCard from "@/components/customers/CustomerCard"
import { prisma } from "@/lib/prisma"

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({ orderBy: { fullName: "asc" } })
  const serializedCustomers = customers.map((customer) => ({ ...customer, totalSpent: Number(customer.totalSpent) }))
  const activeCustomers = serializedCustomers.filter((customer) => customer.status === "ACTIVE").length
  const topCustomer = [...serializedCustomers].sort((first, second) => second.totalSpent - first.totalSpent)[0]
  return <><PageHeader title="Customers" description="Manage customer profiles and purchase information" /><div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><CustomerCard title="Total Customers" value={serializedCustomers.length} icon={<Users size={20} />} /><CustomerCard title="Active Customers" value={activeCustomers} icon={<CircleCheck size={20} />} tone="text-emerald-600" /><CustomerCard title="Inactive Customers" value={serializedCustomers.length - activeCustomers} icon={<CircleX size={20} />} tone="text-slate-600" /><CustomerCard title="Top Customer" value={topCustomer?.fullName ?? "—"} icon={<Trophy size={20} />} tone="text-amber-600" /></div><CustomerToolbar /><CustomerFilters /><CustomerTable customers={serializedCustomers} /><CustomerPagination total={serializedCustomers.length} /></>
}
