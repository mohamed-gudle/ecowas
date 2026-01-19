"use client"

import { motion } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle, Clock, Search, Filter, Eye } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const securityChecks = [
  {
    id: 1,
    name: "Dr. Amina Okonkwo",
    country: "Nigeria",
    type: "VIP",
    status: "cleared",
    date: "2024-01-15",
    risk: "low",
  },
  {
    id: 2,
    name: "Jean-Pierre Mensah",
    country: "Ghana",
    type: "Delegate",
    status: "pending",
    date: "2024-01-14",
    risk: "medium",
  },
  {
    id: 3,
    name: "Fatou Diallo",
    country: "Senegal",
    type: "Media",
    status: "cleared",
    date: "2024-01-13",
    risk: "low",
  },
  {
    id: 4,
    name: "Ibrahim Toure",
    country: "Mali",
    type: "Delegate",
    status: "flagged",
    date: "2024-01-12",
    risk: "high",
  },
  { id: 5, name: "Chioma Eze", country: "Nigeria", type: "Staff", status: "pending", date: "2024-01-11", risk: "low" },
]

const statusConfig = {
  cleared: { label: "Cleared", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-600", icon: Clock },
  flagged: { label: "Flagged", color: "bg-red-500/10 text-red-600", icon: AlertTriangle },
}

const riskConfig = {
  low: "bg-green-500",
  medium: "bg-amber-500",
  high: "bg-red-500",
}

export default function SecurityChecksPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Security Checks</h1>
            <p className="text-muted-foreground">Background verification and security clearance management</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cleared</p>
                  <p className="text-2xl font-bold text-green-600">342</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">48</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Flagged</p>
                  <p className="text-2xl font-bold text-red-600">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">VIP Clearances</p>
                  <p className="text-2xl font-bold">28</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search applicants..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Security Checks List */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-0">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="flagged">Flagged</TabsTrigger>
              <TabsTrigger value="cleared">Cleared</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <Tabs defaultValue="all">
              <TabsContent value="all">
                {securityChecks.map((check, index) => {
                  const status = statusConfig[check.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  return (
                    <motion.div
                      key={check.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {check.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${riskConfig[check.risk as keyof typeof riskConfig]} border-2 border-background`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{check.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{check.country}</span>
                            <span>•</span>
                            <Badge variant="outline">{check.type}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{check.date}</span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" /> Review
                        </Button>
                      </div>
                    </motion.div>
                  )
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
