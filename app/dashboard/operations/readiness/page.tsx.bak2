"use client"

import { motion } from "framer-motion"
import {
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  Building2,
  Users,
  Shield,
  Truck,
  Monitor,
  Utensils,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const categories = [
  { name: "Venue Setup", icon: Building2, progress: 92, total: 48, completed: 44, inProgress: 3, blocked: 1 },
  { name: "Accreditation", icon: Users, progress: 78, total: 24, completed: 19, inProgress: 4, blocked: 1 },
  { name: "Security", icon: Shield, progress: 85, total: 32, completed: 27, inProgress: 5, blocked: 0 },
  { name: "Logistics", icon: Truck, progress: 70, total: 40, completed: 28, inProgress: 10, blocked: 2 },
  { name: "Technology", icon: Monitor, progress: 88, total: 36, completed: 32, inProgress: 4, blocked: 0 },
  { name: "Catering", icon: Utensils, progress: 65, total: 20, completed: 13, inProgress: 5, blocked: 2 },
]

export default function ReadinessPage() {
  const overallProgress = Math.round(categories.reduce((sum, c) => sum + c.progress, 0) / categories.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Readiness Checklist</h1>
        <p className="text-muted-foreground">Track summit preparation progress across all departments</p>
      </div>

      {/* Overall Progress */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Overall Readiness</p>
              <p className="text-4xl font-bold">{overallProgress}%</p>
              <p className="text-sm text-muted-foreground mt-1">163 of 200 tasks completed</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">163</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">31</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">6</p>
                <p className="text-xs text-muted-foreground">Blocked</p>
              </div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3 mt-4" />
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{category.progress}%</span>
                  <span className="text-sm text-muted-foreground">
                    {category.completed}/{category.total} tasks
                  </span>
                </div>
                <Progress value={category.progress} className="h-2" />
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3 h-3" /> {category.completed}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <Clock className="w-3 h-3" /> {category.inProgress}
                  </span>
                  {category.blocked > 0 && (
                    <span className="flex items-center gap-1 text-red-600">
                      <AlertTriangle className="w-3 h-3" /> {category.blocked}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
