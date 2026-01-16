import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: January 2026</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By registering for and attending the ECOWAS Investment & Economic Summit 2026, you agree to be bound by
                these Terms of Service. If you do not agree to these terms, please do not register for or attend the
                summit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Registration and Accreditation</h2>
              <p className="text-muted-foreground leading-relaxed">
                All attendees must complete the registration process and receive accreditation approval before attending
                the summit. The Secretariat reserves the right to deny or revoke accreditation at any time without prior
                notice if deemed necessary for security or other reasons.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Code of Conduct</h2>
              <p className="text-muted-foreground leading-relaxed">
                All attendees are expected to conduct themselves in a professional manner throughout the summit. Any
                behavior deemed inappropriate, disruptive, or threatening may result in immediate removal from the event
                without refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All materials, presentations, and content shared during the summit remain the intellectual property of
                their respective owners. Recording, photographing, or reproducing any content without prior written
                permission is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Photography and Recording</h2>
              <p className="text-muted-foreground leading-relaxed">
                By attending the summit, you consent to being photographed, filmed, or recorded. These materials may be
                used for promotional, educational, or archival purposes by ECOWAS and its partners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cancellation Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cancellations made more than 30 days before the summit will receive a full refund minus a processing
                fee. Cancellations made 15-30 days before will receive a 50% refund. No refunds will be issued for
                cancellations made less than 15 days before the event.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                ECOWAS and the summit organizers shall not be liable for any direct, indirect, incidental, special, or
                consequential damages arising out of or in connection with your attendance at the summit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at legal@ecowas-summit.org.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
