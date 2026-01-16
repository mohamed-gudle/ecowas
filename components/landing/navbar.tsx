"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Sun, Moon, ChevronDown, Building2, Users } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { name: "About", href: "/about" },
  { name: "Agenda", href: "/agenda" },
  { name: "Speakers", href: "/speakers" },
  { name: "Venue & Travel", href: "/venue" },
  { name: "Media", href: "/media" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-lg" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Image src="/ecowas-emblem-gold.jpg" alt="ECOWAS" width={40} height={40} className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="block font-bold text-lg leading-tight">ECOWAS Summit</span>
              <span className="block text-xs text-muted-foreground">2026</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors rounded-lg hover:bg-muted"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Auth & Theme Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                Login
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/auth/delegate" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Delegate Portal</p>
                    <p className="text-xs text-muted-foreground">Attendees & Investors</p>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/auth/secretariat" className="flex items-center gap-3 cursor-pointer">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium">Secretariat Portal</p>
                    <p className="text-xs text-muted-foreground">Staff & Administrators</p>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/register">
            <GradientButton size="sm" className="rounded-full px-6">
              Register Now
            </GradientButton>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-2">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          )}
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium rounded-xl hover:bg-muted transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-border mt-4">
                <p className="px-4 text-sm font-medium text-muted-foreground">Login As</p>
                <Link href="/auth/delegate" className="block" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full bg-transparent justify-start gap-3">
                    <Users className="w-4 h-4" />
                    Delegate Portal
                  </Button>
                </Link>
                <Link href="/auth/secretariat" className="block" onClick={() => setIsMobileOpen(false)}>
                  <Button variant="outline" className="w-full rounded-full bg-transparent justify-start gap-3">
                    <Building2 className="w-4 h-4" />
                    Secretariat Portal
                  </Button>
                </Link>
                <Link href="/register" className="block" onClick={() => setIsMobileOpen(false)}>
                  <GradientButton className="w-full rounded-full">Register Now</GradientButton>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
