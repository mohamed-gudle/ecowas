'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, TrendingUp, DollarSign, Info, ArrowRight } from 'lucide-react'
import { Project, ProjectStatus } from './types'

interface ProjectDialogProps {
    project: Project | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

const StatusBadge = ({ status }: { status: ProjectStatus }) => {
    const styles: Record<ProjectStatus, string> = {
        'Planning': 'bg-blue-100 text-blue-800 border-blue-200',
        'Development': 'bg-amber-100 text-amber-800 border-amber-200',
        'Operational': 'bg-green-100 text-green-800 border-green-200',
        'Expansion': 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
    if (!project) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <div className="flex items-start justify-between gap-4 pr-6">
                        <DialogTitle className="text-lg leading-tight">{project.name}</DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                        <MapPin className="h-3.5 w-3.5" /> {project.country}
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Status</span>
                        <StatusBadge status={project.status} />
                    </div>

                    <div className="space-y-1.5">
                        <h4 className="text-sm font-medium">Project Details</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.details}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-muted/50 border">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <DollarSign className="h-3 w-3" /> Investment Range
                            </span>
                            <span className="font-semibold text-sm">{project.investmentRange}</span>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                            <span className="text-xs text-emerald-600 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> Expected ROI
                            </span>
                            <span className="font-semibold text-sm text-emerald-700">{project.roi}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                        <Info className="h-3 w-3" />
                        <span>Sector: <span className="font-medium text-foreground">{project.sector}</span></span>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
                    <Button className="gap-1">
                        View Details <ArrowRight className="h-4 w-4" />
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
