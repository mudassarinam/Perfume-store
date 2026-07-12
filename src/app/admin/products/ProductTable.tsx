"use client"

const products = [
  {
    id: 1,
    name: "J. Janan Platinum",
    sku: "JAN-001",
    category: "Men",
    stock: 42,
    price: "$45",
  },
  {
    id: 2,
    name: "Dior Sauvage",
    sku: "DIO-002",
    category: "Luxury",
    stock: 15,
    price: "$120",
  },
  {
    id: 3,
    name: "Bleu de Chanel",
    sku: "CHA-003",
    category: "Luxury",
    stock: 8,
    price: "$140",
  },
]

export default function ProductTable() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-card">
      <table className="min-w-full">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left">SKU</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-left">Stock</th>
            <th className="px-4 py-3 text-left">Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-muted/30"
            >
              <td className="px-4 py-3">{product.sku}</td>
              <td className="px-4 py-3 font-medium">
                {product.name}
              </td>
              <td className="px-4 py-3">
                {product.category}
              </td>
              <td className="px-4 py-3">
                {product.stock}
              </td>
              <td className="px-4 py-3">
                {product.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}