"use client"

import Link from "next/link"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order")

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">

      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-black">
              MANFE<span className="text-red-600">.</span>
            </h1>

            <p className="text-xs font-bold tracking-[0.3em] text-red-600">
              AUTOPARTS & ACCESSORIES
            </p>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600"
          >
            CONTINUE SHOPPING
          </Link>

        </div>
      </header>

      {/* Success */}
      <section className="mx-auto flex min-h-[75vh] max-w-3xl items-center justify-center px-6 py-16">

        <div className="w-full rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm sm:p-12">

          {/* Check */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
            ✓
          </div>

          <p className="mt-8 text-sm font-black uppercase tracking-[0.25em] text-red-600">
            MANFE AUTOPARTS
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Order Received
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-zinc-500">
            Thank you for your order. We have received your MANFE AUTOPARTS
            request and will contact you to confirm the order and payment.
          </p>

          {/* Order ID */}
          {orderId && (
            <div className="mt-8 rounded-2xl bg-zinc-100 p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Order Reference
              </p>

              <p className="mt-2 break-all font-mono text-sm font-bold text-zinc-900">
                {orderId}
              </p>

            </div>
          )}

          {/* Status */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-xs font-bold text-zinc-400">
                ORDER
              </p>

              <p className="mt-1 font-black text-green-600">
                RECEIVED
              </p>
            </div>

            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-xs font-bold text-zinc-400">
                PAYMENT
              </p>

              <p className="mt-1 font-black text-zinc-600">
                PENDING
              </p>
            </div>

            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-xs font-bold text-zinc-400">
                STATUS
              </p>

              <p className="mt-1 font-black text-zinc-600">
                PROCESSING
              </p>
            </div>

          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/"
              className="rounded-xl bg-red-600 px-6 py-4 font-black text-white transition hover:bg-red-700"
            >
              CONTINUE SHOPPING
            </Link>

            <Link
              href="/cart"
              className="rounded-xl bg-zinc-950 px-6 py-4 font-black text-white transition hover:bg-zinc-800"
            >
              VIEW CART
            </Link>

          </div>

          <p className="mt-8 text-xs text-zinc-400">
            MANFE AUTOPARTS · Nairobi, Kenya · 0722 921 017
          </p>

        </div>

      </section>

    </main>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-zinc-100">
          <div className="text-sm font-bold text-zinc-500">
            Loading order...
          </div>
        </main>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}