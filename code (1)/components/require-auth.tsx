"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"
import { useRouter } from "next/navigation"

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState<boolean>(false)

  useEffect(() => {
    if (!auth) {
      // Firebase not configured; show a minimal state but don't crash
      setReady(true)
      setAuthed(false)
      return
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      setAuthed(!!user)
      setReady(true)
      if (!user) router.replace("/signin")
    })
    return () => unsub()
  }, [router])

  if (!ready) return <div className="p-6">Loading...</div>
  if (!auth) return (
    <div className="p-6 text-sm">
      Firebase is not configured. Ensure NEXT_PUBLIC_FIREBASE_* env vars are set and restart the dev server.
    </div>
  )
  if (!authed) return null
  return <>{children}</>
}
