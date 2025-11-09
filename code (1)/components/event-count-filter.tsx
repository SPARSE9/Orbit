"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

interface EventCountFilterProps {
  maxEvents: number
  onEventCountChange: (count: number) => void
}

export function EventCountFilter({ maxEvents, onEventCountChange }: EventCountFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [eventCount, setEventCount] = useState(maxEvents)

  const handleCountChange = (value: number[]) => {
    const count = value[0]
    setEventCount(count)
    onEventCountChange(count)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="bg-card/80 backdrop-blur-sm border border-accent/30 hover:bg-muted hover:border-primary/50 transition-all"
      >
        <SlidersHorizontal className="w-5 h-5 text-primary" />
      </Button>

      {isOpen && (
        <Card className="absolute top-12 left-0 w-72 bg-card/90 backdrop-blur-md border-accent/30 p-4 shadow-2xl animate-in slide-in-from-left z-[70]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm text-foreground">Event Visibility</h3>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              size="icon"
              variant="ghost"
              className="h-6 w-6 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Showing events:</span>
              <span className="text-sm font-bold text-primary">{eventCount} / 20</span>
            </div>

            <Slider
              value={[eventCount]}
              onValueChange={handleCountChange}
              min={1}
              max={20}
              step={1}
              className="w-full"
            />

            <p className="text-xs text-muted-foreground">
              Drag the slider to filter how many events appear in the orbital map
            </p>
          </div>
        </Card>
      )}
    </>
  )
}
