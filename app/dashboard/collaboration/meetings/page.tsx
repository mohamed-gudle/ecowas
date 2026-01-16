"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Video,
  Clock,
  Users,
  Plus,
  Play,
  Mic,
  MicOff,
  VideoIcon,
  VideoOff,
  Monitor,
  MessageSquare,
  Hand,
  PhoneOff,
  Settings,
  FileText,
  Brain,
  Sparkles,
  Search,
  Grid3X3,
  List,
  Volume2,
  Maximize2,
  Copy,
  Link2,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const upcomingMeetings = [
  {
    id: "1",
    title: "Daily Standup - Logistics Team",
    time: "09:00 AM",
    duration: "30 min",
    type: "standup",
    participants: [
      { name: "John Doe", avatar: "/placeholder.svg" },
      { name: "Sarah Smith", avatar: "/placeholder.svg" },
      { name: "Mike Johnson", avatar: "/placeholder.svg" },
      { name: "+5 more", avatar: null },
    ],
    recurring: true,
    status: "upcoming",
  },
  {
    id: "2",
    title: "VIP Protocol Coordination",
    time: "11:00 AM",
    duration: "1 hr",
    type: "meeting",
    participants: [
      { name: "Protocol Chief", avatar: "/placeholder.svg" },
      { name: "Security Lead", avatar: "/placeholder.svg" },
    ],
    recurring: false,
    status: "upcoming",
  },
  {
    id: "3",
    title: "Investment Pipeline Review",
    time: "02:00 PM",
    duration: "2 hrs",
    type: "workshop",
    participants: [
      { name: "Finance Team", avatar: "/placeholder.svg" },
      { name: "AfDB Rep", avatar: "/placeholder.svg" },
    ],
    recurring: false,
    status: "upcoming",
  },
]

const recordings = [
  {
    id: "1",
    title: "Heads of State Coordination Call",
    date: "Jan 15, 2026",
    duration: "1:24:33",
    participants: 12,
    hasTranscript: true,
    hasSummary: true,
    thumbnail: "/placeholder.svg",
    aiInsights: 8,
  },
  {
    id: "2",
    title: "Media Strategy Session",
    date: "Jan 14, 2026",
    duration: "45:12",
    participants: 6,
    hasTranscript: true,
    hasSummary: true,
    thumbnail: "/placeholder.svg",
    aiInsights: 5,
  },
  {
    id: "3",
    title: "Technical Rehearsal Debrief",
    date: "Jan 13, 2026",
    duration: "32:45",
    participants: 8,
    hasTranscript: true,
    hasSummary: false,
    thumbnail: "/placeholder.svg",
    aiInsights: 3,
  },
]

const chatMessages = [
  { id: "1", user: "John Doe", message: "Can everyone hear me okay?", time: "09:01" },
  { id: "2", user: "Sarah Smith", message: "Yes, loud and clear!", time: "09:01" },
  { id: "3", user: "Mike Johnson", message: "Let me share my screen for the updates", time: "09:02" },
]

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [inMeeting, setInMeeting] = useState(false)
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [selectedRecording, setSelectedRecording] = useState<(typeof recordings)[0] | null>(null)
  const [aiQuery, setAiQuery] = useState("")
  const [aiResponse, setAiResponse] = useState("")
  const [isAiThinking, setIsAiThinking] = useState(false)

  const handleAiQuery = () => {
    if (!aiQuery.trim()) return
    setIsAiThinking(true)
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(
        `Based on the meeting transcript, here are the key points regarding "${aiQuery}":\n\n1. The delegation from Ghana confirmed arrival on April 12th\n2. Three bilateral meetings are scheduled\n3. Security protocols were discussed and approved\n4. Budget allocation for VIP transport was finalized at $45,000`,
      )
      setIsAiThinking(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Meetings & Standups</h1>
          <p className="text-muted-foreground">Virtual meetings with AI-powered transcription and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Schedule Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Schedule New Meeting</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Meeting title" />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="date" />
                  <Input type="time" />
                </div>
                <Input placeholder="Duration (e.g., 1 hour)" />
                <Input placeholder="Add participants (email)" />
                <Textarea placeholder="Meeting agenda..." />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="bg-transparent">
                    Cancel
                  </Button>
                  <Button>Schedule</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setInMeeting(true)}>
            <Video className="w-4 h-4" />
            Join Meeting
          </Button>
        </div>
      </div>

      {/* Meeting Room Modal */}
      <Dialog open={inMeeting} onOpenChange={setInMeeting}>
        <DialogContent className="max-w-6xl h-[80vh] p-0">
          <div className="flex flex-col h-full">
            {/* Video Grid */}
            <div className="flex-1 bg-gray-900 p-4 grid grid-cols-3 gap-4">
              {/* Main Video */}
              <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarFallback className="text-3xl bg-primary">JD</AvatarFallback>
                    </Avatar>
                    <p className="text-white font-medium">John Doe (You)</p>
                    <p className="text-gray-400 text-sm">Sharing screen</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Badge className="bg-red-500 text-white">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2" />
                    Recording
                  </Badge>
                  <Badge className="bg-gray-800/80">00:15:32</Badge>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Button size="sm" variant="ghost" className="text-white">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Participant Videos */}
              {[
                { name: "Sarah Smith", speaking: true },
                { name: "Mike Johnson", speaking: false },
                { name: "Emily Brown", speaking: false },
                { name: "David Wilson", speaking: false },
              ].map((participant, i) => (
                <div
                  key={i}
                  className={cn(
                    "relative rounded-xl overflow-hidden bg-gray-800 aspect-video",
                    participant.speaking && "ring-2 ring-primary",
                  )}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback>
                        {participant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <span className="text-white text-sm truncate">{participant.name}</span>
                    {participant.speaking && <Volume2 className="w-4 h-4 text-primary animate-pulse" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="bg-gray-900 border-t border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    variant={micEnabled ? "secondary" : "destructive"}
                    size="icon"
                    onClick={() => setMicEnabled(!micEnabled)}
                  >
                    {micEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant={videoEnabled ? "secondary" : "destructive"}
                    size="icon"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                  >
                    {videoEnabled ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Monitor className="w-5 h-5" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Hand className="w-5 h-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Badge className="bg-gray-800 text-white gap-2">
                    <Users className="w-4 h-4" />5 Participants
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="icon">
                    <MessageSquare className="w-5 h-5" />
                  </Button>
                  <Button variant="secondary" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button variant="destructive" className="gap-2" onClick={() => setInMeeting(false)}>
                    <PhoneOff className="w-5 h-5" />
                    Leave
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Today's Schedule</CardTitle>
                <Badge variant="secondary">January 16, 2026</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-4 rounded-xl border hover:bg-muted/50 transition-colors"
                >
                  <div className="w-16 text-center">
                    <p className="text-lg font-semibold">{meeting.time.split(" ")[0]}</p>
                    <p className="text-xs text-muted-foreground">{meeting.time.split(" ")[1]}</p>
                  </div>

                  <div className="w-1 h-12 rounded-full bg-primary" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{meeting.title}</h3>
                      {meeting.recurring && (
                        <Badge variant="secondary" className="text-xs">
                          Recurring
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {meeting.duration}
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {meeting.participants.slice(0, 3).map((p, i) => (
                            <Avatar key={i} className="w-6 h-6 border-2 border-background">
                              <AvatarImage src={p.avatar || undefined} />
                              <AvatarFallback className="text-xs">{p.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        {meeting.participants.length > 3 && (
                          <span className="text-xs">+{meeting.participants.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Link2 className="w-4 h-4" />
                      Copy Link
                    </Button>
                    <Button size="sm" className="gap-2" onClick={() => setInMeeting(true)}>
                      <Video className="w-4 h-4" />
                      Join
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recordings" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search recordings..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="bg-transparent">
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent">
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recordings.map((recording) => (
              <Card
                key={recording.id}
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedRecording(recording)}
              >
                <div className="aspect-video relative bg-gray-900 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-black/60 text-white">{recording.duration}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{recording.title}</h3>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{recording.date}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recording.participants}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    {recording.hasTranscript && (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <FileText className="w-3 h-3" />
                        Transcript
                      </Badge>
                    )}
                    {recording.hasSummary && (
                      <Badge variant="secondary" className="text-xs gap-1">
                        <Sparkles className="w-3 h-3" />
                        Summary
                      </Badge>
                    )}
                    {recording.aiInsights > 0 && (
                      <Badge className="bg-primary/10 text-primary text-xs gap-1">
                        <Brain className="w-3 h-3" />
                        {recording.aiInsights} Insights
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>AI Meeting Assistant</CardTitle>
                  <p className="text-sm text-muted-foreground">Ask questions about your meeting recordings</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Ask about your meetings... e.g., 'What decisions were made about VIP protocol?'"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiQuery()}
                  className="flex-1"
                />
                <Button onClick={handleAiQuery} disabled={isAiThinking}>
                  {isAiThinking ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {isAiThinking && (
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                    >
                      <Brain className="w-4 h-4 text-white" />
                    </motion.div>
                    <div>
                      <p className="font-medium">Analyzing meeting transcripts...</p>
                      <p className="text-sm text-muted-foreground">Searching across 15 recordings</p>
                    </div>
                  </div>
                </div>
              )}

              {aiResponse && !isAiThinking && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="whitespace-pre-wrap text-sm">{aiResponse}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Copy className="w-4 h-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <FileText className="w-4 h-4" />
                          View Sources
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Questions */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Quick Questions</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "What action items came from yesterday's standup?",
                    "Summarize the VIP protocol discussion",
                    "What budget items were approved this week?",
                    "List all mentioned deadlines",
                  ].map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={() => {
                        setAiQuery(q)
                        handleAiQuery()
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
