"use client"

import { useMemo, useState } from "react"
import AddToCartButton from "@/components/AddToCartButton"
import ProductCard from "@/components/ProductCard"
type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number | string
  stock_quantity: number
  image_url: string | null
  brand: string | null
  vehicle_make: string | null
  vehicle_model: string | null
  vehicle_year_from: number | null
  vehicle_year_to: number | null
  part_number: string | null
  is_featured: boolean
  categories:
    | {
        id: string
        name: string
      }[]
    | null
}

type Props = {
  products: Product[]
}

export default function ProductSearch({
  products,
}: Props) {
  const [search, setSearch] = useState("")

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return products
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.slug,
        product.description,
        product.brand,
        product.vehicle_make,
        product.vehicle_model,
        product.vehicle_year_from,
        product.vehicle_year_to,
        product.part_number,
        product.categories?.[0]?.name,
      ]
        .filter(
          (value) =>
            value !== null &&
            value !== undefined &&
            String(value).trim() !== ""
        )
        .join(" ")
        .toLowerCase()

      return searchableText.includes(query)
    })
  }, [products, search])

  return (
    <div>

      {/* SEARCH BAR */}
      <div className="relative mx-auto mb-6 max-w-3xl">

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-400">
          🔍
        </span>

        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search parts, brands, vehicles, part numbers..."
          className="w-full rounded-2xl border border-zinc-200 bg-white py-4 pl-12 pr-12 text-sm font-medium shadow-sm outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-zinc-400 hover:text-red-600"
          >
            ✕
          </button>
        )}

      </div>

      {/* SEARCH RESULT COUNT */}
      <div className="mb-6 flex items-center justify-between">

        <p className="text-sm font-bold text-zinc-500">

          {search ? (
            <>
              Showing{" "}
              <span className="font-black text-zinc-950">
                {filteredProducts.length}
              </span>{" "}
              result
              {filteredProducts.length === 1 ? "" : "s"}{" "}
              for{" "}
              <span className="font-black text-red-600">
                "{search}"
              </span>
            </>
          ) : (
            <>
              {products.length}{" "}
              {products.length === 1
                ? "product"
                : "products"}{" "}
              available
            </>
          )}

        </p>

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="text-xs font-black uppercase tracking-wide text-red-600 hover:text-red-700"
          >
            Clear
          </button>
        )}

      </div>

      {/* NO RESULTS */}
      {filteredProducts.length === 0 ? (

        <div className="rounded-2xl border border-dashed border-zinc-200 bg-white px-6 py-16 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl">
            🔎
          </div>

          <h3 className="mt-5 text-xl font-black">
            No matching parts
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            We couldn't find a product matching "{search}".
            Try a part name, brand, vehicle, model, or part number.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-6 rounded-xl bg-zinc-950 px-5 py-3 text-xs font-black text-white transition hover:bg-red-600"
          >
            SHOW ALL PRODUCTS
          </button>

        </div>

      ) : (

        /* PRODUCT GRID */
        <div className="grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
{filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={{
      ...product,
      price: Number(product.price),
      categories: product.categories
        ? Array.isArray(product.categories)
          ? product.categories
          : [product.categories]
        : [],
    }}
  />
))}
        </div>

      )}

    </div>
  )
}