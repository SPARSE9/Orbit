"use client"

import { useState } from "react"
import { Home, MessageCircle, Bell, Settings, LogOut, Eye, Bookmark, Star, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavigationProps {
  currentView:
    | "explore"
    | "chat"
    | "dashboard"
    | "profile"
    | "notifications"
    | "myFriends"
    | "surpriseDay"
    | "event"
    | "userProfile"
  onViewChange: (
    view:
      | "explore"
      | "chat"
      | "dashboard"
      | "profile"
      | "notifications"
      | "myFriends"
      | "surpriseDay"
      | "event"
      | "userProfile",
  ) => void
  onBotToggle: () => void
}

export function Navigation({ currentView, onViewChange, onBotToggle }: NavigationProps) {
  const [language, setLanguage] = useState("en")

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-accent/30">
      <div className="mx-auto px-0 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/orbit-logo-nav.png"
            alt="Orbit Logo"
            width={64}
            height={64}
            className="mix-blend-lighten brightness-110 ml-0"
          />
        </div>

        <div className="flex items-center gap-2 justify-center">
          <Button
            variant={currentView === "explore" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("explore")}
            className="gap-2 text-foreground hover:text-primary"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Explore</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewChange("chat")}
            className="gap-2 text-foreground hover:text-primary"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Chats</span>
          </Button>
          <Button
            variant={currentView === "notifications" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("notifications")}
            className="gap-2 text-foreground hover:text-primary relative"
          >
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full" />
          </Button>
          <Button
            variant={currentView === "myFriends" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("myFriends")}
            className="gap-2 text-foreground hover:text-primary"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">My Friends</span>
          </Button>
          <Button
            variant={currentView === "surpriseDay" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange("surpriseDay")}
            className="gap-2 text-foreground hover:text-primary"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Surprise Day</span>
          </Button>
        </div>

        <div className="flex items-center gap-2 mr-2">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full">
                <div className="w-6 h-6 rounded-full overflow-hidden border border-primary/50">
                  <span className="text-xs">🇬🇧</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-accent/30">
              <DropdownMenuItem onClick={() => setLanguage("en")} className="text-foreground">
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("es")} className="text-foreground">
                🇪🇸 Español
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("fr")} className="text-foreground">
                🇫🇷 Français
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="w-8 h-8 border-2 border-primary">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-accent text-accent-foreground">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-card border-accent/30">
              <DropdownMenuItem
                onClick={() => onViewChange("dashboard")}
                className="text-foreground hover:text-primary cursor-pointer"
              >
                <Eye className="w-4 h-4 mr-2" />
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Settings className="w-4 h-4 mr-2" />
                Appearance
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Bookmark className="w-4 h-4 mr-2" />
                Saved
              </DropdownMenuItem>
              <DropdownMenuItem className="text-foreground hover:text-primary cursor-pointer">
                <Star className="w-4 h-4 mr-2" />
                Reviews
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-destructive hover:text-destructive cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
