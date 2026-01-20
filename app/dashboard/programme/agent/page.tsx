"use client"

import { AgentInterface } from "@/components/scheduling/agent-interface"

export default function SchedulingAgentPage() {
    return (
        <div className="h-[calc(100vh-4rem)] p-6">
            <div className="h-full max-w-4xl mx-auto flex flex-col space-y-4">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">AI Scheduling Assistant</h1>
                    <p className="text-muted-foreground">
                        Plan your programme, get content suggestions, and optimize logistics with AI.
                    </p>
                </div>

                <div className="flex-1 border rounded-xl overflow-hidden bg-background shadow-sm">
                    <AgentInterface className="h-full" />
                </div>
            </div>
        </div>
    )
}
