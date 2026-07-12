"use client"

export default function ProductFilters() {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <select className="rounded-lg border px-4 py-2">
        <option>All Categories</option>
        <option>Men</option>
        <option>Women</option>
        <option>Luxury</option>
      </select>

      <select className="rounded-lg border px-4 py-2">
        <option>All Stock</option>
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
    </div>
  )
}