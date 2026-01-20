"use client"

import { useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, LayoutGrid, List, Sparkles, Filter, SlidersHorizontal, UserPlus } from "lucide-react"
import { ProjectList } from "@/components/collaboration/project-list"
import { ProjectBoard } from "@/components/collaboration/project-board"
import { PMAgentChat } from "@/components/collaboration/pm-agent-chat"
import { mockTasks, Task } from "@/components/collaboration/types"
import { Team } from "@/lib/pm-agent-mock-data"
import { cn } from "@/lib/utils"

const teams: Team[] = ["Logistics", "Content", "Security", "Media", "Partnerships"]

export default function ProjectsPage() {
    const [currentTeam, setCurrentTeam] = useState<Team>("Logistics")
    const [view, setView] = useState<"list" | "board">("list")
    const [isAgentOpen, setIsAgentOpen] = useState(false)

    // Filter tasks by team
    const filteredTasks = mockTasks.filter((t) => t.team === currentTeam) || []

    return (
        <div className="min-h-screen flex flex-col">
            <Header title="Project Management" subtitle="Manage tasks and collaborate across teams" />

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar - Teams */}
                <div className="w-64 bg-card border-r flex flex-col">
                    <div className="p-4 border-b">
                        <Button className="w-full gap-2 justify-start" size="sm">
                            <Plus className="w-4 h-4" /> New Project
                        </Button>
                    </div>
                    <div className="flex-1 p-2 space-y-1 overflow-y-auto">
                        <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1">TEAMS</div>
                        {teams.map(team => (
                            <button
                                key={team}
                                onClick={() => setCurrentTeam(team)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between group",
                                    currentTeam === team ? "bg-primary/5 text-primary font-medium" : "hover:bg-muted text-muted-foreground"
                                )}
                            >
                                <span className="flex items-center gap-2">
                                    <span className={cn("w-2 h-2 rounded-full",
                                        team === "Logistics" ? "bg-blue-500" :
                                            team === "Content" ? "bg-purple-500" :
                                                team === "Security" ? "bg-red-500" :
                                                    team === "Media" ? "bg-pink-500" : "bg-orange-500"
                                    )} />
                                    {team}
                                </span>
                                <Badge variant="secondary" className="text-[10px] h-5 px-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {mockTasks.filter(t => t.team === team).length}
                                </Badge>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    <div className="h-14 border-b flex items-center justify-between px-6 bg-background shrink-0">
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                {currentTeam}
                                <span className="text-muted-foreground font-normal text-sm">/ Tasks</span>
                            </h2>
                            <div className="h-6 w-px bg-border" />
                            <div className="flex bg-muted/50 p-1 rounded-lg">
                                <button
                                    onClick={() => setView("list")}
                                    className={cn("p-1.5 rounded-md transition-all", view === "list" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView("board")}
                                    className={cn("p-1.5 rounded-md transition-all", view === "board" ? "bg-background shadow-sm text-primary" : "text-muted-foreground hover:text-foreground")}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2 mr-4">
                                {["A", "B", "C"].map((u, i) => (
                                    <Avatar key={i} className="w-7 h-7 border-2 border-background">
                                        <AvatarFallback className="text-[10px] bg-muted text-muted-foreground">{u}</AvatarFallback>
                                    </Avatar>
                                ))}
                                <button className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-muted-foreground hover:bg-muted/80">
                                    <UserPlus className="w-3 h-3" />
                                </button>
                            </div>
                            <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
                                <Filter className="w-4 h-4" /> Filter
                            </Button>
                            <Button
                                className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all"
                                onClick={() => setIsAgentOpen(true)}
                            >
                                <Sparkles className="w-4 h-4" />
                                Ask PM Agent
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-6 overflow-y-auto bg-muted/10">
                        {view === "list" ? (
                            <ProjectList tasks={filteredTasks} />
                        ) : (
                            <ProjectBoard tasks={filteredTasks} />
                        )}
                    </div>

                    {/* PM Agent Chat Overlay */}
                    <PMAgentChat
                        isOpen={isAgentOpen}
                        onClose={() => setIsAgentOpen(false)}
                        currentTeam={currentTeam}
                    />
                </div>
            </div>
        </div>
    )
}
