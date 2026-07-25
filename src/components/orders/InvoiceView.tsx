import { prisma } from "@/lib/prisma"
import InvoiceActions from "./InvoiceActions"
import InvoiceHeader from "./invoice/InvoiceHeader"
import InvoiceCustomer from "./invoice/InvoiceCustomer"
import InvoiceItems from "./invoice/InvoiceItems"
import InvoiceSummary from "./invoice/InvoiceSummary"

interface Props {
  orderId: number
}

export default async function InvoiceView({
  orderId,
}: Props) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      customer: true,
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!order) {
    return (
      <div className="rounded-xl border p-10">
        Order not found.
      </div>
    )
  }

  const settings = await prisma.setting.findFirst()

  return (
    <div className="invoice-container rounded-xl border bg-white p-10 shadow-sm">

      <InvoiceActions orderId={order.id} />

      <InvoiceHeader
        orderNumber={order.orderNumber}
        createdAt={order.createdAt}
        settings={settings}
      />

        <InvoiceCustomer
          customer={order.customer}
          status={order.status}
          paymentStatus={order.paymentStatus}
          paymentMethod={order.paymentMethod}
        />

        <InvoiceItems
          items={order.orderItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
            discount: Number(item.discount),
            total: Number(item.total),
            product: {
              name: item.product.name,
            },
          }))}
          currency={settings?.currency ?? "USD"}
        />

      <InvoiceSummary
        subtotal={Number(order.subtotal)}
        discount={Number(order.discount)}
        tax={Number(order.tax)}
        grandTotal={Number(order.grandTotal)}
        paidAmount={Number(order.paidAmount)}
        currency={settings?.currency ?? "USD"}
      />

      {order.notes && (
        <div className="mt-10">
          <h3 className="mb-2 font-semibold">
            Notes
          </h3>

          <p>{order.notes}</p>
        </div>
        
      )}

      <div className="mt-12 border-t pt-6 text-center text-sm text-gray-500">
        <p className="font-medium">
          Thank you for choosing {settings?.storeName}.
        </p>

        <p className="mt-2 text-xs">
          This invoice was generated electronically and is valid without a signature.
        </p>

        <p className="mt-2 font-medium">
          {settings?.storeName}
        </p>

        <p>
          {settings?.storeAddress}
        </p>

        <p>
          {settings?.storePhone}
        </p>

        <p>
          {settings?.storeEmail}
        </p>

      </div>

    </div>
    
  )
}