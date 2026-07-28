"use client"

import * as React from "react"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">

        {/* Hide sidebar while printing */}
        <div className="print:hidden">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col">

          {/* Hide header while printing */}
          <div className="print:hidden">
            <Header />
          </div>

          <main className="flex-1 p-4 print:p-0">
            {children}
          </main>

        </div>

      </div>
    </div>
  )
}