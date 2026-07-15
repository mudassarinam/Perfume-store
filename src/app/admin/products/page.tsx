import PageHeader from "@/components/common/PageHeader"
import ProductToolbar from "@/components/products/ProductToolbar"
import ProductFilters from "@/components/products/ProductFilters"
import ProductTable from "@/components/products/ProductTable"
import ProductPagination from "@/components/products/ProductPagination"
import { prisma } from "@/lib/prisma"

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      id: "desc",
    },
  })

  const serializedProducts = products.map((product) => ({
    ...product,
    price: Number(product.price),
    costPrice: Number(product.costPrice),
    discount: Number(product.discount),
  }))

  return (
    <>
      <PageHeader
        title="Products"
        description="Manage all perfume products"
      />

      <ProductToolbar />

      <ProductFilters />

      <ProductTable products={serializedProducts} />

      <ProductPagination total={serializedProducts.length} />
    </>
  )
}