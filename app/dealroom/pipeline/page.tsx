"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Calendar,
  MoreHorizontal,
  Trash2,
  ExternalLink,
  ArrowRight,
  Filter,
  Download,
  Sun,
  Wind,
  Zap,
  Factory,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const pipelineStages = [
  { id: "watching", label: "Watching", color: "bg-slate-500" },
  { id: "interested", label: "Interested", color: "bg-blue-500" },
  { id: "in-discussion", label: "In Discussion", color: "bg-amber-500" },
  { id: "due-diligence", label: "Due Diligence", color: "bg-primary" },
  { id: "committed", label: "Committed", color: "bg-emerald-500" },
]

const pipelineProjects = [
  {
    id: "1",
    title: "Sahel Solar Mega Farm",
    stage: "due-diligence",
    investmentDisplay: "$150M",
    sector: "Renewable Energy",
    country: "Senegal",
    flag: "🇸🇳",
    readinessScore: 92,
    lastActivity: "Meeting scheduled for tomorrow",
    icon: Sun,
    gradient: "from-amber-500 to-orange-500",
    addedDate: "2024-02-15",
    notes: "Strong technical team, government support confirmed",
  },
  {
    id: "2",
    title: "Lagos Smart Grid",
    stage: "in-discussion",
    investmentDisplay: "$280M",
    sector: "Infrastructure",
    country: "Nigeria",
    flag: "🇳🇬",
    readinessScore: 88,
    lastActivity: "Received updated financials",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    addedDate: "2024-02-20",
    notes: "Large scale, need to assess regulatory environment",
  },
  {
    id: "3",
    title: "Ghana Coastal Wind Farm",
    stage: "interested",
    investmentDisplay: "$95M",
    sector: "Renewable Energy",
    country: "Ghana",
    flag: "🇬🇭",
    readinessScore: 75,
    lastActivity: "Downloaded project documents",
    icon: Wind,
    gradient: "from-teal-500 to-emerald-500",
    addedDate: "2024-03-01",
    notes: "Promising offshore location",
  },
  {
    id: "4",
    title: "Abidjan Green Industrial Park",
    stage: "watching",
    investmentDisplay: "$180M",
    sector: "Green Manufacturing",
    country: "Cote d'Ivoire",
    flag: "🇨🇮",
    readinessScore: 85,
    lastActivity: "Added to pipeline",
    icon: Factory,
    gradient: "from-green-500 to-emerald-600",
    addedDate: "2024-03-10",
    notes: "",
  },
  {
    id: "5",
    title: "Burkina Faso Agri Hub",
    stage: "committed",
    investmentDisplay: "$45M",
    sector: "Agriculture",
    country: "Burkina Faso",
    flag: "🇧🇫",
    readinessScore: 78,
    lastActivity: "Term sheet signed",
    icon: Sun,
    gradient: "from-lime-500 to-green-600",
    addedDate: "2024-01-15",
    notes: "Investment commitment of $5M",
  },
]

export default function PipelinePage() {
  const [projects, setProjects] = useState(pipelineProjects)

  const getProjectsByStage = (stageId: string) => {
    return projects.filter((p) => p.stage === stageId)
  }

  const getTotalValue = (stageId: string) => {
    const stageProjects = getProjectsByStage(stageId)
    return stageProjects.reduce((acc, p) => {
      const value = Number.parseInt(p.investmentDisplay.replace(/[^0-9]/g, ""))
      return acc + value
    }, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Pipeline</h1>
          <p className="text-muted-foreground">Track and manage your investment opportunities</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {pipelineStages.map((stage, i) => {
          const count = getProjectsByStage(stage.id).length
          const value = getTotalValue(stage.id)
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={cn("w-3 h-3 rounded-full", stage.color)} />
                    <span className="text-sm font-medium">{stage.label}</span>
                  </div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">${value}M total</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {pipelineStages.map((stage) => (
          <div key={stage.id} className="min-w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", stage.color)} />
                <h3 className="font-semibold text-sm">{stage.label}</h3>
                <Badge variant="secondary" className="text-xs">
                  {getProjectsByStage(stage.id).length}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {getProjectsByStage(stage.id).map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <Card className="hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                    <CardContent className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                            project.gradient,
                          )}
                        >
                          <project.icon className="w-5 h-5 text-white" />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" /> View Project
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" /> Add Note
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" /> Schedule Meeting
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Title */}
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">{project.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {project.flag} {project.country} • {project.sector}
                        </p>
                      </div>

                      {/* Investment */}
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">{project.investmentDisplay}</span>
                        <div className="flex items-center gap-1 text-xs">
                          <Progress value={project.readinessScore} className="w-12 h-1.5" />
                          <span className="text-muted-foreground">{project.readinessScore}%</span>
                        </div>
                      </div>

                      {/* Last Activity */}
                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground line-clamp-1">{project.lastActivity}</p>
                      </div>

                      {/* Notes preview */}
                      {project.notes && (
                        <div className="p-2 rounded bg-muted text-xs text-muted-foreground line-clamp-2">
                          {project.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              {/* Empty state */}
              {getProjectsByStage(stage.id).length === 0 && (
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground">No projects</p>
                  <p className="text-xs text-muted-foreground">Drag projects here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Pipeline Summary</h3>
              <p className="text-muted-foreground">
                You have {projects.length} projects in your pipeline with a total potential investment of $
                {projects.reduce((acc, p) => acc + Number.parseInt(p.investmentDisplay.replace(/[^0-9]/g, "")), 0)}M
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{getProjectsByStage("committed").length}</p>
                <p className="text-sm text-muted-foreground">Committed</p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">${getTotalValue("committed")}M</p>
                <p className="text-sm text-muted-foreground">Committed Value</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
