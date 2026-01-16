"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, DollarSign, Mail, Calendar, Star, Users, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

const investors = [
  {
    id: 1,
    name: "Africa Finance Corporation",
    type: "DFI",
    logo: "/finance-fund-logo.jpg",
    location: "Lagos, Nigeria",
    aum: "$12.5B",
    sectors: ["Infrastructure", "Energy", "Transport"],
    ticketSize: "$50M - $500M",
    activeDeals: 12,
    rating: 4.9,
    verified: true,
    description: "Pan-African multilateral development finance institution",
  },
  {
    id: 2,
    name: "Green Climate Fund",
    type: "Climate Fund",
    logo: "/climate-fund-green.jpg",
    location: "Songdo, South Korea",
    aum: "$10.3B",
    sectors: ["Renewable Energy", "Climate Adaptation", "Agriculture"],
    ticketSize: "$10M - $250M",
    activeDeals: 8,
    rating: 4.8,
    verified: true,
    description: "Global fund supporting developing countries in climate action",
  },
  {
    id: 3,
    name: "African Development Bank",
    type: "MDB",
    logo: "/african-development-bank.jpg",
    location: "Abidjan, Côte d'Ivoire",
    aum: "$50B+",
    sectors: ["All Sectors"],
    ticketSize: "$100M - $1B",
    activeDeals: 24,
    rating: 5.0,
    verified: true,
    description: "Regional multilateral development bank for Africa",
  },
  {
    id: 4,
    name: "Meridian Capital Partners",
    type: "Private Equity",
    logo: "/investment-firm-logo.jpg",
    location: "Nairobi, Kenya",
    aum: "$2.8B",
    sectors: ["Technology", "Financial Services", "Healthcare"],
    ticketSize: "$5M - $50M",
    activeDeals: 6,
    rating: 4.7,
    verified: true,
    description: "Growth equity firm focused on Sub-Saharan Africa",
  },
  {
    id: 5,
    name: "West Africa Infrastructure Fund",
    type: "Infrastructure Fund",
    logo: "/infrastructure-fund-logo.jpg",
    location: "Accra, Ghana",
    aum: "$1.5B",
    sectors: ["Transport", "Energy", "Water"],
    ticketSize: "$25M - $150M",
    activeDeals: 4,
    rating: 4.6,
    verified: false,
    description: "Regional infrastructure investment vehicle",
  },
]

export default function InvestorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")

  const filteredInvestors = investors.filter((investor) => {
    const matchesSearch =
      investor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      investor.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || investor.type.toLowerCase().includes(selectedType.toLowerCase())
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Investor Directory</h1>
          <p className="text-muted-foreground">Connect with investors attending the summit</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Users className="w-3 h-3 mr-1" />
            {investors.length} Investors
          </Badge>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            <DollarSign className="w-3 h-3 mr-1" />
            $75B+ AUM
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search investors..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Investor Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="dfi">DFI</SelectItem>
            <SelectItem value="mdb">MDB</SelectItem>
            <SelectItem value="private">Private Equity</SelectItem>
            <SelectItem value="climate">Climate Fund</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="w-4 h-4" />
          More Filters
        </Button>
      </div>

      {/* Investor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInvestors.map((investor, index) => (
          <motion.div
            key={investor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 hover:shadow-xl transition-all group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                <Image src={investor.logo || "/placeholder.svg"} alt={investor.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg truncate">{investor.name}</h3>
                  {investor.verified && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="text-xs">
                    {investor.type}
                  </Badge>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {investor.location}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{investor.rating}</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{investor.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Assets Under Management</p>
                <p className="font-bold text-primary">{investor.aum}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground">Ticket Size</p>
                <p className="font-bold">{investor.ticketSize}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {investor.sectors.map((sector) => (
                <Badge key={sector} variant="outline" className="text-xs">
                  {sector}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 inline mr-1" />
                {investor.activeDeals} active deals
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                  <Mail className="w-4 h-4" />
                  Contact
                </Button>
                <Button size="sm" className="gap-1">
                  <Calendar className="w-4 h-4" />
                  Schedule
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
