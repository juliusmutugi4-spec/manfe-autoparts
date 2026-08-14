"use client"

import React, { useEffect, useState } from "react"
import {
  Search,
  User,
  HelpCircle,
  ChevronDown,
  Menu,
  X,
  Wrench,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

interface ProductSearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearchSubmit?: (searchTerm: string) => void
  cartCount?: number
}

type Profile = {
  full_name: string | null
  email: string | null
  role: string
}

export default function JumiaStyleHeader({
  value,
  onChange,
  onSearchSubmit,
  cartCount = 0,
}: ProductSearchBarProps) {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [user, setUser] = useState<{
    id: string
    email?: string
  } | null>(null)

  const [profile, setProfile] = useState<Profile | null>(null)

  // LIVE CART COUNT
  const [liveCartCount, setLiveCartCount] = useState(cartCount)

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (onSearchSubmit) {
      onSearchSubmit(value)
    }
  }

  // Load cart count from localStorage
  function loadCartCount() {
    try {
      const savedCart = localStorage.getItem("manfe-cart")

      if (!savedCart) {
        setLiveCartCount(0)
        return
      }

      const cart = JSON.parse(savedCart)

      const count = cart.reduce(
        (
          total: number,
          item: { quantity?: number }
        ) => {
          return total + Number(item.quantity || 0)
        },
        0
      )

      setLiveCartCount(count)
    } catch {
      setLiveCartCount(0)
    }
  }

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)

    if (!user) {
      setProfile(null)
      return
    }

    const { data } = await supabase
      .from("profiles")
      .select("full_name, email, role")
      .eq("id", user.id)
      .maybeSingle()

    setProfile(data)
  }

  useEffect(() => {
    // Initial cart count
    loadCartCount()

    // Initial user
    loadUser()

    // Listen for cart updates from AddToCartButton
    window.addEventListener(
      "cart-updated",
      loadCartCount
    )

    // Listen for localStorage changes
    window.addEventListener(
      "storage",
      loadCartCount
    )

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const nextUser = session?.user ?? null

        setUser(nextUser)

        if (!nextUser) {
          setProfile(null)
          return
        }

        setTimeout(() => {
          loadUser()
        }, 0)
      }
    )

    return () => {
      window.removeEventListener(
        "cart-updated",
        loadCartCount
      )

      window.removeEventListener(
        "storage",
        loadCartCount
      )

      subscription.unsubscribe()
    }
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()

    setUser(null)
    setProfile(null)
    setIsAccountOpen(false)
    setIsMobileMenuOpen(false)

    router.refresh()
  }

  const firstName =
    profile?.full_name?.trim().split(/\s+/)[0] ||
    "Customer"

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] border-b border-zinc-200 bg-white shadow-sm">

      {/* DESKTOP TOP RIBBON */}
      <div className="hidden bg-zinc-100 py-1.5 text-xs text-zinc-600 md:block">

        <div className="mx-auto flex max-w-[1184px] items-center justify-between px-4">

          <div className="flex items-center gap-4">

            <span className="cursor-pointer font-medium text-orange-500 hover:underline">
              Sell on Manfe
            </span>

            <span className="text-zinc-400">
              |
            </span>

            <span className="cursor-pointer hover:text-zinc-900">
              Enterprise
            </span>

          </div>

          <div>
            <span className="font-semibold text-zinc-700">
              MANFE<span className="text-orange-500">.</span> MAA
            </span>{" "}
            Autoparts
          </div>

        </div>

      </div>

      {/* MAIN HEADER */}
      <div className="bg-white">

        <div className="mx-auto flex h-16 max-w-[1184px] items-center gap-2 px-3 sm:h-[68px] sm:gap-4 sm:px-4">

          {/* MOBILE MENU */}
          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen)
              setIsAccountOpen(false)
              setIsHelpOpen(false)
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-zinc-800 active:bg-zinc-100 md:hidden"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* BRAND */}
          <div className="flex shrink-0 cursor-pointer items-center">

            <div className="hidden md:flex md:flex-col">

              <h1 className="text-2xl font-black leading-none tracking-tighter text-zinc-950">
                MANFE<span className="text-orange-500">.</span>
              </h1>

              <p className="mt-1 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.25em] text-orange-500">
                AUTOPARTS & ACCESSORIES
              </p>

            </div>

            <div className="flex flex-col md:hidden">

              <h1 className="text-lg font-black leading-none tracking-tighter text-zinc-950">
                MANFE<span className="text-orange-500">.</span>
              </h1>

              <p className="mt-0.5 whitespace-nowrap text-[7px] font-black uppercase tracking-[0.18em] text-orange-500">
                AUTOPARTS
              </p>

            </div>

          </div>

          {/* SEARCH */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex min-w-0 flex-1 items-center"
          >

            <div className="flex h-10 w-full items-center overflow-hidden rounded-lg border border-zinc-300 bg-white transition focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10 sm:h-11">

              <div className="flex h-full w-10 shrink-0 items-center justify-center text-zinc-400">
                <Search className="h-5 w-5" />
              </div>

              <input
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search parts, brands, vehicles..."
                className="h-full min-w-0 flex-1 border-0 bg-transparent px-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
              />

              {value && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="flex h-full w-10 shrink-0 items-center justify-center text-zinc-400 hover:text-zinc-700"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}

              <button
                type="submit"
                className="hidden h-full shrink-0 bg-orange-500 px-5 text-xs font-black uppercase tracking-wide text-white transition hover:bg-orange-600 sm:block"
              >
                Search
              </button>

            </div>

          </form>

          {/* DESKTOP ACCOUNT */}
          <div className="relative hidden md:block">

            <button
              type="button"
              onClick={() => {
                setIsAccountOpen(!isAccountOpen)
                setIsHelpOpen(false)
              }}
              className="flex items-center gap-1.5 whitespace-nowrap py-2 text-sm font-medium text-zinc-800 transition hover:text-orange-500"
            >

              <User className="h-5 w-5" />

              <span>
                {user ? `Hi, ${firstName}` : "Hi, Account"}
              </span>

              <ChevronDown
                className={`h-4 w-4 text-zinc-500 transition-transform ${
                  isAccountOpen ? "rotate-180" : ""
                }`}
              />

            </button>

            {isAccountOpen && (

              <div className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-zinc-100 bg-white py-1 text-sm text-zinc-700 shadow-xl">

                {user ? (
                  <>
                    <div className="border-b border-zinc-100 px-4 py-3">

                      <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Signed in as
                      </p>

                      <p className="mt-1 truncate font-bold text-zinc-900">
                        {profile?.email || user.email}
                      </p>

                      {profile?.role === "admin" && (
                        <p className="mt-1 text-xs font-black uppercase text-orange-500">
                          Administrator
                        </p>
                      )}

                    </div>

                    <a
                      href="/account"
                      className="block px-4 py-3 font-medium hover:bg-zinc-50"
                    >
                      My Account
                    </a>

                    <a
                      href="/orders"
                      className="block px-4 py-3 hover:bg-zinc-50"
                    >
                      My Orders
                    </a>

                    {profile?.role === "admin" && (
                      <a
                        href="/admin/orders"
                        className="block px-4 py-3 font-bold text-orange-500 hover:bg-zinc-50"
                      >
                        Admin Orders
                      </a>
                    )}

                    <div className="my-1 border-t border-zinc-100" />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-red-600 hover:bg-zinc-50"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      className="block px-4 py-3 font-bold text-orange-500 hover:bg-zinc-50"
                    >
                      Sign In
                    </a>

                    <a
                      href="/signup"
                      className="block px-4 py-3 hover:bg-zinc-50"
                    >
                      Create Account
                    </a>
                  </>
                )}

              </div>

            )}

          </div>

          {/* DESKTOP HELP */}
          <div className="relative hidden md:block">

            <button
              type="button"
              onClick={() => {
                setIsHelpOpen(!isHelpOpen)
                setIsAccountOpen(false)
              }}
              className="flex items-center gap-1.5 whitespace-nowrap py-2 text-sm font-medium text-zinc-800 transition hover:text-orange-500"
            >

              <HelpCircle className="h-5 w-5" />

              <span>
                Help
              </span>

              <ChevronDown
                className={`h-4 w-4 text-zinc-500 transition-transform ${
                  isHelpOpen ? "rotate-180" : ""
                }`}
              />

            </button>

            {isHelpOpen && (

              <div className="absolute right-0 top-full mt-2 w-52 rounded-lg border border-zinc-100 bg-white py-1 text-sm text-zinc-700 shadow-xl">

                <a
                  href="#faq"
                  className="block px-4 py-3 hover:bg-zinc-50"
                >
                  Help Center
                </a>

                <a
                  href="#delivery"
                  className="block px-4 py-3 hover:bg-zinc-50"
                >
                  Place & Track Order
                </a>

                <a
                  href="#returns"
                  className="block px-4 py-3 hover:bg-zinc-50"
                >
                  Returns & Refunds
                </a>

              </div>

            )}

          </div>

          {/* CART */}
          <a
            href="/cart"
            className="relative flex h-10 shrink-0 items-center justify-center rounded-lg px-2 text-zinc-800 transition hover:bg-zinc-50 hover:text-orange-500 sm:px-3"
            aria-label={`View parts cart${
              liveCartCount > 0
                ? `, ${liveCartCount} items`
                : ""
            }`}
          >

            <div className="relative">

              <Wrench className="h-6 w-6 -rotate-45" />

              {liveCartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-black text-white shadow-sm">
                  {liveCartCount}
                </span>
              )}

            </div>

            <span className="ml-2 hidden text-sm font-bold md:inline">
              Parts Cart
            </span>

          </a>

        </div>

      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (

        <div className="border-t border-zinc-100 bg-white shadow-lg md:hidden">

          <div className="space-y-1 px-4 py-3">

            {user ? (
              <>
                <div className="rounded-lg bg-zinc-50 px-3 py-3">

                  <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                    Signed in
                  </p>

                  <p className="mt-1 font-black text-zinc-900">
                    Hi, {firstName}
                  </p>

                  <p className="mt-1 truncate text-xs text-zinc-500">
                    {profile?.email || user.email}
                  </p>

                </div>

                <a
                  href="/account"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-800 active:bg-zinc-100"
                >
                  <User className="h-5 w-5" />
                  My Account
                </a>

                <a
                  href="/orders"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-800 active:bg-zinc-100"
                >
                  <span className="text-lg">
                    📦
                  </span>
                  My Orders
                </a>

                {profile?.role === "admin" && (
                  <a
                    href="/admin/orders"
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-black text-orange-500 active:bg-zinc-100"
                  >
                    📊
                    Admin Orders
                  </a>
                )}

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-black text-red-600 active:bg-zinc-100"
                >
                  🚪
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-black text-orange-500 active:bg-zinc-100"
                >
                  <User className="h-5 w-5" />
                  Sign In
                </a>

                <a
                  href="/signup"
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-800 active:bg-zinc-100"
                >
                  ✨
                  Create Account
                </a>
              </>
            )}

            <a
              href="#saved"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-800 active:bg-zinc-100"
            >
              ❤️
              Saved Items
            </a>

            <a
              href="#help"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-zinc-800 active:bg-zinc-100"
            >
              <HelpCircle className="h-5 w-5" />
              Help Center
            </a>

            <div className="my-2 border-t border-zinc-100" />

            <div className="px-3 py-2 text-xs font-black uppercase tracking-wider text-zinc-400">
              MANFE AUTOPARTS
            </div>

          </div>

        </div>

      )}

    </header>
  )
}