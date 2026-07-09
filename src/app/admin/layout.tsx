"use client"

import * as React from "react"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <Sheet>
          <SheetTrigger aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent side="right" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}