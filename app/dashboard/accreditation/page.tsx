"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import {
  Shield,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  UserCheck,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send,
  FileText,
  RefreshCw,
  Mail,
  Building2,
  Globe,
  Phone,
  BadgeCheck,
  AlertTriangle,
  Info,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/ui/status-badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Mock data
const mockApplications = [
  {
    id: "ECO-2026-00142",
    name: "Amina Okonkwo",
    email: "amina.okonkwo@env.gov.ng",
    organization: "Nigerian Ministry of Environment",
    country: "Nigeria",
    cluster: "Government",
    status: "under_review",
    completeness: 95,
    submittedAt: "2025-01-10T14:30:00Z",
    duplicateRisk: false,
    securityStatus: null,
    phone: "+234 801 234 5678",
    title: "Director of Climate Affairs",
    bio: "Leading climate policy expert with 15 years of experience in environmental governance...",
    documents: ["Passport", "Official Letter", "Photo"],
  },
  {
    id: "ECO-2026-00141",
    name: "Jean-Claude Mbeki",
    email: "jc.mbeki@afdb.org",
    organization: "AfDB Climate Fund",
    country: "Côte d'Ivoire",
    cluster: "Investor",
    status: "security_pending",
    completeness: 100,
    submittedAt: "2025-01-10T10:15:00Z",
    duplicateRisk: false,
    securityStatus: "pending",
    phone: "+225 07 123 456",
    title: "Senior Investment Officer",
    bio: "Climate finance specialist focused on renewable energy projects across West Africa...",
    documents: ["Passport", "Employment Letter", "Photo"],
  },
  {
    id: "ECO-2026-00140",
    name: "Sarah Mensah",
    email: "sarah@ghanaclimate.org",
    organization: "Ghana Climate Action",
    country: "Ghana",
    cluster: "NGO",
    status: "submitted",
    completeness: 85,
    submittedAt: "2025-01-10T08:45:00Z",
    duplicateRisk: true,
    securityStatus: null,
    phone: "+233 24 567 8901",
    title: "Program Director",
    bio: "Youth climate activist and program director with expertise in community-based adaptation...",
    documents: ["Passport", "Photo"],
  },
  {
    id: "ECO-2026-00139",
    name: "Ibrahim Diallo",
    email: "ibrahim.diallo@rts.sn",
    organization: "Senegal Broadcasting",
    country: "Senegal",
    cluster: "Media",
    status: "approved",
    completeness: 100,
    submittedAt: "2025-01-09T16:20:00Z",
    duplicateRisk: false,
    securityStatus: "cleared",
    phone: "+221 77 890 1234",
    title: "Senior Correspondent",
    bio: "Award-winning journalist covering environmental issues in the Sahel region...",
    documents: ["Passport", "Press ID", "Photo"],
  },
  {
    id: "ECO-2026-00138",
    name: "Fatima Al-Hassan",
    email: "fatima@moroccsolar.ma",
    organization: "Morocco Solar Initiative",
    country: "Morocco",
    cluster: "Private Sector",
    status: "security_pending",
    completeness: 90,
    submittedAt: "2025-01-09T12:00:00Z",
    duplicateRisk: false,
    securityStatus: "pending",
    phone: "+212 6 12 34 56 78",
    title: "CEO",
    bio: "Renewable energy entrepreneur leading Morocco's largest solar installation company...",
    documents: ["Passport", "Business Registration", "Photo"],
  },
]

const statusConfig: Record<
  string,
  { label: string; variant: "default" | "success" | "warning" | "error" | "info" | "pending" }
> = {
  draft: { label: "Draft", variant: "default" },
  submitted: { label: "Submitted", variant: "info" },
  under_review: { label: "Under Review", variant: "pending" },
  security_pending: { label: "Security Check", variant: "warning" },
  security_cleared: { label: "Cleared", variant: "success" },
  security_rejected: { label: "Sec. Rejected", variant: "error" },
  approved: { label: "Approved", variant: "success" },
  conditionally_approved: { label: "Conditional", variant: "warning" },
  rejected: { label: "Rejected", variant: "error" },
  cancelled: { label: "Cancelled", variant: "default" },
}

const statusTabs = [
  { value: "all", label: "All Applications", count: 324 },
  { value: "submitted", label: "New Submissions", count: 48 },
  { value: "under_review", label: "Under Review", count: 86 },
  { value: "security_pending", label: "Security Check", count: 65 },
  { value: "approved", label: "Approved", count: 125 },
]

const zones = [
  { id: "main_hall", name: "Main Hall", icon: "🏛️", description: "Primary plenary sessions" },
  { id: "exhibition", name: "Exhibition Area", icon: "🎪", description: "Investment showcase" },
  { id: "vip_lounge", name: "VIP Lounge", icon: "👑", description: "Heads of State area" },
  { id: "press_center", name: "Press Center", icon: "📰", description: "Media briefings" },
  { id: "dealroom", name: "Dealroom", icon: "🤝", description: "Private meetings" },
  { id: "dining", name: "Dining Hall", icon: "🍽️", description: "Catering facilities" },
]

export default function AccreditationPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<(typeof mockApplications)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [quickApproveOpen, setQuickApproveOpen] = useState(false)
  const [quickRejectOpen, setQuickRejectOpen] = useState(false)
  const [selectedZones, setSelectedZones] = useState<string[]>(["main_hall", "exhibition"])
  const [rejectionReason, setRejectionReason] = useState("")
  const [rejectionComments, setRejectionComments] = useState("")
  const [approvalNotes, setApprovalNotes] = useState("")

  const openDetails = (app: (typeof mockApplications)[0]) => {
    setSelectedApplication(app)
    setDetailsOpen(true)
  }

  const handleQuickApprove = (app: (typeof mockApplications)[0], e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedApplication(app)
    setSelectedZones(["main_hall", "exhibition"])
    setApprovalNotes("")
    setQuickApproveOpen(true)
  }

  const handleQuickReject = (app: (typeof mockApplications)[0], e?: React.MouseEvent) => {
    e?.stopPropagation()
    setSelectedApplication(app)
    setRejectionReason("")
    setRejectionComments("")
    setQuickRejectOpen(true)
  }

  const confirmQuickApprove = () => {
    console.log("Approving:", selectedApplication?.id, "with zones:", selectedZones)
    setQuickApproveOpen(false)
    setSelectedApplication(null)
  }

  const confirmQuickReject = () => {
    console.log("Rejecting:", selectedApplication?.id, "reason:", rejectionReason)
    setQuickRejectOpen(false)
    setSelectedApplication(null)
  }

  const filteredApps =
    selectedTab === "all" ? mockApplications : mockApplications.filter((app) => app.status === selectedTab)

  const toggleZone = (zoneId: string) => {
    setSelectedZones((prev) => (prev.includes(zoneId) ? prev.filter((z) => z !== zoneId) : [...prev, zoneId]))
  }

  return (
    <div className="min-h-screen">
      <Header title="Accreditation Command Center" subtitle="Manage and process all accreditation applications" />

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Total Applications", value: "3,247", icon: FileText, color: "text-primary" },
            { label: "Pending Review", value: "134", icon: Clock, color: "text-warning" },
            { label: "Security Checks", value: "65", icon: Shield, color: "text-secondary" },
            { label: "Approved Today", value: "42", icon: CheckCircle2, color: "text-success" },
            { label: "Rejection Rate", value: "4.2%", icon: AlertCircle, color: "text-destructive" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-4"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-bold truncate">{stat.value}</p>
                  <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border shadow-lg"
        >
          {/* Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="p-4 border-b border-border">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="overflow-x-auto">
                  <TabsList className="bg-muted/50 inline-flex w-auto">
                    {statusTabs.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value} className="gap-2 whitespace-nowrap">
                        <span className="hidden sm:inline">{tab.label}</span>
                        <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                        <Badge variant="secondary" className="ml-1">
                          {tab.count}
                        </Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <RefreshCw className="w-4 h-4" /> <span className="hidden sm:inline">Refresh</span>
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search by name, email, organization, or ID..." className="pl-9" />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 sm:w-40">
                      <SelectValue placeholder="Cluster" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Clusters</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="private">Private Sector</SelectItem>
                      <SelectItem value="investor">Investor</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" className="bg-transparent shrink-0">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value={selectedTab} className="m-0">
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground w-10">
                        <Checkbox />
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Applicant</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cluster</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Country</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Complete</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground">Submitted</th>
                      <th className="text-left p-4 text-sm font-medium text-muted-foreground w-32">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApps.map((app, index) => (
                      <motion.tr
                        key={app.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer"
                        onClick={() => openDetails(app)}
                      >
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <Checkbox />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 shrink-0">
                              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                {app.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium truncate">{app.name}</p>
                                {app.duplicateRisk && (
                                  <Badge
                                    variant="outline"
                                    className="bg-destructive/10 text-destructive border-destructive/20 text-xs shrink-0"
                                  >
                                    Duplicate?
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate max-w-[200px]">{app.organization}</p>
                              <p className="text-xs text-muted-foreground font-mono">{app.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="bg-muted whitespace-nowrap">
                            {app.cluster}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm whitespace-nowrap">{app.country}</td>
                        <td className="p-4">
                          <StatusBadge
                            status={statusConfig[app.status].label}
                            variant={statusConfig[app.status].variant}
                            pulse={app.status === "security_pending"}
                          />
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  app.completeness === 100
                                    ? "bg-success"
                                    : app.completeness >= 90
                                      ? "bg-primary"
                                      : "bg-warning"
                                }`}
                                style={{ width: `${app.completeness}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{app.completeness}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap">
                            <Clock className="w-4 h-4" />
                            {new Date(app.submittedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="w-8 h-8" onClick={() => openDetails(app)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-success hover:text-success hover:bg-success/10"
                              onClick={(e) => handleQuickApprove(app, e)}
                            >
                              <UserCheck className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={(e) => handleQuickReject(app, e)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="w-8 h-8">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openDetails(app)}>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Request Info</DropdownMenuItem>
                                <DropdownMenuItem>Forward to Security</DropdownMenuItem>
                                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  Showing 1-{filteredApps.length} of {statusTabs.find((t) => t.value === selectedTab)?.count || 324}{" "}
                  applications
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled className="bg-transparent">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-primary/10 border-primary text-primary">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    3
                  </Button>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="shrink-0">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 shrink-0">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {selectedApplication?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <DialogTitle className="text-xl">{selectedApplication?.name}</DialogTitle>
                  {selectedApplication && (
                    <StatusBadge
                      status={statusConfig[selectedApplication.status].label}
                      variant={statusConfig[selectedApplication.status].variant}
                    />
                  )}
                </div>
                <DialogDescription className="mt-1">
                  {selectedApplication?.title} at {selectedApplication?.organization}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="space-y-6 py-4">
              {/* Application Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Application ID</p>
                  <p className="font-mono font-medium">{selectedApplication?.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium">
                    {selectedApplication && new Date(selectedApplication.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="truncate">{selectedApplication?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{selectedApplication?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{selectedApplication?.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                    <Badge variant="outline">{selectedApplication?.cluster}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Biography */}
              <div>
                <h4 className="font-semibold mb-2">Biography</h4>
                <p className="text-sm text-muted-foreground">{selectedApplication?.bio}</p>
              </div>

              <Separator />

              {/* Documents */}
              <div>
                <h4 className="font-semibold mb-3">Documents</h4>
                <div className="space-y-2">
                  {selectedApplication?.documents.map((doc) => (
                    <div key={doc} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium text-sm">{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Application Completeness */}
              <div>
                <h4 className="font-semibold mb-3">Application Completeness</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{selectedApplication?.completeness}% Complete</span>
                    {selectedApplication?.completeness === 100 ? (
                      <Badge className="bg-success/10 text-success border-success/20">Complete</Badge>
                    ) : (
                      <Badge className="bg-warning/10 text-warning border-warning/20">Incomplete</Badge>
                    )}
                  </div>
                  <Progress value={selectedApplication?.completeness} className="h-2" />
                  {selectedApplication?.completeness !== 100 && (
                    <p className="text-xs text-muted-foreground">Missing: Official invitation letter</p>
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>

          <DialogFooter className="shrink-0 flex-row gap-2 sm:gap-2">
            <Button variant="outline" onClick={() => setDetailsOpen(false)} className="flex-1 sm:flex-none">
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDetailsOpen(false)
                if (selectedApplication) handleQuickReject(selectedApplication)
              }}
              className="flex-1 sm:flex-none"
            >
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
            <Button
              className="bg-success hover:bg-success/90 text-white flex-1 sm:flex-none"
              onClick={() => {
                setDetailsOpen(false)
                if (selectedApplication) handleQuickApprove(selectedApplication)
              }}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Approve Dialog */}
      <Dialog open={quickApproveOpen} onOpenChange={setQuickApproveOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-success" />
              Approve Application
            </DialogTitle>
            <DialogDescription>Review and approve the accreditation for {selectedApplication?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Applicant Summary Card */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedApplication?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{selectedApplication?.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{selectedApplication?.organization}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {selectedApplication?.cluster}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{selectedApplication?.country}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zone Selection */}
            <div>
              <Label className="text-base font-semibold">Access Zones</Label>
              <p className="text-sm text-muted-foreground mb-3">Select areas the delegate can access</p>
              <div className="grid grid-cols-2 gap-2">
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => toggleZone(zone.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      selectedZones.includes(zone.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-muted-foreground/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{zone.icon}</span>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{zone.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{zone.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="approval-notes">Notes (Optional)</Label>
              <Textarea
                id="approval-notes"
                placeholder="Add any notes for this approval..."
                value={approvalNotes}
                onChange={(e) => setApprovalNotes(e.target.value)}
                className="mt-2"
                rows={2}
              />
            </div>

            {/* Info Banner */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
              <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary">Approval Process</p>
                <p className="text-muted-foreground">
                  The delegate will receive an email with their badge and access details.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setQuickApproveOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmQuickApprove} className="bg-success hover:bg-success/90 text-white gap-2">
              <Sparkles className="w-4 h-4" />
              Approve Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quick Reject Dialog */}
      <Dialog open={quickRejectOpen} onOpenChange={setQuickRejectOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Reject Application
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedApplication?.name}&apos;s application
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Applicant Summary */}
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {selectedApplication?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold truncate">{selectedApplication?.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{selectedApplication?.organization}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rejection Reason */}
            <div>
              <Label htmlFor="rejection-reason">Rejection Reason</Label>
              <Select value={rejectionReason} onValueChange={setRejectionReason}>
                <SelectTrigger id="rejection-reason" className="mt-2">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incomplete">Incomplete Application</SelectItem>
                  <SelectItem value="invalid_docs">Invalid Documents</SelectItem>
                  <SelectItem value="security_concern">Security Concerns</SelectItem>
                  <SelectItem value="duplicate">Duplicate Application</SelectItem>
                  <SelectItem value="ineligible">Not Eligible</SelectItem>
                  <SelectItem value="capacity">Capacity Reached</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comments */}
            <div>
              <Label htmlFor="rejection-comments">Additional Comments</Label>
              <Textarea
                id="rejection-comments"
                placeholder="Provide additional context for the rejection..."
                value={rejectionComments}
                onChange={(e) => setRejectionComments(e.target.value)}
                className="mt-2"
                rows={3}
              />
            </div>

            {/* Warning Banner */}
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
              <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-destructive">This action cannot be undone</p>
                <p className="text-muted-foreground">
                  The applicant will be notified of the rejection and will need to reapply.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setQuickRejectOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmQuickReject} disabled={!rejectionReason} className="gap-2">
              <Send className="w-4 h-4" />
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
