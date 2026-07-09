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
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}