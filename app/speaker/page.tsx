"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  FileText,
  Video,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Play,
  Upload,
  Eye,
  Mic,
  Monitor,
  Wifi,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const upcomingSessions = [
  {
    id: "1",
    title: "Opening Ceremony: Climate Action for Africa's Future",
    type: "Keynote Address",
    date: "March 15, 2024",
    time: "09:00 - 10:30",
    venue: "Grand Ballroom",
    attendees: 1856,
    status: "confirmed",
    materialsUploaded: true,
    techCheckComplete: true,
    daysUntil: 2,
  },
  {
    id: "2",
    title: "Panel: Women in Climate Leadership",
    type: "Panel Discussion",
    date: "March 16, 2024",
    time: "14:00 - 15:30",
    venue: "Hall A",
    attendees: 423,
    status: "pending_materials",
    materialsUploaded: false,
    techCheckComplete: false,
    daysUntil: 3,
  },
]

const tasks = [
  { id: "1", title: "Upload presentation slides", completed: true, priority: "high" },
  { id: "2", title: "Complete speaker bio form", completed: true, priority: "medium" },
  { id: "3", title: "Technical check for Keynote", completed: false, priority: "high" },
  { id: "4", title: "Review session brief", completed: false, priority: "medium" },
  { id: "5", title: "Confirm interpretation languages", completed: true, priority: "low" },
]

const messages = [
  {
    id: "1",
    from: "Programme Team",
    subject: "Session Brief - Opening Ceremony",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: "2",
    from: "Technical Support",
    subject: "Tech Check Scheduled for Tomorrow",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: "3",
    from: "VIP Protocol",
    subject: "Your Accommodation Details",
    time: "1 day ago",
    unread: false,
  },
]

export default function SpeakerDashboard() {
  const [selectedSession, setSelectedSession] = useState(upcomingSessions[0])
  const completedTasks = tasks.filter((t) => t.completed).length
  const taskProgress = (completedTasks / tasks.length) * 100

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-accent" />
        <div className="absolute inset-0 bg-[url('/african-pattern-geometric.jpg')] opacity-10" />
        <div className="relative p-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <Badge className="bg-white/20 text-white mb-4">Keynote Speaker</Badge>
              <h1 className="text-3xl font-bold mb-2">Welcome, Dr. Amina Mohammed</h1>
              <p className="text-white/80 max-w-xl">
                You have 2 upcoming sessions at the ECOWAS Climate Summit 2024. Your next presentation is the Opening
                Ceremony keynote in 2 days.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/speaker/cockpit">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 w-full">
                  <Video className="w-5 h-5" />
                  Enter Session Cockpit
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 gap-2 bg-transparent"
              >
                <Calendar className="w-5 h-5" />
                View Full Schedule
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Upcoming Sessions", value: "2", icon: Calendar, color: "text-primary" },
          { label: "Total Attendees", value: "2,279", icon: Users, color: "text-accent" },
          { label: "Materials Uploaded", value: "3/4", icon: FileText, color: "text-chart-1" },
          { label: "Messages", value: "5", icon: MessageSquare, color: "text-chart-2" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg bg-muted", stat.color)}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            <Link href="/speaker/sessions">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    selectedSession.id === session.id && "ring-2 ring-primary",
                  )}
                  onClick={() => setSelectedSession(session)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Countdown */}
                      <div className="flex md:flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-4 md:w-24 shrink-0">
                        <span className="text-3xl font-bold text-primary">{session.daysUntil}</span>
                        <span className="text-xs text-muted-foreground ml-2 md:ml-0">days left</span>
                      </div>

                      {/* Session Info */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {session.type}
                          </Badge>
                          <h3 className="font-semibold text-lg">{session.title}</h3>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {session.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {session.venue}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {session.attendees.toLocaleString()} registered
                          </span>
                        </div>

                        {/* Status Indicators */}
                        <div className="flex items-center gap-4 pt-2 border-t">
                          <div className="flex items-center gap-2">
                            {session.materialsUploaded ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                            )}
                            <span className="text-sm">Materials</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {session.techCheckComplete ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-amber-500" />
                            )}
                            <span className="text-sm">Tech Check</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex md:flex-col gap-2">
                        <Button size="sm" className="gap-2">
                          <Play className="w-4 h-4" />
                          Prepare
                        </Button>
                        <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                          <Eye className="w-4 h-4" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Task Checklist */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Pre-Session Checklist</CardTitle>
                <Badge variant="secondary">
                  {completedTasks}/{tasks.length}
                </Badge>
              </div>
              <Progress value={taskProgress} className="h-2" />
            </CardHeader>
            <CardContent className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-lg transition-colors",
                    task.completed ? "bg-muted/50" : "bg-amber-500/5",
                  )}
                >
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      task.completed ? "border-emerald-500 bg-emerald-500" : "border-muted-foreground",
                    )}
                  >
                    {task.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <span className={cn("text-sm flex-1", task.completed && "line-through text-muted-foreground")}>
                    {task.title}
                  </span>
                  {task.priority === "high" && !task.completed && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Messages</CardTitle>
                <Badge variant="secondary">2 new</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted",
                    msg.unread && "border-primary/50 bg-primary/5",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{msg.from}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{msg.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{msg.time}</span>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full gap-2">
                View All Messages <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Quick Upload */}
          <Card className="border-dashed">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Upload Materials</h3>
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Select Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Technical Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Setup for Your Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Monitor,
                title: "Display",
                description: "16:9 widescreen, 1920x1080",
                status: "Ready",
              },
              {
                icon: Mic,
                title: "Audio",
                description: "Wireless lapel microphone",
                status: "Ready",
              },
              {
                icon: Video,
                title: "Recording",
                description: "Session will be recorded",
                status: "Enabled",
              },
              {
                icon: Wifi,
                title: "Livestream",
                description: "Available in 3 languages",
                status: "Enabled",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-muted/50">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
