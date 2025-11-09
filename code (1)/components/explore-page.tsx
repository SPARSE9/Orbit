"use client"

import { useState } from "react"
import { ChevronDown, MapPin, Filter, Clock, Sparkles, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { EventOrbitMap } from "@/components/event-orbit-map"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { EventCountFilter } from "@/components/event-count-filter"

const USER_INTERESTS = ["tech", "business", "startups"]

const MOCK_EVENTS = [
  {
    id: "1",
    title: "Tech Startup Mixer",
    category: "business",
    interests: ["tech", "business", "startups"],
    location: "Northern Quarter, Manchester",
    date: "2025-11-15",
    time: "18:00",
    attendees: 45,
    distance: "0.8 km",
    x: 20,
    y: 30,
    color: "from-accent to-primary",
    image: "/tech-startup-people-networking-mixer-event.jpg",
  },
  {
    id: "2",
    title: "Indie Music Festival",
    category: "music",
    interests: ["music", "arts", "culture"],
    location: "Castlefield, Manchester",
    date: "2025-11-20",
    time: "20:00",
    attendees: 230,
    distance: "1.2 km",
    x: 60,
    y: 40,
    color: "from-secondary to-pink-500",
    image: "/indie-music-festival-concert-stage-lights.jpg",
  },
  {
    id: "3",
    title: "Food Truck Rally",
    category: "food",
    interests: ["food", "community", "social"],
    location: "Spinningfields, Manchester",
    date: "2025-11-12",
    time: "12:00",
    attendees: 89,
    distance: "0.5 km",
    x: 40,
    y: 60,
    color: "from-orange-500 to-yellow-400",
    image: "/food-truck-festival-outdoor-gathering.jpg",
  },
  {
    id: "4",
    title: "Game Dev Meetup",
    category: "gaming",
    interests: ["gaming", "tech", "development"],
    location: "Ancoats, Manchester",
    date: "2025-11-18",
    time: "19:00",
    attendees: 67,
    distance: "1.5 km",
    x: 70,
    y: 25,
    color: "from-green-500 to-emerald-400",
    image: "/game-developers-working-on-computers-meetup.jpg",
  },
  {
    id: "5",
    title: "Art Gallery Opening",
    category: "art",
    interests: ["art", "culture", "networking"],
    location: "City Centre, Manchester",
    date: "2025-11-14",
    time: "17:00",
    attendees: 120,
    distance: "0.3 km",
    x: 30,
    y: 75,
    color: "from-purple-500 to-pink-400",
    image: "/art-gallery-opening-exhibition-people-viewing-art.jpg",
  },
  {
    id: "6",
    title: "Blockchain Workshop",
    category: "tech",
    interests: ["tech", "blockchain", "crypto"],
    location: "Deansgate, Manchester",
    date: "2025-11-16",
    time: "14:00",
    attendees: 55,
    distance: "0.9 km",
    x: 35,
    y: 45,
    color: "from-cyan-500 to-blue-400",
    image: "/tech-startup-people-networking-mixer-event.jpg",
  },
  {
    id: "7",
    title: "Jazz Night",
    category: "music",
    interests: ["music", "jazz", "nightlife"],
    location: "Oxford Road, Manchester",
    date: "2025-11-17",
    time: "21:00",
    attendees: 78,
    distance: "1.1 km",
    x: 65,
    y: 55,
    color: "from-amber-500 to-orange-400",
    image: "/indie-music-festival-concert-stage-lights.jpg",
  },
  {
    id: "8",
    title: "Vegan Cooking Class",
    category: "food",
    interests: ["food", "health", "cooking"],
    location: "Chorlton, Manchester",
    date: "2025-11-19",
    time: "16:00",
    attendees: 32,
    distance: "2.3 km",
    x: 25,
    y: 65,
    color: "from-lime-500 to-green-400",
    image: "/food-truck-festival-outdoor-gathering.jpg",
  },
  {
    id: "9",
    title: "Esports Tournament",
    category: "gaming",
    interests: ["gaming", "esports", "competition"],
    location: "Piccadilly, Manchester",
    date: "2025-11-21",
    time: "11:00",
    attendees: 156,
    distance: "0.6 km",
    x: 55,
    y: 35,
    color: "from-red-500 to-pink-500",
    image: "/game-developers-working-on-computers-meetup.jpg",
  },
  {
    id: "10",
    title: "Photography Exhibition",
    category: "art",
    interests: ["art", "photography", "visual"],
    location: "Salford Quays, Manchester",
    date: "2025-11-22",
    time: "13:00",
    attendees: 92,
    distance: "1.8 km",
    x: 45,
    y: 70,
    color: "from-indigo-500 to-purple-400",
    image: "/art-gallery-opening-exhibition-people-viewing-art.jpg",
  },
  {
    id: "11",
    title: "AI & ML Summit",
    category: "tech",
    interests: ["tech", "ai", "machine learning"],
    location: "MediaCityUK, Manchester",
    date: "2025-11-23",
    time: "10:00",
    attendees: 210,
    distance: "2.1 km",
    x: 50,
    y: 20,
    color: "from-violet-500 to-purple-500",
    image: "/tech-startup-people-networking-mixer-event.jpg",
  },
  {
    id: "12",
    title: "Rock Concert",
    category: "music",
    interests: ["music", "rock", "concert"],
    location: "Academy, Manchester",
    date: "2025-11-24",
    time: "19:30",
    attendees: 450,
    distance: "1.4 km",
    x: 75,
    y: 50,
    color: "from-rose-500 to-red-400",
    image: "/indie-music-festival-concert-stage-lights.jpg",
  },
  {
    id: "13",
    title: "Wine Tasting Event",
    category: "food",
    interests: ["food", "wine", "social"],
    location: "King Street, Manchester",
    date: "2025-11-25",
    time: "18:30",
    attendees: 64,
    distance: "0.7 km",
    x: 30,
    y: 50,
    color: "from-red-600 to-amber-500",
    image: "/food-truck-festival-outdoor-gathering.jpg",
  },
  {
    id: "14",
    title: "VR Gaming Experience",
    category: "gaming",
    interests: ["gaming", "vr", "technology"],
    location: "Trafford Centre, Manchester",
    date: "2025-11-26",
    time: "15:00",
    attendees: 88,
    distance: "3.2 km",
    x: 60,
    y: 65,
    color: "from-teal-500 to-cyan-400",
    image: "/game-developers-working-on-computers-meetup.jpg",
  },
  {
    id: "15",
    title: "Street Art Tour",
    category: "art",
    interests: ["art", "street art", "culture"],
    location: "Northern Quarter, Manchester",
    date: "2025-11-27",
    time: "11:30",
    attendees: 42,
    distance: "0.8 km",
    x: 40,
    y: 25,
    color: "from-pink-500 to-rose-400",
    image: "/art-gallery-opening-exhibition-people-viewing-art.jpg",
  },
  {
    id: "16",
    title: "Startup Pitch Night",
    category: "business",
    interests: ["business", "startups", "networking"],
    location: "Spinningfields, Manchester",
    date: "2025-11-28",
    time: "18:00",
    attendees: 95,
    distance: "0.5 km",
    x: 70,
    y: 40,
    color: "from-blue-500 to-cyan-400",
    image: "/tech-startup-people-networking-mixer-event.jpg",
  },
  {
    id: "17",
    title: "Electronic Music Night",
    category: "music",
    interests: ["music", "electronic", "nightlife"],
    location: "Warehouse Project, Manchester",
    date: "2025-11-29",
    time: "22:00",
    attendees: 380,
    distance: "2.5 km",
    x: 25,
    y: 40,
    color: "from-fuchsia-500 to-purple-400",
    image: "/indie-music-festival-concert-stage-lights.jpg",
  },
  {
    id: "18",
    title: "Sushi Making Workshop",
    category: "food",
    interests: ["food", "cooking", "japanese"],
    location: "Chinatown, Manchester",
    date: "2025-11-30",
    time: "17:00",
    attendees: 28,
    distance: "0.4 km",
    x: 55,
    y: 75,
    color: "from-emerald-500 to-teal-400",
    image: "/food-truck-festival-outdoor-gathering.jpg",
  },
  {
    id: "19",
    title: "Board Game Night",
    category: "gaming",
    interests: ["gaming", "board games", "social"],
    location: "Fallowfield, Manchester",
    date: "2025-12-01",
    time: "19:00",
    attendees: 36,
    distance: "1.9 km",
    x: 80,
    y: 60,
    color: "from-yellow-500 to-orange-400",
    image: "/game-developers-working-on-computers-meetup.jpg",
  },
  {
    id: "20",
    title: "Modern Sculpture Expo",
    category: "art",
    interests: ["art", "sculpture", "modern art"],
    location: "Whitworth Gallery, Manchester",
    date: "2025-12-02",
    time: "10:00",
    attendees: 115,
    distance: "1.3 km",
    x: 50,
    y: 80,
    color: "from-sky-500 to-blue-400",
    image: "/art-gallery-opening-exhibition-people-viewing-art.jpg",
  },
]

const CITIES = ["Manchester", "London", "Birmingham", "Liverpool", "Leeds", "Bristol"]

interface ExplorePageProps {
  onJoinEvent: (eventId: string) => void
}

export function ExplorePage({ onJoinEvent }: ExplorePageProps) {
  const [selectedCity, setSelectedCity] = useState("Manchester")
  const [selectedArea, setSelectedArea] = useState("All Areas")
  const [bouncingEventId, setBouncingEventId] = useState<string | null>(null)
  const [visibleEventCount, setVisibleEventCount] = useState(MOCK_EVENTS.length)

  const orbitEvents = MOCK_EVENTS.filter((event) =>
    event.interests.some((interest) => USER_INTERESTS.includes(interest)),
  )
  const deepSpaceEvents = MOCK_EVENTS.filter(
    (event) => !event.interests.some((interest) => USER_INTERESTS.includes(interest)),
  )

  const handleEventClick = (eventId: string) => {
    setBouncingEventId(eventId)
    setTimeout(() => setBouncingEventId(null), 1000)
  }

  const visibleEvents = MOCK_EVENTS.slice(0, visibleEventCount)

  return (
    <div className="pt-16 h-screen flex relative">
      <div className="w-80 bg-card border-r border-accent/30 overflow-y-auto relative z-50">
        <div className="p-4 space-y-4">
          {/* City Selector */}
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-muted border-accent/30 text-foreground">
                  {selectedCity}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-card border-accent/30">
                {CITIES.map((city) => (
                  <DropdownMenuItem
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className="text-foreground hover:text-primary cursor-pointer"
                  >
                    {city}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filter by Area */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Filter by area</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-between bg-muted border-accent/30 text-foreground"
                >
                  <Filter className="w-3 h-3 mr-2" />
                  {selectedArea}
                  <ChevronDown className="w-3 h-3 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 bg-card border-accent/30">
                <DropdownMenuItem onClick={() => setSelectedArea("All Areas")} className="text-foreground">
                  All Areas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedArea("Northern Quarter")} className="text-foreground">
                  Northern Quarter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedArea("Spinningfields")} className="text-foreground">
                  Spinningfields
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedArea("Castlefield")} className="text-foreground">
                  Castlefield
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Orbit Events Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pt-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-primary">Your Orbit</h3>
            </div>
            {orbitEvents.length === 0 ? (
              <Card className="p-6 bg-muted border-accent/20 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground">No events in your orbit yet</p>
                  <p className="text-xs text-muted-foreground">
                    Try adding more interests to discover events tailored to you.
                  </p>
                </div>
              </Card>
            ) : (
              orbitEvents.map((event) => (
                <Card
                  key={event.id}
                  onClick={() => handleEventClick(event.id)}
                  className="p-3 bg-muted border-2 border-primary/60 hover:border-primary transition-colors cursor-pointer"
                >
                  <h3 className="font-semibold text-sm text-foreground mb-1">{event.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-primary mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-primary">
                      <Clock className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    <span className="text-primary">{event.distance}</span>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Deep Space Signals Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pt-4 border-t border-accent/20">
              <Radio className="w-4 h-4 text-secondary" />
              <h3 className="font-bold text-sm text-secondary">Deep Space Signals</h3>
            </div>
            {deepSpaceEvents.map((event) => (
              <Card
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="p-3 bg-muted/50 border-2 border-primary/60 hover:border-primary transition-colors cursor-pointer"
              >
                <h3 className="font-semibold text-sm text-foreground mb-1">{event.title}</h3>
                <div className="flex items-center gap-2 text-xs text-primary mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-primary">
                    <Clock className="w-3 h-3" />
                    <span>{event.time}</span>
                  </div>
                  <span className="text-primary">{event.distance}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        <div className="absolute top-4 left-4 z-[60]">
          <EventCountFilter maxEvents={MOCK_EVENTS.length} onEventCountChange={setVisibleEventCount} />
        </div>
        <EventOrbitMap events={visibleEvents} bouncingEventId={bouncingEventId} onJoinEvent={onJoinEvent} />
      </div>
    </div>
  )
}
