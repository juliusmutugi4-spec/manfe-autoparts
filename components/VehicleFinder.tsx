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
export default function VehicleFinder({
  products,
}: VehicleFinderProps) {
  const router = useRouter()

  const [vehicleCatalog, setVehicleCatalog] = useState<
    {
      vehicle_type_id: string
      vehicle_type: string
      make_id: string
      make: string
      model_id: string
      model: string
    }[]
  >([])

  const [make, setMake] = useState("")
  const [model, setModel] = useState("")
  const [year, setYear] = useState("")


    useEffect(() => {
    async function loadVehicleCatalog() {
      const { data, error } = await supabase
        .from("vehicle_catalog")
        .select("*")

      if (error) {
        console.error(
          "VEHICLE CATALOG ERROR:",
          error
        )
        return
      }

      setVehicleCatalog(data ?? [])
    }

    loadVehicleCatalog()
  }, [])



 const makes = useMemo(() => {
  return Array.from(
    new Set(
      vehicleCatalog
        .map((vehicle) => vehicle.make)
        .filter(Boolean)
    )
  ).sort()
}, [vehicleCatalog])
const models = useMemo(() => {
  return Array.from(
    new Set(
      vehicleCatalog
        .filter(
          (vehicle) =>
            !make || vehicle.make === make
        )
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
        if (
          product.vehicle_year_from &&
          product.vehicle_year_to
        ) {
          for (
            let year = product.vehicle_year_from;
            year <= product.vehicle_year_to;
            year++
          ) {
            yearSet.add(year)
          }
        }
      })

    return Array.from(yearSet).sort((a, b) => b - a)
  }, [products, make, model])

  function handleMakeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setMake(event.target.value)
    setModel("")
    setYear("")
  }

  function handleModelChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setModel(event.target.value)
    setYear("")
  }
function handleFindParts() {
  const params = new URLSearchParams()

  if (make) {
    params.set("make", make)
  }

  if (model) {
    params.set("model", model)
  }

  if (year) {
    params.set("year", year)
  }

  const query = params.toString()

  router.push(query ? `/?${query}#products` : "/#products")
}

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600/10 text-lg">
          ⚙️
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-white">
            Live Part Finder
          </h3>

          <p className="mt-0.5 text-xs text-zinc-500">
            Find parts by vehicle
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">

        {/* MAKE */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
            Vehicle Make
          </label>

          <select
            value={make}
            onChange={handleMakeChange}
            className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-white outline-none focus:border-red-500"
          >
            <option value="">
              All Makes
            </option>

            {makes.map((item) => (
              <option key={item} value={item!}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* MODEL + YEAR */}
        <div className="grid grid-cols-2 gap-3">

          {/* MODEL */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
              Model
            </label>

            <select
              value={model}
              onChange={handleModelChange}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-white outline-none focus:border-red-500"
            >
              <option value="">
                All Models
              </option>

              {models.map((item) => (
                <option key={item} value={item!}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* YEAR */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500">
              Year
            </label>

            <select
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-white outline-none focus:border-red-500"
            >
              <option value="">
                All Years
              </option>

              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* FIND */}
        <button
          type="button"
          onClick={handleFindParts}
          className="w-full rounded-xl bg-red-600 py-3.5 text-xs font-black text-white shadow-lg shadow-red-900/20 transition hover:bg-red-700"
        >
          FIND COMPATIBLE PARTS
        </button>

      </div>
    </div>
  )
}