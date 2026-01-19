"use client"

import { motion } from "framer-motion"
import { Car, Bus, MapPin, Users, Clock, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const transportSchedule = [
  {
    id: 1,
    type: "Airport Shuttle",
    vehicle: "Bus",
    route: "NIA Airport → AICC",
    time: "06:00 - 22:00",
    capacity: 45,
    status: "active",
  },
  {
    id: 2,
    type: "VIP Transfer",
    vehicle: "Sedan",
    route: "Transcorp Hilton → AICC",
    time: "On-demand",
    capacity: 4,
    status: "active",
  },
  {
    id: 3,
    type: "Delegate Bus",
    vehicle: "Bus",
    route: "Hotels Circuit → AICC",
    time: "07:00 - 20:00",
    capacity: 50,
    status: "active",
  },
  {
    id: 4,
    type: "Media Van",
    vehicle: "Van",
    route: "Press Center → Venues",
    time: "08:00 - 18:00",
    capacity: 12,
    status: "standby",
  },
]

const vehicleIcons = {
  Bus: Bus,
  Sedan: Car,
  Van: Car,
}

export default function TransportPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Transport Management</h1>
          <p className="text-muted-foreground">Vehicle scheduling and logistics coordination</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Bus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Buses</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Car className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">VIP Vehicles</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active Routes</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Trips Today</p>
            <p className="text-2xl font-bold">156</p>
          </CardContent>
        </Card>
      </div>

      {/* Transport Schedule */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Transport Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {transportSchedule.map((item, index) => {
            const VehicleIcon = vehicleIcons[item.vehicle as keyof typeof vehicleIcons]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <VehicleIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{item.route}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{item.capacity} seats</span>
                    </div>
                  </div>
                  <Badge variant={item.status === "active" ? "default" : "secondary"}>{item.status}</Badge>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </div>

      </div>


  )
}
