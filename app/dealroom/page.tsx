"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  TrendingUp,
  Briefcase,
  ArrowRight,
  MapPin,
  Zap,
  Leaf,
  Factory,
  Droplets,
  Sun,
  Wind,
  Star,
  Eye,
  MessageSquare,
  Calendar,
  Users,
  Target,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const featuredProjects = [
  {
    id: "1",
    title: "Sahel Solar Mega Farm",
    sector: "Renewable Energy",
    country: "Senegal",
    flag: "🇸🇳",
    investmentSize: "$150M",
    stage: "Financing",
    readinessScore: 92,
    description: "500MW solar photovoltaic installation powering 2 million homes across the Sahel region.",
    developer: "Africa Solar Partners",
    icon: Sun,
    gradient: "from-amber-500 to-orange-500",
    returns: "18-22% IRR",
    timeline: "36 months",
  },
  {
    id: "2",
    title: "Lagos Smart Grid Modernization",
    sector: "Energy Infrastructure",
    country: "Nigeria",
    flag: "🇳🇬",
    investmentSize: "$280M",
    stage: "Ready",
    readinessScore: 88,
    description: "Comprehensive grid modernization with smart meters and distribution automation.",
    developer: "PowerGrid Africa",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    returns: "15-18% IRR",
    timeline: "48 months",
  },
  {
    id: "3",
    title: "Ghana Coastal Wind Farm",
    sector: "Renewable Energy",
    country: "Ghana",
    flag: "🇬🇭",
    investmentSize: "$95M",
    stage: "Feasibility",
    readinessScore: 75,
    description: "250MW offshore wind installation leveraging Ghana's coastal wind corridor.",
    developer: "West Wind Energy",
    icon: Wind,
    gradient: "from-teal-500 to-emerald-500",
    returns: "20-24% IRR",
    timeline: "42 months",
  },
]

const sectors = [
  { name: "All Sectors", count: 156, icon: Briefcase },
  { name: "Solar Energy", count: 42, icon: Sun },
  { name: "Wind Energy", count: 28, icon: Wind },
  { name: "Hydro Power", count: 18, icon: Droplets },
  { name: "Green Manufacturing", count: 35, icon: Factory },
  { name: "Sustainable Agriculture", count: 33, icon: Leaf },
]

const topInvestors = [
  {
    id: "1",
    name: "Africa Infrastructure Fund",
    type: "Development Finance",
    aum: "$4.2B",
    focus: ["Energy", "Transport"],
    avatar: "/finance-fund-logo.jpg",
    verified: true,
  },
  {
    id: "2",
    name: "Green Climate Partners",
    type: "Climate Fund",
    aum: "$2.8B",
    focus: ["Renewables", "Agriculture"],
    avatar: "/climate-fund-green.jpg",
    verified: true,
  },
  {
    id: "3",
    name: "AfDB Climate Division",
    type: "DFI",
    aum: "$15B",
    focus: ["Infrastructure", "Energy"],
    avatar: "/african-development-bank.jpg",
    verified: true,
  },
]

const upcomingMeetings = [
  {
    id: "1",
    title: "Investor Pitch: Sahel Solar",
    type: "Virtual",
    date: "Today, 14:00",
    attendees: 8,
    status: "upcoming",
  },
  {
    id: "2",
    title: "Due Diligence Review",
    type: "In-Person",
    date: "Tomorrow, 10:00",
    attendees: 5,
    status: "confirmed",
  },
]

const stageColors: Record<string, string> = {
  Pipeline: "bg-slate-500",
  Concept: "bg-blue-500",
  Feasibility: "bg-amber-500",
  Ready: "bg-emerald-500",
  Financing: "bg-primary",
  Funded: "bg-secondary",
}

export default function DealroomDiscovery() {
  const [selectedSector, setSelectedSector] = useState("All Sectors")

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-primary" />
        <div className="absolute inset-0 bg-[url('/african-cityscape-infrastructure.jpg')] opacity-20 bg-cover bg-center" />
        <div className="relative p-8 text-white">
          <div className="max-w-2xl">
            <Badge className="bg-white/20 text-white mb-4">ECOWAS Investment Platform</Badge>
            <h1 className="text-4xl font-bold mb-4">Virtual Dealroom</h1>
            <p className="text-white/80 text-lg mb-6">
              Connect with verified investors, showcase bankable projects, and secure funding for Africa's climate-smart
              future. Over $2.4B in deal flow awaits.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-secondary hover:bg-white/90 gap-2">
                <Briefcase className="w-5 h-5" />
                Submit Your Project
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Browse Opportunities
              </Button>
            </div>
          </div>
          {/* Stats overlay */}
          <div className="absolute bottom-8 right-8 hidden xl:flex gap-6">
            {[
              { label: "Active Projects", value: "156" },
              { label: "Verified Investors", value: "89" },
              { label: "Deal Flow", value: "$2.4B" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Projects Viewed", value: "24", change: "+8 today", icon: Eye, color: "text-primary" },
          { label: "Meetings Scheduled", value: "6", change: "2 upcoming", icon: Calendar, color: "text-accent" },
          { label: "Interest Received", value: "12", change: "+3 new", icon: Star, color: "text-amber-500" },
          { label: "Pipeline Value", value: "$45M", change: "Your projects", icon: Target, color: "text-emerald-500" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  </div>
                  <div className={cn("p-3 rounded-xl bg-muted", stat.color)}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Featured Projects - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Featured Investment Opportunities</h2>
            <Link href="/dealroom/projects">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Sector Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sectors.map((sector) => (
              <Button
                key={sector.name}
                variant={selectedSector === sector.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSector(sector.name)}
                className={cn("gap-2 shrink-0", selectedSector !== sector.name && "bg-transparent")}
              >
                <sector.icon className="w-4 h-4" />
                {sector.name}
                <Badge variant="secondary" className="ml-1">
                  {sector.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Project Cards */}
          <div className="space-y-4">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Visual Side */}
                      <div
                        className={cn(
                          "w-full md:w-48 h-32 md:h-auto bg-gradient-to-br flex items-center justify-center shrink-0",
                          project.gradient,
                        )}
                      >
                        <project.icon className="w-16 h-16 text-white/80" />
                      </div>

                      {/* Content Side */}
                      <div className="flex-1 p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={cn(stageColors[project.stage], "text-white")}>{project.stage}</Badge>
                              <Badge variant="outline">{project.sector}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3" />
                              {project.flag} {project.country} • {project.developer}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">{project.investmentSize}</p>
                            <p className="text-xs text-muted-foreground">Investment Sought</p>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <p className="text-muted-foreground">Expected Returns</p>
                              <p className="font-medium text-emerald-600">{project.returns}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Timeline</p>
                              <p className="font-medium">{project.timeline}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Readiness</p>
                              <div className="flex items-center gap-2">
                                <Progress value={project.readinessScore} className="w-16 h-2" />
                                <span className="font-medium">{project.readinessScore}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                              <Star className="w-4 h-4" />
                              Save
                            </Button>
                            <Button size="sm" className="gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Investors */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Active Investors</CardTitle>
                <Link href="/dealroom/investors">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {topInvestors.map((investor) => (
                <div
                  key={investor.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted cursor-pointer transition-colors"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={investor.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{investor.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium truncate">{investor.name}</p>
                      {investor.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{investor.type}</p>
                    <p className="text-xs text-emerald-600 font-medium">AUM: {investor.aum}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Meetings</CardTitle>
                <Link href="/dealroom/meetings">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 rounded-xl border bg-gradient-to-r from-primary/5 to-accent/5 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{meeting.title}</p>
                      <p className="text-sm text-muted-foreground">{meeting.date}</p>
                    </div>
                    <Badge variant={meeting.type === "Virtual" ? "secondary" : "outline"}>{meeting.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {meeting.attendees} attendees
                    </div>
                    <Button size="sm">Join</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Market Insights */}
          <Card className="bg-gradient-to-br from-secondary/5 to-primary/5 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-secondary" />
                Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Solar Projects</span>
                  <span className="font-medium text-emerald-600">+24%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Wind Energy</span>
                  <span className="font-medium text-emerald-600">+18%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Green Agriculture</span>
                  <span className="font-medium text-emerald-600">+32%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <p className="text-xs text-muted-foreground">Investment interest trend vs last quarter</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
