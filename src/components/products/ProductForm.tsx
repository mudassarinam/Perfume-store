"use client"

export default function ProductForm() {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="J. Janan Platinum"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            SKU
          </label>

          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="JAN-001"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select className="w-full rounded-lg border px-3 py-2">
            <option>Men</option>
            <option>Women</option>
            <option>Luxury</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Brand
          </label>

          <select className="w-full rounded-lg border px-3 py-2">
            <option>J.</option>
            <option>Dior</option>
            <option>Chanel</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select className="w-full rounded-lg border px-3 py-2">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Cost Price
          </label>

          <input
            type="number"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="30"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Selling Price
          </label>

          <input
            type="number"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="45"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock Quantity
          </label>

          <input
            type="number"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Barcode
          </label>

          <input
            className="w-full rounded-lg border px-3 py-2"
            placeholder="123456789"
          />
        </div>

      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Product Description
        </label>

        <textarea
          rows={5}
          className="w-full rounded-lg border p-3"
          placeholder="Write product description..."
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Internal Notes
        </label>

        <textarea
          rows={3}
          className="w-full rounded-lg border p-3"
          placeholder="Only visible to administrators..."
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          Product Name
          <span className="text-red-500">*</span>
        </label>

        <div className="rounded-lg border-2 border-dashed p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Drag & Drop an image here
          </p>

          <p className="mt-2 text-xs text-muted-foreground">
            or click below
          </p>

          <input
            type="file"
            className="mt-4"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-3">

        <button className="rounded-lg border px-5 py-2 hover:bg-muted">
          Cancel
        </button>

        <button className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
          Save Product
        </button>

      </div>

    </div>
  )
}