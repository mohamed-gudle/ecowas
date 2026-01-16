"use client"
import { Users, Calendar, Shield, AlertTriangle, Clock, CheckCircle2 } from "lucide-react"
import { StatCard } from "@/components/ui/stat-card"

const stats = [
  {
    title: "Total Applications",
    value: "3,247",
    change: "+156 today",
    changeType: "positive" as const,
    icon: Users,
    iconColor: "text-primary",
  },
  {
    title: "Approved Delegates",
    value: "2,189",
    change: "67% approval rate",
    changeType: "positive" as const,
    icon: CheckCircle2,
    iconColor: "text-success",
  },
  {
    title: "Scheduled Sessions",
    value: "186",
    change: "12 pending review",
    changeType: "neutral" as const,
    icon: Calendar,
    iconColor: "text-secondary",
  },
  {
    title: "Pending Security",
    value: "324",
    change: "15 overdue SLA",
    changeType: "negative" as const,
    icon: Shield,
    iconColor: "text-warning",
  },
  {
    title: "Active Risks",
    value: "8",
    change: "2 high priority",
    changeType: "negative" as const,
    icon: AlertTriangle,
    iconColor: "text-destructive",
  },
  {
    title: "Days to Summit",
    value: "45",
    change: "Jan 15, 2026",
    changeType: "neutral" as const,
    icon: Clock,
    iconColor: "text-accent",
  },
]

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          iconColor={stat.iconColor}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}
