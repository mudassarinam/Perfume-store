import PageHeader from "@/components/common/PageHeader"
import OrderForm from "@/components/orders/OrderForm"
import { prisma } from "@/lib/prisma"

export default async function NewOrderPage() {
  const customers = await prisma.customer.findMany({
    orderBy: {
      fullName: "asc",
    },
    select: {
      id: true,
      fullName: true,
    },
  })

  const products = await prisma.product.findMany({
  where: {
    status: "ACTIVE",
  },
  orderBy: {
    name: "asc",
  },
  select: {
    id: true,
    name: true,
    price: true,
    discount: true,
  },
})

  const serializedProducts = products.map((product) => ({
  ...product,
  price: Number(product.price),
  discount: Number(product.discount),
}))

  return (
    <>
      <PageHeader
        title="New Order"
        description="Create a new customer order"
      />

      <OrderForm
        customers={customers}
        products={serializedProducts}
      />
    </>
  )
}