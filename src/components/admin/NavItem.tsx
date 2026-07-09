"use client"

import Link from "next/link"
import * as React from "react"

type NavItemProps = {
  href: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export function NavItem({ href, icon, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/60"
    >
      {icon}
      <span className="text-sm">{children}</span>
    </Link>
  )
}

export default NavItem
