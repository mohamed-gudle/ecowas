"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ImageIcon, Video, FileText, Download, Upload, Search, Filter, Grid3X3, List } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const assets = [
  { id: 1, name: "Summit Logo Pack", type: "image", size: "12.5 MB", files: 24, category: "Branding" },
  { id: 2, name: "Opening Ceremony B-Roll", type: "video", size: "1.2 GB", files: 8, category: "Video" },
  { id: 3, name: "Speaker Headshots", type: "image", size: "45 MB", files: 156, category: "Photos" },
  { id: 4, name: "Press Kit 2024", type: "document", size: "8.5 MB", files: 12, category: "Documents" },
  { id: 5, name: "Social Media Templates", type: "image", size: "28 MB", files: 36, category: "Branding" },
  { id: 6, name: "Venue Photos", type: "image", size: "120 MB", files: 48, category: "Photos" },
]

const typeIcons = {
  image: ImageIcon,
  video: Video,
  document: FileText,
}

export default function AssetsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Assets Library</h1>
          <p className="text-muted-foreground">Media assets, logos, and downloadable materials</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Assets
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search assets..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {assets.map((asset, index) => {
          const TypeIcon = typeIcons[asset.type as keyof typeof typeIcons]
          return (
            <motion.div
              key={asset.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <TypeIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{asset.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{asset.category}</Badge>
                        <span className="text-xs text-muted-foreground">{asset.files} files</span>
                        <span className="text-xs text-muted-foreground">{asset.size}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>

      </div>

  )
}
