"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import {
  CreditCard,
  Search,
  QrCode,
  Printer,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertCircle,
  Filter,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const mockBadges = [
  {
    id: "BDG-001",
    applicantId: "ECO-2026-00139",
    name: "Ibrahim Diallo",
    organization: "Senegal Broadcasting",
    cluster: "Media",
    country: "Senegal",
    status: "printed",
    printedAt: "2025-01-11T09:30:00Z",
    printedBy: "Badge Desk A",
    accessZones: ["Main Hall", "Media Center", "Exhibition"],
    qrCode: "ECO2026-BD001-VERIFY",
  },
  {
    id: "BDG-002",
    applicantId: "ECO-2026-00145",
    name: "Dr. Amina Nkrumah",
    organization: "ECOWAS Commission",
    cluster: "Government",
    country: "Ghana",
    status: "ready",
    printedAt: null,
    printedBy: null,
    accessZones: ["Main Hall", "VIP Lounge", "Restricted Areas", "Exhibition"],
    qrCode: "ECO2026-BD002-VERIFY",
  },
  {
    id: "BDG-003",
    applicantId: "ECO-2026-00150",
    name: "Marcus Chen",
    organization: "Green Africa Fund",
    cluster: "Investor",
    country: "Kenya",
    status: "ready",
    printedAt: null,
    printedBy: null,
    accessZones: ["Main Hall", "VIP Lounge", "Dealroom", "Exhibition"],
    qrCode: "ECO2026-BD003-VERIFY",
  },
]

const clusterColors: Record<string, string> = {
  Government: "bg-primary text-primary-foreground",
  Media: "bg-secondary text-secondary-foreground",
  Investor: "bg-success text-success-foreground",
  "Private Sector": "bg-accent text-accent-foreground",
  NGO: "bg-warning text-warning-foreground",
  Speaker: "bg-destructive text-destructive-foreground",
}

export default function BadgeManagementPage() {
  const [selectedBadge, setSelectedBadge] = useState<(typeof mockBadges)[0] | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const openPreview = (badge: (typeof mockBadges)[0]) => {
    setSelectedBadge(badge)
    setPreviewOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header title="Badge Management" subtitle="Issue and manage attendee badges" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Ready to Print", value: "856", icon: CreditCard, color: "text-primary" },
            { label: "Printed Today", value: "234", icon: Printer, color: "text-success" },
            { label: "Reprints", value: "12", icon: RefreshCw, color: "text-warning" },
            { label: "Pending Approval", value: "45", icon: AlertCircle, color: "text-muted-foreground" },
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
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Badge Queue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border shadow-lg"
        >
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Badge Queue</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" /> Export List
                </Button>
                <Button size="sm" className="gap-2 bg-primary">
                  <Printer className="w-4 h-4" /> Print Selected
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search by name, ID, or organization..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ready">Ready to Print</SelectItem>
                  <SelectItem value="printed">Printed</SelectItem>
                  <SelectItem value="issued">Issued</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Cluster" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clusters</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="investor">Investor</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="bg-transparent">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Badge Cards Grid */}
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-muted/30 rounded-xl border border-border p-4 hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => openPreview(badge)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {badge.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{badge.name}</p>
                      <p className="text-sm text-muted-foreground">{badge.organization}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      badge.status === "printed"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {badge.status === "printed" ? "Printed" : "Ready"}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Badge ID</span>
                    <span className="font-mono">{badge.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cluster</span>
                    <Badge className={clusterColors[badge.cluster] || "bg-muted"}>{badge.cluster}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Country</span>
                    <span>{badge.country}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => openPreview(badge)}
                  >
                    <Eye className="w-4 h-4 mr-1" /> Preview
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary"
                    disabled={badge.status === "printed"}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Printer className="w-4 h-4 mr-1" /> Print
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badge Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Badge Preview</DialogTitle>
          </DialogHeader>

          {selectedBadge && (
            <div className="space-y-4">
              {/* Badge Card Preview */}
              <div
                className={`aspect-[3/4] rounded-2xl p-6 text-white relative overflow-hidden ${
                  selectedBadge.cluster === "Media"
                    ? "bg-gradient-to-br from-secondary to-teal-700"
                    : selectedBadge.cluster === "Government"
                      ? "bg-gradient-to-br from-primary to-amber-700"
                      : selectedBadge.cluster === "Investor"
                        ? "bg-gradient-to-br from-success to-emerald-700"
                        : "bg-gradient-to-br from-accent to-orange-700"
                }`}
              >
                {/* Summit Logo */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold">E</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">ECOWAS Summit</p>
                    <p className="text-xs opacity-80">Climate Week 2026</p>
                  </div>
                </div>

                {/* Photo Placeholder */}
                <div className="w-24 h-24 mx-auto rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-white/30 text-white text-2xl">
                      {selectedBadge.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name & Details */}
                <div className="text-center mb-4">
                  <p className="text-xl font-bold">{selectedBadge.name}</p>
                  <p className="text-sm opacity-80">{selectedBadge.organization}</p>
                  <p className="text-xs opacity-60 mt-1">{selectedBadge.country}</p>
                </div>

                {/* Cluster Badge */}
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-1 rounded-full bg-white/20 text-sm font-semibold">
                    {selectedBadge.cluster.toUpperCase()}
                  </span>
                </div>

                {/* Access Zones */}
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {selectedBadge.accessZones.map((zone) => (
                    <span key={zone} className="px-2 py-0.5 rounded bg-white/10 text-xs">
                      {zone}
                    </span>
                  ))}
                </div>

                {/* QR Code */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-gray-800" />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
                <Button className="flex-1 bg-primary">
                  <Printer className="w-4 h-4 mr-2" /> Print Badge
                </Button>
              </div>

              {/* Print History */}
              {selectedBadge.status === "printed" && (
                <div className="p-3 rounded-lg bg-muted/50 text-sm">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Printed on {new Date(selectedBadge.printedAt!).toLocaleString()}</span>
                  </div>
                  <p className="text-muted-foreground mt-1">By: {selectedBadge.printedBy}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
