"use client"
import Link from "next/link"
import { Plus, Search } from "lucide-react"
export default function CustomerToolbar() { return <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div className="relative w-full md:w-80"><Search className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" size={18} /><input placeholder="Search customers..." className="w-full rounded-lg border py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary" /></div><Link href="/admin/customers/new" className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground"><Plus size={18} />Add Customer</Link></div> }
