import type { Metadata } from "next"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { JsonLd } from "@/components/ui/JsonLd"
import { HiringHero } from "@/components/hiring/HiringHero"
import { HiringProblem } from "@/components/hiring/HiringProblem"
import { HiringCapabilities } from "@/components/hiring/HiringCapabilities"
import { HiringProductPreview } from "@/components/hiring/HiringProductPreview"
import { HiringWorkflow } from "@/components/hiring/HiringWorkflow"
import { HiringAudience } from "@/components/hiring/HiringAudience"
import { HiringDifferentiators } from "@/components/hiring/HiringDifferentiators"
import { HiringTrust } from "@/components/hiring/HiringTrust"
import { HiringCTA } from "@/components/hiring/HiringCTA"
import { HiringPageView } from "@/components/hiring/HiringPageView"
import { pageMetadata } from "@/lib/metadata"
import { HIRING_PAGE_PATH, HIRING_PRODUCT_NAME, HIRING_SOURCE_URL } from "@/lib/hiring"
import { SITE_URL, absoluteUrl } from "@/lib/site"

const description =
  "EngineerDNA by Soonlay reads developers' real public code, turns it into verified skill profiles, and gives recruiters an evidence-backed way to search, rank and hire engineers."

export const metadata: Metadata = pageMetadata({
  title: "EngineerDNA — Hire Engineers on Verified Code Evidence",
  description,
  path: HIRING_PAGE_PATH
})

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: HIRING_PRODUCT_NAME,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Recruiting software",
  operatingSystem: "Web",
  description,
  url: absoluteUrl(HIRING_PAGE_PATH),
  license: "https://opensource.org/licenses/MIT",
  codeRepository: HIRING_SOURCE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` }
}

export default function HiringPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={productSchema} />
      <HiringPageView />
      <Navbar />
      <main className="flex-1 overflow-x-clip">
        <HiringHero />
        <HiringProblem />
        <HiringCapabilities />
        <HiringProductPreview />
        <HiringWorkflow />
        <HiringAudience />
        <HiringDifferentiators />
        <HiringTrust />
        <HiringCTA />
      </main>
      <Footer />
    </div>
  )
}
