"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  MoreHorizontal,
  Send,
} from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const invoices = [
  {
    id: "INV-001",
    vendor: "Transcorp Hilton",
    description: "Venue booking deposit",
    amount: 500000,
    dueDate: "2024-01-20",
    status: "paid",
  },
  {
    id: "INV-002",
    vendor: "Securitech Nigeria",
    description: "Security services - Phase 1",
    amount: 175000,
    dueDate: "2024-01-25",
    status: "pending",
  },
  {
    id: "INV-003",
    vendor: "TechAV Solutions",
    description: "AV equipment rental",
    amount: 125000,
    dueDate: "2024-01-28",
    status: "pending",
  },
  {
    id: "INV-004",
    vendor: "Catering Plus",
    description: "Catering advance payment",
    amount: 200000,
    dueDate: "2024-01-15",
    status: "paid",
  },
  {
    id: "INV-005",
    vendor: "PrintMaster Ltd",
    description: "Badge printing services",
    amount: 45000,
    dueDate: "2024-02-01",
    status: "overdue",
  },
  {
    id: "INV-006",
    vendor: "FleetMax Transport",
    description: "Vehicle hire - 50 units",
    amount: 280000,
    dueDate: "2024-02-05",
    status: "draft",
  },
]

const statusConfig = {
  paid: { label: "Paid", icon: CheckCircle, color: "text-green-600 bg-green-500/10" },
  pending: { label: "Pending", icon: Clock, color: "text-amber-600 bg-amber-500/10" },
  overdue: { label: "Overdue", icon: XCircle, color: "text-red-600 bg-red-500/10" },
  draft: { label: "Draft", icon: FileText, color: "text-muted-foreground bg-muted" },
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Invoices & Payments</h1>
          <p className="text-muted-foreground">Manage vendor invoices and payment processing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Outstanding</p>
            <p className="text-2xl font-bold text-amber-600">$625,000</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Paid This Month</p>
            <p className="text-2xl font-bold text-green-600">$920,000</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Overdue</p>
            <p className="text-2xl font-bold text-red-600">$45,000</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <p className="text-2xl font-bold">8</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Invoices Table */}
      <Card className="border-0 shadow-lg">
        <Tabs defaultValue="all">
          <CardHeader className="pb-0">
            <TabsList>
              <TabsTrigger value="all">All Invoices</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => {
                  const status = statusConfig[invoice.status as keyof typeof statusConfig]
                  const StatusIcon = status.icon
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.vendor}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{invoice.description}</TableCell>
                      <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>
                        <Badge className={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="w-4 h-4 mr-2" /> Process Payment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" /> Download PDF
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Tabs>
      </Card>
    </div>

      </div>


  )
}
