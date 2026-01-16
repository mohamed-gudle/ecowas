"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Leaf,
  Zap,
  Droplets,
  Factory,
  MapPin,
  Download,
  BarChart3,
  Globe,
  ChevronRight,
  Crown,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const countries = [
  {
    id: "ng",
    name: "Nigeria",
    flag: "🇳🇬",
    region: "West Africa",
    capital: "Abuja",
    population: "223.8M",
    gdp: "$477B",
    gdpGrowth: 3.2,
    delegationSize: 45,
    presidentialConfirmed: true,
    readinessScore: 92,
    topSectors: ["Oil & Gas", "Agriculture", "Technology"],
    opportunities: 156,
    totalInvestment: "$12.5B",
    keyResources: ["Crude Oil", "Natural Gas", "Cocoa", "Palm Oil"],
    riskLevel: "Low",
    commitments: 8,
  },
  {
    id: "gh",
    name: "Ghana",
    flag: "🇬🇭",
    region: "West Africa",
    capital: "Accra",
    population: "33.5M",
    gdp: "$77B",
    gdpGrowth: 4.8,
    delegationSize: 32,
    presidentialConfirmed: true,
    readinessScore: 88,
    topSectors: ["Mining", "Agriculture", "Services"],
    opportunities: 89,
    totalInvestment: "$4.2B",
    keyResources: ["Gold", "Cocoa", "Oil", "Timber"],
    riskLevel: "Low",
    commitments: 6,
  },
  {
    id: "sn",
    name: "Senegal",
    flag: "🇸🇳",
    region: "West Africa",
    capital: "Dakar",
    population: "17.7M",
    gdp: "$28B",
    gdpGrowth: 5.5,
    delegationSize: 28,
    presidentialConfirmed: true,
    readinessScore: 85,
    topSectors: ["Fishing", "Tourism", "Agriculture"],
    opportunities: 67,
    totalInvestment: "$2.8B",
    keyResources: ["Fish", "Phosphates", "Groundnuts"],
    riskLevel: "Low",
    commitments: 5,
  },
  {
    id: "ci",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    region: "West Africa",
    capital: "Yamoussoukro",
    population: "28.2M",
    gdp: "$70B",
    gdpGrowth: 6.2,
    delegationSize: 35,
    presidentialConfirmed: false,
    readinessScore: 78,
    topSectors: ["Agriculture", "Mining", "Manufacturing"],
    opportunities: 94,
    totalInvestment: "$3.9B",
    keyResources: ["Cocoa", "Coffee", "Palm Oil", "Rubber"],
    riskLevel: "Medium",
    commitments: 4,
  },
  {
    id: "ml",
    name: "Mali",
    flag: "🇲🇱",
    region: "West Africa",
    capital: "Bamako",
    population: "22.4M",
    gdp: "$19B",
    gdpGrowth: 2.1,
    delegationSize: 18,
    presidentialConfirmed: false,
    readinessScore: 62,
    topSectors: ["Mining", "Agriculture", "Livestock"],
    opportunities: 34,
    totalInvestment: "$1.2B",
    keyResources: ["Gold", "Cotton", "Livestock"],
    riskLevel: "High",
    commitments: 2,
  },
  {
    id: "ne",
    name: "Niger",
    flag: "🇳🇪",
    region: "West Africa",
    capital: "Niamey",
    population: "26.2M",
    gdp: "$15B",
    gdpGrowth: 1.8,
    delegationSize: 15,
    presidentialConfirmed: false,
    readinessScore: 55,
    topSectors: ["Mining", "Agriculture"],
    opportunities: 28,
    totalInvestment: "$0.9B",
    keyResources: ["Uranium", "Gold", "Oil"],
    riskLevel: "High",
    commitments: 1,
  },
  {
    id: "bf",
    name: "Burkina Faso",
    flag: "🇧🇫",
    region: "West Africa",
    capital: "Ouagadougou",
    population: "22.7M",
    gdp: "$19B",
    gdpGrowth: 2.5,
    delegationSize: 20,
    presidentialConfirmed: false,
    readinessScore: 58,
    topSectors: ["Mining", "Agriculture", "Livestock"],
    opportunities: 31,
    totalInvestment: "$1.1B",
    keyResources: ["Gold", "Cotton", "Livestock"],
    riskLevel: "High",
    commitments: 2,
  },
  {
    id: "tg",
    name: "Togo",
    flag: "🇹🇬",
    region: "West Africa",
    capital: "Lomé",
    population: "8.8M",
    gdp: "$8.5B",
    gdpGrowth: 5.8,
    delegationSize: 22,
    presidentialConfirmed: true,
    readinessScore: 82,
    topSectors: ["Port Services", "Agriculture", "Mining"],
    opportunities: 42,
    totalInvestment: "$1.5B",
    keyResources: ["Phosphates", "Limestone", "Marble"],
    riskLevel: "Low",
    commitments: 3,
  },
]

const sectorIcons: Record<string, typeof Leaf> = {
  "Oil & Gas": Factory,
  Agriculture: Leaf,
  Technology: Zap,
  Mining: Building2,
  Services: Users,
  Fishing: Droplets,
  Tourism: Globe,
  Manufacturing: Factory,
  Livestock: Users,
  "Port Services": Building2,
}

export default function CountryDashboardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("readinessScore")

  const filteredCountries = countries
    .filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "readinessScore") return b.readinessScore - a.readinessScore
      if (sortBy === "opportunities") return b.opportunities - a.opportunities
      if (sortBy === "gdpGrowth") return b.gdpGrowth - a.gdpGrowth
      if (sortBy === "delegationSize") return b.delegationSize - a.delegationSize
      return 0
    })

  const totalOpportunities = countries.reduce((acc, c) => acc + c.opportunities, 0)
  const confirmedPresidents = countries.filter((c) => c.presidentialConfirmed).length
  const avgReadiness = Math.round(countries.reduce((acc, c) => acc + c.readinessScore, 0) / countries.length)

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Country Dashboards</h1>
          <p className="text-muted-foreground">Comprehensive intelligence on each ECOWAS member state</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <BarChart3 className="w-4 h-4 mr-2" />
            Compare Countries
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Countries</p>
                <p className="text-3xl font-bold">{countries.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Presidents Confirmed</p>
                <p className="text-3xl font-bold">
                  {confirmedPresidents}/{countries.length}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Crown className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Opportunities</p>
                <p className="text-3xl font-bold">{totalOpportunities}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Readiness</p>
                <p className="text-3xl font-bold">{avgReadiness}%</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="readinessScore">Readiness Score</SelectItem>
            <SelectItem value="opportunities">Opportunities</SelectItem>
            <SelectItem value="gdpGrowth">GDP Growth</SelectItem>
            <SelectItem value="delegationSize">Delegation Size</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCountries.map((country, index) => (
          <motion.div
            key={country.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/dashboard/intelligence/countries/${country.id}`}>
              <Card className="cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all group h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{country.flag}</span>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {country.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {country.capital}
                        </CardDescription>
                      </div>
                    </div>
                    {country.presidentialConfirmed && (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20 shrink-0">
                        <Crown className="w-3 h-3 mr-1" />
                        President
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Readiness Score */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Readiness</span>
                      <span className="font-semibold">{country.readinessScore}%</span>
                    </div>
                    <Progress value={country.readinessScore} className="h-2" />
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-muted-foreground text-xs">GDP Growth</p>
                      <p className="font-semibold flex items-center gap-1">
                        {country.gdpGrowth > 3 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        {country.gdpGrowth}%
                      </p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-muted-foreground text-xs">Opportunities</p>
                      <p className="font-semibold">{country.opportunities}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-muted-foreground text-xs">Delegation</p>
                      <p className="font-semibold">{country.delegationSize}</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-muted-foreground text-xs">Risk Level</p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          country.riskLevel === "Low"
                            ? "border-green-500 text-green-500"
                            : country.riskLevel === "Medium"
                              ? "border-yellow-500 text-yellow-500"
                              : "border-red-500 text-red-500"
                        }`}
                      >
                        {country.riskLevel}
                      </Badge>
                    </div>
                  </div>

                  {/* Top Sectors */}
                  <div className="flex flex-wrap gap-1">
                    {country.topSectors.slice(0, 3).map((sector) => {
                      const Icon = sectorIcons[sector] || Building2
                      return (
                        <Badge key={sector} variant="secondary" className="text-xs">
                          <Icon className="w-3 h-3 mr-1" />
                          {sector}
                        </Badge>
                      )
                    })}
                  </div>

                  {/* View Details Link */}
                  <div className="flex items-center justify-end text-sm text-primary group-hover:underline">
                    View Full Dashboard
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
