"use client"

import { Header } from "@/components/dashboard/header"
import { OverviewStats } from "@/components/dashboard/overview-stats"
import { AccreditationQueue } from "@/components/dashboard/accreditation-queue"
import { ProgrammeOverview } from "@/components/dashboard/programme-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RiskAlerts } from "@/components/dashboard/risk-alerts"
import { ReadinessTracker } from "@/components/dashboard/readiness-tracker"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header title="Command Center" subtitle="ECOWAS Climate Summit 2026" />

      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
        {/* Stats Grid */}
        <OverviewStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main queues */}
          <div className="lg:col-span-2 space-y-6">
            <AccreditationQueue />
            <ProgrammeOverview />
          </div>

          {/* Right Column - Actions and alerts */}
          <div className="space-y-6">
            <QuickActions />
            <RiskAlerts />
            <ReadinessTracker />
          </div>
        </div>
      </div>
    </div>
  )
}
