"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Globe, ArrowLeft, Mail, User, Building2, CheckCircle2, Briefcase } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RequestAccessPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div className="w-full max-w-md py-8">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="block font-bold text-xl">ECOWAS Summit</span>
              <span className="block text-xs text-muted-foreground">Secretariat Portal</span>
            </div>
          </Link>

          {!submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Link
                href="/auth/secretariat"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </Link>

              <h1 className="text-3xl font-bold mb-2">Request Access</h1>
              <p className="text-muted-foreground mb-8">
                Submit a request for Secretariat portal access. Your request will be reviewed by the administration.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="firstName" placeholder="John" className="pl-10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="you@ecowas.int" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="department" placeholder="Protocol & Events" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Requested Role</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Programme Manager</SelectItem>
                      <SelectItem value="accreditation">Accreditation Officer</SelectItem>
                      <SelectItem value="logistics">Logistics Coordinator</SelectItem>
                      <SelectItem value="media">Media Officer</SelectItem>
                      <SelectItem value="viewer">Read-Only Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="justification">Justification</Label>
                  <Textarea
                    id="justification"
                    placeholder="Please explain why you need access to the Secretariat portal..."
                    rows={4}
                    required
                  />
                </div>

                <GradientButton type="submit" className="w-full h-12 rounded-xl" loading={loading}>
                  Submit Request
                </GradientButton>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Request Submitted</h2>
              <p className="text-muted-foreground mb-6">
                Your access request has been submitted successfully. You will receive an email once your request has
                been reviewed.
              </p>
              <p className="text-sm text-muted-foreground mb-8">This process typically takes 1-2 business days.</p>
              <Link href="/">
                <Button variant="outline" className="rounded-xl bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Return Home
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent/10 via-primary/10 to-accent/5 items-center justify-center p-12">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <Briefcase className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Secretariat Access</h2>
          <p className="text-muted-foreground">
            The Secretariat portal provides administrative tools for event management, accreditation processing, and
            programme coordination.
          </p>
        </div>
      </div>
    </div>
  )
}
