import { notFound } from "next/navigation"
import PageHeader from "@/components/common/PageHeader"
import InventoryAdjustmentForm from "@/components/inventory/InventoryAdjustmentForm"
import { prisma } from "@/lib/prisma"

export default async function InventoryAdjustmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const productId = Number(id)

  if (!Number.isInteger(productId) || productId < 1) notFound()

  const product = await prisma.product.findUnique({ where: { id: productId }, include: { inventory: true } })

  if (!product) notFound()

  return <><PageHeader title="Adjust Stock" description="Record an incoming, outgoing, or corrective stock movement" /><InventoryAdjustmentForm productId={product.id} productName={product.name} currentStock={product.inventory?.currentStock ?? product.stock} /></>
}
