"use client"

import { Plus, Trash2 } from "lucide-react"

export interface OrderItem {
  productId: number
  quantity: number
}

interface Product {
  id: number
  name: string
  price: number
  discount: number
}

interface OrderItemsProps {
  products: Product[]
  items: OrderItem[]
  onAddItem: () => void
  onRemoveItem: (index: number) => void
  onProductChange: (
    index: number,
    productId: number
  ) => void
  onQuantityChange: (
    index: number,
    quantity: number
  ) => void
}

export default function OrderItems({
  products,
  items,
  onAddItem,
  onRemoveItem,
  onProductChange,
  onQuantityChange,
}: OrderItemsProps) {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Order Items
        </h2>

        <button
          type="button"
          onClick={onAddItem}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="py-3 text-left">
              Product
            </th>

            <th className="py-3 text-center">
              Qty
            </th>

            <th className="py-3 text-right">
              Price
            </th>

            <th className="py-3 text-right">
              Discount
            </th>

            <th className="py-3 text-right">
              Selling
            </th>

            <th className="py-3 text-right">
              Total
            </th>

            <th className="py-3 text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => {
            const product = products.find(
              (p) => p.id === item.productId
            )

            const price = product?.price ?? 0

            const discount =
              product?.discount ?? 0

            const selling =
              price - discount

            const total =
              selling * item.quantity

            return (
              <tr
                key={index}
                className="border-b"
              >
                <td className="py-4">
                  <select
                    value={item.productId}
                    onChange={(e) =>
                      onProductChange(
                        index,
                        Number(e.target.value)
                      )
                    }
                    className="w-full rounded-lg border px-3 py-2"
                  >
                    <option value={0}>
                      Select Product
                    </option>

                    {products.map((product) => (
                      <option
                        key={product.id}
                        value={product.id}
                      >
                        {product.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="py-4 text-center">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      onQuantityChange(
                        index,
                        Number(e.target.value)
                      )
                    }
                    className="w-20 rounded-lg border px-3 py-2 text-center"
                  />
                </td>

                <td className="py-4 text-right">
                  ${price.toFixed(2)}
                </td>

                <td className="py-4 text-right text-red-600">
                  -${discount.toFixed(2)}
                </td>

                <td className="py-4 text-right font-medium text-green-600">
                  ${selling.toFixed(2)}
                </td>

                <td className="py-4 text-right font-bold">
                  ${total.toFixed(2)}
                </td>

                <td className="py-4 text-center">
                  <button
                    type="button"
                    disabled={items.length === 1}
                    onClick={() =>
                      onRemoveItem(index)
                    }
                    className="rounded-md p-2 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}