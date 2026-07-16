import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import PageHeader from "@/components/common/PageHeader"

interface ProductPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params

 const productId = Number(id)

 if (Number.isNaN(productId)) {
   notFound()
  }

  const product = await prisma.product.findUnique({
  where: {
    id: productId,
  },
  include: {
    category: true,
    brand: true,
  },
})

  if (!product) {
    notFound()
  }

  return (
    <>
      <PageHeader
        title={product.name}
        description="Product Details"
      />

      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-muted-foreground">SKU</p>
            <p>{product.sku}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Barcode</p>
            <p>{product.barcode ?? "-"}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p>{product.category.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Brand</p>
            <p>{product.brand.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Gender</p>
            <p>{product.gender}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Selling Price</p>
            <p>${Number(product.price).toFixed(2)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Cost Price</p>
            <p>${Number(product.costPrice).toFixed(2)}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Stock</p>
            <p>{product.stock}</p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">
              Description
            </p>
            <p>{product.description ?? "-"}</p>
          </div>

        </div>
      </div>
    </>
  )
}