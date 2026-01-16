"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Inbox,
  Send,
  Star,
  Trash2,
  Archive,
  Search,
  Plus,
  Paperclip,
  Clock,
  CheckCircle2,
  Brain,
  Sparkles,
  Reply,
  ReplyAll,
  Forward,
  Flag,
  Filter,
  RefreshCw,
  X,
  Bold,
  Italic,
  Underline,
  Link2,
  ImageIcon,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const folders = [
  { name: "Inbox", icon: Inbox, count: 24, color: "text-primary" },
  { name: "Starred", icon: Star, count: 8, color: "text-amber-500" },
  { name: "Sent", icon: Send, count: 0, color: "text-muted-foreground" },
  { name: "Drafts", icon: ImageIcon, count: 3, color: "text-muted-foreground" },
  { name: "Archive", icon: Archive, count: 156, color: "text-muted-foreground" },
  { name: "Trash", icon: Trash2, count: 12, color: "text-muted-foreground" },
]

const aiCategories = [
  { name: "VIP Protocol", color: "bg-purple-500", count: 5 },
  { name: "Logistics", color: "bg-blue-500", count: 8 },
  { name: "Finance", color: "bg-emerald-500", count: 4 },
  { name: "Media", color: "bg-pink-500", count: 3 },
  { name: "Programme", color: "bg-amber-500", count: 6 },
  { name: "Security", color: "bg-red-500", count: 2 },
]

const emails = [
  {
    id: "1",
    from: { name: "President's Office - Ghana", email: "protocol@presidency.gov.gh", avatar: "/placeholder.svg" },
    subject: "RE: Presidential Delegation Arrival - Confirmed",
    preview:
      "We are pleased to confirm that His Excellency will arrive on April 12th at 14:00. The delegation consists of 15 members including...",
    date: "10:32 AM",
    unread: true,
    starred: true,
    attachments: 2,
    aiCategory: "VIP Protocol",
    aiConfidence: 98,
    aiInsights: ["Delegation size: 15 members", "Arrival: April 12, 14:00", "Special requirements noted"],
    priority: "high",
  },
  {
    id: "2",
    from: { name: "AfDB Climate Finance", email: "climate@afdb.org", avatar: "/placeholder.svg" },
    subject: "Investment Pipeline Update - Q1 2026",
    preview:
      "Please find attached the updated investment pipeline for climate projects. Total committed funding has reached $2.4B across 47 projects...",
    date: "9:15 AM",
    unread: true,
    starred: false,
    attachments: 5,
    aiCategory: "Finance",
    aiConfidence: 95,
    aiInsights: ["$2.4B total funding", "47 projects tracked", "3 new commitments"],
    priority: "medium",
  },
  {
    id: "3",
    from: { name: "Venue Operations", email: "ops@aicc.ng", avatar: "/placeholder.svg" },
    subject: "Hall B Setup - Equipment List Required",
    preview:
      "Good morning, we need the final equipment list for Hall B by end of day. The AV team is standing by for the technical rehearsal...",
    date: "8:45 AM",
    unread: false,
    starred: false,
    attachments: 0,
    aiCategory: "Logistics",
    aiConfidence: 92,
    aiInsights: ["Deadline: EOD today", "Technical rehearsal pending", "Hall B priority"],
    priority: "high",
  },
  {
    id: "4",
    from: { name: "BBC Africa", email: "events@bbc.co.uk", avatar: "/placeholder.svg" },
    subject: "Media Accreditation Request - 12 Journalists",
    preview:
      "BBC World Service Africa would like to request media accreditation for our team covering the ECOWAS Climate Summit...",
    date: "Yesterday",
    unread: false,
    starred: true,
    attachments: 1,
    aiCategory: "Media",
    aiConfidence: 99,
    aiInsights: ["12 journalists", "International coverage", "Press pool request"],
    priority: "medium",
  },
  {
    id: "5",
    from: { name: "ECOWAS Commission", email: "programmes@ecowas.int", avatar: "/placeholder.svg" },
    subject: "Session Schedule Change - Day 2 Afternoon",
    preview:
      "Due to scheduling conflicts, we need to move the Climate Finance Panel from 14:00 to 15:30. Please advise on speaker availability...",
    date: "Yesterday",
    unread: false,
    starred: false,
    attachments: 0,
    aiCategory: "Programme",
    aiConfidence: 97,
    aiInsights: ["Schedule change required", "Day 2 affected", "Speaker coordination needed"],
    priority: "medium",
  },
]

export default function EmailClientPage() {
  const [selectedFolder, setSelectedFolder] = useState("Inbox")
  const [selectedEmail, setSelectedEmail] = useState(emails[0])
  const [composeOpen, setComposeOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showAiPanel, setShowAiPanel] = useState(true)

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Email Client</h1>
          <p className="text-muted-foreground">AI-powered email management with automatic classification</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-gradient-to-r from-primary to-accent text-white gap-1">
            <Brain className="w-3 h-3" />
            AI Classification Active
          </Badge>
          <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Compose
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>New Message</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="To" />
                  <Input placeholder="Subject" />
                </div>
                <div className="flex gap-2 border-b pb-2">
                  <Button variant="ghost" size="sm">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Underline className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                </div>
                <Textarea placeholder="Write your message..." className="min-h-[300px]" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                      <Sparkles className="w-4 h-4" />
                      AI Assist
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="bg-transparent">
                      Save Draft
                    </Button>
                    <Button>Send</Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Sidebar - Folders */}
        <div className="w-56 shrink-0 space-y-4">
          <Card className="p-2">
            {folders.map((folder) => (
              <button
                key={folder.name}
                onClick={() => setSelectedFolder(folder.name)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  selectedFolder === folder.name
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                <folder.icon className={cn("w-4 h-4", folder.color)} />
                <span className="flex-1 text-left">{folder.name}</span>
                {folder.count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {folder.count}
                  </Badge>
                )}
              </button>
            ))}
          </Card>

          {/* AI Categories */}
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">AI Categories</span>
            </div>
            <div className="space-y-2">
              {aiCategories.map((cat) => (
                <button
                  key={cat.name}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  <div className={cn("w-2 h-2 rounded-full", cat.color)} />
                  <span className="flex-1 text-left text-muted-foreground">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{cat.count}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Email List */}
        <Card className="w-96 shrink-0 flex flex-col">
          <div className="p-3 border-b space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {emails.map((email) => (
                <motion.button
                  key={email.id}
                  onClick={() => setSelectedEmail(email)}
                  className={cn(
                    "w-full p-4 text-left transition-colors hover:bg-muted/50",
                    selectedEmail.id === email.id && "bg-primary/5 border-l-2 border-primary",
                    email.unread && "bg-primary/5",
                  )}
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 shrink-0">
                      <AvatarImage src={email.from.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{email.from.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={cn("text-sm truncate", email.unread && "font-semibold")}>
                          {email.from.name}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0">{email.date}</span>
                      </div>
                      <p className={cn("text-sm truncate mb-1", email.unread && "font-medium")}>{email.subject}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{email.preview}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className={cn(
                            "text-xs",
                            email.aiCategory === "VIP Protocol" && "bg-purple-500/10 text-purple-500",
                            email.aiCategory === "Finance" && "bg-emerald-500/10 text-emerald-500",
                            email.aiCategory === "Logistics" && "bg-blue-500/10 text-blue-500",
                            email.aiCategory === "Media" && "bg-pink-500/10 text-pink-500",
                            email.aiCategory === "Programme" && "bg-amber-500/10 text-amber-500",
                          )}
                        >
                          {email.aiCategory}
                        </Badge>
                        {email.priority === "high" && (
                          <Badge variant="destructive" className="text-xs">
                            Urgent
                          </Badge>
                        )}
                        {email.attachments > 0 && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Paperclip className="w-3 h-3" />
                            {email.attachments}
                          </span>
                        )}
                        {email.starred && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Email View */}
        <Card className="flex-1 flex flex-col min-w-0">
          {selectedEmail && (
            <>
              <div className="p-4 border-b">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <Avatar className="w-12 h-12 shrink-0">
                      <AvatarImage src={selectedEmail.from.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedEmail.from.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h2 className="font-semibold text-lg truncate">{selectedEmail.subject}</h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{selectedEmail.from.name}</span>
                        <span>&lt;{selectedEmail.from.email}&gt;</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{selectedEmail.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="icon">
                      <Reply className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ReplyAll className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Forward className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Star className={cn("w-4 h-4", selectedEmail.starred && "fill-amber-400 text-amber-400")} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex min-h-0">
                {/* Email Content */}
                <ScrollArea className="flex-1 p-6">
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p>{selectedEmail.preview}</p>
                    <p>
                      The full delegation list is attached for your review. Please ensure appropriate protocol
                      arrangements are in place, including:
                    </p>
                    <ul>
                      <li>VIP lounge access at the airport</li>
                      <li>Motorcade arrangement for 3 vehicles</li>
                      <li>Presidential suite at the designated hotel</li>
                      <li>Bilateral meeting room reservation</li>
                    </ul>
                    <p>We would appreciate confirmation of these arrangements at your earliest convenience.</p>
                    <p>
                      Best regards,
                      <br />
                      Office of the President
                    </p>
                  </div>

                  {selectedEmail.attachments > 0 && (
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="text-sm font-medium mb-3">Attachments ({selectedEmail.attachments})</h4>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Delegation_List.pdf</p>
                            <p className="text-xs text-muted-foreground">245 KB</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg border bg-muted/50">
                          <FileText className="w-8 h-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Protocol_Requirements.docx</p>
                            <p className="text-xs text-muted-foreground">128 KB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>

                {/* AI Insights Panel */}
                {showAiPanel && (
                  <div className="w-80 border-l bg-gradient-to-b from-primary/5 to-accent/5 p-4 shrink-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold">AI Analysis</h3>
                          <p className="text-xs text-muted-foreground">{selectedEmail.aiConfidence}% confidence</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => setShowAiPanel(false)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {/* Category */}
                      <div className="p-3 rounded-lg bg-background/50 border">
                        <p className="text-xs text-muted-foreground mb-1">Category</p>
                        <Badge className="bg-purple-500/10 text-purple-500">{selectedEmail.aiCategory}</Badge>
                      </div>

                      {/* Key Insights */}
                      <div className="p-3 rounded-lg bg-background/50 border">
                        <p className="text-xs text-muted-foreground mb-2">Key Insights</p>
                        <ul className="space-y-2">
                          {selectedEmail.aiInsights.map((insight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Suggested Actions */}
                      <div className="p-3 rounded-lg bg-background/50 border">
                        <p className="text-xs text-muted-foreground mb-2">Suggested Actions</p>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
                            <CheckCircle2 className="w-4 h-4" />
                            Create Protocol Task
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
                            <Clock className="w-4 h-4" />
                            Add to VIP Schedule
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start gap-2 bg-transparent">
                            <Flag className="w-4 h-4" />
                            Flag for Follow-up
                          </Button>
                        </div>
                      </div>

                      {/* Training Feedback */}
                      <div className="p-3 rounded-lg border border-dashed">
                        <p className="text-xs text-muted-foreground mb-2">Was this classification correct?</p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <X className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Reply */}
              <div className="p-4 border-t">
                <div className="flex gap-3">
                  <Input placeholder="Quick reply..." className="flex-1" />
                  <Button>Send</Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
