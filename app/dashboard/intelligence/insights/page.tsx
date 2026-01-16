"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
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
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

const suggestedQueries = [
  "What are the top 5 investment opportunities in renewable energy across ECOWAS?",
  "Summarize the readiness status of all member countries for the summit",
  "Which countries have the highest GDP growth projections for 2026?",
  "Identify potential risks to the summit's investment targets",
  "Compare infrastructure investment needs between coastal and landlocked countries",
]

const insightCards = [
  {
    type: "opportunity",
    icon: TrendingUp,
    title: "High-Growth Sectors",
    description: "Digital Economy and Renewable Energy show 40% YoY growth in investor interest",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    type: "risk",
    icon: AlertTriangle,
    title: "Risk Alert",
    description: "3 countries showing delayed visa processing - may impact delegation attendance",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    type: "insight",
    icon: Lightbulb,
    title: "AI Recommendation",
    description: "Schedule bilateral meetings between Nigeria and Senegal investors - 85% match rate",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    type: "stat",
    icon: Users,
    title: "Delegation Update",
    description: "12 Heads of State confirmed, 3 pending - highest attendance in 5 years",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function AIInsightsPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamingText, setStreamingText] = useState("")
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
    setStreamingText("")

    // Simulate AI streaming response
    const response = generateAIResponse(input)
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
            timestamp: new Date(),
          },
        ])
        setStreamingText("")
        setIsLoading(false)
      }
    }, 20)
  }

  const generateAIResponse = (query: string): string => {
    // Simulated AI responses based on query keywords
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
  }, [messages, streamingText])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold">AI Insights</h1>
            <Badge className="bg-gradient-to-r from-primary to-accent text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Beta
            </Badge>
          </div>
          <p className="text-muted-foreground">Ask questions about summit data, opportunities, and intelligence</p>
        </div>
      </div>

      {/* Quick Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center mb-3`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h4 className="font-semibold text-sm mb-1">{card.title}</h4>
                <p className="text-xs text-muted-foreground">{card.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chat Interface */}
      <Card className="flex flex-col h-[600px]">
        <CardHeader className="border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg">Summit Intelligence Assistant</CardTitle>
              <CardDescription>Powered by advanced AI for real-time summit insights</CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ask me anything about the summit</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-md">
                I can help you analyze investment opportunities, track country readiness, identify risks, and generate
                insights from summit data.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl">
                {suggestedQueries.map((query, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs bg-transparent"
                    onClick={() => setInput(query)}
                  >
                    {query.length > 50 ? query.substring(0, 50) + "..." : query}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`rounded-2xl p-4 max-w-[80%] ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <Copy className="w-3 h-3 mr-1" />
                          Copy
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Helpful
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <ThumbsDown className="w-3 h-3 mr-1" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Regenerate
                        </Button>
                      </div>
                    )}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-muted text-xs">You</AvatarFallback>
                    </Avatar>
                  )}
                </motion.div>
              ))}

              {/* Streaming Response */}
              {isLoading && streamingText && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl p-4 max-w-[80%] bg-muted">
                    <p className="text-sm whitespace-pre-wrap">{streamingText}</p>
                    <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" />
                  </div>
                </motion.div>
              )}

              {/* Loading Indicator */}
              {isLoading && !streamingText && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-2xl p-4 bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Analyzing summit data...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask about investment opportunities, country readiness, risks..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              className="min-h-[48px] max-h-32 resize-none"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-primary to-accent text-white"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AI responses are generated based on summit data. Always verify critical information.
          </p>
        </div>
      </Card>
    </div>
  )
}
