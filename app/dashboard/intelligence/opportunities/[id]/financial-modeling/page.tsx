"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { notFound, useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    ArrowLeft,
    Brain,
    Calculator,
    Send,
    User,
    Bot,
    Sparkles,
    Lightbulb,
    Download,
    RefreshCw,
    FileSpreadsheet,
    Loader2,
    TrendingUp,
    DollarSign,
    Target,
    BarChart3,
    Zap,
    Leaf,
    Cpu,
    Truck,
    Factory,
    Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useFinancialAgentStore } from "@/lib/financial-agent-store"
import {
    generateProjections,
    calculateNPV,
    calculateIRR,
    calculatePaybackPeriod,
    calculateTerminalValue,
    runSensitivityAnalysis,
    getDefaultAssumptions,
    parseInvestmentValue,
    formatCurrency,
} from "@/lib/financial-utils"
import { FinancialModelViewer } from "@/components/financial-model-viewer"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"

// Types for our simple chat implementation
interface ChatMessage {
    id: string
    role: "user" | "assistant"
    content: string
}

// Simple markdown renderer component
function MarkdownContent({ content }: { content: string }) {
    return (
        <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
                table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                        <table className="min-w-full border-collapse border border-border text-sm">
                            {children}
                        </table>
                    </div>
                ),
                th: ({ children }) => (
                    <th className="border border-border bg-muted/50 px-3 py-2 text-left font-medium">
                        {children}
                    </th>
                ),
                td: ({ children }) => (
                    <td className="border border-border px-3 py-2">{children}</td>
                ),
                code: ({ children, className }) => {
                    const isBlock = className?.includes("language-")
                    return isBlock ? (
                        <code className={cn("block bg-muted p-3 rounded text-xs overflow-x-auto", className)}>
                            {children}
                        </code>
                    ) : (
                        <code className="bg-muted/50 px-1.5 py-0.5 rounded text-xs">{children}</code>
                    )
                },
                strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                ),
                ul: ({ children }) => <ul className="list-disc pl-4 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-4 space-y-1">{children}</ol>,
                h1: ({ children }) => <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold mt-4 mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold mt-3 mb-1">{children}</h3>,
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            }}
        >
            {content}
        </Markdown>
    )
}

// Same opportunity data
const opportunities = [
    {
        id: 1,
        title: "West Africa Power Pool Phase III",
        description: "Interconnection of power grids across 8 ECOWAS countries to enable cross-border electricity trade",
        value: "$8.5B",
        sector: "energy",
        countries: ["Nigeria", "Ghana", "Benin", "Togo", "Côte d'Ivoire", "Burkina Faso", "Niger", "Mali"],
        readiness: 85,
        stage: "bankable",
        investors: 12,
        gap: "Financing gap of $2.1B for transmission infrastructure",
        aiScore: 94,
        tags: ["Regional", "Infrastructure", "Priority"],
        timeline: {
            start: "2027 Q1",
            construction: "4 years",
            operations: "2031 Q1",
            projectLife: "25 years"
        }
    },
    {
        id: 2,
        title: "Lagos-Abidjan Highway Corridor",
        description: "Modernization of the 1,000km coastal highway connecting major West African cities",
        value: "$4.2B",
        sector: "transport",
        countries: ["Nigeria", "Benin", "Togo", "Ghana", "Côte d'Ivoire"],
        readiness: 72,
        stage: "feasibility",
        investors: 8,
        gap: "PPP structuring and environmental impact assessment pending",
        aiScore: 88,
        tags: ["Corridor", "Trade", "High-Impact"],
        timeline: {
            start: "2027 Q3",
            construction: "5 years",
            operations: "2032 Q3",
            projectLife: "30 years"
        }
    },
    {
        id: 3,
        title: "ECOWAS Digital Identity Framework",
        description: "Pan-regional digital identity system for seamless cross-border movement and services",
        value: "$1.8B",
        sector: "digital",
        countries: ["All ECOWAS"],
        readiness: 65,
        stage: "concept",
        investors: 15,
        gap: "Policy harmonization across member states required",
        aiScore: 82,
        tags: ["Digital", "Regional Integration", "Innovative"],
        timeline: {
            start: "2027 Q2",
            construction: "2 years",
            operations: "2029 Q2",
            projectLife: "15 years"
        }
    },
    {
        id: 4,
        title: "Sahel Solar Initiative",
        description: "Large-scale solar farms across Sahel countries with battery storage",
        value: "$3.2B",
        sector: "energy",
        countries: ["Niger", "Mali", "Burkina Faso", "Senegal"],
        readiness: 58,
        stage: "pre-feasibility",
        investors: 6,
        gap: "Grid infrastructure upgrades needed for power evacuation",
        aiScore: 79,
        tags: ["Renewable", "Climate", "Development"],
        timeline: {
            start: "2028 Q1",
            construction: "3 years",
            operations: "2031 Q1",
            projectLife: "25 years"
        }
    },
    {
        id: 5,
        title: "West African Agro-Processing Hubs",
        description: "Network of agricultural processing facilities to add value to regional produce",
        value: "$2.4B",
        sector: "agriculture",
        countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal"],
        readiness: 45,
        stage: "concept",
        investors: 4,
        gap: "Cold chain logistics and quality standards harmonization",
        aiScore: 75,
        tags: ["Food Security", "Value Chain", "SME"],
        timeline: {
            start: "2027 Q4",
            construction: "2.5 years",
            operations: "2030 Q2",
            projectLife: "20 years"
        }
    },
]

const sectorIcons: Record<string, React.ElementType> = {
    energy: Zap,
    transport: Truck,
    digital: Cpu,
    agriculture: Leaf,
    industry: Factory,
}

const suggestedPrompts = [
    "Build a DCF model for this opportunity with 10-year projections",
    "What IRR can investors expect? Run a sensitivity analysis",
    "Analyze the risk factors and their impact on returns",
    "Compare this to similar infrastructure projects in the region",
    "What financing structure would you recommend (debt/equity mix)?",
]

export default function FinancialModelingAgentPage() {
    const params = useParams()
    const router = useRouter()
    const opportunityId = Number(params.id)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [showModel, setShowModel] = useState(false)

    // Chat state - managed locally since AI SDK v6 API changed significantly
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const opportunity = opportunities.find((o) => o.id === opportunityId)

    const {
        startConversation,
        addMessage,
        researchPhase,
        updateResearchPhase,
        saveModel,
        currentConversationId,
        getConversation,
        isGenerating,
        setIsGenerating,
    } = useFinancialAgentStore()

    // Initialize conversation
    useEffect(() => {
        if (opportunity && !currentConversationId) {
            startConversation(String(opportunityId), "financial-modeling")
        }
    }, [opportunity, opportunityId, currentConversationId, startConversation])

    // Send message to API
    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim() || isLoading) return

        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: content.trim()
        }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const response = await fetch("/api/financial-agent/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                    opportunityContext: opportunity
                })
            })

            if (!response.ok) throw new Error("Failed to get response")

            const reader = response.body?.getReader()
            if (!reader) throw new Error("No reader available")

            const decoder = new TextDecoder()
            let assistantContent = ""
            const assistantId = crypto.randomUUID()

            // Add empty assistant message that we'll update
            setMessages(prev => [...prev, { id: assistantId, role: "assistant", content: "" }])

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                // Plain text stream - just append the chunk directly
                const chunk = decoder.decode(value, { stream: true })
                assistantContent += chunk
                setMessages(prev =>
                    prev.map(m => m.id === assistantId ? { ...m, content: assistantContent } : m)
                )
            }

            // Check if response mentions financial metrics
            if (assistantContent.includes("NPV") || assistantContent.includes("IRR")) {
                generateModel()
            }
        } catch (error) {
            console.error("Chat error:", error)
            setMessages(prev => [...prev, {
                id: crypto.randomUUID(),
                role: "assistant",
                content: "I apologize, but I encountered an error processing your request. Please try again."
            }])
        } finally {
            setIsLoading(false)
        }
    }, [messages, opportunity, isLoading])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendMessage(input)
    }

    const handleSuggestionClick = (prompt: string) => {
        if (isLoading) return
        sendMessage(prompt)
    }

    const currentConversation = currentConversationId ? getConversation(currentConversationId) : null

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const generateModel = () => {
        if (!opportunity) return

        setIsGenerating(true)
        updateResearchPhase({ status: "analyzing", currentStep: "Analyzing opportunity data...", progress: 20 })

        setTimeout(() => {
            updateResearchPhase({ status: "benchmarking", currentStep: "Benchmarking sector comparables...", progress: 50 })
        }, 1000)

        setTimeout(() => {
            updateResearchPhase({ status: "calculating", currentStep: "Building financial projections...", progress: 80 })
        }, 2000)

        setTimeout(() => {
            // Generate actual model
            const investmentValue = parseInvestmentValue(opportunity.value)
            const assumptions = getDefaultAssumptions(opportunity.sector)

            // Estimate initial revenue based on investment and margin
            const initialRevenue = investmentValue * 0.15 // 15% of investment as initial annual revenue

            const projections = generateProjections(initialRevenue, investmentValue * 0.7, assumptions)
            const cashFlows = projections.map((p) => p.freeCashFlow)
            const npv = calculateNPV(cashFlows, assumptions.discountRate)
            const irr = calculateIRR(cashFlows)
            const paybackPeriod = calculatePaybackPeriod(cashFlows)
            const terminalValue = calculateTerminalValue(
                cashFlows[cashFlows.length - 1],
                assumptions.terminalGrowthRate,
                assumptions.discountRate
            )
            const sensitivityAnalysis = runSensitivityAnalysis(projections, assumptions.discountRate, assumptions.growthRate)

            const model = {
                id: crypto.randomUUID(),
                opportunityId: String(opportunityId),
                opportunityTitle: opportunity.title,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                assumptions,
                projections,
                metrics: {
                    npv,
                    irr,
                    paybackPeriod,
                    profitabilityIndex: npv / (investmentValue * 0.7),
                    wacc: assumptions.discountRate,
                    terminalValue,
                    enterpriseValue: npv + terminalValue / Math.pow(1 + assumptions.discountRate, assumptions.projectYears),
                },
                sensitivityAnalysis,
                narrative: "",
            }

            if (currentConversationId) {
                saveModel(currentConversationId, model)
            }

            updateResearchPhase({
                status: "complete",
                currentStep: "Financial model generated successfully!",
                progress: 100,
                findings: [
                    `NPV: ${formatCurrency(npv)}`,
                    `IRR: ${(irr * 100).toFixed(1)}%`,
                    `Payback: ${paybackPeriod.toFixed(1)} years`,
                ],
            })

            setShowModel(true)
            setIsGenerating(false)
        }, 3000)
    }

    const handleExportExcel = async () => {
        const conversation = currentConversationId ? getConversation(currentConversationId) : null
        if (!conversation?.model) return

        try {
            const response = await fetch("/api/financial-agent/export", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(conversation.model),
            })

            if (!response.ok) throw new Error("Export failed")

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = `${opportunity?.title.replace(/[^a-z0-9]/gi, "_")}_Financial_Model.xlsx`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error("Export error:", error)
        }
    }

    if (!opportunity) {
        notFound()
    }

    const SectorIcon = sectorIcons[opportunity.sector] || Globe

    return (
        <div className="min-h-screen">
            <Header
                title="Financial Modelling Agent"
                subtitle={`Analyzing: ${opportunity.title}`}
            />

            <div className="p-4">
                {/* Back Button */}
                <div className="flex items-center justify-between mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/intelligence/opportunities/${opportunityId}`)}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Opportunity
                    </Button>

                    {/* Model Actions */}
                    {currentConversation?.model && (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => setShowModel(!showModel)}
                            >
                                <BarChart3 className="w-4 h-4" />
                                {showModel ? "Hide Model" : "View Model"}
                            </Button>
                            <Button
                                size="sm"
                                className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                onClick={handleExportExcel}
                            >
                                <Download className="w-4 h-4" />
                                Download Excel Model
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Chat Interface */}
                    <div className="lg:col-span-2">
                        <Card className="h-[calc(100vh-12rem)] flex flex-col overflow-hidden">
                            {/* Chat Header */}
                            <CardHeader className="border-b py-3 shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                        <Calculator className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">Financial Modelling Agent</CardTitle>
                                        <p className="text-xs text-muted-foreground">Powered by GPT-4o • Deep Financial Analysis</p>
                                    </div>
                                    {isGenerating && (
                                        <Badge variant="outline" className="ml-auto animate-pulse bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
                                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                            Generating Model...
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4">
                                {messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center text-center py-8">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-600/20 flex items-center justify-center mb-4">
                                            <Sparkles className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <h3 className="text-lg font-semibold mb-2">Financial Analysis Ready</h3>
                                        <p className="text-muted-foreground mb-6 max-w-md">
                                            I can help you build comprehensive financial models, calculate returns, and analyze investment
                                            viability for {opportunity.title}.
                                        </p>

                                        {/* Opportunity Summary Card */}
                                        <div className="w-full max-w-xl mb-6 p-4 rounded-xl bg-muted/50 border text-left">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <SectorIcon className="w-5 h-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{opportunity.title}</p>
                                                    <p className="text-sm text-muted-foreground">{opportunity.sector} • {opportunity.value}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3 text-sm">
                                                <div>
                                                    <p className="text-muted-foreground">Readiness</p>
                                                    <p className="font-medium">{opportunity.readiness}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">Stage</p>
                                                    <p className="font-medium capitalize">{opportunity.stage}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground">AI Score</p>
                                                    <p className="font-medium">{opportunity.aiScore}/100</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-2 w-full max-w-xl">
                                            {suggestedPrompts.map((prompt, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    className="justify-start text-left h-auto py-3 px-4 bg-transparent hover:bg-emerald-500/5 hover:border-emerald-500/30"
                                                    onClick={() => handleSuggestionClick(prompt)}
                                                    disabled={isLoading}
                                                >
                                                    <Lightbulb className="w-4 h-4 mr-3 text-emerald-500 flex-shrink-0" />
                                                    <span className="text-sm">{prompt}</span>
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
                                                className={cn("flex gap-3", message.role === "user" && "justify-end")}
                                            >
                                                {message.role === "assistant" && (
                                                    <Avatar className="w-8 h-8 flex-shrink-0">
                                                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                                                            <Bot className="w-4 h-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div
                                                    className={cn(
                                                        "max-w-[85%] rounded-lg p-4",
                                                        message.role === "user"
                                                            ? "bg-primary text-primary-foreground"
                                                            : "bg-muted"
                                                    )}
                                                >
                                                    {message.role === "user" ? (
                                                        <p className="text-sm">{message.content}</p>
                                                    ) : (
                                                        <div className="prose prose-sm dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                                                            <MarkdownContent content={message.content} />
                                                        </div>
                                                    )}
                                                </div>
                                                {message.role === "user" && (
                                                    <Avatar className="w-8 h-8 flex-shrink-0">
                                                        <AvatarFallback className="bg-secondary">
                                                            <User className="w-4 h-4" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                            </motion.div>
                                        ))}

                                        {/* Loading indicator */}
                                        {isLoading && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                                                        <Bot className="w-4 h-4" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="bg-muted rounded-lg p-4">
                                                    <div className="flex gap-1">
                                                        <span
                                                            className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce"
                                                            style={{ animationDelay: "0ms" }}
                                                        />
                                                        <span
                                                            className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce"
                                                            style={{ animationDelay: "150ms" }}
                                                        />
                                                        <span
                                                            className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce"
                                                            style={{ animationDelay: "300ms" }}
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                )}
                            </div>

                            {/* Research Phase Indicator */}
                            {researchPhase.status !== "idle" && researchPhase.status !== "complete" && (
                                <div className="px-4 pb-2">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-emerald-600">{researchPhase.currentStep}</p>
                                                <div className="mt-1 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-emerald-500"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${researchPhase.progress}%` }}
                                                        transition={{ duration: 0.5 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            )}

                            {/* Input */}
                            <div className="p-4 border-t shrink-0 bg-background">
                                <form onSubmit={handleSubmit} className="flex gap-2">
                                    <Textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about financial modeling, valuation, or investment analysis..."
                                        className="flex-1 min-h-[44px] max-h-32 resize-none"
                                        rows={1}
                                        disabled={isLoading}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault()
                                                handleSubmit(e as unknown as React.FormEvent)
                                            }
                                        }}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isLoading || !(input && input.trim())}
                                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4 overflow-y-auto min-h-0">
                        {/* Model Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Target className="w-5 h-5 text-primary" />
                                    Model Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {currentConversation?.model ? (
                                    <div className="space-y-4">
                                        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                                            <p className="text-sm font-medium text-emerald-600">Model Generated ✓</p>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">NPV</span>
                                                <span className="font-bold text-primary">
                                                    {formatCurrency(currentConversation.model.metrics.npv)}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">IRR</span>
                                                <span className="font-bold text-emerald-500">
                                                    {(currentConversation.model.metrics.irr * 100).toFixed(1)}%
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">Payback</span>
                                                <span className="font-bold">
                                                    {currentConversation.model.metrics.paybackPeriod.toFixed(1)} yrs
                                                </span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full gap-2"
                                            onClick={handleExportExcel}
                                        >
                                            <Download className="w-4 h-4" />
                                            Download Excel
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                                            <Calculator className="w-6 h-6 text-muted-foreground" />
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            No model generated yet. Start a conversation to build your financial model.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start gap-2"
                                    onClick={() => handleSuggestionClick("Generate a complete financial model with 10-year projections")}
                                    disabled={isLoading}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    Generate Full Model
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start gap-2"
                                    onClick={() => handleSuggestionClick("What are the key risk factors for this investment?")}
                                    disabled={isLoading}
                                >
                                    <Target className="w-4 h-4" />
                                    Analyze Risks
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start gap-2"
                                    onClick={() => handleSuggestionClick("Run sensitivity analysis on discount rate and growth")}
                                    disabled={isLoading}
                                >
                                    <BarChart3 className="w-4 h-4" />
                                    Sensitivity Analysis
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full justify-start gap-2"
                                    onClick={() => handleSuggestionClick("Recommend optimal financing structure")}
                                    disabled={isLoading}
                                >
                                    <DollarSign className="w-4 h-4" />
                                    Financing Structure
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Context Info */}
                        <Card className="bg-muted/50">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Brain className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium">AI Context</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    The agent has context about this opportunity including sector benchmarks, ECOWAS market conditions,
                                    and typical financing structures for {opportunity.sector} projects.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Financial Model Viewer Modal/Expanded */}
                {showModel && currentConversation?.model && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6"
                    >
                        <FinancialModelViewer model={currentConversation.model} />
                    </motion.div>
                )}
            </div>
        </div>
    )
}
