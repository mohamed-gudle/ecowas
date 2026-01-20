"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useSchedulingAgentStore } from "@/lib/scheduling-agent-store"
import { venues, sessions } from "@/lib/programme-data"
import ReactMarkdown from "react-markdown"

interface AgentInterfaceProps {
    className?: string
}

export function AgentInterface({ className }: AgentInterfaceProps) {
    const {
        conversations,
        currentConversationId,
        isGenerating,
        addMessage,
        setIsGenerating,
        startConversation,
        getConversation,
    } = useSchedulingAgentStore()

    const [input, setInput] = useState("")
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Initialize conversation if needed
    useEffect(() => {
        if (!currentConversationId) {
            startConversation()
        }
    }, [currentConversationId, startConversation])

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [conversations, currentConversationId, isGenerating])

    const activeConversation = currentConversationId ? getConversation(currentConversationId) : null

    const handleSend = async () => {
        if (!input.trim() || !currentConversationId) return

        const userMessage = input.trim()
        setInput("")
        addMessage(currentConversationId, { role: "user", content: userMessage })
        setIsGenerating(true)

        try {
            const response = await fetch("/api/scheduling-agent/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: activeConversation?.messages.concat({
                        role: "user",
                        content: userMessage,
                        id: crypto.randomUUID(),
                        timestamp: new Date().toISOString(),
                    }),
                    programmeContext: {
                        sessions,
                        venues,
                    },
                }),
            })

            if (!response.ok) throw new Error("Failed to send message")

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let assistantMessage = ""

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    const text = decoder.decode(value)
                    assistantMessage += text
                }
            }

            addMessage(currentConversationId, { role: "assistant", content: assistantMessage })
        } catch (error) {
            console.error("Chat error:", error)
            addMessage(currentConversationId, {
                role: "assistant",
                content: "I'm sorry, I encountered an error while processing your request. Please try again.",
            })
        } finally {
            setIsGenerating(false)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className={`flex flex-col h-full ${className}`}>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                <div className="space-y-4">
                    {/* Welcome Message */}
                    <div className="flex gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                            <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex flex-col gap-1 max-w-[85%]">
                            <span className="text-xs font-semibold text-muted-foreground">Assistant</span>
                            <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-sm text-sm">
                                Hello! I'm your scheduling assistant. I can help you map sessions to rooms, check for capacity conflicts, or suggest signages. What can I do for you today?
                            </div>
                        </div>
                    </div>

                    {activeConversation?.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                        >
                            <div
                                className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === "user" ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"
                                    }`}
                            >
                                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>
                            <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                <span className="text-xs font-semibold text-muted-foreground">
                                    {msg.role === "user" ? "You" : "Assistant"}
                                </span>
                                <div
                                    className={`p-3 rounded-2xl text-sm ${msg.role === "user"
                                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                                        : "bg-muted/50 rounded-tl-sm prose prose-sm dark:prose-invert max-w-none"
                                        }`}
                                >
                                    {msg.role === "user" ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                                </div>
                            </div>
                        </div>
                    ))}

                    {isGenerating && (
                        <div className="flex gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                                <Bot className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold text-muted-foreground">Assistant</span>
                                <div className="bg-muted/50 p-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span className="text-xs text-muted-foreground">Thinking...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-background mt-auto">
                <div className="relative">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about room capacity, conflicts, signs..."
                        className="pr-12 py-6"
                        disabled={isGenerating}
                    />
                    <Button
                        size="icon"
                        className="absolute right-1 top-1 h-10 w-10"
                        onClick={handleSend}
                        disabled={!input.trim() || isGenerating}
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    AI can make mistakes. Please verify important schedule changes.
                </p>
            </div>
        </div>
    )
}
