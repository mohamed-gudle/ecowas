"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  CheckCircle2,
  AlertCircle,
  Upload,
  Download,
  Eye,
  Edit,
  Play,
  MoreHorizontal,
  Mic,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { cn } from "@/lib/utils"

const sessions = [
  {
    id: "1",
    title: "Opening Ceremony: Climate Action for Africa's Future",
    type: "Keynote Address",
    role: "Keynote Speaker",
    date: "2024-03-15",
    dateFormatted: "Friday, March 15, 2024",
    time: "09:00 - 10:30",
    venue: "Grand Ballroom",
    building: "Main Convention Center",
    capacity: 2000,
    registered: 1856,
    status: "confirmed",
    description:
      "Deliver the opening keynote address setting the vision for regional climate action and collaboration among ECOWAS member states.",
    materials: {
      presentation: { uploaded: true, name: "Opening_Keynote_v3.pptx", size: "24.5 MB" },
      bio: { uploaded: true, name: "Speaker_Bio.pdf", size: "156 KB" },
      abstract: { uploaded: true, name: "Session_Abstract.docx", size: "45 KB" },
    },
    techCheck: { scheduled: "2024-03-14 14:00", completed: false },
    streaming: true,
    recording: true,
    interpretation: ["French", "Portuguese", "Arabic"],
    moderator: { name: "Dr. Fatima Diallo", role: "ECOWAS Commission Director" },
    coPanelists: [],
  },
  {
    id: "2",
    title: "Panel: Women in Climate Leadership",
    type: "Panel Discussion",
    role: "Panelist",
    date: "2024-03-16",
    dateFormatted: "Saturday, March 16, 2024",
    time: "14:00 - 15:30",
    venue: "Hall A",
    building: "Main Convention Center",
    capacity: 500,
    registered: 423,
    status: "pending_materials",
    description:
      "Join fellow women leaders in discussing the critical role of women in driving climate policy and sustainable development across the region.",
    materials: {
      presentation: { uploaded: false, name: null, size: null },
      bio: { uploaded: true, name: "Speaker_Bio.pdf", size: "156 KB" },
      abstract: { uploaded: false, name: null, size: null },
    },
    techCheck: { scheduled: "2024-03-15 10:00", completed: false },
    streaming: true,
    recording: true,
    interpretation: ["French", "English"],
    moderator: { name: "Ms. Aisha Bello", role: "AfDB Director" },
    coPanelists: [
      { name: "Dr. Ngozi Okonjo-Iweala", role: "WTO Director-General" },
      { name: "H.E. Ellen Johnson Sirleaf", role: "Former President of Liberia" },
      { name: "Ms. Vanessa Nakate", role: "Climate Activist" },
    ],
  },
]

const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
    confirmed: {
      label: "Confirmed",
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
      icon: CheckCircle2,
    },
    pending_materials: {
      label: "Materials Pending",
      color: "bg-amber-500/10 text-amber-600 border-amber-500/30",
      icon: AlertCircle,
    },
    draft: { label: "Draft", color: "bg-slate-500/10 text-slate-600 border-slate-500/30", icon: Edit },
  }
  return configs[status] || configs.draft
}

export default function MySessions() {
  const [selectedSession, setSelectedSession] = useState<(typeof sessions)[0] | null>(null)
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadType, setUploadType] = useState<string>("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Sessions</h1>
          <p className="text-muted-foreground">Manage your speaking engagements and materials</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Schedule
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Add to Calendar
          </Button>
        </div>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Sessions", value: "2", subtext: "This summit" },
          { label: "Confirmed", value: "1", subtext: "Ready to present" },
          { label: "Materials Due", value: "2", subtext: "Files pending" },
          { label: "Tech Checks", value: "0/2", subtext: "Completed" },
        ].map((stat, i) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.subtext}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((session, i) => {
          const statusConfig = getStatusConfig(session.status)
          const StatusIcon = statusConfig.icon
          const materialsComplete = Object.values(session.materials).every((m) => m.uploaded)
          const materialsCount = Object.values(session.materials).filter((m) => m.uploaded).length
          const totalMaterials = Object.keys(session.materials).length

          return (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-1 bg-gradient-to-r from-primary to-accent" />
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Left: Session Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{session.type}</Badge>
                            <Badge variant="outline">{session.role}</Badge>
                            <Badge className={cn("gap-1", statusConfig.color)}>
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig.label}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold">{session.title}</h3>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedSession(session)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" /> Edit Info
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download Brief
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <p className="text-muted-foreground">{session.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {session.dateFormatted}
                        </span>
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          {session.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {session.venue}, {session.building}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          {session.registered.toLocaleString()} / {session.capacity.toLocaleString()} registered
                        </span>
                      </div>

                      {/* Features */}
                      <div className="flex items-center gap-3">
                        {session.streaming && (
                          <Badge variant="outline" className="gap-1">
                            <Video className="w-3 h-3" />
                            Livestream
                          </Badge>
                        )}
                        {session.recording && (
                          <Badge variant="outline" className="gap-1">
                            <Play className="w-3 h-3" />
                            Recording
                          </Badge>
                        )}
                        {session.interpretation.length > 0 && (
                          <Badge variant="outline" className="gap-1">
                            <Mic className="w-3 h-3" />
                            {session.interpretation.length} languages
                          </Badge>
                        )}
                      </div>

                      {/* Co-panelists */}
                      {session.coPanelists.length > 0 && (
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground mb-2">Fellow Panelists:</p>
                          <div className="flex flex-wrap gap-2">
                            {session.coPanelists.map((panelist) => (
                              <Badge key={panelist.name} variant="secondary" className="gap-1">
                                {panelist.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Materials & Actions */}
                    <div className="lg:w-80 space-y-4">
                      {/* Materials Progress */}
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-sm">Materials</CardTitle>
                            <span className="text-xs text-muted-foreground">
                              {materialsCount}/{totalMaterials}
                            </span>
                          </div>
                          <Progress value={(materialsCount / totalMaterials) * 100} className="h-1.5" />
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {Object.entries(session.materials).map(([key, value]) => (
                            <div
                              key={key}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-lg",
                                value.uploaded ? "bg-emerald-500/5" : "bg-amber-500/5",
                              )}
                            >
                              <div className="flex items-center gap-2">
                                {value.uploaded ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                ) : (
                                  <AlertCircle className="w-4 h-4 text-amber-500" />
                                )}
                                <span className="text-sm capitalize">{key.replace("_", " ")}</span>
                              </div>
                              {value.uploaded ? (
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setUploadType(key)
                                    setShowUploadDialog(true)
                                  }}
                                >
                                  <Upload className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      {/* Tech Check */}
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Technical Check</span>
                            <Badge variant={session.techCheck.completed ? "default" : "secondary"}>
                              {session.techCheck.completed ? "Completed" : "Scheduled"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {new Date(session.techCheck.scheduled).toLocaleString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                            <Video className="w-4 h-4" />
                            {session.techCheck.completed ? "View Recording" : "Join Tech Check"}
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Quick Actions */}
                      <div className="flex flex-col gap-2">
                        <Link href="/speaker/cockpit">
                          <Button className="w-full gap-2 bg-gradient-to-r from-primary to-accent">
                            <Play className="w-4 h-4" />
                            Enter Session Cockpit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="w-full gap-2 bg-transparent"
                          onClick={() => setSelectedSession(session)}
                        >
                          <Eye className="w-4 h-4" />
                          View Full Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Session Detail Dialog */}
      <Dialog open={!!selectedSession} onOpenChange={() => setSelectedSession(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedSession && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{selectedSession.type}</Badge>
                  <Badge variant="outline">{selectedSession.role}</Badge>
                </div>
                <DialogTitle className="text-xl">{selectedSession.title}</DialogTitle>
                <DialogDescription>{selectedSession.description}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details" className="mt-4">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Date & Time</p>
                      <p className="font-medium">{selectedSession.dateFormatted}</p>
                      <p>{selectedSession.time}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Venue</p>
                      <p className="font-medium">{selectedSession.venue}</p>
                      <p>{selectedSession.building}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Expected Attendance</p>
                      <p className="font-medium">{selectedSession.registered.toLocaleString()} registered</p>
                      <p className="text-sm">Capacity: {selectedSession.capacity.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Moderator</p>
                      <p className="font-medium">{selectedSession.moderator.name}</p>
                      <p className="text-sm">{selectedSession.moderator.role}</p>
                    </div>
                  </div>

                  {selectedSession.coPanelists.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground mb-3">Fellow Panelists</p>
                      <div className="space-y-2">
                        {selectedSession.coPanelists.map((p) => (
                          <div key={p.name} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              {p.name[0]}
                            </div>
                            <div>
                              <p className="font-medium">{p.name}</p>
                              <p className="text-sm text-muted-foreground">{p.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="materials" className="space-y-4 mt-4">
                  {Object.entries(selectedSession.materials).map(([key, value]) => (
                    <div
                      key={key}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border",
                        value.uploaded
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : "bg-amber-500/5 border-amber-500/20",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {value.uploaded ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-amber-500" />
                        )}
                        <div>
                          <p className="font-medium capitalize">{key.replace("_", " ")}</p>
                          {value.uploaded ? (
                            <p className="text-sm text-muted-foreground">
                              {value.name} ({value.size})
                            </p>
                          ) : (
                            <p className="text-sm text-amber-600">Upload required</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {value.uploaded ? (
                          <>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button variant="outline" size="sm">
                              Replace
                            </Button>
                          </>
                        ) : (
                          <Button size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="technical" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-4 h-4 text-primary" />
                        <span className="font-medium">Livestream</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.streaming ? "Enabled - Session will be broadcast live" : "Disabled"}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="w-4 h-4 text-primary" />
                        <span className="font-medium">Recording</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedSession.recording ? "Enabled - Session will be recorded" : "Disabled"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <Mic className="w-4 h-4 text-primary" />
                      <span className="font-medium">Simultaneous Interpretation</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedSession.interpretation.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Technical Check</span>
                      </div>
                      <Badge variant={selectedSession.techCheck.completed ? "default" : "secondary"}>
                        {selectedSession.techCheck.completed ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Scheduled: {new Date(selectedSession.techCheck.scheduled).toLocaleString()}
                    </p>
                    <Button className="w-full">
                      {selectedSession.techCheck.completed ? "View Results" : "Join Tech Check"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button variant="outline" onClick={() => setSelectedSession(null)}>
                  Close
                </Button>
                <Link href="/speaker/cockpit">
                  <Button className="gap-2">
                    <Play className="w-4 h-4" />
                    Enter Session Cockpit
                  </Button>
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="capitalize">Upload {uploadType.replace("_", " ")}</DialogTitle>
            <DialogDescription>
              Upload your {uploadType.replace("_", " ")} file. Supported formats: PDF, PPTX, DOCX (max 50MB)
            </DialogDescription>
          </DialogHeader>
          <div className="border-2 border-dashed rounded-xl p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium">Drag and drop your file here</p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
            <Button>Select File</Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
