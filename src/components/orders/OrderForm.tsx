"use client"
import { createOrder } from "@/actions/order"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

import CustomerSelect from "./CustomerSelect"
import OrderItems, { OrderItem } from "./OrderItems"
import OrderSummary from "./OrderSummary"

interface Customer {
  id: number
  fullName: string
}

interface Product {
  id: number
  name: string
  price: number
  discount: number
}

interface OrderFormProps {
  customers: Customer[]
  products: Product[]
}

export default function OrderForm({
  customers,
  products,
}: OrderFormProps) {
  const router = useRouter()

  const [selectedCustomer, setSelectedCustomer] = useState(0)

  const [paymentMethod, setPaymentMethod] =
    useState("CASH")

  const [paymentStatus, setPaymentStatus] =
    useState("PENDING")

  const [discount, setDiscount] =
    useState(0)

  const [tax, setTax] =
    useState(0)

  const [paidAmount, setPaidAmount] =
    useState(0)

  const [notes, setNotes] =
    useState("")

  const [items, setItems] = useState<OrderItem[]>([
    {
      productId: 0,
      quantity: 1,
    },
  ])

  function addItem() {
    setItems((previous) => [
      ...previous,
      {
        productId: 0,
        quantity: 1,
      },
    ])
  }

  function removeItem(index: number) {
    if (items.length === 1) return

    setItems(previous =>
      previous.filter((_, i) => i !== index)
    )
  }

  function changeProduct(
    index: number,
    productId: number
  ) {
    setItems(previous =>
      previous.map((item, i) =>
        i === index
          ? { ...item, productId }
          : item
      )
    )
  }

  function changeQuantity(
    index: number,
    quantity: number
  ) {
    setItems(previous =>
      previous.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity:
                quantity < 1
                  ? 1
                  : quantity,
            }
          : item
      )
    )
  }

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      const product = products.find(
        p => p.id === item.productId
      )

      if (!product) return sum

      const sellingPrice =
        product.price - product.discount

      return (
        sum +
        sellingPrice *
          item.quantity
      )
    }, 0)
  }, [items, products])

  const grandTotal =
    subtotal -
    discount +
    tax

  async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault()

  const orderItems = items
    .map((item) => {
      const product = products.find(
        (p) => p.id === item.productId
      )

      if (!product) return null

      const unitPrice =
        product.price - product.discount

      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        discount: product.discount,
        total:
          unitPrice * item.quantity,
      }
    })
    .filter(Boolean)

  await createOrder({
    customerId: selectedCustomer,
    paymentMethod,
    paymentStatus,
    subtotal,
    discount,
    tax,
    grandTotal,
    paidAmount,
    notes,
    items: orderItems,
  })
}

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <CustomerSelect
        customers={customers}
        selectedCustomer={
          selectedCustomer
        }
        paymentMethod={
          paymentMethod
        }
        paymentStatus={
          paymentStatus
        }
        onCustomerChange={
          setSelectedCustomer
        }
        onPaymentMethodChange={
          setPaymentMethod
        }
        onPaymentStatusChange={
          setPaymentStatus
        }
      />

      <OrderItems
        products={products}
        items={items}
        onAddItem={addItem}
        onRemoveItem={removeItem}
        onProductChange={
          changeProduct
        }
        onQuantityChange={
          changeQuantity
        }
      />

      <OrderSummary
        subtotal={subtotal}
        discount={discount}
        tax={tax}
        grandTotal={grandTotal}
        paidAmount={paidAmount}
        notes={notes}
        onDiscountChange={
          setDiscount
        }
        onTaxChange={setTax}
        onPaidAmountChange={
          setPaidAmount
        }
        onNotesChange={
          setNotes
        }
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-primary-foreground"
        >
          Save Order
        </button>
      </div>
    </form>
  )
}