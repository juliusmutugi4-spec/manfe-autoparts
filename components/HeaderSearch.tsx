"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function HeaderSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const urlSearch = searchParams.get("q") || ""
  const [search, setSearch] = useState(urlSearch)

  useEffect(() => {
    setSearch(urlSearch)
  }, [urlSearch])

  const handleSearch = (value: string) => {
    setSearch(value)

    const params = new URLSearchParams(searchParams.toString())

    if (value.trim()) {
      params.set("q", value)
    } else {
      params.delete("q")
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

  const clearSearch = () => {
    setSearch("")

    const params = new URLSearchParams(searchParams.toString())
    params.delete("q")

    const query = params.toString()

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    })
  }

  return (
    <div className="relative w-full max-w-2xl">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-zinc-400">
        🔍
      </span>

      <input
        type="search"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search parts, brands, vehicles, part numbers..."
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3.5 pl-12 pr-12 text-sm font-medium text-zinc-900 shadow-sm outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
      />

      {search && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-black text-zinc-400 transition hover:text-red-600"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}