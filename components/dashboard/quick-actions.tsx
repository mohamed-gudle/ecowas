"use client"

import { motion } from "framer-motion"
import { UserPlus, Calendar, FileText, Send, AlertTriangle, Building2, Mic, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const quickActions = [
  {
    icon: UserPlus,
    label: "Add VIP",
    href: "/dashboard/vip/new",
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    icon: Calendar,
    label: "New Session",
    href: "/dashboard/programme/new",
    color: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  },
  {
    icon: FileText,
    label: "Generate SitRep",
    href: "/dashboard/reports/sitrep",
    color: "bg-accent/10 text-accent hover:bg-accent/20",
  },
  {
    icon: Send,
    label: "Broadcast",
    href: "/dashboard/communications/broadcast",
    color: "bg-success/10 text-success hover:bg-success/20",
  },
  {
    icon: AlertTriangle,
    label: "Log Incident",
    href: "/dashboard/risks/new",
    color: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
  {
    icon: Building2,
    label: "Supplier Ticket",
    href: "/dashboard/logistics/tickets/new",
    color: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  {
    icon: Mic,
    label: "Speaker Brief",
    href: "/dashboard/programme/speakers",
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    icon: Download,
    label: "Export Data",
    href: "/dashboard/analytics/export",
    color: "bg-muted text-muted-foreground hover:bg-muted/80",
  },
]

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-xl border border-border shadow-lg p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-3">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.05 }}
          >
            <Link href={action.href}>
              <Button
                variant="outline"
                className={`w-full h-auto flex flex-col items-center gap-2 p-4 ${action.color} border-transparent`}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
