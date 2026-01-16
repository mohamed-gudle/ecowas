"use client"

import { motion } from "framer-motion"
import { Smartphone, QrCode, Calendar, Users, MapPin, Bell, Star, Download } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"

const features = [
  { icon: QrCode, title: "Digital Badge", desc: "Access your badge instantly" },
  { icon: Calendar, title: "Personal Agenda", desc: "Build your schedule" },
  { icon: Users, title: "Networking", desc: "Connect with attendees" },
  { icon: MapPin, title: "Venue Navigation", desc: "Find your way around" },
  { icon: Bell, title: "Live Updates", desc: "Real-time notifications" },
  { icon: Star, title: "Session Ratings", desc: "Share your feedback" },
]

export function MobileAppSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mobile Experience</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Summit
              <span className="block gradient-text">In Your Pocket</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-lg">
              Download the official ECOWAS Summit app for a seamless experience. Access your badge, build your agenda,
              connect with fellow delegates, and never miss a session.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card/50 border border-border/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton size="lg" className="rounded-full gap-3">
                <Download className="w-5 h-5" />
                Download for iOS
              </GradientButton>
              <Button variant="outline" size="lg" className="rounded-full gap-3 bg-transparent border-2">
                <Download className="w-5 h-5" />
                Download for Android
              </Button>
            </div>

            {/* QR Code */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-border/50 w-fit">
              <div className="w-20 h-20 bg-white rounded-xl p-2">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div>
                <p className="font-medium">Scan to Download</p>
                <p className="text-sm text-muted-foreground">Point your camera at the QR code</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative w-[300px] h-[600px] bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-2xl z-10" />

                  {/* Screen Content */}
                  <div className="h-full pt-8 pb-4 px-4 space-y-4">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-xs text-muted-foreground px-2">
                      <span>9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-primary rounded-sm" />
                        <div className="w-4 h-2 bg-muted rounded-sm" />
                      </div>
                    </div>

                    {/* App Header */}
                    <div className="text-center">
                      <h3 className="font-bold text-lg">ECOWAS Summit</h3>
                      <p className="text-xs text-muted-foreground">Welcome, Dr. Amara</p>
                    </div>

                    {/* Badge Preview */}
                    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-4 border border-primary/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-bold">Dr. Amara Okafor</p>
                          <p className="text-xs text-muted-foreground">Delegate - Nigeria</p>
                        </div>
                      </div>
                      <div className="w-full h-16 bg-white/10 rounded-lg flex items-center justify-center">
                        <QrCode className="w-10 h-10 text-primary/50" />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-4 gap-2">
                      {[Calendar, Users, MapPin, Bell].map((Icon, i) => (
                        <div
                          key={i}
                          className="aspect-square rounded-xl bg-card border border-border/50 flex items-center justify-center"
                        >
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                      ))}
                    </div>

                    {/* Upcoming Session */}
                    <div className="bg-card rounded-xl p-3 border border-border/50">
                      <p className="text-xs text-primary font-medium mb-1">Next Session</p>
                      <p className="font-medium text-sm">Opening Ceremony</p>
                      <p className="text-xs text-muted-foreground">Main Hall • 9:00 AM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-8 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-xl"
              >
                <Bell className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -bottom-4 -left-8 w-16 h-16 bg-card rounded-2xl border border-border flex items-center justify-center shadow-xl"
              >
                <Star className="w-6 h-6 text-yellow-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
