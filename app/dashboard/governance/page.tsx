"use client"
import { motion } from "framer-motion"
import {
  Building2,
  Users,
  Target,
  ChevronRight,
  Plus,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const pillars = [
  {
    id: 1,
    name: "Economic Integration",
    description: "Trade facilitation and customs harmonization",
    lead: "Nigeria",
    workingGroups: 4,
    actions: 28,
    completedActions: 18,
    status: "On Track",
  },
  {
    id: 2,
    name: "Peace & Security",
    description: "Regional stability and conflict resolution",
    lead: "Senegal",
    workingGroups: 3,
    actions: 22,
    completedActions: 12,
    status: "On Track",
  },
  {
    id: 3,
    name: "Infrastructure Development",
    description: "Cross-border connectivity and energy",
    lead: "Ghana",
    workingGroups: 5,
    actions: 35,
    completedActions: 20,
    status: "At Risk",
  },
  {
    id: 4,
    name: "Human Development",
    description: "Education, health, and social protection",
    lead: "Côte d'Ivoire",
    workingGroups: 4,
    actions: 24,
    completedActions: 16,
    status: "On Track",
  },
  {
    id: 5,
    name: "Agriculture & Food Security",
    description: "Sustainable agriculture and food systems",
    lead: "Burkina Faso",
    workingGroups: 3,
    actions: 18,
    completedActions: 8,
    status: "Behind",
  },
]

const recentActions = [
  {
    id: 1,
    title: "Finalize trade protocol amendments",
    pillar: "Economic Integration",
    dueDate: "2026-03-10",
    status: "Completed",
    assignee: "Trade Commission",
  },
  {
    id: 2,
    title: "Submit energy corridor feasibility study",
    pillar: "Infrastructure Development",
    dueDate: "2026-03-15",
    status: "In Progress",
    assignee: "Energy Working Group",
  },
  {
    id: 3,
    title: "Ratify regional health protocol",
    pillar: "Human Development",
    dueDate: "2026-03-12",
    status: "Pending Review",
    assignee: "Health Ministers Council",
  },
  {
    id: 4,
    title: "Deploy joint border patrol units",
    pillar: "Peace & Security",
    dueDate: "2026-03-20",
    status: "In Progress",
    assignee: "Security Task Force",
  },
]

export default function GovernancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Governance & Pillars</h1>
          <p className="text-muted-foreground">Strategic pillars, working groups, and action tracking</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Action Item
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Strategic Pillars</p>
                <p className="text-3xl font-bold">{pillars.length}</p>
              </div>
              <Building2 className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Working Groups</p>
                <p className="text-3xl font-bold">{pillars.reduce((acc, p) => acc + p.workingGroups, 0)}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Actions</p>
                <p className="text-3xl font-bold">{pillars.reduce((acc, p) => acc + p.actions, 0)}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-3xl font-bold">
                  {Math.round(
                    (pillars.reduce((acc, p) => acc + p.completedActions, 0) /
                      pillars.reduce((acc, p) => acc + p.actions, 0)) *
                      100,
                  )}
                  %
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pillars.map((pillar, index) => (
          <motion.div
            key={pillar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{pillar.name}</CardTitle>
                    <CardDescription>{pillar.description}</CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      pillar.status === "On Track"
                        ? "border-green-500 text-green-500"
                        : pillar.status === "At Risk"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-red-500 text-red-500"
                    }
                  >
                    {pillar.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Lead Country</span>
                  <span className="font-medium">{pillar.lead}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Actions Progress</span>
                    <span className="font-medium">
                      {pillar.completedActions}/{pillar.actions}
                    </span>
                  </div>
                  <Progress value={(pillar.completedActions / pillar.actions) * 100} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge variant="secondary">
                    <Users className="w-3 h-3 mr-1" />
                    {pillar.workingGroups} Groups
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Actions</CardTitle>
              <CardDescription>Latest action items across all pillars</CardDescription>
            </div>
            <Button variant="outline">
              View All Actions
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    action.status === "Completed"
                      ? "bg-green-500/10"
                      : action.status === "In Progress"
                        ? "bg-blue-500/10"
                        : "bg-yellow-500/10"
                  }`}
                >
                  {action.status === "Completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : action.status === "In Progress" ? (
                    <Clock className="w-5 h-5 text-blue-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{action.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="text-xs">
                      {action.pillar}
                    </Badge>
                    <span>|</span>
                    <span>{action.assignee}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Due: {action.dueDate}</p>
                  <Badge
                    variant="secondary"
                    className={
                      action.status === "Completed"
                        ? "bg-green-500/10 text-green-500"
                        : action.status === "In Progress"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-yellow-500/10 text-yellow-500"
                    }
                  >
                    {action.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
