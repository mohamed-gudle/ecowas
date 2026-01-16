"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { GradientButton } from "@/components/ui/gradient-button"

const featuredSpeakers = [
  {
    name: "H.E. Bola Ahmed Tinubu",
    title: "President of Nigeria",
    role: "Summit Host & Keynote",
    image: "/african-head-of-state-formal-portrait-professional.jpg",
  },
  {
    name: "Dr. Omar Alieu Touray",
    title: "President, ECOWAS Commission",
    role: "Opening Address",
    image: "/african-diplomat-formal-portrait-professional-suit.jpg",
  },
  {
    name: "Dr. Akinwumi Adesina",
    title: "President, African Development Bank",
    role: "Investment Keynote",
    image: "/african-finance-executive-formal-portrait-professi.jpg",
  },
  {
    name: "Amina J. Mohammed",
    title: "Deputy Secretary-General, UN",
    role: "Sustainability Address",
    image: "/african-woman-leader-formal-portrait-professional-.jpg",
  },
]

export function SpeakersPreview() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-primary mb-4 block">Featured Speakers</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hear From <span className="gradient-text">Africa&apos;s Leaders</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Heads of state, ministers, and industry leaders shaping the future of West African economic development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-muted">
                <Image
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-xs font-medium mb-3">
                    {speaker.role}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{speaker.name}</h3>
                  <p className="text-sm text-white/70">{speaker.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/speakers">
            <GradientButton variant="outline" size="lg" className="rounded-full">
              View All 150+ Speakers <ArrowRight className="w-5 h-5 ml-2" />
            </GradientButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
