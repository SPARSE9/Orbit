"use client"

import { motion } from "framer-motion"
import { useRef } from "react"

interface EventOrbitProps {
  event: {
    id: string
    title: string
    category: string
    x: number
    y: number
    color: string
    attendees: number
  }
  onClick: () => void
  onPositionChange: (eventId: string, x: number, y: number) => void
  isSelected: boolean
  isBouncing?: boolean
  zIndex?: number
}

export function EventOrbit({ event, onClick, onPositionChange, isSelected, isBouncing, zIndex = 10 }: EventOrbitProps) {
  const constraintsRef = useRef(null)

  const getPlanetStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "business":
      case "tech":
        return "from-blue-900 via-blue-600 to-cyan-400"
      case "music":
        return "from-red-900 via-pink-600 to-rose-400"
      case "food":
        return "from-orange-900 via-amber-600 to-yellow-400"
      case "gaming":
      case "sports":
        return "from-emerald-900 via-green-600 to-teal-400"
      case "art":
        return "from-purple-900 via-violet-600 to-fuchsia-400"
      default:
        return "from-blue-900 via-blue-600 to-cyan-400"
    }
  }

  return (
    <motion.div
      className="absolute cursor-pointer flex flex-col items-center"
      style={{
        left: `${event.x}%`,
        top: `${event.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: zIndex,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      animate={{
        scale: isSelected ? 1.2 : 1,
        y: isBouncing ? [0, -30, 0, -20, 0, -10, 0] : 0,
      }}
      transition={{
        y: { duration: 1, ease: "easeOut" },
        scale: { duration: 0.2 },
      }}
    >
      <motion.div
        className="mb-2 px-3 py-1 bg-card/80 backdrop-blur-sm rounded-full border border-primary/30"
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <p className="text-xs font-semibold text-primary whitespace-nowrap">{event.title}</p>
      </motion.div>

      <motion.div
        className={`w-24 h-24 rounded-full bg-gradient-to-br ${getPlanetStyle(event.category)} opacity-30 blur-3xl absolute`}
        style={{ top: "32px" }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="relative w-16 h-16">
        {/* Planet base with deep shadows and realistic lighting */}
        <div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${getPlanetStyle(event.category)}`}
          style={{
            boxShadow: `
              inset -16px -16px 32px rgba(0, 0, 0, 0.9),
              inset 8px 8px 24px rgba(255, 255, 255, 0.1),
              0 0 50px rgba(0, 255, 255, 0.3),
              0 8px 32px rgba(0, 0, 0, 0.8)
            `,
          }}
        />

        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Layer 1: Base terrain variation */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 25% 25%, rgba(255,255,255,0.15) 0%, transparent 35%),
                radial-gradient(ellipse at 75% 75%, rgba(0,0,0,0.4) 0%, transparent 40%),
                radial-gradient(ellipse at 60% 30%, rgba(255,255,255,0.08) 0%, transparent 25%),
                radial-gradient(ellipse at 30% 70%, rgba(0,0,0,0.3) 0%, transparent 30%)
              `,
            }}
          />

          {/* Layer 2: Detailed crater patterns */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                radial-gradient(circle at 28% 32%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 8%, transparent 16%),
                radial-gradient(circle at 72% 58%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 6%, transparent 14%),
                radial-gradient(circle at 48% 78%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 5%, transparent 12%),
                radial-gradient(circle at 18% 68%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 4%, transparent 10%),
                radial-gradient(circle at 82% 38%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 3%, transparent 8%),
                radial-gradient(circle at 38% 48%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 3%, transparent 7%),
                radial-gradient(circle at 62% 22%, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 4%, transparent 9%)
              `,
            }}
          />

          {/* Layer 3: Mountain ranges and surface detail */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(135deg, transparent 45%, rgba(0,0,0,0.3) 48%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 52%, transparent 55%),
                linear-gradient(45deg, transparent 60%, rgba(255,255,255,0.1) 62%, rgba(255,255,255,0.15) 64%, rgba(255,255,255,0.1) 66%, transparent 68%)
              `,
            }}
          />
        </div>

        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `
              radial-gradient(ellipse at 28% 28%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 20%, transparent 45%),
              radial-gradient(ellipse at 32% 32%, rgba(255,255,255,0.4) 5%, rgba(255,255,255,0.2) 25%, transparent 50%)
            `,
          }}
        />

        {/* Terminator line (day/night separation) */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(to right, transparent 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)`,
          }}
        />

        {/* Attendee count display */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <p className="text-xs font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">{event.attendees}</p>
            <p className="text-[9px] text-white/95 drop-shadow-[0_3px_6px_rgba(0,0,0,1)]">going</p>
          </div>
        </div>

        <motion.div
          className="absolute inset-0 rounded-full border border-primary/40 shadow-[0_0_12px_rgba(0,255,255,0.4)]"
          animate={{
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  )
}
