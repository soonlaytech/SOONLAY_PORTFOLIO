import { CircleHelp, Code2, FileText, Filter, ListOrdered, ScanSearch } from "lucide-react"
import { ResponsiveFlow, type FlowEdge, type FlowNode } from "@/components/hiring/FlowGraph"
import { SectionLabel } from "@/components/hiring/primitives"

const desktopNodes: FlowNode[] = [
  { id: "a1", x: 0, y: 26, w: 220, h: 64, title: "Résumé", sub: "self-reported", tone: "muted", icon: FileText },
  { id: "a2", x: 400, y: 26, w: 220, h: 64, title: "Keyword filter", sub: "word overlap", tone: "muted", icon: Filter },
  { id: "a3", x: 800, y: 26, w: 220, h: 64, title: "A guess", sub: "can't explain why", tone: "coral", icon: CircleHelp },
  { id: "b1", x: 0, y: 176, w: 220, h: 64, title: "Public code", sub: "what was built", icon: Code2 },
  { id: "b2", x: 400, y: 176, w: 220, h: 64, title: "Evidence", sub: "deterministic", tone: "accent", icon: ScanSearch },
  { id: "b3", x: 800, y: 176, w: 220, h: 64, title: "Explainable rank", sub: "every factor shown", tone: "product", icon: ListOrdered }
]

const mobileNodes: FlowNode[] = [
  { id: "a1", x: 0, y: 24, w: 104, h: 54, title: "Résumé", tone: "muted" },
  { id: "a2", x: 128, y: 24, w: 104, h: 54, title: "Keywords", tone: "muted" },
  { id: "a3", x: 256, y: 24, w: 104, h: 54, title: "A guess", tone: "coral" },
  { id: "b1", x: 0, y: 140, w: 104, h: 54, title: "Code" },
  { id: "b2", x: 128, y: 140, w: 104, h: 54, title: "Evidence", tone: "accent" },
  { id: "b3", x: 256, y: 140, w: 104, h: 54, title: "Clear rank", tone: "product" }
]

const edges: FlowEdge[] = [
  { from: "a1", to: "a2", tone: "muted" },
  { from: "a2", to: "a3", tone: "muted" },
  { from: "b1", to: "b2" },
  { from: "b2", to: "b3" }
]

export function HiringDifferentiators() {
  return (
    <section id="why" className="relative scroll-mt-24 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="06">Why EngineerDNA</SectionLabel>
          </div>
          <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-primary sm:text-4xl lg:text-[2.9rem]">
            Screening that starts <span className="accent-serif">from the work.</span>
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-5xl">
          <ResponsiveFlow
            desktop={{
              id: "why-d",
              width: 1020,
              height: 240,
              nodes: desktopNodes,
              edges,
              labels: [
                { x: 0, y: 10, text: "Résumé-first" },
                { x: 0, y: 160, text: "Evidence-first, with EngineerDNA", tone: "accent" }
              ],
              ariaLabel: "Résumé-first screening goes from résumé to keyword filter to a guess; evidence-first screening goes from public code to evidence to an explainable rank"
            }}
            mobile={{
              id: "why-m",
              width: 360,
              height: 194,
              nodes: mobileNodes,
              edges,
              labels: [
                { x: 0, y: 10, text: "Résumé-first" },
                { x: 0, y: 126, text: "With EngineerDNA", tone: "accent" }
              ],
              ariaLabel: "Résumé-first screening goes from résumé to keywords to a guess; evidence-first screening goes from code to evidence to a clear rank"
            }}
          />
        </div>
      </div>
    </section>
  )
}
