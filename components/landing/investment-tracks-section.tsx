"use client"

import { motion } from "framer-motion"
import { Zap, Truck, Wheat, Laptop, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { GradientButton } from "@/components/ui/gradient-button"

const tracks = [
  {
    icon: Zap,
    name: "Energy & Power",
    description: "Renewable energy, power generation, and grid infrastructure projects",
    pipeline: "$18.5B",
    projects: 45,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
  },
  {
    icon: Truck,
    name: "Transport & Logistics",
    description: "Roads, railways, ports, and regional connectivity infrastructure",
    pipeline: "$12.3B",
    projects: 32,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
  },
  {
    icon: Wheat,
    name: "Agriculture & Food",
    description: "Agribusiness, food processing, and agricultural value chains",
    pipeline: "$8.7B",
    projects: 58,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
  },
  {
    icon: Laptop,
    name: "Digital Economy",
    description: "Tech startups, digital infrastructure, and fintech solutions",
    pipeline: "$6.2B",
    projects: 120,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
  },
  {
    icon: Building2,
    name: "Finance & Banking",
    description: "Financial services, banking infrastructure, and capital markets",
    pipeline: "$4.8B",
    projects: 25,
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
    textColor: "text-teal-500",
  },
]

export function InvestmentTracksSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-primary mb-4 block">Virtual Dealroom</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">$50+ Billion</span> Investment Pipeline
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with bankable projects across five priority sectors. Our AI-powered matchmaking connects investors
            with the right opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tracks.map((track, index) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-card rounded-3xl border border-border/50 p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl ${track.bgColor} flex items-center justify-center mb-6`}>
                  <track.icon className={`w-7 h-7 ${track.textColor}`} />
                </div>

                <h3 className="text-xl font-bold mb-2">{track.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{track.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <p className="text-2xl font-bold text-primary">{track.pipeline}</p>
                    <p className="text-xs text-muted-foreground">Pipeline Value</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{track.projects}</p>
                    <p className="text-xs text-muted-foreground">Projects</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="relative bg-gradient-to-br from-primary to-accent rounded-3xl p-8 flex flex-col justify-center items-center text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Invest?</h3>
            <p className="text-white/80 mb-6">
              Access our curated pipeline of investment-ready projects with full due diligence packages.
            </p>
            <Link href="/dealroom">
              <GradientButton variant="secondary" className="bg-white text-primary hover:bg-white/90 rounded-full">
                Explore Dealroom <ArrowRight className="w-5 h-5 ml-2" />
              </GradientButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
