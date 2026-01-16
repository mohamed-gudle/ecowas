"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Ticket } from "lucide-react"
import Link from "next/link"
import { GradientButton } from "@/components/ui/gradient-button"

const targetDate = new Date("2026-04-14T09:00:00")

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ]

  return (
    <section className="py-20 relative overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />
      </div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">April 14-17, 2026</span>
            <span className="text-muted-foreground">|</span>
            <MapPin className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Abuja, Nigeria</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Summit Begins In</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join 5,000+ delegates from across West Africa and beyond for four transformative days
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl bg-card border border-border shadow-2xl flex items-center justify-center">
                  <span className="text-3xl md:text-5xl font-bold gradient-text">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <span className="text-sm text-muted-foreground font-medium mt-3">{unit.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/register">
            <GradientButton size="lg" className="rounded-full px-8" icon={<Ticket className="w-5 h-5" />}>
              Secure Your Spot
            </GradientButton>
          </Link>
          <p className="text-sm text-muted-foreground mt-4">Early bird registration closes March 15, 2026</p>
        </motion.div>
      </div>
    </section>
  )
}
