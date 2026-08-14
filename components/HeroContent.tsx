interface HeroContentProps {
  onBrowse?: () => void
}

export default function HeroContent({ onBrowse }: HeroContentProps) {
  return (
    <div className="flex flex-col items-start w-full lg:col-span-7">
      
      {/* STATUS BADGE: Scaled down for mobile viewports */}
      <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-[10px] font-medium tracking-wide text-zinc-300 shadow-sm backdrop-blur-md sm:px-3">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
        OEM & Verified Aftermarket Parts
      </span>

      {/* COMPACT HEADLINE: Tighter tracking and responsive font sizes */}
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-zinc-50 sm:text-4xl lg:text-6xl lg:leading-[1.1]">
        Find the{" "}
        <span className="bg-gradient-to-r from-red-400 via-red-500 to-rose-500 bg-clip-text font-black text-transparent">
          Right Part
        </span>{" "}
        for Your Vehicle
      </h1>

      {/* DESCRIPTIVE TEXT: Snug and highly scannable */}
      <p className="mt-3 max-w-xl text-xs leading-relaxed text-zinc-400 sm:text-base">
        Search components by{" "}
        <span className="font-semibold text-zinc-100">make, model, year, and category</span>. 
        Guaranteed compatibility with transparent pricing.
      </p>

      {/* STEP PROCESS: Replaced raw text arrows with clean SVG icons, fits on single line on tiny screens */}
      <div className="mt-5 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400 sm:gap-1.5">
        <span className="rounded bg-zinc-900/60 px-1.5 py-0.5 border border-zinc-800/40">Make</span>
        <svg className="h-2 w-2 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="rounded bg-zinc-900/60 px-1.5 py-0.5 border border-zinc-800/40">Model</span>
        <svg className="h-2 w-2 text-zinc-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="rounded bg-zinc-900/60 px-1.5 py-0.5 border border-zinc-800/40">Year</span>
        <svg className="h-2 w-2 text-red-500/70 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        <span className="rounded border border-red-900/40 bg-red-950/20 px-1.5 py-0.5 font-extrabold text-red-400">Part</span>
      </div>

      {/* CALL TO ACTIONS: Row layout on mobile, slightly slimmer height padding */}
      <div className="mt-6 flex w-full flex-row gap-2.5 sm:w-auto">
        <a
          href="#products"
          onClick={onBrowse}
          className="flex-1 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-4 py-3 text-xs font-semibold tracking-wide text-white shadow-md transition-all duration-200 hover:from-red-500 hover:to-red-600 active:scale-[0.98] sm:flex-none sm:px-6"
        >
          Browse Catalog
        </a>

        <a
          href="https://wa.me/254722921017"
          target="_blank"
          rel="noreferrer"
          className="group flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3 text-xs font-semibold text-zinc-300 shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-white active:scale-[0.98] sm:flex-none sm:px-6"
        >
          <svg className="h-3.5 w-3.5 fill-current text-emerald-500 transition-transform duration-200 group-hover:scale-110 shrink-0" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.001-2.63-1.019-5.101-2.872-6.958C16.612 1.943 14.14 1.92 11.51 1.92c-5.437 0-9.861 4.412-9.865 9.846-.001 1.777.47 3.514 1.362 5.054L2.016 21.94l5.35-1.403z" />
          </svg>
          <span className="truncate">Ask Expert</span>
        </a>
      </div>

      {/* METRICS GRID: Single row, borders replaced with tiny vertical line separators */}
      <div className="mt-8 grid w-full grid-cols-3 gap-2 border-t border-zinc-900/60 pt-4 text-left">
        <div className="pr-1">
          <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-500">Logistics</p>
          <p className="mt-0.5 text-[10px] font-medium text-zinc-300 truncate sm:text-xs">Nairobi & Beyond</p>
        </div>
        <div className="border-l border-zinc-900/80 px-2">
          <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-500">Fitment</p>
          <p className="mt-0.5 text-[10px] font-medium text-zinc-300 truncate sm:text-xs">Guaranteed</p>
        </div>
        <div className="border-l border-zinc-900/80 pl-2">
          <p className="text-[8px] font-bold uppercase tracking-wider text-zinc-500">Support</p>
          <p className="mt-0.5 text-[10px] font-medium text-zinc-300 truncate sm:text-xs">Live Technical</p>
        </div>
      </div>

    </div>
  )
}
