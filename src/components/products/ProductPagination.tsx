"use client"

export default function ProductPagination() {
  return (
    <div className="mt-6 flex flex-col gap-4 border-t pt-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-muted-foreground">
        Showing 1–3 of 3 products
      </p>

      <div className="flex items-center gap-2">
        <button className="rounded-lg border px-4 py-2 hover:bg-muted">
          Previous
        </button>

        <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground">
          1
        </button>

        <button className="rounded-lg border px-4 py-2 hover:bg-muted">
          Next
        </button>
      </div>
    </div>
  )
}