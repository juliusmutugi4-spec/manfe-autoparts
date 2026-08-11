"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

type Category = {
  id: string
  name: string
}

export default function AdminProductsPage() {
  // Identification
  const [name, setName] = useState("")
  const [partNumber, setPartNumber] = useState("")
  const [brand, setBrand] = useState("MANFE")

  // Description
  const [description, setDescription] = useState("")

  // Vehicle compatibility
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [yearFrom, setYearFrom] = useState("")
  const [yearTo, setYearTo] = useState("")
type VehicleMake = {
  id: string
  name: string
}
const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>([])


  // Category

  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState("")

  // Inventory
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")

  // Media
  const [image, setImage] = useState<File | null>(null)

  // Visibility
  const [isActive, setIsActive] = useState(true)
  const [isFeatured, setIsFeatured] = useState(false)

  // UI
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("")

  // Load categories
  useEffect(() => {
    async function loadCategories() {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name")
        .order("name", { ascending: true })

      if (error) {
        console.error("LOAD CATEGORIES ERROR:", error)
        setMessage("Unable to load product categories.")
        setMessageType("error")
        return
      }

      setCategories(data || [])
    }

    loadCategories()
  }, [])

useEffect(() => {
  async function loadVehicleMakes() {
    const { data, error } = await supabase
      .from("vehicle_makes")
      .select("id, name")
      .order("name", { ascending: true })

    if (error) {
      console.error("LOAD VEHICLE MAKES ERROR:", error)
      return
    }

    setVehicleMakes(data || [])
  }

  loadVehicleMakes()
}, [])



  function resetForm() {
    setName("")
    setPartNumber("")
    setBrand("MANFE")
    setDescription("")
    setVehicleMake("")
    setVehicleModel("")
    setYearFrom("")
    setYearTo("")
    setCategoryId("")
    setPrice("")
    setStock("")
    setImage(null)
    setIsActive(true)
    setIsFeatured(false)
  }

  function createSlug(value: string) {
    const baseSlug = value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")

    return `${baseSlug}-${Date.now()}`
  }

  async function saveProduct(saveAndNew = false) {
    setMessage("")
    setMessageType("")

    // -----------------------------
    // Validation
    // -----------------------------

    if (!name.trim()) {
      setMessage("Please enter a product name.")
      setMessageType("error")
      return
    }

    if (!price || Number(price) < 0) {
      setMessage("Please enter a valid price.")
      setMessageType("error")
      return
    }

    if (!stock || Number(stock) < 0) {
      setMessage("Please enter a valid stock quantity.")
      setMessageType("error")
      return
    }

    if (yearFrom && !yearTo) {
      setMessage("Please enter the vehicle ending year.")
      setMessageType("error")
      return
    }

    if (!yearFrom && yearTo) {
      setMessage("Please enter the vehicle starting year.")
      setMessageType("error")
      return
    }

    if (
      yearFrom &&
      yearTo &&
      Number(yearFrom) > Number(yearTo)
    ) {
      setMessage("Starting year cannot be greater than ending year.")
      setMessageType("error")
      return
    }

    setSaving(true)

    try {
      let publicUrl: string | null = null

      // -----------------------------
      // Upload image
      // -----------------------------

      if (image) {
        const fileExt =
          image.name.split(".").pop()?.toLowerCase() || "jpg"

        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`

        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, image)

        if (uploadError) {
          throw uploadError
        }

        const {
          data: { publicUrl: uploadedUrl },
        } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath)

        publicUrl = uploadedUrl
      }

      // -----------------------------
      // Create product
      // -----------------------------

      const slug = createSlug(name)

      const productData = {
        name: name.trim(),
        slug,

        description: description.trim() || null,

        price: Number(price),
        stock_quantity: Number(stock),

        image_url: publicUrl,

        brand: brand.trim() || null,

        vehicle_make: vehicleMake.trim() || null,
        vehicle_model: vehicleModel.trim() || null,

        vehicle_year_from: yearFrom
          ? Number(yearFrom)
          : null,

        vehicle_year_to: yearTo
          ? Number(yearTo)
          : null,

        part_number: partNumber.trim() || null,

        category_id: categoryId || null,

        is_active: isActive,
        is_featured: isFeatured,
      }

      console.log("CREATING PRODUCT:", productData)

      const { data, error: productError } = await supabase
        .from("products")
        .insert(productData)
        .select()
        .single()

      if (productError) {
        console.error(
          "SAVE PRODUCT ERROR:",
          productError
        )

        console.error(
          "SAVE PRODUCT ERROR JSON:",
          JSON.stringify(productError, null, 2)
        )

        throw productError
      }

console.log("PRODUCT CREATED:", data)

// ---------------------------------------
// Create vehicle fitment
// ---------------------------------------

if (vehicleMake.trim() && vehicleModel.trim()) {
  const { data: makeData, error: makeError } =
    await supabase
      .from("vehicle_makes")
      .select("id")
      .eq("name", vehicleMake.trim())
      .maybeSingle()

  if (makeError) {
    throw makeError
  }

  if (!makeData) {
    throw new Error(
      `Vehicle make "${vehicleMake.trim()}" was not found in the vehicle catalog.`
    )
  }

  const { data: modelData, error: modelError } =
    await supabase
      .from("vehicle_models")
      .select("id")
      .eq("make_id", makeData.id)
      .eq("name", vehicleModel.trim())
      .maybeSingle()

  if (modelError) {
    throw modelError
  }

  if (!modelData) {
    throw new Error(
      `Vehicle model "${vehicleModel.trim()}" was not found for ${vehicleMake.trim()}.`
    )
  }

  const { error: fitmentError } =
    await supabase
      .from("product_vehicle_fitments")
      .insert({
        product_id: data.id,
        model_id: modelData.id,
        year_from: yearFrom
          ? Number(yearFrom)
          : null,
        year_to: yearTo
          ? Number(yearTo)
          : null,
      })

  if (fitmentError) {
    throw fitmentError
  }

  console.log("VEHICLE FITMENT CREATED")
}

setMessage("Product saved successfully.")
setMessageType("success")
      if (saveAndNew) {
        resetForm()
      } else {
        resetForm()
      }
    } catch (error: any) {
      console.error("SAVE PRODUCT ERROR:", error)

      console.error(
        "SAVE PRODUCT ERROR JSON:",
        JSON.stringify(error, null, 2)
      )

      setMessage(
        error?.message ||
          error?.details ||
          error?.hint ||
          error?.code ||
          "Failed to save product."
      )

      setMessageType("error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900">

      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-black">
              MANFE
            </h1>

            <p className="text-xs font-bold tracking-[0.3em] text-red-600">
              AUTOPARTS
            </p>
          </div>

          <div className="text-right">
            <p className="font-black">
              ADMIN
            </p>

            <p className="text-xs text-zinc-500">
              Products
            </p>
          </div>

        </div>
      </header>

      {/* Dashboard */}
      <section className="mx-auto max-w-6xl px-6 py-10">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-red-600">
            MANFE AUTOPARTS
          </p>

          <h2 className="mt-2 text-4xl font-black">
            Add Product
          </h2>

          <p className="mt-3 text-zinc-500">
            Add automotive parts, accessories and vehicle
            products to your store.
          </p>
        </div>

        {/* Top actions */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <a
            href="/admin/products"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-200 px-5 py-3 text-sm font-black text-zinc-800 transition hover:bg-zinc-300"
          >
            ← BACK TO PRODUCTS
          </a>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() => saveProduct(false)}
              disabled={saving}
              className="rounded-xl bg-zinc-950 px-6 py-3 text-sm font-black text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE"}
            </button>

            <button
              type="button"
              onClick={() => saveProduct(true)}
              disabled={saving}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "SAVING..." : "SAVE & NEW"}
            </button>

          </div>
        </div>

        {/* Main form */}
        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">

          {/* Identification */}
          <div className="border-b border-zinc-200 p-6">

            <h3 className="text-xl font-black">
              Identification & Brand
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Basic information used to identify the product.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* Part Number */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Part Number / SKU
                </label>

                <input
                  type="text"
                  value={partNumber}
                  onChange={(e) =>
                    setPartNumber(e.target.value)
                  }
                  placeholder="e.g. AX-99042"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Brand */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Brand
                </label>

                <input
                  type="text"
                  value={brand}
                  onChange={(e) =>
                    setBrand(e.target.value)
                  }
                  placeholder="e.g. Bosch"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Product name */}
              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-bold">
                  Product Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. Ceramic Brake Pads Premium Set"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

              </div>

            </div>
          </div>

          {/* Vehicle fitment */}
          <div className="border-b border-zinc-200 p-6">

            <h3 className="text-xl font-black">
              Vehicle Fitment
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Specify which vehicles this product is compatible with.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

{/* Make */}
<div>
  <label className="mb-2 block text-sm font-bold">
    Vehicle Make
  </label>

  <select
    value={vehicleMake}
    onChange={(e) => {
      setVehicleMake(e.target.value)
      setVehicleModel("")
    }}
    className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
  >
    <option value="">
      Select make
    </option>

    {vehicleMakes.map((make) => (
      <option key={make.id} value={make.name}>
        {make.name}
      </option>
    ))}
  </select>
</div>

              {/* Model */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Vehicle Model
                </label>

                <input
                  type="text"
                  value={vehicleModel}
                  onChange={(e) =>
                    setVehicleModel(e.target.value)
                  }
                  placeholder="Camry"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Year From */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Year From
                </label>

                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={yearFrom}
                  onChange={(e) =>
                    setYearFrom(e.target.value)
                  }
                  placeholder="2018"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Year To */}
              <div>
                <label className="mb-2 block text-sm font-bold">
                  Year To
                </label>

                <input
                  type="number"
                  min="1900"
                  max="2100"
                  value={yearTo}
                  onChange={(e) =>
                    setYearTo(e.target.value)
                  }
                  placeholder="2024"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />
              </div>

            </div>
          </div>

          {/* Categorization & Inventory */}
          <div className="border-b border-zinc-200 p-6">

            <h3 className="text-xl font-black">
              Categorization & Inventory
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Organize the product and control its inventory.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-3">

              {/* Category */}
              <div>

                <label className="mb-2 block text-sm font-bold">
                  Category
                </label>

                <select
                  value={categoryId}
                  onChange={(e) =>
                    setCategoryId(e.target.value)
                  }
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                >
                  <option value="">
                    Select category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

              </div>

              {/* Price */}
              <div>

                <label className="mb-2 block text-sm font-bold">
                  Price (KSh)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  placeholder="4599"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

              </div>

              {/* Stock */}
              <div>

                <label className="mb-2 block text-sm font-bold">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
                  placeholder="120"
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
                />

              </div>

            </div>
          </div>

          {/* Description */}
          <div className="border-b border-zinc-200 p-6">

            <h3 className="text-xl font-black">
              Description
            </h3>

            <div className="mt-5">

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={5}
                placeholder="Describe the product, quality, compatibility and other useful information..."
                className="w-full resize-none rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-red-600 focus:ring-2 focus:ring-red-100"
              />

            </div>
          </div>

          {/* Media */}
          <div className="border-b border-zinc-200 p-6">

            <h3 className="text-xl font-black">
              Media
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Upload a product image.
            </p>

            <div className="mt-5">

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files?.[0] || null
                  )
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3"
              />

              {image && (
                <div className="mt-3 rounded-xl bg-zinc-100 p-4">

                  <p className="text-sm font-bold">
                    Selected image
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    {image.name}
                  </p>

                </div>
              )}

            </div>
          </div>

          {/* Visibility */}
          <div className="p-6">

            <h3 className="text-xl font-black">
              Visibility
            </h3>

            <div className="mt-5 space-y-4">

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) =>
                    setIsActive(e.target.checked)
                  }
                  className="h-5 w-5 accent-red-600"
                />

                <div>
                  <p className="font-bold">
                    Active Product On Store
                  </p>

                  <p className="text-sm text-zinc-500">
                    Customers can see and purchase this product.
                  </p>
                </div>

              </label>

              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) =>
                    setIsFeatured(e.target.checked)
                  }
                  className="h-5 w-5 accent-red-600"
                />

                <div>
                  <p className="font-bold">
                    Feature on Homepage
                  </p>

                  <p className="text-sm text-zinc-500">
                    Highlight this product on the storefront.
                  </p>
                </div>

              </label>

            </div>
          </div>

        </div>

        {/* Bottom actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => saveProduct(false)}
            disabled={saving}
            className="rounded-xl bg-zinc-950 px-8 py-4 font-black text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "SAVING..." : "SAVE PRODUCT"}
          </button>

          <button
            type="button"
            onClick={() => saveProduct(true)}
            disabled={saving}
            className="rounded-xl bg-red-600 px-8 py-4 font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "SAVING..." : "SAVE & NEW"}
          </button>

        </div>

        {/* Message */}
        {message && (
          <div
            className={`mt-6 rounded-xl border p-4 text-sm font-bold ${
              messageType === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

      </section>
    </main>
  )
}