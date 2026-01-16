"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Upload,
  Download,
  Eye,
  Trash2,
  Search,
  Filter,
  Grid3X3,
  List,
  File,
  FileImage,
  FileVideo,
  FileType,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  FolderOpen,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const materials = [
  {
    id: "1",
    name: "Opening_Keynote_v3.pptx",
    type: "presentation",
    session: "Opening Ceremony",
    size: "24.5 MB",
    uploadedAt: "2024-03-10 14:30",
    status: "approved",
    version: 3,
  },
  {
    id: "2",
    name: "Speaker_Bio_Amina.pdf",
    type: "document",
    session: "All Sessions",
    size: "156 KB",
    uploadedAt: "2024-03-08 09:15",
    status: "approved",
    version: 1,
  },
  {
    id: "3",
    name: "Session_Abstract_Opening.docx",
    type: "document",
    session: "Opening Ceremony",
    size: "45 KB",
    uploadedAt: "2024-03-09 11:00",
    status: "approved",
    version: 2,
  },
  {
    id: "4",
    name: "Headshot_Official.jpg",
    type: "image",
    session: "All Sessions",
    size: "2.1 MB",
    uploadedAt: "2024-03-07 16:45",
    status: "approved",
    version: 1,
  },
  {
    id: "5",
    name: "Introduction_Video.mp4",
    type: "video",
    session: "Opening Ceremony",
    size: "156 MB",
    uploadedAt: "2024-03-11 10:20",
    status: "under_review",
    version: 1,
  },
]

const getFileIcon = (type: string) => {
  const icons = {
    presentation: FileType,
    document: FileText,
    image: FileImage,
    video: FileVideo,
  }
  return icons[type as keyof typeof icons] || File
}

const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; color: string; icon: typeof CheckCircle2 }> = {
    approved: { label: "Approved", color: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
    under_review: { label: "Under Review", color: "bg-amber-500/10 text-amber-600", icon: Clock },
    rejected: { label: "Changes Requested", color: "bg-red-500/10 text-red-600", icon: AlertCircle },
  }
  return configs[status] || configs.under_review
}

export default function MaterialsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [selectedFile, setSelectedFile] = useState<(typeof materials)[0] | null>(null)

  const filteredMaterials = materials.filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const totalSize = materials.reduce((acc, m) => {
    const size = Number.parseFloat(m.size)
    const unit = m.size.includes("MB") ? 1 : 0.001
    return acc + size * unit
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Presentation Materials</h1>
          <p className="text-muted-foreground">Manage all your session materials and documents</p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)} className="gap-2">
          <Upload className="w-4 h-4" />
          Upload New Material
        </Button>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{materials.length}</p>
                <p className="text-xs text-muted-foreground">Total Files</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{materials.filter((m) => m.status === "approved").length}</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{materials.filter((m) => m.status === "under_review").length}</p>
                <p className="text-xs text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground mb-2">Storage Used</p>
            <p className="text-2xl font-bold">{totalSize.toFixed(1)} MB</p>
            <Progress value={(totalSize / 500) * 100} className="h-1.5 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">of 500 MB limit</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as typeof view)}>
            <TabsList>
              <TabsTrigger value="grid" className="gap-2">
                <Grid3X3 className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2">
                <List className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Files Display */}
      {view === "grid" ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((file, i) => {
            const FileIcon = getFileIcon(file.type)
            const statusConfig = getStatusConfig(file.status)
            const StatusIcon = statusConfig.icon

            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="group hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedFile(file)}
                >
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <FileIcon className="w-6 h-6 text-primary" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" /> Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div>
                      <h3 className="font-medium truncate">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">{file.session}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={cn("gap-1", statusConfig.color)}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>v{file.version}</span>
                      <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}

          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: filteredMaterials.length * 0.05 }}
          >
            <Card
              className="border-dashed cursor-pointer hover:border-primary/50 transition-colors h-full min-h-[200px]"
              onClick={() => setShowUploadDialog(true)}
            >
              <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Upload New File</p>
                  <p className="text-sm text-muted-foreground">Drag & drop or click to browse</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredMaterials.map((file, i) => {
                const FileIcon = getFileIcon(file.type)
                const statusConfig = getStatusConfig(file.status)
                const StatusIcon = statusConfig.icon

                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.session}</p>
                    </div>
                    <Badge className={cn("shrink-0", statusConfig.color)}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground shrink-0 w-20 text-right">{file.size}</span>
                    <span className="text-sm text-muted-foreground shrink-0 w-24">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> Preview
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Upload Material</DialogTitle>
            <DialogDescription>
              Upload presentation files, documents, images, or videos for your sessions.
            </DialogDescription>
          </DialogHeader>

          <div className="border-2 border-dashed rounded-xl p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium">Drag and drop files here</p>
              <p className="text-sm text-muted-foreground">or click to browse your computer</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline">PPTX</Badge>
              <Badge variant="outline">PDF</Badge>
              <Badge variant="outline">DOCX</Badge>
              <Badge variant="outline">JPG/PNG</Badge>
              <Badge variant="outline">MP4</Badge>
            </div>
            <Button>Select Files</Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Maximum file size: 100MB per file</p>
            <p>Supported formats: PPTX, PDF, DOCX, JPG, PNG, MP4</p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Cancel
            </Button>
            <Button>Upload Files</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File Detail Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent>
          {selectedFile && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedFile.name}</DialogTitle>
                <DialogDescription>File details and version history</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Session</p>
                    <p className="font-medium">{selectedFile.session}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">File Size</p>
                    <p className="font-medium">{selectedFile.size}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Uploaded</p>
                    <p className="font-medium">{new Date(selectedFile.uploadedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Version</p>
                    <p className="font-medium">v{selectedFile.version}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Status</p>
                  <Badge className={getStatusConfig(selectedFile.status).color}>
                    {getStatusConfig(selectedFile.status).label}
                  </Badge>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline">Replace File</Button>
                <Button variant="destructive">Delete</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
