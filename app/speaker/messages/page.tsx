"use client"

import { useState } from "react"
import { Search, Star, Paperclip, Send, MoreVertical, Archive, Trash2, Reply, Forward, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: "1",
    from: { name: "Programme Team", avatar: "/placeholder.svg", isTeam: true },
    subject: "Session Brief - Opening Ceremony",
    preview: "Please find attached your session brief for the Opening Ceremony keynote...",
    time: "2 hours ago",
    unread: true,
    starred: true,
    attachments: 2,
  },
  {
    id: "2",
    from: { name: "Technical Support", avatar: "/placeholder.svg", isTeam: true },
    subject: "Tech Check Scheduled for Tomorrow",
    preview: "Your technical check has been scheduled for tomorrow at 10:00 AM...",
    time: "5 hours ago",
    unread: true,
    starred: false,
    attachments: 0,
  },
  {
    id: "3",
    from: { name: "VIP Protocol", avatar: "/placeholder.svg", isTeam: true },
    subject: "Your Accommodation Details",
    preview: "We are pleased to confirm your accommodation at the Presidential Suite...",
    time: "1 day ago",
    unread: false,
    starred: false,
    attachments: 1,
  },
  {
    id: "4",
    from: { name: "Dr. Kofi Mensah", avatar: "/placeholder.svg", isTeam: false },
    subject: "Panel Discussion Coordination",
    preview: "Looking forward to joining you on the Women in Climate Leadership panel...",
    time: "2 days ago",
    unread: false,
    starred: true,
    attachments: 0,
  },
]

const selectedConversation = {
  id: "1",
  from: { name: "Programme Team", email: "programme@ecowas-summit.org", avatar: "/placeholder.svg" },
  subject: "Session Brief - Opening Ceremony",
  messages: [
    {
      id: "1",
      from: "Programme Team",
      time: "Today at 9:32 AM",
      content: `Dear Dr. Mohammed,

Please find attached your comprehensive session brief for the Opening Ceremony keynote address scheduled for April 12, 2026.

Key details:
- Duration: 20 minutes (followed by 10-minute Q&A)
- Expected attendance: 1,800+ delegates
- Live streaming: Yes (3 languages)
- Recording: Yes

Please review the attached documents and let us know if you have any questions.

Best regards,
Programme Coordination Team`,
      attachments: [
        { name: "Session_Brief_Opening.pdf", size: "1.2 MB" },
        { name: "Speaking_Points.docx", size: "245 KB" },
      ],
    },
    {
      id: "2",
      from: "You",
      time: "Today at 10:15 AM",
      content: `Thank you for the session brief. I've reviewed the documents and have a few questions:

1. What is the exact timing for the Q&A session?
2. Will there be a teleprompter available?
3. Can I get the list of confirmed VIP attendees?

Looking forward to your response.`,
      attachments: [],
    },
  ],
}

export default function SpeakerMessagesPage() {
  const [selected, setSelected] = useState(conversations[0])
  const [replyText, setReplyText] = useState("")

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4">
      {/* Conversation List */}
      <Card className="w-96 flex flex-col shrink-0">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Messages</CardTitle>
            <Badge>4 new</Badge>
          </div>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <CardContent className="p-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelected(conv)}
                className={cn(
                  "w-full p-3 rounded-xl text-left transition-all mb-1",
                  selected.id === conv.id ? "bg-primary/10 border border-primary/30" : "hover:bg-muted",
                  conv.unread && "bg-primary/5",
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={conv.from.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{conv.from.name[0]}</AvatarFallback>
                    </Avatar>
                    {conv.from.isTeam && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className={cn("text-sm truncate", conv.unread && "font-semibold")}>{conv.from.name}</span>
                      <div className="flex items-center gap-1">
                        {conv.starred && <Star className="w-3 h-3 fill-amber-400 text-amber-400" />}
                        <span className="text-xs text-muted-foreground">{conv.time}</span>
                      </div>
                    </div>
                    <p className={cn("text-sm truncate", conv.unread ? "font-medium" : "text-muted-foreground")}>
                      {conv.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.preview}</p>
                    {conv.attachments > 0 && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                        <Paperclip className="w-3 h-3" />
                        {conv.attachments} attachment{conv.attachments > 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      {/* Message View */}
      <Card className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedConversation.from.avatar || "/placeholder.svg"} />
              <AvatarFallback>{selectedConversation.from.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{selectedConversation.subject}</h2>
              <p className="text-sm text-muted-foreground">
                From: {selectedConversation.from.name} &lt;{selectedConversation.from.email}&gt;
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Star className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Archive className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {selectedConversation.messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{msg.from}</span>
                    <span className="text-sm text-muted-foreground">{msg.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Reply className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Forward className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                {msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {msg.attachments.map((att, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg border bg-muted/50">
                        <Paperclip className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">{att.name}</p>
                          <p className="text-xs text-muted-foreground">{att.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Reply */}
        <div className="p-4 border-t">
          <Textarea
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-24 mb-3"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="bg-transparent">
                <Paperclip className="w-4 h-4" />
              </Button>
            </div>
            <Button className="gap-2">
              <Send className="w-4 h-4" />
              Send Reply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
