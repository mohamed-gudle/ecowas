"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Plus,
  LayoutGrid,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Kanban,
} from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    id: 1,
    name: "Main Stage Setup",
    category: "Venue",
    status: "in-progress",
    progress: 75,
    priority: "high",
    owner: { name: "James Okonkwo", avatar: "/placeholder.svg" },
    dueDate: "Jan 12",
    tasks: { total: 24, completed: 18 },
    team: 8,
    risks: 0,
  },
  {
    id: 2,
    name: "VIP Accreditation Processing",
    category: "Accreditation",
    status: "in-progress",
    progress: 65,
    priority: "high",
    owner: { name: "Amaka Eze", avatar: "/placeholder.svg" },
    dueDate: "Jan 14",
    tasks: { total: 35, completed: 23 },
    team: 12,
    risks: 1,
  },
  {
    id: 3,
    name: "Security Coordination",
    category: "Security",
    status: "at-risk",
    progress: 45,
    priority: "critical",
    owner: { name: "Col. Hassan Ibrahim", avatar: "/placeholder.svg" },
    dueDate: "Jan 14",
    tasks: { total: 42, completed: 19 },
    team: 25,
    risks: 3,
  },
  {
    id: 4,
    name: "Catering Logistics",
    category: "Operations",
    status: "on-track",
    progress: 88,
    priority: "medium",
    owner: { name: "Funke Adebayo", avatar: "/placeholder.svg" },
    dueDate: "Jan 14",
    tasks: { total: 18, completed: 16 },
    team: 6,
    risks: 0,
  },
  {
    id: 5,
    name: "Media Center Setup",
    category: "Media",
    status: "in-progress",
    progress: 60,
    priority: "medium",
    owner: { name: "Tunde Adeyemi", avatar: "/placeholder.svg" },
    dueDate: "Jan 13",
    tasks: { total: 15, completed: 9 },
    team: 4,
    risks: 0,
  },
  {
    id: 6,
    name: "Transport Fleet Deployment",
    category: "Transport",
    status: "on-track",
    progress: 78,
    priority: "high",
    owner: { name: "Chidi Obi", avatar: "/placeholder.svg" },
    dueDate: "Jan 14",
    tasks: { total: 20, completed: 16 },
    team: 15,
    risks: 0,
  },
]

const kanbanColumns = [
  { id: "todo", name: "To Do", color: "bg-gray-500" },
  { id: "in-progress", name: "In Progress", color: "bg-blue-500" },
  { id: "review", name: "Review", color: "bg-yellow-500" },
  { id: "done", name: "Done", color: "bg-green-500" },
]

export default function ProjectTrackerPage() {
  const [view, setView] = useState<"grid" | "kanban">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen">
      <Header title="Project Tracker" subtitle="Track operational projects and task progress" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Projects", value: "24", icon: Kanban },
            { label: "On Track", value: "18", icon: CheckCircle2, color: "text-green-500" },
            { label: "At Risk", value: "4", icon: AlertTriangle, color: "text-yellow-500" },
            { label: "Delayed", value: "2", icon: Clock, color: "text-red-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn("w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", stat.color)}
                    >
                      <stat.icon className={cn("w-5 h-5", stat.color || "text-primary")} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <div className="flex rounded-lg border overflow-hidden">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("grid")}
                className="rounded-none gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                Grid
              </Button>
              <Button
                variant={view === "kanban" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("kanban")}
                className="rounded-none gap-2"
              >
                <Kanban className="w-4 h-4" />
                Kanban
              </Button>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Projects Grid */}
        {view === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "hover:border-primary/50 transition-colors cursor-pointer",
                    project.status === "at-risk" && "border-yellow-500/50",
                  )}
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {project.category}
                        </Badge>
                        <h3 className="font-semibold">{project.name}</h3>
                      </div>
                      <Badge
                        className={cn(
                          "text-xs",
                          project.priority === "critical" && "bg-red-500/20 text-red-500",
                          project.priority === "high" && "bg-orange-500/20 text-orange-500",
                          project.priority === "medium" && "bg-yellow-500/20 text-yellow-500",
                          project.priority === "low" && "bg-green-500/20 text-green-500",
                        )}
                      >
                        {project.priority}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress
                        value={project.progress}
                        className={cn("h-2", project.status === "at-risk" && "[&>div]:bg-yellow-500")}
                      />
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4" />
                        {project.tasks.completed}/{project.tasks.total}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {project.team}
                      </div>
                      {project.risks > 0 && (
                        <div className="flex items-center gap-1 text-yellow-500">
                          <AlertTriangle className="w-4 h-4" />
                          {project.risks}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={project.owner.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {project.owner.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{project.owner.name.split(" ")[0]}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {project.dueDate}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Kanban View */}
        {view === "kanban" && (
          <div className="grid grid-cols-4 gap-4">
            {kanbanColumns.map((column) => (
              <div key={column.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className={cn("w-3 h-3 rounded-full", column.color)} />
                  <h3 className="font-semibold">{column.name}</h3>
                  <Badge variant="secondary" className="ml-auto">
                    {column.id === "in-progress"
                      ? projects.filter((p) => p.status === "in-progress" || p.status === "at-risk").length
                      : column.id === "done"
                        ? projects.filter((p) => p.status === "on-track" && p.progress >= 80).length
                        : column.id === "review"
                          ? 2
                          : 3}
                  </Badge>
                </div>
                <div className="space-y-3 min-h-[400px] p-3 rounded-xl bg-muted/50">
                  {(column.id === "in-progress"
                    ? projects.filter((p) => p.status === "in-progress" || p.status === "at-risk")
                    : column.id === "done"
                      ? projects.filter((p) => p.progress >= 80)
                      : []
                  )
                    .slice(0, 3)
                    .map((project) => (
                      <Card key={project.id} className="cursor-move hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <Badge variant="secondary" className="mb-2 text-xs">
                            {project.category}
                          </Badge>
                          <h4 className="font-medium text-sm mb-2">{project.name}</h4>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {project.tasks.completed}/{project.tasks.total}
                            </div>
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-[10px]">
                                {project.owner.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
