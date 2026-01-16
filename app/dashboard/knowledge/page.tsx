"use client"

import { motion } from "framer-motion"
import { FileText, Folder, Search, Filter, Download, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const folders = [
  { id: 1, name: "Summit Briefs", files: 24, lastUpdated: "2 hours ago", color: "bg-blue-500" },
  { id: 2, name: "Country Profiles", files: 15, lastUpdated: "1 day ago", color: "bg-green-500" },
  { id: 3, name: "Policy Documents", files: 32, lastUpdated: "3 hours ago", color: "bg-amber-500" },
  { id: 4, name: "Meeting Minutes", files: 48, lastUpdated: "30 mins ago", color: "bg-purple-500" },
  { id: 5, name: "Templates", files: 12, lastUpdated: "1 week ago", color: "bg-pink-500" },
  { id: 6, name: "Archive", files: 156, lastUpdated: "2 weeks ago", color: "bg-gray-500" },
]

const recentDocuments = [
  { id: 1, name: "Summit Programme Draft v3.pdf", folder: "Summit Briefs", size: "2.4 MB", date: "2024-01-15" },
  { id: 2, name: "Nigeria Country Profile.docx", folder: "Country Profiles", size: "1.8 MB", date: "2024-01-14" },
  { id: 3, name: "Climate Action Framework.pdf", folder: "Policy Documents", size: "4.2 MB", date: "2024-01-13" },
  { id: 4, name: "Steering Committee Minutes.pdf", folder: "Meeting Minutes", size: "890 KB", date: "2024-01-12" },
]

export default function KnowledgeHubPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Hub</h1>
          <p className="text-muted-foreground">Documents, briefs, and reference materials</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent text-white">
          <Plus className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search documents..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </div>

      {/* Folders */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Folders</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {folders.map((folder, index) => (
            <motion.div
              key={folder.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-lg ${folder.color} flex items-center justify-center mx-auto mb-3`}>
                    <Folder className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-medium text-sm truncate">{folder.name}</h3>
                  <p className="text-xs text-muted-foreground">{folder.files} files</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Documents */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentDocuments.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.folder} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{doc.date}</span>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
