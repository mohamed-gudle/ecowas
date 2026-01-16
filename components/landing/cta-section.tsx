"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Calendar, Users, Briefcase } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10" />

      {/* Animated shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full border border-primary/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full border border-accent/20"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Registration Now Open</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join the Movement for
            <span className="block gradient-text">West Africa&apos;s Prosperity</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Be part of the largest economic development summit in West Africa. Connect with leaders, access investment
            opportunities, and shape the future.
          </p>

          {/* Registration Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Users,
                title: "Delegate",
                description: "Full access to all sessions and networking",
                link: "/register?type=delegate",
              },
              {
                icon: Briefcase,
                title: "Investor",
                description: "Dealroom access and project matchmaking",
                link: "/register?type=investor",
              },
              {
                icon: Calendar,
                title: "Virtual",
                description: "Live streaming and online participation",
                link: "/register?type=virtual",
              },
            ].map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={option.link}>
                  <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all group">
                    <option.icon className="w-10 h-10 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-bold mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <GradientButton size="lg" className="rounded-full px-8" icon={<ArrowRight className="w-5 h-5" />}>
                Register Now
              </GradientButton>
            </Link>
            <Link href="/dealroom">
              <GradientButton variant="outline" size="lg" className="rounded-full px-8">
                Submit Investment Project
              </GradientButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
