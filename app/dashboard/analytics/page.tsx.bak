"use client"

import { motion } from "framer-motion"
import { BarChart3, Download, ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const metrics = [
  {
    title: "Total Registrations",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    description: "vs last summit",
  },
  {
    title: "Investment Commitments",
    value: "$18.5B",
    change: "+28.3%",
    trend: "up",
    description: "secured this summit",
  },
  {
    title: "Sessions Scheduled",
    value: "156",
    change: "+8.2%",
    trend: "up",
    description: "across 3 days",
  },
  {
    title: "Countries Represented",
    value: "15/15",
    change: "100%",
    trend: "up",
    description: "full attendance",
  },
]

const registrationsByCategory = [
  { category: "Government Officials", count: 856, percentage: 30 },
  { category: "Business Leaders", count: 712, percentage: 25 },
  { category: "Investors", count: 542, percentage: 19 },
  { category: "Media", count: 398, percentage: 14 },
  { category: "Civil Society", count: 228, percentage: 8 },
  { category: "International Organizations", count: 111, percentage: 4 },
]

const topCountries = [
  { country: "Nigeria", flag: "🇳🇬", registrations: 456, investment: "$4.2B" },
  { country: "Ghana", flag: "🇬🇭", registrations: 312, investment: "$2.8B" },
  { country: "Senegal", flag: "🇸🇳", registrations: 278, investment: "$1.9B" },
  { country: "Côte d'Ivoire", flag: "🇨🇮", registrations: 245, investment: "$1.7B" },
  { country: "Togo", flag: "🇹🇬", registrations: 189, investment: "$1.2B" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time summit performance metrics and insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="realtime">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">Real-time</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-3xl font-bold mt-1">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {metric.trend === "up" ? (
                        <ArrowUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      >
                        {metric.change}
                      </span>
                      <span className="text-xs text-muted-foreground">{metric.description}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registrations by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Registrations by Category</CardTitle>
            <CardDescription>Breakdown of attendee types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {registrationsByCategory.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.category}</span>
                    <span className="text-sm text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>By registration and investment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country, index) => (
                <motion.div
                  key={country.country}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
                >
                  <span className="text-2xl">{country.flag}</span>
                  <div className="flex-1">
                    <p className="font-medium">{country.country}</p>
                    <p className="text-sm text-muted-foreground">{country.registrations} registrations</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{country.investment}</p>
                    <p className="text-xs text-muted-foreground">Investment</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Trends</CardTitle>
          <CardDescription>Daily registration activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center bg-muted/30 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-muted-foreground">Interactive charts coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
