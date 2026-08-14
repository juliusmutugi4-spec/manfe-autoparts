import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">

      {/* TOP BAR */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white">
        <div className="flex h-20 items-center justify-between px-5 sm:px-8">

          {/* BRAND */}
          <Link href="/admin" className="shrink-0">
            <h1 className="text-2xl font-black tracking-tight">
              MANFE<span className="text-red-600">.</span>
            </h1>

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600">
              AUTOPARTS ADMIN
            </p>
          </Link>

          {/* RIGHT */}
          <div className="flex items-center gap-3">

            <Link
              href="/"
              className="hidden rounded-xl border border-zinc-200 px-4 py-2 text-sm font-bold transition hover:border-red-600 hover:text-red-600 sm:block"
            >
              VIEW STORE
            </Link>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">
              A
            </div>

          </div>

        </div>
      </header>

      {/* BODY */}
      <div className="flex">

        {/* SIDEBAR */}
        <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto border-r border-zinc-200 bg-white lg:block">

          <nav className="space-y-2 p-5">

            <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Overview
            </p>

            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
            >
              <span>📊</span>
              Dashboard
            </Link>

            <div className="my-5 border-t border-zinc-100" />

            <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Commerce
            </p>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
            >
              <span>🧾</span>
              Orders
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
            >
              <span>📦</span>
              Products
            </Link>

<Link
  href="/admin/products/inventory"
  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
>
  <span>📋</span>
  Inventory
</Link>


            <Link
              href="/admin/products"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
            >
              <span>➕</span>
              Add Product
            </Link>

            <div className="my-5 border-t border-zinc-100" />


<div className="my-5 border-t border-zinc-100" />

<p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
  Customers
</p>

<Link
  href="/admin/customers"
  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
>
  <span>👥</span>
  Customers
</Link>

<div className="my-5 border-t border-zinc-100" />

<p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
  Finance
</p>

<div className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-zinc-400">
  <span>💳</span>
  Payments
  <span className="ml-auto text-[9px] font-black uppercase">
    Soon
  </span>
</div>

<div className="my-5 border-t border-zinc-100" />

<p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
  Insights
</p>

<div className="flex cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-zinc-400">
  <span>📈</span>
  Analytics
  <span className="ml-auto text-[9px] font-black uppercase">
    Soon
  </span>
</div>

            <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              Store
            </p>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
            >
              <span>🌐</span>
              Storefront
            </Link>

            <Link
              href="/cart"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition hover:bg-zinc-100"
            >
              <span>🛒</span>
              Customer Cart
            </Link>

          </nav>

        </aside>

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>

    </div>
  )
}