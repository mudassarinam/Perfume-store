import PageHeader from "@/components/common/PageHeader"
import ProductForm from "@/components/products/ProductForm"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

interface EditProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  })

  if (!product) {
    notFound()
  }

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
        title="Edit Product"
        description="Update perfume product"
      />

      <ProductForm
        categories={categories}
        brands={brands}
        product={{
          ...product,
          price: Number(product.price),
          costPrice: Number(product.costPrice),
          discount: Number(product.discount),
        }}
      />
    </>
  )
}