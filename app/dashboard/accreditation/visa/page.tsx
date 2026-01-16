"use client"

import { motion } from "framer-motion"
import { FileCheck, Clock, CheckCircle, XCircle, Search, Filter, Send, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const visaApplications = [
  {
    id: 1,
    name: "Dr. Chen Wei",
    country: "China",
    nationality: "Chinese",
    status: "approved",
    arrivalDate: "2024-02-10",
  },
  {
    id: 2,
    name: "Maria Santos",
    country: "Brazil",
    nationality: "Brazilian",
    status: "processing",
    arrivalDate: "2024-02-11",
  },
  {
    id: 3,
    name: "James Wilson",
    country: "United Kingdom",
    nationality: "British",
    status: "approved",
    arrivalDate: "2024-02-09",
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    country: "Japan",
    nationality: "Japanese",
    status: "pending",
    arrivalDate: "2024-02-12",
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    country: "Egypt",
    nationality: "Egyptian",
    status: "approved",
    arrivalDate: "2024-02-10",
  },
]

const statusConfig = {
  approved: { label: "Approved", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
  processing: { label: "Processing", color: "bg-blue-500/10 text-blue-600", icon: Clock },
  pending: { label: "Pending", color: "bg-amber-500/10 text-amber-600", icon: Clock },
  rejected: { label: "Rejected", color: "bg-red-500/10 text-red-600", icon: XCircle },
}

export default function VisaProcessingPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Visa Processing</h1>
          <p className="text-muted-foreground">Manage visa support letters and immigration coordination</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Send className="w-4 h-4 mr-2" />
          Issue Support Letter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Applications</p>
            <p className="text-2xl font-bold">156</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Approved</p>
            <p className="text-2xl font-bold text-green-600">124</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">28</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Support Letters Issued</p>
            <p className="text-2xl font-bold">142</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or country..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Applications List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Visa Applications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {visaApplications.map((app, index) => {
            const status = statusConfig[app.status as keyof typeof statusConfig]
            const StatusIcon = status.icon
            return (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{app.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.nationality} • From {app.country}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Arrival: {app.arrivalDate}</p>
                  </div>
                  <Badge className={status.color}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <FileCheck className="w-4 h-4 mr-1" /> Letter
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </div>

      </div>

    </div>
  )
}
