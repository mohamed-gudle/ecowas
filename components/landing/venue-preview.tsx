"use client"

import { motion } from "framer-motion"
import { MapPin, Plane, Hotel, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function VenuePreview() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="/abuja-international-conference-centre-interior-mod.jpg"
                alt="Abuja International Conference Centre"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Floating info card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-card/95 backdrop-blur-xl rounded-2xl p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">Abuja International Conference Centre</h4>
                    <p className="text-sm text-muted-foreground">Herbert Macaulay Way, Central Business District</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-sm font-medium text-primary mb-4 block">Venue & Travel</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to <span className="gradient-text">Abuja</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Nigeria&apos;s capital city offers world-class conference facilities, excellent connectivity, and warm
                African hospitality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Plane, label: "Direct Flights", value: "50+ Airlines" },
                { icon: Hotel, label: "Partner Hotels", value: "15+ Options" },
                { icon: Calendar, label: "Summit Duration", value: "4 Days" },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-2xl p-4 text-center">
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="font-bold">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/venue">
                <Button variant="outline" size="lg" className="rounded-full gap-2 bg-transparent">
                  <MapPin className="w-5 h-5" />
                  View Venue Details
                </Button>
              </Link>
              <Link href="/venue#hotels">
                <Button variant="ghost" size="lg" className="rounded-full gap-2">
                  Book Accommodation <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
