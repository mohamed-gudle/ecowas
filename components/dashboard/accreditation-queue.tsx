"use client"

import { motion } from "framer-motion"
import { Shield, Clock, ChevronRight, Filter, Search, MoreHorizontal, Eye, UserCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/ui/status-badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const mockApplications = [
  {
    id: "ECO-2026-00142",
    name: "Amina Okonkwo",
    organization: "Nigerian Ministry of Environment",
    country: "Nigeria",
    cluster: "Government",
    status: "under_review",
    completeness: 95,
    submittedAt: "2 hours ago",
    duplicateRisk: false,
    avatar: null,
  },
  {
    id: "ECO-2026-00141",
    name: "Jean-Claude Mbeki",
    organization: "AfDB Climate Fund",
    country: "Côte d'Ivoire",
    cluster: "Investor",
    status: "security_pending",
    completeness: 100,
    submittedAt: "4 hours ago",
    duplicateRisk: false,
    avatar: null,
  },
  {
    id: "ECO-2026-00140",
    name: "Sarah Mensah",
    organization: "Ghana Climate Action",
    country: "Ghana",
    cluster: "NGO",
    status: "submitted",
    completeness: 85,
    submittedAt: "5 hours ago",
    duplicateRisk: true,
    avatar: null,
  },
  {
    id: "ECO-2026-00139",
    name: "Ibrahim Diallo",
    organization: "Senegal Broadcasting",
    country: "Senegal",
    cluster: "Media",
    status: "under_review",
    completeness: 100,
    submittedAt: "6 hours ago",
    duplicateRisk: false,
    avatar: null,
  },
  {
    id: "ECO-2026-00138",
    name: "Fatima Al-Hassan",
    organization: "Morocco Solar Initiative",
    country: "Morocco",
    cluster: "Private Sector",
    status: "submitted",
    completeness: 90,
    submittedAt: "8 hours ago",
    duplicateRisk: false,
    avatar: null,
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
  approved: { label: "Approved", variant: "success" },
  rejected: { label: "Rejected", variant: "error" },
}

export function AccreditationQueue() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-xl border border-border shadow-lg"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Accreditation Queue</h2>
              <p className="text-sm text-muted-foreground">24 applications pending review</p>
            </div>
          </div>
          <Link href="/dashboard/accreditation">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search applications..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="security_pending">Security Check</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
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
          <Button variant="outline" size="icon" className="bg-transparent">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Applicant</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Cluster</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Completeness</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Submitted</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockApplications.map((app, index) => (
              <motion.tr
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={app.avatar || undefined} />
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {app.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{app.name}</p>
                        {app.duplicateRisk && (
                          <Badge
                            variant="outline"
                            className="bg-destructive/10 text-destructive border-destructive/20 text-xs"
                          >
                            Duplicate?
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{app.organization}</p>
                      <p className="text-xs text-muted-foreground font-mono">{app.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="outline" className="bg-muted">
                    {app.cluster}
                  </Badge>
                </td>
                <td className="p-4">
                  <StatusBadge
                    status={statusConfig[app.status].label}
                    variant={statusConfig[app.status].variant}
                    pulse={app.status === "security_pending"}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          app.completeness === 100 ? "bg-success" : app.completeness >= 90 ? "bg-primary" : "bg-warning"
                        }`}
                        style={{ width: `${app.completeness}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{app.completeness}%</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {app.submittedAt}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-success">
                      <UserCheck className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Request Info</DropdownMenuItem>
                        <DropdownMenuItem>Forward to Security</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Reject</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
