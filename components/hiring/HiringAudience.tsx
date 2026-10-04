import { Building2, Code2, ScanSearch } from "lucide-react"
import { ResponsiveFlow, type FlowEdge, type FlowNode } from "@/components/hiring/FlowGraph"
import { SectionLabel } from "@/components/hiring/primitives"

const recruiterGets = ["Search proven skills", "Explainable ranks", "Full hiring pipeline"]
const candidateGets = ["Verified profile", "Career copilot", "Shareable badge"]

const desktopNodes: FlowNode[] = [
  ...recruiterGets.map((t, i) => ({ id: `r${i}`, x: 0, y: i * 100, w: 210, h: 56, title: t })),
  { id: "recruiters", x: 280, y: 92, w: 190, h: 72, title: "Recruiters", sub: "hire on proof", tone: "accent", icon: Building2 },
  { id: "dna", x: 540, y: 88, w: 180, h: 80, title: "EngineerDNA", sub: "shared evidence", tone: "product", icon: ScanSearch },
  { id: "candidates", x: 790, y: 92, w: 190, h: 72, title: "Candidates", sub: "prove your work", tone: "accent", icon: Code2 },
  ...candidateGets.map((t, i) => ({ id: `k${i}`, x: 1050, y: i * 100, w: 190, h: 56, title: t }))
]

const desktopEdges: FlowEdge[] = [
  ...recruiterGets.map((_, i) => ({ from: `r${i}`, to: "recruiters" })),
  { from: "recruiters", to: "dna" },
  { from: "dna", to: "candidates" },
  ...candidateGets.map((_, i) => ({ from: "candidates", to: `k${i}` }))
]

const mobileNodes: FlowNode[] = [
  { id: "recruiters", x: 40, y: 0, w: 280, h: 64, title: "Recruiters", sub: "search · rank · hire", tone: "accent", icon: Building2 },
  { id: "dna", x: 40, y: 112, w: 280, h: 72, title: "EngineerDNA", sub: "shared evidence", tone: "product", icon: ScanSearch },
  { id: "candidates", x: 40, y: 232, w: 280, h: 64, title: "Candidates", sub: "profile · badge · copilot", tone: "accent", icon: Code2 }
]

const mobileEdges: FlowEdge[] = [
  { from: "recruiters", to: "dna" },
  { from: "dna", to: "candidates" }
]

export function HiringAudience() {
  return (
    <section id="who-its-for" className="relative scroll-mt-24 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="05">Who it&apos;s for</SectionLabel>
          </div>
          <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-primary sm:text-4xl lg:text-[2.9rem]">
            Two sides of the hire, <span className="accent-serif">one source of truth.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <ResponsiveFlow
            desktop={{ id: "aud-d", width: 1240, height: 256, nodes: desktopNodes, edges: desktopEdges, ariaLabel: "Recruiters and candidates both work from EngineerDNA's shared evidence" }}
            mobile={{ id: "aud-m", width: 360, height: 296, nodes: mobileNodes, edges: mobileEdges, orientation: "v", ariaLabel: "Recruiters and candidates both work from EngineerDNA's shared evidence" }}
          />
        </div>
      </div>
    </section>
  )
}
