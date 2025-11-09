"use client"

import { useState } from "react"
import { auth } from "@/lib/firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password)
      setSuccess("Account created! You can now sign in.")
      setEmail("")
      setPassword("")
    } catch (err: any) {
      setError(err?.message || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-card p-6 rounded-md shadow">
        <h1 className="text-xl font-semibold mb-4">Create your account</h1>
        <label className="block mb-2">
          <span className="block text-sm mb-1">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded border px-3 py-2"
          />
        </label>
        <label className="block mb-4">
          <span className="block text-sm mb-1">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full rounded border px-3 py-2"
          />
        </label>
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
        >
          {loading ? "Creating..." : "Sign up"}
        </button>
        <p className="text-sm text-muted-foreground mt-4">
          Already have an account? <a className="underline" href="/">Sign in</a>
        </p>
      </form>
    </main>
  )
}
