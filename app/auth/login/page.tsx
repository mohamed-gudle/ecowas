"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Globe, Mail, Lock, Eye, EyeOff, ArrowRight, Fingerprint, Smartphone } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppStore } from "@/lib/store"

export default function LoginPage() {
  const router = useRouter()
  const { setCurrentUser, setAuthenticated } = useAppStore()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"email" | "sso" | "mfa">("email")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [step, setStep] = useState<"credentials" | "mfa">("credentials")
  const [mfaCode, setMfaCode] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Move to MFA step
    setStep("mfa")
    setLoading(false)
  }

  const handleMFASubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate MFA verification
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Set user and redirect
    setCurrentUser({
      id: "1",
      email: formData.email,
      firstName: "John",
      lastName: "Doe",
      organization: "ECOWAS Secretariat",
      country: "Nigeria",
      role: "super_admin",
      accreditationStatus: "approved",
    })
    setAuthenticated(true)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">ECOWAS Summit</span>
          </Link>

          {step === "credentials" ? (
            <>
              <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
              <p className="text-muted-foreground mb-8">Sign in to access the Summit Digital Ecosystem</p>

              {/* Login Method Tabs */}
              <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
                {[
                  { id: "email", label: "Email", icon: Mail },
                  { id: "sso", label: "SSO", icon: Globe },
                  { id: "mfa", label: "Hardware Key", icon: Fingerprint },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setLoginMethod(method.id as typeof loginMethod)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      loginMethod === method.id
                        ? "bg-background shadow-sm text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <method.icon className="w-4 h-4" />
                    {method.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@organization.org"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                    />
                    <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <GradientButton type="submit" className="w-full" loading={loading}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </GradientButton>
              </form>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("credentials")}
                className="text-sm text-muted-foreground hover:text-foreground mb-4 flex items-center gap-2"
              >
                ← Back to login
              </button>

              <h1 className="text-3xl font-bold mb-2">Two-Factor Authentication</h1>
              <p className="text-muted-foreground mb-8">Enter the verification code sent to your device</p>

              <form onSubmit={handleMFASubmit} className="space-y-6">
                <div className="flex items-center justify-center gap-2 mb-4 p-4 rounded-xl bg-muted">
                  <Smartphone className="w-5 h-5 text-primary" />
                  <span className="text-sm">Code sent to ••••••7890</span>
                </div>

                <div className="space-y-2">
                  <Label>Verification Code</Label>
                  <div className="flex gap-2 justify-center">
                    {[...Array(6)].map((_, i) => (
                      <Input
                        key={i}
                        type="text"
                        maxLength={1}
                        className="w-12 h-12 text-center text-xl font-bold"
                        value={mfaCode[i] || ""}
                        onChange={(e) => {
                          const newCode = mfaCode.split("")
                          newCode[i] = e.target.value
                          setMfaCode(newCode.join(""))
                          // Auto-focus next input
                          if (e.target.value && e.target.nextElementSibling) {
                            ;(e.target.nextElementSibling as HTMLInputElement).focus()
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                <GradientButton type="submit" className="w-full" loading={loading}>
                  Verify & Sign In
                </GradientButton>

                <p className="text-center text-sm text-muted-foreground">
                  Didn&apos;t receive a code?{" "}
                  <button type="button" className="text-primary hover:underline">
                    Resend code
                  </button>
                </p>
              </form>
            </>
          )}

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Apply for Accreditation
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-20 right-20 w-64 h-64 rounded-full border border-primary/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute bottom-20 left-20 w-48 h-48 rounded-full border border-secondary/20"
          />
        </div>

        <div className="relative z-10 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
              <Globe className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-4"
          >
            Summit Digital Ecosystem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Access your personalized dashboard, manage accreditations, coordinate programmes, and connect with
            stakeholders across Africa&apos;s premier climate summit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            {["Security", "Analytics", "Real-time"].map((feature, i) => (
              <div key={feature} className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
