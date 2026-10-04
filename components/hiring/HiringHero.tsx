import Link from "next/link"
import { ArrowDown, GitBranch, Lock, Workflow } from "lucide-react"
import { AnimatedWords } from "@/components/ui/AnimatedWords"
import { HeroTalentPanel } from "@/components/hiring/HeroTalentPanel"
import { ProductMark, TryMcpLink } from "@/components/hiring/primitives"
import { HIRING_PRODUCT_NAME } from "@/lib/hiring"

const facts = [
  { icon: Workflow, label: "10 engineering dimensions" },
  { icon: GitBranch, label: "Deterministic evidence" },
  { icon: Lock, label: "Public repos only" }
]

export function HiringHero() {
  return (
    <section className="hiring-grid relative isolate overflow-hidden border-b border-border pt-24 sm:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_78%_20%,rgba(143,220,194,0.13),transparent_70%),radial-gradient(40%_40%_at_0%_100%,rgba(255,107,74,0.07),transparent_70%)]"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="hero-fade">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            <li>
              <Link href="/" className="hover:text-primary">
                Soonlay
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>Products</li>
            <li aria-hidden>/</li>
            <li className="text-secondary" aria-current="page">
              Hiring
            </li>
          </ol>
        </nav>

        <div className="grid gap-14 pb-20 pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:items-center lg:gap-14 lg:pb-28 lg:pt-14">
          <div>
            <div className="hero-fade inline-flex items-center gap-3 rounded-full bg-white/[0.04] py-1.5 pl-1.5 pr-4 ring-1 ring-white/10" style={{ animationDelay: "60ms" }}>
              <ProductMark />
              <span className="text-sm font-semibold tracking-tight text-primary">{HIRING_PRODUCT_NAME}</span>
              <span aria-hidden className="h-3.5 w-px bg-white/15" />
              <span className="text-[13px] text-secondary">A hiring product by Soonlay</span>
            </div>

            <h1 className="mt-8 font-display text-[2.7rem] font-medium leading-[1.03] tracking-[-0.035em] text-primary sm:text-6xl lg:text-[4.6rem]">
              <AnimatedWords
                lines={[[{ text: "Hire engineers" }], [{ text: "on" }, { text: "evidence,", className: "accent-serif" }], [{ text: "not claims." }]]}
              />
            </h1>

            <p className="hero-fade mt-7 max-w-xl text-base leading-relaxed text-secondary sm:text-lg" style={{ animationDelay: "600ms" }}>
              {HIRING_PRODUCT_NAME} turns a developer&apos;s public code into a verified skill profile, so recruiters can
              search, rank and hire on proof.
            </p>

            <div className="hero-fade mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7" style={{ animationDelay: "740ms" }}>
              <TryMcpLink location="hero" size="lg" primary className="self-start" />
              <a href="#how-it-works" className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-secondary transition-colors hover:text-primary">
                <span className="link-underline">See how it works</span>
                <ArrowDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-0.5" />
              </a>
            </div>

            <ul className="hero-fade mt-12 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-3" style={{ animationDelay: "880ms" }}>
              {facts.map((fact) => (
                <li key={fact.label} className="flex items-center gap-3 text-[13px] font-medium text-primary">
                  <fact.icon className="h-4 w-4 flex-shrink-0 text-accent-2" strokeWidth={1.6} />
                  {fact.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:pl-6">
            <HeroTalentPanel />
          </div>
        </div>
      </div>
    </section>
  )
}
