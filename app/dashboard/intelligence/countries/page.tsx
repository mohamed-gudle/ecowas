"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  TrendingUp,
  Download,
  BarChart3,
  Globe,
  Crown,
  Target,
  ChartLine,
  Filter,
  ArrowRight,
  Fuel,
  Wheat,
  Cpu,
  Factory,
  Zap,
  Pickaxe
} from "lucide-react"
import EcowasMap from "@/components/ecowas-map"
import { COUNTRIES, getCountryStats, type Country } from "@/components/ecowas-map/countries-data"
import { Sector } from "@/components/ecowas-map/types"
import Link from "next/link"

const SECTOR_ICONS: Record<string, React.ReactNode> = {
  'Oil & Gas': <Fuel className="h-3 w-3" />,
  'Infrastructure & Construction': <Factory className="h-3 w-3" />,
  'Renewable Energy': <Zap className="h-3 w-3" />,
  'Mining & Minerals': <Pickaxe className="h-3 w-3" />,
  'Manufacturing & Industry': <Factory className="h-3 w-3" />,
  'Power & Energy Infrastructure': <Zap className="h-3 w-3" />,
}

const SECTOR_COLORS: Record<string, string> = {
  'Oil & Gas': 'bg-red-100 text-red-700',
  'Infrastructure & Construction': 'bg-orange-100 text-orange-700',
  'Renewable Energy': 'bg-green-100 text-green-700',
  'Mining & Minerals': 'bg-purple-100 text-purple-700',
  'Manufacturing & Industry': 'bg-blue-100 text-blue-700',
  'Power & Energy Infrastructure': 'bg-yellow-100 text-yellow-700',
}

const RISK_COLORS = {
  'Low': 'bg-green-100 text-green-700 border-green-200',
  'Medium': 'bg-amber-100 text-amber-700 border-amber-200',
  'High': 'bg-red-100 text-red-700 border-red-200',
}

function StatCard({ icon, value, label, bgColor }: { icon: React.ReactNode; value: string | number; label: string; bgColor: string }) {
  return (
    <Card className={`${bgColor} border-none`}>
      <CardContent className="p-5 flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground mb-1">{label}</span>
          <span className="text-3xl font-bold">{value}</span>
        </div>
        <div className="ml-auto opacity-60">
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}

function CountryCard({ country }: { country: Country }) {
  return (
    <Card className="hover:shadow-lg transition-all hover:border-primary/30">
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-4xl">{country.flag}</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xl font-bold">{country.name}</h3>
              {country.presidentConfirmed && (
                <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
                  <Crown className="h-3 w-3" /> President
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              {country.capital}
            </div>
          </div>
        </div>

        {/* Readiness */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-muted-foreground">Readiness</span>
            <span className="text-sm font-semibold">{country.readinessScore}%</span>
          </div>
          <Progress value={country.readinessScore} className="h-2" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-muted/40 rounded-lg p-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <TrendingUp className="h-3 w-3" /> GDP Growth
            </div>
            <span className="font-bold text-emerald-600">{country.gdpGrowth}</span>
          </div>
          <div className="bg-muted/40 rounded-lg p-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <Target className="h-3 w-3" /> Opportunities
            </div>
            <span className="font-bold">{country.opportunitiesCount}</span>
          </div>
          <div className="bg-muted/40 rounded-lg p-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              Delegation
            </div>
            <span className="font-bold">{country.delegationSize}</span>
          </div>
          <div className="bg-muted/40 rounded-lg p-3">
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              Risk Level
            </div>
            <Badge variant="outline" className={`text-xs ${RISK_COLORS[country.riskLevel]}`}>
              {country.riskLevel}
            </Badge>
          </div>
        </div>

        {/* Top Sectors */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {country.topSectors.slice(0, 3).map((sector) => (
            <Badge
              key={sector}
              variant="secondary"
              className={`text-xs gap-1 ${SECTOR_COLORS[sector] || 'bg-gray-100 text-gray-700'}`}
            >
              {SECTOR_ICONS[sector]}
              {sector.split(' ')[0]}
            </Badge>
          ))}
        </div>

        {/* Action */}
        <Link href={`/dashboard/intelligence/countries/${country.id}`}>
          <Button variant="link" className="p-0 h-auto text-primary gap-1">
            View Full Dashboard <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"countries" | "map">("countries")
  const [sortBy, setSortBy] = useState<string>("readiness")

  const stats = getCountryStats()

  // Filter and sort countries
  const filteredCountries = COUNTRIES
    .filter((country) => {
      const matchesSearch =
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === "readiness") return b.readinessScore - a.readinessScore
      if (sortBy === "opportunities") return b.opportunitiesCount - a.opportunitiesCount
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1">Country Dashboards</h1>
          <p className="text-muted-foreground">
            Comprehensive intelligence on each ECOWAS member state
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
          <Button className="gap-2 bg-primary">
            <BarChart3 className="h-4 w-4" />
            Compare Countries
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Globe className="h-10 w-10" />}
          value={stats.totalCountries}
          label="Total Countries"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={<Crown className="h-10 w-10" />}
          value={`${stats.presidentsConfirmed}/${stats.totalCountries}`}
          label="Presidents Confirmed"
          bgColor="bg-amber-50"
        />
        <StatCard
          icon={<Target className="h-10 w-10" />}
          value={stats.totalOpportunities}
          label="Total Opportunities"
          bgColor="bg-emerald-50"
        />
        <StatCard
          icon={<ChartLine className="h-10 w-10" />}
          value={`${stats.avgReadiness}%`}
          label="Avg Readiness"
          bgColor="bg-blue-50"
        />
      </div>

      {/* Tabs for Countries Grid vs Map */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "countries" | "map")}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="countries">Countries</TabsTrigger>
            <TabsTrigger value="map">Investment Map</TabsTrigger>
          </TabsList>

          {viewMode === "countries" && (
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search countries..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="readiness">Readiness Score</SelectItem>
                  <SelectItem value="opportunities">Opportunities</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <TabsContent value="countries" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCountries.map((country, index) => (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CountryCard country={country} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="mt-6">
          <EcowasMap />
        </TabsContent>
      </Tabs>
    </div>
  )
}
