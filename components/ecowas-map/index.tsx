'use client'

import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

// Dynamically import MapClient to avoid SSR issues with Leaflet
const MapClient = dynamic(() => import('./map-client'), {
    ssr: false,
    loading: () => (
        <div className="flex h-full w-full items-center justify-center bg-muted/20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading Map...</span>
        </div>
    ),
})

export default function EcowasMap({ selectedSector }: { selectedSector?: string }) {
    return (
        <Card className="w-full h-[600px] overflow-hidden border shadow-sm">
            <CardContent className="p-0 h-full relative">
                <MapClient selectedSector={selectedSector} />
            </CardContent>
        </Card>
    )
}

// Re-export grid component for easy access
export { default as OpportunitiesGrid } from './opportunities-grid'
