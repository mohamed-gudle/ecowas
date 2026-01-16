"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { GradientButton } from "@/components/ui/gradient-button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Globe, TrendingUp, Award, Handshake } from "lucide-react"

const objectives = [
  {
    icon: TrendingUp,
    title: "Economic Growth",
    description: "Accelerate sustainable economic development across all 15 ECOWAS member states",
  },
  {
    icon: Handshake,
    title: "Investment Mobilization",
    description: "Facilitate $50 billion in investment commitments across key sectors",
  },
  {
    icon: Globe,
    title: "Regional Integration",
    description: "Strengthen trade corridors and infrastructure connectivity",
  },
  {
    icon: Users,
    title: "Youth Empowerment",
    description: "Create pathways for youth entrepreneurship and employment",
  },
  {
    icon: Award,
    title: "Best Practices",
    description: "Share successful development models and policy frameworks",
  },
  {
    icon: Target,
    title: "SDG Alignment",
    description: "Align regional priorities with UN Sustainable Development Goals",
  },
]

const stats = [
  { value: "15", label: "Member States" },
  { value: "400M+", label: "Population Served" },
  { value: "$50B", label: "Investment Target" },
  { value: "5,000+", label: "Expected Delegates" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About the Summit
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Building Prosperity{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Across West Africa
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The ECOWAS Economic Development Summit 2026 brings together heads of state, ministers, investors, and
              development partners to chart a course for sustainable growth and regional integration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                Our Mission
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">
                Transforming Vision into{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Action</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Under the theme &quot;Building Prosperity Across West Africa,&quot; this summit represents a pivotal
                moment for our region. We are bringing together the most influential decision-makers, innovative
                entrepreneurs, and committed investors to forge partnerships that will drive economic transformation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From energy and infrastructure to digital innovation and agriculture, we are creating pathways for
                sustainable development that will benefit over 400 million citizens across our member states.
              </p>
              <Link href="/register">
                <GradientButton size="lg" className="rounded-full">
                  Join Us in Abuja
                </GradientButton>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/african-leaders-summit-meeting-in-modern-conferenc.jpg" alt="Summit Meeting" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background">
                <Image src="/ecowas-emblem-gold-official.jpg" alt="ECOWAS Emblem" fill className="object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Summit Objectives
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Aim to Achieve</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Six key pillars guiding our collective effort toward regional prosperity
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                      <objective.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{objective.title}</h3>
                    <p className="text-muted-foreground">{objective.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
            <div className="absolute inset-0 bg-[url('/abstract-geometric-pattern-african.jpg')] opacity-10" />
            <div className="relative z-10 py-16 px-8 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Be Part of History</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of delegates shaping the future of West Africa&apos;s economy
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <GradientButton size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 border-0">
                    Register as Delegate
                  </GradientButton>
                </Link>
                <Link href="/agenda">
                  <GradientButton
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white text-white hover:bg-white/10"
                  >
                    View Agenda
                  </GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
