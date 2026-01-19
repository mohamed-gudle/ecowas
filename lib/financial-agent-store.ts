"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface FinancialAssumptions {
    discountRate: number
    growthRate: number
    terminalGrowthRate: number
    taxRate: number
    inflationRate: number
    projectYears: number
    constructionPeriod: number
    operatingMargin: number
    capexIntensity: number
    workingCapitalDays: number
}

export interface YearlyProjection {
    year: number
    revenue: number
    operatingCosts: number
    ebitda: number
    depreciation: number
    ebit: number
    taxes: number
    netIncome: number
    capex: number
    workingCapitalChange: number
    freeCashFlow: number
    discountedCashFlow: number
}

export interface SensitivityScenario {
    name: string
    discountRate: number
    growthRate: number
    npv: number
    irr: number
}

export interface FinancialModel {
    id: string
    opportunityId: string
    opportunityTitle: string
    createdAt: string
    updatedAt: string
    assumptions: FinancialAssumptions
    projections: YearlyProjection[]
    metrics: {
        npv: number
        irr: number
        paybackPeriod: number
        profitabilityIndex: number
        wacc: number
        terminalValue: number
        enterpriseValue: number
    }
    sensitivityAnalysis: SensitivityScenario[]
    narrative: string
}

export interface AgentMessage {
    id: string
    role: "user" | "assistant" | "system"
    content: string
    timestamp: string
    metadata?: {
        phase?: "research" | "modeling" | "analysis" | "complete"
        modelData?: Partial<FinancialModel>
    }
}

export interface Conversation {
    id: string
    opportunityId: string
    agentType: "financial-modeling" | "prefeasibility" | "stakeholder-outreach"
    messages: AgentMessage[]
    createdAt: string
    updatedAt: string
    model?: FinancialModel
}

export interface ResearchPhase {
    status: "idle" | "analyzing" | "benchmarking" | "calculating" | "complete"
    currentStep: string
    progress: number
    findings: string[]
}

interface FinancialAgentState {
    conversations: Conversation[]
    currentConversationId: string | null
    researchPhase: ResearchPhase
    isGenerating: boolean

    // Actions
    startConversation: (opportunityId: string, agentType: Conversation["agentType"]) => string
    addMessage: (conversationId: string, message: Omit<AgentMessage, "id" | "timestamp">) => void
    updateResearchPhase: (phase: Partial<ResearchPhase>) => void
    saveModel: (conversationId: string, model: FinancialModel) => void
    setCurrentConversation: (conversationId: string | null) => void
    setIsGenerating: (value: boolean) => void
    getConversation: (conversationId: string) => Conversation | undefined
    getConversationsForOpportunity: (opportunityId: string) => Conversation[]
    clearConversation: (conversationId: string) => void
}

export const useFinancialAgentStore = create<FinancialAgentState>()(
    persist(
        (set, get) => ({
            conversations: [],
            currentConversationId: null,
            researchPhase: {
                status: "idle",
                currentStep: "",
                progress: 0,
                findings: [],
            },
            isGenerating: false,

            startConversation: (opportunityId, agentType) => {
                const id = crypto.randomUUID()
                const conversation: Conversation = {
                    id,
                    opportunityId,
                    agentType,
                    messages: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
                set((state) => ({
                    conversations: [...state.conversations, conversation],
                    currentConversationId: id,
                }))
                return id
            },

            addMessage: (conversationId, message) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? {
                                ...conv,
                                messages: [
                                    ...conv.messages,
                                    {
                                        ...message,
                                        id: crypto.randomUUID(),
                                        timestamp: new Date().toISOString(),
                                    },
                                ],
                                updatedAt: new Date().toISOString(),
                            }
                            : conv
                    ),
                }))
            },

            updateResearchPhase: (phase) => {
                set((state) => ({
                    researchPhase: { ...state.researchPhase, ...phase },
                }))
            },

            saveModel: (conversationId, model) => {
                set((state) => ({
                    conversations: state.conversations.map((conv) =>
                        conv.id === conversationId
                            ? { ...conv, model, updatedAt: new Date().toISOString() }
                            : conv
                    ),
                }))
            },

            setCurrentConversation: (conversationId) => {
                set({ currentConversationId: conversationId })
            },

            setIsGenerating: (value) => {
                set({ isGenerating: value })
            },

            getConversation: (conversationId) => {
                return get().conversations.find((c) => c.id === conversationId)
            },

            getConversationsForOpportunity: (opportunityId) => {
                return get().conversations.filter((c) => c.opportunityId === opportunityId)
            },

            clearConversation: (conversationId) => {
                set((state) => ({
                    conversations: state.conversations.filter((c) => c.id !== conversationId),
                    currentConversationId:
                        state.currentConversationId === conversationId ? null : state.currentConversationId,
                }))
            },
        }),
        {
            name: "ecowas-financial-agent-storage",
        }
    )
)
