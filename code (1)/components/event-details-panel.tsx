"use client"

import { X, MapPin, Calendar, Clock, Users, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  image?: string
}

interface EventDetailsPanelProps {
  event: Event
  onClose: () => void
  onJoinEvent: (eventId: string) => void
}

const EVENT_IMAGES: Record<string, string> = {
  "1": "/tech-startup-people-networking-mixer-event.jpg",
  "2": "/indie-music-festival-concert-stage-lights.jpg",
  "3": "/food-truck-festival-outdoor-gathering.jpg",
  "4": "/game-developers-working-on-computers-meetup.jpg",
  "5": "/art-gallery-opening-exhibition-people-viewing-art.jpg",
  "6": "/blockchain-workshop-cryptocurrency-presentation.jpg",
  "7": "/jazz-night-live-band-performance.jpg",
  "8": "/vegan-cooking-class-healthy-food.jpg",
  "9": "/esports-tournament-gaming-competition.jpg",
  "10": "/photography-exhibition-gallery-display.jpg",
  "11": "/ai-ml-summit-technology-conference.jpg",
  "12": "/rock-concert-live-band-crowd.jpg",
  "13": "/wine-tasting-event-glasses-social.jpg",
  "14": "/vr-gaming-person-wearing-goggles.jpg",
  "15": "/street-art-tour-graffiti-murals.jpg",
  "16": "/startup-pitch-night-presentation-investors.jpg",
  "17": "/electronic-music-night-dj-club.jpg",
  "18": "/sushi-making-workshop-japanese-food.jpg",
  "19": "/board-game-night-people-playing.jpg",
  "20": "/modern-sculpture-exhibition-gallery.jpg",
}

export function EventDetailsPanel({ event, onClose, onJoinEvent }: EventDetailsPanelProps) {
  const eventImage = EVENT_IMAGES[event.id] || event.image

  return (
    <div className="absolute top-0 right-0 w-96 h-full bg-card border-l border-accent/30 shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto z-[100]">
      <div className="space-y-6">
        {eventImage && (
          <div className="relative w-full h-64 bg-gradient-to-br from-primary/20 to-secondary/20">
            <Image src={eventImage || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{event.title}</h2>
            <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full">
              {event.category}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">{event.location}</p>
                <p className="text-xs text-muted-foreground">{event.distance} away</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <Calendar className="w-5 h-5 text-secondary" />
              <p className="text-sm">{new Date(event.date).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <Clock className="w-5 h-5 text-accent" />
              <p className="text-sm">{event.time}</p>
            </div>

            <div className="flex items-center gap-3 text-foreground">
              <Users className="w-5 h-5 text-green-500" />
              <p className="text-sm">{event.attendees} people attending</p>
            </div>
          </div>

          {/* Attendees */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">People you know attending</h3>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="border-2 border-card w-10 h-10">
                  <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                  <AvatarFallback className="bg-accent text-accent-foreground">U{i}</AvatarFallback>
                </Avatar>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-medium text-foreground">
                +{event.attendees - 4}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onJoinEvent(event.id)}
            >
              Join Event
            </Button>
            <Button variant="outline" size="icon" className="border-accent/30 text-foreground bg-transparent">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="border-accent/30 text-foreground bg-transparent">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Join us for an incredible experience where different worlds collide! Connect with like-minded people,
              discover new interests, and create unforgettable memories. This is your chance to explore something new
              and meet amazing people in your community.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
