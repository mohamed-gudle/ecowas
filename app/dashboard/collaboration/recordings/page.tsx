"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  Download,
  Share2,
  FileText,
  Brain,
  Sparkles,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const recordings = [
  {
    id: "1",
    title: "Heads of State Coordination Call",
    date: "January 15, 2026",
    duration: "1:24:33",
    participants: 12,
    hasTranscript: true,
    hasSummary: true,
    chapters: [
      { time: "00:00", title: "Welcome & Introductions" },
      { time: "05:32", title: "Protocol Updates" },
      { time: "18:45", title: "Security Arrangements" },
      { time: "35:20", title: "Budget Discussion" },
      { time: "52:10", title: "Action Items Review" },
      { time: "1:15:00", title: "Closing Remarks" },
    ],
    summary: `Key decisions from the coordination call:
    
1. **Protocol Arrangements**: All 15 heads of state have confirmed attendance. Arrival schedules finalized for April 12-13.

2. **Security**: Enhanced security protocols approved. Additional screening checkpoints at venue entrances.

3. **Budget**: $2.4M additional funding approved for VIP accommodations and transport.

4. **Timeline**: Technical rehearsals scheduled for April 10-11. All teams to submit final reports by April 8.

5. **Action Items**: 23 tasks assigned across 6 departments with deadlines ranging from April 5-11.`,
    transcript: [
      { time: "00:00", speaker: "Moderator", text: "Good morning everyone, let's begin today's coordination call..." },
      {
        time: "00:15",
        speaker: "Protocol Chief",
        text: "Thank you. I'd like to start with an update on our confirmed attendees...",
      },
      {
        time: "01:02",
        speaker: "Security Lead",
        text: "Before we proceed, I need to highlight some security considerations...",
      },
    ],
  },
]

export default function RecordingsLibraryPage() {
  const [selectedRecording, setSelectedRecording] = useState(recordings[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [activeTab, setActiveTab] = useState("summary")

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recordings Library</h1>
          <p className="text-muted-foreground">Meeting recordings with AI-powered transcription and summaries</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search recordings..." className="pl-9" />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recording List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Recordings</CardTitle>
          </CardHeader>
          <ScrollArea className="h-[calc(100vh-20rem)]">
            <CardContent className="space-y-3">
              {[...recordings, ...recordings, ...recordings].map((rec, i) => (
                <motion.button
                  key={`${rec.id}-${i}`}
                  onClick={() => setSelectedRecording(rec)}
                  className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all hover:shadow-md",
                    selectedRecording.id === rec.id && i === 0 && "border-primary bg-primary/5",
                  )}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-12 rounded-lg bg-gray-900 flex items-center justify-center shrink-0">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{rec.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span>{rec.date}</span>
                        <span>•</span>
                        <span>{rec.duration}</span>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {rec.hasTranscript && (
                          <Badge variant="secondary" className="text-xs">
                            <FileText className="w-3 h-3 mr-1" />
                            Transcript
                          </Badge>
                        )}
                        {rec.hasSummary && (
                          <Badge className="bg-primary/10 text-primary text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Summary
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </CardContent>
          </ScrollArea>
        </Card>

        {/* Video Player & Details */}
        <div className="lg:col-span-2 space-y-4">
          {/* Video Player */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-gray-900 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="w-20 h-20 rounded-full" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                </Button>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  <Slider
                    value={[currentTime]}
                    max={100}
                    step={1}
                    onValueChange={(v) => setCurrentTime(v[0])}
                    className="cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-white text-sm">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <SkipForward className="w-5 h-5" />
                      </Button>
                      <span>00:00 / {selectedRecording.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Volume2 className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Maximize2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{selectedRecording.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {selectedRecording.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedRecording.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedRecording.participants} participants
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs: Summary, Transcript, Chapters */}
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="pb-0">
                <TabsList>
                  <TabsTrigger value="summary" className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    AI Summary
                  </TabsTrigger>
                  <TabsTrigger value="transcript" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Transcript
                  </TabsTrigger>
                  <TabsTrigger value="chapters" className="gap-2">
                    <Bookmark className="w-4 h-4" />
                    Chapters
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              <CardContent className="pt-4">
                <TabsContent value="summary" className="mt-0">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <div className="p-4 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 border mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-5 h-5 text-primary" />
                        <span className="font-semibold">AI-Generated Summary</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This summary was automatically generated by analyzing the meeting transcript.
                      </p>
                    </div>
                    <div className="whitespace-pre-wrap">{selectedRecording.summary}</div>
                  </div>
                </TabsContent>

                <TabsContent value="transcript" className="mt-0">
                  <ScrollArea className="h-64">
                    <div className="space-y-4">
                      {selectedRecording.transcript.map((line, i) => (
                        <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-muted/50">
                          <span className="text-xs text-muted-foreground font-mono w-12 shrink-0">{line.time}</span>
                          <div>
                            <span className="font-medium text-sm text-primary">{line.speaker}:</span>
                            <p className="text-sm mt-1">{line.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="chapters" className="mt-0">
                  <div className="space-y-2">
                    {selectedRecording.chapters.map((chapter, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
                      >
                        <span className="text-sm font-mono text-muted-foreground w-12">{chapter.time}</span>
                        <span className="flex-1 font-medium">{chapter.title}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>

      </div>

    </div>
  )
}
