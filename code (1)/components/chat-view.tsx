"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

const MOCK_CHATS = [
  {
    id: "1",
    name: "Tech Startup Mixer",
    lastMessage: "See you all there!",
    time: "2m ago",
    unread: 3,
    isGroup: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    lastMessage: "Would love to connect at the event",
    time: "1h ago",
    unread: 1,
    isGroup: false,
  },
  {
    id: "3",
    name: "Indie Music Festival",
    lastMessage: "Who's bringing the good vibes?",
    time: "3h ago",
    unread: 0,
    isGroup: true,
  },
  {
    id: "4",
    name: "Marcus Johnson",
    lastMessage: "Thanks for the recommendation!",
    time: "1d ago",
    unread: 0,
    isGroup: false,
  },
]

export function ChatView() {
  return (
    <div className="pt-20 pb-8 px-4 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">Connect with your orbit</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-10" />
        </div>

        <div className="space-y-2">
          {MOCK_CHATS.map((chat) => (
            <Card key={chat.id} className="p-4 hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder.svg?height=48&width=48" />
                  <AvatarFallback>{chat.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold truncate">{chat.name}</p>
                    <span className="text-xs text-muted-foreground">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
