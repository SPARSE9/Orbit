"use client"

import { useState } from "react"
import { EventOrbit } from "@/components/event-orbit"
import { EventCard } from "@/components/event-card"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Tech Startup Mixer",
    category: "business",
    location: "Manchester, UK",
    date: "2025-11-15",
    attendees: 45,
    x: 20,
    y: 30,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "2",
    title: "Indie Music Festival",
    category: "music",
    location: "London, UK",
    date: "2025-11-20",
    attendees: 230,
    x: 60,
    y: 40,
    color: "from-purple-500 to-pink-400",
  },
  {
    id: "3",
    title: "Food Truck Rally",
    category: "food",
    location: "Manchester, UK",
    date: "2025-11-12",
    attendees: 89,
    x: 40,
    y: 60,
    color: "from-orange-500 to-yellow-400",
  },
  {
    id: "4",
    title: "Game Dev Meetup",
    category: "gaming",
    location: "Birmingham, UK",
    date: "2025-11-18",
    attendees: 67,
    x: 70,
    y: 25,
    color: "from-green-500 to-emerald-400",
  },
  {
    id: "5",
    title: "Art Gallery Opening",
    category: "art",
    location: "Liverpool, UK",
    date: "2025-11-14",
    attendees: 120,
    x: 30,
    y: 75,
    color: "from-red-500 to-rose-400",
  },
]

export function MapView() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof MOCK_EVENTS)[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="pt-16 h-screen overflow-hidden">
      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
          <div className="bg-background/80 backdrop-blur-lg rounded-full px-6 py-3 border border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">127 events</span> near you
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="bg-background/80 backdrop-blur-lg gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="relative w-full h-full">
          {MOCK_EVENTS.map((event) => (
            <EventOrbit
              key={event.id}
              event={event}
              onClick={() => setSelectedEvent(event)}
              onPositionChange={() => {}}
              isSelected={selectedEvent?.id === event.id}
            />
          ))}
        </div>

        {selectedEvent && (
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <EventCard event={selectedEvent} onClose={() => setSelectedEvent(null)} />
          </div>
        )}

        {!selectedEvent && (
          <div className="absolute bottom-4 left-4 z-10 bg-background/80 backdrop-blur-lg rounded-lg p-4 border border-border max-w-xs">
            <p className="text-xs font-bold mb-2">When Worlds Collide</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">Business</span>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">Music</span>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">Food</span>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">Gaming</span>
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-300">Art</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}