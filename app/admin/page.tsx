import Link from "next/link"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient()

  const [
    productsResult,
    activeProductsResult,
    lowStockResult,
    ordersResult,
    pendingOrdersResult,
    paidOrdersResult,
    customersResult,
    revenueResult,
    recentOrdersResult,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true),

    supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true)
      .lte("stock_quantity", 5),

    supabase
      .from("orders")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),

    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("payment_status", "paid"),

    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "customer"),

    supabase
      .from("orders")
      .select("total_amount")
      .eq("payment_status", "paid"),

    supabase
      .from("orders")
      .select(`
        id,
        customer_name,
        total_amount,
        status,
        payment_status,
        created_at
      `)
      .order("created_at", { ascending: false })
      .limit(8),
  ])

  const totalRevenue =
    revenueResult.data?.reduce(
      (sum, order) => sum + Number(order.total_amount || 0),
      0
    ) ?? 0

  const stats = [
    {
      label: "Total Products",
      value: productsResult.count ?? 0,
      href: "/admin/products",
      icon: "📦",
    },
    {
      label: "Active Products",
      value: activeProductsResult.count ?? 0,
      href: "/admin/products",
      icon: "🛒",
    },
    {
      label: "Low Stock",
      value: lowStockResult.count ?? 0,
      href: "/admin/products",
      icon: "⚠️",
    },
    {
      label: "Total Orders",
      value: ordersResult.count ?? 0,
      href: "/admin/orders",
      icon: "🧾",
    },
    {
      label: "Pending Orders",
      value: pendingOrdersResult.count ?? 0,
      href: "/admin/orders",
      icon: "⏳",
    },
    {
      label: "Paid Orders",
      value: paidOrdersResult.count ?? 0,
      href: "/admin/orders",
      icon: "💳",
    },
    {
      label: "Customers",
      value: customersResult.count ?? 0,
      href: "/admin",
      icon: "👥",
    },
  ]

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">

      {/* PAGE HEADER */}
      <div className="mb-8">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
          MANFE AUTOPARTS
        </p>

        <h2 className="mt-2 text-4xl font-black tracking-tight">
          Dashboard
        </h2>

        <p className="mt-2 text-zinc-500">
          Monitor your store, products, orders and sales.
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">

        <Link
          href="/admin/products"
          className="rounded-2xl bg-red-600 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:bg-red-700"
        >
          <div className="text-2xl">➕</div>

          <p className="mt-4 text-lg font-black">
            Add Product
          </p>

          <p className="mt-1 text-sm text-red-100">
            Upload a new automotive part.
          </p>
        </Link>

        <Link
          href="/admin/orders"
          className="rounded-2xl bg-zinc-950 p-6 text-white shadow-sm transition hover:-translate-y-1 hover:bg-zinc-800"
        >
          <div className="text-2xl">🧾</div>

          <p className="mt-4 text-lg font-black">
            Manage Orders
          </p>

          <p className="mt-1 text-sm text-zinc-400">
            Review and process customer orders.
          </p>
        </Link>

        <Link
          href="/admin/products"
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-300"
        >
          <div className="text-2xl">📦</div>

          <p className="mt-4 text-lg font-black">
            Inventory
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            Manage products and stock levels.
          </p>
        </Link>

      </div>

      {/* STATISTICS */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-200"
          >
            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {stat.label}
                </p>

                <p className="mt-3 text-3xl font-black">
                  {stat.value.toLocaleString()}
                </p>
              </div>

              <span className="text-2xl">
                {stat.icon}
              </span>

            </div>
          </Link>
        ))}

      </div>

      {/* REVENUE */}
      <div className="mt-4 rounded-2xl bg-zinc-950 p-6 text-white shadow-sm">

        <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">
          Paid Revenue
        </p>

        <p className="mt-2 text-4xl font-black">
          KSh {totalRevenue.toLocaleString()}
        </p>

        <p className="mt-2 text-sm text-zinc-500">
          Total value of orders currently marked as paid.
        </p>

      </div>

      {/* RECENT ORDERS */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b border-zinc-100 p-6">

          <div>
            <h3 className="text-xl font-black">
              Recent Orders
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Latest customer activity.
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-sm font-black text-red-600 hover:text-red-700"
          >
            VIEW ALL →
          </Link>

        </div>

        <div className="divide-y divide-zinc-100">

          {recentOrdersResult.data?.length ? (

            recentOrdersResult.data.map((order) => (
              <div
                key={order.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >

                <div className="min-w-0">

                  <p className="font-black">
                    {order.customer_name || "Customer"}
                  </p>

                  <p className="mt-1 truncate font-mono text-xs text-zinc-400">
                    {order.id}
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    {new Date(order.created_at).toLocaleString()}
                  </p>

                </div>

                <div className="flex flex-wrap items-center gap-3">

                  <p className="font-black">
                    KSh{" "}
                    {Number(order.total_amount).toLocaleString()}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black capitalize ${
                      order.payment_status === "paid"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {order.payment_status}
                  </span>

                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-black capitalize text-yellow-700">
                    {order.status}
                  </span>

                </div>

              </div>
            ))

          ) : (

            <div className="p-10 text-center text-sm text-zinc-500">
              No orders yet.
            </div>

          )}

        </div>

      </div>

      {/* INVENTORY ALERT */}
      <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <p className="text-xs font-black uppercase tracking-wider text-orange-600">
              Inventory Alert
            </p>

            <h3 className="mt-1 text-xl font-black">
              {lowStockResult.count ?? 0} products need attention
            </h3>

            <p className="mt-1 text-sm text-zinc-600">
              Products with 5 or fewer units remaining.
            </p>

          </div>

          <Link
            href="/admin/products"
            className="rounded-xl bg-zinc-950 px-5 py-3 text-center text-sm font-black text-white transition hover:bg-red-600"
          >
            CHECK INVENTORY
          </Link>

        </div>

      </div>

    </section>
  )
}