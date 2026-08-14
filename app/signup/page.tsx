"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createSupabaseBrowserClient } from "@/lib/supabase-browser"

export default function SignupPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()

  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function handleSignup(e: FormEvent) {
    e.preventDefault()

    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim(),
          },
        },
      })

      if (error) {
        throw error
      }

      /*
       * If email confirmation is enabled in Supabase,
       * the user will need to confirm their email first.
       */
      if (data.user && !data.session) {
        setSuccess(
          "Account created. Please check your email and confirm your account before signing in."
        )
        return
      }

      router.push("/")
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 py-10">
      <div className="w-full max-w-md">

        {/* BRAND */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-zinc-950">
            MANFE<span className="text-orange-500">.</span>
          </h1>

          <p className="mt-1 text-xs font-black uppercase tracking-[0.25em] text-orange-500">
            AUTOPARTS
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-black text-zinc-950">
            Create account
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Create your MANFE account to place and track orders.
          </p>

          <form
            onSubmit={handleSignup}
            className="mt-7 space-y-5"
          >

            {/* FULL NAME */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                autoComplete="name"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XXXXXXXX"
                required
                autoComplete="tel"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-bold">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
                autoComplete="new-password"
                className="w-full rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
                {success}
              </div>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-500 px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-zinc-400"
            >
              {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

          </form>

          <div className="my-6 border-t border-zinc-100" />

          <p className="text-center text-sm text-zinc-500">
            Already have an account?
          </p>

          <Link
            href="/login"
            className="mt-3 block w-full rounded-xl border border-zinc-300 px-5 py-3 text-center text-sm font-black text-zinc-900 transition hover:border-orange-500 hover:text-orange-500"
          >
            SIGN IN
          </Link>

          <Link
            href="/"
            className="mt-5 block text-center text-sm font-bold text-zinc-500 hover:text-zinc-900"
          >
            ← Continue shopping
          </Link>

        </div>

      </div>
    </main>
  )
}