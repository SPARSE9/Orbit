"use client"

import { MapPin, Sparkles, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Dashboard() {
  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Your Orbit Dashboard</h1>
          <p className="text-muted-foreground">Track your journey through the multiverse of events</p>
        </div>

        <Card className="p-6 bg-card border-accent/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">27 Events</h2>
                <p className="text-sm text-muted-foreground">Worlds you've collided with</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">1,240</p>
              <p className="text-xs text-muted-foreground">Orbit Points</p>
            </div>
          </div>
          <Progress
            value={68}
            className="h-3 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary"
          />
          <p className="text-xs text-muted-foreground mt-2">3 more events to reach Level 5</p>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Visibility */}
          <Card className="p-6 bg-card border-accent/30">
            <h2 className="text-xl font-bold text-foreground mb-4">Profile Visibility</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">Your orbit overlaps with</p>
                  <p className="text-sm font-bold text-primary">15%</p>
                </div>
                <Progress value={15} className="h-2 bg-muted [&>div]:bg-primary" />
                <p className="text-xs text-muted-foreground mt-2">of Manchester users</p>
              </div>

              <div className="bg-muted rounded-lg p-4 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-sm font-bold text-foreground">Visibility Boost</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Attend 3 more events this month to increase your visibility to 25%
                </p>
              </div>
            </div>
          </Card>

          {/* Interest Mix */}
          <Card className="p-6 bg-card border-accent/30">
            <h2 className="text-xl font-bold text-foreground mb-4">Your Interest Mix</h2>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">Music</span>
                  <span className="text-sm font-medium text-secondary">40%</span>
                </div>
                <Progress value={40} className="h-2 bg-muted [&>div]:bg-secondary" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">Food</span>
                  <span className="text-sm font-medium text-orange-400">25%</span>
                </div>
                <Progress value={25} className="h-2 bg-muted [&>div]:bg-orange-400" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">Tech</span>
                  <span className="text-sm font-medium text-accent">20%</span>
                </div>
                <Progress value={20} className="h-2 bg-muted [&>div]:bg-accent" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">Art</span>
                  <span className="text-sm font-medium text-purple-400">15%</span>
                </div>
                <Progress value={15} className="h-2 bg-muted [&>div]:bg-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cities Explored */}
          <Card className="p-6 bg-card border-accent/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-orange-500" />
                <h2 className="text-xl font-bold text-foreground">Cities Explored</h2>
              </div>
              <button className="text-primary hover:text-primary/80 text-sm flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {["Manchester", "London", "Birmingham", "Liverpool", "Leeds"].map((city, i) => (
                <div
                  key={city}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                >
                  <span className="text-sm font-medium text-foreground">{city}</span>
                  <span className="text-xs text-muted-foreground">{5 - i} events</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Events Attended */}
          <Card className="p-6 bg-card border-accent/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Events Attended</h2>
              </div>
              <button className="text-primary hover:text-primary/80 text-sm flex items-center gap-1">
                History <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center py-8">
              <p className="text-4xl font-bold text-primary mb-2">27</p>
              <p className="text-sm text-muted-foreground">Total events attended</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
