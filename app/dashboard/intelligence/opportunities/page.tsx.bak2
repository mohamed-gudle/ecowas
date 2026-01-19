"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Globe,
  DollarSign,
  Users,
  Zap,
  Leaf,
  Cpu,
  Truck,
  Factory,
  Sparkles,
  Brain,
  Target,
  MapPin,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sectors = [
  { id: "all", name: "All Sectors", icon: Globe },
  { id: "energy", name: "Energy & Power", icon: Zap },
  { id: "transport", name: "Transport & Logistics", icon: Truck },
  { id: "agriculture", name: "Agriculture & Food", icon: Leaf },
  { id: "digital", name: "Digital & Tech", icon: Cpu },
  { id: "industry", name: "Industry & Manufacturing", icon: Factory },
]

const opportunities = [
  {
    id: 1,
    title: "West Africa Power Pool Phase III",
    description: "Interconnection of power grids across 8 ECOWAS countries to enable cross-border electricity trade",
    value: "$8.5B",
    sector: "energy",
    countries: ["Nigeria", "Ghana", "Benin", "Togo", "Côte d'Ivoire", "Burkina Faso", "Niger", "Mali"],
    readiness: 85,
    stage: "bankable",
    investors: 12,
    gap: "Financing gap of $2.1B for transmission infrastructure",
    aiScore: 94,
    tags: ["Regional", "Infrastructure", "Priority"],
  },
  {
    id: 2,
    title: "Lagos-Abidjan Highway Corridor",
    description: "Modernization of the 1,000km coastal highway connecting major West African cities",
    value: "$4.2B",
    sector: "transport",
    countries: ["Nigeria", "Benin", "Togo", "Ghana", "Côte d'Ivoire"],
    readiness: 72,
    stage: "feasibility",
    investors: 8,
    gap: "PPP structuring and environmental impact assessment pending",
    aiScore: 88,
    tags: ["Corridor", "Trade", "High-Impact"],
  },
  {
    id: 3,
    title: "ECOWAS Digital Identity Framework",
    description: "Pan-regional digital identity system for seamless cross-border movement and services",
    value: "$1.8B",
    sector: "digital",
    countries: ["All ECOWAS"],
    readiness: 65,
    stage: "concept",
    investors: 15,
    gap: "Policy harmonization across member states required",
    aiScore: 82,
    tags: ["Digital", "Regional Integration", "Innovative"],
  },
  {
    id: 4,
    title: "Sahel Solar Initiative",
    description: "Large-scale solar farms across Sahel countries with battery storage",
    value: "$3.2B",
    sector: "energy",
    countries: ["Niger", "Mali", "Burkina Faso", "Senegal"],
    readiness: 58,
    stage: "pre-feasibility",
    investors: 6,
    gap: "Grid infrastructure upgrades needed for power evacuation",
    aiScore: 79,
    tags: ["Renewable", "Climate", "Development"],
  },
  {
    id: 5,
    title: "West African Agro-Processing Hubs",
    description: "Network of agricultural processing facilities to add value to regional produce",
    value: "$2.4B",
    sector: "agriculture",
    countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal"],
    readiness: 45,
    stage: "concept",
    investors: 4,
    gap: "Cold chain logistics and quality standards harmonization",
    aiScore: 75,
    tags: ["Food Security", "Value Chain", "SME"],
  },
]

const countryOpportunities = [
  { country: "Nigeria", opportunities: 47, value: "$18.2B", topSector: "Energy" },
  { country: "Ghana", opportunities: 32, value: "$8.5B", topSector: "Digital" },
  { country: "Côte d'Ivoire", opportunities: 28, value: "$7.1B", topSector: "Agriculture" },
  { country: "Senegal", opportunities: 24, value: "$5.8B", topSector: "Transport" },
  { country: "Benin", opportunities: 15, value: "$3.2B", topSector: "Logistics" },
]

export default function OpportunityMappingPage() {
  const [selectedSector, setSelectedSector] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"list" | "map">("list")

  const filteredOpportunities = opportunities.filter((opp) => {
    if (selectedSector !== "all" && opp.sector !== selectedSector) return false
    if (searchQuery && !opp.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <Header title="Opportunity Mapping" subtitle="AI-powered investment opportunity discovery and matching" />

      <div className="p-6 space-y-6">
        {/* AI Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium">AI Opportunity Engine</p>
              <p className="text-sm text-muted-foreground">
                Analyzed 847 data points • Identified 156 opportunities worth $52.4B across 15 ECOWAS countries
              </p>
            </div>
            <Button size="sm" className="gap-2 bg-gradient-to-r from-primary to-accent">
              <Sparkles className="w-4 h-4" />
              Generate Report
            </Button>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Opportunities", value: "156", icon: Target },
            { label: "Pipeline Value", value: "$52.4B", icon: DollarSign },
            { label: "Active Investors", value: "89", icon: Users },
            { label: "Countries Covered", value: "15", icon: Globe },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
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

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.id}>
                    <div className="flex items-center gap-2">
                      <sector.icon className="w-4 h-4" />
                      {sector.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            <div className="flex rounded-lg border overflow-hidden">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
                className="rounded-none"
              >
                List
              </Button>
              <Button
                variant={view === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("map")}
                className="rounded-none"
              >
                Map
              </Button>
            </div>
          </div>
        </div>

        {/* Sector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sectors.map((sector) => (
            <Button
              key={sector.id}
              variant={selectedSector === sector.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSector(sector.id)}
              className="gap-2 whitespace-nowrap"
            >
              <sector.icon className="w-4 h-4" />
              {sector.name}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Opportunities List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredOpportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-primary/20 text-primary border-0">
                            {sectors.find((s) => s.id === opp.sector)?.name}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={cn(
                              opp.stage === "bankable" && "border-green-500 text-green-500",
                              opp.stage === "feasibility" && "border-yellow-500 text-yellow-500",
                              opp.stage === "concept" && "border-blue-500 text-blue-500",
                              opp.stage === "pre-feasibility" && "border-orange-500 text-orange-500",
                            )}
                          >
                            {opp.stage}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold mb-1">{opp.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{opp.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {opp.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-primary">{opp.value}</p>
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {opp.investors} investors
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Countries</p>
                        <p className="font-medium text-sm">
                          {opp.countries.length > 3
                            ? `${opp.countries.slice(0, 2).join(", ")} +${opp.countries.length - 2}`
                            : opp.countries.join(", ")}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Readiness</p>
                        <div className="flex items-center gap-2">
                          <Progress value={opp.readiness} className="h-1.5 flex-1" />
                          <span className="text-sm font-medium">{opp.readiness}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">AI Score</p>
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="font-medium">{opp.aiScore}/100</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" variant="ghost" className="gap-1">
                          Details <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Gap Highlight */}
                    <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                      <p className="text-sm">
                        <span className="font-medium text-yellow-600">Gap:</span> {opp.gap}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Country Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="w-5 h-5 text-primary" />
                  By Country
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {countryOpportunities.map((country) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium text-sm">{country.country}</p>
                      <p className="text-xs text-muted-foreground">
                        {country.opportunities} opportunities • {country.topSector}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{country.value}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Globe className="w-4 h-4" />
                  View All Countries
                </Button>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="w-5 h-5 text-primary" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-sm font-medium mb-1">Cross-Country Synergy</p>
                  <p className="text-xs text-muted-foreground">
                    The Power Pool and Digital Identity projects share infrastructure dependencies. Consider bundled
                    investor presentations.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                  <p className="text-sm font-medium mb-1">Investor Match</p>
                  <p className="text-xs text-muted-foreground">
                    3 DFIs attending the summit have expressed interest in transport corridors. Schedule priority
                    meetings.
                  </p>
                </div>
                <Button className="w-full gap-2 bg-gradient-to-r from-primary to-accent">
                  <Sparkles className="w-4 h-4" />
                  Get More Insights
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
