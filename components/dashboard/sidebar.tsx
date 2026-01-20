"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Globe,
  LayoutDashboard,
  Shield,
  Calendar,
  Users,
  AlertTriangle,
  FileText,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronLeft,
  Search,
  Moon,
  Sun,
  LogOut,
  Building2,
  DollarSign,
  Camera,
  Crown,
  Truck,
  Brain,
  Target,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    badge: null,
  },
  {
    title: "Summit Intelligence",
    icon: Brain,
    href: "/dashboard/intelligence",
    badge: "AI",
    children: [
      { title: "Executive Dashboard", href: "/dashboard/intelligence" },
      { title: "Opportunity Mapping", href: "/dashboard/intelligence/opportunities" },
      { title: "Country Dashboards", href: "/dashboard/intelligence/countries" },
      { title: "Bloc Analysis", href: "/dashboard/intelligence/blocs" },
      { title: "Investment Pipeline", href: "/dashboard/intelligence/pipeline" },
      { title: "AI Insights", href: "/dashboard/intelligence/insights" },
    ],
  },
  {
    title: "Collaboration",
    icon: MessageSquare,
    href: "/dashboard/collaboration",
    badge: 12,
    children: [
      { title: "Email Client", href: "/dashboard/collaboration/email" },
      { title: "Meetings & Standups", href: "/dashboard/collaboration/meetings" },
      { title: "Team Chat", href: "/dashboard/collaboration/chat" },
      { title: "Project Management", href: "/dashboard/collaboration/projects" },
      { title: "Recordings Library", href: "/dashboard/collaboration/recordings" },
    ],
  },
  {
    title: "Accreditation",
    icon: Shield,
    href: "/dashboard/accreditation",
    badge: 24,
    children: [
      { title: "Applications Queue", href: "/dashboard/accreditation" },
      { title: "Security Checks", href: "/dashboard/accreditation/security" },
      { title: "Badge Management", href: "/dashboard/accreditation/badges" },
      { title: "Visa Processing", href: "/dashboard/accreditation/visa" },
    ],
  },
  {
    title: "Programme",
    icon: Calendar,
    href: "/dashboard/programme",
    badge: 12,
    children: [
      { title: "Sessions", href: "/dashboard/programme" },
      { title: "Run of Show", href: "/dashboard/programme/run-of-show" },
      { title: "Side Events", href: "/dashboard/programme/side-events" },
      { title: "Speakers", href: "/dashboard/programme/speakers" },
      { title: "AI Scheduler", href: "/dashboard/programme/agent", badge: "AI" },
    ],
  },
  {
    title: "Governance",
    icon: Building2,
    href: "/dashboard/governance",
    children: [
      { title: "Pillars & Tracks", href: "/dashboard/governance" },
      { title: "Working Groups", href: "/dashboard/governance/working-groups" },
      { title: "Country Workspaces", href: "/dashboard/governance/countries" },
      { title: "Action Register", href: "/dashboard/governance/actions" },
    ],
  },
  {
    title: "VIP Protocol",
    icon: Crown,
    href: "/dashboard/vip",
    badge: 5,
    restricted: true,
  },
  {
    title: "Operations",
    icon: Truck,
    href: "/dashboard/operations",
    children: [
      { title: "Suppliers & Contracts", href: "/dashboard/operations/suppliers" },
      { title: "Project Tracker", href: "/dashboard/operations/projects" },
      { title: "Venues & Setup", href: "/dashboard/operations/venues" },
      { title: "Equipment Requests", href: "/dashboard/operations/equipment" },
      { title: "Transport", href: "/dashboard/operations/transport" },
      { title: "Readiness Checklist", href: "/dashboard/operations/readiness" },
    ],
  },
  {
    title: "Finance",
    icon: DollarSign,
    href: "/dashboard/finance",
    children: [
      { title: "Budget Overview", href: "/dashboard/finance" },
      { title: "Invoices & Payments", href: "/dashboard/finance/payments" },
      { title: "Sponsors & Exhibitors", href: "/dashboard/finance/sponsors" },
      { title: "Revenue Tracker", href: "/dashboard/finance/revenue" },
    ],
  },
  {
    title: "Media Center",
    icon: Camera,
    href: "/dashboard/media",
    children: [
      { title: "Press Releases", href: "/dashboard/media" },
      { title: "Assets Library", href: "/dashboard/media/assets" },
      { title: "Streaming Control", href: "/dashboard/media/streaming" },
      { title: "Publications", href: "/dashboard/media/publications" },
    ],
  },
  {
    title: "Risks & Incidents",
    icon: AlertTriangle,
    href: "/dashboard/risks",
    badge: 3,
  },
  {
    title: "Knowledge Hub",
    icon: FileText,
    href: "/dashboard/knowledge",
    children: [
      { title: "Documents", href: "/dashboard/knowledge" },
      { title: "Country Briefs", href: "/dashboard/knowledge/countries" },
      { title: "Compacts & Policies", href: "/dashboard/knowledge/compacts" },
      { title: "AI Query", href: "/dashboard/knowledge/query" },
    ],
  },
  {
    title: "Commitments",
    icon: Target,
    href: "/dashboard/commitments",
    badge: "New",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/dashboard/analytics",
  },
]

interface SidebarProps {
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
}

export function Sidebar({ collapsed = false, onCollapse }: SidebarProps) {
  const pathname = usePathname()
  const { currentUser, theme, toggleTheme } = useAppStore()
  const [expandedItems, setExpandedItems] = useState<string[]>(["Summit Intelligence"])

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]))
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/")

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border fixed left-0 top-0 z-40"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <span className="font-bold text-lg whitespace-nowrap">Secretariat</span>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCollapse?.(!collapsed)}
          className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      {/* Search */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
              <Input
                placeholder="Search..."
                className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpanded(item.title)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    isActive(item.href) && "bg-sidebar-accent text-sidebar-foreground",
                    item.title === "Summit Intelligence" &&
                    "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20",
                  )}
                >
                  <item.icon
                    className={cn("w-5 h-5 flex-shrink-0", item.title === "Summit Intelligence" && "text-primary")}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex items-center justify-between overflow-hidden"
                      >
                        <span
                          className={cn("text-sm font-medium", item.title === "Summit Intelligence" && "text-primary")}
                        >
                          {item.title}
                        </span>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <Badge
                              className={cn(
                                "border-0 text-xs",
                                item.badge === "AI"
                                  ? "bg-gradient-to-r from-primary to-accent text-white"
                                  : item.badge === "New"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-primary/20 text-primary",
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                          {item.restricted && <Shield className="w-3 h-3 text-warning" />}
                          <ChevronDown
                            className={cn(
                              "w-4 h-4 transition-transform",
                              expandedItems.includes(item.title) && "rotate-180",
                            )}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>

                <AnimatePresence>
                  {!collapsed && expandedItems.includes(item.title) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-sm transition-all text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                            pathname === child.href && "bg-sidebar-accent/50 text-sidebar-foreground",
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                  isActive(item.href) && "bg-sidebar-accent text-sidebar-foreground",
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex items-center justify-between overflow-hidden"
                    >
                      <span className="text-sm font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge
                          className={cn(
                            "border-0 text-xs",
                            item.badge === "New" ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary",
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {item.restricted && <Shield className="w-3 h-3 text-warning" />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border space-y-3">
        {/* Settings */}
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <Settings className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          {!collapsed && <span className="text-sm font-medium">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
        </button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all hover:bg-sidebar-accent">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src={currentUser?.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/20 text-primary text-xs">
                  {currentUser?.firstName?.[0]}
                  {currentUser?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 text-left overflow-hidden">
                  <p className="text-sm font-medium truncate">
                    {currentUser?.firstName} {currentUser?.lastName}
                  </p>
                  <p className="text-xs text-sidebar-foreground/50 truncate capitalize">
                    {currentUser?.role?.replace("_", " ")}
                  </p>
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Users className="w-4 h-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.aside>
  )
}
