"use client"

import Link from "next/link"
import AddToCartButton from "@/components/AddToCartButton"

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  stock_quantity: number
  image_url: string | null
  brand: string | null
  vehicle_make: string | null
  vehicle_model: string | null
  vehicle_year_from: number | null
  vehicle_year_to: number | null
  part_number: string | null
  is_featured: boolean
  categories?: {
    id: string
    name: string
  }[] | null
}

type ProductCardProps = {
  product: Product
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const outOfStock = product.stock_quantity <= 0

  return (
    <article className="group w-full overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition duration-200 hover:shadow-md">

      {/* IMAGE */}
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-zinc-50"
      >

        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-2xl">
            🔧
          </div>
        )}

        {/* FEATURED */}
        {product.is_featured && (
          <span className="absolute left-1.5 top-1.5 rounded bg-red-600 px-1.5 py-0.5 text-[7px] font-black uppercase tracking-wide text-white">
            TOP
          </span>
        )}

        {/* OUT OF STOCK */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-black px-2 py-1 text-[8px] font-black uppercase text-white">
              Out
            </span>
          </div>
        )}

      </Link>

      {/* DETAILS */}
      <div className="p-2">

        {/* BRAND */}
        {product.brand && (
          <p className="truncate text-[8px] font-black uppercase tracking-wide text-red-600">
            {product.brand}
          </p>
        )}

        {/* NAME */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[25px] text-[10px] font-bold leading-tight text-zinc-900 hover:text-red-600">
            {product.name}
          </h3>
        </Link>

        {/* VEHICLE */}
        {product.vehicle_make && (
          <p className="mt-1 truncate text-[9px] text-zinc-500">
            🚗 {product.vehicle_make}
            {product.vehicle_model
              ? ` ${product.vehicle_model}`
              : ""}
          </p>
        )}

        {/* PRICE */}
        <div className="mt-1.5">

          <p className="whitespace-nowrap text-[11px] font-black text-zinc-950">
            KSh {Number(product.price).toLocaleString()}
          </p>

          {!outOfStock && (
            <p className="mt-0.5 text-[8px] font-bold text-emerald-600">
              ✓ In stock
            </p>
          )}

        </div>

        {/* ADD TO CART */}
        <div className="mt-2">
          <AddToCartButton product={product} />
        </div>

      </div>

    </article>
  )
}