"use client"

import { createProduct, updateProduct } from "@/actions/product"
import { Brand, Category, Product } from "@prisma/client"

type ProductFormProduct = Omit<
  Product,
  "price" | "costPrice" | "discount"
> & {
  price: number
  costPrice: number
  discount: number
}

interface ProductFormProps {
  categories: Category[]
  brands: Brand[]
  product?: ProductFormProduct
}

export default function ProductForm({
  categories,
  brands,
  product,
}: ProductFormProps) {
  return (
    <form
       action={product ? updateProduct : createProduct}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
    {product && (
    <input
      type="hidden"
      name="id"
      value={product.id}
    />
  )}
      <h2 className="mb-6 text-xl font-semibold">
        Product Form
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Product Name
          </label>

          <input
            name="name"
            type="text"
            required
            defaultValue={product?.name}
            placeholder="Enter product name"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            defaultValue={product?.sku}
          </label>

          <input
            name="sku"
            type="text"
            required
            placeholder="JAN-001"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            defaultValue={product?.barcode ?? ""}
          </label>

          <input
            name="barcode"
            type="text"
            placeholder="Barcode"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Category
          </label>

          <select
            name="categoryId"
            required
            defaultValue={product?.categoryId ?? ""}
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Brand
          </label>

          <select
            name="brandId"
            required
            defaultValue={product?.brandId ?? ""}
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select Brand</option>

            {brands.map((brand) => (
              <option
                key={brand.id}
                value={brand.id}
              >
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Gender
          </label>

          <select
            name="gender"
            required
            defaultValue={product?.gender}
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="BOTH">Both</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            defaultValue={product?.price.toString()}
          </label>

          <input
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            defaultValue={product?.costPrice.toString()}
          </label>

          <input
            name="costPrice"
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Discount
          </label>

          <input
            name="discount"
            type="number"
            step="0.01"
            defaultValue={product?.discount.toString() ?? 0}
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Stock
          </label>

          <input
            name="stock"
            type="number"
            defaultValue={product?.stock ?? 0}
            required
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            defaultValue={product?.volume ?? ""}
          </label>

          <input
            name="volume"
            type="text"
            placeholder="100ml"
            className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium">
          defaultValue={product?.description ?? ""}
        </label>

        <textarea
          name="description"
          rows={5}
          placeholder="Product description..."
          className="w-full rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            name="featured"
            type="checkbox"
            defaultChecked={product?.featured}
          />
          Featured
        </label>

        <label className="flex items-center gap-2">
          <input
            name="newArrival"
            type="checkbox"
            defaultChecked={product?.newArrival}
          />
          New Arrival
        </label>

        <label className="flex items-center gap-2">
          <input
            name="topSeller"
            type="checkbox"
            defaultChecked={product?.topSeller}
          />
          Top Seller
        </label>
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="reset"
          className="rounded-lg border px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-primary-foreground"
        >
         {product ? "Update Product" : "Save Product"}
        </button>
      </div>
    </form>
  )
}