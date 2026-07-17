import { notFound } from "next/navigation"
import PageHeader from "@/components/common/PageHeader"
import CustomerForm from "@/components/customers/CustomerForm"
import { prisma } from "@/lib/prisma"
export default async function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const customerId = Number(id); if (!Number.isInteger(customerId) || customerId < 1) notFound(); const customer = await prisma.customer.findUnique({ where: { id: customerId } }); if (!customer) notFound(); return <><PageHeader title="Edit Customer" description="Update customer profile details" />
<CustomerForm
  customer={{
    id: customer.id,
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    country: customer.country,
    status: customer.status,
    notes: customer.notes,
  }}
/></> }
