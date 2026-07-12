"use client"

import { Eye, Pencil, Trash2 } from "lucide-react"

const products = [
  {
    id: 1,
    image: "🧴",
    name: "J. Janan Platinum",
    sku: "JAN-001",
    category: "Men",
    stock: 42,
    price: "$45",
  },
  {
    id: 2,
    image: "🧴",
    name: "Dior Sauvage",
    sku: "DIO-002",
    category: "Luxury",
    stock: 15,
    price: "$120",
  },
  {
    id: 3,
    image: "🧴",
    name: "Bleu de Chanel",
    sku: "CHA-003",
    category: "Luxury",
    stock: 8,
    price: "$140",
  },
]

export default function ProductTable() {
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
                {product.image}
              </td>

              <td className="px-4 py-4 font-medium">
                {product.name}
              </td>

              <td className="px-4 py-4">
                {product.sku}
              </td>

              <td className="px-4 py-4">
                {product.category}
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
                {product.price}
              </td>

              <td className="px-4 py-4">
                <div className="flex justify-center gap-2">
                  <button className="rounded-md p-2 hover:bg-blue-100">
                    <Eye size={18} />
                  </button>

                  <button className="rounded-md p-2 hover:bg-yellow-100">
                    <Pencil size={18} />
                  </button>

                  <button className="rounded-md p-2 hover:bg-red-100">
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}