"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useAppStore } from "@/lib/store"
import { motion } from "framer-motion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, setAuthenticated, setCurrentUser } = useAppStore()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // For demo purposes, auto-authenticate
    if (!isAuthenticated) {
      setCurrentUser({
        id: "1",
        email: "admin@ecowassummit.org",
        firstName: "Admin",
        lastName: "User",
        organization: "ECOWAS Secretariat",
        country: "Nigeria",
        role: "super_admin",
        accreditationStatus: "approved",
      })
      setAuthenticated(true)
    }
  }, [isAuthenticated, setAuthenticated, setCurrentUser])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      <motion.main
        initial={false}
        animate={{ marginLeft: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {children}
      </motion.main>
    </div>
  )
}
