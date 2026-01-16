"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StatusBadgeProps {
  status: string
  variant?: "default" | "success" | "warning" | "error" | "info" | "pending"
  pulse?: boolean
  className?: string
}

const variantStyles = {
  default: "bg-muted text-muted-foreground",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-secondary/10 text-secondary border-secondary/20",
  pending: "bg-primary/10 text-primary border-primary/20",
}

export function StatusBadge({ status, variant = "default", pulse = false, className }: StatusBadgeProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "error" && "bg-destructive",
              variant === "info" && "bg-secondary",
              variant === "pending" && "bg-primary",
              variant === "default" && "bg-muted-foreground",
            )}
          />
          <span
            className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "error" && "bg-destructive",
              variant === "info" && "bg-secondary",
              variant === "pending" && "bg-primary",
              variant === "default" && "bg-muted-foreground",
            )}
          />
        </span>
      )}
      {status}
    </motion.span>
  )
}
