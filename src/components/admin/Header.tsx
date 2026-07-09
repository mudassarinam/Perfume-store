"use client"

import * as React from "react"
import { Bell, Search } from "lucide-react"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"

export function Header() {
  return (
    <header className="w-full flex items-center justify-between gap-4 p-4 border-b">
      <div className="flex items-center gap-4">
        <div className="text-lg font-bold">Perfume Store</div>
        <div className="hidden sm:flex items-center bg-muted/40 rounded-md px-2 py-1 gap-2">
          <Search size={16} />
          <input className="bg-transparent outline-none text-sm" placeholder="Search..." />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-muted/40">
          <Bell size={18} />
        </button>
        <div className="flex items-center gap-2">
            <Avatar>
            <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          <div className="hidden sm:block">
            <div className="text-sm font-medium">Admin</div>
            <button className="text-xs text-muted-foreground">Logout</button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
