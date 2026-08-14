import React from "react"

interface Product {
  id: string
  name: string
  image_url: string | null
  vehicle_make: string | null
  vehicle_model: string | null
  vehicle_year_from: number | null
  vehicle_year_to: number | null
}

interface FitmentBannerProps {
  products?: Product[]
}

function FitmentCard({ product }: { product: Product }) {
  const year =
    product.vehicle_year_from && product.vehicle_year_to
      ? product.vehicle_year_from === product.vehicle_year_to
        ? `${product.vehicle_year_from}`
        : `${product.vehicle_year_from}–${product.vehicle_year_to}`
      : product.vehicle_year_from
        ? `${product.vehicle_year_from}+`
        : "ALL YEARS"

  return (
    <div className="group flex h-[84px] w-[360px] shrink-0 items-center gap-3.5 overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-zinc-700/80 hover:bg-zinc-900/60">
      
      {/* COMPACT HARDWARE ASSET WRAPPER */}
      <div className="relative h-[60px] w-[72px] shrink-0 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="h-full w-full object-contain p-2 opacity-85 transition-transform duration-500 will-change-transform group-hover:scale-105 group-hover:opacity-100"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-zinc-900/40" aria-hidden="true">
            <svg className="h-5 w-5 text-zinc-700 transition-colors duration-300 group-hover:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93l.398.17c.415.177.893.07 1.194-.253l.63-.675c.393-.418 1.04-.422 1.437-.01l.773.774c.412.41.404 1.06-.013 1.45l-.672.63c-.324.303-.432.784-.252 1.2l.17.397c.165.394.505.707.93.778l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.398 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78l-.17.398c-.178.415-.07.893.253 1.194l.675.63c.418.393.422 1.04.01 1.437l-.774.773c-.41.412-1.06.404-1.45-.013l-.63-.672c-.303-.324-.784-.432-1.2-.252l-.397.17c-.394.165-.707.505-.778.93l-.15.893c-.09.543-.56.94-1.109.94h-1.094c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.383-.764-.78-.929l-.398-.17c-.415-.178-.893-.07-1.194.253l-.63.675c-.393.418-1.04.422-1.437.01l-.773-.774c-.412-.41-.404-1.06.013-1.45l.672-.63c.324-.303.432-.784.252-1.2l-.17-.397c-.165-.394-.505-.707-.93-.778l-.893-.15c-.543-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.764-.383.929-.78l.17-.398c.178-.415.07-.893-.253-1.194l-.675-.63c-.418-.393-.422-1.04-.01-1.437l.774-.774c.41-.412 1.06-.404 1.45.013l.63.672c.303.324.784.432 1.2.252l.397-.17c.394-.165.707-.505.778-.93l.15-.893z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}

        <div className="absolute bottom-1 left-1 rounded bg-zinc-950/80 px-1 py-0.5 text-[6px] font-bold uppercase tracking-wider text-zinc-400">
          Part
        </div>
      </div>

      {/* METADATA PLATFORM */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-red-400/90 transition-colors duration-300 group-hover:text-red-400">
          {product.name}
        </p>

        <div className="mt-1 flex items-center gap-1.5">
          <div className="min-w-0">
            <p className="text-[7px] font-bold uppercase tracking-wider text-zinc-600">Make</p>
            <p className="truncate text-xs font-semibold text-zinc-200">{product.vehicle_make || "ALL"}</p>
          </div>

          <svg className="h-2.5 w-2.5 shrink-0 text-zinc-700 mt-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>

          <div className="min-w-0">
            <p className="text-[7px] font-bold uppercase tracking-wider text-zinc-600">Model</p>
            <p className="truncate text-xs font-semibold text-zinc-200">{product.vehicle_model || "ALL"}</p>
          </div>

          <svg className="h-2.5 w-2.5 shrink-0 text-zinc-700 mt-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>

          <div>
            <p className="text-[7px] font-bold uppercase tracking-wider text-zinc-600">Year</p>
            <p className="whitespace-nowrap text-xs font-semibold text-zinc-200">{year}</p>
          </div>
        </div>
      </div>

      {/* REFINEMENT CHIP */}
      <div className="hidden shrink-0 sm:block">
        <span className="flex items-center gap-1 rounded-full border border-emerald-950 bg-emerald-950/20 px-2 py-0.5 text-[7px] font-extrabold uppercase tracking-wider text-emerald-400/90 shadow-sm shadow-emerald-950/40">
          <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          Fit
        </span>
      </div>

    </div>
  )
}

function FitmentRow({ products, reverse = false }: { products: Product[]; reverse?: boolean }) {
  const usableProducts = products.filter((product) => product.image_url || product.name)

  if (usableProducts.length === 0) return null

  // Ensure ample array repetition for perfect tracking layout length bounds
  const items = [...usableProducts, ...usableProducts, ...usableProducts, ...usableProducts]

  return (
    <div className="relative overflow-hidden w-full">
      <div
        className={`flex w-max gap-4 py-1.5 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((product, index) => (
          <FitmentCard
            key={`${reverse ? "rev" : "norm"}-${product.id}-${index}`}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}

export default function FitmentBanner({ products = [] }: FitmentBannerProps) {
  if (products.length === 0) return null

  const maskStyle = {
    maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
    WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 inset-y-12 z-0 hidden flex-col justify-between opacity-15 lg:flex select-none">
      
      {/* TOP PIPELINE RUN */}
      <div className="w-full">
        <div className="mb-4 text-center">
          <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 backdrop-blur-sm">
            Live Vehicle Fitment Inventory
          </span>
        </div>
        <div style={maskStyle}>
          
        </div>
      </div>

      {/* BOTTOM PIPELINE RUN */}
      <div className="w-full">
        <div style={maskStyle}>
          
        </div>
        <div className="mt-4 text-center">
          <span className="rounded-full border border-zinc-800/80 bg-zinc-950/60 px-3.5 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 backdrop-blur-sm">
            Verified Compatibility Engine
          </span>
        </div>
      </div>

    </div>
  )
}
