"use client"

import ProductSearchBar from "@/components/ProductSearchBar"

interface AutoPartsHeaderProps {
  search?: string
  onSearch?: (value: string) => void
}

export default function AutoPartsHeader({
  search = "",
  onSearch = () => {},
}: AutoPartsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-4 sm:px-6">

        {/* ===================================================== */}
        {/* MANFE BRAND */}
        {/* ===================================================== */}

        <div className="flex shrink-0 items-center gap-4">

          {/* MAA LOGO */}
          <svg
            viewBox="0 0 110 110"
            className="h-16 w-16 shrink-0 transition-transform duration-300 hover:scale-105 sm:h-20 sm:w-20"
            aria-label="MANFE MAA logo"
          >
            {/* OUTER STAR */}
            <path
              d="M55 5 L69 40 L105 40 L77 62 L88 105 L55 84 L22 105 L33 62 L5 40 L41 40 Z"
              fill="#ffffff"
              stroke="#09090b"
              strokeWidth="6"
              strokeLinejoin="round"
            />

            {/* INNER RED STAR */}
            <path
              d="M55 16 L65 44 L95 44 L71 61 L80 91 L55 74 L30 91 L39 61 L15 44 L45 44 Z"
              fill="none"
              stroke="#dc2626"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* CENTRAL HUB */}
            <circle
              cx="55"
              cy="55"
              r="16"
              fill="#09090b"
            />

            {/* CORE RING */}
            <circle
              cx="55"
              cy="55"
              r="14"
              fill="none"
              stroke="#dc2626"
              strokeWidth="1.5"
            />

            {/* MAA */}
            <text
              x="55"
              y="55"
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="11"
              fontWeight="950"
              fill="#ffffff"
              className="font-sans select-none tracking-wider"
            >
              MAA
            </text>
          </svg>

          {/* WORDMARK */}
          <div className="flex flex-col justify-center">
            <h1 className="text-xl font-black tracking-tighter text-zinc-950 sm:text-2xl">
              MANFE<span className="text-red-600">.</span>
            </h1>

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-red-600">
              AUTOPARTS & ACCESSORIES
            </p>
          </div>

        </div>

        {/* ===================================================== */}
        {/* THE ONLY PRODUCT SEARCH BAR */}
        {/* ===================================================== */}



        {/* ===================================================== */}
        {/* CONTACT */}
        {/* ===================================================== */}

        <div className="flex shrink-0 items-center gap-3 sm:gap-5">

          {/* PHONE + LOCATION */}
          <div className="hidden text-right sm:block">
            <p className="text-sm font-black text-zinc-950">
              0722 921 017
            </p>

            <p className="text-xs text-zinc-500">
              Industrial Area, Nairobi
            </p>
          </div>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/254722921017"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white shadow-sm transition hover:bg-emerald-700"
          >
            <span className="mr-1">
              💬
            </span>

            <span className="hidden sm:inline">
              WHATSAPP
            </span>

            <span className="sm:hidden">
              CHAT
            </span>
          </a>

        </div>

      </div>

    </header>
  )
}