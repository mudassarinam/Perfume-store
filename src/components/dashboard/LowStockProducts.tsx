"use client"

const products = [
  {
    name: "Dior Sauvage",
    stock: 3,
  },
  {
    name: "Bleu de Chanel",
    stock: 2,
  },
  {
    name: "Creed Aventus",
    stock: 1,
  },
  {
    name: "Tom Ford Oud Wood",
    stock: 4,
  },
]

export default function LowStockProducts() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">
        Low Stock Products
      </h2>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between border-b pb-2 last:border-0"
          >
            <span>{product.name}</span>

            <span className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-600">
              {product.stock} left
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}