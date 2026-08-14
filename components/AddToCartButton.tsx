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

  const handleAddToCart = (e: React.MouseEvent) => {
    // Prevent navigating to the product page if clicked inside a linked card
    e.stopPropagation()
    e.preventDefault()

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

    window.dispatchEvent(
      new Event("cart-updated")
    )

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1200)
  }

  return (
<button
  type="button"
  onClick={handleAddToCart}
  disabled={isOutOfStock}
  className="w-full rounded-[3px] bg-zinc-900 py-1 text-[8px] font-black uppercase tracking-widest text-white transition-all duration-150 hover:bg-zinc-800 active:scale-[0.96] disabled:pointer-events-none disabled:bg-zinc-100 disabled:text-zinc-400 sm:py-1.5 sm:text-[9px]"
>
  {isOutOfStock ? (
    "OUT"
  ) : added ? (
    <span className="flex items-center justify-center gap-0.5 text-emerald-400">
      ADDED ✓
    </span>
  ) : (
    "ADD"
  )}
</button>

  )
}
