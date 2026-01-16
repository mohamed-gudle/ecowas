"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, Shield, Clock, MapPin, Plus, Filter, AlertCircle, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const risks = [
  {
    id: 1,
    title: "Visa Processing Delays - Mali Delegation",
    category: "Logistics",
    severity: "High",
    status: "Open",
    impact: "May affect 18 delegate arrivals",
    mitigation: "Expedited processing requested through diplomatic channels",
    reportedBy: "Accreditation Team",
    reportedDate: "2026-03-10",
  },
  {
    id: 2,
    title: "Power Outage Risk at ICC Venue",
    category: "Infrastructure",
    severity: "Medium",
    status: "Mitigated",
    impact: "Could disrupt plenary sessions",
    mitigation: "Backup generators tested and on standby",
    reportedBy: "Operations Team",
    reportedDate: "2026-03-08",
  },
  {
    id: 3,
    title: "Security Concern - Protest Activity",
    category: "Security",
    severity: "High",
    status: "Monitoring",
    impact: "Potential disruption to motorcade routes",
    mitigation: "Alternative routes planned, increased security presence",
    reportedBy: "Security Detail",
    reportedDate: "2026-03-11",
  },
  {
    id: 4,
    title: "Catering Supplier Capacity Issue",
    category: "Operations",
    severity: "Low",
    status: "Resolved",
    impact: "State dinner preparations",
    mitigation: "Secondary supplier engaged",
    reportedBy: "Events Team",
    reportedDate: "2026-03-05",
  },
]

const incidents = [
  {
    id: 1,
    title: "Badge Printer Malfunction",
    location: "Accreditation Center",
    time: "Today, 09:45",
    status: "Resolved",
    response: "Backup printer activated",
  },
  {
    id: 2,
    title: "VIP Vehicle Delay",
    location: "Airport Road",
    time: "Today, 11:30",
    status: "In Progress",
    response: "Traffic coordination engaged",
  },
]

export default function RisksIncidentsPage() {
  const [filter, setFilter] = useState("all")

  const openRisks = risks.filter((r) => r.status === "Open" || r.status === "Monitoring").length
  const highSeverity = risks.filter((r) => r.severity === "High").length

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Risks & Incidents</h1>
            <p className="text-muted-foreground">Risk management and incident tracking</p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Report Issue
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-500/20 bg-gradient-to-br from-red-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Risks</p>
                <p className="text-3xl font-bold">{openRisks}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Severity</p>
                <p className="text-3xl font-bold">{highSeverity}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Incidents</p>
                <p className="text-3xl font-bold">{incidents.filter((i) => i.status !== "Resolved").length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Mitigated Today</p>
                <p className="text-3xl font-bold">2</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="risks" className="space-y-4">
        <TabsList>
          <TabsTrigger value="risks">Risk Register</TabsTrigger>
          <TabsTrigger value="incidents">Live Incidents</TabsTrigger>
          <TabsTrigger value="mitigations">Mitigation Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Risk Register</CardTitle>
                  <CardDescription>All identified risks and their status</CardDescription>
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {risks.map((risk, index) => (
                  <motion.div
                    key={risk.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          risk.severity === "High"
                            ? "bg-red-500/10"
                            : risk.severity === "Medium"
                              ? "bg-yellow-500/10"
                              : "bg-green-500/10"
                        }`}
                      >
                        <AlertTriangle
                          className={`w-5 h-5 ${
                            risk.severity === "High"
                              ? "text-red-500"
                              : risk.severity === "Medium"
                                ? "text-yellow-500"
                                : "text-green-500"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{risk.title}</h4>
                          <Badge
                            variant="outline"
                            className={
                              risk.status === "Open"
                                ? "border-red-500 text-red-500"
                                : risk.status === "Monitoring"
                                  ? "border-yellow-500 text-yellow-500"
                                  : risk.status === "Mitigated"
                                    ? "border-blue-500 text-blue-500"
                                    : "border-green-500 text-green-500"
                            }
                          >
                            {risk.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{risk.impact}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <Badge variant="secondary">{risk.category}</Badge>
                          <span>Reported: {risk.reportedDate}</span>
                          <span>By: {risk.reportedBy}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={
                            risk.severity === "High"
                              ? "bg-red-500"
                              : risk.severity === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }
                        >
                          {risk.severity}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Mitigation: </span>
                        {risk.mitigation}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Live Incidents</CardTitle>
              <CardDescription>Real-time incident tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-muted/30"
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        incident.status === "Resolved" ? "bg-green-500" : "bg-red-500 animate-pulse"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{incident.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {incident.location}
                        <span>|</span>
                        <Clock className="w-3 h-3" />
                        {incident.time}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          incident.status === "Resolved"
                            ? "border-green-500 text-green-500"
                            : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {incident.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{incident.response}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigations">
          <Card>
            <CardHeader>
              <CardTitle>Mitigation Plans</CardTitle>
              <CardDescription>Pre-approved response protocols</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Mitigation plan templates coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>
  </div>
  )
}
