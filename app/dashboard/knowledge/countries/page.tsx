"use client"

import { motion } from "framer-motion"
import { Search, Users, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const countryBriefs = [
  {
    id: 1,
    country: "Nigeria",
    flag: "🇳🇬",
    population: "223M",
    gdp: "$477B",
    lastUpdated: "Jan 15, 2024",
    documents: 8,
  },
  { id: 2, country: "Ghana", flag: "🇬🇭", population: "34M", gdp: "$77B", lastUpdated: "Jan 14, 2024", documents: 6 },
  {
    id: 3,
    country: "Côte d'Ivoire",
    flag: "🇨🇮",
    population: "28M",
    gdp: "$70B",
    lastUpdated: "Jan 13, 2024",
    documents: 5,
  },
  { id: 4, country: "Senegal", flag: "🇸🇳", population: "18M", gdp: "$28B", lastUpdated: "Jan 12, 2024", documents: 5 },
  { id: 5, country: "Mali", flag: "🇲🇱", population: "23M", gdp: "$19B", lastUpdated: "Jan 11, 2024", documents: 4 },
  {
    id: 6,
    country: "Burkina Faso",
    flag: "🇧🇫",
    population: "23M",
    gdp: "$19B",
    lastUpdated: "Jan 10, 2024",
    documents: 4,
  },
]

export default function CountryBriefsPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Country Briefs</h1>
          <p className="text-muted-foreground">Country profiles and intelligence briefs for all ECOWAS member states</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search countries..." className="pl-10" />
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countryBriefs.map((country, index) => (
          <motion.div
            key={country.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{country.flag}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{country.country}</h3>
                    <p className="text-sm text-muted-foreground">Updated {country.lastUpdated}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{country.population}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{country.gdp}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <Badge variant="outline">{country.documents} documents</Badge>
                  <Button size="sm">View Brief</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>

      </div>

    </div>
  )
}
