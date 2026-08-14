"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

export default function AdminLoginPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleLogin(e: FormEvent) {
    e.preventDefault()

    setError("")

    if (!email.trim() || !password) {
      setError("Enter your admin email and password.")
      return
    }

    setLoading(true)

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

      if (loginError) {
        throw new Error(loginError.message)
      }

      if (!data.user) {
        throw new Error("Unable to sign in.")
      }

// Ask the database whether the signed-in user is an administrator.
const { data: isAdmin, error: adminError } =
  await supabase.rpc("is_admin")

if (adminError) {
  await supabase.auth.signOut()
  throw new Error(adminError.message)
}

if (!isAdmin) {
  await supabase.auth.signOut()
  throw new Error("This account does not have administrator access.")
}

      router.replace("/admin")
      router.refresh()
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to sign in."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">

      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-white">
            MANFE<span className="text-red-600">.</span>
          </h1>

          <p className="mt-2 text-xs font-black uppercase tracking-[0.3em] text-red-500">
            AUTOPARTS ADMIN
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-zinc-800 bg-white p-8 shadow-2xl">

          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
              Secure Access
            </p>

            <h2 className="mt-2 text-3xl font-black text-zinc-950">
              Administrator Login
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Sign in with your MANFE administrator account.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-800">
                Admin Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-bold text-zinc-800">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-red-600 px-5 py-4 font-black text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {loading ? "SIGNING IN..." : "SIGN IN AS ADMIN"}
            </button>

          </form>

          <div className="mt-6 border-t border-zinc-100 pt-6 text-center">
            <a
              href="/"
              className="text-sm font-bold text-zinc-500 transition hover:text-red-600"
            >
              ← Back to MANFE AUTOPARTS
            </a>
          </div>

        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Authorized MANFE administrators only.
        </p>

      </div>

    </main>
  )
}