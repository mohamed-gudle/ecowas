"use client"

import { notFound, useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/dashboard/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    Brain,
    Calculator,
    ClipboardCheck,
    Users,
    Globe,
    DollarSign,
    Sparkles,
    TrendingUp,
    Building2,
    FileText,
    Zap,
    Leaf,
    Cpu,
    Truck,
    Factory,
    ChevronRight,
    Target,
    Shield,
    Calendar,
    MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Opportunity data (same as opportunities page)
const opportunities = [
    {
        id: 1,
        title: "West Africa Power Pool Phase III",
        description:
            "Interconnection of power grids across 8 ECOWAS countries to enable cross-border electricity trade and improve energy access for 350 million people.",
        value: "$8.5B",
        sector: "energy",
        countries: ["Nigeria", "Ghana", "Benin", "Togo", "Côte d'Ivoire", "Burkina Faso", "Niger", "Mali"],
        readiness: 85,
        stage: "bankable",
        investors: 12,
        gap: "Financing gap of $2.1B for transmission infrastructure",
        aiScore: 94,
        tags: ["Regional", "Infrastructure", "Priority"],
        details: {
            overview: `The West Africa Power Pool (WAPP) Phase III represents the most ambitious energy infrastructure project in the region's history. This initiative aims to interconnect the power grids of 8 ECOWAS member states, creating a unified electricity market that will transform energy access across West Africa.

The project includes construction of 5,000km of high-voltage transmission lines, 12 new substations, and upgrades to existing grid infrastructure. Upon completion, it will enable cross-border electricity trade of up to 8,000 MW, reducing energy costs by an estimated 25% and improving reliability across the region.`,
            impact: [
                "350 million people with improved energy access",
                "25% reduction in electricity costs",
                "40,000 direct jobs during construction",
                "Enables 5,000 MW of renewable energy integration",
            ],
            timeline: "2026-2032 (6 years)",
            sponsors: ["ECOWAS Commission", "African Development Bank", "World Bank"],
            technicalDetails: {
                capacity: "8,000 MW cross-border transfer capacity",
                transmission: "5,000 km of 330kV transmission lines",
                substations: "12 new substations, 8 upgraded",
                technology: "HVAC with FACTS devices",
            },
        },
    },
    {
        id: 2,
        title: "Lagos-Abidjan Highway Corridor",
        description:
            "Modernization of the 1,000km coastal highway connecting major West African cities and enabling seamless trade across 5 countries.",
        value: "$4.2B",
        sector: "transport",
        countries: ["Nigeria", "Benin", "Togo", "Ghana", "Côte d'Ivoire"],
        readiness: 72,
        stage: "feasibility",
        investors: 8,
        gap: "PPP structuring and environmental impact assessment pending",
        aiScore: 88,
        tags: ["Corridor", "Trade", "High-Impact"],
        details: {
            overview: `The Lagos-Abidjan Highway Corridor is a transformative transport infrastructure project that will modernize the 1,000km coastal route connecting the five largest economies in West Africa. This corridor handles over 70% of the region's trade volume.

The project involves upgrading the existing highway to international standards, constructing bypasses around major urban centers, implementing smart traffic management systems, and developing integrated border crossing facilities.`,
            impact: [
                "70% reduction in travel time (Lagos to Abidjan)",
                "60% decrease in transport costs",
                "25,000 jobs created",
                "$15B annual trade facilitation",
            ],
            timeline: "2026-2030 (4 years)",
            sponsors: ["African Union", "ECOWAS", "EU Partnership"],
            technicalDetails: {
                length: "1,000 km of upgraded highway",
                standard: "6-lane dual carriageway",
                borders: "5 modernized border posts",
                technology: "Smart traffic management, toll systems",
            },
        },
    },
    {
        id: 3,
        title: "ECOWAS Digital Identity Framework",
        description:
            "Pan-regional digital identity system for seamless cross-border movement, financial inclusion, and access to government services.",
        value: "$1.8B",
        sector: "digital",
        countries: ["All ECOWAS"],
        readiness: 65,
        stage: "concept",
        investors: 15,
        gap: "Policy harmonization across member states required",
        aiScore: 82,
        tags: ["Digital", "Regional Integration", "Innovative"],
        details: {
            overview: `The ECOWAS Digital Identity Framework will establish a unified digital identity system across all 15 member states, enabling secure and seamless identification for over 400 million citizens. This initiative will transform cross-border movement, financial inclusion, and access to services.

The system will leverage biometric technology, blockchain for data integrity, and mobile-first design to ensure accessibility even in remote areas.`,
            impact: [
                "400 million citizens with digital identity",
                "50% increase in financial inclusion",
                "Seamless cross-border movement",
                "Reduced fraud and identity theft",
            ],
            timeline: "2026-2029 (3 years)",
            sponsors: ["ECOWAS Commission", "World Bank", "Bill & Melinda Gates Foundation"],
            technicalDetails: {
                coverage: "15 ECOWAS member states",
                technology: "Biometric, blockchain, mobile-first",
                integration: "Banking, government services, travel",
                security: "ISO 27001 compliant, GDPR-aligned",
            },
        },
    },
    {
        id: 4,
        title: "Sahel Solar Initiative",
        description:
            "Large-scale solar farms across Sahel countries with battery storage to provide clean, reliable power to underserved communities.",
        value: "$3.2B",
        sector: "energy",
        countries: ["Niger", "Mali", "Burkina Faso", "Senegal"],
        readiness: 58,
        stage: "pre-feasibility",
        investors: 6,
        gap: "Grid infrastructure upgrades needed for power evacuation",
        aiScore: 79,
        tags: ["Renewable", "Climate", "Development"],
        details: {
            overview: `The Sahel Solar Initiative aims to harness the exceptional solar resources of the Sahel region to generate clean, affordable electricity for millions. With solar irradiance levels among the highest in the world, the Sahel offers unparalleled potential for solar energy development.

The project includes construction of 2,000 MW of solar PV capacity across multiple sites, complemented by 500 MWh of battery storage to ensure reliable power supply.`,
            impact: [
                "2,000 MW clean energy capacity",
                "5 million households powered",
                "3 million tons CO2 avoided annually",
                "15,000 local jobs created",
            ],
            timeline: "2026-2031 (5 years)",
            sponsors: ["Green Climate Fund", "EIB", "IRENA"],
            technicalDetails: {
                capacity: "2,000 MW solar PV",
                storage: "500 MWh battery systems",
                sites: "8 locations across 4 countries",
                technology: "Bifacial panels, tracking systems",
            },
        },
    },
    {
        id: 5,
        title: "West African Agro-Processing Hubs",
        description:
            "Network of agricultural processing facilities to add value to regional produce and reduce post-harvest losses.",
        value: "$2.4B",
        sector: "agriculture",
        countries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal"],
        readiness: 45,
        stage: "concept",
        investors: 4,
        gap: "Cold chain logistics and quality standards harmonization",
        aiScore: 75,
        tags: ["Food Security", "Value Chain", "SME"],
        details: {
            overview: `The West African Agro-Processing Hubs initiative will establish a network of modern agricultural processing facilities across the region's key agricultural zones. These hubs will transform raw agricultural products into value-added goods, reducing post-harvest losses and creating export opportunities.

The project includes construction of 20 processing facilities, cold chain infrastructure, quality testing laboratories, and training centers for local farmers and entrepreneurs.`,
            impact: [
                "50% reduction in post-harvest losses",
                "500,000 smallholder farmers connected",
                "30,000 direct jobs created",
                "$2B annual export potential",
            ],
            timeline: "2026-2030 (4 years)",
            sponsors: ["IFAD", "AGRA", "Private sector consortium"],
            technicalDetails: {
                facilities: "20 processing hubs",
                coldChain: "1,000 cold storage units",
                products: "Cocoa, cashew, shea, cassava, rice",
                capacity: "2 million tons annually",
            },
        },
    },
]

const sectorIcons: Record<string, React.ElementType> = {
    energy: Zap,
    transport: Truck,
    digital: Cpu,
    agriculture: Leaf,
    industry: Factory,
}

const agents = [
    {
        id: "financial-modeling",
        name: "Financial Modelling Agent",
        description: "Build comprehensive DCF models, calculate NPV/IRR, and perform sensitivity analysis",
        icon: Calculator,
        gradient: "from-emerald-500 to-teal-600",
        capabilities: [
            "DCF & valuation models",
            "NPV, IRR, payback analysis",
            "Sensitivity & scenario analysis",
            "Export to Excel",
        ],
    },
    {
        id: "prefeasibility",
        name: "Prefeasibility Agent",
        description: "Conduct preliminary assessments of technical, economic, and environmental viability",
        icon: ClipboardCheck,
        gradient: "from-blue-500 to-indigo-600",
        capabilities: [
            "Technical feasibility review",
            "Market demand analysis",
            "Environmental screening",
            "Risk identification",
        ],
    },
    {
        id: "stakeholder-outreach",
        name: "Stakeholder Outreach Agent",
        description: "Identify key stakeholders and generate engagement strategies",
        icon: Users,
        gradient: "from-purple-500 to-pink-600",
        capabilities: [
            "Stakeholder mapping",
            "Communication templates",
            "Meeting preparation",
            "Follow-up tracking",
        ],
    },
]

export default function OpportunityDetailPage() {
    const params = useParams()
    const router = useRouter()
    const opportunityId = Number(params.id)

    const opportunity = opportunities.find((o) => o.id === opportunityId)

    if (!opportunity) {
        notFound()
    }

    const SectorIcon = sectorIcons[opportunity.sector] || Globe

    return (
        <div className="min-h-screen">
            <Header
                title={opportunity.title}
                subtitle={`${opportunity.sector.charAt(0).toUpperCase() + opportunity.sector.slice(1)} • ${opportunity.value}`}
            />

            <div className="p-6 space-y-6">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Opportunities
                </Button>

                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    {/* Main Info */}
                    <Card className="lg:col-span-2">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                    <SectorIcon className="w-7 h-7 text-white" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className="bg-primary/20 text-primary border-0">
                                            {opportunity.sector.charAt(0).toUpperCase() + opportunity.sector.slice(1)}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                opportunity.stage === "bankable" && "border-green-500 text-green-500",
                                                opportunity.stage === "feasibility" && "border-yellow-500 text-yellow-500",
                                                opportunity.stage === "concept" && "border-blue-500 text-blue-500",
                                                opportunity.stage === "pre-feasibility" && "border-orange-500 text-orange-500"
                                            )}
                                        >
                                            {opportunity.stage}
                                        </Badge>
                                        {opportunity.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground">{opportunity.description}</p>
                                </div>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Investment Value</p>
                                    <p className="text-2xl font-bold text-primary">{opportunity.value}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Countries</p>
                                    <p className="text-2xl font-bold">{opportunity.countries.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Interested Investors</p>
                                    <p className="text-2xl font-bold">{opportunity.investors}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">AI Score</p>
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        <span className="text-2xl font-bold">{opportunity.aiScore}</span>
                                        <span className="text-muted-foreground">/100</span>
                                    </div>
                                </div>
                            </div>

                            {/* Readiness Bar */}
                            <div className="mt-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">Project Readiness</span>
                                    <span className="text-sm text-muted-foreground">{opportunity.readiness}%</span>
                                </div>
                                <Progress value={opportunity.readiness} className="h-2" />
                            </div>

                            {/* Gap Warning */}
                            <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <p className="text-sm">
                                    <span className="font-semibold text-yellow-600">Financing Gap:</span>{" "}
                                    {opportunity.gap}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions Sidebar */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <Target className="w-5 h-5 text-primary" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full gap-2 justify-start" variant="outline">
                                <FileText className="w-4 h-4" />
                                Download Teaser
                            </Button>
                            <Button className="w-full gap-2 justify-start" variant="outline">
                                <Calendar className="w-4 h-4" />
                                Schedule Meeting
                            </Button>
                            <Button className="w-full gap-2 justify-start" variant="outline">
                                <MessageSquare className="w-4 h-4" />
                                Contact Project Team
                            </Button>
                            <Button className="w-full gap-2 justify-start bg-gradient-to-r from-primary to-accent text-white">
                                <DollarSign className="w-4 h-4" />
                                Express Interest
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Tabs Section */}
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="technical">Technical</TabsTrigger>
                        <TabsTrigger value="impact">Impact</TabsTrigger>
                        <TabsTrigger value="agents" className="gap-2">
                            <Brain className="w-4 h-4" />
                            AI Agents
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Project Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                                    {opportunity.details.overview}
                                </p>
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Timeline</p>
                                        <p className="text-lg">{opportunity.details.timeline}</p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-muted/50">
                                        <p className="text-sm font-medium mb-1">Project Sponsors</p>
                                        <p className="text-lg">{opportunity.details.sponsors.join(", ")}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Countries */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Participating Countries
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {opportunity.countries.map((country) => (
                                        <Badge key={country} variant="outline" className="py-2 px-3">
                                            {country}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="technical" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Technical Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {Object.entries(opportunity.details.technicalDetails).map(([key, value]) => (
                                        <div key={key} className="p-4 rounded-xl bg-muted/50">
                                            <p className="text-sm text-muted-foreground capitalize mb-1">
                                                {key.replace(/([A-Z])/g, " $1").trim()}
                                            </p>
                                            <p className="font-medium">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="impact" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="w-5 h-5 text-primary" />
                                    Expected Impact
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {opportunity.details.impact.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Shield className="w-4 h-4 text-primary" />
                                            </div>
                                            <p className="font-medium">{item}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* AI Agents Tab */}
                    <TabsContent value="agents" className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                                    <Brain className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-medium">AI-Powered Analysis</p>
                                    <p className="text-sm text-muted-foreground">
                                        Our specialized agents can help you analyze this opportunity, build financial models, and connect
                                        with stakeholders.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {agents.map((agent, index) => (
                                <motion.div
                                    key={agent.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="h-full hover:border-primary/50 transition-colors group">
                                        <CardHeader>
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-3",
                                                    agent.gradient
                                                )}
                                            >
                                                <agent.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <CardTitle className="text-lg">{agent.name}</CardTitle>
                                            <CardDescription>{agent.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2 mb-6">
                                                {agent.capabilities.map((cap) => (
                                                    <div key={cap} className="flex items-center gap-2 text-sm">
                                                        <Sparkles className="w-3 h-3 text-primary" />
                                                        <span>{cap}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <Link
                                                href={`/dashboard/intelligence/opportunities/${opportunityId}/${agent.id}`}
                                            >
                                                <Button
                                                    className={cn(
                                                        "w-full gap-2 bg-gradient-to-r text-white",
                                                        agent.gradient
                                                    )}
                                                >
                                                    Launch Agent
                                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
