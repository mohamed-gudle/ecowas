"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { GradientButton } from "@/components/ui/gradient-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Plane, Car, Hotel, Utensils, Wifi, Shield, Star } from "lucide-react"

const hotels = [
  {
    name: "Transcorp Hilton Abuja",
    rating: 5,
    distance: "5 min drive",
    price: "From $250/night",
    image: "/luxury-hotel-abuja-nigeria-exterior.jpg",
    amenities: ["Shuttle Service", "Business Center", "Spa"],
    discount: "15% Summit Discount",
  },
  {
    name: "Sheraton Abuja Hotel",
    rating: 5,
    distance: "10 min drive",
    price: "From $220/night",
    image: "/sheraton-hotel-modern-exterior.jpg",
    amenities: ["Pool", "Gym", "Restaurant"],
    discount: "10% Summit Discount",
  },
  {
    name: "BON Hotel Abuja",
    rating: 4,
    distance: "8 min drive",
    price: "From $150/night",
    image: "/modern-business-hotel-exterior.jpg",
    amenities: ["Free Wifi", "Parking", "Breakfast"],
    discount: "20% Summit Discount",
  },
]

const transportOptions = [
  {
    icon: Plane,
    title: "By Air",
    description:
      "Nnamdi Azikiwe International Airport (ABV) is 40km from the venue. Direct flights from major African and international cities.",
  },
  {
    icon: Car,
    title: "Ground Transport",
    description:
      "Official summit shuttle services will operate from partner hotels. VIP car services available on request.",
  },
]

const venueFeatures = [
  { icon: Wifi, label: "High-Speed WiFi" },
  { icon: Shield, label: "24/7 Security" },
  { icon: Utensils, label: "On-site Dining" },
  { icon: Hotel, label: "VIP Lounges" },
]

export default function VenuePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/abuja-international-conference-centre-exterior-mod.jpg" alt="Venue" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Venue & Travel
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Abuja International{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Conference Centre
              </span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Nigeria&apos;s premier conference facility, offering world-class amenities in the heart of Africa&apos;s
              most rapidly developing capital city.
            </p>
            <div className="flex flex-wrap gap-4 items-center text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Herbert Macaulay Way, Central Business District, Abuja</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venue Features */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {venueFeatures.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6 bg-card/50 backdrop-blur border-border/50">
                  <feature.icon className="w-10 h-10 mx-auto mb-4 text-primary" />
                  <p className="font-medium">{feature.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Conference Hall"
                  width={800}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">World-Class Facilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Abuja International Conference Centre offers state-of-the-art facilities designed to host
                international summits and high-level events. With capacity for over 5,000 delegates, multiple breakout
                rooms, and advanced AV technology, it provides the perfect setting for the ECOWAS Economic Development
                Summit.
              </p>
              <ul className="space-y-3">
                {[
                  "Main plenary hall seating 2,500",
                  "12 breakout rooms for parallel sessions",
                  "Exhibition space of 3,000 sqm",
                  "VIP lounges and bilateral meeting rooms",
                  "Press center with 200 workstations",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Getting There</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multiple transportation options to ensure a smooth journey to the summit
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {transportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur border-border/50">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                      <option.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                    <p className="text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-20" id="hotels">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Partner Hotels</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Special rates negotiated for summit delegates at premium hotels near the venue
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full overflow-hidden bg-card/50 backdrop-blur border-border/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-[4/3]">
                    <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary text-white">{hotel.discount}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: hotel.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{hotel.distance}</span>
                      <span className="font-semibold text-foreground">{hotel.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity) => (
                        <Badge key={amenity} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Need Assistance?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground mb-6">
                Our logistics team is here to help with your travel arrangements
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+234 800 000 0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">travel@ecowassummit.org</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 text-center">
                <Link href="/register">
                  <GradientButton className="rounded-full">Register & Book Accommodation</GradientButton>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
