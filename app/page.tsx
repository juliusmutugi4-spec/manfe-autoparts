
import { supabase } from "@/lib/supabase"
import AddToCartButton from "@/components/AddToCartButton"
import ProductSearch from "@/components/ProductSearch"
import VehicleFinder from "@/components/VehicleFinder"
import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"
export default async function Home({
  searchParams,
}: {
searchParams: Promise<{
  make?: string
  model?: string
  year?: string
  q?: string
}>
}) {
  const params = await searchParams

  const selectedMake = params.make?.trim() || ""
  const selectedModel = params.model?.trim() || ""
  const selectedYear = params.year
    ? Number(params.year)
    : null


const searchQuery = params.q?.trim() || ""



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
      {/* HERO */}
      {/* ========================================================= */}

      <HeroSection products={products} />

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
<Footer />
    </main>
  )
}