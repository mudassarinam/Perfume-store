interface OrderPaginationProps {
  total: number
}

export default function OrderPagination({
  total,
}: OrderPaginationProps) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Total Orders: {total}
      </p>

      <div className="flex gap-2">
        <button
          className="rounded-lg border px-4 py-2"
          disabled
        >
          Previous
        </button>

        <button
          className="rounded-lg border px-4 py-2"
          disabled
        >
          Next
        </button>
      </div>
    </div>
  )
}