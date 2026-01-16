"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Twitter, Linkedin, Youtube, Instagram, Facebook } from "lucide-react"

const footerLinks = {
  summit: [
    { name: "About", href: "/about" },
    { name: "Agenda", href: "/agenda" },
    { name: "Speakers", href: "/speakers" },
    { name: "Venue & Travel", href: "/venue" },
  ],
  attend: [
    { name: "Register", href: "/register" },
    { name: "Media Center", href: "/media" },
  ],
  platform: [
    { name: "Virtual Dealroom", href: "/dealroom" },
    { name: "Secretariat Portal", href: "/dashboard" },
    { name: "Speaker Hub", href: "/speaker" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center overflow-hidden">
                  <Image src="/ecowas-emblem-gold.jpg" alt="ECOWAS" width={32} height={32} className="object-contain" />
                </div>
                <div>
                  <span className="text-lg font-bold block">ECOWAS Summit</span>
                  <span className="text-sm text-sidebar-foreground/70">2026</span>
                </div>
              </div>
              <p className="text-sidebar-foreground/70 text-sm leading-relaxed">
                The premier platform for economic development, investment mobilization, and regional integration across
                West Africa.
              </p>
              <div className="space-y-3 text-sm text-sidebar-foreground/70">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Abuja International Conference Centre, Nigeria</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>info@ecowassummit2026.org</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+234 800 000 0000</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-sidebar-foreground">Summit</h4>
            <ul className="space-y-3">
              {footerLinks.summit.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sidebar-foreground">Attend</h4>
            <ul className="space-y-3">
              {footerLinks.attend.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sidebar-foreground">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners */}
        <div className="border-t border-sidebar-border py-8 mb-8">
          <p className="text-sm text-sidebar-foreground/50 text-center mb-6">Organized by</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-70">
            {["ECOWAS Commission", "African Development Bank", "African Union", "United Nations"].map((partner) => (
              <div key={partner} className="text-sm font-medium text-sidebar-foreground/70">
                {partner}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-sidebar-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-sidebar-foreground/50">
            © 2026 ECOWAS Economic Development Summit. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="w-10 h-10 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground/70 hover:bg-primary hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
