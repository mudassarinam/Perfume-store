"use client"

import { Eye, Pencil, Trash2 } from "lucide-react"
import { Prisma } from "@prisma/client"
import Link from "next/link"

type ProductWithCategory = Omit<
  Prisma.ProductGetPayload<{
    include: {
      category: true
    }
  }>,
  "price" | "costPrice" | "discount"
> & {
  price: number
  costPrice: number
  discount: number
}

interface ProductTableProps {
  products: ProductWithCategory[]
}


export default function ProductTable({
  products,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Price</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-4 text-2xl">
                🧴
              </td>

              <td className="px-4 py-4 font-medium">
                {product.name}
              </td>

              <td className="px-4 py-4">
                {product.sku}
              </td>

              <td className="px-4 py-4">
                {product.category?.name ?? "-"}
              </td>

              <td className="px-4 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.stock > 20
                      ? "bg-green-100 text-green-700"
                      : product.stock > 10
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.stock} in stock
                </span>
              </td>

              <td className="px-4 py-4 font-semibold">
                {`$${Number(product.price).toFixed(2)}`}
              </td>

              <td className="px-4 py-4 border border-red-500">
                <Link
                  href={`/admin/products/${product.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  VIEW
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <div className="p-10 text-center text-muted-foreground">
          No products found.
        </div>
      )}
    </div>
  )
}