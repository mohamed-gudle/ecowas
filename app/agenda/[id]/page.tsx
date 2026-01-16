"use client"

import { useState, use } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Play,
  Download,
  Share2,
  Bookmark,
  BarChart3,
  FileText,
  Video,
  Send,
  ThumbsUp,
  Star,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

// Mock session data - in real app this would come from API
const getSessionById = (id: string) => ({
  id,
  title: "Opening Ceremony: Building Prosperity Across West Africa",
  description:
    "The official opening of the ECOWAS Economic Development Summit, featuring keynote addresses from heads of state and the unveiling of the regional economic development roadmap. This landmark session will set the tone for four days of transformative discussions, negotiations, and deal-making that will shape the future of West Africa's economic development.",
  type: "plenary",
  track: "general",
  day: "January 15, 2026",
  time: "09:00 - 11:00",
  venue: "Main Plenary Hall, Abuja International Conference Centre",
  capacity: 2000,
  registered: 1847,
  isLive: true,
  isFeatured: true,
  objectives: [
    "Welcome delegates and set the strategic vision for the Summit",
    "Present the ECOWAS Regional Economic Development Roadmap 2026-2035",
    "Announce key partnerships and commitments from heads of state",
    "Launch the $50 billion investment mobilization initiative",
  ],
  speakers: [
    {
      name: "H.E. Bola Ahmed Tinubu",
      role: "President of Nigeria",
      bio: "Host of the Summit and current Chair of ECOWAS Authority of Heads of State",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Dr. Omar Alieu Touray",
      role: "President, ECOWAS Commission",
      bio: "Leading the regional integration agenda and economic development initiatives",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Dr. Akinwumi Adesina",
      role: "President, African Development Bank",
      bio: "Champion of Africa's economic transformation and infrastructure development",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Amina J. Mohammed",
      role: "Deputy Secretary-General, United Nations",
      bio: "Leading global sustainable development and climate action initiatives",
      image: "/placeholder.svg?height=200&width=200",
    },
  ],
  documents: [
    { name: "Session Briefing Document", type: "PDF", size: "2.4 MB", icon: FileText },
    { name: "Investment Opportunity Overview", type: "PDF", size: "1.8 MB", icon: FileText },
    { name: "ECOWAS Roadmap Summary", type: "PDF", size: "3.2 MB", icon: FileText },
    { name: "Speaker Presentations", type: "ZIP", size: "15.2 MB", icon: Download },
  ],
  relatedSessions: [
    {
      id: "sess_002",
      title: "Ministerial Roundtable: National Economic Development Plans",
      time: "11:30 - 13:00",
      type: "ministerial",
    },
    { id: "sess_003", title: "Infrastructure Investment Accelerator", time: "14:00 - 16:00", type: "workshop" },
  ],
  stats: {
    watching: 1256,
    questions: 47,
    polls: 3,
  },
})

const typeColors: Record<string, { bg: string; text: string }> = {
  plenary: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  ministerial: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
  breakout: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  workshop: { bg: "bg-green-500/10", text: "text-green-600 dark:text-green-400" },
  networking: { bg: "bg-pink-500/10", text: "text-pink-600 dark:text-pink-400" },
}

export default function SessionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const session = getSessionById(id)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [question, setQuestion] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const questions = [
    {
      id: 1,
      user: "Dr. Fatima Hassan",
      question:
        "What specific mechanisms will be put in place to ensure equitable distribution of investment across all member states?",
      votes: 24,
      time: "2 min ago",
    },
    {
      id: 2,
      user: "Mr. Kofi Mensah",
      question: "How will the roadmap address the digital infrastructure gap in rural areas?",
      votes: 18,
      time: "5 min ago",
    },
    {
      id: 3,
      user: "Ms. Aisha Bello",
      question: "What role will the private sector play in the implementation of the 10-year roadmap?",
      votes: 15,
      time: "8 min ago",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Link */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Link
              href="/agenda"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Agenda
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium capitalize",
                    typeColors[session.type]?.bg,
                    typeColors[session.type]?.text,
                  )}
                >
                  {session.type}
                </span>
                {session.isLive && (
                  <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-red-500 text-white flex items-center gap-2 animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    LIVE NOW
                  </span>
                )}
                {session.isFeatured && (
                  <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary flex items-center gap-1">
                    <Star className="w-4 h-4" /> Featured
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{session.title}</h1>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-6 text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>{session.day}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{session.venue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>
                    {session.registered}/{session.capacity} registered
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                {session.isLive ? (
                  <Button size="lg" className="rounded-full gap-2 bg-red-500 hover:bg-red-600">
                    <Play className="w-5 h-5" />
                    Watch Live Stream
                  </Button>
                ) : (
                  <Button size="lg" className="rounded-full gap-2">
                    <Calendar className="w-5 h-5" />
                    Add to My Agenda
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full gap-2 bg-transparent"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <Bookmark className={cn("w-5 h-5", isBookmarked && "fill-primary text-primary")} />
                  {isBookmarked ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="lg" className="rounded-full gap-2 bg-transparent">
                  <Share2 className="w-5 h-5" />
                  Share
                </Button>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-muted/50 rounded-2xl p-1 mb-8">
                  <TabsTrigger value="overview" className="rounded-xl px-6">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="speakers" className="rounded-xl px-6">
                    Speakers
                  </TabsTrigger>
                  <TabsTrigger value="qa" className="rounded-xl px-6 flex items-center gap-2">
                    Q&A
                    <Badge variant="secondary" className="ml-1">
                      {session.stats.questions}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="polls" className="rounded-xl px-6 flex items-center gap-2">
                    Polls
                    <Badge variant="secondary" className="ml-1">
                      {session.stats.polls}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Session Description</h2>
                    <p className="text-muted-foreground leading-relaxed">{session.description}</p>
                  </div>

                  {/* Objectives */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Key Objectives</h2>
                    <ul className="space-y-3">
                      {session.objectives.map((objective, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">{index + 1}</span>
                          </div>
                          <span>{objective}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Documents */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Session Resources</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {session.documents.map((doc, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-muted/50 rounded-2xl hover:bg-muted transition-colors text-left w-full"
                        >
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <doc.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • {doc.size}
                            </p>
                          </div>
                          <Download className="w-5 h-5 text-muted-foreground" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="speakers" className="space-y-6">
                  {session.speakers.map((speaker, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-6 p-6 bg-card rounded-3xl border border-border"
                    >
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden flex-shrink-0">
                        <Image
                          src={speaker.image || "/placeholder.svg"}
                          alt={speaker.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{speaker.name}</h3>
                        <p className="text-primary font-medium mb-3">{speaker.role}</p>
                        <p className="text-muted-foreground text-sm">{speaker.bio}</p>
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="qa" className="space-y-6">
                  {/* Submit Question */}
                  <div className="bg-muted/50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4">Ask a Question</h3>
                    <Textarea
                      placeholder="Type your question for the speakers..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="mb-4 min-h-[100px] rounded-xl"
                    />
                    <Button className="rounded-full gap-2">
                      <Send className="w-4 h-4" />
                      Submit Question
                    </Button>
                  </div>

                  {/* Questions List */}
                  <div className="space-y-4">
                    {questions.map((q, index) => (
                      <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card rounded-2xl border border-border p-5"
                      >
                        <div className="flex items-start gap-4">
                          <Button variant="ghost" size="sm" className="flex-col h-auto py-2 px-3 rounded-xl">
                            <ThumbsUp className="w-5 h-5 mb-1" />
                            <span className="text-xs">{q.votes}</span>
                          </Button>
                          <div className="flex-1">
                            <p className="mb-2">{q.question}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="font-medium">{q.user}</span>
                              <span>•</span>
                              <span>{q.time}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="polls" className="space-y-6">
                  <div className="bg-muted/50 rounded-2xl p-6 text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-bold mb-2">Live Polls Coming Soon</h3>
                    <p className="text-muted-foreground">Polls will be available during the live session</p>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Sidebar */}
            <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              {/* Live Stats */}
              {session.isLive && (
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl border border-red-500/20 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                    </div>
                    <span className="font-bold text-red-500">Live Now</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">This session is currently streaming live.</p>
                  <Button className="w-full rounded-full bg-red-500 hover:bg-red-600 gap-2">
                    <Video className="w-5 h-5" />
                    Watch Live Stream
                  </Button>
                </div>
              )}

              {/* Session Stats */}
              <div className="bg-card rounded-3xl border border-border p-6">
                <h3 className="font-bold mb-4">Session Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Registered</span>
                    <span className="font-bold">
                      {session.registered} / {session.capacity}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(session.registered / session.capacity) * 100}%` }}
                    />
                  </div>
                  {session.isLive && (
                    <>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-muted-foreground">Watching</span>
                        <span className="font-bold text-green-500">{session.stats.watching}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Questions</span>
                        <span className="font-bold">{session.stats.questions}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Related Sessions */}
              <div className="bg-card rounded-3xl border border-border p-6">
                <h3 className="font-bold mb-4">Related Sessions</h3>
                <div className="space-y-4">
                  {session.relatedSessions.map((related, index) => (
                    <Link key={index} href={`/agenda/${related.id}`}>
                      <div className="group flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                        <span
                          className={cn(
                            "px-2 py-1 rounded-lg text-xs font-medium capitalize",
                            typeColors[related.type]?.bg,
                            typeColors[related.type]?.text,
                          )}
                        >
                          {related.type}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {related.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{related.time}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
