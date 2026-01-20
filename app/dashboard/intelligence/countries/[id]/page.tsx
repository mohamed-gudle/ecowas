"use client"

import { useState, use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Crown,
  MapPin,
  DollarSign,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  Globe,
  Clock,
  Banknote,
  Languages,
  BarChart3
} from "lucide-react"
import { COUNTRIES } from "@/components/ecowas-map/countries-data"
import { PROJECTS } from "@/components/ecowas-map/mock-data"
import { notFound } from "next/navigation"
import EcowasMap from "@/components/ecowas-map"

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

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <Card className="border">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="p-2 rounded-full bg-muted">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg font-bold truncate">{value}</p>
          <p className="text-xs text-muted-foreground truncate">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function CountryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [activeTab, setActiveTab] = useState("overview")

  const country = COUNTRIES.find(c => c.id === id)

  if (!country) {
    notFound()
  }

  // Get opportunities for this country
  const countryOpportunities = PROJECTS.filter(p =>
    p.country.toLowerCase().includes(country.name.toLowerCase()) ||
    (country.name === "Côte d'Ivoire" && p.country.includes("Côte d'Ivoire"))
  )

  // Calculate sector distribution
  const sectorCounts = countryOpportunities.reduce((acc, p) => {
    acc[p.sector] = (acc[p.sector] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedSectors = Object.entries(sectorCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([sector], index) => ({ sector, rank: index + 1 }))

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link href="/dashboard/intelligence/countries">
        <Button variant="ghost" className="gap-2 pl-0 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Countries
        </Button>
      </Link>

      {/* Country Header */}
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <span className="text-7xl">{country.flag}</span>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-4xl font-bold">{country.name}</h1>
            {country.presidentConfirmed && (
              <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
                <Crown className="h-3 w-3" /> President Confirmed
              </Badge>
            )}
            <Badge variant="outline" className={RISK_COLORS[country.riskLevel]}>
              {country.riskLevel} Risk
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground mb-1">
            <MapPin className="h-4 w-4" />
            {country.capital}, {country.region}
          </div>
          <p className="text-muted-foreground">{country.president}</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard
          icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
          value={country.gdp}
          label="GDP"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-emerald-600" />}
          value={country.gdpGrowth}
          label="GDP Growth"
        />
        <StatCard
          icon={<Users className="h-5 w-5 text-blue-600" />}
          value={country.population}
          label="Population"
        />
        <StatCard
          icon={<Target className="h-5 w-5 text-orange-600" />}
          value={String(country.opportunitiesCount)}
          label="Opportunities"
        />
        <StatCard
          icon={<Banknote className="h-5 w-5 text-purple-600" />}
          value={country.totalInvestment}
          label="Investment"
        />
        <StatCard
          icon={<CheckCircle className="h-5 w-5 text-green-600" />}
          value={`${country.readinessScore}%`}
          label="Readiness"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start bg-muted/50 p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="economy">Economy</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="delegation">Delegation</TabsTrigger>
          <TabsTrigger value="readiness">Summit Readiness</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Country Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="h-4 w-4" />
                  Country Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Capital</p>
                    <p className="font-medium">{country.capital}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Population</p>
                    <p className="font-medium">{country.population}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Area</p>
                    <p className="font-medium">{country.area}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Timezone</p>
                    <p className="font-medium">{country.timezone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Currency</p>
                    <p className="font-medium">{country.currency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Language</p>
                    <p className="font-medium">{country.language}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Resources */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4 text-red-500" />
                  Key Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {country.keyResources.map((resource) => (
                    <Badge key={resource} className="bg-amber-100 text-amber-800 border-amber-200">
                      {resource}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Sectors */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-4 w-4" />
                  Top Sectors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {country.topSectors.map((sector, index) => (
                  <div key={sector} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${SECTOR_COLORS[sector]?.split(' ')[0] || 'bg-gray-100'}`}>
                        <BarChart3 className="h-3 w-3" />
                      </div>
                      <span className="text-sm">{sector}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="economy" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Economic Indicators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>GDP</span>
                  <span className="font-bold text-lg">{country.gdp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>GDP Growth Rate</span>
                  <span className="font-bold text-lg text-emerald-600">{country.gdpGrowth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Investment Pipeline</span>
                  <span className="font-bold text-lg">{country.totalInvestment}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Currency</span>
                  <span className="font-medium">{country.currency}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Investment Climate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Investment Readiness</span>
                    <span className="font-bold">{country.readinessScore}%</span>
                  </div>
                  <Progress value={country.readinessScore} className="h-3" />
                </div>
                <div className="flex justify-between items-center">
                  <span>Risk Level</span>
                  <Badge className={RISK_COLORS[country.riskLevel]}>{country.riskLevel}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Opportunities</span>
                  <span className="font-bold">{country.opportunitiesCount}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {countryOpportunities.length > 0 ? (
              countryOpportunities.map((project) => (
                <Card key={project.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{project.name}</h3>
                    <Badge className={`mb-2 ${SECTOR_COLORS[project.sector] || 'bg-gray-100'}`}>
                      {project.sector}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.details}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Investment</span>
                      <span className="font-semibold">{project.investmentRange}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ROI</span>
                      <span className="font-semibold text-emerald-600">{project.roi}</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No direct opportunities listed for {country.name}. Check regional opportunities on the Investment Map.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="delegation" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Delegation Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-3xl font-bold">{country.delegationSize}</p>
                  <p className="text-sm text-muted-foreground">Delegates</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-3xl font-bold">{country.presidentConfirmed ? '✓' : '—'}</p>
                  <p className="text-sm text-muted-foreground">President</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-3xl font-bold">TBD</p>
                  <p className="text-sm text-muted-foreground">Ministers</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-3xl font-bold">TBD</p>
                  <p className="text-sm text-muted-foreground">Private Sector</p>
                </div>
              </div>
              <div className="pt-4">
                <h4 className="font-semibold mb-2">Head of State</h4>
                <p>{country.president}</p>
                <Badge className={country.presidentConfirmed ? 'bg-green-100 text-green-700 mt-2' : 'bg-amber-100 text-amber-700 mt-2'}>
                  {country.presidentConfirmed ? 'Attendance Confirmed' : 'Pending Confirmation'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readiness" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Summit Readiness Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Overall Readiness Score</span>
                  <span className="font-bold text-xl">{country.readinessScore}%</span>
                </div>
                <Progress value={country.readinessScore} className="h-4" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">Preparation Checklist</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className={`h-4 w-4 ${country.presidentConfirmed ? 'text-green-600' : 'text-gray-300'}`} />
                      <span className={country.presidentConfirmed ? '' : 'text-muted-foreground'}>Presidential Confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Delegation Registered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Investment Portfolio Submitted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-gray-300" />
                      <span className="text-muted-foreground">Bilateral Meetings Scheduled</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Risk Assessment</h4>
                  <div className="flex items-center gap-3">
                    <Badge className={RISK_COLORS[country.riskLevel]} variant="outline">
                      {country.riskLevel} Risk
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {country.riskLevel === 'Low' && 'Stable political and economic environment'}
                      {country.riskLevel === 'Medium' && 'Some political or economic uncertainties'}
                      {country.riskLevel === 'High' && 'Significant political or economic challenges'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
