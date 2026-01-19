"use client"

import { motion } from "framer-motion"
import { Monitor, Mic, Camera, Headphones, Wifi, Plus, Search, Filter, CheckCircle, Clock, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const equipmentRequests = [
  {
    id: 1,
    item: "4K Display Monitors",
    quantity: 12,
    requester: "Main Plenary",
    status: "delivered",
    date: "2024-01-15",
  },
  {
    id: 2,
    item: "Wireless Microphones",
    quantity: 24,
    requester: "Conference Rooms",
    status: "in-transit",
    date: "2024-01-14",
  },
  {
    id: 3,
    item: "Translation Headsets",
    quantity: 500,
    requester: "All Venues",
    status: "pending",
    date: "2024-01-13",
  },
  { id: 4, item: "PTZ Cameras", quantity: 8, requester: "Streaming Team", status: "delivered", date: "2024-01-12" },
  { id: 5, item: "Portable WiFi Units", quantity: 20, requester: "IT Team", status: "approved", date: "2024-01-11" },
]

const statusConfig = {
  delivered: { label: "Delivered", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  "in-transit": { label: "In Transit", color: "bg-blue-500/10 text-blue-600", icon: Package },
  approved: { label: "Approved", color: "bg-amber-500/10 text-amber-600", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-gray-500/10 text-gray-600", icon: Clock },
}

const categoryIcons = {
  display: Monitor,
  audio: Mic,
  camera: Camera,
  headset: Headphones,
  network: Wifi,
}

export default function EquipmentPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Equipment Requests</h1>
          <p className="text-muted-foreground">Manage AV equipment and technical resource requests</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Requests</p>
            <p className="text-2xl font-bold">48</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <p className="text-2xl font-bold text-green-600">32</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Transit</p>
            <p className="text-2xl font-bold text-blue-600">8</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-amber-600">8</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search equipment..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Requests List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Equipment Requests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {equipmentRequests.map((request, index) => {
            const status = statusConfig[request.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            return (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{request.item}</p>
                    <p className="text-sm text-muted-foreground">
                      Qty: {request.quantity} • {request.requester}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{request.date}</span>
                  <Badge className={status.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </div>

      </div>

    </div>
  )
}
