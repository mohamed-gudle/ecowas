"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Search,
  HelpCircle,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  Shield,
  CreditCard,
  Calendar,
  Users,
  Globe,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

const categories = [
  { id: "registration", label: "Registration", icon: FileText, count: 12 },
  { id: "accreditation", label: "Accreditation", icon: Shield, count: 8 },
  { id: "payment", label: "Payment & Fees", icon: CreditCard, count: 6 },
  { id: "programme", label: "Programme", icon: Calendar, count: 10 },
  { id: "travel", label: "Travel & Visa", icon: Globe, count: 9 },
  { id: "networking", label: "Networking", icon: Users, count: 5 },
]

const faqs = [
  {
    question: "How do I register for the ECOWAS Summit 2026?",
    answer:
      "You can register by clicking the 'Register Now' button on our homepage. The registration process involves selecting your attendee category, providing personal and organizational information, uploading required documents, and completing payment if applicable.",
    category: "registration",
  },
  {
    question: "What documents are required for accreditation?",
    answer:
      "Required documents include: a valid passport copy, a professional headshot photo, and a letter of nomination from your organization (for government delegates). Media representatives must also provide press credentials.",
    category: "accreditation",
  },
  {
    question: "How long does the accreditation process take?",
    answer:
      "The standard accreditation process takes 3-5 business days. Applications requiring security verification may take up to 10 business days. We recommend applying at least 4 weeks before the summit.",
    category: "accreditation",
  },
  {
    question: "What are the registration fees?",
    answer:
      "Registration fees vary by category: Government delegates and ECOWAS officials attend free of charge. Private sector participants pay $500, NGOs pay $250, and media representatives pay $150. Early bird discounts are available until March 15, 2026.",
    category: "payment",
  },
  {
    question: "Do I need a visa to attend the summit?",
    answer:
      "ECOWAS nationals do not require a visa to enter Nigeria. Non-ECOWAS nationals should check visa requirements with the Nigerian embassy in their country. We provide invitation letters for visa applications upon successful registration.",
    category: "travel",
  },
  {
    question: "How can I schedule meetings with investors?",
    answer:
      "Use the Virtual Dealroom platform to browse investor profiles and send meeting requests. Investors will review your project details and accept or decline requests. Confirmed meetings will appear in your summit schedule.",
    category: "networking",
  },
]

export default function HelpContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to common questions or get in touch with our support team
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search for answers..."
                className="pl-12 h-14 text-lg rounded-full shadow-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? "all" : category.id)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  selectedCategory === category.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <category.icon
                  className={`w-6 h-6 mx-auto mb-2 ${selectedCategory === category.id ? "text-primary" : "text-muted-foreground"}`}
                />
                <p className="font-medium text-sm">{category.label}</p>
                <p className="text-xs text-muted-foreground">{category.count} articles</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <AccordionItem value={`faq-${index}`} className="border border-border rounded-xl px-6">
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="text-muted-foreground">Our support team is here to assist you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/contact" className="group">
              <div className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Contact Form</h3>
                <p className="text-sm text-muted-foreground mb-4">Submit a support request</p>
                <span className="text-primary text-sm inline-flex items-center gap-1">
                  Send Message <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            <a href="mailto:support@ecowas-summit.org" className="group">
              <div className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-4">support@ecowas-summit.org</p>
                <span className="text-accent text-sm inline-flex items-center gap-1">
                  Send Email <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </a>

            <a href="tel:+2349012345678" className="group">
              <div className="bg-card rounded-2xl border border-border p-6 text-center hover:shadow-lg transition-all h-full">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-4">+234 901 234 5678</p>
                <span className="text-green-500 text-sm inline-flex items-center gap-1">
                  Call Now <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
