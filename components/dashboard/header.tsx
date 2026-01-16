"use client"

import { useState } from "react"
import {
  Bell,
  Search,
  Command,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  Info,
  MessageSquare,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAppStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const mockNotifications = [
  {
    id: "1",
    type: "warning",
    title: "Security Check Pending",
    message: "15 applications awaiting security clearance beyond SLA",
    time: "5 min ago",
    read: false,
  },
  {
    id: "2",
    type: "success",
    title: "Session Approved",
    message: "Energy Access Plenary has been approved and scheduled",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "New VIP Delegation",
    message: "Ghana Presidential delegation confirmed for Day 2",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "error",
    title: "Logistics Issue",
    message: "AV equipment delivery delayed for Hall B",
    time: "3 hours ago",
    read: true,
  },
]

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ title = "Dashboard", subtitle }: HeaderProps) {
  const { currentUser, notifications } = useAppStore()
  const [searchOpen, setSearchOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <Button
          variant="outline"
          className="hidden md:flex items-center gap-2 px-4 text-muted-foreground bg-muted/50"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm">Search...</span>
          <kbd className="ml-2 hidden lg:inline-flex items-center gap-1 bg-background px-2 py-0.5 rounded text-xs">
            <Command className="w-3 h-3" /> K
          </kbd>
        </Button>

        {/* Date/Time */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span>{new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
          <span className="text-muted-foreground">|</span>
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="font-mono">
            {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* AI Assistant */}
        <Sheet open={assistantOpen} onOpenChange={setAssistantOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="relative bg-gradient-to-r from-primary/10 to-accent/10">
              <MessageSquare className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
                Summit AI Assistant
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-[calc(100vh-120px)] mt-4">
              <div className="flex-1 space-y-4 overflow-auto">
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">AI</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 p-3 rounded-lg bg-muted">
                    <p className="text-sm">Hello! I&apos;m your Summit AI Assistant. I can help you with:</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                      <li>• Accreditation status queries</li>
                      <li>• Programme scheduling</li>
                      <li>• Logistics coordination</li>
                      <li>• Generating daily reports</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Input placeholder="Ask me anything..." className="flex-1" />
                  <Button size="icon" className="bg-primary">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative bg-transparent">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="ghost" size="sm" className="text-xs h-auto py-1">
                Mark all read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              {mockNotifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn("flex items-start gap-3 p-3 cursor-pointer", !notification.read && "bg-muted/50")}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      notification.type === "warning" && "bg-warning/20 text-warning",
                      notification.type === "success" && "bg-success/20 text-success",
                      notification.type === "error" && "bg-destructive/20 text-destructive",
                      notification.type === "info" && "bg-secondary/20 text-secondary",
                    )}
                  >
                    {notification.type === "warning" && <AlertCircle className="w-4 h-4" />}
                    {notification.type === "success" && <CheckCircle2 className="w-4 h-4" />}
                    {notification.type === "error" && <AlertCircle className="w-4 h-4" />}
                    {notification.type === "info" && <Info className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-primary justify-center">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Environment Indicator */}
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          Production
        </Badge>
      </div>

      {/* Search Dialog would go here */}
    </header>
  )
}
