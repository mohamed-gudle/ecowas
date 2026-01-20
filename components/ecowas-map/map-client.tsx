'use client'

import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Project, Sector } from './types'
import { PROJECTS } from './mock-data'
import { ProjectDialog } from './project-dialog'
import { getSectorIcon } from './use-custom-markers'
import L from 'leaflet'

interface MapClientProps {
    selectedSector?: string
}

export default function MapClient({ selectedSector }: MapClientProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    // Filter projects based on selected sector
    const filteredProjects = selectedSector && selectedSector !== 'all'
        ? PROJECTS.filter(project => project.sector === selectedSector)
        : PROJECTS

    // Fix for Leaflet default icon images in Next.js
    useEffect(() => {
        // @ts-ignore
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        })
    }, [])

    return (
        <>
            <style jsx global>{`
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .leaflet-popup-content {
          margin: 8px 12px;
        }
      `}</style>

            <MapContainer
                center={[9.0820, -2.0000]}
                zoom={5}
                scrollWheelZoom={true}
                className="h-full w-full"
                style={{ height: '100%', width: '100%', zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {filteredProjects.map((project) => (
                    <Marker
                        key={project.id}
                        position={project.location}
                        icon={getSectorIcon(project.sector)}
                        eventHandlers={{
                            click: () => setSelectedProject(project),
                        }}
                    >
                        <Popup closeButton={false} offset={[0, -8]}>
                            <div className="text-center py-1 px-2">
                                <p className="font-semibold text-sm mb-0.5">{project.name}</p>
                                <p className="text-xs text-muted-foreground">{project.sector}</p>
                                <p className="text-xs text-emerald-600 font-medium mt-1">ROI: {project.roi}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <ProjectDialog
                project={selectedProject}
                open={!!selectedProject}
                onOpenChange={(open) => !open && setSelectedProject(null)}
            />
        </>
    )
}
