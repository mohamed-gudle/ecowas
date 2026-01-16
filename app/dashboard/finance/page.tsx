"use client"

import { motion } from "framer-motion"
import { TrendingUp, CreditCard, PiggyBank, Receipt, ArrowUpRight, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const budgetCategories = [
  { name: "Venue & Facilities", allocated: 2500000, spent: 1875000, percentage: 75 },
  { name: "Catering & Hospitality", allocated: 1200000, spent: 840000, percentage: 70 },
  { name: "Technology & AV", allocated: 800000, spent: 640000, percentage: 80 },
  { name: "Transport & Logistics", allocated: 600000, spent: 420000, percentage: 70 },
  { name: "Security Services", allocated: 500000, spent: 375000, percentage: 75 },
  { name: "Marketing & Communications", allocated: 400000, spent: 280000, percentage: 70 },
]

const recentTransactions = [
  {
    id: 1,
    description: "Venue deposit - AICC",
    amount: -500000,
    date: "2024-01-15",
    category: "Venue",
    status: "completed",
  },
  {
    id: 2,
    description: "Sponsor payment - AfDB",
    amount: 250000,
    date: "2024-01-14",
    category: "Sponsorship",
    status: "completed",
  },
  {
    id: 3,
    description: "AV Equipment rental",
    amount: -125000,
    date: "2024-01-13",
    category: "Technology",
    status: "pending",
  },
  {
    id: 4,
    description: "Catering advance - Transcorp",
    amount: -200000,
    date: "2024-01-12",
    category: "Catering",
    status: "completed",
  },
  {
    id: 5,
    description: "Registration fees collected",
    amount: 85000,
    date: "2024-01-11",
    category: "Revenue",
    status: "completed",
  },
]

export default function FinanceDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Finance Dashboard</h1>
          <p className="text-muted-foreground">Budget overview and financial tracking</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <Receipt className="w-4 h-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-3xl font-bold text-green-600">$8.5M</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> 12% vs last summit
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-3xl font-bold text-blue-600">$4.43M</p>
                  <p className="text-xs text-muted-foreground mt-1">52% of budget</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Collected</p>
                  <p className="text-3xl font-bold text-amber-600">$2.1M</p>
                  <p className="text-xs text-amber-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" /> 85% of target
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                  <p className="text-3xl font-bold text-purple-600">$680K</p>
                  <p className="text-xs text-muted-foreground mt-1">12 invoices pending</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Budget Allocation & Spending</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {budgetCategories.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-muted-foreground">
                      ${(category.spent / 1000000).toFixed(2)}M / ${(category.allocated / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <Badge variant={transaction.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 bg-transparent">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
