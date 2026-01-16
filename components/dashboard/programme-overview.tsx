"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Users, MapPin, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"

const mockSessions = [
  {
    id: "1",
    title: "Opening Plenary: Africa's Climate Leadership",
    type: "Plenary",
    time: "09:00 - 10:30",
    venue: "Main Hall",
    capacity: 2000,
    registered: 1856,
    status: "scheduled",
    speakers: [
      { name: "H.E. President Tinubu", avatar: null },
      { name: "Dr. Amina Mohammed", avatar: null },
      { name: "Min. Fatou Bensouda", avatar: null },
    ],
    pillar: "Opening",
  },
  {
    id: "2",
    title: "Renewable Energy Finance: Unlocking Investment",
    type: "Panel",
    time: "11:00 - 12:30",
    venue: "Hall A",
    capacity: 500,
    registered: 423,
    status: "confirmed",
    speakers: [
      { name: "Dr. Akinwumi Adesina", avatar: null },
      { name: "Ms. Ngozi Okonjo-Iweala", avatar: null },
    ],
    pillar: "Energy",
  },
  {
    id: "3",
    title: "Youth Climate Action Workshop",
    type: "Workshop",
    time: "14:00 - 16:00",
    venue: "Room B2",
    capacity: 100,
    registered: 98,
    status: "published",
    speakers: [{ name: "Youth Panel", avatar: null }],
    pillar: "Cross-cutting",
  },
  {
    id: "4",
    title: "Climate Adaptation in Agriculture",
    type: "Side Event",
    time: "14:00 - 15:30",
    venue: "Room C1",
    capacity: 150,
    registered: 87,
    status: "payment_pending",
    speakers: [{ name: "FAO Representative", avatar: null }],
    pillar: "Agriculture",
  },
]

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "success" | "warning" | "error" | "info" | "pending" }
> = {
  draft: { label: "Draft", variant: "default" },
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "pending" },
  approved: { label: "Approved", variant: "success" },
  payment_pending: { label: "Payment Pending", variant: "warning" },
  confirmed: { label: "Confirmed", variant: "success" },
  scheduled: { label: "Scheduled", variant: "info" },
  published: { label: "Published", variant: "success" },
}

export function ProgrammeOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-card rounded-xl border border-border shadow-lg"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Programme Overview</h2>
              <p className="text-sm text-muted-foreground">Day 1 Schedule • Jan 15, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              Run of Show
            </Button>
            <Link href="/dashboard/programme">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                View All <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="divide-y divide-border">
        {mockSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              {/* Time Column */}
              <div className="w-24 flex-shrink-0">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {session.time.split(" - ")[0]}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{session.time.split(" - ")[1]}</p>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-muted text-xs">
                        {session.type}
                      </Badge>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {session.pillar}
                      </Badge>
                    </div>
                    <h3 className="font-medium">{session.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {session.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" /> {session.registered}/{session.capacity}
                      </span>
                    </div>
                  </div>
                  <StatusBadge
                    status={statusConfig[session.status].label}
                    variant={statusConfig[session.status].variant}
                  />
                </div>

                {/* Speakers */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex -space-x-2">
                    {session.speakers.slice(0, 3).map((speaker, i) => (
                      <Avatar key={i} className="w-6 h-6 border-2 border-card">
                        <AvatarImage src={speaker.avatar || undefined} />
                        <AvatarFallback className="text-[10px] bg-muted">
                          {speaker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {session.speakers.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-muted border-2 border-card flex items-center justify-center text-[10px]">
                        +{session.speakers.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {session.speakers
                      .slice(0, 2)
                      .map((s) => s.name)
                      .join(", ")}
                    {session.speakers.length > 2 && ` +${session.speakers.length - 2} more`}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
