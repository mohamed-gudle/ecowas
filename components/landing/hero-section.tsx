"use client"

import { motion } from "framer-motion"
import { ArrowRight, Calendar, MapPin, Users, Play, Sparkles, TrendingUp } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/abuja-international-conference-centre-modern-archi.jpg"
          alt="Abuja International Conference Centre"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Animated geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] border border-primary/10 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] border border-accent/10 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 flex-wrap"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">April 14-17, 2026</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Abuja, Nigeria</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                <span className="block">ECOWAS</span>
                <span className="block gradient-text">Investment &</span>
                <span className="block">Economic</span>
                <span className="block text-primary/80">Summit 2026</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              The premier gathering of West African leaders, global investors, and innovators. Four transformative days
              of high-impact sessions, investment matchmaking, and regional economic collaboration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/register">
                <GradientButton
                  size="lg"
                  className="rounded-full px-8 text-base"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Register Now
                </GradientButton>
              </Link>
              <Link href="/agenda">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-base gap-2 bg-transparent border-2"
                >
                  <Play className="w-5 h-5" />
                  View Programme
                </Button>
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-8 pt-4"
            >
              {[
                { value: "5,000+", label: "Expected Delegates" },
                { value: "15", label: "ECOWAS Nations" },
                { value: "200+", label: "Sessions" },
                { value: "$50B+", label: "Investment Pipeline" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative h-[600px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-80 bg-card/90 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Opening Day
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium">Plenary</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Opening Ceremony</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Heads of State addresses and regional development roadmap unveiling
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Apr 14, 9:00 AM
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  2,000 seats
                </span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/3 left-0 w-72 bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl rounded-3xl border border-primary/20 shadow-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold">Investment Day</h4>
                  <p className="text-xs text-muted-foreground">April 16, 2026</p>
                </div>
              </div>
              <div className="space-y-2">
                {["Energy & Power", "Transport", "Agriculture", "Digital"].map((track) => (
                  <div key={track} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>{track}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Investment Highlight Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.7 }}
              className="absolute bottom-32 right-16 w-72 bg-gradient-to-br from-accent/20 to-primary/20 backdrop-blur-xl rounded-2xl border border-accent/20 shadow-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Investment Pipeline</p>
                  <p className="font-bold text-lg">$50 Billion+</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-background/50">
                  <p className="text-muted-foreground">Projects</p>
                  <p className="font-bold">500+</p>
                </div>
                <div className="p-2 rounded-lg bg-background/50">
                  <p className="text-muted-foreground">Investors</p>
                  <p className="font-bold">200+</p>
                </div>
              </div>
            </motion.div>

            {/* Live Indicator Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-8 right-0 w-64 bg-card/90 backdrop-blur-xl rounded-2xl border border-border/50 shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Registration Status</p>
                  <p className="font-bold text-green-500">Open Now</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
