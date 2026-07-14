import PageHeader from "@/components/common/PageHeader"
import ProductForm from "@/components/products/ProductForm"
import { prisma } from "@/lib/prisma"

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      name: "asc",
    },
  })

  const brands = await prisma.brand.findMany({
    where: {
      status: "ACTIVE",
    },
    orderBy: {
      name: "asc",
    },
  })

  return (
    <>
      <PageHeader
        title="Add Product"
        description="Create a new perfume product"
      />

      <ProductForm
        categories={categories}
        brands={brands}
      />
    </>
  )
}