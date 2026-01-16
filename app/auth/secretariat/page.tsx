"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Key,
  Building2,
  LayoutDashboard,
  Users,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GradientButton } from "@/components/ui/gradient-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SecretariatLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"credentials" | "mfa">("credentials")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step === "credentials") {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setStep("mfa")
      }, 1000)
    } else {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        window.location.href = "/dashboard"
      }, 1500)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="flex-1 flex flex-col p-8 lg:p-12">
        {/* Back Link */}
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Secretariat Portal</h1>
              <p className="text-muted-foreground">
                {step === "credentials"
                  ? "Access the command center for summit operations"
                  : "Enter your verification code to continue"}
              </p>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/10 border border-warning/20">
              <Shield className="w-5 h-5 text-warning mt-0.5" />
              <div>
                <p className="font-medium text-sm">Secure Access Required</p>
                <p className="text-xs text-muted-foreground">
                  This portal requires multi-factor authentication and is monitored for security compliance.
                </p>
              </div>
            </div>

            {step === "credentials" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Access Role</Label>
                  <Select defaultValue="programme_lead">
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="head_secretariat">Head of Secretariat</SelectItem>
                      <SelectItem value="programme_lead">Programme Lead</SelectItem>
                      <SelectItem value="security_liaison">Security Liaison</SelectItem>
                      <SelectItem value="ops_lead">Operations Lead</SelectItem>
                      <SelectItem value="finance">Finance Officer</SelectItem>
                      <SelectItem value="media">Media Operations</SelectItem>
                      <SelectItem value="dealroom_admin">Dealroom Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Official Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@ecowas.int"
                      className="pl-10 h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                      Reset password
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <GradientButton type="submit" className="w-full h-12 rounded-xl" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Continue to Verification"}
                </GradientButton>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Key className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
                  </div>

                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <Input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-14 text-center text-2xl font-bold rounded-xl"
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                </div>

                <GradientButton type="submit" className="w-full h-12 rounded-xl" disabled={isLoading}>
                  {isLoading ? "Authenticating..." : "Access Command Center"}
                </GradientButton>

                <Button type="button" variant="ghost" className="w-full" onClick={() => setStep("credentials")}>
                  Back to credentials
                </Button>
              </form>
            )}

            {/* Help Link */}
            <p className="text-center text-sm text-muted-foreground">
              Need access?{" "}
              <Link href="/auth/request-access" className="text-primary font-medium hover:underline">
                Request credentials
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-accent/10 via-background to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Command Center</h2>
              <p className="text-muted-foreground">Complete operational control for the Summit</p>
            </div>

            {/* Module Cards */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
              {[
                { icon: LayoutDashboard, title: "Real-time Dashboard", color: "primary" },
                { icon: Users, title: "5,000+ Applications", color: "accent" },
                { icon: Shield, title: "Security Liaison", color: "warning" },
                { icon: BarChart3, title: "Live Analytics", color: "success" },
              ].map((module, i) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-left"
                >
                  <div className={`w-10 h-10 rounded-xl bg-${module.color}/10 flex items-center justify-center mb-3`}>
                    <module.icon className={`w-5 h-5 text-${module.color}`} />
                  </div>
                  <p className="font-semibold text-sm">{module.title}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats Preview */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 max-w-sm">
              <h3 className="font-semibold mb-4">Live System Status</h3>
              <div className="space-y-3">
                {[
                  { label: "Accreditation Queue", value: "247", status: "processing" },
                  { label: "Sessions Confirmed", value: "186/200", status: "good" },
                  { label: "Overall Readiness", value: "78%", status: "warning" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{stat.value}</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          stat.status === "good"
                            ? "bg-green-500"
                            : stat.status === "warning"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
