"use client"

import * as React from "react"
import { NavItem } from "@/components/admin/NavItem"
import {
  Home,
  Box,
  Tags,
  Layers,
  Users,
  ShoppingCart,
  BarChart2,
  Settings,
} from "lucide-react"

export function Sidebar() {
  return (
    <aside className="w-64 border-r p-4 hidden md:flex flex-col gap-4">
      <div className="text-xl font-semibold">Perfume Store</div>

      <nav className="flex flex-col gap-1">
        <NavItem href="/admin" icon={<Home size={18} />}>Dashboard</NavItem>
        <div className="mt-2">
          <div className="px-3 text-xs text-muted-foreground">Catalog</div>
          <div className="flex flex-col mt-1 gap-1 pl-2">
            <NavItem href="/admin/products" icon={<Box size={16} />}>Products</NavItem>
            <NavItem href="/admin/categories" icon={<Tags size={16} />}>Categories</NavItem>
            <NavItem href="/admin/brands" icon={<Layers size={16} />}>Brands</NavItem>
          </div>
        </div>
        <NavItem href="/admin/inventory" icon={<BarChart2 size={18} />}>Inventory</NavItem>
        <NavItem href="/admin/customers" icon={<Users size={18} />}>Customers</NavItem>
        <NavItem href="/admin/orders" icon={<ShoppingCart size={18} />}>Orders</NavItem>
        <NavItem href="/admin/reports" icon={<BarChart2 size={18} />}>Reports</NavItem>
        <NavItem href="/admin/settings" icon={<Settings size={18} />}>Settings</NavItem>
      </nav>
    </aside>
  )
}

export default Sidebar
