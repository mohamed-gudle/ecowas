"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  Video,
  FileText,
  Download,
  Search,
  Filter,
  ImageIcon,
  Play,
  ExternalLink,
  Mail,
  Phone,
  User,
  Building,
} from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const pressReleases = [
  {
    id: 1,
    title: "ECOWAS Economic Development Summit 2026 to Mobilize $50 Billion in Investment",
    date: "January 5, 2026",
    excerpt:
      "The ECOWAS Commission announces ambitious investment mobilization targets for the upcoming summit in Abuja.",
    category: "Announcement",
  },
  {
    id: 2,
    title: "African Development Bank Confirms Major Partnership for Summit Investment Track",
    date: "January 8, 2026",
    excerpt: "AfDB to co-host the Investment Day sessions and provide technical support for project preparation.",
    category: "Partnership",
  },
  {
    id: 3,
    title: "Over 50 Heads of State and Government Expected at Abuja Summit",
    date: "January 10, 2026",
    excerpt: "Record attendance expected as regional leaders converge to discuss economic development priorities.",
    category: "Announcement",
  },
]

const mediaAssets = [
  { id: 1, type: "photo", title: "Summit Logo - Primary", format: "PNG, SVG", size: "2.4 MB" },
  { id: 2, type: "photo", title: "Summit Logo - White", format: "PNG, SVG", size: "2.1 MB" },
  { id: 3, type: "photo", title: "Official Banner - Horizontal", format: "PNG, JPG", size: "5.8 MB" },
  { id: 4, type: "photo", title: "Official Banner - Vertical", format: "PNG, JPG", size: "4.2 MB" },
  { id: 5, type: "video", title: "Summit Promo Video - 60s", format: "MP4", size: "125 MB" },
  { id: 6, type: "video", title: "Summit Promo Video - 30s", format: "MP4", size: "62 MB" },
  { id: 7, type: "document", title: "Media Kit 2026", format: "PDF", size: "15.4 MB" },
  { id: 8, type: "document", title: "Fact Sheet", format: "PDF", size: "1.2 MB" },
]

const mediaContacts = [
  {
    name: "Dr. Amara Diallo",
    role: "Director of Communications",
    organization: "ECOWAS Commission",
    email: "a.diallo@ecowas.int",
    phone: "+234 800 123 4567",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Mr. Chukwuemeka Okonkwo",
    role: "Head of Press Relations",
    organization: "Summit Secretariat",
    email: "c.okonkwo@summit2026.org",
    phone: "+234 800 234 5678",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 px-4 py-2">
              <Camera className="w-4 h-4 mr-2" />
              Press & Media
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Media <span className="gradient-text">Center</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access press releases, media assets, accreditation information, and contacts for journalists covering the
              Summit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: FileText, value: "25+", label: "Press Releases" },
              { icon: ImageIcon, value: "500+", label: "Photo Assets" },
              { icon: Video, value: "50+", label: "Video Content" },
              { icon: User, value: "200+", label: "Accredited Media" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-muted/50 rounded-2xl p-1 mb-12 overflow-x-auto">
              <TabsTrigger value="overview" className="rounded-xl px-6">
                Overview
              </TabsTrigger>
              <TabsTrigger value="releases" className="rounded-xl px-6">
                Press Releases
              </TabsTrigger>
              <TabsTrigger value="assets" className="rounded-xl px-6">
                Media Assets
              </TabsTrigger>
              <TabsTrigger value="accreditation" className="rounded-xl px-6">
                Media Accreditation
              </TabsTrigger>
              <TabsTrigger value="contacts" className="rounded-xl px-6">
                Contacts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-12">
              {/* Latest Press Releases */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Latest Press Releases</h2>
                  <Button variant="ghost" onClick={() => setActiveTab("releases")}>
                    View All <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {pressReleases.map((release, index) => (
                    <motion.div
                      key={release.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all cursor-pointer"
                    >
                      <Badge variant="secondary" className="mb-3">
                        {release.category}
                      </Badge>
                      <h3 className="font-bold mb-2 line-clamp-2">{release.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{release.excerpt}</p>
                      <p className="text-xs text-muted-foreground">{release.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Access */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: FileText,
                    title: "Media Kit",
                    description: "Download complete media package",
                    action: "Download",
                  },
                  { icon: ImageIcon, title: "Photo Gallery", description: "High-resolution images", action: "Browse" },
                  { icon: Video, title: "Video Library", description: "B-roll and interviews", action: "Watch" },
                  { icon: User, title: "Media Accreditation", description: "Apply for press access", action: "Apply" },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-border hover:border-primary/30 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                      {item.action} →
                    </Button>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="releases" className="space-y-6">
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search press releases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 rounded-xl"
                  />
                </div>
                <Button variant="outline" className="h-12 rounded-xl gap-2 bg-transparent">
                  <Filter className="w-5 h-5" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {pressReleases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary">{release.category}</Badge>
                          <span className="text-sm text-muted-foreground">{release.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{release.title}</h3>
                        <p className="text-muted-foreground">{release.excerpt}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="assets" className="space-y-6">
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Search media assets..." className="pl-12 h-12 rounded-xl" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mediaAssets.map((asset, index) => (
                  <motion.div
                    key={asset.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden group cursor-pointer hover:border-primary/30 transition-all"
                  >
                    <div className="aspect-video bg-muted relative flex items-center justify-center">
                      {asset.type === "photo" && <ImageIcon className="w-12 h-12 text-muted-foreground" />}
                      {asset.type === "video" && <Play className="w-12 h-12 text-muted-foreground" />}
                      {asset.type === "document" && <FileText className="w-12 h-12 text-muted-foreground" />}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button size="sm" className="rounded-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium mb-1">{asset.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {asset.format} • {asset.size}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accreditation" className="max-w-3xl mx-auto">
              <div className="bg-card rounded-3xl border border-border p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Media Accreditation</h2>
                  <p className="text-muted-foreground">
                    Apply for press credentials to cover the ECOWAS Economic Development Summit 2026.
                  </p>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="bg-muted/50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4">Eligibility Requirements</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Valid press credentials from a recognized media organization
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Letter of assignment from your editor or media house
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Portfolio of previous work covering similar events
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Valid passport and professional identification
                      </li>
                    </ul>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-6">
                    <h3 className="font-bold mb-4">Accreditation Benefits</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        Access to all public sessions and press conferences
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        Dedicated media workspace with high-speed internet
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        Interview scheduling assistance with speakers
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                        Real-time access to press releases and media assets
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center">
                  <Button size="lg" className="rounded-full px-8">
                    Apply for Media Accreditation
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">Application deadline: January 5, 2026</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {mediaContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-3xl border border-border p-6 flex gap-6"
                  >
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                      <Image
                        src={contact.image || "/placeholder.svg"}
                        alt={contact.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{contact.name}</h3>
                      <p className="text-primary text-sm mb-1">{contact.role}</p>
                      <p className="text-sm text-muted-foreground mb-4">{contact.organization}</p>
                      <div className="space-y-1 text-sm">
                        <a
                          href={`mailto:${contact.email}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                          <Mail className="w-4 h-4" />
                          {contact.email}
                        </a>
                        <a
                          href={`tel:${contact.phone}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-3xl p-8 text-center">
                <Building className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Media Center Location</h3>
                <p className="text-muted-foreground mb-4">
                  Ground Floor, Abuja International Conference Centre
                  <br />
                  Herbert Macaulay Way, Central Business District, Abuja
                </p>
                <p className="text-sm text-muted-foreground">
                  Operating Hours: 7:00 AM - 10:00 PM (January 15-18, 2026)
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </main>
  )
}
