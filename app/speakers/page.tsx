"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Twitter, Linkedin, Globe } from "lucide-react"

const speakers = [
  {
    id: 1,
    name: "H.E. Bola Ahmed Tinubu",
    title: "President of Nigeria",
    category: "Head of State",
    image: "/african-president-formal-portrait.jpg",
    bio: "Leading Nigeria's economic transformation agenda with focus on regional integration and sustainable development.",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Dr. Omar Alieu Touray",
    title: "President, ECOWAS Commission",
    category: "ECOWAS Leadership",
    image: "/african-diplomat-formal-portrait-man.jpg",
    bio: "Championing regional integration and economic cooperation across West Africa.",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Dr. Akinwumi Adesina",
    title: "President, African Development Bank",
    category: "Keynote Speaker",
    image: "/african-banker-executive-formal-portrait.jpg",
    bio: "Driving Africa's economic transformation through strategic investments and policy innovation.",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 4,
    name: "H.E. Nana Akufo-Addo",
    title: "President of Ghana",
    category: "Head of State",
    image: "/african-statesman-formal-portrait.jpg",
    bio: "Advancing Ghana's position as a hub for investment and innovation in West Africa.",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 5,
    name: "Dr. Ngozi Okonjo-Iweala",
    title: "Director-General, WTO",
    category: "Keynote Speaker",
    image: "/african-woman-executive-formal-portrait.jpg",
    bio: "Global trade leader advocating for Africa's integration into the world economy.",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 6,
    name: "Aliko Dangote",
    title: "Chairman, Dangote Group",
    category: "Industry Leader",
    image: "/african-businessman-billionaire-portrait.jpg",
    bio: "Africa's leading industrialist transforming manufacturing and infrastructure across the continent.",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 7,
    name: "Dr. Amina Mohammed",
    title: "Deputy Secretary-General, UN",
    category: "Keynote Speaker",
    image: "/african-woman-diplomat-un-portrait.jpg",
    bio: "Leading global efforts on sustainable development and climate action.",
    twitter: "#",
    linkedin: "#",
  },
  {
    id: 8,
    name: "Tony Elumelu",
    title: "Chairman, Heirs Holdings",
    category: "Industry Leader",
    image: "/african-entrepreneur-investor-portrait.jpg",
    bio: "Pioneering Africapitalism and empowering the next generation of African entrepreneurs.",
    twitter: "#",
    linkedin: "#",
  },
]

const categories = ["All", "Head of State", "ECOWAS Leadership", "Keynote Speaker", "Industry Leader"]

export default function SpeakersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredSpeakers = speakers.filter((speaker) => {
    const matchesSearch =
      speaker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      speaker.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All" || speaker.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
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
              Distinguished Speakers
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Voices Shaping{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Africa&apos;s Future
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              World leaders, industry pioneers, and visionary thinkers coming together to inspire and drive change
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search speakers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-full bg-muted/50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredSpeakers.map((speaker, index) => (
                <motion.div
                  key={speaker.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group h-full overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={speaker.image || "/placeholder.svg"}
                        alt={speaker.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <Link
                            href={speaker.twitter}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          >
                            <Twitter className="w-5 h-5" />
                          </Link>
                          <Link
                            href={speaker.linkedin}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </Link>
                          <Link
                            href="#"
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                          >
                            <Globe className="w-5 h-5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="mb-3 text-xs">
                        {speaker.category}
                      </Badge>
                      <h3 className="text-lg font-bold mb-1 line-clamp-1">{speaker.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{speaker.title}</p>
                      <p className="text-sm text-muted-foreground/80 line-clamp-2">{speaker.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredSpeakers.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No speakers found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
