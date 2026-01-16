"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Globe,
  CheckCircle2,
  Clock,
  Shield,
  AlertCircle,
  FileText,
  Download,
  MessageSquare,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GradientButton } from "@/components/ui/gradient-button"

type ApplicationStatus = "submitted" | "under_review" | "security_pending" | "approved" | "rejected"

const statusSteps = [
  {
    id: "submitted",
    label: "Application Submitted",
    description: "Your application has been received",
  },
  {
    id: "under_review",
    label: "Under Review",
    description: "Secretariat is reviewing your application",
  },
  {
    id: "security_pending",
    label: "Security Verification",
    description: "Background verification in progress",
  },
  {
    id: "approved",
    label: "Approved",
    description: "Your accreditation is approved",
  },
]

export default function ApplicationStatusPage() {
  const [applicationId, setApplicationId] = useState("")
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock application data
  const applicationData = {
    id: "ECO-2026-00142",
    name: "Amina Okonkwo",
    email: "amina.okonkwo@env.gov.ng",
    organization: "Nigerian Ministry of Environment",
    cluster: "Government",
    status: "security_pending" as ApplicationStatus,
    submittedAt: "2025-01-10T14:30:00Z",
    lastUpdated: "2025-01-11T09:15:00Z",
    timeline: [
      {
        status: "submitted",
        date: "2025-01-10T14:30:00Z",
        message: "Application successfully submitted",
      },
      {
        status: "under_review",
        date: "2025-01-10T16:45:00Z",
        message: "Application assigned to reviewer",
      },
      {
        status: "security_pending",
        date: "2025-01-11T09:15:00Z",
        message: "Forwarded for security verification",
      },
    ],
  }

  const handleSearch = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSearched(true)
    setLoading(false)
  }

  const getCurrentStepIndex = () => {
    return statusSteps.findIndex((step) => step.id === applicationData.status)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">ECOWAS Summit</span>
          </Link>

          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
            Have an account? <span className="text-primary font-medium">Sign in</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Application</h1>
          <p className="text-muted-foreground">Enter your application reference number to check the status</p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-xl p-6 mb-8"
        >
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="applicationId">Application Reference Number</Label>
              <Input
                id="applicationId"
                placeholder="e.g., ECO-2026-00142"
                value={applicationId}
                onChange={(e) => setApplicationId(e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="flex items-end">
              <GradientButton onClick={handleSearch} loading={loading} disabled={!applicationId}>
                Track Status
              </GradientButton>
            </div>
          </div>
        </motion.div>

        {/* Status Results */}
        {searched && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Application Summary */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{applicationData.name}</h2>
                  <p className="text-muted-foreground">{applicationData.organization}</p>
                  <p className="text-sm font-mono text-muted-foreground mt-1">{applicationData.id}</p>
                </div>
                <div className="text-right">
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      applicationData.status === "approved"
                        ? "bg-success/10 text-success"
                        : applicationData.status === "rejected"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-warning/10 text-warning"
                    }`}
                  >
                    {applicationData.status === "security_pending" && <Shield className="w-4 h-4" />}
                    {applicationData.status === "approved" && <CheckCircle2 className="w-4 h-4" />}
                    {applicationData.status === "under_review" && <Clock className="w-4 h-4" />}
                    <span className="font-medium capitalize">{applicationData.status.replace("_", " ")}</span>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative">
                <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(getCurrentStepIndex() / (statusSteps.length - 1)) * 100}%` }}
                  />
                </div>

                <div className="relative flex justify-between">
                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= getCurrentStepIndex()
                    const isCurrent = index === getCurrentStepIndex()

                    return (
                      <div key={step.id} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all ${
                            isCompleted
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground border-2 border-border"
                          } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                        >
                          {isCompleted && index < getCurrentStepIndex() ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                        <p
                          className={`text-sm font-medium mt-2 ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground text-center max-w-[120px]">{step.description}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-6">
              <h3 className="font-semibold mb-4">Application Timeline</h3>
              <div className="space-y-4">
                {applicationData.timeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {event.status === "submitted" && <FileText className="w-4 h-4 text-primary" />}
                        {event.status === "under_review" && <Clock className="w-4 h-4 text-primary" />}
                        {event.status === "security_pending" && <Shield className="w-4 h-4 text-primary" />}
                        {event.status === "approved" && <CheckCircle2 className="w-4 h-4 text-success" />}
                      </div>
                      {index < applicationData.timeline.length - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-medium">{event.message}</p>
                      <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleString()}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-card rounded-2xl border border-border shadow-xl p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                  <Download className="w-5 h-5" />
                  <span>Download Receipt</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                  <MessageSquare className="w-5 h-5" />
                  <span>Contact Support</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2 bg-transparent">
                  <RefreshCw className="w-5 h-5" />
                  <span>Update Application</span>
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-warning/10 border border-warning/20">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-warning">Security Verification in Progress</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your application is currently undergoing security verification. This process typically takes 3-5
                  business days. You will be notified once the verification is complete.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground">
            Need help?{" "}
            <Link href="/help" className="text-primary hover:underline">
              Visit our Help Center
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </motion.div>
      </main>
    </div>
  )
}
