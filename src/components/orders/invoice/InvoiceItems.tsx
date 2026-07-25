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
  currency: string
}

function formatCurrency(
  amount: number,
  currency: string
) {
  switch (currency) {
    case "PKR":
      return `Rs. ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "USD":
      return `$${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "EUR":
      return `€${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "GBP":
      return `£${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    case "AED":
      return `AED ${amount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`

    default:
      return amount.toFixed(2)
  }
}

export default function InvoiceItems({
  items,
  currency,
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

        {items.map((item) => (
          <tr key={item.id}>

            <td className="border p-3">
              {item.product.name}
            </td>

            <td className="border p-3 text-center">
              {item.quantity}
            </td>

            <td className="border p-3 text-center">
              {formatCurrency(item.unitPrice, currency)}
            </td>

            <td className="border p-3 text-center">
              {formatCurrency(item.discount, currency)}
            </td>

            <td className="border p-3 text-center">
              {formatCurrency(item.total, currency)}
            </td>

          </tr>
        ))}

      </tbody>

    </table>
  )
}