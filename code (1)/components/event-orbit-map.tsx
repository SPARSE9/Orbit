"use client"

import { useState, useEffect } from "react"
import { EventOrbit } from "@/components/event-orbit"
import { EventDetailsPanel } from "@/components/event-details-panel"
import Image from "next/image"

interface Event {
  id: string
  title: string
  category: string
  location: string
  date: string
  time: string
  attendees: number
  distance: string
  x: number
  y: number
  color: string
}

interface EventOrbitMapProps {
  events: Event[]
  bouncingEventId?: string | null
  onJoinEvent: (eventId: string) => void
}

export function EventOrbitMap({ events, bouncingEventId, onJoinEvent }: EventOrbitMapProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [planetPositions, setPlanetPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [starPositions] = useState(() =>
    Array.from({ length: 100 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
    })),
  )

  useEffect(() => {
    const centerX = 50
    const centerY = 50
    const orbitRadii = [32, 40, 48, 56, 64] // Increased spacing between orbits

    const initialPositions = events.reduce(
      (acc, event, index) => {
        const orbitIndex = index % orbitRadii.length
        const radius = orbitRadii[orbitIndex]

        const totalOrbits = orbitRadii.length
        const planetsPerOrbit = Math.ceil(events.length / totalOrbits)
        const positionOnOrbit = Math.floor(index / totalOrbits)

        const angleOffset = orbitIndex * 0.5 // Increased angular offset for better spacing between orbit levels
        const angle = (positionOnOrbit / planetsPerOrbit) * 2 * Math.PI + angleOffset

        const x = centerX + radius * Math.cos(angle)
        const y = centerY + radius * Math.sin(angle)
        acc[event.id] = { x, y }
        return acc
      },
      {} as Record<string, { x: number; y: number }>,
    )
    setPlanetPositions(initialPositions)
  }, [events])

  useEffect(() => {
    const centerX = 50
    const centerY = 50
    const orbitRadii = [32, 40, 48, 56, 64] // Match increased spacing

    const animationInterval = setInterval(() => {
      setPlanetPositions((prev) => {
        const newPositions = { ...prev }
        events.forEach((event, index) => {
          const currentTime = Date.now() / 1000

          const orbitIndex = index % orbitRadii.length
          const radius = orbitRadii[orbitIndex]
          const totalOrbits = orbitRadii.length
          const planetsPerOrbit = Math.ceil(events.length / totalOrbits)
          const positionOnOrbit = Math.floor(index / totalOrbits)

          const baseSpeed = 90 + orbitIndex * 20
          const angleOffset = orbitIndex * 0.5 // Match increased angular offset
          const angle =
            (currentTime / baseSpeed) * 2 * Math.PI + (positionOnOrbit / planetsPerOrbit) * 2 * Math.PI + angleOffset

          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)
          newPositions[event.id] = { x, y }
        })
        return newPositions
      })
    }, 50)

    return () => clearInterval(animationInterval)
  }, [events])

  const handlePositionChange = (eventId: string, x: number, y: number) => {
    setPlanetPositions((prev) => ({
      ...prev,
      [eventId]: { x, y },
    }))
  }

  return (
    <div className="relative w-full h-full bg-[#0B0C10] overflow-hidden z-0">
      <div className="absolute inset-0 pointer-events-none">
        {starPositions.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#00FFFF] rounded-full"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: "min(80vh, 80vw)", height: "min(80vh, 80vw)" }}>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#00FFFF]/30"
              style={{ width: "64%", height: "64%" }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#00FFFF]/25"
              style={{ width: "80%", height: "80%" }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#00FFFF]/20"
              style={{ width: "96%", height: "96%" }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#00FFFF]/18"
              style={{ width: "112%", height: "112%" }}
            />
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#00FFFF]/15"
              style={{ width: "128%", height: "128%" }}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src="/orbit-logo-no-bg.png"
                  alt="Orbit Logo"
                  width={192}
                  height={192}
                  className="object-contain w-full h-full"
                  style={{
                    mixBlendMode: "lighten",
                    filter: "brightness(1.2) contrast(1.1)",
                  }}
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-radial from-[#00FFFF]/10 via-[#FF00C8]/5 to-transparent blur-3xl pointer-events-none" />
            </div>
          </div>

          {events.map((event, index) => (
            <EventOrbit
              key={event.id}
              event={{
                ...event,
                x: planetPositions[event.id]?.x ?? 50,
                y: planetPositions[event.id]?.y ?? 50,
              }}
              onClick={() => setSelectedEvent(event)}
              onPositionChange={handlePositionChange}
              isSelected={selectedEvent?.id === event.id}
              isBouncing={bouncingEventId === event.id}
              zIndex={10 + index}
            />
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventDetailsPanel event={selectedEvent} onClose={() => setSelectedEvent(null)} onJoinEvent={onJoinEvent} />
      )}
    </div>
  )
}
