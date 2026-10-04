import Link from "next/link"
import { ArrowDown, ChevronRight, GitBranch, Lock, Workflow } from "lucide-react"
import { AnimatedWords } from "@/components/ui/AnimatedWords"
import { DnaRadar } from "@/components/hiring/DnaRadar"
import { MonoTag, PreviewFrame, ProductMark, TryMcpLink } from "@/components/hiring/primitives"
import { DNA_DIMENSIONS, HIRING_PRODUCT_NAME } from "@/lib/hiring"
import { cn } from "@/lib/utils"

const SAMPLE_DNA = [82, 66, 48, 71, 34, 78, 80, 57, 63, 55]

const sampleEvidence = [
  { tech: "PostgreSQL", strength: "USED", detail: "3 repos · conf 0.94" },
  { tech: "Docker", strength: "USED", detail: "2 repos · conf 0.88" },
  { tech: "Jest", strength: "USED", detail: "2 repos · conf 0.81" },
  { tech: "Kubernetes", strength: "MENTIONED", detail: "README only" }
] as const

const facts = [
  { icon: Workflow, label: "10 engineering dimensions" },
  { icon: GitBranch, label: "Deterministic evidence" },
  { icon: Lock, label: "Public repos only" }
]

function ProfilePreview() {
  return (
    <div className="relative">
      <PreviewFrame path="/u/sample-dev" className="hero-fade relative" note="Illustrative preview · sample data">
        <div className="grid gap-5 p-5 sm:grid-cols-[1fr_1.05fr] sm:p-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 font-mono text-xs text-secondary ring-1 ring-white/10">
                SD
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-primary">Sample Developer</p>
                <p className="truncate font-mono text-[11px] text-muted">@sample-dev</p>
              </div>
            </div>
            <div className="mt-5 flex items-end gap-3">
              <p className="font-display text-5xl font-medium leading-none tracking-[-0.03em] text-primary">78</p>
              <div className="pb-1">
                <MonoTag className="block text-accent-2">Strong</MonoTag>
                <MonoTag className="block">Developer DNA</MonoTag>
              </div>
            </div>
            <DnaRadar values={SAMPLE_DNA} className="mx-auto mt-3 w-full max-w-[220px]" />
          </div>

          <div className="flex flex-col">
            <MonoTag>Evidence · per repository</MonoTag>
            <ul className="mt-3 space-y-2">
              {sampleEvidence.map((row, i) => (
                <li
                  key={row.tech}
                  className="sv-bubble flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] px-3 py-2.5 ring-1 ring-white/[0.05]"
                  style={{ animationDelay: `${0.7 + i * 0.12}s` }}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium text-primary">{row.tech}</span>
                    <span className="block font-mono text-[10.5px] text-muted">{row.detail}</span>
                  </span>
                  <span
                    className={cn(
                      "flex-shrink-0 rounded-md px-2 py-0.5 font-mono text-[10px] tracking-wider",
                      row.strength === "USED" ? "bg-accent-2/15 text-accent-2" : "bg-coral/15 text-[#ff9a82]"
                    )}
                  >
                    {row.strength}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <MonoTag>Top dimensions</MonoTag>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[DNA_DIMENSIONS[0], DNA_DIMENSIONS[6], DNA_DIMENSIONS[5]].map((dim) => (
                  <span key={dim} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[11px] text-secondary ring-1 ring-white/[0.06]">
                    {dim}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PreviewFrame>

      <div
        className="hero-fade glass absolute -bottom-6 -left-3 hidden w-60 rounded-2xl p-4 sm:block lg:-left-10"
        style={{ animationDelay: "1.3s" }}
      >
        <MonoTag>Claimed skill</MonoTag>
        <p className="mt-1 text-sm font-semibold text-primary">Kubernetes</p>
        <div className="mt-3 flex items-center gap-2 font-mono text-[10.5px] tracking-wider">
          <span className="text-muted">CLAIMED</span>
          <ChevronRight className="h-3 w-3 text-muted" />
          <span className="rounded bg-coral/15 px-1.5 py-0.5 text-[#ff9a82]">NOT VERIFIED</span>
        </div>
        <p className="mt-2 text-[11.5px] leading-snug text-secondary">Mentioned in a README, never implemented in code.</p>
      </div>
    </div>
  )
}

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

          <div className="lg:pl-6" style={{ animationDelay: "300ms" }}>
            <ProfilePreview />
          </div>
        </div>
      </div>
    </section>
  )
}
