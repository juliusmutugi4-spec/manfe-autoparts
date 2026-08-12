"use client"

import Link from "next/link"
import AddToCartButton from "@/components/AddToCartButton"

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  stock_quantity: number
  image_url: string | null
  brand: string | null
  vehicle_make: string | null
  vehicle_model: string | null
  vehicle_year_from: number | null
  vehicle_year_to: number | null
  part_number: string | null
  is_featured: boolean
  categories?: {
    id: string
    name: string
  }[] | null
}

type ProductCardProps = {
  product: Product
}


export default function ProductCard({product}: ProductCardProps){

const outOfStock = product.stock_quantity <= 0


return (

<article
className="
group
overflow-hidden
rounded-xl
border
border-zinc-200
bg-white
shadow-sm
transition
hover:shadow-lg
"
>


{/* IMAGE */}

<Link
href={`/products/${product.slug}`}
className="
relative
aspect-square
bg-zinc-50
overflow-hidden
block
"
>

{product.image_url ? (

<img
src={product.image_url}
alt={product.name}
className="
h-full
w-full
object-cover
transition
duration-300
group-hover:scale-105
"
/>

):(


<div className="
flex
h-full
items-center
justify-center
text-4xl
">
🔧
</div>

)}



{product.is_featured && (

<span
className="
absolute
left-2
top-2
rounded
bg-red-600
px-2
py-1
text-[9px]
font-black
text-white
"
>
TOP
</span>

)}



{outOfStock && (

<div
className="
absolute
inset-0
flex
items-center
justify-center
bg-black/50
"
>

<span
className="
rounded-lg
bg-black
px-3
py-2
text-[10px]
font-bold
text-white
"
>
OUT
</span>

</div>

)}

</Link>


{/* DETAILS */}



{/* DETAILS */}

<div className="p-3">


{/* BRAND */}

{product.brand && (

<p
className="
text-[10px]
font-black
uppercase
text-red-600
truncate
"
>
{product.brand}
</p>

)}



{/* NAME */}

<h3
className="
mt-1
text-sm
font-bold
leading-tight
line-clamp-2
text-zinc-900
"
>
{product.name}
</h3>



{/* VEHICLE */}

{product.vehicle_make && (

<p
className="
mt-1
text-[11px]
text-zinc-500
truncate
"
>
🚗 {product.vehicle_make} {product.vehicle_model}
</p>

)}



{/* PRICE */}

<div className="mt-3">


<p
className="
text-lg
font-black
text-zinc-950
"
>
KSh {product.price.toLocaleString()}
</p>


<p
className="
text-[10px]
font-bold
text-emerald-600
"
>
✓ In stock
</p>


</div>



{/* BUTTON */}

<div className="mt-3">

<AddToCartButton product={product}/>

</div>


</div>


</article>


)

}