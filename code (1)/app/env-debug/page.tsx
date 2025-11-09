"use client"

export default function EnvDebugPage() {
  const entries = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    "GEMINI_API_KEY",
  ] as const

  const rows = entries.map((k) => {
    const v = process.env[k as keyof NodeJS.ProcessEnv] as string | undefined
    const present = !!v && v.length > 0
    return { key: k, present, length: v ? v.length : 0 }
  })

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-xl font-semibold mb-4">Env Debug</h1>
      <ul className="space-y-2">
        {rows.map((r) => (
          <li key={r.key} className="text-sm">
            <span className="font-mono">{r.key}</span>: {r.present ? `present (len=${r.length})` : "missing"}
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground mt-4">
        Note: Values are not shown, only presence and length for debugging.
      </p>
    </main>
  )
}
