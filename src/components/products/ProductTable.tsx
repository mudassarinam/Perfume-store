"use client"

import Link from "next/link"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { deleteProduct } from "@/actions/product"
import { Prisma } from "@prisma/client"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    )

    if (!confirmed) return

    try {
      await deleteProduct(id)
      router.refresh()
    } catch (error) {
      window.alert(
        error instanceof Error ? error.message : "Unable to delete product."
      )
    }
  }

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
              className="border-t transition-colors hover:bg-muted/30"
            >
              <td className="px-4 py-4 text-2xl">🧴</td>

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
                ${Number(product.price).toFixed(2)}
              </td>

              <td className="px-4 py-4">
                <div className="flex justify-center gap-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="rounded-md p-2 hover:bg-blue-100"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="rounded-md p-2 hover:bg-yellow-100"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="rounded-md p-2 hover:bg-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
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
