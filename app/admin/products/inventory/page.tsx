import Link from "next/link"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export default async function InventoryPage() {
  const supabase = await createSupabaseServerClient()

  const { data: products, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      price,
      stock_quantity,
      image_url,
      brand,
      is_active,
      is_featured,
      part_number
    `)
    .order("name", { ascending: true })

  const totalProducts = products?.length ?? 0
  const activeProducts =
    products?.filter((product) => product.is_active).length ?? 0
  const lowStock =
    products?.filter(
      (product) =>
        product.stock_quantity > 0 &&
        product.stock_quantity <= 5
    ).length ?? 0
  const outOfStock =
    products?.filter(
      (product) => product.stock_quantity <= 0
    ).length ?? 0

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">

      {/* HEADER */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <p className="text-xl font-black">
              MANFE<span className="text-red-600">.</span>
            </p>

            <p className="text-[10px] font-black tracking-[0.3em] text-red-600">
              INVENTORY
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              href="/admin"
              className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-black hover:border-red-600 hover:text-red-600"
            >
              DASHBOARD
            </Link>

            <Link
              href="/admin/products"
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-black text-white hover:bg-red-700"
            >
              + ADD PRODUCT
            </Link>

          </div>

        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">

        {/* TITLE */}
        <div className="mb-8">

          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            Commerce
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight">
            Inventory
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage products, stock levels and storefront visibility.
          </p>

        </div>

        {/* SUMMARY */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Total Products
            </p>

            <p className="mt-2 text-3xl font-black">
              {totalProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Active
            </p>

            <p className="mt-2 text-3xl font-black text-green-600">
              {activeProducts}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Low Stock
            </p>

            <p className="mt-2 text-3xl font-black text-orange-600">
              {lowStock}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
              Out of Stock
            </p>

            <p className="mt-2 text-3xl font-black text-red-600">
              {outOfStock}
            </p>
          </div>

        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">

            <p className="font-black text-red-700">
              Unable to load inventory
            </p>

            <p className="mt-2 text-sm text-red-600">
              {error.message}
            </p>

          </div>
        )}

        {/* PRODUCT TABLE */}
        {!error && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

            <div className="border-b border-zinc-100 px-6 py-5">

              <h2 className="text-xl font-black">
                Products
              </h2>

              <p className="mt-1 text-sm text-zinc-500">
                Current inventory across your store.
              </p>

            </div>

            {products?.length === 0 ? (

              <div className="p-12 text-center">

                <p className="text-xl font-black">
                  No products found
                </p>

                <Link
                  href="/admin/products"
                  className="mt-5 inline-block rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white"
                >
                  ADD FIRST PRODUCT
                </Link>

              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full min-w-[900px]">

                  <thead className="bg-zinc-50">

                    <tr>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-zinc-400">
                        Product
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-zinc-400">
                        Part Number
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-zinc-400">
                        Price
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-zinc-400">
                        Stock
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-zinc-400">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-zinc-400">
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-zinc-100">

                    {products?.map((product) => {

                      const stock =
                        product.stock_quantity ?? 0

                      const stockLabel =
                        stock <= 0
                          ? "OUT OF STOCK"
                          : stock <= 5
                            ? "LOW STOCK"
                            : "IN STOCK"

                      return (
                        <tr
                          key={product.id}
                          className="hover:bg-zinc-50"
                        >

                          {/* PRODUCT */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-4">

                              <div className="h-14 w-14 overflow-hidden rounded-xl bg-zinc-100">

                                {product.image_url ? (
                                  <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="h-full w-full object-contain"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center">
                                    🔧
                                  </div>
                                )}

                              </div>

                              <div>

                                <p className="font-black">
                                  {product.name}
                                </p>

                                <p className="mt-1 text-xs text-zinc-400">
                                  {product.brand || "No brand"}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* PART NUMBER */}
                          <td className="px-6 py-5 font-mono text-sm text-zinc-500">
                            {product.part_number || "—"}
                          </td>

                          {/* PRICE */}
                          <td className="px-6 py-5 font-black">
                            KSh{" "}
                            {Number(
                              product.price
                            ).toLocaleString()}
                          </td>

                          {/* STOCK */}
                          <td className="px-6 py-5">

                            <p className="font-black">
                              {stock}
                            </p>

                            <p
                              className={`mt-1 text-[10px] font-black ${
                                stock <= 0
                                  ? "text-red-600"
                                  : stock <= 5
                                    ? "text-orange-600"
                                    : "text-green-600"
                              }`}
                            >
                              {stockLabel}
                            </p>

                          </td>

                          {/* STATUS */}
                          <td className="px-6 py-5">

                            <div className="flex flex-wrap gap-2">

                              <span
                                className={`rounded-full px-3 py-1 text-[10px] font-black ${
                                  product.is_active
                                    ? "bg-green-50 text-green-700"
                                    : "bg-zinc-100 text-zinc-500"
                                }`}
                              >
                                {product.is_active
                                  ? "ACTIVE"
                                  : "INACTIVE"}
                              </span>

                              {product.is_featured && (
                                <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-black text-red-600">
                                  FEATURED
                                </span>
                              )}

                            </div>

                          </td>

                          {/* ACTION */}
                          <td className="px-6 py-5 text-right">

                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              className="rounded-lg border border-zinc-200 px-4 py-2 text-xs font-black hover:border-red-600 hover:text-red-600"
                            >
                              VIEW
                            </Link>

                          </td>

                        </tr>
                      )
                    })}

                  </tbody>

                </table>

              </div>

            )}

          </div>
        )}

      </section>

    </main>
  )
}