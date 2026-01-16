"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DollarSign, TrendingUp, Users, Filter, Download, ChevronRight, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const pipelineStages = [
  { id: "identification", name: "Identification", count: 156, value: "$12.5B", color: "bg-slate-500" },
  { id: "qualification", name: "Qualification", count: 89, value: "$8.2B", color: "bg-blue-500" },
  { id: "negotiation", name: "Negotiation", count: 45, value: "$5.8B", color: "bg-yellow-500" },
  { id: "due_diligence", name: "Due Diligence", count: 28, value: "$3.2B", color: "bg-orange-500" },
  { id: "closing", name: "Closing", count: 12, value: "$1.8B", color: "bg-green-500" },
  { id: "committed", name: "Committed", count: 8, value: "$950M", color: "bg-primary" },
]

const topDeals = [
  {
    id: 1,
    name: "Lagos-Abidjan Highway PPP",
    country: "Nigeria / Côte d'Ivoire",
    sector: "Infrastructure",
    value: "$2.8B",
    stage: "Due Diligence",
    probability: 75,
    investor: "Africa Finance Corporation",
  },
  {
    id: 2,
    name: "West Africa Solar Initiative",
    country: "Ghana / Senegal",
    sector: "Renewable Energy",
    value: "$1.5B",
    stage: "Negotiation",
    probability: 60,
    investor: "Green Climate Fund",
  },
  {
    id: 3,
    name: "Accra Tech Hub Development",
    country: "Ghana",
    sector: "Technology",
    value: "$450M",
    stage: "Closing",
    probability: 90,
    investor: "Google Africa",
  },
  {
    id: 4,
    name: "Dakar Port Expansion",
    country: "Senegal",
    sector: "Maritime",
    value: "$890M",
    stage: "Negotiation",
    probability: 55,
    investor: "DP World",
  },
  {
    id: 5,
    name: "ECOWAS Agricultural Processing",
    country: "Multiple",
    sector: "Agriculture",
    value: "$620M",
    stage: "Qualification",
    probability: 40,
    investor: "IFC",
  },
]

export default function InvestmentPipelinePage() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null)

  const totalValue = "$32.45B"
  const totalDeals = 338
  const avgDealSize = "$96M"
  const conversionRate = "23%"

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Investment Pipeline</h1>
          <p className="text-muted-foreground">Track and manage investment opportunities across all stages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pipeline Value</p>
                <p className="text-3xl font-bold">{totalValue}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Deals</p>
                <p className="text-3xl font-bold">{totalDeals}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Deal Size</p>
                <p className="text-3xl font-bold">{avgDealSize}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold">{conversionRate}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pipeline Funnel */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Funnel</CardTitle>
          <CardDescription>Investment opportunities by stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pipelineStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedStage === stage.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-12 rounded-full ${stage.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{stage.name}</span>
                        <Badge variant="secondary">{stage.count} deals</Badge>
                      </div>
                      <span className="text-xl font-bold">{stage.value}</span>
                    </div>
                    <Progress value={(stage.count / 156) * 100} className="h-2" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Deals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top Deals</CardTitle>
              <CardDescription>Highest value opportunities in pipeline</CardDescription>
            </div>
            <Button variant="outline">View All Deals</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{deal.name}</h4>
                      <Badge
                        variant="outline"
                        className={
                          deal.stage === "Closing"
                            ? "border-green-500 text-green-500"
                            : deal.stage === "Due Diligence"
                              ? "border-orange-500 text-orange-500"
                              : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {deal.stage}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {deal.country} | {deal.sector}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Investor: <span className="text-foreground">{deal.investor}</span>
                      </span>
                      <span className="text-muted-foreground">
                        Probability: <span className="text-foreground">{deal.probability}%</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{deal.value}</p>
                    <div className="w-20 mt-2">
                      <Progress value={deal.probability} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
