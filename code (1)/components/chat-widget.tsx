"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X, Send, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function ChatWidget({ onClose, connectedFriends = [] }: { onClose: () => void; connectedFriends?: string[] }) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isMinimized, setIsMinimized] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const widgetRef = useRef<HTMLDivElement>(null)

  const chats = [
    { id: "1", name: "Sarah Chen", lastMessage: "See you at the event!", unread: 2 },
    { id: "2", name: "Alex Morgan", lastMessage: "Thanks for the recommendation!", unread: 0 },
    { id: "3", name: "Jamie Williams", lastMessage: "Let's catch up soon", unread: 1 },
  ].filter((chat) => connectedFriends.length === 0 || connectedFriends.includes(chat.id))

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) return
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragStart])

  if (isMinimized) {
    return (
      <div
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-32 w-64 px-4 py-3 bg-card border border-accent/30 rounded-lg shadow-xl cursor-pointer hover:border-primary/50 transition-colors z-40"
      >
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border border-primary/30">
            <AvatarFallback className="bg-accent text-accent-foreground text-xs">💬</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm text-foreground">Messages</p>
            <p className="text-xs text-muted-foreground">Click to expand</p>
          </div>
          {chats.filter((c) => c.unread > 0).length > 0 && (
            <span className="ml-auto w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
              {chats.filter((c) => c.unread > 0).length}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card
      ref={widgetRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      className="fixed bottom-6 right-32 w-96 h-[500px] shadow-2xl bg-card border-accent/30 z-40 flex flex-col"
      onMouseDown={handleMouseDown}
    >
      {/* Header */}
      <div className="p-4 border-b border-accent/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-foreground">Messages</h3>
          <span className="px-2 py-0.5 bg-secondary text-white text-xs rounded-full">
            {chats.filter((c) => c.unread > 0).length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setIsMinimized(true)
            }}
            className="text-foreground"
          >
            <Minus className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Chat List */}
      {!selectedChat && (
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className="p-4 border-b border-accent/20 hover:bg-muted cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 border border-primary/30">
                  <AvatarImage src={`/generic-placeholder-graphic.png?height=40&width=40`} />
                  <AvatarFallback className="bg-accent text-accent-foreground">
                    {chat.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{chat.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Individual Chat */}
      {selectedChat && (
        <>
          <div className="p-3 border-b border-accent/30 flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedChat(null)} className="text-foreground">
              ←
            </Button>
            <Avatar className="w-8 h-8 border border-primary/30">
              <AvatarImage src={`/placeholder-32px.png?height=32&width=32`} />
              <AvatarFallback className="bg-accent text-accent-foreground text-xs">SC</AvatarFallback>
            </Avatar>
            <p className="font-semibold text-sm text-foreground">Sarah Chen</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                <p className="text-sm text-foreground">Hey! Are you going to the Tech Mixer?</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[70%]">
                <p className="text-sm">Yes! Looking forward to it 🚀</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-accent/30">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1 bg-muted border-accent/20 text-foreground" />
              <Button size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}
