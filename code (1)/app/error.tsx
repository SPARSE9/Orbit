"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service if desired
    console.error("App error boundary:", error)
  }, [error])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center gap-4">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-sm text-muted-foreground max-w-xl break-words">
        {error?.message || "An unexpected error occurred."}
      </p>
      {error?.stack && (
        <pre className="text-xs text-left bg-muted p-3 rounded w-full max-w-3xl overflow-auto" style={{ maxHeight: 240 }}>
          {error.stack}
        </pre>
      )}
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded bg-primary text-primary-foreground hover:opacity-90"
      >
        Try again
      </button>
    </main>
  )
}
