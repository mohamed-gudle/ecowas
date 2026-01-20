"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bot, Send, X, Loader2, Sparkles, User, Paperclip, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
    context?: string
}

interface PMAgentChatProps {
    isOpen: boolean
    onClose: () => void
    currentTeam: string
}

export function PMAgentChat({ isOpen, onClose, currentTeam }: PMAgentChatProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: `Hello! I'm your PM Agent for the **${currentTeam} Team**. I have access to your team's emails, meeting recordings, and chats. How can I help you today?`,
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Reset greeting when team changes
        setMessages([
            {
                id: "1",
                role: "assistant",
                content: `Hello! I'm your PM Agent for the **${currentTeam} Team**. I have access to your team's emails, meeting recordings, and chats. How can I help you today?`,
            },
        ])
    }, [currentTeam])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/pm-agent/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                    team: currentTeam,
                }),
            })

            if (!response.ok) throw new Error("Failed to fetch response")

            const reader = response.body?.getReader()
            if (!reader) throw new Error("No reader available")

            const decoder = new TextDecoder()
            let assistantContent = ""
            const assistantId = (Date.now() + 1).toString()

            setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }])

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })
                assistantContent += chunk

                setMessages(prev =>
                    prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m)
                )
            }

        } catch (error) {
            console.error("Error in chat:", error)
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "Sorry, I encountered an error processing your request.",
                },
            ])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    className="fixed right-0 top-0 h-screen w-96 bg-background border-l border-border shadow-xl z-50 flex flex-col"
                >
                    {/* Header */}
                    <div className="h-14 border-b flex items-center justify-between px-4 bg-muted/30">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">PM Agent</h3>
                                <p className="text-xs text-muted-foreground">{currentTeam} Context</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn(
                                    "flex gap-3",
                                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                    {message.role === "assistant" ? (
                                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                            <Bot className="w-4 h-4" />
                                        </AvatarFallback>
                                    ) : (
                                        <AvatarFallback className="bg-primary text-primary-foreground">
                                            <User className="w-4 h-4" />
                                        </AvatarFallback>
                                    )}
                                </Avatar>

                                <div className={cn(
                                    "rounded-lg p-3 text-sm max-w-[85%]",
                                    message.role === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted border border-border"
                                )}>
                                    {/* Render markdown-like content simply for now */}
                                    <div style={{ whiteSpace: "pre-wrap" }}>
                                        {message.content.split("**").map((part, i) =>
                                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                                        <Bot className="w-4 h-4" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="bg-muted border border-border rounded-lg p-3 flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                                    <span className="text-xs text-muted-foreground">Analysing context...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t bg-background">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about tasks, emails, meetings..."
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700">
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                        <div className="mt-2 flex gap-4 text-xs text-muted-foreground justify-center">
                            <div className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-indigo-500" />
                                <span>Context Aware</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
