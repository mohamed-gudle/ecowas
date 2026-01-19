"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Crown, Shield, Hotel, MapPin, Users, Calendar, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const headsOfState = [
  {
    id: 1,
    name: "H.E. Bola Ahmed Tinubu",
    country: "Nigeria",
    flag: "🇳🇬",
    status: "Confirmed",
    arrivalDate: "2026-03-14",
    arrivalTime: "14:30",
    departureDate: "2026-03-17",
    hotel: "Presidential Villa",
    security: "Full Detail",
    delegation: 45,
    bilateralsScheduled: 8,
  },
  {
    id: 2,
    name: "H.E. Nana Akufo-Addo",
    country: "Ghana",
    flag: "🇬🇭",
    status: "Confirmed",
    arrivalDate: "2026-03-14",
    arrivalTime: "10:15",
    departureDate: "2026-03-16",
    hotel: "Transcorp Hilton",
    security: "Full Detail",
    delegation: 32,
    bilateralsScheduled: 6,
  },
  {
    id: 3,
    name: "H.E. Macky Sall",
    country: "Senegal",
    flag: "🇸🇳",
    status: "Confirmed",
    arrivalDate: "2026-03-14",
    arrivalTime: "16:45",
    departureDate: "2026-03-17",
    hotel: "Transcorp Hilton",
    security: "Full Detail",
    delegation: 28,
    bilateralsScheduled: 5,
  },
  {
    id: 4,
    name: "H.E. Alassane Ouattara",
    country: "Côte d'Ivoire",
    flag: "🇨🇮",
    status: "Pending",
    arrivalDate: "TBD",
    arrivalTime: "TBD",
    departureDate: "TBD",
    hotel: "Presidential Villa",
    security: "Full Detail",
    delegation: 35,
    bilateralsScheduled: 0,
  },
  {
    id: 5,
    name: "H.E. Faure Gnassingbé",
    country: "Togo",
    flag: "🇹🇬",
    status: "Confirmed",
    arrivalDate: "2026-03-14",
    arrivalTime: "11:30",
    departureDate: "2026-03-16",
    hotel: "Sheraton Abuja",
    security: "Full Detail",
    delegation: 22,
    bilateralsScheduled: 4,
  },
]

const motorcadeSchedule = [
  { time: "10:15", event: "Ghana Arrival", location: "Nnamdi Azikiwe Airport", status: "On Schedule" },
  { time: "11:30", event: "Togo Arrival", location: "Nnamdi Azikiwe Airport", status: "On Schedule" },
  { time: "14:30", event: "Nigeria - Opening Ceremony", location: "ICC Abuja", status: "Pending" },
  { time: "16:45", event: "Senegal Arrival", location: "Nnamdi Azikiwe Airport", status: "On Schedule" },
  { time: "18:00", event: "State Dinner Transport", location: "Presidential Villa", status: "Pending" },
]

export default function VIPProtocolPage() {
  const [selectedVIP, setSelectedVIP] = useState<(typeof headsOfState)[0] | null>(null)

  const confirmedCount = headsOfState.filter((h) => h.status === "Confirmed").length
  const totalDelegation = headsOfState.reduce((acc, h) => acc + h.delegation, 0)

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">VIP Protocol</h1>
            <p className="text-muted-foreground">Heads of State & Distinguished Guests Management</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            <Shield className="w-3 h-3 mr-1" />
            Restricted Access
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-500/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Heads of State</p>
                <p className="text-3xl font-bold">
                  {confirmedCount}/{headsOfState.length}
                </p>
                <p className="text-xs text-green-500">Confirmed</p>
              </div>
              <Crown className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Delegation</p>
                <p className="text-3xl font-bold">{totalDelegation}</p>
                <p className="text-xs text-muted-foreground">Delegates</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bilaterals</p>
                <p className="text-3xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">Scheduled</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Security Status</p>
                <p className="text-3xl font-bold">Active</p>
                <p className="text-xs text-green-500">All Clear</p>
              </div>
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="arrivals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="arrivals">Arrivals & Departures</TabsTrigger>
          <TabsTrigger value="motorcade">Motorcade Schedule</TabsTrigger>
          <TabsTrigger value="bilaterals">Bilateral Meetings</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
        </TabsList>

        <TabsContent value="arrivals">
          <Card>
            <CardHeader>
              <CardTitle>Heads of State Schedule</CardTitle>
              <CardDescription>Arrival and departure management</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Head of State</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Arrival</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Delegation</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {headsOfState.map((vip) => (
                    <TableRow key={vip.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{vip.flag}</span>
                          <div>
                            <p className="font-medium">{vip.name}</p>
                            <p className="text-sm text-muted-foreground">{vip.country}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            vip.status === "Confirmed"
                              ? "bg-green-500/10 text-green-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }
                        >
                          {vip.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {vip.arrivalDate !== "TBD" ? (
                          <div>
                            <p className="font-medium">{vip.arrivalDate}</p>
                            <p className="text-sm text-muted-foreground">{vip.arrivalTime}</p>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">TBD</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {vip.departureDate !== "TBD" ? (
                          <p className="font-medium">{vip.departureDate}</p>
                        ) : (
                          <span className="text-muted-foreground">TBD</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Hotel className="w-4 h-4 text-muted-foreground" />
                          {vip.hotel}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{vip.delegation}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="motorcade">
          <Card>
            <CardHeader>
              <CardTitle>Today's Motorcade Schedule</CardTitle>
              <CardDescription>March 14, 2026</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {motorcadeSchedule.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-muted/30"
                  >
                    <div className="w-16 text-center">
                      <p className="text-lg font-bold">{item.time}</p>
                    </div>
                    <div className="w-1 h-12 bg-primary rounded-full" />
                    <div className="flex-1">
                      <p className="font-semibold">{item.event}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        item.status === "On Schedule"
                          ? "border-green-500 text-green-500"
                          : "border-yellow-500 text-yellow-500"
                      }
                    >
                      {item.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bilaterals">
          <Card>
            <CardHeader>
              <CardTitle>Bilateral Meeting Schedule</CardTitle>
              <CardDescription>High-level meetings between heads of state</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Bilateral meetings calendar view coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accommodation">
          <Card>
            <CardHeader>
              <CardTitle>VIP Accommodation</CardTitle>
              <CardDescription>Hotel assignments and room allocations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border bg-gradient-to-br from-yellow-500/5 to-transparent">
                  <div className="flex items-center gap-3 mb-3">
                    <Hotel className="w-6 h-6 text-yellow-500" />
                    <div>
                      <h4 className="font-semibold">Presidential Villa</h4>
                      <p className="text-sm text-muted-foreground">State House Complex</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Assigned Guests</span>
                      <span className="font-medium">2 Heads of State</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Security Level</span>
                      <Badge className="bg-red-500/10 text-red-500">Maximum</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border">
                  <div className="flex items-center gap-3 mb-3">
                    <Hotel className="w-6 h-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Transcorp Hilton</h4>
                      <p className="text-sm text-muted-foreground">Maitama District</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Assigned Guests</span>
                      <span className="font-medium">2 Heads of State</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Security Level</span>
                      <Badge className="bg-orange-500/10 text-orange-500">High</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
    </div>

  )
}
