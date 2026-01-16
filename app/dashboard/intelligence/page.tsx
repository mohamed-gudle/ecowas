"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
  Building2,
  Crown,
  RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Executive KPIs
const executiveKPIs = [
  {
    title: "Overall Readiness",
    value: 78,
    target: 100,
    unit: "%",
    change: "+5%",
    trend: "up",
    status: "warning",
    description: "Summit preparation progress",
  },
  {
    title: "Confirmed Presidents",
    value: 12,
    target: 15,
    unit: "",
    change: "+2",
    trend: "up",
    status: "good",
    description: "Heads of State confirmed",
  },
  {
    title: "Investment Pipeline",
    value: 52.4,
    target: 50,
    unit: "B",
    change: "+$2.4B",
    trend: "up",
    status: "excellent",
    description: "Total deal pipeline value",
  },
  {
    title: "Accreditations",
    value: 3842,
    target: 5000,
    unit: "",
    change: "+156",
    trend: "up",
    status: "good",
    description: "Approved delegates",
  },
]

// Financial Position
const financialMetrics = [
  { label: "Budget Allocated", value: "$12.5M", status: "neutral" },
  { label: "Revenue Collected", value: "$8.2M", status: "good", percent: 65 },
  { label: "Sponsorship Secured", value: "$4.8M", status: "good", percent: 80 },
  { label: "Outstanding Invoices", value: "$1.2M", status: "warning" },
]

// Presidents/VIP Status
const vipStatus = [
  { country: "Nigeria", leader: "President Tinubu", status: "confirmed", arrival: "Jan 14" },
  { country: "Ghana", leader: "President Akufo-Addo", status: "confirmed", arrival: "Jan 14" },
  { country: "Senegal", leader: "President Faye", status: "confirmed", arrival: "Jan 15" },
  { country: "Côte d'Ivoire", leader: "President Ouattara", status: "pending", arrival: "TBD" },
  { country: "Niger", leader: "President Tiani", status: "declined", arrival: "-" },
]

// Opportunity Highlights
const opportunities = [
  {
    title: "West Africa Power Pool Expansion",
    value: "$8.5B",
    countries: ["Nigeria", "Ghana", "Benin"],
    sector: "Energy",
    readiness: 85,
    investors: 12,
  },
  {
    title: "Lagos-Abidjan Highway Corridor",
    value: "$4.2B",
    countries: ["Nigeria", "Benin", "Togo", "Ghana", "Côte d'Ivoire"],
    sector: "Transport",
    readiness: 72,
    investors: 8,
  },
  {
    title: "Digital Identity Initiative",
    value: "$1.8B",
    countries: ["All ECOWAS"],
    sector: "Digital",
    readiness: 65,
    investors: 15,
  },
]

// Supplier Readiness
const supplierStatus = [
  { name: "AV & Production", status: "on-track", progress: 92 },
  { name: "Catering Services", status: "on-track", progress: 88 },
  { name: "Security Contractors", status: "at-risk", progress: 65 },
  { name: "Transport & Logistics", status: "on-track", progress: 78 },
  { name: "Signage & Branding", status: "delayed", progress: 45 },
]

// Risk Summary
const riskSummary = [
  { category: "Security", count: 2, severity: "high" },
  { category: "Logistics", count: 5, severity: "medium" },
  { category: "Programme", count: 3, severity: "low" },
  { category: "Finance", count: 1, severity: "medium" },
]

export default function IntelligenceDashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <Header title="Summit Intelligence" subtitle="Executive Dashboard - Real-time operational intelligence" />

      <div className="p-6 space-y-6">
        {/* AI Status Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg">AI Intelligence Engine</h2>
                <Badge className="bg-green-500/20 text-green-500 border-0">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Last analysis: 2 minutes ago • Processing 847 data streams
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={handleRefresh}>
              <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
              Refresh
            </Button>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent">
              <Sparkles className="w-4 h-4" />
              Ask AI
            </Button>
          </div>
        </motion.div>

        {/* Executive KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {executiveKPIs.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "relative overflow-hidden",
                  kpi.status === "excellent" && "border-green-500/50 bg-green-500/5",
                  kpi.status === "good" && "border-primary/50 bg-primary/5",
                  kpi.status === "warning" && "border-yellow-500/50 bg-yellow-500/5",
                )}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{kpi.title}</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-bold">{kpi.value}</span>
                        <span className="text-lg text-muted-foreground">{kpi.unit}</span>
                        <span className="text-sm text-muted-foreground">
                          / {kpi.target}
                          {kpi.unit}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className={cn(
                        "gap-1",
                        kpi.trend === "up" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500",
                      )}
                    >
                      {kpi.trend === "up" ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
                      {kpi.change}
                    </Badge>
                  </div>
                  <Progress value={(kpi.value / kpi.target) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{kpi.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Position */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Financial Position
                  </CardTitle>
                  <CardDescription>Budget and revenue overview</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {financialMetrics.map((metric) => (
                    <div key={metric.label} className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      {metric.percent && <Progress value={metric.percent} className="h-1.5 mt-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Opportunity Highlights */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Top Investment Opportunities
                  </CardTitle>
                  <CardDescription>High-priority deals in the pipeline</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {opportunities.map((opp, index) => (
                  <motion.div
                    key={opp.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{opp.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {opp.sector}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {opp.countries.length > 3
                              ? `${opp.countries.slice(0, 2).join(", ")} +${opp.countries.length - 2} more`
                              : opp.countries.join(", ")}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{opp.value}</p>
                        <p className="text-xs text-muted-foreground">{opp.investors} investors interested</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Readiness</span>
                          <span>{opp.readiness}%</span>
                        </div>
                        <Progress value={opp.readiness} className="h-1.5" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Supplier Readiness */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Supplier Readiness
                  </CardTitle>
                  <CardDescription>Operational supplier status</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  Manage Suppliers
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supplierStatus.map((supplier) => (
                    <div key={supplier.name} className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">{supplier.name}</span>
                          <Badge
                            className={cn(
                              "text-xs",
                              supplier.status === "on-track" && "bg-green-500/20 text-green-500",
                              supplier.status === "at-risk" && "bg-yellow-500/20 text-yellow-500",
                              supplier.status === "delayed" && "bg-red-500/20 text-red-500",
                            )}
                          >
                            {supplier.status}
                          </Badge>
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
                      <span className="text-sm font-medium w-12 text-right">{supplier.progress}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* VIP Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Heads of State Status
                </CardTitle>
                <CardDescription>12 of 15 confirmed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {vipStatus.map((vip) => (
                  <div key={vip.country} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          vip.status === "confirmed" && "bg-green-500",
                          vip.status === "pending" && "bg-yellow-500",
                          vip.status === "declined" && "bg-red-500",
                        )}
                      />
                      <div>
                        <p className="font-medium text-sm">{vip.country}</p>
                        <p className="text-xs text-muted-foreground">{vip.leader}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={cn(
                          "text-xs",
                          vip.status === "confirmed" && "bg-green-500/20 text-green-500",
                          vip.status === "pending" && "bg-yellow-500/20 text-yellow-500",
                          vip.status === "declined" && "bg-red-500/20 text-red-500",
                        )}
                      >
                        {vip.status}
                      </Badge>
                      {vip.arrival !== "-" && vip.arrival !== "TBD" && (
                        <p className="text-xs text-muted-foreground mt-1">{vip.arrival}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Risk Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Risk Summary
                </CardTitle>
                <CardDescription>11 active risks tracked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskSummary.map((risk) => (
                  <div key={risk.category} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          risk.severity === "high" && "bg-red-500/20",
                          risk.severity === "medium" && "bg-yellow-500/20",
                          risk.severity === "low" && "bg-green-500/20",
                        )}
                      >
                        <AlertTriangle
                          className={cn(
                            "w-4 h-4",
                            risk.severity === "high" && "text-red-500",
                            risk.severity === "medium" && "text-yellow-500",
                            risk.severity === "low" && "text-green-500",
                          )}
                        />
                      </div>
                      <span className="font-medium text-sm">{risk.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{risk.count}</span>
                      <Badge
                        className={cn(
                          "text-xs",
                          risk.severity === "high" && "bg-red-500/20 text-red-500",
                          risk.severity === "medium" && "bg-yellow-500/20 text-yellow-500",
                          risk.severity === "low" && "bg-green-500/20 text-green-500",
                        )}
                      >
                        {risk.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick AI Insights */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-sm">
                    <span className="text-primary font-medium">Recommendation:</span> Consider prioritizing security
                    contractor issue - signage delay may cascade to venue readiness.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-sm">
                    <span className="text-accent font-medium">Opportunity Alert:</span> 3 new DFI investors expressed
                    interest in the Power Pool project in the last 24 hours.
                  </p>
                </div>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Brain className="w-4 h-4" />
                  View All Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
