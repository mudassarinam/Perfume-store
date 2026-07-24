import PageHeader from "@/components/common/PageHeader"
import InvoiceView from "@/components/orders/InvoiceView"

interface Props {
  params: Promise<{
    id: string
  }>
}

export default async function InvoicePage({
  params,
}: Props) {
  const { id } = await params

  return (
    <>
      <PageHeader
        title="Invoice"
        description={`Invoice for Order #${id}`}
      />

      <InvoiceView
        orderId={Number(id)}
      />
    </>
  )
}