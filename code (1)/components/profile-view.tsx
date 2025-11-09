"use client"

import { Settings, MapPin, Sparkles, Calendar, MoreVertical, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const getRandomAvatar = (name: string) => {
  const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-purple-500", "bg-orange-500"]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  return { color: randomColor, initials: name.slice(0, 2).toUpperCase() }
}

export function ProfileView() {
  const avatar = getRandomAvatar("Jordan Davis")

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className={`${avatar.color} text-foreground font-bold text-xl`}>
                {avatar.initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Jordan Davis</h1>
                <span className="text-sm text-muted-foreground">(they/them)</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4" />
                Manchester, UK
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">1,240 Orbit Points</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-accent/30 text-foreground bg-transparent">
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <Card className="p-6 bg-card border-accent/30">
          <h2 className="text-lg font-bold text-foreground mb-3">About</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Music lover 🎵 | Foodie explorer 🍕 | Tech enthusiast 💻 | Always up for discovering new experiences and
            meeting interesting people from different worlds!
          </p>
          <div className="pt-4 border-t border-accent/20">
            <h3 className="text-sm font-semibold text-foreground mb-2">Bio</h3>
            <p className="text-sm text-muted-foreground">
              Event enthusiast exploring Manchester's vibrant scene. Love connecting with people from different
              communities and discovering hidden gems in the city.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-card border-accent/30">
          <h2 className="text-lg font-bold text-foreground mb-4">My Interests</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-medium">
              Music
            </span>
            <span className="px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-medium">
              Food & Drink
            </span>
            <span className="px-3 py-1.5 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm font-medium">
              Technology
            </span>
            <span className="px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 text-sm font-medium">
              Art & Culture
            </span>
            <span className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-medium">
              Gaming
            </span>
          </div>
        </Card>

        <Card className="p-6 bg-card border-accent/30">
          <h2 className="text-lg font-bold text-foreground mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {[
              { name: "Tech Startup Mixer", date: "Nov 15, 2025", color: "from-accent to-primary" },
              { name: "Indie Music Festival", date: "Nov 20, 2025", color: "from-secondary to-pink-400" },
            ].map((event, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div
                  className={`w-12 h-12 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center`}
                >
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{event.name}</p>
                  <p className="text-xs text-muted-foreground">{event.date}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-foreground"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-accent/30">
                    <DropdownMenuItem className="text-destructive hover:text-destructive cursor-pointer">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
