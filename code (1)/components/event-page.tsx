"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Calendar, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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

interface Attendee {
  id: string
  name: string
  pronouns: string
  avatar?: string
  interests: string[]
  bio: string
  eventsAttended: number
  upcomingEvents: string[]
  likedEvents: string[]
}

interface EventPageProps {
  event: Event | null
  onBack: () => void
  onViewProfile: (attendeeId: string) => void
}

const MOCK_ATTENDEES: Attendee[] = [
  {
    id: "1",
    name: "Sarah Chen",
    pronouns: "she/her",
    interests: ["tech", "startups", "AI"],
    bio: "Software engineer passionate about building the future",
    eventsAttended: 23,
    upcomingEvents: ["AI & ML Summit", "Blockchain Workshop"],
    likedEvents: ["Tech Startup Mixer", "VR Gaming Experience"],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    pronouns: "he/him",
    interests: ["music", "art", "culture"],
    bio: "Jazz musician and art enthusiast exploring Manchester's creative scene",
    eventsAttended: 17,
    upcomingEvents: ["Jazz Night", "Art Gallery Opening"],
    likedEvents: ["Indie Music Festival", "Photography Exhibition"],
  },
  {
    id: "3",
    name: "Alex Rivera",
    pronouns: "they/them",
    interests: ["food", "cooking", "sustainability"],
    bio: "Plant-based chef on a mission to make vegan food accessible and delicious",
    eventsAttended: 31,
    upcomingEvents: ["Vegan Cooking Class", "Food Truck Rally"],
    likedEvents: ["Sushi Making Workshop", "Wine Tasting Event"],
  },
  {
    id: "4",
    name: "Priya Patel",
    pronouns: "she/her",
    interests: ["gaming", "esports", "tech"],
    bio: "Pro gamer and content creator | Twitch Partner",
    eventsAttended: 19,
    upcomingEvents: ["Esports Tournament", "VR Gaming Experience"],
    likedEvents: ["Game Dev Meetup", "Board Game Night"],
  },
]

const EVENT_IMAGES: Record<string, string> = {
  "1": "/tech-startup-people-networking-mixer-event.jpg",
  "14": "/vr-gaming-person-wearing-goggles.jpg",
}

export function EventPage({ event, onBack, onViewProfile }: EventPageProps) {
  const [hoveredAttendee, setHoveredAttendee] = useState<string | null>(null)
  const [hasJoined, setHasJoined] = useState(false)
  const [showReminderDropdown, setShowReminderDropdown] = useState(false)
  const [reminderSet, setReminderSet] = useState(false)

  if (!event) {
    return (
      <div className="pt-16 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground text-lg mb-4">Event not found</p>
          <Button onClick={onBack} className="bg-accent text-white hover:bg-accent/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Explore
          </Button>
        </div>
      </div>
    )
  }

  const eventImage = EVENT_IMAGES[event.id] || event.image

  const getAvatarColor = (id: string) => {
    const colors = [
      "from-cyan-500 to-blue-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
      "from-yellow-500 to-orange-500",
      "from-indigo-500 to-purple-500",
    ]
    const index = Number.parseInt(id) % colors.length
    return colors[index]
  }

  const handleSetReminder = (type: string) => {
    setReminderSet(true)
    setShowReminderDropdown(false)
    // Here you would typically save the reminder preference
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Button variant="ghost" onClick={onBack} className="text-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {eventImage && (
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image src={eventImage || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>
            )}

            <Card className="p-6 bg-card border-accent/20">
              <h1 className="text-3xl font-bold text-foreground mb-4">{event.title}</h1>

              <div className="space-y-4 mb-6">
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

              <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground mb-4">About This Event</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Join us for an incredible experience where different worlds collide! Connect with like-minded people,
                  discover new interests, and create unforgettable memories. This is your chance to explore something
                  new and meet amazing people in your community.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {!hasJoined ? (
                  <Button
                    className="w-full bg-primary text-white hover:bg-primary/90"
                    onClick={() => setHasJoined(true)}
                  >
                    Join Event
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-500">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">You're going!</span>
                    </div>

                    <div className="relative">
                      <Button
                        variant="outline"
                        className="w-full border-accent text-foreground hover:bg-muted bg-transparent"
                        onClick={() => setShowReminderDropdown(!showReminderDropdown)}
                      >
                        {reminderSet ? "Reminder Set ✓" : "Set Reminder"}
                      </Button>

                      {showReminderDropdown && (
                        <Card className="absolute top-full mt-2 w-full bg-card border-accent/30 p-2 space-y-1 z-10">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-foreground hover:bg-muted"
                            onClick={() => handleSetReminder("1day")}
                          >
                            Remind me 1 day before
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-foreground hover:bg-muted"
                            onClick={() => handleSetReminder("1hour")}
                          >
                            Remind me 1 hour before
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-foreground hover:bg-muted"
                            onClick={() => handleSetReminder("30min")}
                          >
                            Remind me 30 minutes before
                          </Button>
                        </Card>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-card border-accent/20">
              <h2 className="text-xl font-bold text-foreground mb-4">Attendees ({MOCK_ATTENDEES.length})</h2>

              <div className="space-y-3">
                {MOCK_ATTENDEES.map((attendee) => (
                  <Card
                    key={attendee.id}
                    className={`p-4 bg-muted border-accent/10 cursor-pointer transition-all duration-200 ${
                      hoveredAttendee === attendee.id
                        ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                        : "hover:border-primary/50"
                    }`}
                    onMouseEnter={() => setHoveredAttendee(attendee.id)}
                    onMouseLeave={() => setHoveredAttendee(null)}
                    onClick={() => onViewProfile(attendee.id)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {attendee.avatar ? (
                        <Avatar className="w-12 h-12 border-2 border-primary">
                          <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {attendee.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(attendee.id)} flex items-center justify-center text-white font-bold border-2 border-primary`}
                        >
                          {attendee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-foreground">{attendee.name}</h3>
                        <p className="text-xs text-muted-foreground">{attendee.pronouns}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-3">
                      {attendee.interests.slice(0, 3).map((interest) => (
                        <span key={interest} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-accent text-white hover:bg-accent/90"
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewProfile(attendee.id)
                      }}
                    >
                      Connect
                    </Button>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
