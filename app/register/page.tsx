"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Globe,
  ArrowRight,
  ArrowLeft,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle2,
  FileText,
  Camera,
  Shield,
} from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

const attendeeTypes = [
  {
    id: "government",
    label: "Government Official",
    icon: Building2,
    description: "Ministers, delegates, and government representatives",
  },
  {
    id: "private_sector",
    label: "Private Sector",
    icon: Briefcase,
    description: "Business leaders, entrepreneurs, and corporate executives",
  },
  {
    id: "investor",
    label: "Investor / DFI",
    icon: Globe,
    description: "Development finance institutions, investors, and fund managers",
  },
  { id: "media", label: "Media", icon: Camera, description: "Journalists, broadcasters, and media professionals" },
  {
    id: "ngo",
    label: "NGO / Civil Society",
    icon: User,
    description: "Non-profit organizations and civil society representatives",
  },
  { id: "speaker", label: "Speaker / Panelist", icon: User, description: "Invited speakers and session panelists" },
]

const countries = [
  "Nigeria",
  "Ghana",
  "Senegal",
  "Côte d'Ivoire",
  "Kenya",
  "South Africa",
  "Ethiopia",
  "Tanzania",
  "Rwanda",
  "Morocco",
  "Egypt",
  "Other",
]

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1 - Type
    attendeeType: "",
    // Step 2 - Personal
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Step 3 - Organization
    organization: "",
    jobTitle: "",
    country: "",
    city: "",
    // Step 4 - Documents
    passport: null as File | null,
    photo: null as File | null,
    invitation: null as File | null,
    bio: "",
    // Step 5 - Review
    agreeTerms: false,
    agreePrivacy: false,
  })

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/register/success")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Select Your Category</h2>
              <p className="text-muted-foreground">Choose the category that best describes your participation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {attendeeTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, attendeeType: type.id })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    formData.attendeeType === type.id
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        formData.attendeeType === type.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <type.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{type.label}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    {formData.attendeeType === type.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Enter your personal details as they appear on your passport</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@organization.org"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+234 800 000 0000"
                  className="pl-10"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Organization Details</h2>
              <p className="text-muted-foreground">Tell us about your organization and role</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organization Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="organization"
                  placeholder="ECOWAS Commission"
                  className="pl-10"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="jobTitle"
                  placeholder="Director of Climate Affairs"
                  className="pl-10"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Country *</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) => setFormData({ ...formData, country: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="city"
                    placeholder="Abuja"
                    className="pl-10"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Documents & Bio</h2>
              <p className="text-muted-foreground">Upload required documents and provide a brief biography</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Passport Upload */}
              <div className="space-y-2">
                <Label>Passport Copy *</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="passport"
                    onChange={(e) => setFormData({ ...formData, passport: e.target.files?.[0] || null })}
                  />
                  <label htmlFor="passport" className="cursor-pointer">
                    <FileText className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">
                      {formData.passport ? formData.passport.name : "Click to upload"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 5MB</p>
                  </label>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Professional Photo *</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="hidden"
                    id="photo"
                    onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    <Camera className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">{formData.photo ? formData.photo.name : "Click to upload"}</p>
                    <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 2MB</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Short Biography *</Label>
              <Textarea
                id="bio"
                placeholder="Provide a brief professional biography (150-300 words)..."
                rows={5}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">{formData.bio.length} / 300 words</p>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
              <p className="text-muted-foreground">Please review your information before submitting</p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Name:</span>
                  <span>
                    {formData.firstName} {formData.lastName}
                  </span>
                  <span className="text-muted-foreground">Email:</span>
                  <span>{formData.email}</span>
                  <span className="text-muted-foreground">Phone:</span>
                  <span>{formData.phone}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" /> Organization
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Organization:</span>
                  <span>{formData.organization}</span>
                  <span className="text-muted-foreground">Title:</span>
                  <span>{formData.jobTitle}</span>
                  <span className="text-muted-foreground">Location:</span>
                  <span>
                    {formData.city}, {formData.country}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Documents
                </h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className={formData.passport ? "text-success" : "text-destructive"}>
                    {formData.passport ? "✓" : "✗"} Passport
                  </span>
                  <span className={formData.photo ? "text-success" : "text-destructive"}>
                    {formData.photo ? "✓" : "✗"} Photo
                  </span>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="space-y-4 p-4 rounded-xl border border-border">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                />
                <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and understand my application will be subject to security verification.
                </Label>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="privacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) => setFormData({ ...formData, agreePrivacy: checked as boolean })}
                />
                <Label htmlFor="privacy" className="text-sm font-normal cursor-pointer">
                  I consent to the processing of my personal data in accordance with the{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </Label>
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-primary">Security Verification Required</p>
                <p className="text-muted-foreground mt-1">
                  Your application will be reviewed by the Secretariat and may be forwarded to security agencies for
                  verification. This process typically takes 3-5 business days.
                </p>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">ECOWAS Summit</span>
          </Link>

          <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account? <span className="text-primary font-medium">Sign in</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />

          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {["Type", "Personal", "Organization", "Documents", "Review"].map((step, index) => (
              <div
                key={step}
                className={`flex flex-col items-center gap-1 ${
                  index + 1 <= currentStep ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 < currentStep
                      ? "bg-primary text-primary-foreground"
                      : index + 1 === currentStep
                        ? "bg-primary/10 border-2 border-primary text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1 < currentStep ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </div>
                <span className="text-xs hidden sm:block">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card rounded-2xl border border-border shadow-xl p-6 md:p-8">
          <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            {currentStep < totalSteps ? (
              <GradientButton onClick={handleNext} disabled={currentStep === 1 && !formData.attendeeType}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </GradientButton>
            ) : (
              <GradientButton
                onClick={handleSubmit}
                loading={loading}
                disabled={!formData.agreeTerms || !formData.agreePrivacy}
              >
                Submit Application <ArrowRight className="w-4 h-4 ml-2" />
              </GradientButton>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
