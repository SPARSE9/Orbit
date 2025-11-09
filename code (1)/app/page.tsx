"use client"

import { useState, useEffect } from "react"
import { ExplorePage } from "@/components/explore-page"
import { Navigation } from "@/components/navigation"
import { OrbitBot } from "@/components/orbit-bot"
import { Dashboard } from "@/components/dashboard"
import { ProfileView } from "@/components/profile-view"
import { NotificationsView } from "@/components/notifications-view"
import { ChatWidget } from "@/components/chat-widget"
import { CelebrationOverlay } from "@/components/celebration-overlay"
import { EventPage } from "@/components/event-page"
import { UserProfilePage } from "@/components/user-profile-page"
import { MyFriendsPage } from "@/components/my-friends-page"
import { SurpriseDayPage } from "@/components/surprise-day-page"
import RequireAuth from "@/components/require-auth"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/lib/firebaseConfig"

 

export default function HomePage() {
  const [currentView, setCurrentView] = useState<
    | "explore"
    | "chat"
    | "dashboard"
    | "profile"
    | "notifications"
    | "event"
    | "userProfile"
    | "myFriends"
    | "surpriseDay"
  >("explore")
  const [showBot, setShowBot] = useState(false)
  const [showChatWidget, setShowChatWidget] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [connectedFriends, setConnectedFriends] = useState<string[]>([])
  const [notifications, setNotifications] = useState<string[]>([])
  const [eventsById, setEventsById] = useState<Record<string, any>>({})
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await fetch("/api/events")
        const data = await res.json()
        const list: any[] = Array.isArray(data?.events) ? data.events : []
        const map: Record<string, any> = {}
        for (const e of list) if (e && e.id) map[e.id] = e
        if (!cancelled) setEventsById(map)
      } catch {
        if (!cancelled) setEventsById({})
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!auth) return
    const unsub = onAuthStateChanged(auth, (u) => setUserEmail(u?.email ?? null))
    return () => unsub()
  }, [])

  const handleJoinEvent = (eventId: string) => {
    setShowCelebration(true)
    setTimeout(() => {
      setShowCelebration(false)
      setSelectedEventId(eventId)
      setCurrentView("event")
    }, 2000)
  }

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId)
    setCurrentView("userProfile")
  }

  const handleStartChat = (friendId: string) => {
    if (!connectedFriends.includes(friendId)) {
      setConnectedFriends([...connectedFriends, friendId])
    }
    setShowChatWidget(true)
  }

  const handleAddNotification = (message: string) => {
    setNotifications([message, ...notifications])
  }

  return (
    <RequireAuth>
      <main className="min-h-screen bg-background">
        <div className="flex items-center justify-between p-2">
          <div className="text-sm text-muted-foreground">{userEmail ?? ""}</div>
          <button
            onClick={() => auth && signOut(auth)}
            className="px-3 py-1 rounded border border-input text-sm hover:bg-accent"
          >
            Sign out
          </button>
        </div>
      <Navigation
        currentView={currentView}
        onViewChange={(view) => {
          if (view === "chat") {
            setShowChatWidget(!showChatWidget)
          } else {
            setCurrentView(view)
          }
        }}
        onBotToggle={() => setShowBot(!showBot)}
      />

      {currentView === "explore" && <ExplorePage onJoinEvent={handleJoinEvent} />}
      {currentView === "dashboard" && <Dashboard />}
      {currentView === "profile" && <ProfileView />}
      {currentView === "notifications" && <NotificationsView />}
      {currentView === "surpriseDay" && (
        <SurpriseDayPage onBack={() => setCurrentView("explore")} onNotify={handleAddNotification} />
      )}
      {currentView === "event" && selectedEventId && eventsById[selectedEventId] && (
        <EventPage
          event={eventsById[selectedEventId]}
          onBack={() => setCurrentView("explore")}
          onViewProfile={handleViewProfile}
        />
      )}
      {currentView === "userProfile" && selectedUserId && (
        <UserProfilePage attendeeId={selectedUserId} onBack={() => setCurrentView("event")} />
      )}
      {currentView === "myFriends" && (
        <MyFriendsPage
          onBack={() => setCurrentView("explore")}
          onViewProfile={handleViewProfile}
          onStartChat={handleStartChat}
        />
      )}

      {showChatWidget && <ChatWidget onClose={() => setShowChatWidget(false)} connectedFriends={connectedFriends} />}

      <OrbitBot isOpen={showBot} onToggle={() => setShowBot(!showBot)} />

      {showCelebration && <CelebrationOverlay onComplete={() => setShowCelebration(false)} />}
    </main>
    </RequireAuth>
  )
}
 
