"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Plus,
  Building2,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle2,
  FileText,
  DollarSign,
  Truck,
  Users,
  Camera,
  Utensils,
  Shield,
  Wifi,
  MessageSquare,
  ClipboardList,
} from "lucide-react"
import { cn } from "@/lib/utils"

const suppliers = [
  {
    id: 1,
    name: "Stellar AV Productions",
    category: "AV & Production",
    contact: "James Okonkwo",
    email: "james@stellarav.ng",
    phone: "+234 803 456 7890",
    contractValue: "$450,000",
    status: "on-track",
    progress: 92,
    deliverables: [
      { name: "Main Stage Setup", status: "complete", due: "Jan 10" },
      { name: "Breakout Rooms AV", status: "in-progress", due: "Jan 12" },
      { name: "Streaming Infrastructure", status: "in-progress", due: "Jan 13" },
      { name: "Final Testing", status: "pending", due: "Jan 14" },
    ],
    risks: [],
    lastUpdate: "2 hours ago",
  },
  {
    id: 2,
    name: "Continental Catering Ltd",
    category: "Catering Services",
    contact: "Amaka Eze",
    email: "amaka@continentalcatering.com",
    phone: "+234 805 123 4567",
    contractValue: "$280,000",
    status: "on-track",
    progress: 88,
    deliverables: [
      { name: "Menu Finalization", status: "complete", due: "Jan 8" },
      { name: "Staff Training", status: "complete", due: "Jan 10" },
      { name: "Equipment Setup", status: "in-progress", due: "Jan 13" },
      { name: "Final Prep", status: "pending", due: "Jan 14" },
    ],
    risks: [],
    lastUpdate: "4 hours ago",
  },
  {
    id: 3,
    name: "SecureGuard Nigeria",
    category: "Security",
    contact: "Col. Hassan Ibrahim",
    email: "hassan@secureguard.ng",
    phone: "+234 802 987 6543",
    contractValue: "$320,000",
    status: "at-risk",
    progress: 65,
    deliverables: [
      { name: "Security Plan", status: "complete", due: "Jan 5" },
      { name: "Personnel Deployment", status: "at-risk", due: "Jan 12" },
      { name: "Equipment Check", status: "in-progress", due: "Jan 13" },
      { name: "Coordination Drill", status: "pending", due: "Jan 14" },
    ],
    risks: [{ type: "Personnel shortage", severity: "high", mitigation: "Recruiting additional 50 officers" }],
    lastUpdate: "30 minutes ago",
  },
  {
    id: 4,
    name: "SignCraft Design",
    category: "Signage & Branding",
    contact: "Tunde Adeyemi",
    email: "tunde@signcraft.ng",
    phone: "+234 809 555 1234",
    contractValue: "$95,000",
    status: "delayed",
    progress: 45,
    deliverables: [
      { name: "Design Approval", status: "complete", due: "Jan 3" },
      { name: "Main Entrance Signage", status: "delayed", due: "Jan 10" },
      { name: "Wayfinding Signs", status: "in-progress", due: "Jan 12" },
      { name: "Installation", status: "pending", due: "Jan 14" },
    ],
    risks: [
      { type: "Material delay", severity: "high", mitigation: "Sourcing from alternative supplier" },
      { type: "Installation timeline", severity: "medium", mitigation: "Added night shift crew" },
    ],
    lastUpdate: "1 hour ago",
  },
  {
    id: 5,
    name: "FleetMaster Logistics",
    category: "Transport",
    contact: "Chidi Obi",
    email: "chidi@fleetmaster.ng",
    phone: "+234 806 789 0123",
    contractValue: "$180,000",
    status: "on-track",
    progress: 78,
    deliverables: [
      { name: "Vehicle Procurement", status: "complete", due: "Jan 8" },
      { name: "Driver Training", status: "complete", due: "Jan 10" },
      { name: "Route Planning", status: "in-progress", due: "Jan 12" },
      { name: "Final Deployment", status: "pending", due: "Jan 14" },
    ],
    risks: [],
    lastUpdate: "3 hours ago",
  },
]

const categoryIcons: Record<string, any> = {
  "AV & Production": Camera,
  "Catering Services": Utensils,
  Security: Shield,
  "Signage & Branding": FileText,
  Transport: Truck,
  "IT & Connectivity": Wifi,
}

const stats = [
  { label: "Total Suppliers", value: "24", icon: Building2 },
  { label: "Contract Value", value: "$2.8M", icon: DollarSign },
  { label: "On Track", value: "18", icon: CheckCircle2, color: "text-green-500" },
  { label: "At Risk", value: "4", icon: AlertTriangle, color: "text-yellow-500" },
]

export default function SuppliersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSupplier, setSelectedSupplier] = useState<(typeof suppliers)[0] | null>(null)

  return (
    <div className="min-h-screen">
      <Header title="Suppliers & Contracts" subtitle="Manage supplier relationships and track deliverables" />

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn("w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center", stat.color)}
                    >
                      <stat.icon className={cn("w-5 h-5", stat.color || "text-primary")} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Supplier
            </Button>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {suppliers.map((supplier, index) => {
            const CategoryIcon = categoryIcons[supplier.category] || Building2
            return (
              <motion.div
                key={supplier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={cn(
                    "hover:border-primary/50 transition-colors cursor-pointer",
                    supplier.status === "at-risk" && "border-yellow-500/50",
                    supplier.status === "delayed" && "border-red-500/50",
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            supplier.status === "on-track" && "bg-green-500/10",
                            supplier.status === "at-risk" && "bg-yellow-500/10",
                            supplier.status === "delayed" && "bg-red-500/10",
                          )}
                        >
                          <CategoryIcon
                            className={cn(
                              "w-6 h-6",
                              supplier.status === "on-track" && "text-green-500",
                              supplier.status === "at-risk" && "text-yellow-500",
                              supplier.status === "delayed" && "text-red-500",
                            )}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{supplier.name}</h3>
                          <p className="text-sm text-muted-foreground">{supplier.category}</p>
                        </div>
                      </div>
                      <Badge
                        className={cn(
                          supplier.status === "on-track" && "bg-green-500/20 text-green-500",
                          supplier.status === "at-risk" && "bg-yellow-500/20 text-yellow-500",
                          supplier.status === "delayed" && "bg-red-500/20 text-red-500",
                        )}
                      >
                        {supplier.status}
                      </Badge>
                    </div>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span className="font-medium">{supplier.progress}%</span>
                      </div>
                      <Progress
                        value={supplier.progress}
                        className={cn(
                          "h-2",
                          supplier.status === "delayed" && "[&>div]:bg-red-500",
                          supplier.status === "at-risk" && "[&>div]:bg-yellow-500",
                        )}
                      />
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {supplier.contact}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {supplier.contractValue}
                      </div>
                    </div>

                    {/* Deliverables Summary */}
                    <div className="flex gap-2 mb-4">
                      {supplier.deliverables.map((d, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            d.status === "complete" && "bg-green-500",
                            d.status === "in-progress" && "bg-blue-500",
                            d.status === "pending" && "bg-gray-300",
                            d.status === "at-risk" && "bg-yellow-500",
                            d.status === "delayed" && "bg-red-500",
                          )}
                          title={`${d.name}: ${d.status}`}
                        />
                      ))}
                    </div>

                    {/* Risks */}
                    {supplier.risks.length > 0 && (
                      <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-4">
                        <div className="flex items-center gap-2 text-yellow-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium">{supplier.risks.length} Active Risk(s)</span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">Updated {supplier.lastUpdate}</span>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <ClipboardList className="w-4 h-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedSupplier(supplier)}>
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-3">
                                <div
                                  className={cn(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    supplier.status === "on-track" && "bg-green-500/10",
                                    supplier.status === "at-risk" && "bg-yellow-500/10",
                                    supplier.status === "delayed" && "bg-red-500/10",
                                  )}
                                >
                                  <CategoryIcon
                                    className={cn(
                                      "w-5 h-5",
                                      supplier.status === "on-track" && "text-green-500",
                                      supplier.status === "at-risk" && "text-yellow-500",
                                      supplier.status === "delayed" && "text-red-500",
                                    )}
                                  />
                                </div>
                                {supplier.name}
                              </DialogTitle>
                              <DialogDescription>{supplier.category}</DialogDescription>
                            </DialogHeader>

                            <div className="space-y-6 mt-4">
                              {/* Contact Details */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-muted/50">
                                  <p className="text-sm text-muted-foreground mb-1">Contact Person</p>
                                  <p className="font-medium">{supplier.contact}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-muted/50">
                                  <p className="text-sm text-muted-foreground mb-1">Contract Value</p>
                                  <p className="font-medium">{supplier.contractValue}</p>
                                </div>
                              </div>

                              {/* Contact Info */}
                              <div className="flex gap-4">
                                <Button variant="outline" className="gap-2 flex-1 bg-transparent">
                                  <Mail className="w-4 h-4" />
                                  {supplier.email}
                                </Button>
                                <Button variant="outline" className="gap-2 flex-1 bg-transparent">
                                  <Phone className="w-4 h-4" />
                                  {supplier.phone}
                                </Button>
                              </div>

                              {/* Deliverables */}
                              <div>
                                <h4 className="font-semibold mb-3">Deliverables</h4>
                                <div className="space-y-2">
                                  {supplier.deliverables.map((d, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={cn(
                                            "w-2 h-2 rounded-full",
                                            d.status === "complete" && "bg-green-500",
                                            d.status === "in-progress" && "bg-blue-500",
                                            d.status === "pending" && "bg-gray-300",
                                            d.status === "at-risk" && "bg-yellow-500",
                                            d.status === "delayed" && "bg-red-500",
                                          )}
                                        />
                                        <span className="font-medium text-sm">{d.name}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Badge variant="secondary" className="text-xs">
                                          {d.status}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">Due: {d.due}</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Risks */}
                              {supplier.risks.length > 0 && (
                                <div>
                                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                    Active Risks
                                  </h4>
                                  <div className="space-y-2">
                                    {supplier.risks.map((risk, i) => (
                                      <div
                                        key={i}
                                        className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20"
                                      >
                                        <div className="flex justify-between items-start mb-2">
                                          <span className="font-medium text-sm">{risk.type}</span>
                                          <Badge
                                            className={cn(
                                              risk.severity === "high" && "bg-red-500/20 text-red-500",
                                              risk.severity === "medium" && "bg-yellow-500/20 text-yellow-500",
                                              risk.severity === "low" && "bg-green-500/20 text-green-500",
                                            )}
                                          >
                                            {risk.severity}
                                          </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                          <span className="font-medium">Mitigation:</span> {risk.mitigation}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Actions */}
                              <div className="flex gap-3 pt-4 border-t border-border">
                                <Button className="flex-1 gap-2">
                                  <MessageSquare className="w-4 h-4" />
                                  Contact Supplier
                                </Button>
                                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                                  <ClipboardList className="w-4 h-4" />
                                  Create Ticket
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>

      </div>

    </div>
  )
}
