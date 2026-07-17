"use client"

import { createCustomer, updateCustomer } from "@/actions/customer"
import type { CustomerStatus } from "@prisma/client"
import { useRouter } from "next/navigation"

export interface CustomerFormData {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string | null
  city: string | null
  country: string | null
  status: CustomerStatus
  notes: string | null
}

export default function CustomerForm({ customer }: { customer?: CustomerFormData }) {
  const router = useRouter()
  return <form action={customer ? updateCustomer : createCustomer} className="rounded-xl border bg-card p-6 shadow-sm">
    {customer && <input type="hidden" name="id" value={customer.id} />}
    <h2 className="mb-6 text-xl font-semibold">Customer information</h2>
    <div className="grid gap-6 md:grid-cols-2">
      <Field label="First name"><input name="firstName" required defaultValue={customer?.firstName} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field>
      <Field label="Last name"><input name="lastName" required defaultValue={customer?.lastName} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field>
      <Field label="Email"><input name="email" type="email" required defaultValue={customer?.email} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field>
      <Field label="Phone"><input name="phone" type="tel" required defaultValue={customer?.phone} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field>
      <Field label="City"><input name="city" defaultValue={customer?.city ?? ""} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field>
      <Field label="Country"><input name="country" defaultValue={customer?.country ?? ""} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field>
      <Field label="Status"><select name="status" defaultValue={customer?.status ?? "ACTIVE"} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary"><option value="ACTIVE">Active</option><option value="INACTIVE">Inactive</option></select></Field>
    </div>
    <div className="mt-6 grid gap-6 md:grid-cols-2"><Field label="Address"><textarea name="address" rows={4} defaultValue={customer?.address ?? ""} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field><Field label="Notes"><textarea name="notes" rows={4} defaultValue={customer?.notes ?? ""} className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-primary" /></Field></div>
    <div className="mt-8 flex justify-end gap-3"><button type="button" onClick={() => router.back()} className="rounded-lg border px-5 py-2">Cancel</button><button type="submit" className="rounded-lg bg-primary px-5 py-2 text-primary-foreground">{customer ? "Update Customer" : "Save Customer"}</button></div>
  </form>
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="grid gap-2 text-sm font-medium">{label}{children}</label> }
