"use client"

import { useEffect } from "react"

interface CelebrationOverlayProps {
  onComplete: () => void
}

export function CelebrationOverlay({ onComplete }: CelebrationOverlayProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="text-[200px] animate-in zoom-in-50 duration-500">🥳</div>
    </div>
  )
}
