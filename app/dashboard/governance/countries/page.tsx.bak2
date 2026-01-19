"use client"

import { motion } from "framer-motion"
import { CheckCircle, Clock, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

const countries = [
  { id: 1, name: "Nigeria", flag: "🇳🇬", delegates: 45, readiness: 92, tasks: 24, completed: 22 },
  { id: 2, name: "Ghana", flag: "🇬🇭", delegates: 28, readiness: 88, tasks: 20, completed: 18 },
  { id: 3, name: "Senegal", flag: "🇸🇳", delegates: 22, readiness: 85, tasks: 18, completed: 15 },
  { id: 4, name: "Côte d'Ivoire", flag: "🇨🇮", delegates: 30, readiness: 78, tasks: 22, completed: 17 },
  { id: 5, name: "Mali", flag: "🇲🇱", delegates: 18, readiness: 72, tasks: 16, completed: 12 },
  { id: 6, name: "Burkina Faso", flag: "🇧🇫", delegates: 15, readiness: 68, tasks: 14, completed: 10 },
]

export default function CountryWorkspacesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Country Workspaces</h1>
        <p className="text-muted-foreground">Manage country delegations and preparation status</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Search countries..." className="pl-10" />
      </div>

      {/* Countries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {countries.map((country, index) => (
          <motion.div
            key={country.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <div>
                    <h3 className="font-semibold text-lg">{country.name}</h3>
                    <p className="text-sm text-muted-foreground">{country.delegates} delegates</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Readiness Score</span>
                    <span
                      className={`font-medium ${country.readiness >= 80 ? "text-green-600" : country.readiness >= 60 ? "text-amber-600" : "text-red-600"}`}
                    >
                      {country.readiness}%
                    </span>
                  </div>
                  <Progress value={country.readiness} className="h-2" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" /> {country.completed} completed
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {country.tasks - country.completed} pending
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View Workspace
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
