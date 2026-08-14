import {
  Wrench,
  Cpu,
  Disc,
  Layers,
  Gauge,
  PackageCheck,
} from "lucide-react"

interface Product {
  id?: string | number
  [key: string]: any
}

interface VisualInventoryHeaderProps {
  products?: Product[]
}

export default function VisualInventoryHeader({
  products = [],
}: VisualInventoryHeaderProps) {
  const partsCount = products.length

  const galleryItems = [
    {
      url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=1200&q=85",
      label: "Powertrain",
      icon: Cpu,
    },
    {
      url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=85",
      label: "Braking",
      icon: Disc,
    },
    {
      url: "https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&w=1200&q=85",
      label: "Components",
      icon: Layers,
    },
    {
      url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",
      label: "Performance",
      icon: Gauge,
    },
    {
      url: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=85",
      label: "Engineering",
      icon: Wrench,
    },
  ]

  return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm sm:mb-12 sm:rounded-3xl">

      {/* ================================================= */}
      {/* MOBILE HERO                                       */}
      {/* ================================================= */}

      <div className="relative block h-40 overflow-hidden bg-zinc-950 sm:hidden">

        <img
          src={galleryItems[0].url}
          alt="MANFE automotive parts"
          className="h-full w-full object-cover"
        />

        {/* DARK GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

        {/* BRAND */}
        <div className="absolute left-4 top-4">

          <div className="flex items-center gap-2">

            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white">
              <Wrench className="h-3.5 w-3.5" />
            </div>

            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white">
              MANFE AUTOPARTS
            </span>

          </div>

        </div>

        {/* HERO LABEL */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
              Live Inventory
            </p>

            <h2 className="mt-1 text-xl font-black tracking-tight text-white">
              Auto Spares
            </h2>

          </div>

          {/* PART COUNT */}
          {partsCount > 0 && (
            <div className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/40 px-3 py-2 backdrop-blur-md">

              <PackageCheck className="h-4 w-4 text-white" />

              <span className="text-sm font-black text-white">
                {partsCount}
              </span>

            </div>
          )}

        </div>

      </div>

      {/* ================================================= */}
      {/* DESKTOP IMAGE GALLERY                              */}
      {/* ================================================= */}

      <div className="hidden h-48 w-full bg-zinc-950 sm:block lg:h-56">

        <div className="flex h-full w-full">

          {galleryItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="group relative min-w-0 flex-1 overflow-hidden border-r border-black/30 last:border-r-0"
              >

                <img
                  src={item.url}
                  alt={item.label}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-4 left-4 flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white backdrop-blur-md">
                    <Icon className="h-3.5 w-3.5" />
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-wider text-white">
                    {item.label}
                  </span>

                </div>

              </div>
            )
          })}

        </div>

      </div>

      {/* ================================================= */}
      {/* INFORMATION                                       */}
      {/* ================================================= */}

      <div className="px-4 py-4 sm:px-7 sm:py-6">

        <div className="flex items-center justify-between gap-4">

          {/* LEFT */}
          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <span className="relative flex h-2 w-2">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />

              </span>

              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-emerald-600">
                Live Inventory
              </span>

            </div>

            <h2 className="mt-1 text-xl font-black tracking-tight text-zinc-950 sm:text-3xl">
              Verified Auto Spares
            </h2>

            <p className="mt-1 max-w-xl text-[11px] leading-5 text-zinc-500 sm:text-sm">
              Genuine parts for engines, brakes, suspension and vehicle systems.
            </p>

          </div>

          {/* DESKTOP / MOBILE COUNT */}
          {partsCount > 0 && (
            <div className="shrink-0 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2.5 sm:px-4 sm:py-3">

              <div className="flex items-center gap-2">

                <div className="hidden h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white sm:flex">
                  <PackageCheck className="h-4 w-4" />
                </div>

                <div>

                  <p className="text-lg font-black leading-none text-zinc-950 sm:text-2xl">
                    {partsCount}
                  </p>

                  <p className="mt-1 text-[8px] font-black uppercase tracking-wider text-zinc-400 sm:text-[10px]">
                    {partsCount === 1
                      ? "Part"
                      : "Parts"}
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>

        {/* MOBILE CATEGORY CHIPS */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:hidden">

          {galleryItems.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5"
              >

                <Icon className="h-3 w-3 text-zinc-500" />

                <span className="text-[9px] font-bold text-zinc-600">
                  {item.label}
                </span>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}