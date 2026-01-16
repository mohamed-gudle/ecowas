"use client"

import { motion } from "framer-motion"
import { CheckCircle2, AlertCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const domains = [
  { name: "Venue & Infrastructure", progress: 85, status: "on-track", issues: 2 },
  { name: "AV & Technology", progress: 72, status: "at-risk", issues: 5 },
  { name: "Security & Access", progress: 90, status: "on-track", issues: 1 },
  { name: "Catering & Hospitality", progress: 65, status: "at-risk", issues: 3 },
  { name: "Transport & Logistics", progress: 78, status: "on-track", issues: 2 },
  { name: "Programme & Content", progress: 88, status: "on-track", issues: 4 },
]

export function ReadinessTracker() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-card rounded-xl border border-border shadow-lg p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Readiness Tracker</h2>
          <p className="text-sm text-muted-foreground">Overall: 80% ready</p>
        </div>
        <Link href="/dashboard/operations/readiness">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            Details <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {domains.map((domain, index) => (
          <motion.div
            key={domain.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + index * 0.05 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {domain.status === "on-track" ? (
                  <CheckCircle2 className="w-4 h-4 text-success" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-warning" />
                )}
                <span className="text-sm font-medium">{domain.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{domain.issues} issues</span>
                <span className="text-sm font-medium">{domain.progress}%</span>
              </div>
            </div>
            <Progress value={domain.progress} className="h-2" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
