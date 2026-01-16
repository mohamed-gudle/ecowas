"use client"

import { motion } from "framer-motion"
import { TrendingUp, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const revenueStreams = [
  { name: "Sponsorships", target: 1500000, actual: 1200000, percentage: 80 },
  { name: "Delegate Registrations", target: 500000, actual: 425000, percentage: 85 },
  { name: "Exhibition Booths", target: 300000, actual: 240000, percentage: 80 },
  { name: "Virtual Access", target: 100000, actual: 65000, percentage: 65 },
  { name: "Side Events", target: 150000, actual: 120000, percentage: 80 },
]

export default function RevenuePage() {
  const totalTarget = revenueStreams.reduce((sum, s) => sum + s.target, 0)
  const totalActual = revenueStreams.reduce((sum, s) => sum + s.actual, 0)
  const overallPercentage = Math.round((totalActual / totalTarget) * 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Revenue Tracker</h1>
          <p className="text-muted-foreground">Track revenue targets and actuals across all streams</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overall Progress */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue Progress</p>
              <div className="flex items-baseline gap-2">
                <p className="text-4xl font-bold text-green-600">${(totalActual / 1000000).toFixed(2)}M</p>
                <p className="text-muted-foreground">/ ${(totalTarget / 1000000).toFixed(2)}M target</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-3xl font-bold text-green-600">{overallPercentage}%</p>
                <p className="text-sm text-muted-foreground">achieved</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
          <Progress value={overallPercentage} className="h-3 mt-4" />
        </CardContent>
      </Card>

      {/* Revenue Streams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {revenueStreams.map((stream, index) => (
          <motion.div
            key={stream.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{stream.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold">${(stream.actual / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-muted-foreground">/ ${(stream.target / 1000).toFixed(0)}K</p>
                </div>
                <Progress value={stream.percentage} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={
                      stream.percentage >= 80
                        ? "text-green-600"
                        : stream.percentage >= 60
                          ? "text-amber-600"
                          : "text-red-600"
                    }
                  >
                    {stream.percentage}% achieved
                  </span>
                  <span className="text-muted-foreground">
                    ${((stream.target - stream.actual) / 1000).toFixed(0)}K remaining
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
