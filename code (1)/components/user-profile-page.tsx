"use client"
import { ArrowLeft, MapPin, Calendar, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserProfilePageProps {
  attendeeId: string
  onBack: () => void
}

const ATTENDEE_DATA: Record<string, any> = {
  "1": {
    id: "1",
    name: "Sarah Chen",
    pronouns: "she/her",
    interests: ["tech", "startups", "AI", "machine learning", "entrepreneurship"],
    bio: "Software engineer passionate about building the future. I love exploring new technologies and meeting people who share my enthusiasm for innovation. Always up for a good tech meetup or hackathon!",
    eventsAttended: 23,
    upcomingEvents: [
      { id: "11", title: "AI & ML Summit", date: "2025-11-23", location: "MediaCityUK" },
      { id: "6", title: "Blockchain Workshop", date: "2025-11-16", location: "Deansgate" },
    ],
    likedEvents: [
      { id: "1", title: "Tech Startup Mixer", category: "business" },
      { id: "14", title: "VR Gaming Experience", category: "gaming" },
      { id: "16", title: "Startup Pitch Night", category: "business" },
    ],
    previousEvents: [
      { id: "1", title: "Tech Startup Mixer", date: "2025-11-15" },
      { id: "4", title: "Game Dev Meetup", date: "2025-11-18" },
      { id: "16", title: "Startup Pitch Night", date: "2025-11-28" },
    ],
  },
}

export function UserProfilePage({ attendeeId, onBack }: UserProfilePageProps) {
  const attendee = ATTENDEE_DATA[attendeeId]

  if (!attendee) {
    return <div>Profile not found</div>
  }

  const getAvatarColor = (id: string) => {
    const colors = [
      "from-cyan-500 to-blue-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500",
    ]
    const index = Number.parseInt(id) % colors.length
    return colors[index]
  }

  return (
    <div className="pt-16 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Button variant="ghost" onClick={onBack} className="text-foreground hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="p-6 bg-card border-accent/20">
          <div className="flex items-start gap-6 mb-6">
            <div
              className={`w-24 h-24 rounded-full bg-gradient-to-br ${getAvatarColor(attendee.id)} flex items-center justify-center text-white text-2xl font-bold border-4 border-primary`}
            >
              {attendee.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-1">{attendee.name}</h1>
              <p className="text-sm text-muted-foreground mb-4">{attendee.pronouns}</p>

              <div className="flex gap-2 flex-wrap mb-4">
                {attendee.interests.map((interest: string) => (
                  <span key={interest} className="text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">
                    {interest}
                  </span>
                ))}
              </div>

              <Button className="bg-accent text-white hover:bg-accent/90">
                <Users className="w-4 h-4 mr-2" />
                Connect
              </Button>
            </div>
          </div>

          <div className="border-t border-accent/20 pt-6">
            <h2 className="text-lg font-bold text-foreground mb-2">About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{attendee.bio}</p>
          </div>
        </Card>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card border border-accent/20">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger
              value="attended"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Previous Events
            </TabsTrigger>
            <TabsTrigger
              value="liked"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Liked Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-3 mt-4">
            {attendee.upcomingEvents.map((event: any) => (
              <Card key={event.id} className="p-4 bg-card border-accent/20">
                <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="attended" className="space-y-3 mt-4">
            <div className="text-center mb-4">
              <p className="text-2xl font-bold text-primary">{attendee.eventsAttended}</p>
              <p className="text-sm text-muted-foreground">Events Attended</p>
            </div>
            {attendee.previousEvents.map((event: any) => (
              <Card key={event.id} className="p-4 bg-card border-accent/20">
                <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="liked" className="space-y-3 mt-4">
            {attendee.likedEvents.map((event: any) => (
              <Card key={event.id} className="p-4 bg-card border-accent/20 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                  <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full">
                    {event.category}
                  </span>
                </div>
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
