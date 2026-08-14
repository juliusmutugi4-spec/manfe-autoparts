import Link from "next/link"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export default async function AdminCustomersPage() {
  const supabase = await createSupabaseServerClient()

  const { data: customers, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      phone,
      role,
      created_at
    `)
    .eq("role", "customer")
    .order("created_at", { ascending: false })

  return (
    <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

      {/* HEADER */}
      <div className="mb-6 sm:mb-8">

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600 sm:text-xs">
          MANFE AUTOPARTS
        </p>

        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
              Customers
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
              View and manage customers registered with MANFE AUTOPARTS.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-xs font-black transition hover:border-red-600 hover:text-red-600 sm:w-auto"
          >
            ← DASHBOARD
          </Link>

        </div>

      </div>

      {/* SUMMARY */}
      <div className="mb-6 overflow-hidden rounded-2xl bg-zinc-950 p-5 text-white sm:p-6">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              Customer Accounts
            </p>

            <p className="mt-2 text-3xl font-black sm:text-4xl">
              {customers?.length ?? 0}
            </p>

            <p className="mt-1 text-xs text-zinc-400">
              Registered customer accounts
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-xl sm:h-14 sm:w-14">
            👥
          </div>

        </div>

      </div>

      {/* ERROR */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">

          <p className="font-black text-red-700">
            Unable to load customers
          </p>

          <p className="mt-2 text-sm leading-6 text-red-600">
            {error.message}
          </p>

        </div>
      )}

      {/* EMPTY */}
      {!error && customers?.length === 0 && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100 text-2xl">
            👥
          </div>

          <h3 className="mt-4 text-xl font-black">
            No customers yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
            Customer accounts will appear here when people register.
          </p>

        </div>
      )}

      {/* ================================================== */}
      {/* MOBILE CUSTOMER CARDS */}
      {/* ================================================== */}

      {!error && customers && customers.length > 0 && (
        <div className="space-y-3 md:hidden">

          {customers.map((customer) => {

            const displayName =
              customer.full_name ||
              "Unnamed customer"

            const initial = displayName
              .charAt(0)
              .toUpperCase()

            return (
              <article
                key={customer.id}
                className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm"
              >

                {/* TOP */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">
                      {initial}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-black text-zinc-950">
                        {displayName}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-zinc-400">
                        Customer
                      </p>

                    </div>

                  </div>

                  <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-black text-green-700">
                    ACTIVE
                  </span>

                </div>

                {/* DETAILS */}
                <div className="mt-4 space-y-3 border-t border-zinc-100 pt-4">

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                      Email
                    </p>

                    <p className="mt-1 break-all text-sm font-medium text-zinc-700">
                      {customer.email || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-zinc-700">
                      {customer.phone || "Not provided"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Joined
                      </p>

                      <p className="mt-1 text-sm font-medium text-zinc-700">
                        {new Date(
                          customer.created_at
                        ).toLocaleDateString("en-GB")}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                        Account
                      </p>

                      <p className="mt-1 text-xs font-bold text-zinc-500">
                        Customer
                      </p>
                    </div>

                  </div>

                </div>

              </article>
            )
          })}

        </div>
      )}

      {/* ================================================== */}
      {/* DESKTOP CUSTOMER TABLE */}
      {/* ================================================== */}

      {!error && customers && customers.length > 0 && (
        <div className="hidden overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm md:block">

          <div className="border-b border-zinc-100 px-6 py-4">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-black">
                  Customer Directory
                </p>

                <p className="mt-1 text-xs text-zinc-400">
                  All registered customer accounts
                </p>
              </div>

              <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-black text-zinc-600">
                {customers.length} customers
              </span>

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b border-zinc-200 bg-zinc-50">

                <tr>

                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-wider text-zinc-400">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-zinc-100">

                {customers.map((customer) => {

                  const displayName =
                    customer.full_name ||
                    "Unnamed customer"

                  const initial = displayName
                    .charAt(0)
                    .toUpperCase()

                  return (
                    <tr
                      key={customer.id}
                      className="transition hover:bg-zinc-50"
                    >

                      {/* CUSTOMER */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-sm font-black text-white">
                            {initial}
                          </div>

                          <div className="min-w-0">

                            <p className="font-black text-zinc-950">
                              {displayName}
                            </p>

                            <p className="mt-1 max-w-[220px] truncate font-mono text-[9px] text-zinc-400">
                              {customer.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}
                      <td className="px-6 py-5 text-sm font-medium text-zinc-600">
                        {customer.email || "Not provided"}
                      </td>

                      {/* PHONE */}
                      <td className="px-6 py-5 text-sm font-medium text-zinc-600">
                        {customer.phone || "Not provided"}
                      </td>

                      {/* JOINED */}
                      <td className="px-6 py-5 text-sm text-zinc-500">
                        {new Date(
                          customer.created_at
                        ).toLocaleDateString("en-GB")}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-5 text-right">

                        <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-black text-green-700">
                          ACTIVE
                        </span>

                      </td>

                    </tr>
                  )
                })}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </section>
  )
}