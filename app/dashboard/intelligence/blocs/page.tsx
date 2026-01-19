"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, ArrowRight, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const blocs = [
  {
    id: "uemoa",
    name: "UEMOA",
    fullName: "West African Economic and Monetary Union",
    members: ["Benin", "Burkina Faso", "Côte d'Ivoire", "Guinea-Bissau", "Mali", "Niger", "Senegal", "Togo"],
    totalGDP: "$180B",
    population: "137M",
    opportunities: 245,
    focusSectors: ["Agriculture", "Infrastructure", "Digital Economy"],
    investmentPipeline: "$8.5B",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "wamz",
    name: "WAMZ",
    fullName: "West African Monetary Zone",
    members: ["The Gambia", "Ghana", "Guinea", "Liberia", "Nigeria", "Sierra Leone"],
    totalGDP: "$620B",
    population: "310M",
    opportunities: 312,
    focusSectors: ["Oil & Gas", "Mining", "Manufacturing"],
    investmentPipeline: "$18.2B",
    color: "from-primary to-accent",
  },
  {
    id: "mru",
    name: "MRU",
    fullName: "Mano River Union",
    members: ["Guinea", "Liberia", "Sierra Leone", "Côte d'Ivoire"],
    totalGDP: "$95B",
    population: "65M",
    opportunities: 89,
    focusSectors: ["Mining", "Agriculture", "Cross-border Trade"],
    investmentPipeline: "$3.8B",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "liptako",
    name: "Liptako-Gourma",
    fullName: "Liptako-Gourma Authority",
    members: ["Burkina Faso", "Mali", "Niger"],
    totalGDP: "$53B",
    population: "71M",
    opportunities: 45,
    focusSectors: ["Security", "Mining", "Water Resources"],
    investmentPipeline: "$1.2B",
    color: "from-orange-500 to-red-500",
  },
]

const crossBlocOpportunities = [
  {
    title: "West Africa Energy Corridor",
    blocs: ["UEMOA", "WAMZ"],
    value: "$2.5B",
    sector: "Energy",
    status: "Active",
    description: "Cross-border power transmission linking 8 countries",
  },
  {
    title: "Coastal Highway Network",
    blocs: ["UEMOA", "MRU"],
    value: "$4.8B",
    sector: "Infrastructure",
    status: "Planning",
    description: "1,200km highway connecting Dakar to Lagos",
  },
  {
    title: "Regional Agricultural Hub",
    blocs: ["UEMOA", "WAMZ"],
    value: "$850M",
    sector: "Agriculture",
    status: "Active",
    description: "Shared agricultural processing and export facilities",
  },
  {
    title: "Digital Payment Integration",
    blocs: ["UEMOA", "WAMZ", "MRU"],
    value: "$320M",
    sector: "FinTech",
    status: "Implementation",
    description: "Unified digital payment system across ECOWAS",
  },
]

export default function BlocAnalysisPage() {
  const [selectedBloc, setSelectedBloc] = useState<string | null>(null)

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Bloc Analysis</h1>
          <p className="text-muted-foreground">Regional economic blocs and cross-border opportunities</p>
        </div>
      </div>

      {/* Blocs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {blocs.map((bloc, index) => (
          <motion.div
            key={bloc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedBloc === bloc.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedBloc(selectedBloc === bloc.id ? null : bloc.id)}
            >
              <CardHeader className="pb-2">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${bloc.color} flex items-center justify-center mb-2`}
                >
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle>{bloc.name}</CardTitle>
                <CardDescription className="text-xs line-clamp-1">{bloc.fullName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">GDP</p>
                    <p className="font-semibold">{bloc.totalGDP}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Population</p>
                    <p className="font-semibold">{bloc.population}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Members</p>
                    <p className="font-semibold">{bloc.members.length}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Opportunities</p>
                    <p className="font-semibold">{bloc.opportunities}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Investment Pipeline</p>
                  <p className="text-lg font-bold text-primary">{bloc.investmentPipeline}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Selected Bloc Details */}
      {selectedBloc && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{blocs.find((b) => b.id === selectedBloc)?.fullName}</CardTitle>
              <CardDescription>Member states and focus areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Member States</h4>
                  <div className="flex flex-wrap gap-2">
                    {blocs
                      .find((b) => b.id === selectedBloc)
                      ?.members.map((member) => (
                        <Badge key={member} variant="secondary">
                          {member}
                        </Badge>
                      ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Focus Sectors</h4>
                  <div className="flex flex-wrap gap-2">
                    {blocs
                      .find((b) => b.id === selectedBloc)
                      ?.focusSectors.map((sector) => (
                        <Badge key={sector} className="bg-primary/10 text-primary">
                          {sector}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Cross-Bloc Opportunities */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cross-Bloc Opportunities</CardTitle>
              <CardDescription>Multi-regional investment and development projects</CardDescription>
            </div>
            <Button variant="outline">
              View All
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crossBlocOpportunities.map((opp, index) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{opp.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          opp.status === "Active"
                            ? "border-green-500 text-green-500"
                            : opp.status === "Implementation"
                              ? "border-blue-500 text-blue-500"
                              : "border-yellow-500 text-yellow-500"
                        }
                      >
                        {opp.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{opp.description}</p>
                    <div className="flex items-center gap-2">
                      {opp.blocs.map((bloc, i) => (
                        <span key={bloc} className="flex items-center">
                          <Badge variant="secondary" className="text-xs">
                            {bloc}
                          </Badge>
                          {i < opp.blocs.length - 1 && <ArrowRight className="w-3 h-3 mx-1 text-muted-foreground" />}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{opp.value}</p>
                    <p className="text-xs text-muted-foreground">{opp.sector}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
