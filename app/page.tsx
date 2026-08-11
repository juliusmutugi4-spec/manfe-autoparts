
import { supabase } from "@/lib/supabase"
import AddToCartButton from "@/components/AddToCartButton"
import ProductSearch from "@/components/ProductSearch"
import VehicleFinder from "@/components/VehicleFinder"
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    make?: string
    model?: string
    year?: string
  }>
}) {
  const params = await searchParams

  const selectedMake = params.make?.trim() || ""
  const selectedModel = params.model?.trim() || ""
  const selectedYear = params.year
    ? Number(params.year)
    : null

  const { data: allProducts, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      price,
      stock_quantity,
      image_url,
      brand,
      vehicle_make,
      vehicle_model,
      vehicle_year_from,
      vehicle_year_to,
      part_number,
      is_featured,
      categories (
        id,
        name
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
let products = allProducts ?? []

if (selectedMake || selectedModel || selectedYear) {
  let vehicleQuery = supabase
    .from("vehicle_catalog")
    .select("model_id, make, model")

  if (selectedMake) {
    vehicleQuery = vehicleQuery.eq("make", selectedMake)
  }

  if (selectedModel) {
    vehicleQuery = vehicleQuery.eq("model", selectedModel)
  }

  const { data: matchingVehicles, error: vehicleError } =
    await vehicleQuery

  if (vehicleError) {
    console.error("VEHICLE FILTER ERROR:", vehicleError)
    products = []
  } else {
    const modelIds =
      matchingVehicles?.map(
        (vehicle) => vehicle.model_id
      ) ?? []

    if (modelIds.length === 0) {
      products = []
    } else {
      const { data: fitments, error: fitmentError } =
        await supabase
          .from("product_vehicle_fitments")
          .select(
            "product_id, model_id, year_from, year_to"
          )
          .in("model_id", modelIds)

      if (fitmentError) {
        console.error(
          "FITMENT FILTER ERROR:",
          fitmentError
        )

        products = []
      } else {
        const compatibleFitments =
          (fitments ?? []).filter((fitment) => {
            if (!selectedYear) {
              return true
            }

            if (
              fitment.year_from === null ||
              fitment.year_to === null
            ) {
              return false
            }

            return (
              selectedYear >= fitment.year_from &&
              selectedYear <= fitment.year_to
            )
          })

        const compatibleProductIds = new Set(
          compatibleFitments.map(
            (fitment) => fitment.product_id
          )
        )

        products = products.filter((product) =>
          compatibleProductIds.has(product.id)
        )
      }
    }
  }
}
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-900 antialiased">

      {/* ========================================================= */}
      {/* TOP BANNER */}
      {/* ========================================================= */}

      <div className="bg-zinc-950 px-4 py-2 text-center text-[11px] font-bold tracking-wide text-zinc-300">
        ⚡ PAY ON DELIVERY AVAILABLE ACROSS NAIROBI
        <span className="mx-2 text-zinc-600">|</span>
        CALL OR WHATSAPP TO ORDER
      </div>

      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-6">

{/* MANFE BRAND LOGO */} 
<div className="flex shrink-0 items-center gap-4">
  {/* DOUBLE-LINE MAA STAR */} 
  <svg 
    viewBox="0 0 110 110" 
    className="h-16 w-16 shrink-0 transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20" 
    aria-label="MANFE MAA logo" 
  >
    {/* OUTER STAR (Base Structure) */} 
    <path 
      d="M55 5 L69 40 L105 40 L77 62 L88 105 L55 84 L22 105 L33 62 L5 40 L41 40 Z" 
      fill="#ffffff" 
      stroke="#09090b" 
      strokeWidth="6" 
      strokeLinejoin="round" 
    />

    {/* INNER RED STAR (Precision Accent) */} 
    <path 
      d="M55 16 L65 44 L95 44 L71 61 L80 91 L55 74 L30 91 L39 61 L15 44 L45 44 Z" 
      fill="none" 
      stroke="#dc2626" 
      strokeWidth="3.5" 
      strokeLinejoin="round" 
    />

    {/* ============================================================== */}
    {/* 🎯 CENTRAL HUB: HIGH-CONTRAST BADGE CENTERED AT (55, 55)         */}
    {/* ============================================================== */}
    <circle cx="55" cy="55" r="16" fill="#09090b" />
    
    {/* Precision Core Accent Ring */}
    <circle cx="55" cy="55" r="14" fill="none" stroke="#dc2626" strokeWidth="1.5" />

    {/* 🔤 M A A — UNIFIED COHESIVE CENTER BLOCK */} 
    <text 
      x="55" 
      y="55" 
      textAnchor="middle" 
      dominantBaseline="central" 
      fontSize="11" 
      fontWeight="950" 
      fill="#ffffff" 
      className="font-sans select-none tracking-wider"
    >
      MAA
    </text>
  </svg>

  {/* WORDMARK */} 
  <div className="flex flex-col justify-center">
    <h1 className="text-xl font-black tracking-tighter text-zinc-950 sm:text-2xl">
      MANFE<span className="text-red-600">.</span>
    </h1>
    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600">
      AUTOPARTS & ACCESSORIES
    </p>
  </div>
</div>



          {/* Search */}
          <div className="hidden max-w-xl flex-1 md:block">
            <div className="relative">



            </div>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-3 sm:gap-5">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-black text-zinc-950">
                0722 921 017
              </p>

              <p className="text-xs text-zinc-500">
                Industrial Area, Nairobi
              </p>
            </div>

            <a
              href="https://wa.me/254722921017"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white shadow-sm transition hover:bg-emerald-700"
            >
              <span className="mr-1">💬</span>
              <span className="hidden sm:inline">
                WHATSAPP
              </span>
              <span className="sm:hidden">
                CHAT
              </span>
            </a>

          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* HERO */}
      {/* ========================================================= */}
<section className="relative overflow-hidden bg-zinc-950 px-5 py-16 text-white sm:px-6 sm:py-24 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black">
  {/* Modern Technical Background Grid Overlay */}
  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

  <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
    {/* Hero Text Area */}
    <div className="flex flex-col items-start lg:col-span-7">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-red-400 ring-1 ring-inset ring-red-500/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
        Premium Spares & Accessories
      </span>
      
      <h2 className="mt-6 max-w-2xl text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
        Find the exact part for your <span className="text-red-500">vehicle.</span>
      </h2>
      
      <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
        Nairobi's trusted catalog for commercial and personal automotive solutions. Browse genuine OEM and verified aftermarket spares with clear upfront pricing.
      </p>
      
      <div className="mt-8 flex flex-wrap gap-4">
        <a 
          href="#products" 
          className="rounded-xl bg-red-600 px-7 py-4 text-sm font-black tracking-wide text-white shadow-lg shadow-red-950/50 transition duration-200 hover:bg-red-700 hover:shadow-red-900/40"
        >
          BROWSE CATALOG
        </a>
        <a 
          href="https://wa.me/254722921017" 
          target="_blank" 
          rel="noreferrer" 
          className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-7 py-4 text-sm font-black text-white backdrop-blur-sm transition duration-200 hover:border-zinc-600 hover:bg-zinc-800"
        >
          <span>💬</span> ASK ABOUT A PART
        </a>
      </div>
    </div>

    {/* Part Finder Widget Container */}
    <div className="w-full lg:col-span-5">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-1 backdrop-blur-md shadow-2xl ring-1 ring-white/5">
        <VehicleFinder products={products ?? []} />
      </div>
    </div>
  </div>
</section>

{/* ========================================================= */}
{/* PRODUCTS CATALOG SECTION */}
{/* ========================================================= */}
<section id="products" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
  
  {/* Section Header Row */}
  <div className="mb-10 flex flex-col gap-4 border-b border-zinc-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-xs font-black uppercase tracking-[0.25em] text-red-600">
        Live Storage Inventory
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
        Verified Auto Spares
      </h2>
      <p className="mt-1 text-sm font-medium text-zinc-500">
        Real-time availability directly from our Nairobi Industrial Area warehouse.
      </p>
    </div>

    {/* Elegant Product Count Badge */}
    {products && products.length > 0 && (
      <div className="inline-flex items-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-xs font-black text-zinc-700 shadow-sm sm:self-auto">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
        <span>
          {products.length} {products.length === 1 ? "PART AVAILABLE" : "PARTS TRACKED"}
        </span>
      </div>
    )}
  </div>

  {/* Network Connection Error Banner */}
  {error && (
    <div className="mb-10 rounded-2xl border border-red-100 bg-red-50/60 p-5 text-red-900 backdrop-blur-sm">
      <div className="flex items-center gap-2.5 font-black text-red-700">
        <span className="text-lg">⚠️</span> 
        <span>Marketplace Connection Outage</span>
      </div>
      <p className="mt-1.5 text-sm text-red-800/90 pl-7">
        {error.message || "Failed to load parts from storage records. Please refresh or contact dashboard admins."}
      </p>
    </div>
  )}

  {/* Empty Database Fallback Area */}
  {!error && products?.length === 0 && (
    <div className="rounded-2xl border border-dashed border-zinc-200 bg-white py-16 px-6 text-center shadow-inner">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 text-2xl border border-zinc-100 shadow-sm">
        📦
      </div>
      <h3 className="mt-5 text-lg font-black text-zinc-950">No catalog matches found</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
        MANFE AUTOPARTS logistics units are currently updating field rows. Please try refining your vehicle search criteria.
      </p>
    </div>
  )}

  {/* ======================================================= */}
  {/* LIVE PRODUCT SEARCH COMPONENT GRID */}
  {/* ======================================================= */}
  <div className="mt-4">
    <ProductSearch products={products ?? []} />
  </div>
</section>


      {/* ========================================================= */}
      {/* TRUST STRIP */}
      {/* ========================================================= */}

      <section className="border-y border-zinc-200 bg-white">

        <div className="mx-auto grid max-w-7xl divide-y divide-zinc-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">

          <div className="px-6 py-7 text-center sm:text-left">
            <p className="text-sm font-black">
              ✓ Quality Parts
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Carefully sourced automotive products.
            </p>
          </div>

          <div className="px-6 py-7 text-center sm:text-left">
            <p className="text-sm font-black">
              ✓ Clear Pricing
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              No hidden product pricing.
            </p>
          </div>

          <div className="px-6 py-7 text-center sm:text-left">
            <p className="text-sm font-black">
              ✓ Nairobi Delivery
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Contact us to arrange delivery or pickup.
            </p>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* FOOTER */}
      {/* ========================================================= */}

      <footer className="bg-zinc-950 px-5 py-12 text-white sm:px-6">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-3">

            {/* Company */}
            <div>

              <h2 className="text-2xl font-black tracking-tight">
                MANFE<span className="text-red-600">.</span>
              </h2>

              <p className="mt-2 text-sm text-zinc-400">
                AUTOPARTS & SPARES
              </p>

              <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-500">
                Premium automotive parts and accessories for
                vehicle owners, mechanics, and businesses in
                Kenya.
              </p>

            </div>

            {/* Location */}
            <div>

              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Physical Store
              </p>

              <div className="mt-4 space-y-1 text-sm leading-6 text-zinc-400">

                <p className="font-bold text-white">
                  Baricho Business Centre
                </p>

                <p>
                  Hombe Road, off Baricho Road
                </p>

                <p>
                  Industrial Area, Nairobi, Kenya
                </p>

                <p>
                  P.O. Box 8592-00300 Nairobi
                </p>

              </div>

            </div>

            {/* Contact */}
            <div>

              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">
                Contact
              </p>

              <div className="mt-4 space-y-2 text-sm text-zinc-400">

                <p>
                  📞{" "}
                  <span className="font-bold text-white">
                    0722 921 017
                  </span>
                </p>

                <p>
                  📍 Industrial Area, Nairobi
                </p>

                <p>
                  🕒 Mon – Sat
                </p>

              </div>

              <a
                href="https://wa.me/254722921017"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-xl bg-emerald-600 px-5 py-3 text-xs font-black text-white transition hover:bg-emerald-700"
              >
                💬 CHAT ON WHATSAPP
              </a>

            </div>

          </div>

          {/* Bottom */}
          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © {new Date().getFullYear()} MANFE AUTOPARTS.
              All rights reserved.
            </p>

            <div className="flex gap-5">
              <span>
                Terms of Sale
              </span>

              <span>
                Fitment Disclaimer
              </span>
            </div>

          </div>

        </div>

         </footer>
    </main>
  )
}