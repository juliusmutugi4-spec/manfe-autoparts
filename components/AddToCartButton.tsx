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

  function addToCart() {
    const existingCart: CartItem[] = JSON.parse(
      localStorage.getItem("manfe-cart") || "[]"
    )

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    )

    if (existingProduct) {
      if (existingProduct.quantity >= product.stock_quantity) {
        return
      }

      existingProduct.quantity += 1
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      })
    }

    localStorage.setItem(
      "manfe-cart",
      JSON.stringify(existingCart)
    )

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  return (
    <button
      onClick={addToCart}
      disabled={product.stock_quantity <= 0}
      className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-zinc-300"
    >
      {added ? "ADDED ✓" : "ADD TO CART"}
    </button>
  )
}