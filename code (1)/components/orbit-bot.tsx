"use client"

import { useState } from "react"
import { X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  text: string
  sender: "bot" | "user"
}

export function OrbitBot({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey, explorer 🚀 What are you looking for today — new events, people, or chaos?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])

    const responses = [
      "Ooh, spicy choice! 🌶️ I found 3 events that match your vibe. Want to see them on the map? 🗺️✨",
      "Interesting... *adjusts cosmic goggles* 👀 I'm picking up some strong signals in the tech sector. Should I beam them over?",
      "LOL okay, chaos mode activated 🎲 How about a random event that's totally NOT your usual scene? Live a little!",
      "Alright, alright, I see you 👁️ Found someone with matching interests who's also going to the Tech Mixer. Want an intro? 😏",
      "You know what? I'm getting déjà vu... didn't you ask this yesterday? 🤔 Anyway, here are some fresh picks for you!",
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    setInput("")

    // Simulate bot response with personality
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
      }
      setMessages((prev) => [...prev, botMessage])
    }, 800)
  }

  if (!isOpen) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={onToggle}
          className="w-16 h-16 rounded-full shadow-2xl bg-gradient-to-br from-primary via-accent to-secondary hover:scale-110 transition-transform"
          size="icon"
        >
          <Sparkles className="w-7 h-7 animate-pulse" />
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[500px] bg-card rounded-2xl shadow-2xl border-2 border-primary/30 flex flex-col z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center animate-pulse">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <div>
            <p className="font-bold text-base text-foreground">OrbitBot</p>
            <p className="text-xs text-muted-foreground">Your chaos coordinator 🎭</p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gradient-to-br from-muted to-muted/50 text-foreground border border-accent/20"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex gap-2">
          <Input
            placeholder="Tell me what you're after..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-muted border-accent/20"
          />
          <Button size="icon" onClick={handleSend} className="bg-primary hover:bg-primary/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Ask about events, people, or let chaos decide 🎲
        </p>
      </div>
    </motion.div>
  )
}
