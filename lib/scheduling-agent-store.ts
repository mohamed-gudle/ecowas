"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AgentMessage {
    id: string
    role: "user" | "assistant" | "system"
    content: string
    timestamp: string
}

export interface Conversation {
    id: string
    messages: AgentMessage[]
    createdAt: string
    updatedAt: string
}

interface SchedulingAgentState {
    conversations: Conversation[]
    currentConversationId: string | null
    isGenerating: boolean
    isOpen: boolean

    // Actions
    startConversation: () => string
    addMessage: (conversationId: string, message: Omit<AgentMessage, "id" | "timestamp">) => void
    setCurrentConversation: (conversationId: string | null) => void
    setIsGenerating: (value: boolean) => void
    setIsOpen: (value: boolean) => void
    getConversation: (conversationId: string) => Conversation | undefined
    clearConversation: (conversationId: string) => void
}

export const useSchedulingAgentStore = create<SchedulingAgentState>()(
    persist(
        (set, get) => ({
            conversations: [],
            currentConversationId: null,
            isGenerating: false,
            isOpen: false,

            startConversation: () => {
                const id = crypto.randomUUID()
                const conversation: Conversation = {
                    id,
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

            setCurrentConversation: (conversationId) => {
                set({ currentConversationId: conversationId })
            },

            setIsGenerating: (value) => {
                set({ isGenerating: value })
            },

            setIsOpen: (value) => {
                set({ isOpen: value })
            },

            getConversation: (conversationId) => {
                return get().conversations.find((c) => c.id === conversationId)
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
            name: "ecowas-scheduling-agent-storage",
        }
    )
)
