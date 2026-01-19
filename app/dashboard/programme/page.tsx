"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Plus,
  Search,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Copy,
  MoreHorizontal,
  Video,
  Mic,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Download,
  Upload,
  Eye,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

type SessionStatus = "draft" | "confirmed" | "in-progress" | "completed" | "cancelled"
type SessionType = "plenary" | "panel" | "workshop" | "bilateral" | "networking" | "ceremony"

interface Session {
  id: string
  title: string
  type: SessionType
  status: SessionStatus
  date: string
  startTime: string
  endTime: string
  venue: string
  room: string
  capacity: number
  registered: number
  speakers: { id: string; name: string; role: string; avatar: string }[]
  description: string
  track: string
  isLive: boolean
  hasInterpretation: boolean
  languages: string[]
}

const sessions: Session[] = [
  {
    id: "1",
    title: "Opening Ceremony: Climate Action for Africa's Future",
    type: "ceremony",
    status: "confirmed",
    date: "2024-03-15",
    startTime: "09:00",
    endTime: "10:30",
    venue: "Main Convention Center",
    room: "Grand Ballroom",
    capacity: 2000,
    registered: 1856,
    speakers: [
      { id: "s1", name: "H.E. Bola Tinubu", role: "ECOWAS Chairman", avatar: "/african-leader-portrait.jpg" },
      {
        id: "s2",
        name: "Dr. Amina Mohammed",
        role: "UN Deputy Secretary-General",
        avatar: "/placeholder-w932o.png",
      },
    ],
    description: "Official opening of the ECOWAS Climate Summit with addresses from regional leaders.",
    track: "Main Stage",
    isLive: false,
    hasInterpretation: true,
    languages: ["English", "French", "Portuguese"],
  },
  {
    id: "2",
    title: "Renewable Energy Transition in West Africa",
    type: "panel",
    status: "confirmed",
    date: "2024-03-15",
    startTime: "11:00",
    endTime: "12:30",
    venue: "Main Convention Center",
    room: "Hall A",
    capacity: 500,
    registered: 423,
    speakers: [
      { id: "s3", name: "Prof. Fatima Diallo", role: "Energy Policy Expert", avatar: "/african-woman-professor.jpg" },
      { id: "s4", name: "Mr. Kwame Asante", role: "Solar Africa CEO", avatar: "/african-businessman.png" },
    ],
    description:
      "Expert panel discussing strategies for accelerating renewable energy adoption across ECOWAS member states.",
    track: "Energy & Infrastructure",
    isLive: false,
    hasInterpretation: true,
    languages: ["English", "French"],
  },
  {
    id: "3",
    title: "Green Finance Workshop: Accessing Climate Funds",
    type: "workshop",
    status: "draft",
    date: "2024-03-15",
    startTime: "14:00",
    endTime: "16:00",
    venue: "Main Convention Center",
    room: "Workshop Room 1",
    capacity: 100,
    registered: 67,
    speakers: [
      {
        id: "s5",
        name: "Ms. Aisha Bello",
        role: "AfDB Climate Finance Director",
        avatar: "/african-woman-finance.jpg",
      },
    ],
    description:
      "Hands-on workshop on navigating climate finance mechanisms and preparing successful funding proposals.",
    track: "Finance & Investment",
    isLive: false,
    hasInterpretation: false,
    languages: ["English"],
  },
  {
    id: "4",
    title: "Presidential Bilateral: Nigeria-Ghana Climate Partnership",
    type: "bilateral",
    status: "confirmed",
    date: "2024-03-15",
    startTime: "15:00",
    endTime: "16:00",
    venue: "VIP Wing",
    room: "State Room 1",
    capacity: 20,
    registered: 12,
    speakers: [],
    description: "High-level bilateral meeting between Nigerian and Ghanaian delegations on joint climate initiatives.",
    track: "VIP Protocol",
    isLive: false,
    hasInterpretation: true,
    languages: ["English"],
  },
  {
    id: "5",
    title: "Youth Climate Action Summit",
    type: "plenary",
    status: "in-progress",
    date: "2024-03-16",
    startTime: "09:00",
    endTime: "12:00",
    venue: "Youth Center",
    room: "Main Hall",
    capacity: 800,
    registered: 756,
    speakers: [{ id: "s6", name: "Vanessa Nakate", role: "Climate Activist", avatar: "/young-african-woman-activist.jpg" }],
    description: "Youth-led plenary focusing on the role of young Africans in driving climate action.",
    track: "Youth & Education",
    isLive: true,
    hasInterpretation: true,
    languages: ["English", "French", "Portuguese", "Arabic"],
  },
  {
    id: "6",
    title: "Networking Lunch: Private Sector Leaders",
    type: "networking",
    status: "confirmed",
    date: "2024-03-16",
    startTime: "12:30",
    endTime: "14:00",
    venue: "Main Convention Center",
    room: "Executive Dining",
    capacity: 150,
    registered: 142,
    speakers: [],
    description: "Exclusive networking opportunity for private sector delegates and potential investors.",
    track: "Business & Investment",
    isLive: false,
    hasInterpretation: false,
    languages: ["English"],
  },
]

const tracks = [
  "All Tracks",
  "Main Stage",
  "Energy & Infrastructure",
  "Finance & Investment",
  "Youth & Education",
  "Business & Investment",
  "VIP Protocol",
]

const sessionTypes: { value: SessionType; label: string; color: string }[] = [
  { value: "plenary", label: "Plenary", color: "bg-primary" },
  { value: "panel", label: "Panel Discussion", color: "bg-accent" },
  { value: "workshop", label: "Workshop", color: "bg-chart-1" },
  { value: "bilateral", label: "Bilateral Meeting", color: "bg-chart-2" },
  { value: "networking", label: "Networking", color: "bg-chart-3" },
  { value: "ceremony", label: "Ceremony", color: "bg-chart-4" },
]

const statusConfig: Record<SessionStatus, { label: string; color: string; icon: React.ElementType }> = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: FileText },
  confirmed: { label: "Confirmed", color: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
  "in-progress": { label: "Live Now", color: "bg-red-500/10 text-red-600 animate-pulse", icon: Video },
  completed: { label: "Completed", color: "bg-slate-500/10 text-slate-600", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600", icon: XCircle },
}

export default function ProgrammePage() {
  const [view, setView] = useState<"grid" | "list" | "timeline">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTrack, setSelectedTrack] = useState("All Tracks")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState("2024-03-15")
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showSessionDetail, setShowSessionDetail] = useState<Session | null>(null)
  const [createStep, setCreateStep] = useState(1)

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch =
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTrack = selectedTrack === "All Tracks" || session.track === selectedTrack
    const matchesType = selectedType === "all" || session.type === selectedType
    const matchesDate = session.date === selectedDate
    return matchesSearch && matchesTrack && matchesType && matchesDate
  })

  const dates = ["2024-03-15", "2024-03-16", "2024-03-17", "2024-03-18"]

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Programme Management</h1>
          <p className="text-muted-foreground">Create, manage, and monitor all summit sessions</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Create Session
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total Sessions", value: "48", change: "+3 today" },
          { label: "Confirmed", value: "42", change: "87.5%" },
          { label: "Live Now", value: "2", change: "In progress" },
          { label: "Speakers", value: "156", change: "89% confirmed" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-xl border bg-card p-4"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Date Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {dates.map((date) => {
          const d = new Date(date)
          const isSelected = date === selectedDate
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={cn(
                "flex flex-col items-center rounded-xl border px-6 py-3 transition-all",
                isSelected ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50",
              )}
            >
              <span className="text-xs font-medium uppercase">
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-2xl font-bold">{d.getDate()}</span>
              <span className="text-xs text-muted-foreground">{d.toLocaleDateString("en-US", { month: "short" })}</span>
            </button>
          )
        })}
      </div>

      {/* Filters & View Toggle */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedTrack} onValueChange={setSelectedTrack}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select track" />
            </SelectTrigger>
            <SelectContent>
              {tracks.map((track) => (
                <SelectItem key={track} value={track}>
                  {track}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Session type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {sessionTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1 rounded-lg border p-1">
          {[
            { value: "grid", icon: Grid3X3 },
            { value: "list", icon: List },
            { value: "timeline", icon: Calendar },
          ].map((v) => (
            <button
              key={v.value}
              onClick={() => setView(v.value as typeof view)}
              className={cn(
                "rounded-md p-2 transition-colors",
                view === v.value ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <v.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Sessions Display */}
      <AnimatePresence mode="wait">
        {view === "grid" && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredSessions.map((session, i) => (
              <SessionCard key={session.id} session={session} index={i} onClick={() => setShowSessionDetail(session)} />
            ))}
          </motion.div>
        )}

        {view === "list" && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            {filteredSessions.map((session, i) => (
              <SessionListItem
                key={session.id}
                session={session}
                index={i}
                onClick={() => setShowSessionDetail(session)}
              />
            ))}
          </motion.div>
        )}

        {view === "timeline" && (
          <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TimelineView sessions={filteredSessions} onSessionClick={setShowSessionDetail} />
          </motion.div>
        )}
      </AnimatePresence>

      {filteredSessions.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
          <Calendar className="h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No sessions found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or create a new session.</p>
          <Button onClick={() => setShowCreateDialog(true)} className="mt-4 gap-2">
            <Plus className="h-4 w-4" />
            Create Session
          </Button>
        </div>
      )}

      {/* Create Session Dialog */}
      <CreateSessionDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        step={createStep}
        setStep={setCreateStep}
      />

      {/* Session Detail Dialog */}
      <SessionDetailDialog session={showSessionDetail} onClose={() => setShowSessionDetail(null)} />
      </div>
    </div>
  )
}

function SessionCard({ session, index, onClick }: { session: Session; index: number; onClick: () => void }) {
  const StatusIcon = statusConfig[session.status].icon
  const typeConfig = sessionTypes.find((t) => t.value === session.type)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="group cursor-pointer rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
    >
      {/* Type Banner */}
      <div className={cn("h-1", typeConfig?.color || "bg-primary")} />

      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {typeConfig?.label}
              </Badge>
              {session.isLive && (
                <Badge className="bg-red-500 text-white animate-pulse gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  LIVE
                </Badge>
              )}
            </div>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{session.title}</h3>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Time & Location */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {session.startTime} - {session.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">
              {session.room}, {session.venue}
            </span>
          </div>
        </div>

        {/* Speakers */}
        {session.speakers.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {session.speakers.slice(0, 3).map((speaker) => (
                <img
                  key={speaker.id}
                  src={speaker.avatar || "/placeholder.svg"}
                  alt={speaker.name}
                  className="h-8 w-8 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {session.speakers.length} speaker{session.speakers.length !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <Badge className={statusConfig[session.status].color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {statusConfig[session.status].label}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>
              {session.registered}/{session.capacity}
            </span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center gap-2">
          {session.hasInterpretation && (
            <Badge variant="outline" className="text-xs gap-1">
              <Mic className="h-3 w-3" />
              {session.languages.length} languages
            </Badge>
          )}
          {session.isLive && (
            <Badge variant="outline" className="text-xs gap-1">
              <Video className="h-3 w-3" />
              Livestream
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function SessionListItem({ session, index, onClick }: { session: Session; index: number; onClick: () => void }) {
  const StatusIcon = statusConfig[session.status].icon
  const typeConfig = sessionTypes.find((t) => t.value === session.type)

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      onClick={onClick}
      className="flex items-center gap-4 rounded-xl border bg-card p-4 cursor-pointer hover:shadow-md hover:border-primary/50 transition-all"
    >
      {/* Time Column */}
      <div className="w-20 shrink-0 text-center">
        <p className="font-semibold">{session.startTime}</p>
        <p className="text-xs text-muted-foreground">{session.endTime}</p>
      </div>

      {/* Type Indicator */}
      <div className={cn("w-1 h-12 rounded-full shrink-0", typeConfig?.color || "bg-primary")} />

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="secondary" className="text-xs">
            {typeConfig?.label}
          </Badge>
          {session.isLive && <Badge className="bg-red-500 text-white animate-pulse text-xs">LIVE</Badge>}
        </div>
        <h3 className="font-semibold truncate">{session.title}</h3>
        <p className="text-sm text-muted-foreground truncate">
          {session.room}, {session.venue}
        </p>
      </div>

      {/* Speakers */}
      <div className="hidden md:flex items-center gap-2">
        {session.speakers.slice(0, 2).map((speaker) => (
          <img
            key={speaker.id}
            src={speaker.avatar || "/placeholder.svg"}
            alt={speaker.name}
            className="h-8 w-8 rounded-full border-2 border-background object-cover"
          />
        ))}
        {session.speakers.length > 2 && (
          <span className="text-sm text-muted-foreground">+{session.speakers.length - 2}</span>
        )}
      </div>

      {/* Status & Capacity */}
      <div className="flex items-center gap-4">
        <Badge className={statusConfig[session.status].color}>
          <StatusIcon className="mr-1 h-3 w-3" />
          {statusConfig[session.status].label}
        </Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>
            {session.registered}/{session.capacity}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="mr-2 h-4 w-4" /> Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}

function TimelineView({ sessions, onSessionClick }: { sessions: Session[]; onSessionClick: (s: Session) => void }) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Time Header */}
      <div className="flex border-b">
        <div className="w-24 shrink-0 border-r p-3 bg-muted/50">
          <span className="text-sm font-medium">Time</span>
        </div>
        <div className="flex-1 grid grid-cols-12 divide-x">
          {hours.map((hour) => (
            <div key={hour} className="p-2 text-center text-xs text-muted-foreground">
              {hour}:00
            </div>
          ))}
        </div>
      </div>

      {/* Venues */}
      {["Grand Ballroom", "Hall A", "Workshop Room 1", "State Room 1"].map((venue) => {
        const venueSessions = sessions.filter((s) => s.room === venue)
        return (
          <div key={venue} className="flex border-b last:border-b-0">
            <div className="w-24 shrink-0 border-r p-3 bg-muted/30">
              <span className="text-xs font-medium">{venue}</span>
            </div>
            <div className="flex-1 relative h-16">
              {venueSessions.map((session) => {
                const startHour = Number.parseInt(session.startTime.split(":")[0])
                const endHour = Number.parseInt(session.endTime.split(":")[0])
                const startMin = Number.parseInt(session.startTime.split(":")[1])
                const endMin = Number.parseInt(session.endTime.split(":")[1])
                const left = (((startHour - 8) * 60 + startMin) / (12 * 60)) * 100
                const width = (((endHour - startHour) * 60 + (endMin - startMin)) / (12 * 60)) * 100
                const typeConfig = sessionTypes.find((t) => t.value === session.type)

                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => onSessionClick(session)}
                    className={cn(
                      "absolute top-2 bottom-2 rounded-lg px-2 py-1 cursor-pointer overflow-hidden",
                      "flex items-center text-white text-xs font-medium",
                      "hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all",
                      typeConfig?.color || "bg-primary",
                    )}
                    style={{ left: `${left}%`, width: `${width}%` }}
                  >
                    <span className="truncate">{session.title}</span>
                    {session.isLive && <span className="ml-1 h-2 w-2 rounded-full bg-white animate-pulse" />}
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CreateSessionDialog({
  open,
  onOpenChange,
  step,
  setStep,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  step: number
  setStep: (step: number) => void
}) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    track: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    room: "",
    capacity: "",
    hasInterpretation: false,
    languages: [] as string[],
    isLive: false,
  })

  const handleClose = () => {
    onOpenChange(false)
    setStep(1)
    setFormData({
      title: "",
      type: "",
      track: "",
      description: "",
      date: "",
      startTime: "",
      endTime: "",
      venue: "",
      room: "",
      capacity: "",
      hasInterpretation: false,
      languages: [],
      isLive: false,
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Session</DialogTitle>
          <DialogDescription>
            Step {step} of 3 -{" "}
            {step === 1 ? "Basic Information" : step === 2 ? "Schedule & Venue" : "Features & Review"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn("h-1.5 flex-1 rounded-full transition-colors", s <= step ? "bg-primary" : "bg-muted")}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  placeholder="Enter session title..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Session Type</Label>
                  <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {sessionTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Track</Label>
                  <Select value={formData.track} onValueChange={(v) => setFormData({ ...formData, track: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select track" />
                    </SelectTrigger>
                    <SelectContent>
                      {tracks
                        .filter((t) => t !== "All Tracks")
                        .map((track) => (
                          <SelectItem key={track} value={track}>
                            {track}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the session..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="p-4 rounded-lg bg-muted/50 flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">AI Assistant</p>
                  <p className="text-xs text-muted-foreground">
                    Need help? Our AI can suggest session titles, descriptions, and optimal scheduling based on your
                    summit theme.
                  </p>
                  <Button variant="link" className="h-auto p-0 text-xs">
                    Generate suggestions
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Date</Label>
                <Select value={formData.date} onValueChange={(v) => setFormData({ ...formData, date: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-03-15">Friday, March 15, 2024</SelectItem>
                    <SelectItem value="2024-03-16">Saturday, March 16, 2024</SelectItem>
                    <SelectItem value="2024-03-17">Sunday, March 17, 2024</SelectItem>
                    <SelectItem value="2024-03-18">Monday, March 18, 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Venue</Label>
                  <Select value={formData.venue} onValueChange={(v) => setFormData({ ...formData, venue: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select venue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Main Convention Center">Main Convention Center</SelectItem>
                      <SelectItem value="Youth Center">Youth Center</SelectItem>
                      <SelectItem value="VIP Wing">VIP Wing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Room</Label>
                  <Select value={formData.room} onValueChange={(v) => setFormData({ ...formData, room: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select room" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Grand Ballroom">Grand Ballroom (2000 pax)</SelectItem>
                      <SelectItem value="Hall A">Hall A (500 pax)</SelectItem>
                      <SelectItem value="Hall B">Hall B (500 pax)</SelectItem>
                      <SelectItem value="Workshop Room 1">Workshop Room 1 (100 pax)</SelectItem>
                      <SelectItem value="State Room 1">State Room 1 (20 pax)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Custom Capacity (optional)</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Leave blank to use room default"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
              </div>
              {formData.startTime && formData.endTime && (
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-700">Scheduling Conflict Detected</p>
                    <p className="text-xs text-amber-600">
                      "Renewable Energy Panel" is scheduled in the same room from 11:00 - 12:30.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Live Streaming</p>
                      <p className="text-sm text-muted-foreground">Broadcast session to virtual attendees</p>
                    </div>
                  </div>
                  <Button
                    variant={formData.isLive ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, isLive: !formData.isLive })}
                  >
                    {formData.isLive ? "Enabled" : "Enable"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Mic className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Simultaneous Interpretation</p>
                      <p className="text-sm text-muted-foreground">Enable multi-language support</p>
                    </div>
                  </div>
                  <Button
                    variant={formData.hasInterpretation ? "default" : "outline"}
                    onClick={() => setFormData({ ...formData, hasInterpretation: !formData.hasInterpretation })}
                  >
                    {formData.hasInterpretation ? "Enabled" : "Enable"}
                  </Button>
                </div>
              </div>

              {formData.hasInterpretation && (
                <div className="space-y-2">
                  <Label>Interpretation Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {["English", "French", "Portuguese", "Arabic", "Spanish"].map((lang) => (
                      <Button
                        key={lang}
                        variant={formData.languages.includes(lang) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const newLangs = formData.languages.includes(lang)
                            ? formData.languages.filter((l) => l !== lang)
                            : [...formData.languages, lang]
                          setFormData({ ...formData, languages: newLangs })
                        }}
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Review Summary */}
              <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                <h4 className="font-semibold">Session Summary</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Title:</span>
                    <p className="font-medium">{formData.title || "Not set"}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <p className="font-medium">
                      {sessionTypes.find((t) => t.value === formData.type)?.label || "Not set"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Date & Time:</span>
                    <p className="font-medium">
                      {formData.date ? new Date(formData.date).toLocaleDateString() : "Not set"} {formData.startTime} -{" "}
                      {formData.endTime}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="font-medium">
                      {formData.room || "Not set"}, {formData.venue || "Not set"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => (step > 1 ? setStep(step - 1) : handleClose())}>
            {step > 1 ? "Back" : "Cancel"}
          </Button>
          <Button
            onClick={() => {
              if (step < 3) {
                setStep(step + 1)
              } else {
                handleClose()
              }
            }}
          >
            {step < 3 ? "Continue" : "Create Session"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SessionDetailDialog({ session, onClose }: { session: Session | null; onClose: () => void }) {
  if (!session) return null

  const StatusIcon = statusConfig[session.status].icon
  const typeConfig = sessionTypes.find((t) => t.value === session.type)

  return (
    <Dialog open={!!session} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{typeConfig?.label}</Badge>
            <Badge className={statusConfig[session.status].color}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {statusConfig[session.status].label}
            </Badge>
            {session.isLive && <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>}
          </div>
          <DialogTitle className="text-xl">{session.title}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Schedule
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span>
                        {new Date(session.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time</span>
                      <span>
                        {session.startTime} - {session.endTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>1.5 hours</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Location
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Venue</span>
                      <span>{session.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Room</span>
                      <span>{session.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capacity</span>
                      <span>{session.capacity} seats</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground">{session.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {session.hasInterpretation && (
                    <Badge variant="outline" className="gap-1">
                      <Mic className="h-3 w-3" />
                      Interpretation ({session.languages.join(", ")})
                    </Badge>
                  )}
                  {session.isLive && (
                    <Badge variant="outline" className="gap-1">
                      <Video className="h-3 w-3" />
                      Live Streaming
                    </Badge>
                  )}
                </div>
              </div>

              {/* Attendance Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Registration</h4>
                  <span className="text-sm text-muted-foreground">
                    {session.registered}/{session.capacity}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(session.registered / session.capacity) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{session.capacity - session.registered} seats remaining</p>
              </div>
            </TabsContent>

            <TabsContent value="speakers" className="space-y-4 mt-4">
              {session.speakers.length > 0 ? (
                session.speakers.map((speaker) => (
                  <div key={speaker.id} className="flex items-center gap-4 p-4 rounded-lg border">
                    <img
                      src={speaker.avatar || "/placeholder.svg"}
                      alt={speaker.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{speaker.name}</h4>
                      <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No speakers assigned to this session</p>
                  <Button variant="outline" className="mt-4 bg-transparent">
                    Add Speakers
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="attendees" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <Input placeholder="Search attendees..." className="max-w-sm" />
                <Button variant="outline" size="sm">
                  Export List
                </Button>
              </div>
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>{session.registered} registered attendees</p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  View Full List
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4 mt-4">
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No resources uploaded yet</p>
                <Button variant="outline" className="mt-4 bg-transparent">
                  Upload Resources
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Edit className="h-4 w-4" />
            Edit Session
          </Button>
          {session.status === "draft" && (
            <Button className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Confirm Session
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
