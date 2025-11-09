"use client"

import { useState } from "react"
import { Calendar, Clock, Sparkles, CheckCircle, ArrowLeft, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SurpriseDayPageProps {
  onBack: () => void
  onNotify: (message: string) => void
}

export function SurpriseDayPage({ onBack, onNotify }: SurpriseDayPageProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledEvents, setScheduledEvents] = useState<any[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const [showDateDropdown, setShowDateDropdown] = useState(false)

  const generateDateOptions = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 90; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, "0")
      const day = String(date.getDate()).padStart(2, "0")
      const dateStr = `${year}-${month}-${day}`
      const displayStr = date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      dates.push({ value: dateStr, label: displayStr })
    }
    return dates
  }

  const dateOptions = generateDateOptions()

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourStr = hour.toString().padStart(2, "0")
        const minuteStr = minute.toString().padStart(2, "0")
        slots.push(`${hourStr}:${minuteStr}`)
      }
    }
    return slots
  }

  const timeSlots = generateTimeSlots()

  const handleScheduleSurprise = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time")
      return
    }

    const randomEvents = [
      "Tech Startup Mixer",
      "Indie Music Festival",
      "Food Truck Rally",
      "Game Dev Meetup",
      "Art Gallery Opening",
      "Jazz Night",
      "VR Gaming Experience",
    ]
    const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)]

    const newSurpriseEvent = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      eventName: randomEvent,
      revealed: false,
    }

    setScheduledEvents([...scheduledEvents, newSurpriseEvent])
    setShowConfirmation(true)

    setTimeout(() => {
      onNotify(`Surprise event scheduled for ${selectedDate} at ${selectedTime} and saved to Google Calendar!`)
      setShowConfirmation(false)
      setIsScheduled(true)
    }, 1500)

    setSelectedDate("")
    setSelectedTime("")
  }

  const checkIfEventRevealed = (eventDate: string) => {
    const today = new Date()
    const eventDateObj = new Date(eventDate)
    return eventDateObj <= today
  }

  return (
    <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto min-h-screen bg-background">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-foreground hover:text-primary">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-secondary" />
              Surprise Day
            </h1>
            <p className="text-muted-foreground mt-1">Feeling spontaneous? Let us pick a surprise event for you!</p>
          </div>
        </div>

        {/* Schedule Section */}
        <Card className="bg-card border-2 border-primary/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Schedule Your Surprise
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Pick a day and time when you're free, and we'll schedule a mystery event for you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 relative">
                <Label htmlFor="date" className="text-foreground">
                  Date
                </Label>
                <div className="relative">
                  <Input
                    id="date"
                    type="text"
                    value={selectedDate ? dateOptions.find((d) => d.value === selectedDate)?.label || selectedDate : ""}
                    onClick={() => setShowDateDropdown(true)}
                    readOnly
                    className="bg-background border-accent/30 text-foreground cursor-pointer"
                    placeholder="Select a date"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  {showDateDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowDateDropdown(false)} />
                      <div className="absolute z-20 mt-1 w-full bg-card border-2 border-primary/30 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                        {dateOptions.map((date) => (
                          <button
                            key={date.value}
                            type="button"
                            onClick={() => {
                              setSelectedDate(date.value)
                              setShowDateDropdown(false)
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-primary/20 text-foreground transition-colors flex items-center gap-2"
                          >
                            <Calendar className="w-4 h-4 text-primary" />
                            {date.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2 relative">
                <Label htmlFor="time" className="text-foreground">
                  Time
                </Label>
                <div className="relative">
                  <Input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    onFocus={() => setShowTimeDropdown(true)}
                    className="bg-background border-accent/30 text-foreground"
                    placeholder="Select or type time"
                  />
                  {showTimeDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowTimeDropdown(false)} />
                      <div className="absolute z-20 mt-1 w-full bg-card border-2 border-primary/30 rounded-lg shadow-xl max-h-64 overflow-y-auto">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => {
                              setSelectedTime(time)
                              setShowTimeDropdown(false)
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-primary/20 text-foreground transition-colors flex items-center gap-2"
                          >
                            <Clock className="w-4 h-4 text-primary" />
                            {time}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={handleScheduleSurprise}
              className="w-full bg-gradient-to-r from-primary to-secondary text-background font-semibold"
              disabled={!selectedDate || !selectedTime}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Schedule Surprise Event
            </Button>

            {showConfirmation && (
              <div className="flex items-center justify-center gap-2 text-primary animate-pulse">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Saving to Google Calendar...</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Scheduled Events */}
        {scheduledEvents.length > 0 && (
          <Card className="bg-card border-accent/30">
            <CardHeader>
              <CardTitle className="text-foreground">Your Scheduled Surprises</CardTitle>
              <CardDescription className="text-muted-foreground">
                Events will be revealed on the scheduled day
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {scheduledEvents.map((event) => {
                  const isRevealed = checkIfEventRevealed(event.date)
                  return (
                    <Card
                      key={event.id}
                      className="p-4 bg-background border-2 border-primary/20 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-primary">
                            <Calendar className="w-4 h-4" />
                            <span className="font-semibold">{event.date}</span>
                            <Clock className="w-4 h-4 ml-2" />
                            <span className="font-semibold">{event.time}</span>
                          </div>
                          <div className="text-foreground">
                            {isRevealed ? (
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-secondary">{event.eventName}</span>
                                <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                                  REVEALED
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground italic">Mystery Event - To be revealed</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                          Synced to Calendar
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-accent/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">How Surprise Day Works</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Pick a date and time when you're available</li>
                  <li>• We'll randomly select an exciting event for you</li>
                  <li>• The event details remain hidden until the scheduled day</li>
                  <li>• Event automatically syncs to your Google Calendar</li>
                  <li>• You'll receive a notification when the event is saved</li>
                  <li>• On the day of the event, the surprise will be revealed!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
