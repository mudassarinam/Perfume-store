interface Item {
  id: number
  quantity: number
  unitPrice: number
  discount: number
  total: number
  product: {
    name: string
  }
}

interface Props {
  items: Item[]
}

export default function InvoiceItems({
  items,
}: Props) {
  return (
    <table className="mb-10 w-full border">

      <thead className="bg-muted">

        <tr>
          <th className="border p-3 text-left">
            Product
          </th>

          <th className="border p-3">
            Qty
          </th>

          <th className="border p-3">
            Unit Price
          </th>

          <th className="border p-3">
            Discount
          </th>

          <th className="border p-3">
            Total
          </th>
        </tr>

      </thead>

      <tbody>

        {items.map(item => (
          <tr key={item.id}>

            <td className="border p-3">
              {item.product.name}
            </td>

            <td className="border p-3 text-center">
              {item.quantity}
            </td>

            <td className="border p-3 text-center">
              ${Number(item.unitPrice).toFixed(2)}
            </td>

            <td className="border p-3 text-center">
              ${Number(item.discount).toFixed(2)}
            </td>

            <td className="border p-3 text-center">
              ${Number(item.total).toFixed(2)}
            </td>

          </tr>
        ))}

      </tbody>

    </table>
  )
}