"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type DashboardCardProps = {
  icon?: React.ReactNode
  title: string
  value: React.ReactNode
  subtitle?: React.ReactNode
}

export function DashboardCard({ icon, title, value, subtitle }: DashboardCardProps) {
  return (
    <Card className="p-4">
      <CardHeader className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-muted">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-3">
          <div className="text-2xl font-semibold">{value}</div>
          {subtitle && <div className="text-sm text-muted-foreground mt-1">{subtitle}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

export default DashboardCard
