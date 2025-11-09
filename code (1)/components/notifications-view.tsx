"use client"

import { Bell, Heart, MessageCircle, UserPlus, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NotificationsView() {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "Sarah Chen",
      action: "loved your review of Tech Startup Mixer",
      time: "2 hours ago",
      icon: Heart,
      color: "text-secondary",
    },
    {
      id: 2,
      type: "message",
      user: "Alex Morgan",
      action: "sent you a message",
      time: "5 hours ago",
      icon: MessageCircle,
      color: "text-primary",
    },
    {
      id: 3,
      type: "follow",
      user: "Jamie Williams",
      action: "started following you",
      time: "1 day ago",
      icon: UserPlus,
      color: "text-accent",
    },
    {
      id: 4,
      type: "event",
      user: "Orbit",
      action: "New event near you: Food Truck Rally",
      time: "2 days ago",
      icon: Calendar,
      color: "text-orange-400",
    },
  ]

  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your orbit</p>
          </div>
          <Bell className="w-8 h-8 text-primary" />
        </div>

        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <Card
                key={notification.id}
                className="p-4 bg-card border-accent/20 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/30">
                    <AvatarImage src={`/generic-placeholder-icon.png?height=48&width=48`} />
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {notification.user.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{notification.user}</span> {notification.action}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <Icon className={`w-5 h-5 ${notification.color}`} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
