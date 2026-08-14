import Link from "next/link"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import OrderManagement from "./OrderManagement"

export default async function AdminOrdersPage() {
  const supabase = await createSupabaseServerClient()

  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      id,
      customer_name,
      customer_phone,
      delivery_address,
      total_amount,
      status,
      payment_status,
      payment_method,
      created_at,
      order_items (
        id,
        product_name,
        quantity,
        unit_price
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
            MANFE AUTOPARTS
          </p>

          <h2 className="mt-2 text-4xl font-black tracking-tight">
            Orders
          </h2>

          <p className="mt-2 text-zinc-500">
            Manage customer orders, fulfillment and payments.
          </p>

        </div>

        <Link
          href="/admin"
          className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-black hover:border-red-600 hover:text-red-600"
        >
          ← DASHBOARD
        </Link>

      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

          <p className="font-black text-red-700">
            Unable to load orders
          </p>

          <p className="mt-2 text-sm text-red-600">
            {error.message}
          </p>

        </div>
      ) : (
        <OrderManagement orders={orders ?? []} />
      )}

    </section>
  )
}