import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"

type ProductPageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params

  const { data: product, error } = await supabase
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
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle()

  if (error) {
    console.error("PRODUCT DETAILS ERROR:", error)
  }

  if (!product) {
    notFound()
  }

  const isOutOfStock = product.stock_quantity <= 0

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">

          {/* IMAGE */}
          <div className="flex min-h-[350px] items-center justify-center overflow-hidden rounded-2xl bg-zinc-50">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full max-h-[550px] w-full object-contain"
              />
            ) : (
              <div className="text-6xl">
                🔧
              </div>
            )}
          </div>

          {/* INFORMATION */}
          <div className="flex flex-col">

            {product.brand && (
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                {product.brand}
              </p>
            )}

            <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
              {product.name}
            </h1>

            {product.part_number && (
              <p className="mt-2 text-sm text-zinc-500">
                Part Number:{" "}
                <span className="font-bold text-zinc-800">
                  {product.part_number}
                </span>
              </p>
            )}

            {/* PRICE */}
            <div className="mt-6 border-y border-zinc-100 py-5">
              <p className="text-3xl font-black text-zinc-950">
                KSh {Number(product.price).toLocaleString()}
              </p>

              <p
                className={`mt-2 text-sm font-bold ${
                  isOutOfStock
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                {isOutOfStock
                  ? "✕ Out of stock"
                  : `✓ ${product.stock_quantity} available`}
              </p>
            </div>

            {/* VEHICLE */}
            {(product.vehicle_make ||
              product.vehicle_model) && (
              <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                  Vehicle Compatibility
                </p>

                <p className="mt-2 font-black text-zinc-900">
                  🚗 {product.vehicle_make}{" "}
                  {product.vehicle_model}
                </p>

                {(product.vehicle_year_from ||
                  product.vehicle_year_to) && (
                  <p className="mt-1 text-sm text-zinc-500">
                    {product.vehicle_year_from ?? "Any"} –{" "}
                    {product.vehicle_year_to ?? "Present"}
                  </p>
                )}
              </div>
            )}

            {/* DESCRIPTION */}
            {product.description && (
              <div className="mt-5">
                <h2 className="text-sm font-black uppercase tracking-wider text-zinc-900">
                  Description
                </h2>

                <p className="mt-2 text-sm leading-7 text-zinc-600">
                  {product.description}
                </p>
              </div>
            )}

            {/* CATEGORY */}
            {product.categories?.[0]?.name && (
              <p className="mt-5 text-sm text-zinc-500">
                Category:{" "}
                <span className="font-bold text-zinc-800">
                  {product.categories[0].name}
                </span>
              </p>
            )}

            {/* ACTION */}
            <div className="mt-7">
              <button
                disabled={isOutOfStock}
                className="w-full rounded-xl bg-zinc-950 px-6 py-4 text-sm font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-zinc-300"
              >
                {isOutOfStock
                  ? "OUT OF STOCK"
                  : "ADD TO CART"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}