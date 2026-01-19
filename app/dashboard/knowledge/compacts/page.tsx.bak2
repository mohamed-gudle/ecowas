"use client"

import { motion } from "framer-motion"
import { Download, Eye, Calendar, Shield, Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const compacts = [
  { id: 1, title: "ECOWAS Vision 2050", type: "Strategic Framework", date: "2023-12-01", status: "Active" },
  { id: 2, title: "Free Movement Protocol", type: "Protocol", date: "2023-09-15", status: "Active" },
  { id: 3, title: "Trade Liberalization Scheme", type: "Agreement", date: "2023-06-20", status: "Active" },
  { id: 4, title: "Energy Protocol", type: "Protocol", date: "2022-11-10", status: "Under Review" },
  { id: 5, title: "Peace & Security Framework", type: "Framework", date: "2022-08-05", status: "Active" },
]

export default function CompactsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Compacts & Policies</h1>
        <p className="text-muted-foreground">ECOWAS treaties, protocols, and policy documents</p>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search compacts..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Compacts List */}
      <div className="space-y-4">
        {compacts.map((compact, index) => (
          <motion.div
            key={compact.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{compact.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{compact.type}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {compact.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={compact.status === "Active" ? "default" : "secondary"}>{compact.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" /> View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
