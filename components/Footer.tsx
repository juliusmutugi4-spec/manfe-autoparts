import React from 'react';

interface LinkItem {
  label: string;
  href: string;
}

const FOOTER_LINKS: LinkItem[] = [
  { label: 'Terms of Sale', href: '#terms' },
  { label: 'Fitment Disclaimer', href: '#disclaimer' },
  { label: 'Privacy Policy', href: '#privacy' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-16 text-zinc-400 antialiased selection:bg-red-600 selection:text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        
        {/* Main Grid Structure */}
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
          
          {/* Brand & Identity Column */}
          <div className="flex flex-col space-y-4">
            <div>
              <span className="text-2xl font-black tracking-tight text-white">
                MANFE<span className="text-red-600">.</span>
              </span>
              <p className="mt-1 text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
                Autoparts & Spares
              </p>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              Premium automotive parts and accessories engineering peak reliability for vehicle owners, mechanics, and fleets across Kenya.
            </p>
          </div>

          {/* Logistics & Location Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
              Physical Store
            </h3>
            <address className="space-y-1.5 text-sm not-italic leading-relaxed">
              <p className="font-semibold text-zinc-200">Baricho Business Centre</p>
              <p>Hombe Road, off Baricho Road</p>
              <p>Industrial Area, Nairobi, Kenya</p>
              <p className="pt-1 text-xs text-zinc-600">P.O. Box 8592-00300 Nairobi</p>
            </address>
          </div>

          {/* Communications & CTA Column */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
              Get In Touch
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2.5">
                <span className="text-zinc-500">Phone:</span>
                <a 
                  href="tel:+254722921017" 
                  className="font-semibold text-white transition-colors duration-200 hover:text-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 rounded"
                >
                  0722 921 017
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="text-zinc-500">Hours:</span>
                <span className="text-zinc-300">Mon – Sat (Business Hours)</span>
              </div>
            </div>

            {/* High-Conversion WhatsApp CTA */}
            <div className="pt-2">
              <a 
                href="https://wa.me/254722921017" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center space-x-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-950/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://w3.org">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.66.986 3.288 1.479 5.362 1.48 5.432-.003 9.85-4.42 9.855-9.857.002-2.615-1.011-5.074-2.853-6.918-1.842-1.843-4.292-2.859-6.907-2.86-5.433 0-9.85 4.417-9.855 9.856-.001 2.125.567 4.195 1.644 5.918l-.999 3.648 3.754-.987zm11.514-6.442c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Baseline */}
        <div className="mt-16 flex flex-col gap-4 border-t border-zinc-900 pt-8 text-xs text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} MANFE AUTOPARTS. All rights reserved.</p>
          <nav className="flex space-x-6">
            {FOOTER_LINKS.map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="transition-colors duration-200 hover:text-zinc-400 focus:outline-none focus:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}
