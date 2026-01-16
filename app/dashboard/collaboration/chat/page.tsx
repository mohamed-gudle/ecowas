"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Pin,
  Users,
  Hash,
  Lock,
  AtSign,
  File,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const channels = [
  { id: "1", name: "general", type: "public", unread: 3 },
  { id: "2", name: "logistics-team", type: "public", unread: 12 },
  { id: "3", name: "vip-protocol", type: "private", unread: 5 },
  { id: "4", name: "media-coordination", type: "public", unread: 0 },
  { id: "5", name: "finance-approvals", type: "private", unread: 2 },
]

const directMessages = [
  { id: "1", name: "Sarah Smith", status: "online", unread: 2, avatar: "/placeholder.svg" },
  { id: "2", name: "John Doe", status: "online", unread: 0, avatar: "/placeholder.svg" },
  { id: "3", name: "Emily Brown", status: "away", unread: 0, avatar: "/placeholder.svg" },
  { id: "4", name: "Mike Johnson", status: "offline", unread: 0, avatar: "/placeholder.svg" },
]

const messages = [
  {
    id: "1",
    user: { name: "Sarah Smith", avatar: "/placeholder.svg" },
    content: "Good morning team! Quick update on the venue setup - Hall A is ready for the technical rehearsal.",
    time: "09:15 AM",
    reactions: [
      { emoji: "👍", count: 4 },
      { emoji: "🎉", count: 2 },
    ],
  },
  {
    id: "2",
    user: { name: "John Doe", avatar: "/placeholder.svg" },
    content: "That's great news! I'll coordinate with the AV team to start the sound check at 10 AM.",
    time: "09:18 AM",
    reactions: [{ emoji: "✅", count: 1 }],
  },
  {
    id: "3",
    user: { name: "Emily Brown", avatar: "/placeholder.svg" },
    content:
      "Just spoke with the catering team. They need the final guest count by 2 PM today. @Mike Johnson can you confirm the VIP numbers?",
    time: "09:25 AM",
    reactions: [],
    mentions: ["Mike Johnson"],
  },
  {
    id: "4",
    user: { name: "Mike Johnson", avatar: "/placeholder.svg" },
    content: "Checking with Protocol now. We have 24 confirmed VVIPs and 56 VIPs. Will send the breakdown shortly.",
    time: "09:32 AM",
    reactions: [{ emoji: "👀", count: 1 }],
    attachment: { type: "file", name: "VIP_List_Draft.xlsx", size: "245 KB" },
  },
]

export default function TeamChatPage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[1])
  const [newMessage, setNewMessage] = useState("")
  const [showChannels, setShowChannels] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Sidebar */}
      <Card className={cn("w-72 flex flex-col shrink-0", !showChannels && "hidden md:flex")}>
        {/* Search */}
        <div className="p-3 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          {/* Channels */}
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channels</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => setSelectedChannel(channel)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors",
                    selectedChannel.id === channel.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  {channel.type === "private" ? (
                    <Lock className="w-4 h-4 shrink-0" />
                  ) : (
                    <Hash className="w-4 h-4 shrink-0" />
                  )}
                  <span className="flex-1 text-left truncate">{channel.name}</span>
                  {channel.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs h-5 min-w-5 flex items-center justify-center">
                      {channel.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages */}
          <div className="p-3 border-t">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Direct Messages
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-1">
              {directMessages.map((dm) => (
                <button
                  key={dm.id}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  <div className="relative">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={dm.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{dm.name[0]}</AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background",
                        dm.status === "online" && "bg-emerald-500",
                        dm.status === "away" && "bg-amber-500",
                        dm.status === "offline" && "bg-gray-400",
                      )}
                    />
                  </div>
                  <span className="flex-1 text-left truncate text-muted-foreground">{dm.name}</span>
                  {dm.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-xs h-5 min-w-5 flex items-center justify-center">
                      {dm.unread}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold">{selectedChannel.name}</h2>
            </div>
            <Badge variant="secondary" className="text-xs">
              <Users className="w-3 h-3 mr-1" />
              12 members
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Pin className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 group"
              >
                <Avatar className="w-10 h-10 shrink-0">
                  <AvatarImage src={msg.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{msg.user.name}</span>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm">{msg.content}</p>

                  {msg.attachment && (
                    <div className="mt-2 inline-flex items-center gap-2 p-2 rounded-lg border bg-muted/50">
                      <File className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm font-medium">{msg.attachment.name}</p>
                        <p className="text-xs text-muted-foreground">{msg.attachment.size}</p>
                      </div>
                    </div>
                  )}

                  {msg.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {msg.reactions.map((r, i) => (
                        <button
                          key={i}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-muted text-xs hover:bg-muted/80"
                        >
                          <span>{r.emoji}</span>
                          <span>{r.count}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Plus className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder={`Message #${selectedChannel.name}`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="pr-24"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <AtSign className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Smile className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Paperclip className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Button size="icon" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
