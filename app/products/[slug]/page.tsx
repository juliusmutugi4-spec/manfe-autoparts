import { notFound } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import SimilarProducts from "@/components/SimilarProducts"
import AddToCartButton from "@/components/AddToCartButton"
// Define strict types for the Supabase response
interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  image_url: string | null;
  brand: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_year_from: number | null;
  vehicle_year_to: number | null;
  part_number: string | null;
  is_featured: boolean;
  categories: Category | Category[] | null; // Handles Supabase join variations
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically for SEO optimization
export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!product) return {};

  return {
    title: `${product.name} | Spare Parts Store`,
    description: product.description ?? `Buy ${product.name} at the best price.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("products")
    .select(`
      id, name, slug, description, price, stock_quantity, image_url, brand, 
      vehicle_make, vehicle_model, vehicle_year_from, vehicle_year_to, 
      part_number, is_featured,
      categories ( id, name )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("PRODUCT_DETAILS_ERROR:", error.message);
    throw new Error("Failed to load product details.");
  }

  if (!data) {
    notFound();
  }

  // Cast the data safely to our Product interface
  const product = data as unknown as Product;
  const isOutOfStock = product.stock_quantity <= 0;
const { data: similarProducts } = await supabase
  .from("products")
  .select(`
    id,
    name,
    slug,
    price,
    image_url,
    brand
  `)
  .eq("is_active", true)
  .neq("id", product.id)
  .limit(4);
  // Normalize categories handling safely
  const categoryName = Array.isArray(product.categories)
    ? product.categories[0]?.name
    : product.categories?.name;

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 antialiased selection:bg-red-500 selection:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          
{/* IMAGE SECTION */}
<div className="
relative
aspect-square
w-full
overflow-hidden
rounded-2xl
bg-zinc-50
border
border-zinc-100
">

{product.image_url ? (
<img
  src={product.image_url}
  alt={product.name}
  className="
    h-full
    w-full
    object-contain
    p-6
  "
/>
) : (
  <div className="flex h-full items-center justify-center text-zinc-400">
    🔧
  </div>
)}

</div>

          {/* INFORMATION SECTION */}
          <div className="flex flex-col justify-between">
            <div>
              {product.brand && (
                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                  {product.brand}
                </p>
              )}
              
              <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                {product.name}
              </h1>

              {product.part_number && (
                <p className="mt-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                  Part Number:{" "}
                  <span className="font-bold text-zinc-800 tabular-nums">
                    {product.part_number}
                  </span>
                </p>
              )}

              {/* PRICE & AVAILABILITY */}
              <div className="mt-6 border-y border-zinc-100 py-5">
                <p className="text-3xl font-black text-zinc-950 tabular-nums">
                  KSh {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className={`mt-2 text-sm font-bold flex items-center gap-1.5 ${
                  isOutOfStock ? "text-red-600" : "text-emerald-600"
                }`}>
                  <span>{isOutOfStock ? "✕" : "✓"}</span>
                  <span>{isOutOfStock ? "Out of stock" : `${product.stock_quantity} units available`}</span>
                </p>
              </div>

              {/* VEHICLE COMPATIBILITY */}
              {(product.vehicle_make || product.vehicle_model) && (
                <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition-colors hover:bg-zinc-100/50">
                  <p className="text-xs font-black uppercase tracking-wider text-zinc-400">
                    Vehicle Compatibility
                  </p>
                  <p className="mt-2 font-black text-zinc-900 flex items-center gap-2">
                    <span role="img" aria-label="Car icon">🚗</span>
                    {product.vehicle_make} {product.vehicle_model}
                  </p>
                  {(product.vehicle_year_from || product.vehicle_year_to) && (
                    <p className="mt-1 text-sm font-medium text-zinc-500 tabular-nums">
                      Model Years: {product.vehicle_year_from ?? "Any"} – {product.vehicle_year_to ?? "Present"}
                    </p>
                  )}
                </div>
              )}

              {/* DESCRIPTION */}
              {product.description && (
                <div className="mt-6">
                  <h2 className="text-xs font-black uppercase tracking-wider text-zinc-900">
                    Description
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER ACTIONS */}
            <div className="mt-8 pt-6 border-t border-zinc-100">
              {categoryName && (
                <p className="mb-4 text-xs text-zinc-500 uppercase tracking-wider">
                  Category:{" "}
                  <span className="font-bold text-zinc-800">
                    {categoryName}
                  </span>
                </p>
              )}
              
<AddToCartButton
  product={{
    id: product.id,
    name: product.name,
    price: Number(product.price),
    stock_quantity: product.stock_quantity,
  }}
/>
            </div>

          </div>
        </div>
      </div>

      <SimilarProducts
        products={similarProducts ?? []}
      />
    </main>
  );
}