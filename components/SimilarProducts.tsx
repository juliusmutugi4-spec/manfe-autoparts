"use client"

import Link from "next/link"
import Image from "next/image"

type Product = {
  id: string
  name: string
  slug: string
  price: number
  image_url: string | null
  brand: string | null
}

type Props = {
  products: Product[]
}

export default function SimilarProducts({ products }: Props) {
  if (!products || products.length === 0) return null

  return (
    <section className="mt-12 border-t border-zinc-100 pt-10 antialiased">
      <h2 className="mb-6 text-base font-black uppercase tracking-wider text-zinc-950 sm:text-lg">
        Similar Products
      </h2>

      {/* Grid: 4 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md sm:p-3"
          >
            <div>
              {/* Image Wrapper */}
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-50 border border-zinc-100/50">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={`Photo of ${product.name}`}
                    fill
                    sizes="(max-w-640px) 25vw, 25vw"
                    className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-105 sm:p-3"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-zinc-300">
                    <span className="text-xl sm:text-2xl" role="img" aria-label="Wrench icon">🔧</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="mt-2 px-0.5">
                {product.brand && (
                  <p className="text-[8px] font-black uppercase tracking-wider text-red-600 sm:text-[10px]">
                    {product.brand}
                  </p>
                )}

                <h3 className="mt-0.5 line-clamp-2 text-[10px] font-bold leading-tight text-zinc-800 transition-colors group-hover:text-red-600 sm:text-xs sm:leading-normal">
                  {product.name}
                </h3>
              </div>
            </div>

            {/* Price section anchored to bottom */}
            <div className="mt-2 px-0.5 pb-0.5">
              <p className="text-xs font-black tracking-tight text-zinc-950 tabular-nums sm:text-sm">
                <span className="text-[9px] font-bold text-zinc-500 mr-0.5 sm:text-xs">KSh</span>
                {Number(product.price).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
