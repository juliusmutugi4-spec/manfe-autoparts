import { supabase } from "@/lib/supabase"

export default async function Home() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        MANFE AUTOPARTS
      </h1>

      <p className="mt-4">
        Supabase connection test
      </p>

      <pre className="mt-6 rounded-lg bg-black p-5 text-white">
        {JSON.stringify({ data, error }, null, 2)}
      </pre>
    </main>
  )
}