"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, MapPin, Users, Filter, Search, ChevronRight, Star, Bookmark, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const days = [
  { id: "day1", date: "Jan 15", label: "Opening & Heads of State", dayNum: 1 },
  { id: "day2", date: "Jan 16", label: "Ministerial Day", dayNum: 2 },
  { id: "day3", date: "Jan 17", label: "Investment Day", dayNum: 3 },
  { id: "day4", date: "Jan 18", label: "Implementation & Closing", dayNum: 4 },
]

const sessionTypes = [
  { id: "all", label: "All Sessions" },
  { id: "plenary", label: "Plenary" },
  { id: "ministerial", label: "Ministerial" },
  { id: "breakout", label: "Breakout" },
  { id: "workshop", label: "Workshop" },
  { id: "networking", label: "Networking" },
]

const tracks = [
  { id: "all", label: "All Tracks" },
  { id: "energy", label: "Energy & Power" },
  { id: "transport", label: "Transport" },
  { id: "agriculture", label: "Agriculture" },
  { id: "digital", label: "Digital" },
  { id: "finance", label: "Finance" },
]

const sessions = [
  {
    id: "sess_001",
    title: "Opening Ceremony: Building Prosperity Across West Africa",
    description:
      "The official opening featuring keynote addresses from heads of state and the unveiling of the regional economic development roadmap.",
    type: "plenary",
    track: "general",
    day: "day1",
    time: "09:00 - 11:00",
    venue: "Main Plenary Hall",
    capacity: 2000,
    registered: 1847,
    isLive: true,
    isFeatured: true,
    speakers: [
      { name: "H.E. Bola Ahmed Tinubu", role: "President of Nigeria", image: "/african-president-formal-portrait.jpg" },
      { name: "Dr. Omar Alieu Touray", role: "ECOWAS Commission President", image: "/african-diplomat-formal-portrait.jpg" },
      { name: "Dr. Akinwumi Adesina", role: "AfDB President", image: "/african-finance-leader-portrait.jpg" },
    ],
  },
  {
    id: "sess_002",
    title: "Ministerial Roundtable: National Economic Development Plans",
    description:
      "Ministers from ECOWAS member states present their national economic development priorities and enabling policy frameworks.",
    type: "ministerial",
    track: "general",
    day: "day1",
    time: "11:30 - 13:00",
    venue: "Conference Hall A",
    capacity: 500,
    registered: 423,
    isLive: false,
    isFeatured: false,
    speakers: [
      { name: "Hon. Wale Edun", role: "Finance Minister, Nigeria", image: "/african-minister-formal-portrait.jpg" },
      { name: "Hon. Mohammed Amin Adam", role: "Finance Minister, Ghana", image: "/african-minister-formal-portrait-suit.jpg" },
    ],
  },
  {
    id: "sess_003",
    title: "Infrastructure Investment Accelerator",
    description:
      "Interactive workshop connecting infrastructure project developers with investors, featuring live project pitches and matchmaking.",
    type: "workshop",
    track: "transport",
    day: "day1",
    time: "14:00 - 16:00",
    venue: "Workshop Room 1",
    capacity: 200,
    registered: 187,
    isLive: false,
    isFeatured: true,
    speakers: [
      { name: "Dr. Rabiu Olowo", role: "Infrastructure Expert", image: "/african-business-executive-portrait.jpg" },
      { name: "Ms. Amina Oyagbola", role: "Investment Director", image: "/african-woman-business-leader-portrait.jpg" },
    ],
  },
  {
    id: "sess_004",
    title: "West African Power Pool: Investment Roadmap",
    description:
      "Presentation of the updated WAPP investment plan and discussion of priority transmission interconnection projects.",
    type: "breakout",
    track: "energy",
    day: "day2",
    time: "09:00 - 10:30",
    venue: "Conference Hall B",
    capacity: 300,
    registered: 256,
    isLive: false,
    isFeatured: false,
    speakers: [{ name: "Eng. Siengui Ki", role: "Secretary General, WAPP", image: "/african-engineer-professional-portrait.jpg" }],
  },
  {
    id: "sess_005",
    title: "Agribusiness & Food Security: Scaling What Works",
    description: "Showcase of proven agribusiness solutions and discussion of scaling strategies across the region.",
    type: "breakout",
    track: "agriculture",
    day: "day2",
    time: "11:00 - 12:30",
    venue: "Conference Hall C",
    capacity: 250,
    registered: 198,
    isLive: false,
    isFeatured: false,
    speakers: [
      { name: "Dr. Kanayo Nwanze", role: "Former IFAD President", image: "/placeholder.svg?height=80&width=80" },
      { name: "Ms. Ndidi Nwuneli", role: "Founder, Sahel Consulting", image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "sess_006",
    title: "Digital Economy: Fintech & Innovation",
    description:
      "Exploring the rise of fintech and digital innovation across West Africa, featuring success stories and investment opportunities.",
    type: "breakout",
    track: "digital",
    day: "day3",
    time: "09:00 - 10:30",
    venue: "Innovation Hub",
    capacity: 200,
    registered: 200,
    isLive: false,
    isFeatured: true,
    speakers: [
      { name: "Shola Akinlade", role: "CEO, Paystack", image: "/placeholder.svg?height=80&width=80" },
      { name: "Olugbenga Agboola", role: "CEO, Flutterwave", image: "/placeholder.svg?height=80&width=80" },
    ],
  },
  {
    id: "sess_007",
    title: "Investor-Project Matchmaking Session",
    description:
      "Structured networking session connecting vetted investors with investment-ready projects across all sectors.",
    type: "networking",
    track: "general",
    day: "day3",
    time: "14:00 - 17:00",
    venue: "Dealroom Pavilion",
    capacity: 300,
    registered: 289,
    isLive: false,
    isFeatured: true,
    speakers: [],
  },
  {
    id: "sess_008",
    title: "Closing Ceremony: Deals & Commitments Announcement",
    description:
      "Official closing featuring announcement of major deals, commitments, and the Abuja Declaration on Economic Development.",
    type: "plenary",
    track: "general",
    day: "day4",
    time: "15:00 - 17:00",
    venue: "Main Plenary Hall",
    capacity: 2000,
    registered: 1654,
    isLive: false,
    isFeatured: true,
    speakers: [
      { name: "H.E. Bola Ahmed Tinubu", role: "President of Nigeria", image: "/african-president-formal-portrait.jpg" },
      { name: "Dr. Omar Alieu Touray", role: "ECOWAS Commission President", image: "/african-diplomat-formal-portrait.jpg" },
    ],
  },
]

const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  plenary: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/30" },
  ministerial: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/30" },
  breakout: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/30" },
  workshop: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400", border: "border-green-500/30" },
  networking: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400", border: "border-pink-500/30" },
}

export default function AgendaPage() {
  const [selectedDay, setSelectedDay] = useState("day1")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedTrack, setSelectedTrack] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [savedSessions, setSavedSessions] = useState<string[]>([])

  const filteredSessions = sessions.filter((session) => {
    const matchesDay = session.day === selectedDay
    const matchesType = selectedType === "all" || session.type === selectedType
    const matchesTrack = selectedTrack === "all" || session.track === selectedTrack || session.track === "general"
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesDay && matchesType && matchesTrack && matchesSearch
  })

  const toggleSaved = (sessionId: string) => {
    setSavedSessions((prev) =>
      prev.includes(sessionId) ? prev.filter((id) => id !== sessionId) : [...prev, sessionId],
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              January 15-18, 2026
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Summit <span className="gradient-text">Agenda</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four days of high-impact sessions, workshops, and networking opportunities designed to drive economic
              development across West Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Day Selector */}
      <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 py-4 overflow-x-auto scrollbar-hide">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={cn(
                  "flex-shrink-0 px-6 py-4 rounded-2xl transition-all duration-300 text-left",
                  selectedDay === day.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-muted hover:bg-muted/80",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-bold",
                      selectedDay === day.id ? "bg-white/20" : "bg-primary/10 text-primary",
                    )}
                  >
                    {day.dayNum}
                  </div>
                  <div>
                    <p className="font-bold">{day.date}</p>
                    <p
                      className={cn(
                        "text-sm",
                        selectedDay === day.id ? "text-primary-foreground/80" : "text-muted-foreground",
                      )}
                    >
                      {day.label}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters & Sessions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-80 flex-shrink-0"
            >
              <div className="sticky top-48 space-y-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search sessions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-xl bg-muted border-0"
                  />
                </div>

                {/* Session Types */}
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Filter className="w-5 h-5 text-primary" />
                    Session Type
                  </h3>
                  <div className="space-y-2">
                    {sessionTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium",
                          selectedType === type.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tracks */}
                <div className="bg-card rounded-2xl border border-border p-5">
                  <h3 className="font-bold mb-4">Investment Track</h3>
                  <div className="space-y-2">
                    {tracks.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => setSelectedTrack(track.id)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-xl transition-all text-sm font-medium",
                          selectedTrack === track.id ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                        )}
                      >
                        {track.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Sessions Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-bold text-foreground">{filteredSessions.length}</span> sessions
                </p>
              </div>

              <AnimatePresence mode="popLayout">
                <motion.div className="space-y-4">
                  {filteredSessions.map((session, index) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={`/agenda/${session.id}`}>
                        <div
                          className={cn(
                            "group relative bg-card rounded-3xl border border-border/50 p-6 hover:border-primary/30 hover:shadow-xl transition-all duration-300",
                            session.isFeatured && "ring-2 ring-primary/20",
                          )}
                        >
                          {/* Live indicator */}
                          {session.isLive && (
                            <div className="absolute -top-3 right-6 px-4 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-2 animate-pulse">
                              <span className="w-2 h-2 bg-white rounded-full" />
                              LIVE NOW
                            </div>
                          )}

                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Time Column */}
                            <div className="lg:w-32 flex-shrink-0">
                              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                                <Clock className="w-5 h-5" />
                                {session.time.split(" - ")[0]}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{session.time.split(" - ")[1]}</p>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span
                                  className={cn(
                                    "px-3 py-1 rounded-full text-xs font-medium capitalize",
                                    typeColors[session.type]?.bg,
                                    typeColors[session.type]?.text,
                                  )}
                                >
                                  {session.type}
                                </span>
                                {session.isFeatured && (
                                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary flex items-center gap-1">
                                    <Star className="w-3 h-3" /> Featured
                                  </span>
                                )}
                              </div>

                              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                {session.title}
                              </h3>
                              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{session.description}</p>

                              {/* Speakers */}
                              {session.speakers.length > 0 && (
                                <div className="flex items-center gap-3 mb-4">
                                  <div className="flex -space-x-2">
                                    {session.speakers.slice(0, 3).map((speaker, i) => (
                                      <div
                                        key={i}
                                        className="relative w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                                      >
                                        <Image
                                          src={speaker.image || "/placeholder.svg"}
                                          alt={speaker.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {session.speakers.map((s) => s.name).join(", ")}
                                  </p>
                                </div>
                              )}

                              {/* Meta */}
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {session.venue}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {session.registered}/{session.capacity}
                                </span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex lg:flex-col items-center gap-2 lg:w-auto">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full"
                                onClick={(e) => {
                                  e.preventDefault()
                                  toggleSaved(session.id)
                                }}
                              >
                                <Bookmark
                                  className={cn(
                                    "w-5 h-5",
                                    savedSessions.includes(session.id) && "fill-primary text-primary",
                                  )}
                                />
                              </Button>
                              <Button variant="ghost" size="icon" className="rounded-full">
                                <Share2 className="w-5 h-5" />
                              </Button>
                              <div className="hidden lg:flex w-10 h-10 rounded-full bg-primary/10 items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                <ChevronRight className="w-5 h-5" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredSessions.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No sessions found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
