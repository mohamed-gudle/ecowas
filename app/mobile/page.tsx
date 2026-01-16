"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  Calendar,
  MapPin,
  User,
  Bell,
  QrCode,
  Search,
  Clock,
  Users,
  ChevronRight,
  Navigation,
  MessageSquare,
  Star,
  Wifi,
  WifiOff,
  BatteryMedium,
  Signal,
  Camera,
  Share2,
  Download,
  ExternalLink,
  Settings,
  HelpCircle,
  LogOut,
  FileText,
  CheckCircle2,
  AlertCircle,
  Video,
  Coffee,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type TabId = "home" | "schedule" | "map" | "network" | "profile"

const upcomingSessions = [
  {
    id: "1",
    title: "Opening Ceremony: Climate Action for Africa",
    time: "09:00 - 10:30",
    venue: "Grand Ballroom",
    type: "Ceremony",
    isLive: true,
    isSaved: true,
  },
  {
    id: "2",
    title: "Renewable Energy Panel",
    time: "11:00 - 12:30",
    venue: "Hall A",
    type: "Panel",
    isLive: false,
    isSaved: true,
  },
  {
    id: "3",
    title: "Green Finance Workshop",
    time: "14:00 - 16:00",
    venue: "Workshop Room 1",
    type: "Workshop",
    isLive: false,
    isSaved: false,
  },
]

const notifications = [
  { id: "1", type: "session", message: "Opening Ceremony starts in 30 minutes", time: "Just now", unread: true },
  { id: "2", type: "networking", message: "Sarah Chen wants to connect", time: "5m ago", unread: true },
  { id: "3", type: "alert", message: "Your meeting room has changed to Hall B", time: "15m ago", unread: false },
]

const networkSuggestions = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Investment Director",
    org: "Africa Infrastructure Fund",
    avatar: "/asian-businesswoman.jpg",
    matchScore: 92,
  },
  {
    id: "2",
    name: "Dr. Amadou Diallo",
    role: "Climate Policy Expert",
    org: "ECOWAS Commission",
    avatar: "/african-man-professional.png",
    matchScore: 88,
  },
  {
    id: "3",
    name: "Fatou Diallo",
    role: "Renewable Energy Consultant",
    org: "Solar Africa Partners",
    avatar: "/african-woman-professional.jpg",
    matchScore: 85,
  },
]

const venues = [
  { id: "1", name: "Grand Ballroom", floor: "1", status: "live", currentSession: "Opening Ceremony" },
  { id: "2", name: "Hall A", floor: "1", status: "upcoming", currentSession: "Renewable Energy Panel" },
  { id: "3", name: "VIP Lounge", floor: "2", status: "available", currentSession: null },
  { id: "4", name: "Workshop Room 1", floor: "2", status: "upcoming", currentSession: "Green Finance Workshop" },
]

const quickActions = [
  { icon: QrCode, label: "My Badge", href: "#badge" },
  { icon: Navigation, label: "Navigate", href: "#navigate" },
  { icon: Coffee, label: "F&B", href: "#food" },
  { icon: HelpCircle, label: "Help Desk", href: "#help" },
]

export default function MobileAppExperience() {
  const [activeTab, setActiveTab] = useState<TabId>("home")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showBadge, setShowBadge] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [isOffline, setIsOffline] = useState(false)

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto border-x relative overflow-hidden">
      {/* Status Bar Simulation */}
      <div className="h-6 bg-foreground/5 flex items-center justify-between px-4 text-xs text-muted-foreground">
        <span>09:41</span>
        <div className="flex items-center gap-2">
          <Signal className="w-3 h-3" />
          {isOffline ? <WifiOff className="w-3 h-3 text-amber-500" /> : <Wifi className="w-3 h-3" />}
          <BatteryMedium className="w-4 h-4" />
        </div>
      </div>

      {/* Offline Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-amber-500 text-amber-950 text-center py-1 text-xs font-medium"
          >
            Offline Mode - Limited functionality available
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-6 z-40 bg-background/95 backdrop-blur border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2 border-primary">
              <AvatarImage src="/african-businessman-portrait.jpg" />
              <AvatarFallback>KA</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">Good Morning, Kwame</p>
              <p className="text-xs text-muted-foreground">Day 1 of Summit</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(true)}>
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent text-[10px] text-white flex items-center justify-center">
                2
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setShowBadge(true)}>
              <QrCode className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          {/* Home Tab */}
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 space-y-6"
            >
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search sessions, speakers, venues..." className="pl-10 bg-muted/50 border-0" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setShowQRScanner(true)}
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <action.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs font-medium">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Current/Next Session Card */}
              <Card className="overflow-hidden bg-gradient-to-br from-primary to-accent text-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-white/20 text-white animate-pulse gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      LIVE NOW
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Opening Ceremony</h3>
                  <p className="text-white/80 text-sm mb-3">Climate Action for Africa's Future</p>
                  <div className="flex items-center gap-4 text-sm text-white/70 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      09:00 - 10:30
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Grand Ballroom
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-white text-primary hover:bg-white/90 flex-1">
                      <Video className="w-4 h-4 mr-2" />
                      Join Stream
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Navigation className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* My Schedule Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">My Schedule Today</h3>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => setActiveTab("schedule")}>
                    View All
                  </Button>
                </div>
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 3).map((session) => (
                    <Card key={session.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div
                          className={cn(
                            "w-1 h-12 rounded-full shrink-0",
                            session.isLive ? "bg-red-500 animate-pulse" : "bg-primary",
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-1">{session.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{session.time}</span>
                            <span>•</span>
                            <span>{session.venue}</span>
                          </div>
                        </div>
                        {session.isSaved ? (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        ) : (
                          <Star className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Networking Suggestions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">People to Meet</h3>
                  <Button variant="ghost" size="sm" className="text-primary" onClick={() => setActiveTab("network")}>
                    View All
                  </Button>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                  {networkSuggestions.map((person) => (
                    <Card key={person.id} className="shrink-0 w-40">
                      <CardContent className="p-3 text-center">
                        <Avatar className="w-14 h-14 mx-auto mb-2">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <p className="font-medium text-sm line-clamp-1">{person.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{person.role}</p>
                        <Badge variant="secondary" className="mt-2 text-xs">
                          {person.matchScore}% Match
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 space-y-4"
            >
              <h2 className="text-xl font-bold">My Schedule</h2>

              {/* Date Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {["Fri 15", "Sat 16", "Sun 17", "Mon 18"].map((date, i) => (
                  <button
                    key={date}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium shrink-0 transition-colors",
                      i === 0 ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80",
                    )}
                  >
                    {date}
                  </button>
                ))}
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                {upcomingSessions.map((session, i) => (
                  <div key={session.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full",
                          session.isLive
                            ? "bg-red-500 animate-pulse"
                            : i === 0
                              ? "bg-primary"
                              : "bg-muted-foreground/30",
                        )}
                      />
                      {i < upcomingSessions.length - 1 && <div className="w-0.5 flex-1 bg-muted-foreground/20" />}
                    </div>
                    <Card className="flex-1 mb-3">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <Badge variant={session.isLive ? "destructive" : "secondary"} className="mb-2">
                              {session.isLive ? "Live Now" : session.type}
                            </Badge>
                            <h4 className="font-semibold">{session.title}</h4>
                          </div>
                          <button className={cn(session.isSaved ? "text-amber-500" : "text-muted-foreground")}>
                            <Star className={cn("w-5 h-5", session.isSaved && "fill-current")} />
                          </button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {session.venue}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Navigation className="w-4 h-4 mr-2" />
                            Navigate
                          </Button>
                          <Button size="sm" className="flex-1">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Q&A
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Map Tab */}
          {activeTab === "map" && (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 space-y-4"
            >
              <h2 className="text-xl font-bold">Venue Map</h2>

              {/* Map Placeholder */}
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4">
                  {venues.map((venue) => (
                    <button
                      key={venue.id}
                      className={cn(
                        "rounded-xl p-2 flex flex-col items-center justify-center text-center transition-all",
                        venue.status === "live"
                          ? "bg-red-500/20 border-2 border-red-500"
                          : venue.status === "upcoming"
                            ? "bg-primary/20 border border-primary"
                            : "bg-card border",
                      )}
                    >
                      <Building2 className="w-5 h-5 mb-1" />
                      <span className="text-xs font-medium">{venue.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Floor Selector */}
              <div className="flex gap-2 justify-center">
                {["Floor 1", "Floor 2", "Floor 3"].map((floor, i) => (
                  <button
                    key={floor}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium",
                      i === 0 ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {floor}
                  </button>
                ))}
              </div>

              {/* Venue List */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Nearby Venues</h3>
                {venues.map((venue) => (
                  <Card key={venue.id}>
                    <CardContent className="p-3 flex items-center gap-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          venue.status === "live"
                            ? "bg-red-500/10 text-red-500"
                            : venue.status === "upcoming"
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{venue.name}</p>
                        <p className="text-xs text-muted-foreground">{venue.currentSession || "Available"}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Network Tab */}
          {activeTab === "network" && (
            <motion.div
              key="network"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 space-y-4"
            >
              <h2 className="text-xl font-bold">Networking</h2>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search attendees..." className="pl-10" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Connections", value: "24" },
                  { label: "Pending", value: "5" },
                  { label: "Meetings", value: "3" },
                ].map((stat) => (
                  <Card key={stat.label}>
                    <CardContent className="p-3 text-center">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Suggestions */}
              <div>
                <h3 className="font-semibold mb-3">Suggested Connections</h3>
                <div className="space-y-3">
                  {networkSuggestions.map((person) => (
                    <Card key={person.id}>
                      <CardContent className="p-4 flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{person.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{person.name}</p>
                          <p className="text-sm text-muted-foreground">{person.role}</p>
                          <p className="text-xs text-muted-foreground">{person.org}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant="secondary">{person.matchScore}%</Badge>
                          <Button size="sm">Connect</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-4 space-y-6"
            >
              {/* Profile Header */}
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary">
                  <AvatarImage src="/african-businessman-portrait.jpg" />
                  <AvatarFallback>KA</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">Kwame Asante</h2>
                <p className="text-muted-foreground">Project Developer</p>
                <p className="text-sm text-muted-foreground">Solar Africa Partners</p>
                <div className="flex justify-center gap-2 mt-3">
                  <Badge className="bg-emerald-500/10 text-emerald-600">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="outline">VIP Access</Badge>
                </div>
              </div>

              {/* Badge Preview */}
              <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-2 text-primary" />
                  <p className="font-medium">Digital Badge</p>
                  <p className="text-sm text-muted-foreground">Tap to view or share</p>
                </CardContent>
              </Card>

              {/* Menu Items */}
              <div className="space-y-2">
                {[
                  { icon: User, label: "Edit Profile", href: "#" },
                  { icon: Calendar, label: "My Saved Sessions", href: "#" },
                  { icon: Users, label: "My Connections", href: "#", badge: "24" },
                  { icon: FileText, label: "My Documents", href: "#" },
                  { icon: Bell, label: "Notifications", href: "#" },
                  { icon: Settings, label: "Settings", href: "#" },
                  { icon: HelpCircle, label: "Help & Support", href: "#" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="flex-1 text-left font-medium">{item.label}</span>
                    {item.badge && <Badge variant="secondary">{item.badge}</Badge>}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}

                <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="flex-1 text-left font-medium">Sign Out</span>
                </button>
              </div>

              {/* Offline Toggle for Demo */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <div className="flex items-center gap-2">
                  {isOffline ? <WifiOff className="w-5 h-5 text-amber-500" /> : <Wifi className="w-5 h-5" />}
                  <span className="text-sm font-medium">Offline Mode</span>
                </div>
                <button
                  onClick={() => setIsOffline(!isOffline)}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    isOffline ? "bg-amber-500" : "bg-muted-foreground/30",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      isOffline ? "left-7" : "left-1",
                    )}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "schedule", icon: Calendar, label: "Schedule" },
            { id: "map", icon: MapPin, label: "Map" },
            { id: "network", icon: Users, label: "Network" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors",
                activeTab === tab.id ? "text-primary" : "text-muted-foreground",
              )}
            >
              <tab.icon className={cn("w-5 h-5", activeTab === tab.id && "fill-current")} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Notifications Sheet */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 max-w-md mx-auto max-h-[70vh] overflow-hidden"
            >
              <div className="p-4 border-b">
                <div className="w-10 h-1 rounded-full bg-muted mx-auto mb-4" />
                <h3 className="font-semibold text-lg">Notifications</h3>
              </div>
              <div className="p-4 space-y-3 overflow-y-auto max-h-[50vh]">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={cn("p-3 rounded-xl flex items-start gap-3", notif.unread ? "bg-primary/5" : "bg-muted")}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        notif.type === "session"
                          ? "bg-primary/20 text-primary"
                          : notif.type === "networking"
                            ? "bg-accent/20 text-accent"
                            : "bg-amber-500/20 text-amber-500",
                      )}
                    >
                      {notif.type === "session" ? (
                        <Calendar className="w-4 h-4" />
                      ) : notif.type === "networking" ? (
                        <Users className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{notif.message}</p>
                      <p className="text-xs text-muted-foreground">{notif.time}</p>
                    </div>
                    {notif.unread && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Digital Badge Modal */}
      <AnimatePresence>
        {showBadge && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBadge(false)}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-background rounded-3xl p-6 w-full max-w-sm"
              >
                {/* Badge Card */}
                <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl p-6 text-white text-center mb-4">
                  <Badge className="bg-white/20 text-white mb-4">ECOWAS Climate Summit 2024</Badge>
                  <Avatar className="w-20 h-20 mx-auto mb-3 border-4 border-white/30">
                    <AvatarImage src="/african-businessman-portrait.jpg" />
                    <AvatarFallback>KA</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">Kwame Asante</h3>
                  <p className="text-white/80">Project Developer</p>
                  <p className="text-white/60 text-sm">Solar Africa Partners</p>
                  <div className="mt-4 p-3 bg-white rounded-xl">
                    <QrCode className="w-24 h-24 mx-auto text-foreground" />
                  </div>
                  <p className="text-white/60 text-xs mt-2">Badge ID: ECWS-2024-K847</p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="flex-col h-auto py-3 bg-transparent">
                    <Download className="w-4 h-4 mb-1" />
                    <span className="text-xs">Save</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-col h-auto py-3 bg-transparent">
                    <Share2 className="w-4 h-4 mb-1" />
                    <span className="text-xs">Share</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-col h-auto py-3 bg-transparent">
                    <ExternalLink className="w-4 h-4 mb-1" />
                    <span className="text-xs">Wallet</span>
                  </Button>
                </div>

                <Button onClick={() => setShowBadge(false)} className="w-full mt-4">
                  Close
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* QR Scanner Modal */}
      <AnimatePresence>
        {showQRScanner && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4"
            >
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white">
                <button onClick={() => setShowQRScanner(false)}>Cancel</button>
                <span className="font-medium">Scan QR Code</span>
                <div className="w-12" />
              </div>

              {/* Scanner Frame */}
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 border-2 border-white/30 rounded-2xl" />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl" />

                {/* Scanning line animation */}
                <motion.div
                  className="absolute left-4 right-4 h-0.5 bg-primary"
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              </div>

              <p className="text-white/70 text-center mt-8">
                Scan a QR code to exchange contact info or check into a session
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
