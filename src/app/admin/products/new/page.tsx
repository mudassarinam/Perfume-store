import PageHeader from "@/components/common/PageHeader"
import ProductForm from "@/components/products/ProductForm"

export default function NewProductPage() {
  return (
    <>
      <PageHeader
        title="Add Product"
        description="Create a new perfume product"
      />

      <ProductForm />
    </>
  )
}