"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  TrendingUp,
  ArrowRight
} from "lucide-react"
import EcowasMap from "@/components/ecowas-map"
import { PROJECTS } from "@/components/ecowas-map/mock-data"
import { Sector, ProjectStatus } from "@/components/ecowas-map/types"
import { ProjectDialog } from "@/components/ecowas-map/project-dialog"
import type { Project } from "@/components/ecowas-map/types"

const SECTORS: Sector[] = [
  'Infrastructure & Construction',
  'Oil & Gas',
  'Renewable Energy',
  'Mining & Minerals',
  'Manufacturing & Industry',
  'Power & Energy Infrastructure'
]

const STATUSES: ProjectStatus[] = ['Planning', 'Development', 'Operational', 'Expansion']

const SECTOR_COLORS: Record<Sector, string> = {
  'Infrastructure & Construction': 'bg-orange-100 text-orange-800 border-orange-200',
  'Oil & Gas': 'bg-red-100 text-red-800 border-red-200',
  'Renewable Energy': 'bg-green-100 text-green-800 border-green-200',
  'Mining & Minerals': 'bg-purple-100 text-purple-800 border-purple-200',
  'Manufacturing & Industry': 'bg-blue-100 text-blue-800 border-blue-200',
  'Power & Energy Infrastructure': 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

const STATUS_COLORS: Record<ProjectStatus, string> = {
  'Planning': 'bg-blue-100 text-blue-800 border-blue-200',
  'Development': 'bg-amber-100 text-amber-800 border-amber-200',
  'Operational': 'bg-green-100 text-green-800 border-green-200',
  'Expansion': 'bg-yellow-100 text-yellow-800 border-yellow-200',
}

export default function CountriesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"map" | "grid">("map")
  const [selectedSector, setSelectedSector] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = PROJECTS.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.sector.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSector = selectedSector === "all" || project.sector === selectedSector
    const matchesStatus = selectedStatus === "all" || project.status === selectedStatus

    return matchesSearch && matchesSector && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Country Intelligence & Investment Opportunities</h1>
        <p className="text-muted-foreground">
          Track {PROJECTS.length} verified investment opportunities across ECOWAS member states
        </p>
      </div>

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "map" | "grid")}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
          <TabsList>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap items-center gap-3">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {SECTORS.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="map" className="space-y-4">
          <EcowasMap
            selectedSector={selectedSector !== "all" ? selectedSector : undefined}
          />
        </TabsContent>

        <TabsContent value="grid" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <span className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> of {PROJECTS.length} opportunities
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card
                  className="hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-base font-semibold leading-tight line-clamp-2 mb-2">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="line-clamp-1">{project.country}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={`text-xs ${SECTOR_COLORS[project.sector]}`}>
                        {project.sector}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${STATUS_COLORS[project.status]}`}>
                        {project.status}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.details}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="text-xs">
                        <span className="text-muted-foreground">Investment:</span>
                        <span className="font-semibold ml-1">{project.investmentRange}</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                        <TrendingUp className="h-3 w-3" />
                        {project.roi}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-semibold mb-1">No opportunities found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSector("all")
                  setSelectedStatus("all")
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Project Details Dialog */}
      <ProjectDialog
        project={selectedProject}
        open={!!selectedProject}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </div>
  )
}
