import Link from "next/link"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export default async function OrdersPage() {
  const supabase = await createSupabaseServerClient()

  // Get currently signed-in customer
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Not signed in
  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-100 text-zinc-900">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">

          <h1 className="text-3xl font-black">
            Sign in to view your orders
          </h1>

          <p className="mt-3 text-zinc-500">
            Your orders are connected to your MANFE account.
          </p>

          <div className="mt-8 flex justify-center gap-3">

            <Link
              href="/login"
              className="rounded-xl bg-red-600 px-6 py-3 font-black text-white hover:bg-red-700"
            >
              SIGN IN
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-zinc-950 px-6 py-3 font-black text-white hover:bg-zinc-800"
            >
              SHOP PARTS
            </Link>

          </div>

        </div>
      </main>
    )
  }

  // Get this customer's orders only
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
      updated_at,
      order_items (
        id,
        product_name,
        quantity,
        unit_price
      )
    `)
    .eq("customer_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">

      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-black">
              MANFE<span className="text-red-600">.</span>
            </h1>

            <p className="text-xs font-bold tracking-[0.3em] text-red-600">
              AUTOPARTS
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-black text-white hover:bg-red-600"
          >
            SHOP PARTS
          </Link>

        </div>

      </header>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12">

        <div className="mb-10">

          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">
            Customer Account
          </p>

          <h2 className="mt-2 text-4xl font-black">
            My Orders
          </h2>

          <p className="mt-3 text-zinc-500">
            View your MANFE AUTOPARTS orders and their current status.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <p className="font-black text-red-700">
              Unable to load your orders
            </p>

            <p className="mt-2 text-sm text-red-600">
              {error.message}
            </p>

          </div>
        )}

        {/* Empty */}
        {!error && orders?.length === 0 && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-2xl">
              📦
            </div>

            <h3 className="mt-5 text-2xl font-black">
              No orders yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
              You haven't placed an order with MANFE AUTOPARTS yet.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white hover:bg-red-700"
            >
              START SHOPPING
            </Link>

          </div>
        )}

        {/* Orders */}
        <div className="space-y-6">

          {orders?.map((order) => (

            <article
              key={order.id}
              className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
            >

              {/* Order header */}
              <div className="flex flex-col gap-4 border-b border-zinc-100 p-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Order Reference
                  </p>

                  <p className="mt-1 break-all font-mono text-sm font-bold">
                    {order.id}
                  </p>

                  <p className="mt-2 text-xs text-zinc-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                </div>

                <div className="flex flex-wrap gap-2">

                  <span className="rounded-full bg-yellow-50 px-4 py-2 text-xs font-black capitalize text-yellow-700">
                    {order.status}
                  </span>

                  <span
                    className={`rounded-full px-4 py-2 text-xs font-black capitalize ${
                      order.payment_status === "paid"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {order.payment_status}
                  </span>

                </div>

              </div>

              {/* Customer information */}
              <div className="grid gap-6 border-b border-zinc-100 p-6 md:grid-cols-3">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Customer
                  </p>

                  <p className="mt-1 font-black">
                    {order.customer_name || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Phone
                  </p>

                  <p className="mt-1 font-black">
                    {order.customer_phone || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Delivery / Pickup
                  </p>

                  <p className="mt-1 text-sm font-medium">
                    {order.delivery_address || "Not provided"}
                  </p>
                </div>

              </div>

              {/* Items */}
              <div className="p-6">

                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Items
                </p>

                <div className="mt-4 space-y-3">

                  {order.order_items?.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 rounded-xl bg-zinc-50 p-4"
                    >

                      <div>

                        <p className="font-bold">
                          {item.product_name}
                        </p>

                        <p className="mt-1 text-xs text-zinc-500">
                          Qty: {item.quantity} × KSh{" "}
                          {Number(item.unit_price).toLocaleString()}
                        </p>

                      </div>

                      <p className="font-black">
                        KSh{" "}
                        {(
                          Number(item.quantity) *
                          Number(item.unit_price)
                        ).toLocaleString()}
                      </p>

                    </div>

                  ))}

                </div>

                {/* Total */}
                <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-6">

                  <span className="font-black">
                    ORDER TOTAL
                  </span>

                  <span className="text-2xl font-black text-red-600">
                    KSh{" "}
                    {Number(order.total_amount).toLocaleString()}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>

    </main>
  )
}