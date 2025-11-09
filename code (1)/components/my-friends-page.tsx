"use client"

import { useState } from "react"
import { ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

interface Friend {
  id: string
  name: string
  pronouns: string
  avatar?: string
  interests: string[]
  mutualEvents: number
  lastMessage?: string
}

interface MyFriendsPageProps {
  onBack: () => void
  onViewProfile: (friendId: string) => void
  onStartChat: (friendId: string, friendName: string) => void
}

const MOCK_FRIENDS: Friend[] = [
  {
    id: "1",
    name: "Sarah Chen",
    pronouns: "she/her",
    interests: ["tech", "startups", "AI"],
    mutualEvents: 5,
    lastMessage: "See you at the event!",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    pronouns: "he/him",
    interests: ["music", "art", "culture"],
    mutualEvents: 3,
  },
  {
    id: "3",
    name: "Alex Rivera",
    pronouns: "they/them",
    interests: ["food", "cooking", "sustainability"],
    mutualEvents: 7,
    lastMessage: "That recipe was amazing!",
  },
  {
    id: "4",
    name: "Priya Patel",
    pronouns: "she/her",
    interests: ["gaming", "esports", "tech"],
    mutualEvents: 4,
  },
]

export function MyFriendsPage({ onBack, onViewProfile, onStartChat }: MyFriendsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [hoveredFriend, setHoveredFriend] = useState<string | null>(null)

  const filteredFriends = MOCK_FRIENDS.filter((friend) => friend.name.toLowerCase().includes(searchQuery.toLowerCase()))

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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">My Friends</h1>
            <span className="text-muted-foreground">{MOCK_FRIENDS.length} connections</span>
          </div>

          <Input
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-muted border-accent/20 text-foreground"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFriends.map((friend) => (
            <Card
              key={friend.id}
              className={`p-4 bg-card border-accent/20 cursor-pointer transition-all duration-200 ${
                hoveredFriend === friend.id
                  ? "border-primary shadow-lg shadow-primary/20 scale-[1.02]"
                  : "hover:border-primary/50"
              }`}
              onMouseEnter={() => setHoveredFriend(friend.id)}
              onMouseLeave={() => setHoveredFriend(null)}
              onClick={() => onViewProfile(friend.id)}
            >
              <div className="flex items-start gap-4">
                {friend.avatar ? (
                  <Avatar className="w-16 h-16 border-2 border-primary">
                    <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {friend.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarColor(friend.id)} flex items-center justify-center text-white font-bold text-lg border-2 border-primary`}
                  >
                    {friend.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{friend.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{friend.pronouns}</p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {friend.interests.slice(0, 3).map((interest) => (
                      <span key={interest} className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground">{friend.mutualEvents} mutual events</p>

                  {friend.lastMessage && (
                    <p className="text-xs text-muted-foreground italic mt-1 truncate">"{friend.lastMessage}"</p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="flex-1 bg-primary text-white hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    onStartChat(friend.id, friend.name)
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-accent/30 text-foreground hover:bg-muted bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewProfile(friend.id)
                  }}
                >
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No friends found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  )
}
