"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type CartItem = {
  id: string
  name: string
  price: number
  stock_quantity: number
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()

  const [cart, setCart] = useState<CartItem[]>([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [location, setLocation] = useState("")

  const [placingOrder, setPlacingOrder] = useState(false)
  const [orderError, setOrderError] = useState("")

  useEffect(() => {
    const savedCart = localStorage.getItem("manfe-cart")

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch {
        setCart([])
      }
    }
  }, [])

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  )

  async function placeOrder() {
    setOrderError("")

    if (!name.trim()) {
      setOrderError("Please enter your full name.")
      return
    }

    if (!phone.trim()) {
      setOrderError("Please enter your phone number.")
      return
    }

    if (!location.trim()) {
      setOrderError("Please enter your delivery or pickup location.")
      return
    }

    if (cart.length === 0) {
      setOrderError("Your cart is empty.")
      return
    }

    setPlacingOrder(true)

    try {
      const items = cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: Number(item.price),
      }))

      const { data, error } = await supabase.rpc(
        "create_guest_order",
        {
          p_customer_name: name.trim(),
          p_customer_phone: phone.trim(),
          p_delivery_address: location.trim(),
          p_total_amount: total,
          p_items: items,
        }
      )

      if (error) {
        console.error("SUPABASE ORDER ERROR:", error)
        throw new Error(error.message)
      }

      console.log("ORDER CREATED:", data)

      localStorage.removeItem("manfe-cart")

      router.push(`/order-success?order=${data}`)
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error)

      setOrderError(
        error instanceof Error
          ? error.message
          : "Unable to place order."
      )
    } finally {
      setPlacingOrder(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">

      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-black">
              MANFE
            </h1>

            <p className="text-xs font-bold tracking-[0.3em] text-red-600">
              AUTOPARTS
            </p>
          </div>

          <Link
            href="/cart"
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white hover:bg-red-600"
          >
            BACK TO CART
          </Link>

        </div>
      </header>

      {/* Checkout */}
      <section className="mx-auto max-w-5xl px-6 py-12">

        <div className="mb-10">

          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">
            Your order
          </p>

          <h2 className="mt-2 text-4xl font-black">
            Checkout
          </h2>

          <p className="mt-3 text-zinc-500">
            Enter your details to place your MANFE AUTOPARTS order.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Customer details */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">

            <h3 className="text-xl font-black">
              Customer Details
            </h3>

            <div className="mt-6 space-y-5">

              {/* Name */}
              <div>

                <label className="mb-2 block text-sm font-bold">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600"
                />

              </div>

              {/* Phone */}
              <div>

                <label className="mb-2 block text-sm font-bold">
                  Phone Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07XXXXXXXX"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600"
                />

              </div>

              {/* Location */}
              <div>

                <label className="mb-2 block text-sm font-bold">
                  Delivery / Pickup Location
                </label>

                <textarea
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location or delivery address"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600"
                />

              </div>

            </div>

          </div>

          {/* Order summary */}
          <div className="h-fit rounded-2xl bg-zinc-950 p-6 text-white">

            <h3 className="text-xl font-black">
              Order Summary
            </h3>

            <div className="mt-6 space-y-4">

              {cart.length === 0 ? (

                <p className="text-sm text-zinc-400">
                  Your cart is empty.
                </p>

              ) : (

                cart.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 border-b border-white/10 pb-4"
                  >

                    <div>

                      <p className="font-bold">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        KSh {Number(item.price).toLocaleString()} each
                      </p>

                      <p className="mt-1 text-xs text-zinc-400">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="font-bold text-red-500">
                      KSh{" "}
                      {(
                        Number(item.price) *
                        Number(item.quantity)
                      ).toLocaleString()}
                    </p>

                  </div>

                ))

              )}

            </div>

            {/* Total */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-6">

              <span className="font-bold">
                Total
              </span>

              <span className="text-3xl font-black text-red-500">
                KSh {total.toLocaleString()}
              </span>

            </div>

            {/* Error */}
            {orderError && (
              <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-medium text-red-400">
                {orderError}
              </div>
            )}

            {/* Place order */}
            <button
              type="button"
              onClick={placeOrder}
              disabled={placingOrder || cart.length === 0}
              className="mt-6 w-full rounded-xl bg-red-600 px-5 py-4 font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-600"
            >
              {placingOrder
                ? "PLACING ORDER..."
                : "PLACE ORDER"}
            </button>

            <p className="mt-4 text-center text-xs text-zinc-500">
              Payment will be handled securely after order confirmation.
            </p>

          </div>

        </div>

      </section>

    </main>
  )
}