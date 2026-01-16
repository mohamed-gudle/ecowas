"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  QrCode,
  Fingerprint,
  Users,
  Calendar,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GradientButton } from "@/components/ui/gradient-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DelegateLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/portal"
    }, 1500)
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
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Delegate Portal</h1>
              <p className="text-muted-foreground">Access your summit experience, agenda, and networking</p>
            </div>

            {/* Login Tabs */}
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="email">Email Login</TabsTrigger>
                <TabsTrigger value="badge">Badge Scan</TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-6 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="delegate@example.com"
                        className="pl-10 h-12 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
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
                    {isLoading ? "Signing in..." : "Sign In to Portal"}
                  </GradientButton>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 rounded-xl gap-2 bg-transparent">
                    <Fingerprint className="w-5 h-5" />
                    Biometric
                  </Button>
                  <Button variant="outline" className="h-12 rounded-xl gap-2 bg-transparent">
                    <Smartphone className="w-5 h-5" />
                    OTP
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="badge" className="mt-6">
                <div className="text-center space-y-6 py-8">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl flex items-center justify-center border-2 border-dashed border-primary/30">
                    <QrCode className="w-24 h-24 text-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Scan Your Badge QR</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      Open the ECOWAS Summit mobile app and scan your badge QR code for instant access
                    </p>
                  </div>
                  <Button variant="outline" className="rounded-full bg-transparent">
                    Open Mobile App
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Register Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Register for the Summit
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/abuja-international-conference-centre-modern-archi.jpg"
            alt="Summit Venue"
            fill
            className="object-cover opacity-20"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
              <Image src="/ecowas-emblem-gold.jpg" alt="ECOWAS" width={60} height={60} className="object-contain" />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">ECOWAS Summit 2026</h2>
              <p className="text-muted-foreground">Your gateway to West Africa&apos;s economic future</p>
            </div>

            {/* Feature Cards */}
            <div className="space-y-4 max-w-sm">
              {[
                { icon: Calendar, title: "200+ Sessions", desc: "Curated for your interests" },
                { icon: Users, title: "5,000+ Delegates", desc: "Network with leaders" },
                { icon: MapPin, title: "Venue Navigation", desc: "Never get lost" },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{feature.title}</p>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile App CTA */}
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <Smartphone className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="font-medium">Download the Mobile App</p>
                  <p className="text-sm text-muted-foreground">Available on iOS & Android</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
