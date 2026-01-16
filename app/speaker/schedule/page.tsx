"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Video,
  Mic,
  Coffee,
  Car,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const scheduleItems = [
  {
    time: "07:00",
    title: "Breakfast at Hotel",
    type: "personal",
    duration: "1 hr",
    location: "Presidential Suite",
    icon: Coffee,
  },
  {
    time: "08:30",
    title: "Transport to Venue",
    type: "transport",
    duration: "30 min",
    location: "Hotel Lobby",
    icon: Car,
    notes: "VIP motorcade arranged",
  },
  {
    time: "09:00",
    title: "Opening Ceremony - Keynote Address",
    type: "session",
    duration: "90 min",
    location: "Grand Ballroom",
    icon: Mic,
    attendees: 1856,
    status: "confirmed",
    isLive: true,
  },
  {
    time: "10:30",
    title: "Coffee Break & Networking",
    type: "break",
    duration: "30 min",
    location: "VIP Lounge",
    icon: Coffee,
  },
  {
    time: "11:00",
    title: "Bilateral Meeting - Ghana Delegation",
    type: "meeting",
    duration: "45 min",
    location: "Meeting Room A",
    icon: Users,
    attendees: 8,
  },
  {
    time: "12:00",
    title: "Press Interview - BBC Africa",
    type: "media",
    duration: "30 min",
    location: "Media Center",
    icon: Video,
  },
  {
    time: "12:30",
    title: "VIP Lunch",
    type: "personal",
    duration: "1.5 hrs",
    location: "Executive Dining",
    icon: Coffee,
  },
  {
    time: "14:00",
    title: "Panel: Women in Climate Leadership",
    type: "session",
    duration: "90 min",
    location: "Hall A",
    icon: Mic,
    attendees: 423,
    status: "pending_materials",
  },
]

const days = [
  { date: "April 12", day: "Sat", events: 8 },
  { date: "April 13", day: "Sun", events: 6 },
  { date: "April 14", day: "Mon", events: 5 },
]

export default function SpeakerSchedulePage() {
  const [selectedDay, setSelectedDay] = useState(0)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "session":
        return "bg-primary/10 text-primary border-primary/30"
      case "meeting":
        return "bg-blue-500/10 text-blue-500 border-blue-500/30"
      case "media":
        return "bg-pink-500/10 text-pink-500 border-pink-500/30"
      case "transport":
        return "bg-amber-500/10 text-amber-500 border-amber-500/30"
      case "break":
      case "personal":
        return "bg-gray-500/10 text-gray-500 border-gray-500/30"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Schedule</h1>
          <p className="text-muted-foreground">Your complete summit itinerary</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <FileText className="w-4 h-4" />
            Export PDF
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </Button>
        </div>
      </div>

      {/* Day Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-2">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDay(i)}
                  className={cn(
                    "px-6 py-3 rounded-xl text-center transition-all",
                    selectedDay === i ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted hover:bg-muted/80",
                  )}
                >
                  <p className="font-bold text-lg">{day.day}</p>
                  <p className="text-sm opacity-80">{day.date}</p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {day.events} events
                  </Badge>
                </button>
              ))}
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[88px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-4">
          {scheduleItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4"
            >
              {/* Time */}
              <div className="w-20 text-right shrink-0">
                <span className="font-mono text-sm font-medium">{item.time}</span>
              </div>

              {/* Dot */}
              <div className="relative">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 bg-background z-10 relative",
                    item.isLive ? "border-red-500 bg-red-500" : "border-primary",
                  )}
                >
                  {item.isLive && <span className="absolute inset-0 rounded-full bg-red-500 animate-ping" />}
                </div>
              </div>

              {/* Content */}
              <Card className={cn("flex-1", item.isLive && "ring-2 ring-red-500")}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={cn("p-3 rounded-xl", getTypeColor(item.type))}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          {item.isLive && (
                            <Badge className="bg-red-500 text-white animate-pulse">
                              <span className="w-2 h-2 rounded-full bg-white mr-1" />
                              LIVE NOW
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </span>
                          {item.attendees && (
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {item.attendees.toLocaleString()} attendees
                            </span>
                          )}
                        </div>
                        {item.notes && <p className="text-sm text-muted-foreground mt-2 italic">{item.notes}</p>}
                      </div>
                    </div>

                    {item.type === "session" && (
                      <div className="flex items-center gap-2">
                        {item.status === "confirmed" ? (
                          <Badge className="bg-emerald-500/10 text-emerald-500 gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Ready
                          </Badge>
                        ) : (
                          <Badge className="bg-amber-500/10 text-amber-500 gap-1">
                            <AlertCircle className="w-3 h-3" />
                            Materials Needed
                          </Badge>
                        )}
                        <Button size="sm" className="gap-2">
                          <Video className="w-4 h-4" />
                          {item.isLive ? "Join Now" : "Prepare"}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
