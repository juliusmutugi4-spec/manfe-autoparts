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
  categories?: { id: string; name: string }[] | null
}

type ProductCardProps = {
  product: Product
}

export default function ProductCard({product}: ProductCardProps){
  const outOfStock = product.stock_quantity <= 0

  return (
    <article className="group overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm transition hover:shadow-md" >
      {/* IMAGE */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square bg-zinc-50 overflow-hidden block" >
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105" 
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xl">
            🔧
          </div>
        )}
        
        {product.is_featured && (
          <span className="absolute left-1 top-1 rounded bg-red-600 px-1 py-0.5 text-[7px] font-black text-white">
            TOP
          </span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded bg-black px-1.5 py-1 text-[8px] font-bold text-white">
              OUT
            </span>
          </div>
        )}
      </Link>

      {/* DETAILS */}
      <div className="p-1.5">
        {/* BRAND */}
        {product.brand && (
          <p className="text-[8px] font-black uppercase text-red-600 truncate">
            {product.brand}
          </p>
        )}

        {/* NAME */}
        <h3 className="mt-0.5 text-[10px] font-bold leading-tight line-clamp-2 text-zinc-900 min-h-[24px]">
          {product.name}
        </h3>

        {/* VEHICLE */}
        {product.vehicle_make && (
          <p className="mt-0.5 text-[9px] text-zinc-500 truncate">
            🚗 {product.vehicle_make}
          </p>
        )}

        {/* PRICE */}
        <div className="mt-1">
          <p className="text-[11px] font-black text-zinc-950 whitespace-nowrap">
            KSh {product.price.toLocaleString()}
          </p>
          {!outOfStock && (
            <p className="text-[8px] font-bold text-emerald-600 hidden xs:block">
              ✓ In stock
            </p>
          )}
        </div>

        {/* BUTTON */}

      </div>
    </article>
  )
}
