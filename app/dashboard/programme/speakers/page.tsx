"use client"

import { motion } from "framer-motion"
import { Mail, Mic, Search, Filter, Plus, Eye, Edit } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const speakers = [
  {
    id: 1,
    name: "H.E. Bola Tinubu",
    title: "President of Nigeria",
    sessions: 2,
    status: "confirmed",
    photo: "/nigerian-president-portrait.jpg",
  },
  {
    id: 2,
    name: "Dr. Akinwumi Adesina",
    title: "President, AfDB",
    sessions: 1,
    status: "confirmed",
    photo: "/african-bank-executive.jpg",
  },
  {
    id: 3,
    name: "Dr. Ngozi Okonjo-Iweala",
    title: "Director-General, WTO",
    sessions: 1,
    status: "pending",
    photo: "/african-woman-executive.jpg",
  },
  {
    id: 4,
    name: "Aliko Dangote",
    title: "Chairman, Dangote Group",
    sessions: 2,
    status: "confirmed",
    photo: "/african-businessman.jpg",
  },
  {
    id: 5,
    name: "Mo Ibrahim",
    title: "Founder, Mo Ibrahim Foundation",
    sessions: 1,
    status: "confirmed",
    photo: "/sudanese-businessman.jpg",
  },
  {
    id: 6,
    name: "Strive Masiyiwa",
    title: "Founder, Econet",
    sessions: 1,
    status: "pending",
    photo: "/zimbabwean-tech-entrepreneur.jpg",
  },
]

export default function SpeakersPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Speaker Management</h1>
          <p className="text-muted-foreground">Manage speakers, sessions, and materials</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Speakers</p>
            <p className="text-2xl font-bold">48</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">42</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-amber-600">6</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Materials Received</p>
            <p className="text-2xl font-bold">38/48</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search speakers..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Speakers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={speaker.photo || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {speaker.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{speaker.name}</h3>
                    <p className="text-sm text-muted-foreground">{speaker.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant={speaker.status === "confirmed" ? "default" : "secondary"}>{speaker.status}</Badge>
                      <Badge variant="outline">
                        <Mic className="w-3 h-3 mr-1" /> {speaker.sessions} sessions
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="w-4 h-4 mr-1" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>

      </div>

    </div>
  )
}
