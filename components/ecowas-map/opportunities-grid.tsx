'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { PROJECTS } from './mock-data'
import { Project, Sector, ProjectStatus } from './types'
import { ProjectDialog } from './project-dialog'
import { MapPin, TrendingUp, Search, Filter, Grid3X3, LayoutGrid } from 'lucide-react'

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

interface OpportunitiesGridProps {
    className?: string
}

export default function OpportunitiesGrid({ className }: OpportunitiesGridProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [sectorFilter, setSectorFilter] = useState<string>('all')
    const [statusFilter, setStatusFilter] = useState<string>('all')

    // Filter projects
    const filteredProjects = PROJECTS.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.country.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesSector = sectorFilter === 'all' || project.sector === sectorFilter
        const matchesStatus = statusFilter === 'all' || project.status === statusFilter
        return matchesSearch && matchesSector && matchesStatus
    })

    const clearFilters = () => {
        setSearchQuery('')
        setSectorFilter('all')
        setStatusFilter('all')
    }

    const hasActiveFilters = searchQuery || sectorFilter !== 'all' || statusFilter !== 'all'

    return (
        <div className={className}>
            {/* Filters Section */}
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center flex-1">
                            {/* Search */}
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search opportunities..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>

                            {/* Sector Filter */}
                            <Select value={sectorFilter} onValueChange={setSectorFilter}>
                                <SelectTrigger className="w-full md:w-[220px]">
                                    <SelectValue placeholder="All Sectors" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Sectors</SelectItem>
                                    {SECTORS.map(sector => (
                                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[160px]">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    {STATUSES.map(status => (
                                        <SelectItem key={status} value={status}>{status}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                                Clear filters
                            </Button>
                        )}
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> of {PROJECTS.length} opportunities
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => (
                    <Card
                        key={project.id}
                        className="cursor-pointer transition-all hover:shadow-md hover:border-primary/20"
                        onClick={() => setSelectedProject(project)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-base font-semibold leading-tight line-clamp-2">
                                    {project.name}
                                </CardTitle>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3" />
                                <span className="line-clamp-1">{project.country}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                <Badge variant="outline" className={`text-xs ${SECTOR_COLORS[project.sector]}`}>
                                    {project.sector}
                                </Badge>
                                <Badge variant="outline" className={`text-xs ${STATUS_COLORS[project.status]}`}>
                                    {project.status}
                                </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                {project.details}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t">
                                <div className="text-xs">
                                    <span className="text-muted-foreground">Investment:</span>
                                    <span className="font-medium ml-1">{project.investmentRange}</span>
                                </div>
                                <div className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                                    <TrendingUp className="h-3 w-3" />
                                    {project.roi}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Filter className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-semibold mb-1">No opportunities found</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                        Try adjusting your search or filter criteria
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                        Clear all filters
                    </Button>
                </div>
            )}

            {/* Project Dialog */}
            <ProjectDialog
                project={selectedProject}
                open={!!selectedProject}
                onOpenChange={(open) => !open && setSelectedProject(null)}
            />
        </div>
    )
}
