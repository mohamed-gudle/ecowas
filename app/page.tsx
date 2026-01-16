import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { CountdownSection } from "@/components/landing/countdown-section"
import { SpeakersPreview } from "@/components/landing/speakers-preview"
import { InvestmentTracksSection } from "@/components/landing/investment-tracks-section"
import { MobileAppSection } from "@/components/landing/mobile-app-section"
import { VenuePreview } from "@/components/landing/venue-preview"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <CountdownSection />
      <SpeakersPreview />
      <InvestmentTracksSection />
      <MobileAppSection />
      <VenuePreview />
      <CTASection />
      <Footer />
    </main>
  )
}
