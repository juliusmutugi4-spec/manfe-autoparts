"use client";

import FitmentBanner from "@/components/FitmentBanner";
import HeroContent from "@/components/HeroContent";

export interface Product {
  id: string;
  name: string;
  image_url: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_year_from: number | null;
  vehicle_year_to: number | null;
}

interface HeroSectionProps {
  products?: Product[];
}

export default function HeroSection({ products = [] }: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden bg-zinc-950 px-4 py-20 text-zinc-100 sm:px-6 lg:px-8 lg:py-32">
      {/* Decorative Blur Ambient Elements */}
      <div 
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[600px] w-[600px] animate-pulse rounded-full bg-red-600/10 blur-[128px] duration-[10000ms] lg:-right-20 lg:h-[800px] lg:w-[800px]" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[96px]" 
        aria-hidden="true" 
      />
      
      {/* Background Tech Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem]" 
        style={{
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }} 
        aria-hidden="true" 
      />

      <div className="mx-auto max-w-7xl">
        <FitmentBanner products={products} />

        <div className="relative mt-12 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Main Copy */}
          <div className="lg:col-span-7">
            <HeroContent />
          </div>
          

        </div>
      </div>
    </section>
  );
}
