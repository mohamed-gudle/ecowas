"use client"

import { motion } from "framer-motion"
import { Building2, Users, CheckCircle, Clock, AlertTriangle, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const venues = [
  { id: 1, name: "Main Plenary Hall", capacity: 2000, setup: 95, status: "ready", sessions: 12 },
  { id: 2, name: "Conference Room A", capacity: 200, setup: 100, status: "ready", sessions: 24 },
  { id: 3, name: "Conference Room B", capacity: 200, setup: 85, status: "in-progress", sessions: 18 },
  { id: 4, name: "Exhibition Hall", capacity: 500, setup: 70, status: "in-progress", sessions: 0 },
  { id: 5, name: "VIP Lounge", capacity: 50, setup: 100, status: "ready", sessions: 0 },
  { id: 6, name: "Press Center", capacity: 100, setup: 90, status: "in-progress", sessions: 8 },
]

const statusConfig = {
  ready: { label: "Ready", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  "in-progress": { label: "Setup In Progress", color: "bg-amber-500/10 text-amber-600", icon: Clock },
  issue: { label: "Issue", color: "bg-red-500/10 text-red-600", icon: AlertTriangle },
}

export default function VenuesPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Venues & Setup</h1>
        <p className="text-muted-foreground">Manage venue configurations and setup progress</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Venues</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Ready</p>
            <p className="text-2xl font-bold text-green-600">8</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-amber-600">4</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Capacity</p>
            <p className="text-2xl font-bold">5,250</p>
          </CardContent>
        </Card>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((venue, index) => {
          const status = statusConfig[venue.status as keyof typeof statusConfig]
          const StatusIcon = status.icon
          return (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{venue.name}</CardTitle>
                    <Badge className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{venue.capacity} capacity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>{venue.sessions} sessions</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Setup Progress</span>
                      <span className="font-medium">{venue.setup}%</span>
                    </div>
                    <Progress value={venue.setup} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Settings className="w-4 h-4 mr-2" /> Manage
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
      </div>
    </div>
  )
}
