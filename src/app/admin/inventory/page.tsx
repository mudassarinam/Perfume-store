import { Boxes, CircleAlert, PackageCheck, PackageX } from "lucide-react"
import PageHeader from "@/components/common/PageHeader"
import InventoryTable from "@/components/inventory/InventoryTable"
import { prisma } from "@/lib/prisma"

export default async function InventoryPage() {
  const products = await prisma.product.findMany({
    include: { inventory: true },
    orderBy: { name: "asc" },
  })

  const normalizedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    stock: product.inventory?.currentStock ?? product.stock,
    inventory: product.inventory
      ? {
          currentStock: product.inventory.currentStock,
          minimumStock: product.inventory.minimumStock,
        }
      : null,
  }))
  const totalUnits = normalizedProducts.reduce((total, product) => total + product.stock, 0)
  const lowStockProducts = normalizedProducts.filter((product) => product.stock > 0 && product.stock <= (product.inventory?.minimumStock ?? 5)).length
  const outOfStockProducts = normalizedProducts.filter((product) => product.stock === 0).length

  return (
    <>
      <PageHeader title="Inventory" description="Monitor stock levels and record stock movements" />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InventoryStat icon={<Boxes size={20} />} label="Tracked products" value={normalizedProducts.length} />
        <InventoryStat icon={<PackageCheck size={20} />} label="Units in stock" value={totalUnits} />
        <InventoryStat icon={<CircleAlert size={20} />} label="Low stock" value={lowStockProducts} tone="text-amber-600" />
        <InventoryStat icon={<PackageX size={20} />} label="Out of stock" value={outOfStockProducts} tone="text-red-600" />
      </div>

      <InventoryTable products={normalizedProducts} />
    </>
  )
}

function InventoryStat({ icon, label, value, tone = "text-primary" }: { icon: React.ReactNode; label: string; value: number; tone?: string }) {
  return <div className="rounded-xl border bg-card p-5 shadow-sm"><div className={`mb-3 ${tone}`}>{icon}</div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold">{value}</p></div>
}
