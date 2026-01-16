"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CheckCircle2, Mail, Clock, Shield, ArrowRight, Download, Globe } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full">
        {/* Success Card */}
        <div className="bg-card rounded-2xl border border-border shadow-xl p-8 text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.4 }}>
              <CheckCircle2 className="w-10 h-10 text-success" />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold mb-2"
          >
            Application Submitted!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mb-6"
          >
            Thank you for applying to attend the ECOWAS Climate Summit 2026. Your application is now being processed.
          </motion.p>

          {/* Application ID */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-muted/50 rounded-xl p-4 mb-6"
          >
            <p className="text-sm text-muted-foreground mb-1">Application Reference</p>
            <p className="text-xl font-mono font-bold text-primary">ECO-2026-00001</p>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 mb-8"
          >
            <h3 className="font-semibold text-left">What happens next?</h3>

            <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-muted/30">
              <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Check your email</p>
                <p className="text-xs text-muted-foreground">We&apos;ve sent a confirmation to your email address</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-muted/30">
              <Shield className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Security verification</p>
                <p className="text-xs text-muted-foreground">Your application will undergo security clearance</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left p-3 rounded-lg bg-muted/30">
              <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Processing time</p>
                <p className="text-xs text-muted-foreground">Expect a decision within 3-5 business days</p>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-3"
          >
            <Link href="/portal/status" className="block">
              <GradientButton className="w-full">
                Track Application Status <ArrowRight className="w-4 h-4 ml-2" />
              </GradientButton>
            </Link>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                <Download className="w-4 h-4" /> Download Receipt
              </Button>
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Globe className="w-4 h-4" /> Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Need help? Contact us at{" "}
          <a href="mailto:support@ecowassummit2026.org" className="text-primary hover:underline">
            support@ecowassummit2026.org
          </a>
        </motion.p>
      </motion.div>
    </div>
  )
}
