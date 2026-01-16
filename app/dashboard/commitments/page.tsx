"use client"
import { motion } from "framer-motion"
import { Target, Clock, Plus, Filter, Download, ChevronRight, DollarSign, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const commitments = [
  {
    id: 1,
    title: "Renewable Energy Investment Pledge",
    country: "Nigeria",
    flag: "🇳🇬",
    amount: "$2.5B",
    sector: "Energy",
    deadline: "2027-12-31",
    progress: 35,
    status: "On Track",
    milestones: 4,
    completedMilestones: 1,
  },
  {
    id: 2,
    title: "Agricultural Export Corridor",
    country: "Ghana",
    flag: "🇬🇭",
    amount: "$850M",
    sector: "Agriculture",
    deadline: "2026-12-31",
    progress: 65,
    status: "On Track",
    milestones: 6,
    completedMilestones: 4,
  },
  {
    id: 3,
    title: "Digital Infrastructure Fund",
    country: "Senegal",
    flag: "🇸🇳",
    amount: "$420M",
    sector: "Technology",
    deadline: "2027-06-30",
    progress: 20,
    status: "Behind",
    milestones: 5,
    completedMilestones: 1,
  },
  {
    id: 4,
    title: "Cross-Border Transport Network",
    country: "Multiple",
    flag: "🌍",
    amount: "$3.2B",
    sector: "Infrastructure",
    deadline: "2028-12-31",
    progress: 15,
    status: "On Track",
    milestones: 8,
    completedMilestones: 1,
  },
  {
    id: 5,
    title: "Youth Employment Initiative",
    country: "Côte d'Ivoire",
    flag: "🇨🇮",
    amount: "$180M",
    sector: "Social",
    deadline: "2026-06-30",
    progress: 80,
    status: "Ahead",
    milestones: 4,
    completedMilestones: 3,
  },
]

export default function CommitmentsPage() {
  const totalValue = commitments.reduce((acc, c) => {
    const value = Number.parseFloat(c.amount.replace(/[$BM]/g, ""))
    const multiplier = c.amount.includes("B") ? 1000 : 1
    return acc + value * multiplier
  }, 0)

  const avgProgress = Math.round(commitments.reduce((acc, c) => acc + c.progress, 0) / commitments.length)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Commitments Tracker</h1>
              <Badge className="bg-green-500/10 text-green-500">New</Badge>
            </div>
            <p className="text-muted-foreground">Track and monitor summit commitments and pledges</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Commitment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Commitments</p>
                <p className="text-3xl font-bold">{commitments.length}</p>
              </div>
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-3xl font-bold">${(totalValue / 1000).toFixed(1)}B</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-3xl font-bold">{avgProgress}%</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Countries</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Globe className="w-8 h-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commitments List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Commitments</CardTitle>
              <CardDescription>Monitor progress on all summit pledges</CardDescription>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commitments.map((commitment, index) => (
              <motion.div
                key={commitment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{commitment.flag}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{commitment.title}</h4>
                      <Badge
                        variant="outline"
                        className={
                          commitment.status === "On Track"
                            ? "border-green-500 text-green-500"
                            : commitment.status === "Ahead"
                              ? "border-blue-500 text-blue-500"
                              : "border-red-500 text-red-500"
                        }
                      >
                        {commitment.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{commitment.country}</span>
                      <Badge variant="secondary">{commitment.sector}</Badge>
                      <span>Due: {commitment.deadline}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">{commitment.progress}%</span>
                        </div>
                        <Progress value={commitment.progress} className="h-2" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{commitment.completedMilestones}</span>/
                        {commitment.milestones} milestones
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{commitment.amount}</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
