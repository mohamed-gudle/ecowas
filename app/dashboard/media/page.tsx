"use client"
import { motion } from "framer-motion"
import { Newspaper, Camera, Eye, Calendar, Users, TrendingUp, Plus, Search, Filter, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const pressReleases = [
  {
    id: 1,
    title: "ECOWAS Summit 2024 to Focus on Regional Economic Integration",
    date: "2024-01-15",
    status: "published",
    views: 2450,
  },
  {
    id: 2,
    title: "Over 30 Heads of State Confirmed for Abuja Summit",
    date: "2024-01-12",
    status: "published",
    views: 1890,
  },
  {
    id: 3,
    title: "Summit Investment Pipeline Reaches $50 Billion",
    date: "2024-01-10",
    status: "published",
    views: 3200,
  },
  { id: 4, title: "Youth Climate Action Forum Announced as Side Event", date: "2024-01-08", status: "draft", views: 0 },
  {
    id: 5,
    title: "Registration Now Open for Media Accreditation",
    date: "2024-01-05",
    status: "published",
    views: 1560,
  },
]

export default function MediaCenterPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Media Center</h1>
          <p className="text-muted-foreground">Press releases, assets, and media management</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Press Release
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Press Releases</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Accredited Media</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Camera className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Media Assets</p>
                <p className="text-2xl font-bold">340</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">45.2K</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search press releases..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Press Releases */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Press Releases</CardTitle>
          <CardDescription>Manage and publish press releases</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {pressReleases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium truncate">{release.title}</h3>
                  <Badge variant={release.status === "published" ? "default" : "secondary"}>{release.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {release.date}
                  </span>
                  {release.status === "published" && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {release.views.toLocaleString()} views
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
    </div>
  </div>
  )
}
