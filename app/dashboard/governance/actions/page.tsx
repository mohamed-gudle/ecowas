"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, AlertTriangle, Plus, Search, Filter, User, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const actions = [
  {
    id: 1,
    title: "Finalize summit agenda",
    assignee: "Dr. Amina",
    priority: "high",
    status: "completed",
    dueDate: "Jan 15",
  },
  {
    id: 2,
    title: "Confirm VIP protocol arrangements",
    assignee: "Ibrahim T.",
    priority: "high",
    status: "in-progress",
    dueDate: "Jan 18",
  },
  {
    id: 3,
    title: "Review security clearances",
    assignee: "Security Team",
    priority: "critical",
    status: "in-progress",
    dueDate: "Jan 17",
  },
  {
    id: 4,
    title: "Prepare country briefs",
    assignee: "Research Unit",
    priority: "medium",
    status: "pending",
    dueDate: "Jan 20",
  },
  {
    id: 5,
    title: "Coordinate transport logistics",
    assignee: "Logistics Team",
    priority: "high",
    status: "pending",
    dueDate: "Jan 22",
  },
]

const priorityConfig = {
  critical: { label: "Critical", color: "bg-red-500 text-white" },
  high: { label: "High", color: "bg-amber-500/10 text-amber-600" },
  medium: { label: "Medium", color: "bg-blue-500/10 text-blue-600" },
  low: { label: "Low", color: "bg-gray-500/10 text-gray-600" },
}

const statusConfig = {
  completed: { label: "Completed", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  "in-progress": { label: "In Progress", color: "bg-blue-500/10 text-blue-600", icon: Clock },
  pending: { label: "Pending", color: "bg-gray-500/10 text-gray-600", icon: Clock },
  blocked: { label: "Blocked", color: "bg-red-500/10 text-red-600", icon: AlertTriangle },
}

export default function ActionRegisterPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Action Register</h1>
          <p className="text-muted-foreground">Track and manage summit action items</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Action
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Actions</p>
            <p className="text-2xl font-bold">86</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-bold text-green-600">52</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">24</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold text-red-600">3</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search actions..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Actions List */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-0">
          <div className="divide-y">
            {actions.map((action, index) => {
              const priority = priorityConfig[action.priority as keyof typeof priorityConfig]
              const status = statusConfig[action.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              return (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-2 h-2 rounded-full ${action.priority === "critical" ? "bg-red-500" : action.priority === "high" ? "bg-amber-500" : "bg-blue-500"}`}
                    />
                    <div>
                      <p className="font-medium">{action.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span>{action.assignee}</span>
                        <span>•</span>
                        <Calendar className="w-3 h-3" />
                        <span>Due: {action.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={priority.color}>{priority.label}</Badge>
                    <Badge className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
