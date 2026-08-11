"use client"

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

export default function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock_quantity <= 0

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl">
      
      {/* 👑 IMAGE HERO ZONE */}
      <div className="relative aspect-square w-full overflow-hidden bg-zinc-50 border-b border-zinc-100 flex items-center justify-center">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-300 transition-transform duration-500 group-hover:scale-110">
            <span className="text-5xl">🔧</span>
            <span className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">MANFE PARTS</span>
          </div>
        )}

        {/* Overlay Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {product.is_featured && (
            <span className="rounded-md bg-zinc-950 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              Popular
            </span>
          )}
          {product.categories?.[0]?.name && (
            <span className="rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              {product.categories[0].name}
            </span>
          )}
        </div>

        {/* Stock Badge Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="rounded-lg bg-zinc-900/90 px-4 py-2 text-xs font-black uppercase tracking-widest text-white ring-1 ring-white/20">
              Out Of Stock
            </span>
          </div>
        )}
      </div>

      {/* 📋 DETAILS ZONE */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Brand & Part Number Row */}
        <div className="flex items-center justify-between gap-2">
          {product.brand && (
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
              {product.brand}
            </span>
          )}
          {product.part_number && (
            <span className="font-mono text-[10px] font-bold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              #{product.part_number}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-2 text-base font-black tracking-tight text-zinc-950 line-clamp-1 group-hover:text-red-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Short Description */}
        {product.description && (
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Compact Technical Compatibility Tag */}
        {(product.vehicle_make || product.vehicle_model) && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-zinc-50 border border-zinc-100 p-2.5 text-xs">
            <span className="text-base select-none">🚗</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-zinc-800 truncate">
                {product.vehicle_make} {product.vehicle_model}
              </p>
              {(product.vehicle_year_from || product.vehicle_year_to) && (
                <p className="text-[10px] font-medium text-zinc-400 mt-0.5">
                  Models: {product.vehicle_year_from ?? "Any"} – {product.vehicle_year_to ?? "Present"}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Bottom Pricing & Action Section */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-zinc-100 pt-4">
            <div>
              <p className="text-[10px] font-black tracking-wider text-zinc-400 uppercase">PRICE</p>
              <p className="text-xl font-black tracking-tight text-zinc-950">
                KSh {product.price.toLocaleString()}
              </p>
              {!isOutOfStock && (
                <p className="text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  {product.stock_quantity} available
                </p>
              )}
            </div>

            <div className="w-1/2 max-w-[130px]">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

      </div>
    </article>
  )
}
