"use client"

import { useState, use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  TrendingUp,
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
  Crown,
  DollarSign,
  Target,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Briefcase,
  Heart,
  Shield,
  Lightbulb,
  ExternalLink,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const countriesData: Record<
  string,
  {
    id: string
    name: string
    flag: string
    region: string
    capital: string
    population: string
    gdp: string
    gdpGrowth: number
    gdpPerCapita: string
    delegationSize: number
    presidentialConfirmed: boolean
    presidentName: string
    presidentTitle: string
    readinessScore: number
    topSectors: string[]
    opportunities: number
    totalInvestment: string
    keyResources: string[]
    riskLevel: string
    commitments: number
    currency: string
    officialLanguage: string
    area: string
    timezone: string
    economicIndicators: {
      inflation: number
      unemployment: number
      tradeBalance: string
      fdi: string
      debtToGdp: number
    }
    summitReadiness: {
      delegationRegistered: boolean
      visaProcessing: string
      accommodation: string
      bilateralMeetings: number
      projectsSubmitted: number
    }
    investmentPipeline: {
      sector: string
      value: string
      status: string
      priority: string
    }[]
    delegation: {
      name: string
      title: string
      ministry: string
      avatar?: string
    }[]
  }
> = {
  ng: {
    id: "ng",
    name: "Nigeria",
    flag: "🇳🇬",
    region: "West Africa",
    capital: "Abuja",
    population: "223.8M",
    gdp: "$477B",
    gdpGrowth: 3.2,
    gdpPerCapita: "$2,184",
    delegationSize: 45,
    presidentialConfirmed: true,
    presidentName: "H.E. Bola Ahmed Tinubu",
    presidentTitle: "President of the Federal Republic of Nigeria",
    readinessScore: 92,
    topSectors: ["Oil & Gas", "Agriculture", "Technology", "Manufacturing", "Financial Services"],
    opportunities: 156,
    totalInvestment: "$12.5B",
    keyResources: ["Crude Oil", "Natural Gas", "Cocoa", "Palm Oil", "Tin", "Iron Ore"],
    riskLevel: "Low",
    commitments: 8,
    currency: "Nigerian Naira (NGN)",
    officialLanguage: "English",
    area: "923,768 km²",
    timezone: "WAT (UTC+1)",
    economicIndicators: {
      inflation: 28.9,
      unemployment: 33.3,
      tradeBalance: "$4.2B",
      fdi: "$3.1B",
      debtToGdp: 38.8,
    },
    summitReadiness: {
      delegationRegistered: true,
      visaProcessing: "Complete",
      accommodation: "Confirmed",
      bilateralMeetings: 12,
      projectsSubmitted: 24,
    },
    investmentPipeline: [
      { sector: "Renewable Energy", value: "$2.8B", status: "Active", priority: "High" },
      { sector: "Agriculture Tech", value: "$1.5B", status: "Pipeline", priority: "High" },
      { sector: "Digital Infrastructure", value: "$3.2B", status: "Active", priority: "Critical" },
      { sector: "Transport & Logistics", value: "$2.1B", status: "Pipeline", priority: "Medium" },
      { sector: "Healthcare", value: "$1.8B", status: "Early Stage", priority: "High" },
      { sector: "Manufacturing", value: "$1.1B", status: "Active", priority: "Medium" },
    ],
    delegation: [
      { name: "Dr. Aisha Abubakar", title: "Minister of Finance", ministry: "Federal Ministry of Finance" },
      { name: "Chief Adebayo Adelabu", title: "Minister of Power", ministry: "Federal Ministry of Power" },
      { name: "Alhaji Mohammed Badaru", title: "Minister of Agriculture", ministry: "Federal Ministry of Agriculture" },
      { name: "Dr. Bosun Tijani", title: "Minister of Communications", ministry: "Federal Ministry of Communications" },
    ],
  },
  gh: {
    id: "gh",
    name: "Ghana",
    flag: "🇬🇭",
    region: "West Africa",
    capital: "Accra",
    population: "33.5M",
    gdp: "$77B",
    gdpGrowth: 4.8,
    gdpPerCapita: "$2,363",
    delegationSize: 32,
    presidentialConfirmed: true,
    presidentName: "H.E. John Dramani Mahama",
    presidentTitle: "President of the Republic of Ghana",
    readinessScore: 88,
    topSectors: ["Mining", "Agriculture", "Services", "Oil & Gas", "Manufacturing"],
    opportunities: 89,
    totalInvestment: "$4.2B",
    keyResources: ["Gold", "Cocoa", "Oil", "Timber", "Bauxite", "Manganese"],
    riskLevel: "Low",
    commitments: 6,
    currency: "Ghanaian Cedi (GHS)",
    officialLanguage: "English",
    area: "238,533 km²",
    timezone: "GMT (UTC+0)",
    economicIndicators: {
      inflation: 23.2,
      unemployment: 14.7,
      tradeBalance: "$1.8B",
      fdi: "$2.6B",
      debtToGdp: 88.1,
    },
    summitReadiness: {
      delegationRegistered: true,
      visaProcessing: "Complete",
      accommodation: "Confirmed",
      bilateralMeetings: 8,
      projectsSubmitted: 16,
    },
    investmentPipeline: [
      { sector: "Green Mining", value: "$1.2B", status: "Active", priority: "High" },
      { sector: "Cocoa Processing", value: "$800M", status: "Pipeline", priority: "High" },
      { sector: "Renewable Energy", value: "$1.5B", status: "Active", priority: "Critical" },
      { sector: "FinTech", value: "$400M", status: "Early Stage", priority: "Medium" },
    ],
    delegation: [
      { name: "Dr. Cassiel Ato Forson", title: "Minister of Finance", ministry: "Ministry of Finance" },
      { name: "Samuel Abu Jinapor", title: "Minister of Lands", ministry: "Ministry of Lands and Natural Resources" },
    ],
  },
  sn: {
    id: "sn",
    name: "Senegal",
    flag: "🇸🇳",
    region: "West Africa",
    capital: "Dakar",
    population: "17.7M",
    gdp: "$28B",
    gdpGrowth: 5.5,
    gdpPerCapita: "$1,606",
    delegationSize: 28,
    presidentialConfirmed: true,
    presidentName: "H.E. Bassirou Diomaye Faye",
    presidentTitle: "President of the Republic of Senegal",
    readinessScore: 85,
    topSectors: ["Fishing", "Tourism", "Agriculture", "Mining", "Services"],
    opportunities: 67,
    totalInvestment: "$2.8B",
    keyResources: ["Fish", "Phosphates", "Groundnuts", "Iron Ore", "Zircon"],
    riskLevel: "Low",
    commitments: 5,
    currency: "CFA Franc (XOF)",
    officialLanguage: "French",
    area: "196,722 km²",
    timezone: "GMT (UTC+0)",
    economicIndicators: {
      inflation: 8.1,
      unemployment: 16.9,
      tradeBalance: "-$2.1B",
      fdi: "$1.8B",
      debtToGdp: 73.4,
    },
    summitReadiness: {
      delegationRegistered: true,
      visaProcessing: "Complete",
      accommodation: "Confirmed",
      bilateralMeetings: 6,
      projectsSubmitted: 12,
    },
    investmentPipeline: [
      { sector: "Blue Economy", value: "$600M", status: "Active", priority: "High" },
      { sector: "Oil & Gas", value: "$1.2B", status: "Active", priority: "Critical" },
      { sector: "Tourism", value: "$400M", status: "Pipeline", priority: "Medium" },
    ],
    delegation: [{ name: "Cheikh Diba", title: "Minister of Finance", ministry: "Ministry of Finance and Budget" }],
  },
  ci: {
    id: "ci",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    region: "West Africa",
    capital: "Yamoussoukro",
    population: "28.2M",
    gdp: "$70B",
    gdpGrowth: 6.2,
    gdpPerCapita: "$2,486",
    delegationSize: 35,
    presidentialConfirmed: false,
    presidentName: "H.E. Alassane Ouattara",
    presidentTitle: "President of the Republic of Côte d'Ivoire",
    readinessScore: 78,
    topSectors: ["Agriculture", "Mining", "Manufacturing", "Services", "Energy"],
    opportunities: 94,
    totalInvestment: "$3.9B",
    keyResources: ["Cocoa", "Coffee", "Palm Oil", "Rubber", "Gold", "Diamonds"],
    riskLevel: "Medium",
    commitments: 4,
    currency: "CFA Franc (XOF)",
    officialLanguage: "French",
    area: "322,463 km²",
    timezone: "GMT (UTC+0)",
    economicIndicators: {
      inflation: 4.4,
      unemployment: 3.4,
      tradeBalance: "$3.2B",
      fdi: "$1.2B",
      debtToGdp: 56.8,
    },
    summitReadiness: {
      delegationRegistered: true,
      visaProcessing: "In Progress",
      accommodation: "Pending",
      bilateralMeetings: 5,
      projectsSubmitted: 18,
    },
    investmentPipeline: [
      { sector: "Cocoa Processing", value: "$1.5B", status: "Active", priority: "Critical" },
      { sector: "Energy", value: "$1.2B", status: "Pipeline", priority: "High" },
      { sector: "Infrastructure", value: "$800M", status: "Early Stage", priority: "Medium" },
    ],
    delegation: [
      { name: "Adama Coulibaly", title: "Minister of Finance", ministry: "Ministry of Economy and Finance" },
    ],
  },
  ml: {
    id: "ml",
    name: "Mali",
    flag: "🇲🇱",
    region: "West Africa",
    capital: "Bamako",
    population: "22.4M",
    gdp: "$19B",
    gdpGrowth: 2.1,
    gdpPerCapita: "$879",
    delegationSize: 18,
    presidentialConfirmed: false,
    presidentName: "Col. Assimi Goïta",
    presidentTitle: "Transitional President of Mali",
    readinessScore: 62,
    topSectors: ["Mining", "Agriculture", "Livestock"],
    opportunities: 34,
    totalInvestment: "$1.2B",
    keyResources: ["Gold", "Cotton", "Livestock", "Salt"],
    riskLevel: "High",
    commitments: 2,
    currency: "CFA Franc (XOF)",
    officialLanguage: "French",
    area: "1,240,192 km²",
    timezone: "GMT (UTC+0)",
    economicIndicators: {
      inflation: 5.2,
      unemployment: 7.9,
      tradeBalance: "-$1.1B",
      fdi: "$400M",
      debtToGdp: 52.4,
    },
    summitReadiness: {
      delegationRegistered: false,
      visaProcessing: "Pending",
      accommodation: "Pending",
      bilateralMeetings: 2,
      projectsSubmitted: 6,
    },
    investmentPipeline: [
      { sector: "Gold Mining", value: "$800M", status: "Active", priority: "High" },
      { sector: "Agriculture", value: "$300M", status: "Pipeline", priority: "Medium" },
    ],
    delegation: [],
  },
  ne: {
    id: "ne",
    name: "Niger",
    flag: "🇳🇪",
    region: "West Africa",
    capital: "Niamey",
    population: "26.2M",
    gdp: "$15B",
    gdpGrowth: 1.8,
    gdpPerCapita: "$591",
    delegationSize: 15,
    presidentialConfirmed: false,
    presidentName: "Gen. Abdourahamane Tchiani",
    presidentTitle: "Transitional Head of State",
    readinessScore: 55,
    topSectors: ["Mining", "Agriculture"],
    opportunities: 28,
    totalInvestment: "$0.9B",
    keyResources: ["Uranium", "Gold", "Oil", "Coal"],
    riskLevel: "High",
    commitments: 1,
    currency: "CFA Franc (XOF)",
    officialLanguage: "French",
    area: "1,267,000 km²",
    timezone: "WAT (UTC+1)",
    economicIndicators: {
      inflation: 3.7,
      unemployment: 0.5,
      tradeBalance: "-$1.8B",
      fdi: "$200M",
      debtToGdp: 50.6,
    },
    summitReadiness: {
      delegationRegistered: false,
      visaProcessing: "Pending",
      accommodation: "Pending",
      bilateralMeetings: 1,
      projectsSubmitted: 4,
    },
    investmentPipeline: [
      { sector: "Uranium Mining", value: "$600M", status: "Active", priority: "High" },
      { sector: "Oil & Gas", value: "$300M", status: "Early Stage", priority: "Medium" },
    ],
    delegation: [],
  },
  bf: {
    id: "bf",
    name: "Burkina Faso",
    flag: "🇧🇫",
    region: "West Africa",
    capital: "Ouagadougou",
    population: "22.7M",
    gdp: "$19B",
    gdpGrowth: 2.5,
    gdpPerCapita: "$831",
    delegationSize: 20,
    presidentialConfirmed: false,
    presidentName: "Capt. Ibrahim Traoré",
    presidentTitle: "Transitional President of Burkina Faso",
    readinessScore: 58,
    topSectors: ["Mining", "Agriculture", "Livestock"],
    opportunities: 31,
    totalInvestment: "$1.1B",
    keyResources: ["Gold", "Cotton", "Livestock", "Shea Nuts"],
    riskLevel: "High",
    commitments: 2,
    currency: "CFA Franc (XOF)",
    officialLanguage: "French",
    area: "274,200 km²",
    timezone: "GMT (UTC+0)",
    economicIndicators: {
      inflation: 1.4,
      unemployment: 5.0,
      tradeBalance: "-$800M",
      fdi: "$300M",
      debtToGdp: 58.3,
    },
    summitReadiness: {
      delegationRegistered: false,
      visaProcessing: "Pending",
      accommodation: "Pending",
      bilateralMeetings: 2,
      projectsSubmitted: 5,
    },
    investmentPipeline: [
      { sector: "Gold Mining", value: "$700M", status: "Active", priority: "High" },
      { sector: "Cotton Processing", value: "$300M", status: "Pipeline", priority: "Medium" },
    ],
    delegation: [],
  },
  tg: {
    id: "tg",
    name: "Togo",
    flag: "🇹🇬",
    region: "West Africa",
    capital: "Lomé",
    population: "8.8M",
    gdp: "$8.5B",
    gdpGrowth: 5.8,
    gdpPerCapita: "$994",
    delegationSize: 22,
    presidentialConfirmed: true,
    presidentName: "H.E. Faure Gnassingbé",
    presidentTitle: "President of the Togolese Republic",
    readinessScore: 82,
    topSectors: ["Port Services", "Agriculture", "Mining", "Manufacturing"],
    opportunities: 42,
    totalInvestment: "$1.5B",
    keyResources: ["Phosphates", "Limestone", "Marble", "Cocoa"],
    riskLevel: "Low",
    commitments: 3,
    currency: "CFA Franc (XOF)",
    officialLanguage: "French",
    area: "56,785 km²",
    timezone: "GMT (UTC+0)",
    economicIndicators: {
      inflation: 5.1,
      unemployment: 3.9,
      tradeBalance: "-$600M",
      fdi: "$400M",
      debtToGdp: 65.9,
    },
    summitReadiness: {
      delegationRegistered: true,
      visaProcessing: "Complete",
      accommodation: "Confirmed",
      bilateralMeetings: 4,
      projectsSubmitted: 8,
    },
    investmentPipeline: [
      { sector: "Port Infrastructure", value: "$600M", status: "Active", priority: "Critical" },
      { sector: "Phosphate Mining", value: "$400M", status: "Active", priority: "High" },
      { sector: "Manufacturing", value: "$300M", status: "Pipeline", priority: "Medium" },
    ],
    delegation: [{ name: "Sani Yaya", title: "Minister of Economy", ministry: "Ministry of Economy and Finance" }],
  },
}

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
  "Renewable Energy": Zap,
  "Agriculture Tech": Leaf,
  "Digital Infrastructure": Zap,
  "Transport & Logistics": Building2,
  Healthcare: Heart,
  "Green Mining": Building2,
  "Cocoa Processing": Leaf,
  FinTech: DollarSign,
  "Blue Economy": Droplets,
  Energy: Zap,
  Infrastructure: Building2,
  "Gold Mining": Building2,
  "Uranium Mining": Building2,
  "Cotton Processing": Leaf,
  "Port Infrastructure": Building2,
  "Phosphate Mining": Building2,
}

export default function CountryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const country = countriesData[id]
  const [activeTab, setActiveTab] = useState("overview")

  if (!country) {
    return (
      <div className="p-6">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
          <Link href="/dashboard/intelligence/countries">
            <Button>Back to Countries</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/20 via-accent/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/african-pattern-geometric.jpg')] opacity-5" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center"
        >
          <div className="container mx-auto px-6">
            <Link
              href="/dashboard/intelligence/countries"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Countries
            </Link>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="text-8xl md:text-9xl"
              >
                {country.flag}
              </motion.div>
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold">{country.name}</h1>
                  {country.presidentialConfirmed && (
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                      <Crown className="w-3 h-3 mr-1" />
                      President Confirmed
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={
                      country.riskLevel === "Low"
                        ? "border-green-500 text-green-500"
                        : country.riskLevel === "Medium"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-red-500 text-red-500"
                    }
                  >
                    {country.riskLevel} Risk
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {country.capital}, {country.region}
                </p>
                <p className="text-muted-foreground mt-1">{country.presidentName}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 -mt-16 relative z-10 mb-8">
          {[
            { label: "GDP", value: country.gdp, icon: DollarSign, color: "text-primary" },
            { label: "GDP Growth", value: `${country.gdpGrowth}%`, icon: TrendingUp, color: "text-green-500" },
            { label: "Population", value: country.population, icon: Users, color: "text-blue-500" },
            { label: "Opportunities", value: country.opportunities.toString(), icon: Target, color: "text-accent" },
            { label: "Investment Pipeline", value: country.totalInvestment, icon: Briefcase, color: "text-purple-500" },
            { label: "Readiness", value: `${country.readinessScore}%`, icon: CheckCircle2, color: "text-emerald-500" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="bg-card/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xl font-bold truncate">{stat.value}</p>
                      <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 w-full md:w-auto flex flex-wrap justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="economy">Economy</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="delegation">Delegation</TabsTrigger>
            <TabsTrigger value="readiness">Summit Readiness</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Country Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Country Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Capital</p>
                      <p className="font-medium">{country.capital}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Population</p>
                      <p className="font-medium">{country.population}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Area</p>
                      <p className="font-medium">{country.area}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Timezone</p>
                      <p className="font-medium">{country.timezone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Currency</p>
                      <p className="font-medium">{country.currency}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Language</p>
                      <p className="font-medium">{country.officialLanguage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    Key Resources
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {country.keyResources.map((resource) => (
                      <Badge key={resource} variant="secondary" className="text-sm">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Sectors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Top Sectors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {country.topSectors.map((sector, i) => {
                      const Icon = sectorIcons[sector] || Building2
                      return (
                        <div key={sector} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium">{sector}</span>
                          <Badge variant="outline" className="ml-auto">
                            #{i + 1}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Head of State */}
            <Card className="bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  Head of State
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                      {country.presidentName.split(" ").slice(-1)[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold">{country.presidentName}</h3>
                    <p className="text-muted-foreground">{country.presidentTitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {country.presidentialConfirmed ? (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Attendance Confirmed
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Confirmation
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="economy" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Economic Indicators */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Economic Indicators</CardTitle>
                  <CardDescription>Key economic metrics and performance data</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">GDP</p>
                      <p className="text-3xl font-bold">{country.gdp}</p>
                      <div className="flex items-center gap-1 text-green-500 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        {country.gdpGrowth}% growth
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">GDP Per Capita</p>
                      <p className="text-3xl font-bold">{country.gdpPerCapita}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Inflation Rate</p>
                      <p className="text-3xl font-bold">{country.economicIndicators.inflation}%</p>
                      {country.economicIndicators.inflation > 10 && (
                        <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          High
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Unemployment</p>
                      <p className="text-3xl font-bold">{country.economicIndicators.unemployment}%</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Trade Balance</p>
                      <p className="text-3xl font-bold">{country.economicIndicators.tradeBalance}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">FDI Inflows</p>
                      <p className="text-3xl font-bold">{country.economicIndicators.fdi}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Debt to GDP */}
              <Card>
                <CardHeader>
                  <CardTitle>Debt to GDP Ratio</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(country.economicIndicators.debtToGdp / 100) * 352} 352`}
                        className={
                          country.economicIndicators.debtToGdp > 80
                            ? "text-red-500"
                            : country.economicIndicators.debtToGdp > 60
                              ? "text-yellow-500"
                              : "text-green-500"
                        }
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
                      {country.economicIndicators.debtToGdp}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {country.economicIndicators.debtToGdp > 80
                      ? "High debt level - monitoring required"
                      : country.economicIndicators.debtToGdp > 60
                        ? "Moderate debt level"
                        : "Healthy debt level"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Investment Pipeline</h2>
                <p className="text-muted-foreground">
                  {country.opportunities} opportunities worth {country.totalInvestment}
                </p>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent text-white">
                <Download className="w-4 h-4 mr-2" />
                Export Pipeline
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {country.investmentPipeline.map((project, i) => {
                const Icon = sectorIcons[project.sector] || Building2
                return (
                  <motion.div
                    key={project.sector}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-bold">{project.sector}</h3>
                              <p className="text-2xl font-bold text-primary">{project.value}</p>
                            </div>
                          </div>
                          <Badge
                            className={
                              project.priority === "Critical"
                                ? "bg-red-500/10 text-red-500"
                                : project.priority === "High"
                                  ? "bg-orange-500/10 text-orange-500"
                                  : "bg-blue-500/10 text-blue-500"
                            }
                          >
                            {project.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className={
                              project.status === "Active"
                                ? "border-green-500 text-green-500"
                                : project.status === "Pipeline"
                                  ? "border-blue-500 text-blue-500"
                                  : "border-gray-500 text-gray-500"
                            }
                          >
                            {project.status}
                          </Badge>
                          <Button variant="ghost" size="sm" className="gap-1">
                            View Details <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="delegation" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Official Delegation</h2>
                <p className="text-muted-foreground">{country.delegationSize} registered delegates</p>
              </div>
              <Badge className="bg-primary/10 text-primary">
                <Users className="w-3 h-3 mr-1" />
                {country.delegationSize} Members
              </Badge>
            </div>

            {country.delegation.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-4">
                {country.delegation.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-bold">{member.name}</h3>
                            <p className="text-primary">{member.title}</p>
                            <p className="text-sm text-muted-foreground">{member.ministry}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Delegation Not Yet Registered</h3>
                  <p className="text-muted-foreground">
                    The official delegation for {country.name} has not been registered yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="readiness" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Summit Readiness Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8 mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(country.readinessScore / 100) * 352} 352`}
                        className={
                          country.readinessScore >= 80
                            ? "text-green-500"
                            : country.readinessScore >= 60
                              ? "text-yellow-500"
                              : "text-red-500"
                        }
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                      {country.readinessScore}%
                    </span>
                  </div>
                  <div className="space-y-3 flex-1">
                    {[
                      {
                        label: "Delegation Registered",
                        status: country.summitReadiness.delegationRegistered,
                        type: "boolean",
                      },
                      { label: "Visa Processing", status: country.summitReadiness.visaProcessing, type: "string" },
                      { label: "Accommodation", status: country.summitReadiness.accommodation, type: "string" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-sm">{item.label}</span>
                        {item.type === "boolean" ? (
                          item.status ? (
                            <Badge className="bg-green-500/10 text-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/10 text-red-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          )
                        ) : (
                          <Badge
                            className={
                              item.status === "Complete" || item.status === "Confirmed"
                                ? "bg-green-500/10 text-green-500"
                                : item.status === "In Progress"
                                  ? "bg-yellow-500/10 text-yellow-500"
                                  : "bg-red-500/10 text-red-500"
                            }
                          >
                            {item.status}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bilateral Meetings Scheduled</p>
                    <p className="text-3xl font-bold">{country.summitReadiness.bilateralMeetings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Projects Submitted</p>
                    <p className="text-3xl font-bold">{country.summitReadiness.projectsSubmitted}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
