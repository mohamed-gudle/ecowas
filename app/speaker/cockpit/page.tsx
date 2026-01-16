"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  MessageSquare,
  Users,
  Clock,
  Play,
  Pause,
  SkipForward,
  Settings,
  Maximize2,
  Hand,
  ThumbsUp,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Share2,
  Volume2,
  Wifi,
  Battery,
  FileText,
  Eye,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const slides = [
  { id: 1, title: "Opening & Welcome", thumbnail: "/presentation-slide-welcome.jpg" },
  { id: 2, title: "Climate Crisis Overview", thumbnail: "/presentation-slide-climate-data.jpg" },
  { id: 3, title: "ECOWAS Regional Impact", thumbnail: "/presentation-slide-africa-map.jpg" },
  { id: 4, title: "Key Statistics", thumbnail: "/presentation-slide-statistics-charts.jpg" },
  { id: 5, title: "Action Framework", thumbnail: "/presentation-slide-framework-diagram.jpg" },
  { id: 6, title: "Call to Action", thumbnail: "/presentation-slide-call-to-action.jpg" },
]

const questions = [
  { id: "1", from: "John Mensah", question: "How will this impact small-scale farmers?", votes: 24, time: "2m ago" },
  { id: "2", from: "Fatou Diallo", question: "What funding mechanisms are available?", votes: 18, time: "5m ago" },
  {
    id: "3",
    from: "Kwame Asante",
    question: "Can you elaborate on the regional cooperation aspect?",
    votes: 15,
    time: "8m ago",
  },
]

const reactions = [
  { emoji: "👏", count: 156 },
  { emoji: "💡", count: 89 },
  { emoji: "🔥", count: 67 },
  { emoji: "❤️", count: 45 },
]

export default function SessionCockpit() {
  const [isLive, setIsLive] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(1)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [videoOn, setVideoOn] = useState(true)
  const [micOn, setMicOn] = useState(true)
  const [screenShare, setScreenShare] = useState(false)
  const [showNotes, setShowNotes] = useState(true)
  const [chatMessage, setChatMessage] = useState("")

  // Timer effect
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isLive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const totalDuration = 90 * 60 // 90 minutes
  const progress = (elapsedTime / totalDuration) * 100

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between p-4 bg-card border-b">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isLive ? (
              <Badge className="bg-red-500 text-white animate-pulse gap-2">
                <span className="w-2 h-2 rounded-full bg-white" />
                LIVE
              </Badge>
            ) : (
              <Badge variant="secondary">Standby</Badge>
            )}
            <span className="font-semibold">Opening Ceremony: Climate Action for Africa</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Status Indicators */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-emerald-500" />
              <span className="text-muted-foreground">Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-emerald-500" />
              <span className="text-muted-foreground">98%</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="font-medium">1,847</span>
              <span className="text-muted-foreground">viewers</span>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted">
            <Clock className="w-4 h-4" />
            <span className="font-mono text-lg font-bold">{formatTime(elapsedTime)}</span>
            <span className="text-muted-foreground">/ 90:00</span>
          </div>

          {/* Go Live Button */}
          <Button
            size="lg"
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "gap-2 min-w-[140px]",
              isLive ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-primary to-accent hover:opacity-90",
            )}
          >
            {isLive ? (
              <>
                <Pause className="w-5 h-5" />
                End Session
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Go Live
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Slide Preview & Notes */}
        <div className={cn("flex-1 flex flex-col bg-muted/30", showNotes ? "w-2/3" : "w-full")}>
          {/* Current Slide */}
          <div className="flex-1 flex items-center justify-center p-6">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-4xl aspect-video bg-card rounded-2xl shadow-2xl overflow-hidden"
            >
              <img
                src={slides[currentSlide - 1].thumbnail || "/placeholder.svg"}
                alt={`Slide ${currentSlide}`}
                className="w-full h-full object-cover"
              />
              {/* Slide overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  Slide {currentSlide} of {slides.length}
                </Badge>
                <div className="flex gap-2">
                  <Button size="icon" variant="secondary" className="bg-black/50 hover:bg-black/70 text-white">
                    <Maximize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Slide Navigation */}
          <div className="p-4 border-t bg-card">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentSlide(Math.max(1, currentSlide - 1))}
                disabled={currentSlide === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="flex-1 overflow-x-auto">
                <div className="flex gap-2">
                  {slides.map((slide) => (
                    <button
                      key={slide.id}
                      onClick={() => setCurrentSlide(slide.id)}
                      className={cn(
                        "shrink-0 w-32 rounded-lg overflow-hidden border-2 transition-all",
                        currentSlide === slide.id
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-transparent hover:border-muted-foreground/30",
                      )}
                    >
                      <img
                        src={slide.thumbnail || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full aspect-video object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentSlide(Math.min(slides.length, currentSlide + 1))}
                disabled={currentSlide === slides.length}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <Button variant="outline" className="gap-2 bg-transparent">
                <SkipForward className="w-4 h-4" />
                Auto-advance
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Elapsed: {formatTime(elapsedTime)}</span>
                <span>Remaining: {formatTime(totalDuration - elapsedTime)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l bg-card flex flex-col overflow-hidden"
            >
              <Tabs defaultValue="notes" className="flex-1 flex flex-col">
                <TabsList className="w-full justify-start rounded-none border-b h-12 px-4">
                  <TabsTrigger value="notes" className="gap-2">
                    <FileText className="w-4 h-4" />
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="qa" className="gap-2">
                    <Hand className="w-4 h-4" />
                    Q&A
                    <Badge variant="secondary" className="ml-1">
                      3
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Chat
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="notes" className="flex-1 m-0 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="font-semibold mb-2">
                          Slide {currentSlide}: {slides[currentSlide - 1].title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Key talking points for this slide:
                          {currentSlide === 1 && (
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Welcome distinguished guests and heads of state</li>
                              <li>Acknowledge the urgency of climate action</li>
                              <li>Set the tone for collaborative regional approach</li>
                            </ul>
                          )}
                          {currentSlide === 2 && (
                            <ul className="list-disc list-inside mt-2 space-y-1">
                              <li>Present latest climate data for West Africa</li>
                              <li>Highlight temperature rise projections</li>
                              <li>Emphasize economic impact on agriculture</li>
                            </ul>
                          )}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                          <span className="font-medium text-amber-700">Time Check</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You should be at slide 3 by the 15-minute mark. Currently on track.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="qa" className="flex-1 m-0 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-3">
                      {questions.map((q) => (
                        <div key={q.id} className="p-4 rounded-lg border space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback>{q.from[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium text-sm">{q.from}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{q.time}</span>
                          </div>
                          <p className="text-sm">{q.question}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{q.votes} votes</span>
                            </div>
                            <Button size="sm" variant="outline">
                              Answer
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="chat" className="flex-1 m-0 flex flex-col overflow-hidden">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {/* Sample chat messages */}
                      <div className="flex gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback>TM</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <p className="text-xs font-medium">Technical Support</p>
                          <p className="text-sm">Audio levels are perfect. Stream quality is excellent.</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback>PT</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-lg px-3 py-2">
                          <p className="text-xs font-medium">Programme Team</p>
                          <p className="text-sm">VIP guests are seated. Ready to proceed.</p>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Message to backstage..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                      />
                      <Button size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Control Bar */}
      <div className="p-4 bg-card border-t">
        <div className="flex items-center justify-between">
          {/* Media Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant={micOn ? "default" : "destructive"}
              size="icon"
              onClick={() => setMicOn(!micOn)}
              className={cn(micOn && "bg-primary")}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
            <Button
              variant={videoOn ? "default" : "destructive"}
              size="icon"
              onClick={() => setVideoOn(!videoOn)}
              className={cn(videoOn && "bg-primary")}
            >
              {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </Button>
            <Button
              variant={screenShare ? "default" : "outline"}
              size="icon"
              onClick={() => setScreenShare(!screenShare)}
              className={cn(screenShare && "bg-accent")}
            >
              {screenShare ? <Monitor className="w-5 h-5" /> : <MonitorOff className="w-5 h-5" />}
            </Button>
            <div className="w-px h-8 bg-border mx-2" />
            <div className="flex items-center gap-2 px-3">
              <Volume2 className="w-4 h-4 text-muted-foreground" />
              <Slider defaultValue={[80]} max={100} className="w-24" />
            </div>
          </div>

          {/* Live Reactions */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Live Reactions:</span>
            <div className="flex items-center gap-3">
              {reactions.map((r) => (
                <motion.div
                  key={r.emoji}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, delay: Math.random() }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted"
                >
                  <span>{r.emoji}</span>
                  <span className="text-sm font-medium">{r.count}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowNotes(!showNotes)} className="gap-2">
              <Eye className="w-4 h-4" />
              {showNotes ? "Hide" : "Show"} Panel
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
