"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  Calendar,
  TrendingUp,
  Star,
  MessageSquare,
  Eye,
  Download,
  Share2,
  Sun,
  Wind,
  Droplets,
  Factory,
  Leaf,
  Zap,
  Building2,
  FileText,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const allProjects = [
  {
    id: "1",
    title: "Sahel Solar Mega Farm",
    sector: "Renewable Energy",
    subsector: "Solar PV",
    country: "Senegal",
    flag: "🇸🇳",
    region: "West Africa",
    investmentSize: 150000000,
    investmentDisplay: "$150M",
    stage: "Financing",
    readinessScore: 92,
    description:
      "500MW solar photovoltaic installation powering 2 million homes across the Sahel region with cutting-edge bifacial panel technology.",
    developer: "Africa Solar Partners",
    developerLogo: "/solar-company-logo.png",
    icon: Sun,
    gradient: "from-amber-500 to-orange-500",
    returns: "18-22%",
    timeline: "36 months",
    jobsCreated: 2500,
    co2Reduction: "450,000 tons/year",
    sdgAlignment: ["SDG 7", "SDG 13", "SDG 8"],
    documents: 12,
    lastUpdated: "2024-03-10",
    views: 456,
    interests: 23,
    featured: true,
  },
  {
    id: "2",
    title: "Lagos Smart Grid Modernization",
    sector: "Energy Infrastructure",
    subsector: "Grid Technology",
    country: "Nigeria",
    flag: "🇳🇬",
    region: "West Africa",
    investmentSize: 280000000,
    investmentDisplay: "$280M",
    stage: "Ready",
    readinessScore: 88,
    description:
      "Comprehensive grid modernization with smart meters, distribution automation, and renewable integration for 15 million customers.",
    developer: "PowerGrid Africa",
    developerLogo: "/power-grid-company.jpg",
    icon: Zap,
    gradient: "from-blue-500 to-cyan-500",
    returns: "15-18%",
    timeline: "48 months",
    jobsCreated: 8000,
    co2Reduction: "280,000 tons/year",
    sdgAlignment: ["SDG 7", "SDG 9", "SDG 11"],
    documents: 18,
    lastUpdated: "2024-03-08",
    views: 389,
    interests: 18,
    featured: true,
  },
  {
    id: "3",
    title: "Ghana Coastal Wind Farm",
    sector: "Renewable Energy",
    subsector: "Wind",
    country: "Ghana",
    flag: "🇬🇭",
    region: "West Africa",
    investmentSize: 95000000,
    investmentDisplay: "$95M",
    stage: "Feasibility",
    readinessScore: 75,
    description:
      "250MW offshore wind installation leveraging Ghana's coastal wind corridor with local manufacturing partnership.",
    developer: "West Wind Energy",
    developerLogo: "/wind-energy-company.jpg",
    icon: Wind,
    gradient: "from-teal-500 to-emerald-500",
    returns: "20-24%",
    timeline: "42 months",
    jobsCreated: 1200,
    co2Reduction: "320,000 tons/year",
    sdgAlignment: ["SDG 7", "SDG 13", "SDG 14"],
    documents: 8,
    lastUpdated: "2024-03-12",
    views: 267,
    interests: 15,
    featured: false,
  },
  {
    id: "4",
    title: "Niger Basin Hydroelectric Expansion",
    sector: "Renewable Energy",
    subsector: "Hydropower",
    country: "Mali",
    flag: "🇲🇱",
    region: "West Africa",
    investmentSize: 420000000,
    investmentDisplay: "$420M",
    stage: "Concept",
    readinessScore: 45,
    description:
      "Multi-purpose dam project providing 350MW clean energy and irrigation for 100,000 hectares of agricultural land.",
    developer: "Sahel Hydro Development",
    developerLogo: "/hydro-power-company.jpg",
    icon: Droplets,
    gradient: "from-cyan-500 to-blue-600",
    returns: "12-15%",
    timeline: "60 months",
    jobsCreated: 15000,
    co2Reduction: "580,000 tons/year",
    sdgAlignment: ["SDG 6", "SDG 7", "SDG 2"],
    documents: 5,
    lastUpdated: "2024-03-05",
    views: 198,
    interests: 8,
    featured: false,
  },
  {
    id: "5",
    title: "Cote d'Ivoire Green Industrial Park",
    sector: "Green Manufacturing",
    subsector: "Industrial",
    country: "Cote d'Ivoire",
    flag: "🇨🇮",
    region: "West Africa",
    investmentSize: 180000000,
    investmentDisplay: "$180M",
    stage: "Ready",
    readinessScore: 85,
    description:
      "100-hectare eco-industrial park with shared renewable energy infrastructure and circular economy principles.",
    developer: "Abidjan Green Zone Ltd",
    developerLogo: "/industrial-park.png",
    icon: Factory,
    gradient: "from-green-500 to-emerald-600",
    returns: "16-20%",
    timeline: "30 months",
    jobsCreated: 12000,
    co2Reduction: "150,000 tons/year",
    sdgAlignment: ["SDG 9", "SDG 12", "SDG 8"],
    documents: 14,
    lastUpdated: "2024-03-11",
    views: 312,
    interests: 21,
    featured: true,
  },
  {
    id: "6",
    title: "Burkina Faso Sustainable Agriculture Hub",
    sector: "Agriculture",
    subsector: "AgriTech",
    country: "Burkina Faso",
    flag: "🇧🇫",
    region: "West Africa",
    investmentSize: 45000000,
    investmentDisplay: "$45M",
    stage: "Financing",
    readinessScore: 78,
    description:
      "Climate-smart agriculture center with solar-powered irrigation, cold storage, and digital marketplace for 50,000 farmers.",
    developer: "Sahel Agri Solutions",
    developerLogo: "/agriculture-company.jpg",
    icon: Leaf,
    gradient: "from-lime-500 to-green-600",
    returns: "22-26%",
    timeline: "24 months",
    jobsCreated: 5000,
    co2Reduction: "85,000 tons/year",
    sdgAlignment: ["SDG 2", "SDG 13", "SDG 1"],
    documents: 10,
    lastUpdated: "2024-03-09",
    views: 234,
    interests: 16,
    featured: false,
  },
]

const stages = ["All Stages", "Pipeline", "Concept", "Feasibility", "Ready", "Financing", "Funded"]
const sectors = [
  "All Sectors",
  "Renewable Energy",
  "Energy Infrastructure",
  "Green Manufacturing",
  "Agriculture",
  "Transport",
]
const countries = [
  "All Countries",
  "Nigeria",
  "Ghana",
  "Senegal",
  "Cote d'Ivoire",
  "Mali",
  "Burkina Faso",
  "Niger",
  "Togo",
  "Benin",
]

const stageColors: Record<string, string> = {
  Pipeline: "bg-slate-500",
  Concept: "bg-blue-500",
  Feasibility: "bg-amber-500",
  Ready: "bg-emerald-500",
  Financing: "bg-primary",
  Funded: "bg-secondary",
}

export default function ProjectsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStage, setSelectedStage] = useState("All Stages")
  const [selectedSector, setSelectedSector] = useState("All Sectors")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [investmentRange, setInvestmentRange] = useState([0, 500])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof allProjects)[0] | null>(null)
  const [savedProjects, setSavedProjects] = useState<string[]>([])

  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = selectedStage === "All Stages" || project.stage === selectedStage
    const matchesSector = selectedSector === "All Sectors" || project.sector === selectedSector
    const matchesCountry = selectedCountry === "All Countries" || project.country === selectedCountry
    const matchesInvestment =
      project.investmentSize / 1000000 >= investmentRange[0] && project.investmentSize / 1000000 <= investmentRange[1]
    return matchesSearch && matchesStage && matchesSector && matchesCountry && matchesInvestment
  })

  const toggleSaveProject = (id: string) => {
    setSavedProjects((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Investment Projects</h1>
          <p className="text-muted-foreground">Browse {allProjects.length} bankable climate projects across ECOWAS</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export List
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Submit Project
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects by name, description, or developer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Projects</SheetTitle>
              </SheetHeader>
              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Investment Size ($M)</label>
                  <Slider
                    value={investmentRange}
                    onValueChange={setInvestmentRange}
                    max={500}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${investmentRange[0]}M</span>
                    <span>${investmentRange[1]}M</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Readiness Score</label>
                  <div className="space-y-2">
                    {["90%+", "70-89%", "50-69%", "Below 50%"].map((range) => (
                      <div key={range} className="flex items-center gap-2">
                        <Checkbox id={range} />
                        <label htmlFor={range} className="text-sm">
                          {range}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">SDG Alignment</label>
                  <div className="flex flex-wrap gap-2">
                    {["SDG 7", "SDG 13", "SDG 9", "SDG 8", "SDG 2"].map((sdg) => (
                      <Badge
                        key={sdg}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {sdg}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-2">
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1 rounded-lg border p-1">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "rounded-md p-2 transition-colors",
                view === "grid" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "rounded-md p-2 transition-colors",
                view === "list" ? "bg-primary text-primary-foreground" : "hover:bg-muted",
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {allProjects.length} projects
        </p>
        <Select defaultValue="relevance">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Most Relevant</SelectItem>
            <SelectItem value="investment-high">Investment: High to Low</SelectItem>
            <SelectItem value="investment-low">Investment: Low to High</SelectItem>
            <SelectItem value="readiness">Readiness Score</SelectItem>
            <SelectItem value="recent">Recently Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Display */}
      <AnimatePresence mode="wait">
        {view === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Header with gradient */}
                  <div className={cn("h-32 bg-gradient-to-br relative", project.gradient)}>
                    <project.icon className="absolute bottom-4 right-4 w-16 h-16 text-white/30" />
                    {project.featured && (
                      <Badge className="absolute top-3 left-3 bg-white text-foreground">Featured</Badge>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSaveProject(project.id)
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    >
                      <Star
                        className={cn(
                          "w-4 h-4",
                          savedProjects.includes(project.id) ? "fill-amber-400 text-amber-400" : "text-white",
                        )}
                      />
                    </button>
                  </div>

                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={cn(stageColors[project.stage], "text-white text-xs")}>
                            {project.stage}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />
                      {project.flag} {project.country} • {project.sector}
                    </p>

                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{project.description}</p>

                    <div className="space-y-3 pt-3 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Investment Sought</span>
                        <span className="font-bold text-primary text-lg">{project.investmentDisplay}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Readiness</span>
                        <div className="flex items-center gap-2">
                          <Progress value={project.readinessScore} className="w-20 h-2" />
                          <span className="font-medium">{project.readinessScore}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Expected IRR</span>
                        <span className="font-medium text-emerald-600">{project.returns}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {project.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" /> {project.interests}
                        </span>
                      </div>
                      <span>{project.documents} documents</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-0">
                    <div className="flex items-stretch">
                      <div className={cn("w-2 shrink-0 bg-gradient-to-b", project.gradient)} />
                      <div className="flex-1 p-4 flex items-center gap-6">
                        <div
                          className={cn(
                            "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shrink-0",
                            project.gradient,
                          )}
                        >
                          <project.icon className="w-7 h-7 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge className={cn(stageColors[project.stage], "text-white text-xs")}>
                              {project.stage}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {project.sector}
                            </Badge>
                            {project.featured && (
                              <Badge variant="secondary" className="text-xs">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-semibold truncate">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {project.flag} {project.country} • {project.developer}
                          </p>
                        </div>

                        <div className="hidden lg:flex items-center gap-8 shrink-0">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Investment</p>
                            <p className="font-bold text-primary">{project.investmentDisplay}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Returns</p>
                            <p className="font-medium text-emerald-600">{project.returns}</p>
                          </div>
                          <div className="text-center w-24">
                            <p className="text-xs text-muted-foreground mb-1">Readiness</p>
                            <Progress value={project.readinessScore} className="h-2" />
                            <p className="text-xs font-medium mt-1">{project.readinessScore}%</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleSaveProject(project.id)
                            }}
                          >
                            <Star
                              className={cn(
                                "w-4 h-4",
                                savedProjects.includes(project.id) ? "fill-amber-400 text-amber-400" : "",
                              )}
                            />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Contact
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {selectedProject && (
            <>
              <DialogHeader className="shrink-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={cn(stageColors[selectedProject.stage], "text-white")}>
                        {selectedProject.stage}
                      </Badge>
                      <Badge variant="outline">{selectedProject.sector}</Badge>
                    </div>
                    <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4" />
                      {selectedProject.flag} {selectedProject.country} • {selectedProject.developer}
                    </DialogDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{selectedProject.investmentDisplay}</p>
                    <p className="text-sm text-muted-foreground">Investment Sought</p>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="flex-1">
                <Tabs defaultValue="overview" className="mt-4">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="impact">Impact</TabsTrigger>
                    <TabsTrigger value="documents">Documents ({selectedProject.documents})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6 mt-4">
                    <div
                      className={cn(
                        "h-48 rounded-xl bg-gradient-to-br flex items-center justify-center",
                        selectedProject.gradient,
                      )}
                    >
                      <selectedProject.icon className="w-24 h-24 text-white/50" />
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Project Description</h4>
                      <p className="text-muted-foreground">{selectedProject.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <TrendingUp className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                          <p className="text-2xl font-bold text-emerald-600">{selectedProject.returns}</p>
                          <p className="text-xs text-muted-foreground">Expected IRR</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Calendar className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <p className="text-2xl font-bold">{selectedProject.timeline}</p>
                          <p className="text-xs text-muted-foreground">Timeline</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Users className="w-6 h-6 mx-auto mb-2 text-accent" />
                          <p className="text-2xl font-bold">{selectedProject.jobsCreated.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Jobs Created</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Leaf className="w-6 h-6 mx-auto mb-2 text-green-500" />
                          <p className="text-lg font-bold">{selectedProject.co2Reduction}</p>
                          <p className="text-xs text-muted-foreground">CO2 Reduction</p>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Readiness Assessment</h4>
                      <div className="flex items-center gap-4">
                        <Progress value={selectedProject.readinessScore} className="flex-1 h-3" />
                        <span className="text-2xl font-bold text-primary">{selectedProject.readinessScore}%</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">SDG Alignment</h4>
                      <div className="flex gap-2">
                        {selectedProject.sdgAlignment.map((sdg) => (
                          <Badge key={sdg} variant="outline" className="text-sm">
                            {sdg}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="financials" className="space-y-6 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Financial Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg bg-muted">
                            <p className="text-sm text-muted-foreground">Total Investment</p>
                            <p className="text-2xl font-bold">{selectedProject.investmentDisplay}</p>
                          </div>
                          <div className="p-4 rounded-lg bg-muted">
                            <p className="text-sm text-muted-foreground">Expected IRR</p>
                            <p className="text-2xl font-bold text-emerald-600">{selectedProject.returns}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Detailed financial projections, cash flow models, and sensitivity analysis available in the
                          documents section.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="impact" className="space-y-6 mt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <Users className="w-8 h-8 text-primary mb-3" />
                          <p className="text-3xl font-bold">{selectedProject.jobsCreated.toLocaleString()}</p>
                          <p className="text-muted-foreground">Direct & Indirect Jobs</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <Leaf className="w-8 h-8 text-green-500 mb-3" />
                          <p className="text-3xl font-bold">{selectedProject.co2Reduction}</p>
                          <p className="text-muted-foreground">Annual CO2 Reduction</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="documents" className="space-y-4 mt-4">
                    {[
                      { name: "Executive Summary", type: "PDF", size: "2.4 MB" },
                      { name: "Financial Model", type: "XLSX", size: "1.8 MB" },
                      { name: "Technical Feasibility Study", type: "PDF", size: "15.2 MB" },
                      { name: "Environmental Impact Assessment", type: "PDF", size: "8.7 MB" },
                    ].map((doc) => (
                      <div key={doc.name} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </ScrollArea>

              <DialogFooter className="shrink-0 mt-4 pt-4 border-t">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Star className="w-4 h-4" />
                  Save to Pipeline
                </Button>
                <Button className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Request Meeting
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Building2 className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedStage("All Stages")
              setSelectedSector("All Sectors")
              setSelectedCountry("All Countries")
              setInvestmentRange([0, 500])
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  )
}
