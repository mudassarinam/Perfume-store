import PageHeader from "@/components/common/PageHeader"
import OrderForm from "@/components/orders/OrderForm"

export default function NewOrderPage() {
  return (
    <>
      <PageHeader
        title="New Order"
        description="Create a new customer order"
      />

      <OrderForm />
    </>
  )
}