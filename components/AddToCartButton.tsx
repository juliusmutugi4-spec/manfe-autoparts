"use client"

import { useState } from "react"

type Product = {
  id: string
  name: string
  price: number
  stock_quantity: number
}

type CartItem = Product & {
  quantity: number
}

export default function AddToCartButton({
  product,
}: {
  product: Product
}) {
  const [added, setAdded] = useState(false)

  const isOutOfStock = product.stock_quantity <= 0

  const handleAddToCart = () => {
    const cart: CartItem[] = JSON.parse(
      localStorage.getItem("manfe-cart") || "[]"
    )

    const item = cart.find(
      (i) => i.id === product.id
    )

    if (item) {
      if (item.quantity >= product.stock_quantity) {
        return
      }

      item.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1,
      })
    }

    localStorage.setItem(
      "manfe-cart",
      JSON.stringify(cart)
    )

    // Tell the header/cart badge to update immediately
    window.dispatchEvent(
      new Event("cart-updated")
    )

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className="w-full rounded-lg bg-zinc-900 py-2.5 text-xs font-semibold text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:pointer-events-none disabled:bg-zinc-100 disabled:text-zinc-400"
    >
      {isOutOfStock
        ? "Out of Stock"
        : added
          ? "Added ✓"
          : "Add to Cart"}
    </button>
  )
}