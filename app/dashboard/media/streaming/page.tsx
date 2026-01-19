"use client"
import { motion } from "framer-motion"
import { Video, Play, Pause, Radio, Eye, Settings, MonitorPlay, WifiOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const streams = [
  { id: 1, name: "Main Plenary Hall", status: "live", viewers: 2450, quality: "1080p", bitrate: "4500 kbps" },
  { id: 2, name: "Conference Room A", status: "scheduled", viewers: 0, quality: "720p", startTime: "14:00" },
  { id: 3, name: "Exhibition Hall", status: "live", viewers: 890, quality: "720p", bitrate: "2500 kbps" },
  { id: 4, name: "Press Briefing Room", status: "offline", viewers: 0, quality: "1080p" },
]

const statusConfig = {
  live: { color: "bg-red-500", label: "LIVE", icon: Radio },
  scheduled: { color: "bg-amber-500", label: "Scheduled", icon: Play },
  offline: { color: "bg-gray-500", label: "Offline", icon: WifiOff },
}

export default function StreamingControlPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Streaming Control</h1>
          <p className="text-muted-foreground">Manage live streams and broadcast settings</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-red-500 text-white animate-pulse">
            <Radio className="w-3 h-3 mr-1" /> 2 Live Streams
          </Badge>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" /> Settings
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-red-500/10 to-pink-500/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center animate-pulse">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Live Now</p>
                <p className="text-2xl font-bold">2 Streams</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Viewers</p>
            <p className="text-2xl font-bold">3,340</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Peak Today</p>
            <p className="text-2xl font-bold">5,120</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Bandwidth Usage</p>
            <p className="text-2xl font-bold">12.5 Gbps</p>
          </CardContent>
        </Card>
      </div>

      {/* Streams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {streams.map((stream, index) => {
          const status = statusConfig[stream.status as keyof typeof statusConfig]
          const StatusIcon = status.icon
          return (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{stream.name}</CardTitle>
                    <Badge className={`${status.color} text-white`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Preview */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    {stream.status === "live" ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800" />
                        <MonitorPlay className="w-12 h-12 text-white/50 relative z-10" />
                        <div className="absolute top-2 right-2 flex items-center gap-1 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          <Radio className="w-3 h-3 animate-pulse" /> LIVE
                        </div>
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          <Eye className="w-3 h-3" /> {stream.viewers.toLocaleString()}
                        </div>
                      </>
                    ) : (
                      <div className="text-center">
                        <Video className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {stream.status === "scheduled" ? `Starts at ${stream.startTime}` : "Stream offline"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quality</p>
                      <p className="font-medium">{stream.quality}</p>
                    </div>
                    {stream.bitrate && (
                      <div>
                        <p className="text-muted-foreground">Bitrate</p>
                        <p className="font-medium">{stream.bitrate}</p>
                      </div>
                    )}
                  </div>

                  {/* Controls */}
                  <div className="flex gap-2">
                    {stream.status === "live" ? (
                      <>
                        <Button variant="destructive" className="flex-1">
                          <Pause className="w-4 h-4 mr-2" /> Stop Stream
                        </Button>
                        <Button variant="outline">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </>
                    ) : (
                      <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        <Play className="w-4 h-4 mr-2" /> Start Stream
                      </Button>
                    )}
                  </div>
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
