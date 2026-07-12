import PageHeader from "@/components/common/PageHeader"
import ProductToolbar from "@/components/products/ProductToolbar"
import ProductFilters from "@/components/products/ProductFilters"
import ProductTable from "@/components/products/ProductTable"
import ProductPagination from "@/components/products/ProductPagination"

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        title="Products"
        description="Manage all perfume products"
      />

      <ProductToolbar />

      <ProductFilters />

      <ProductTable />

      <ProductPagination />
    </>
  )
}