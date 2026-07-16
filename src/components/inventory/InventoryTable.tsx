import Link from "next/link"
import { SlidersHorizontal } from "lucide-react"

type InventoryProduct = {
  id: number
  name: string
  sku: string
  stock: number
  inventory: {
    currentStock: number
    minimumStock: number
  } | null
}

interface InventoryTableProps {
  products: InventoryProduct[]
}

export default function InventoryTable({ products }: InventoryTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="bg-muted/50 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">SKU</th>
                <th className="px-4 py-3 text-left">Current stock</th>
                <th className="px-4 py-3 text-left">Minimum stock</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const currentStock = product.inventory?.currentStock ?? product.stock
                const minimumStock = product.inventory?.minimumStock ?? 5
                const isOutOfStock = currentStock === 0
                const isLowStock = !isOutOfStock && currentStock <= minimumStock

                return (
                  <tr key={product.id} className="border-t hover:bg-muted/30">
                    <td className="px-4 py-4 font-medium">{product.name}</td>
                    <td className="px-4 py-4 text-muted-foreground">{product.sku}</td>
                    <td className="px-4 py-4 font-semibold">{currentStock}</td>
                    <td className="px-4 py-4">{minimumStock}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        isOutOfStock
                          ? "bg-red-100 text-red-700"
                          : isLowStock
                            ? "bg-amber-100 text-amber-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {isOutOfStock ? "Out of stock" : isLowStock ? "Low stock" : "In stock"}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/admin/inventory/${product.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-muted"
                      >
                        <SlidersHorizontal size={16} />
                        Adjust stock
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {products.length === 0 && <p className="p-10 text-center text-muted-foreground">No products found.</p>}
    </div>
  )
}
