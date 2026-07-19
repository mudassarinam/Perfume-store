import { ReactNode } from "react"

interface OrderCardProps {
  title: string
  value: string | number
  icon: ReactNode
  tone?: string
}

export default function OrderCard({
  title,
  value,
  icon,
  tone = "text-primary",
}: OrderCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {value}
          </h3>
        </div>

        <div className={`rounded-lg bg-muted p-3 ${tone}`}>
          {icon}
        </div>
      </div>
    </div>
  )
}