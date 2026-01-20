'use client'

import L from 'leaflet'
import { Sector } from './types'

// Map sectors to colors - using project theme colors
const SECTOR_COLORS: Record<Sector, string> = {
  'Infrastructure & Construction': '#f97316', // Orange
  'Oil & Gas': '#dc2626', // Red
  'Renewable Energy': '#22c55e', // Green
  'Mining & Minerals': '#a855f7', // Purple
  'Manufacturing & Industry': '#3b82f6', // Blue
  'Power & Energy Infrastructure': '#eab308', // Yellow
}

// SVG Icons as pure strings - lightweight and build-safe
const ICONS: Record<string, string> = {
  default: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
  'Infrastructure & Construction': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
  'Oil & Gas': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18V8"/><path d="M14 18V4"/><path d="M18 18v-3"/></svg>`,
  'Renewable Energy': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  'Mining & Minerals': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m14 4-5 8h6l-5 8"/></svg>`,
  'Manufacturing & Industry': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/></svg>`,
  'Power & Energy Infrastructure': `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
}

export const getSectorIcon = (sector: Sector) => {
  const color = SECTOR_COLORS[sector] || '#3b82f6'
  const iconSvg = ICONS[sector] || ICONS['default']

  const html = `
    <div style="
      background-color: ${color};
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    ">
      ${iconSvg}
    </div>
  `

  return L.divIcon({
    html: html,
    className: 'custom-leaflet-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  })
}

// Status colors for legend
export const STATUS_COLORS: Record<string, string> = {
  'Planning': '#3b82f6', // Blue
  'Development': '#f97316', // Orange
  'Operational': '#22c55e', // Green
  'Expansion': '#eab308', // Yellow
}
