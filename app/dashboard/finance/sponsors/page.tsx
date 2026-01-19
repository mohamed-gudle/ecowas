"use client"

import { motion } from "framer-motion"
import { Building2, Star, Award, Eye, Mail, Plus, Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const sponsors = [
  {
    id: 1,
    name: "African Development Bank",
    tier: "Platinum",
    amount: 500000,
    logo: "/afdb-logo.png",
    benefits: ["Main stage naming", "10 delegate passes", "Exhibition booth"],
    paid: true,
  },
  {
    id: 2,
    name: "ECOWAS Bank for Investment",
    tier: "Gold",
    amount: 250000,
    logo: "/ebid-logo.jpg",
    benefits: ["Stage branding", "5 delegate passes", "Exhibition booth"],
    paid: true,
  },
  {
    id: 3,
    name: "Afreximbank",
    tier: "Gold",
    amount: 250000,
    logo: "/afreximbank-logo.png",
    benefits: ["Stage branding", "5 delegate passes"],
    paid: false,
  },
  {
    id: 4,
    name: "Access Bank",
    tier: "Silver",
    amount: 100000,
    logo: "/access-bank-logo.png",
    benefits: ["Logo placement", "3 delegate passes"],
    paid: true,
  },
  {
    id: 5,
    name: "MTN Group",
    tier: "Silver",
    amount: 100000,
    logo: "/generic-telecom-logo.png",
    benefits: ["Logo placement", "3 delegate passes"],
    paid: true,
  },
]

const tierConfig = {
  Platinum: { color: "bg-gradient-to-r from-slate-400 to-slate-600 text-white", icon: Award },
  Gold: { color: "bg-gradient-to-r from-amber-400 to-amber-600 text-white", icon: Star },
  Silver: { color: "bg-gradient-to-r from-gray-300 to-gray-500 text-white", icon: Star },
}

export default function SponsorsPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sponsors & Exhibitors</h1>
          <p className="text-muted-foreground">Manage sponsorship packages and exhibitor booths</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Sponsor
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-amber-500/10 to-orange-500/10">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Sponsorship</p>
            <p className="text-2xl font-bold text-amber-600">$1.2M</p>
            <p className="text-xs text-green-600">85% of target</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Confirmed Sponsors</p>
            <p className="text-2xl font-bold">12</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Exhibition Booths</p>
            <p className="text-2xl font-bold">24/30</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Payments</p>
            <p className="text-2xl font-bold text-amber-600">$350K</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search sponsors..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Sponsors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sponsors.map((sponsor, index) => {
          const tier = tierConfig[sponsor.tier as keyof typeof tierConfig]
          const TierIcon = tier.icon
          return (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className={tier.color}>
                      <TierIcon className="w-3 h-3 mr-1" />
                      {sponsor.tier}
                    </Badge>
                    <Badge variant={sponsor.paid ? "default" : "secondary"}>{sponsor.paid ? "Paid" : "Pending"}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{sponsor.name}</h3>
                      <p className="text-lg font-bold text-primary">${sponsor.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Benefits:</p>
                    <div className="flex flex-wrap gap-1">
                      {sponsor.benefits.map((benefit) => (
                        <Badge key={benefit} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Mail className="w-4 h-4 mr-1" /> Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>

      </div>

    </div>
  )
}
