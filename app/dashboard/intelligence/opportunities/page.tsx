"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
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
  Truck,
  Factory,
  Sparkles,
  Brain,
  Target,
  MapPin,
  ChevronRight,
  TrendingUp,
  Pickaxe,
  Fuel
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PROJECTS } from "@/components/ecowas-map/mock-data"
import { COUNTRIES } from "@/components/ecowas-map/countries-data"
import { Sector } from "@/components/ecowas-map/types"
import EcowasMap from "@/components/ecowas-map"

const SECTORS: { id: string; name: string; icon: React.ElementType }[] = [
  { id: "all", name: "All Sectors", icon: Globe },
  { id: "Infrastructure & Construction", name: "Infrastructure", icon: Factory },
  { id: "Oil & Gas", name: "Oil & Gas", icon: Fuel },
  { id: "Renewable Energy", name: "Renewable Energy", icon: Zap },
  { id: "Mining & Minerals", name: "Mining", icon: Pickaxe },
  { id: "Manufacturing & Industry", name: "Manufacturing", icon: Factory },
  { id: "Power & Energy Infrastructure", name: "Power & Energy", icon: Zap },
]

const STATUS_COLORS = {
  'Planning': 'border-blue-500 text-blue-500',
  'Development': 'border-amber-500 text-amber-500',
  'Operational': 'border-green-500 text-green-500',
  'Expansion': 'border-purple-500 text-purple-500',
}

const SECTOR_COLORS: Record<string, string> = {
  'Infrastructure & Construction': 'bg-orange-100 text-orange-700',
  'Oil & Gas': 'bg-red-100 text-red-700',
  'Renewable Energy': 'bg-green-100 text-green-700',
  'Mining & Minerals': 'bg-purple-100 text-purple-700',
  'Manufacturing & Industry': 'bg-blue-100 text-blue-700',
  'Power & Energy Infrastructure': 'bg-yellow-100 text-yellow-700',
}

// Calculate country breakdown from PROJECTS
const countryBreakdown = COUNTRIES.slice(0, 5).map(country => ({
  country: country.name,
  flag: country.flag,
  opportunities: country.opportunitiesCount,
  value: country.totalInvestment,
  topSector: country.topSectors[0]?.split(' ')[0] || 'Various'
}))

// Calculate total pipeline value
const totalPipelineValue = PROJECTS.length > 0 ? '$52.4B' : '$0' // Mock total

export default function OpportunityMappingPage() {
  const [selectedSector, setSelectedSector] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"list" | "map">("list")

  const filteredOpportunities = PROJECTS.filter((opp) => {
    if (selectedSector !== "all" && opp.sector !== selectedSector) return false
    if (searchQuery && !opp.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen">
      <Header title="Opportunity Mapping" subtitle="AI-powered investment opportunity discovery and matching" />

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
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
                Analyzed {PROJECTS.length} verified opportunities worth {totalPipelineValue} across {COUNTRIES.length} ECOWAS countries
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
            { label: "Total Opportunities", value: String(PROJECTS.length), icon: Target },
            { label: "Pipeline Value", value: totalPipelineValue, icon: DollarSign },
            { label: "Active Investors", value: "89", icon: Users },
            { label: "Countries Covered", value: String(COUNTRIES.length), icon: Globe },
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
                {SECTORS.map((sector) => (
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
          {SECTORS.map((sector) => (
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
        {view === "map" ? (
          <EcowasMap selectedSector={selectedSector !== "all" ? selectedSector : undefined} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Opportunities List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredOpportunities.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Target className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">No opportunities found</h3>
                    <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
                  </CardContent>
                </Card>
              ) : (
                filteredOpportunities.map((opp, index) => (
                  <motion.div
                    key={opp.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge className={cn("border-0", SECTOR_COLORS[opp.sector] || "bg-gray-100")}>
                                {opp.sector}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={STATUS_COLORS[opp.status]}
                              >
                                {opp.status}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold mb-1">{opp.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {opp.country}
                            </p>
                            <p className="text-sm text-muted-foreground">{opp.details}</p>
                          </div>
                          <div className="text-right ml-4">
                            <p className="text-xl font-bold text-primary">{opp.investmentRange}</p>
                            <div className="flex items-center justify-end gap-1 text-sm text-emerald-600 font-medium mt-1">
                              <TrendingUp className="w-4 h-4" />
                              {opp.roi}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t border-border">
                          <Link href={`/dashboard/intelligence/opportunities/${opp.id}`}>
                            <Button size="sm" variant="ghost" className="gap-1">
                              Details <ChevronRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
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
                  {countryBreakdown.map((country) => (
                    <div
                      key={country.country}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{country.flag}</span>
                        <div>
                          <p className="font-medium text-sm">{country.country}</p>
                          <p className="text-xs text-muted-foreground">
                            {country.opportunities} opportunities • {country.topSector}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">{country.value}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/dashboard/intelligence/countries">
                    <Button variant="outline" className="w-full gap-2 bg-transparent">
                      <Globe className="w-4 h-4" />
                      View All Countries
                    </Button>
                  </Link>
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
                    <p className="text-sm font-medium mb-1">Regional Synergy</p>
                    <p className="text-xs text-muted-foreground">
                      The Abidjan-Lagos Corridor aligns with multiple power infrastructure projects. Consider bundled investor presentations.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                    <p className="text-sm font-medium mb-1">Investor Match</p>
                    <p className="text-xs text-muted-foreground">
                      3 DFIs attending the summit have expressed interest in Oil & Gas projects. Schedule priority meetings.
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
        )}
      </div>
    </div>
  )
}
