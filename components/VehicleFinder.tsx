"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

type VehicleCatalogItem = {
  vehicle_type_id: string
  vehicle_type: string
  make_id: string
  make: string
  model_id: string
  model: string
}

type VehicleFinderProps = {
  products: {
    id: string
    name: string
    vehicle_make: string | null
    vehicle_model: string | null
    vehicle_year_from: number | null
    vehicle_year_to: number | null
  }[]
}

export default function VehicleFinder({ products }: VehicleFinderProps) {
  const router = useRouter()
  const [vehicleCatalog, setVehicleCatalog] = useState<VehicleCatalogItem[]>([])
  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadVehicleCatalog() {
      try {
        const { data, error } = await supabase
          .from("vehicle_catalog")
          .select("*")

        if (error) throw error
        setVehicleCatalog(data ?? [])
      } catch (error) {
        console.error("VEHICLE CATALOG ERROR:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadVehicleCatalog()
  }, [])

  const makes = useMemo(() => {
    return Array.from(
      new Set(vehicleCatalog.map((vehicle) => vehicle.make).filter(Boolean))
    ).sort()
  }, [vehicleCatalog])

  const models = useMemo(() => {
    return Array.from(
      new Set(
        vehicleCatalog
          .filter((vehicle) => !make || vehicle.make === make)
          .map((vehicle) => vehicle.model)
          .filter(Boolean)
      )
    ).sort()
  }, [vehicleCatalog, make])

  const years = useMemo(() => {
    const yearSet = new Set<number>()
    products
      .filter(
        (product) =>
          (!make || product.vehicle_make === make) &&
          (!model || product.vehicle_model === model)
      )
      .forEach((product) => {
        if (product.vehicle_year_from && product.vehicle_year_to) {
          for (let y = product.vehicle_year_from; y <= product.vehicle_year_to; y++) {
            yearSet.add(y)
          }
        }
      })
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [products, make, model])

  function handleMakeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setMake(event.target.value)
    setModel("")
    setYear("")
  }

  function handleModelChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setModel(event.target.value)
    setYear("")
  }

  function handleFindParts() {
    const params = new URLSearchParams()
    if (make) params.set("make", make)
    if (model) params.set("model", model)
    if (year) params.set("year", year)
    
    const query = params.toString()
    router.push(query ? `/?${query}#products` : "/#products")
  }

  return (
    <div className="w-full bg-transparent">
      {/* Micro Header */}
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500/10 text-xs text-red-500">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-100">
              Live Fitment Finder
            </h3>
          </div>
        </div>
        {/* Compact Live Status Indicator */}
        <div className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-zinc-400 ring-1 ring-zinc-800">
          <span className={`h-1 w-1 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          {isLoading ? 'Syncing...' : 'Ready'}
        </div>
      </div>

      {/* Micro Form Area */}
      <div className="mt-4 space-y-3">
        {/* MAKE */}
        <div className="relative">
          <label className="absolute -top-2 left-2.5 bg-zinc-950 px-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
            Make
          </label>
          <select
            value={make}
            onChange={handleMakeChange}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-200 outline-none transition-all duration-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
          >
            <option value="" className="bg-zinc-950">Select Make</option>
            {makes.map((item) => (
              <option key={item} value={item!} className="bg-zinc-950">
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* MODEL + YEAR (Side-by-Side Micro Grids) */}
        <div className="grid grid-cols-2 gap-3">
          {/* MODEL */}
          <div className="relative">
            <label className="absolute -top-2 left-2.5 bg-zinc-950 px-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
              Model
            </label>
            <select
              value={model}
              onChange={handleModelChange}
              disabled={!make}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-200 outline-none transition-all duration-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-zinc-950">Select Model</option>
              {models.map((item) => (
                <option key={item} value={item!} className="bg-zinc-950">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* YEAR */}
          <div className="relative">
            <label className="absolute -top-2 left-2.5 bg-zinc-950 px-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
              Year
            </label>
            <select
              value={year}
              onChange={(event) => setYear(event.target.value)}
              disabled={!model}
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-200 outline-none transition-all duration-200 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="" className="bg-zinc-950">Select Year</option>
              {years.map((item) => (
                <option key={item} value={item} className="bg-zinc-950">
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button
          type="button"
          onClick={handleFindParts}
          disabled={!make}
          className="group relative flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 py-2.5 text-[11px] font-black uppercase tracking-wider text-white shadow-md shadow-red-950/50 transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 disabled:shadow-none disabled:pointer-events-none"
        >
          <span>Search Inventory</span>
          <svg className="h-3 w-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
