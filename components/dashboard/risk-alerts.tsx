"use client"

import { motion } from "framer-motion"
import { AlertTriangle, ChevronRight, Clock, User, ArrowUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

const mockRisks = [
  {
    id: "1",
    title: "Venue Setup Delay - Hall B",
    severity: "high",
    owner: "Logistics Team",
    status: "open",
    daysOpen: 3,
    mitigation: "Expedite delivery; backup venue identified",
  },
  {
    id: "2",
    title: "Security Check Backlog",
    severity: "medium",
    owner: "Security Liaison",
    status: "mitigating",
    daysOpen: 5,
    mitigation: "Additional reviewers assigned",
  },
  {
    id: "3",
    title: "Translation Services Gap",
    severity: "low",
    owner: "Operations",
    status: "monitoring",
    daysOpen: 7,
    mitigation: "Contractor engaged; testing in progress",
  },
]

const severityConfig: Record<string, { color: string; bg: string }> = {
  high: { color: "text-destructive", bg: "bg-destructive/10" },
  medium: { color: "text-warning", bg: "bg-warning/10" },
  low: { color: "text-success", bg: "bg-success/10" },
}

export function RiskAlerts() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-xl border border-border shadow-lg"
    >
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Active Risks</h2>
              <p className="text-sm text-muted-foreground">8 risks • 2 high priority</p>
            </div>
          </div>
          <Link href="/dashboard/risks">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              Risk Register <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {mockRisks.map((risk, index) => (
          <motion.div
            key={risk.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-8 h-8 rounded-lg ${severityConfig[risk.severity].bg} flex items-center justify-center flex-shrink-0`}
              >
                {risk.severity === "high" ? (
                  <ArrowUp className={`w-4 h-4 ${severityConfig[risk.severity].color}`} />
                ) : (
                  <ArrowRight className={`w-4 h-4 ${severityConfig[risk.severity].color}`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium">{risk.title}</h3>
                  <Badge
                    variant="outline"
                    className={`${severityConfig[risk.severity].bg} ${severityConfig[risk.severity].color} border-transparent capitalize`}
                  >
                    {risk.severity}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{risk.mitigation}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" /> {risk.owner}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {risk.daysOpen} days
                  </span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {risk.status}
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
