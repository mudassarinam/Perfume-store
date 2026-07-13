interface ProductPaginationProps {
  total: number
}

export default function ProductPagination({
  total,
}: ProductPaginationProps) {
  return (
    <div className="mt-6 flex flex-col gap-4 border-t pt-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing {total} product{total !== 1 ? "s" : ""}
      </p>

      <div className="flex items-center gap-2">
        <button
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
          disabled
        >
          Previous
        </button>

        <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
          1
        </button>

        <button
          className="rounded-lg border px-4 py-2 disabled:opacity-50"
          disabled
        >
          Next
        </button>
      </div>
    </div>
  )
}