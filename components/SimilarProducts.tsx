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
    <section className="mt-8 border-t border-zinc-100 pt-6 antialiased">
      <h2 className="mb-3.5 text-[11px] font-black uppercase tracking-widest text-zinc-400 sm:text-xs">
        Similar Products
      </h2>

      {/* Micro-spaced Grid */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-lg border border-zinc-150 bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-zinc-300 hover:shadow-sm sm:p-2.5"
          >
            <div>
              {/* Ultra-clean Image Wrapper */}
              <div className="relative aspect-square w-full overflow-hidden rounded-md bg-zinc-50/70 border border-zinc-100">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={`Photo of ${product.name}`}
                    fill
                    sizes="(max-w-640px) 25vw, 25vw"
                    className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-102 sm:p-2"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-zinc-50 text-zinc-300">
                    <span className="text-xs sm:text-sm opacity-60" role="img" aria-label="Wrench icon">🔧</span>
                  </div>
                )}
              </div>

              {/* Product Info with Micro-Typography */}
              <div className="mt-1.5 px-0.5">
                {product.brand && (
                  <p className="text-[7px] font-extrabold uppercase tracking-widest text-red-600 sm:text-[9px]">
                    {product.brand}
                  </p>
                )}

                <h3 className="mt-0.5 line-clamp-2 text-[9px] font-medium leading-tight text-zinc-700 transition-colors group-hover:text-red-600 sm:text-[11px] sm:leading-snug">
                  {product.name}
                </h3>
              </div>
            </div>

            {/* Price section anchored to bottom */}
            <div className="mt-1.5 px-0.5 pb-0.5">
              <p className="text-[10px] font-bold tracking-tight text-zinc-900 tabular-nums sm:text-xs">
                <span className="text-[7.5px] font-medium text-zinc-400 mr-0.5 sm:text-[9px]">KSh</span>
                {Number(product.price).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
