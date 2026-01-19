"use client";

import { motion } from "framer-motion";
import { Clock, Users, MapPin, Play, Pause, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const showItems = [
  {
    id: 1,
    time: "08:00",
    duration: "30 min",
    title: "Registration & Breakfast",
    venue: "Main Lobby",
    status: "completed",
  },
  {
    id: 2,
    time: "08:30",
    duration: "15 min",
    title: "Opening Remarks",
    venue: "Plenary Hall",
    speaker: "Dr. Omar Touray",
    status: "completed",
  },
  {
    id: 3,
    time: "08:45",
    duration: "30 min",
    title: "Keynote Address",
    venue: "Plenary Hall",
    speaker: "H.E. Bola Tinubu",
    status: "live",
  },
  {
    id: 4,
    time: "09:15",
    duration: "45 min",
    title: "Panel: Economic Integration",
    venue: "Plenary Hall",
    status: "upcoming",
  },
  {
    id: 5,
    time: "10:00",
    duration: "30 min",
    title: "Coffee Break & Networking",
    venue: "Exhibition Hall",
    status: "upcoming",
  },
  {
    id: 6,
    time: "10:30",
    duration: "90 min",
    title: "Breakout Sessions",
    venue: "Conference Rooms",
    status: "upcoming",
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    color: "bg-green-500/10 text-green-600",
    icon: CheckCircle,
  },
  live: {
    label: "Live Now",
    color: "bg-red-500 text-white animate-pulse",
    icon: Play,
  },
  upcoming: {
    label: "Upcoming",
    color: "bg-muted text-muted-foreground",
    icon: Clock,
  },
};

export default function RunOfShowPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Run of Show</h1>
            <p className="text-muted-foreground">Day 1 - February 12, 2024</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-red-500 text-white animate-pulse">
              <Play className="w-3 h-3 mr-1" /> Live
            </Badge>
            <Button variant="outline">View Full Schedule</Button>
          </div>
        </div>

        {/* Current Progress */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-500/10 to-orange-500/10">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Session</p>
                <p className="text-2xl font-bold">Keynote Address</p>
                <p className="text-sm text-muted-foreground">
                  H.E. Bola Tinubu • 15 minutes remaining
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Progress value={50} className="w-32 h-2" />
                <span className="text-sm font-medium">50%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-6">
                {showItems.map((item, index) => {
                  const status =
                    statusConfig[item.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-16"
                    >
                      <div
                        className={`absolute left-4 w-4 h-4 rounded-full border-2 border-background ${item.status === "live" ? "bg-red-500" : item.status === "completed" ? "bg-green-500" : "bg-muted"}`}
                      />
                      <div
                        className={`p-4 rounded-lg ${item.status === "live" ? "bg-red-500/10 border border-red-500/20" : "bg-muted/30"}`}
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm">
                                {item.time}
                              </span>
                              <Badge variant="outline">{item.duration}</Badge>
                              <Badge className={status.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </Badge>
                            </div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {item.venue}
                              </span>
                              {item.speaker && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" /> {item.speaker}
                                </span>
                              )}
                            </div>
                          </div>
                          {item.status === "live" && (
                            <Button size="sm" variant="destructive">
                              <Pause className="w-4 h-4 mr-1" /> End Session
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
