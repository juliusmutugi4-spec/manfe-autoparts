"use client"

import { useState } from "react"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

type OrderItem = {
  id: string
  product_name: string
  quantity: number
  unit_price: number
}

type Order = {
  id: string
  customer_name: string | null
  customer_phone: string | null
  delivery_address: string | null
  total_amount: number
  status: string
  payment_status: string
  payment_method: string | null
  created_at: string
  order_items: OrderItem[]
}

const statuses = [
  "pending",
  "confirmed",
  "processing",
  "ready",
  "completed",
  "cancelled",
]

const paymentStatuses = [
  "unpaid",
  "pending",
  "paid",
  "failed",
  "refunded",
]

export default function OrderManagement({
  orders,
}: {
  orders: Order[]
}) {
  const supabase = createSupabaseBrowserClient()

  const [items, setItems] = useState(orders)
  const [saving, setSaving] = useState<string | null>(null)
  const [message, setMessage] = useState("")

  async function updateOrder(
    orderId: string,
    status: string,
    paymentStatus: string
  ) {
    setSaving(orderId)
    setMessage("")

    const { error } = await supabase.rpc("admin_update_order", {
      p_order_id: orderId,
      p_status: status,
      p_payment_status: paymentStatus,
    })

    if (error) {
      console.error("ADMIN ORDER UPDATE ERROR:", error)
      setMessage(error.message)
      setSaving(null)
      return
    }

    setItems((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
              payment_status: paymentStatus,
            }
          : order
      )
    )

    setMessage("Order updated successfully.")
    setSaving(null)
  }

  return (
    <div className="space-y-6">

      {message && (
        <div className="rounded-xl border border-zinc-200 bg-white px-5 py-4 text-sm font-bold">
          {message}
        </div>
      )}

      {items.map((order) => (

        <article
          key={order.id}
          className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
        >

          {/* HEADER */}
          <div className="flex flex-col gap-4 border-b border-zinc-100 p-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Order ID
              </p>

              <p className="mt-1 break-all font-mono text-sm font-bold">
                {order.id}
              </p>

<p className="mt-2 text-xs text-zinc-500">
  {new Date(order.created_at).toISOString().replace("T", " ").slice(0, 19)}
</p>

            </div>

            {/* CONTROLS */}
            <div className="flex flex-col gap-3 sm:flex-row">

              <div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Order Status
                </label>

                <select
                  value={order.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value

                    updateOrder(
                      order.id,
                      nextStatus,
                      order.payment_status
                    )
                  }}
                  disabled={saving === order.id}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-red-600"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Payment
                </label>

                <select
                  value={order.payment_status}
                  onChange={(e) => {
                    const nextPaymentStatus = e.target.value

                    updateOrder(
                      order.id,
                      order.status,
                      nextPaymentStatus
                    )
                  }}
                  disabled={saving === order.id}
                  className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-red-600"
                >
                  {paymentStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

            </div>

          </div>

          {/* CUSTOMER */}
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

          {/* ITEMS */}
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

            {/* TOTAL */}
            <div className="mt-6 flex flex-col gap-4 border-t border-zinc-200 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Payment Method
                </p>

                <p className="mt-1 font-black">
                  {order.payment_method || "Not selected"}
                </p>
              </div>

              <div className="text-left sm:text-right">

                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Order Total
                </p>

                <p className="mt-1 text-3xl font-black text-red-600">
                  KSh{" "}
                  {Number(order.total_amount).toLocaleString()}
                </p>

              </div>

            </div>

          </div>

        </article>

      ))}

    </div>
  )
}