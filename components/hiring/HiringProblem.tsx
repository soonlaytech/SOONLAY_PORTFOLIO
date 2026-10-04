import { FileText, ScanSearch } from "lucide-react"
import { ResponsiveFlow, type FlowEdge, type FlowNode } from "@/components/hiring/FlowGraph"
import { SectionLabel } from "@/components/hiring/primitives"

const claims = ["Kubernetes", "REST APIs", "Testing"]
const verdicts = [
  { sub: "MENTIONED · not verified", short: "MENTIONED", tone: "coral" as const },
  { sub: "USED · 4 repos", short: "USED", tone: "accent" as const },
  { sub: "USED · Jest, 2 repos", short: "USED", tone: "accent" as const }
]

const desktopNodes: FlowNode[] = [
  ...claims.map((c, i) => ({ id: `c${i}`, x: 0, y: i * 110, w: 250, h: 64, title: `“${c}”`, sub: "résumé claim", tone: "muted" as const, icon: FileText })),
  { id: "dna", x: 420, y: 100, w: 260, h: 84, title: "EngineerDNA", sub: "checks public code", tone: "product", icon: ScanSearch },
  ...verdicts.map((v, i) => ({ id: `v${i}`, x: 850, y: i * 110, w: 250, h: 64, title: claims[i], sub: v.sub, tone: v.tone }))
]

const mobileNodes: FlowNode[] = [
  ...claims.map((c, i) => ({ id: `c${i}`, x: i * 124, y: 0, w: 112, h: 56, title: c, sub: "claimed", tone: "muted" as const })),
  { id: "dna", x: 40, y: 130, w: 280, h: 70, title: "EngineerDNA", sub: "checks public code", tone: "product", icon: ScanSearch },
  ...verdicts.map((v, i) => ({ id: `v${i}`, x: i * 124, y: 274, w: 112, h: 56, title: claims[i], sub: v.short, tone: v.tone }))
]

const edges: FlowEdge[] = [
  ...claims.map((_, i) => ({ from: `c${i}`, to: "dna", tone: "muted" as const })),
  ...verdicts.map((v, i) => ({ from: "dna", to: `v${i}`, tone: v.tone }))
]

export function HiringProblem() {
  return (
    <section id="problem" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="01">The problem</SectionLabel>
          </div>
          <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-primary sm:text-4xl lg:text-[2.9rem]">
            A résumé is a claim. <span className="accent-serif">Code is evidence.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Hiring runs on claims nobody can check. EngineerDNA checks them against real code.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <ResponsiveFlow
            desktop={{ id: "problem-d", width: 1100, height: 284, nodes: desktopNodes, edges, ariaLabel: "Résumé claims are checked by EngineerDNA against public code and marked used or only mentioned" }}
            mobile={{ id: "problem-m", width: 360, height: 330, nodes: mobileNodes, edges, orientation: "v", ariaLabel: "Résumé claims are checked by EngineerDNA against public code and marked used or only mentioned" }}
          />
        </div>
      </div>
    </section>
  )
}
