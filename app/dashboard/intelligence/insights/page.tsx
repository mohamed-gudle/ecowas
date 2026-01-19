"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Sparkles,
  Send,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Lightbulb,
  TrendingUp,
  AlertTriangle,
  Users,
  Loader2,
  MessageSquare,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Header } from "@/components/dashboard/header"

const suggestedQueries = [
  "Top 5 renewable energy opportunities",
  "Summit readiness by country",
  "GDP growth projections 2026",
  "Investment risks analysis",
]

const insightCards = [
  {
    icon: TrendingUp,
    title: "High Growth",
    value: "+40%",
    label: "Digital Economy",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: AlertTriangle,
    title: "Risk Alert",
    value: "3",
    label: "Visa Delays",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Users,
    title: "Confirmed",
    value: "12/15",
    label: "Heads of State",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Sparkles,
    title: "AI Match",
    value: "85%",
    label: "Nigeria-Senegal",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  thinking?: string
}

export default function AIInsightsPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamingText, setStreamingText] = useState("")
  const [thinkingText, setThinkingText] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setIsThinking(true)
    setStreamingText("")
    setThinkingText("")

    const thinkingPhrases = [
      "Analyzing summit data across 15 ECOWAS countries...",
      "Cross-referencing investment opportunities...",
      "Evaluating country readiness scores...",
      "Processing intelligence updates...",
    ]

    let thinkingIndex = 0
    const thinkingInterval = setInterval(() => {
      if (thinkingIndex < thinkingPhrases.length) {
        setThinkingText(thinkingPhrases[thinkingIndex])
        thinkingIndex++
      } else {
        clearInterval(thinkingInterval)
        setIsThinking(false)

        const response = generateAIResponse(input)
        const thinking = getThinkingProcess(input)
        let currentIndex = 0

        const streamInterval = setInterval(() => {
          if (currentIndex < response.length) {
            setStreamingText((prev) => prev + response[currentIndex])
            currentIndex++
          } else {
            clearInterval(streamInterval)
            setMessages((prev) => [
              ...prev,
              {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response,
                thinking: thinking,
                timestamp: new Date(),
              },
            ])
            setStreamingText("")
            setIsLoading(false)
          }
        }, 15)
      }
    }, 600)
  }

  const getThinkingProcess = (query: string): string => {
    if (query.toLowerCase().includes("renewable") || query.toLowerCase().includes("energy")) {
      return "I searched the investment pipeline database, filtered by renewable energy, ranked by AI score and readiness, then cross-referenced with attending investor profiles."
    }
    if (query.toLowerCase().includes("readiness") || query.toLowerCase().includes("status")) {
      return "I aggregated data from accreditation systems, visa processing, delegation confirmations, and logistics readiness across all 15 member states."
    }
    return "I analyzed the summit database, cross-referenced multiple data sources, and synthesized key insights relevant to your query."
  }

  const generateAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("renewable") || query.toLowerCase().includes("energy")) {
      return `Based on my analysis of the ECOWAS investment pipeline, here are the top 5 renewable energy opportunities:\n\n1. **West Africa Solar Corridor** ($1.5B) - Ghana/Senegal\n   - 500MW solar capacity across 3 countries\n   - 60% financing secured from Green Climate Fund\n\n2. **Nigeria Wind Farm Project** ($890M)\n   - 200MW wind capacity in northern Nigeria\n   - PPP structure with local participation\n\n3. **Côte d'Ivoire Hydro Expansion** ($650M)\n   - Expanding existing hydroelectric capacity\n   - AfDB lead financing\n\n4. **Senegal Offshore Wind** ($420M)\n   - First offshore wind project in West Africa\n   - Technical feasibility completed\n\n5. **Ghana Biomass Initiative** ($280M)\n   - Converting agricultural waste to energy\n   - Carbon credit eligible\n\n**Key Insight:** The renewable energy sector has attracted $4.2B in committed investments this year, representing a 45% increase from 2024.`
    }

    if (query.toLowerCase().includes("readiness") || query.toLowerCase().includes("status")) {
      return `Here's the summit readiness analysis for all ECOWAS member states:\n\n**Highly Ready (80%+):**\n- Nigeria: 92% - All systems go\n- Ghana: 88% - Minor logistics pending\n- Senegal: 85% - Visa processing on track\n- Togo: 82% - Delegation confirmed\n\n**Moderate Readiness (60-79%):**\n- Côte d'Ivoire: 78% - Presidential confirmation pending\n- Benin: 72% - Accommodation being finalized\n- Guinea: 65% - Security clearances in progress\n\n**Needs Attention (<60%):**\n- Mali: 58% - Political situation affecting participation\n- Niger: 55% - Delegation size being revised\n- Burkina Faso: 52% - Travel arrangements pending\n\n**Recommendation:** Prioritize outreach to countries below 70% readiness. Consider virtual participation options as backup.`
    }

    return `Thank you for your query about "${query}". Based on my analysis of the summit data:\n\n**Key Findings:**\n1. The ECOWAS region shows strong economic indicators with average GDP growth of 4.2%\n2. Total investment pipeline stands at $32.5B across 338 active opportunities\n3. 12 out of 15 heads of state have confirmed attendance\n\n**Recommendations:**\n- Focus investor matchmaking on high-growth sectors\n- Accelerate visa processing for pending delegations\n- Leverage bilateral meetings for maximum deal closure\n\nWould you like me to elaborate on any of these points?`
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streamingText, thinkingText])

  return (
    <div className="min-h-screen">
      <Header title="AI Insights" subtitle="Intelligent analysis powered by advanced AI" />

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-4">
          {insightCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${card.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <card.icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-2xl font-bold">{card.value}</p>
                      <p className="text-xs text-muted-foreground truncate">{card.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Chat Interface */}
        <Card className="flex flex-col" style={{ height: "calc(100vh - 20rem)" }}>
          <CardHeader className="border-b flex-shrink-0 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg">Summit Intelligence Assistant</CardTitle>
                  <CardDescription className="text-xs">Powered by advanced AI</CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="flex-shrink-0">
                <MessageSquare className="w-3 h-3 mr-1" />
                {messages.length}
              </Badge>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Ask me anything about the summit</h3>
                <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                  I can analyze investment opportunities, track readiness, identify risks, and generate insights.
                </p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-2xl">
                  {suggestedQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start text-xs h-auto py-2.5"
                      onClick={() => setInput(query)}
                    >
                      <Lightbulb className="w-3.5 h-3.5 mr-2 flex-shrink-0 text-primary" />
                      <span className="truncate">{query}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div className={`flex-1 max-w-[75%] ${message.role === "user" ? "ml-auto" : ""}`}>
                        {message.role === "assistant" && message.thinking && (
                          <div className="mb-2 p-2.5 rounded-lg bg-muted/50 border border-border/50">
                            <div className="flex items-center gap-2 mb-1">
                              <Brain className="w-3 h-3 text-primary flex-shrink-0" />
                              <span className="text-xs font-medium text-primary">Thinking</span>
                            </div>
                            <p className="text-xs text-muted-foreground break-words">{message.thinking}</p>
                          </div>
                        )}

                        <div
                          className={`rounded-xl p-4 ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                              : "bg-muted/50 border border-border"
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                        </div>

                        {message.role === "assistant" && (
                          <div className="flex items-center gap-1 mt-2">
                            <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-1.5">
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 px-1.5">
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Retry
                            </Button>
                          </div>
                        )}
                      </div>

                      {message.role === "user" && (
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className="bg-muted text-xs">You</AvatarFallback>
                        </Avatar>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isThinking && thinkingText && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 max-w-[75%]">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-4 h-4 text-primary animate-pulse flex-shrink-0" />
                          <span className="text-xs font-medium text-primary">Thinking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1 flex-shrink-0">
                            {[0, 0.2, 0.4].map((delay, i) => (
                              <motion.div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-primary"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground break-words">{thinkingText}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {isLoading && streamingText && !isThinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 max-w-[75%]">
                      <div className="rounded-xl p-4 bg-muted/50 border border-border">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {streamingText}
                          <motion.span
                            className="inline-block w-0.5 h-4 bg-primary ml-0.5"
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          />
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t flex-shrink-0">
            <div className="flex gap-2">
              <Textarea
                placeholder="Ask about opportunities, readiness, risks..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                className="min-h-[48px] max-h-24 resize-none"
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="h-[48px] px-4 bg-gradient-to-r from-primary to-accent"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are based on summit data. Verify critical information.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
