import { BadgeCheck, Briefcase, Dna, Github, ListOrdered, ScanSearch } from "lucide-react"
import { ResponsiveFlow, type FlowEdge, type FlowNode } from "@/components/hiring/FlowGraph"
import { SectionLabel } from "@/components/hiring/primitives"

const desktopNodes: FlowNode[] = [
  { id: "repos", x: 0, y: 110, w: 180, h: 70, title: "Public repos", sub: "your own commits", icon: Github },
  { id: "evidence", x: 250, y: 110, w: 205, h: 70, title: "Evidence Engine", sub: "USED vs MENTIONED", tone: "accent", icon: ScanSearch },
  { id: "dna", x: 525, y: 110, w: 190, h: 70, title: "Developer DNA", sub: "10 dimensions", tone: "accent", icon: Dna },
  { id: "verify", x: 790, y: 10, w: 200, h: 70, title: "Verification", sub: "verified / refuted", icon: BadgeCheck },
  { id: "rank", x: 790, y: 210, w: 200, h: 70, title: "Ranking", sub: "5 weighted factors", icon: ListOrdered },
  { id: "hire", x: 1060, y: 110, w: 160, h: 70, title: "Hire", sub: "Applied → Hired", tone: "product", icon: Briefcase }
]

const mobileNodes: FlowNode[] = [
  { id: "repos", x: 60, y: 0, w: 240, h: 60, title: "Public repos", sub: "your own commits", icon: Github },
  { id: "evidence", x: 60, y: 92, w: 240, h: 60, title: "Evidence Engine", sub: "USED vs MENTIONED", tone: "accent", icon: ScanSearch },
  { id: "dna", x: 60, y: 184, w: 240, h: 60, title: "Developer DNA", sub: "10 dimensions", tone: "accent", icon: Dna },
  { id: "verify", x: 0, y: 284, w: 172, h: 60, title: "Verification", sub: "verified/refuted", icon: BadgeCheck },
  { id: "rank", x: 188, y: 284, w: 172, h: 60, title: "Ranking", sub: "weighted factors", icon: ListOrdered },
  { id: "hire", x: 60, y: 384, w: 240, h: 60, title: "Hire", sub: "Applied → Hired", tone: "product", icon: Briefcase }
]

const edges: FlowEdge[] = [
  { from: "repos", to: "evidence" },
  { from: "evidence", to: "dna" },
  { from: "dna", to: "verify" },
  { from: "dna", to: "rank" },
  { from: "verify", to: "hire" },
  { from: "rank", to: "hire" }
]

const notes = ["Deterministic — no LLM decides what's verified", "Every score shows its reasoning", "Private repos are never read"]

export function HiringCapabilities() {
  return (
    <section id="product" className="relative scroll-mt-24 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="02">What it does</SectionLabel>
          </div>
          <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-primary sm:text-4xl lg:text-[2.9rem]">
            One chain of evidence, <span className="accent-serif">from commit to hire.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <ResponsiveFlow
            desktop={{ id: "chain-d", width: 1220, height: 290, nodes: desktopNodes, edges, ariaLabel: "Public repositories feed the Evidence Engine, which feeds Developer DNA, which feeds skill verification and ranking, which lead to the hire" }}
            mobile={{ id: "chain-m", width: 360, height: 444, nodes: mobileNodes, edges, orientation: "v", ariaLabel: "Public repositories feed the Evidence Engine, which feeds Developer DNA, which feeds skill verification and ranking, which lead to the hire" }}
          />
        </div>

        <ul data-reveal className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2.5">
          {notes.map((note) => (
            <li key={note} className="flex items-center gap-2 rounded-full bg-white/[0.04] px-4 py-2 text-[13px] text-secondary ring-1 ring-white/[0.07]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent-2" />
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
