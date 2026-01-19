"use client"

import { motion } from "framer-motion"
import { FileText, Download, Calendar, Plus, Search, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const publications = [
  {
    id: 1,
    title: "Summit Programme Book",
    type: "PDF",
    pages: 48,
    size: "12.5 MB",
    downloads: 1240,
    date: "2024-01-15",
  },
  {
    id: 2,
    title: "Investment Opportunities Guide",
    type: "PDF",
    pages: 64,
    size: "18.2 MB",
    downloads: 890,
    date: "2024-01-12",
  },
  {
    id: 3,
    title: "Country Profiles Compendium",
    type: "PDF",
    pages: 156,
    size: "45 MB",
    downloads: 2100,
    date: "2024-01-10",
  },
  {
    id: 4,
    title: "Climate Action Framework",
    type: "PDF",
    pages: 32,
    size: "8.5 MB",
    downloads: 560,
    date: "2024-01-08",
  },
  { id: 5, title: "Delegate Handbook", type: "PDF", pages: 24, size: "5.2 MB", downloads: 3200, date: "2024-01-05" },
]

export default function PublicationsPage() {
  return (
    <div className="min-h-screen">
      <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Publications</h1>
          <p className="text-muted-foreground">Official summit publications and documents</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Publication
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search publications..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {publications.map((pub, index) => (
          <motion.div
            key={pub.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{pub.title}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Badge variant="outline">{pub.type}</Badge>
                      <span>{pub.pages} pages</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{pub.size}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" /> {pub.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {pub.date}
                    </span>
                  </div>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-1" /> Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>

      </div>

    </div>
  )
}
