export type Sector =
    | 'Infrastructure & Construction'
    | 'Oil & Gas'
    | 'Renewable Energy'
    | 'Mining & Minerals'
    | 'Manufacturing & Industry'
    | 'Power & Energy Infrastructure'

export type ProjectStatus = 'Planning' | 'Development' | 'Operational' | 'Expansion'

export interface Project {
    id: string
    name: string
    country: string
    location: [number, number] // [lat, lng]
    sector: Sector
    status: ProjectStatus
    details: string
    investmentRange: string
    roi: string
}
