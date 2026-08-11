"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type CartItem = {
  id: string
  name: string
  price: number
  stock_quantity: number
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem("manfe-cart")

    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  function updateCart(updatedCart: CartItem[]) {
    setCart(updatedCart)
    localStorage.setItem("manfe-cart", JSON.stringify(updatedCart))
  }

  function increaseQuantity(id: string) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < item.stock_quantity) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }

      return item
    })

    updateCart(updatedCart)
  }

  function decreaseQuantity(id: string) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          }
        }

        return item
      })
      .filter((item) => item.quantity > 0)

    updateCart(updatedCart)
  }

  function removeItem(id: string) {
    const updatedCart = cart.filter((item) => item.id !== id)

    updateCart(updatedCart)
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  )

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="block">
            <h1 className="text-2xl font-black tracking-tight">
              MANFE
            </h1>

            <p className="text-xs font-bold tracking-[0.3em] text-red-600">
              AUTOPARTS
            </p>
          </Link>

          <Link
            href="/"
            className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </header>

      {/* Cart */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">
            Your order
          </p>

          <h2 className="mt-2 text-4xl font-black">
            Shopping Cart
          </h2>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
            <div className="text-5xl">🛒</div>

            <h3 className="mt-5 text-2xl font-black">
              Your cart is empty
            </h3>

            <p className="mt-2 text-zinc-500">
              Add some MANFE AUTOPARTS products to your cart.
            </p>

            <Link
              href="/#products"
              className="mt-6 inline-block rounded-xl bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
            >
              BROWSE PARTS
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  {/* Product */}
                  <div>
                    <h3 className="text-xl font-black">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      KSh {Number(item.price).toLocaleString()} each
                    </p>

                    <p className="mt-1 text-xs text-zinc-400">
                      {item.stock_quantity} available
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-lg font-black hover:bg-zinc-200"
                    >
                      −
                    </button>

                    <span className="min-w-8 text-center font-black">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      disabled={item.quantity >= item.stock_quantity}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-lg font-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>

                  {/* Item total */}
                  <div className="text-right">
                    <p className="text-xl font-black text-red-600">
                      KSh{" "}
                      {(
                        Number(item.price) * item.quantity
                      ).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 text-sm font-bold text-zinc-400 hover:text-red-600"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* Total */}
            <div className="rounded-2xl bg-zinc-950 p-6 text-white">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  Cart Total
                </span>

                <span className="text-3xl font-black text-red-500">
                  KSh {total.toLocaleString()}
                </span>
              </div>

 <Link
  href="/checkout"
  className="mt-6 block w-full rounded-xl bg-red-600 px-6 py-4 text-center font-black text-white transition hover:bg-red-700"
>
  PROCEED TO CHECKOUT
</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}