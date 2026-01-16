"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  Mail,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const meetings = [
  {
    id: "1",
    title: "Investor Pitch: Sahel Solar Mega Farm",
    type: "virtual",
    status: "confirmed",
    date: "2024-03-15",
    time: "14:00 - 15:00",
    project: "Sahel Solar Mega Farm",
    attendees: [
      { id: "1", name: "Kwame Asante", role: "Project Developer", avatar: "/african-businessman.png" },
      {
        id: "2",
        name: "Sarah Chen",
        role: "Investment Director",
        avatar: "/asian-businesswoman.jpg",
        organization: "Africa Infrastructure Fund",
      },
      { id: "3", name: "Dr. Amadou Diallo", role: "Technical Advisor", avatar: "/african-man-professional.png" },
    ],
    agenda: "Initial pitch presentation, Q&A on technical feasibility, Discussion of financing structure",
    meetingLink: "https://meet.example.com/sahel-solar-pitch",
    notes: "",
  },
  {
    id: "2",
    title: "Due Diligence Review - Lagos Smart Grid",
    type: "in-person",
    status: "confirmed",
    date: "2024-03-16",
    time: "10:00 - 12:00",
    project: "Lagos Smart Grid Modernization",
    location: "Meeting Room A, Summit Convention Center",
    attendees: [
      { id: "4", name: "Oluwaseun Adebayo", role: "CEO, PowerGrid Africa", avatar: "/nigerian-businessman.jpg" },
      {
        id: "5",
        name: "James Wilson",
        role: "Infrastructure Analyst",
        avatar: "/businessman-glasses.jpg",
        organization: "Green Climate Partners",
      },
    ],
    agenda: "Technical due diligence review, Site visit planning, Risk assessment discussion",
    notes: "Bring technical documentation package",
  },
  {
    id: "3",
    title: "Networking: Clean Energy Investors Roundtable",
    type: "in-person",
    status: "pending",
    date: "2024-03-17",
    time: "16:00 - 18:00",
    project: null,
    location: "Executive Lounge, Summit Convention Center",
    attendees: [{ id: "6", name: "Multiple Investors", role: "Various", avatar: "/group-people.jpg" }],
    agenda: "Open networking session for clean energy project developers and investors",
    notes: "Prepare elevator pitches for all active projects",
  },
  {
    id: "4",
    title: "Follow-up: Ghana Wind Farm Financing",
    type: "virtual",
    status: "cancelled",
    date: "2024-03-14",
    time: "09:00 - 10:00",
    project: "Ghana Coastal Wind Farm",
    attendees: [{ id: "7", name: "Akua Mensah", role: "CEO, West Wind Energy", avatar: "/ghanaian-businesswoman.jpg" }],
    agenda: "Discussion of revised financing terms",
    notes: "Rescheduled to next week",
    cancellationReason: "Scheduling conflict - investor travel delay",
  },
]

const statusConfig: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
  confirmed: { label: "Confirmed", color: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-600", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-500/10 text-red-600", icon: XCircle },
}

export default function MeetingsContent() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState<(typeof meetings)[0] | null>(null)
  const [scheduleStep, setScheduleStep] = useState(1)

  const upcomingMeetings = meetings.filter((m) => m.status !== "cancelled")
  const todayMeetings = meetings.filter((m) => m.date === "2024-03-15")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Meetings</h1>
          <p className="text-muted-foreground">Schedule and manage your investor meetings</p>
        </div>
        <Button onClick={() => setShowScheduleDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Schedule Meeting
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Meetings", value: "2", color: "text-primary" },
          { label: "This Week", value: "6", color: "text-accent" },
          { label: "Pending Responses", value: "3", color: "text-amber-500" },
          { label: "Completed", value: "12", color: "text-emerald-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={cn("text-3xl font-bold", stat.color)}>{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>March 2024</CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mini Calendar */}
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                <div key={`${day}-${i}`} className="p-2 text-muted-foreground font-medium">
                  {day}
                </div>
              ))}
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                const hasEvent = [15, 16, 17].includes(day)
                const isToday = day === 15
                return (
                  <button
                    key={day}
                    className={cn(
                      "p-2 rounded-lg transition-colors relative",
                      isToday && "bg-primary text-primary-foreground",
                      !isToday && hasEvent && "bg-primary/10 text-primary",
                      !isToday && !hasEvent && "hover:bg-muted",
                    )}
                  >
                    {day}
                    {hasEvent && !isToday && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Today's Schedule */}
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Today&apos;s Schedule</h4>
              <div className="space-y-2">
                {todayMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    onClick={() => setSelectedMeeting(meeting)}
                    className="p-3 rounded-lg bg-muted cursor-pointer hover:bg-muted/80 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {meeting.type === "virtual" ? (
                        <Video className="w-4 h-4 text-primary" />
                      ) : (
                        <MapPin className="w-4 h-4 text-accent" />
                      )}
                      <span className="text-sm font-medium">{meeting.time}</span>
                    </div>
                    <p className="text-sm line-clamp-1">{meeting.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meetings List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search meetings..." className="pl-10" />
            </div>
            <Button variant="outline" size="icon" className="bg-transparent">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-4">
              {upcomingMeetings.map((meeting, i) => {
                const StatusIcon = statusConfig[meeting.status].icon
                return (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => setSelectedMeeting(meeting)}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-stretch">
                          {/* Date sidebar */}
                          <div className="w-20 shrink-0 bg-gradient-to-b from-primary/10 to-accent/10 flex flex-col items-center justify-center p-4 border-r">
                            <span className="text-xs text-muted-foreground uppercase">
                              {new Date(meeting.date).toLocaleDateString("en-US", { weekday: "short" })}
                            </span>
                            <span className="text-2xl font-bold">{new Date(meeting.date).getDate()}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(meeting.date).toLocaleDateString("en-US", { month: "short" })}
                            </span>
                          </div>

                          {/* Content */}
                          <div className="flex-1 p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge className={statusConfig[meeting.status].color}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {statusConfig[meeting.status].label}
                                  </Badge>
                                  <Badge variant="outline">
                                    {meeting.type === "virtual" ? (
                                      <>
                                        <Video className="w-3 h-3 mr-1" /> Virtual
                                      </>
                                    ) : (
                                      <>
                                        <MapPin className="w-3 h-3 mr-1" /> In-Person
                                      </>
                                    )}
                                  </Badge>
                                </div>
                                <h3 className="font-semibold">{meeting.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {meeting.time}
                                  </span>
                                  {meeting.project && (
                                    <span className="flex items-center gap-1">
                                      <Building2 className="w-4 h-4" />
                                      {meeting.project}
                                    </span>
                                  )}
                                </div>
                              </div>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                                  </DropdownMenuItem>
                                  {meeting.meetingLink && (
                                    <DropdownMenuItem>
                                      <ExternalLink className="mr-2 h-4 w-4" /> Copy Link
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" /> Cancel
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Attendees */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t">
                              <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {meeting.attendees.slice(0, 4).map((attendee) => (
                                    <Avatar key={attendee.id} className="w-8 h-8 border-2 border-background">
                                      <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                                      <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {meeting.attendees.length} attendee{meeting.attendees.length !== 1 ? "s" : ""}
                                </span>
                              </div>
                              {meeting.status === "confirmed" && (
                                <Button size="sm" className="gap-2">
                                  {meeting.type === "virtual" ? (
                                    <>
                                      <Video className="w-4 h-4" />
                                      Join Meeting
                                    </>
                                  ) : (
                                    <>
                                      <MapPin className="w-4 h-4" />
                                      Get Directions
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </TabsContent>

            <TabsContent value="past">
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold">No past meetings</h3>
                <p className="text-muted-foreground">Completed meetings will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="cancelled">
              <div className="space-y-4 mt-4">
                {meetings
                  .filter((m) => m.status === "cancelled")
                  .map((meeting) => (
                    <Card key={meeting.id} className="opacity-60">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge className={statusConfig.cancelled.color}>Cancelled</Badge>
                            <h3 className="font-semibold mt-2 line-through">{meeting.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {meeting.date} &bull; {meeting.time}
                            </p>
                            {meeting.cancellationReason && (
                              <p className="text-sm text-muted-foreground mt-2">Reason: {meeting.cancellationReason}</p>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Reschedule
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Schedule Meeting Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
            <DialogDescription>Set up a meeting with investors or project stakeholders</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Meeting Title</Label>
              <Input placeholder="e.g., Initial Pitch: Project Name" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meeting Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="virtual">Virtual Meeting</SelectItem>
                  <SelectItem value="in-person">In-Person Meeting</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Project (Optional)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Link to a project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sahel">Sahel Solar Mega Farm</SelectItem>
                  <SelectItem value="lagos">Lagos Smart Grid Modernization</SelectItem>
                  <SelectItem value="ghana">Ghana Coastal Wind Farm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Invite Attendees</Label>
              <Input placeholder="Search by name or email..." />
            </div>

            <div className="space-y-2">
              <Label>Agenda</Label>
              <Textarea placeholder="Meeting agenda and topics to discuss..." rows={3} />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowScheduleDialog(false)}>Send Invitations</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Meeting Details Dialog */}
      <Dialog open={!!selectedMeeting} onOpenChange={() => setSelectedMeeting(null)}>
        <DialogContent className="max-w-2xl">
          {selectedMeeting && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={statusConfig[selectedMeeting.status].color}>
                    {statusConfig[selectedMeeting.status].label}
                  </Badge>
                  <Badge variant="outline">
                    {selectedMeeting.type === "virtual" ? (
                      <>
                        <Video className="w-3 h-3 mr-1" /> Virtual
                      </>
                    ) : (
                      <>
                        <MapPin className="w-3 h-3 mr-1" /> In-Person
                      </>
                    )}
                  </Badge>
                </div>
                <DialogTitle className="text-xl">{selectedMeeting.title}</DialogTitle>
                <DialogDescription>
                  {selectedMeeting.date} &bull; {selectedMeeting.time}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {selectedMeeting.project && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Related Project</p>
                      <p className="font-medium">{selectedMeeting.project}</p>
                    </div>
                  </div>
                )}

                {selectedMeeting.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedMeeting.location}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-3">Attendees ({selectedMeeting.attendees.length})</h4>
                  <div className="space-y-2">
                    {selectedMeeting.attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{attendee.name}</p>
                            <p className="text-sm text-muted-foreground">{attendee.role}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Agenda</h4>
                  <p className="text-muted-foreground">{selectedMeeting.agenda}</p>
                </div>

                {selectedMeeting.notes && (
                  <div>
                    <h4 className="font-semibold mb-2">Notes</h4>
                    <p className="text-muted-foreground">{selectedMeeting.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedMeeting(null)}>
                  Close
                </Button>
                {selectedMeeting.status === "confirmed" && (
                  <Button className="gap-2">
                    {selectedMeeting.type === "virtual" ? (
                      <>
                        <Video className="w-4 h-4" />
                        Join Meeting
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4" />
                        Get Directions
                      </>
                    )}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
