"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Github } from "lucide-react"
import { MonoTag, SectionLabel } from "@/components/hiring/primitives"
import { PIPELINE_STAGES } from "@/lib/hiring"
import { cn } from "@/lib/utils"

const panel = "w-full max-w-md rounded-2xl bg-[#0a1614]/90 p-5 ring-1 ring-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"

function ConnectVisual() {
  const repos = [
    { name: "booking-api", note: "142 own commits", on: true },
    { name: "portfolio-site", note: "61 own commits", on: true },
    { name: "infra-scripts", note: "23 own commits", on: true },
    { name: "forked-ui-kit", note: "Fork · 0 own commits", on: false }
  ]
  return (
    <div className={panel}>
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/10">
          <Github className="h-4 w-4 text-primary" />
        </span>
        <div>
          <p className="text-sm font-semibold text-primary">GitHub connected</p>
          <MonoTag className="text-[9.5px]">Public repositories only</MonoTag>
        </div>
      </div>
      <ul className="mt-4 space-y-1.5">
        {repos.map((repo, i) => (
          <li key={repo.name} className={cn("sv-bubble flex items-center gap-3 rounded-lg px-3 py-2 text-[12.5px]", repo.on ? "bg-white/[0.04]" : "opacity-50")} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <span className={cn("flex h-4 w-4 items-center justify-center rounded", repo.on ? "bg-accent-2 text-ink" : "ring-1 ring-white/25")}>
              {repo.on && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className="font-mono text-primary">{repo.name}</span>
            <span className="ml-auto text-[11px] text-muted">{repo.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExtractVisual() {
  const rows = [
    ["NestJS", "USED", "0.93"],
    ["PostgreSQL", "USED", "0.90"],
    ["Redis", "MENTIONED", "0.35"],
    ["Playwright", "USED", "0.77"]
  ]
  return (
    <div className={panel}>
      <MonoTag>booking-api · TechEvidence</MonoTag>
      <ul className="mt-4 space-y-2 font-mono text-[12px]">
        {rows.map(([tech, strength, conf], i) => (
          <li key={tech} className="sv-bubble grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
            <span className="text-primary">{tech}</span>
            <span className="text-muted">conf {conf}</span>
            <span className={cn("rounded px-1.5 py-0.5 text-[10px] tracking-wider", strength === "USED" ? "bg-accent-2/15 text-accent-2" : "bg-coral/15 text-[#ff9a82]")}>{strength}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11.5px] text-muted">Deterministic. Same repository in, same evidence out.</p>
    </div>
  )
}

function ScoreVisual() {
  const value = 78
  const circumference = 2 * Math.PI * 42
  return (
    <div className={cn(panel, "flex items-center gap-6")}>
      <svg viewBox="0 0 100 100" className="h-28 w-28 flex-shrink-0 -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#9FE6CD"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - value / 100)}
          className="ring-draw"
          style={{ ["--ring-from" as string]: circumference }}
        />
      </svg>
      <div className="min-w-0">
        <p className="font-display text-4xl text-primary">{value}</p>
        <MonoTag className="text-accent-2">Strong · Developer DNA</MonoTag>
        <div className="mt-3 flex flex-wrap gap-1.5 font-mono text-[10px] tracking-wider">
          <span className="rounded bg-accent-2/15 px-1.5 py-0.5 text-accent-2">NestJS VERIFIED</span>
          <span className="rounded bg-coral/15 px-1.5 py-0.5 text-[#ff9a82]">Redis REFUTED</span>
        </div>
      </div>
    </div>
  )
}

function RankVisual() {
  const list = [
    ["Candidate A", 87],
    ["Candidate B", 82],
    ["Candidate C", 71]
  ] as const
  return (
    <div className={panel}>
      <MonoTag>Backend Engineer · ranked</MonoTag>
      <ul className="mt-4 space-y-2">
        {list.map(([name, score], i) => (
          <li key={name} className="sv-bubble flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2.5" style={{ animationDelay: `${0.1 + i * 0.12}s` }}>
            <span className="font-mono text-[11px] text-muted">#{i + 1}</span>
            <span className="text-[13px] font-medium text-primary">{name}</span>
            <span className="ml-auto h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.06]">
              <span className="bar-grow block h-full rounded-full bg-accent-2" style={{ width: `${score}%` }} />
            </span>
            <span className="w-6 text-right font-mono text-xs text-secondary">{score}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11.5px] text-muted">Each rank opens into its five weighted factors.</p>
    </div>
  )
}

function HireVisual() {
  const reached = PIPELINE_STAGES.length - 1
  return (
    <div className={panel}>
      <MonoTag>Application timeline</MonoTag>
      <ol className="mt-4 space-y-0">
        {PIPELINE_STAGES.map((stage, i) => (
          <li key={stage} className="sv-bubble flex items-center gap-3 py-1" style={{ animationDelay: `${i * 0.07}s` }}>
            <span className={cn("h-2 w-2 rounded-full", i === reached ? "bg-accent-2 shadow-[0_0_10px_rgba(159,230,205,0.8)]" : "bg-accent-2/40")} />
            <span className={cn("text-[12.5px]", i === reached ? "font-semibold text-primary" : "text-secondary")}>{stage}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

const steps = [
  { title: "Connect", body: "Link GitHub once. Only code you authored counts.", Visual: ConnectVisual },
  { title: "Extract evidence", body: "Every technology tagged USED or MENTIONED, with proof.", Visual: ExtractVisual },
  { title: "Score and verify", body: "Ten-dimension DNA score. Claims verified or refuted.", Visual: ScoreVisual },
  { title: "Search and rank", body: "Search by proven skill. Every rank explains itself.", Visual: RankVisual },
  { title: "Hire", body: "Shortlist, interview, offer and hire in one pipeline.", Visual: HireVisual }
]

export function HiringWorkflow() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  const { Visual } = steps[active]

  return (
    <section id="how-it-works" className="relative scroll-mt-24 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="max-w-3xl">
          <SectionLabel index="04">How it works</SectionLabel>
          <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-primary sm:text-4xl lg:text-[2.9rem]">
            From a GitHub connection <span className="accent-serif">to a signed offer.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <ol className="relative">
            <span aria-hidden className="absolute bottom-6 left-[15px] top-6 hidden w-px bg-border lg:block" />
            {steps.map((step, i) => {
              const isActive = i === active
              return (
                <li
                  key={step.title}
                  ref={(el) => {
                    refs.current[i] = el
                  }}
                  data-step={i}
                  aria-current={isActive ? "step" : undefined}
                  className="relative pb-12 last:pb-0 lg:flex lg:min-h-[42vh] lg:flex-col lg:justify-center lg:pb-0"
                >
                  <div className="flex gap-5">
                    <span
                      className={cn(
                        "relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full font-mono text-[11px] ring-1 transition-all duration-500",
                        isActive ? "bg-accent-2 text-ink ring-accent-2" : "bg-background text-muted ring-border-bright"
                      )}
                    >
                      0{i + 1}
                    </span>
                    <div className={cn("transition-opacity duration-500 lg:opacity-40", isActive && "lg:opacity-100")}>
                      <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-primary sm:text-[1.75rem]">{step.title}</h3>
                      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-secondary">{step.body}</p>
                    </div>
                  </div>
                  <div className="mt-6 pl-0 sm:pl-[3.25rem] lg:hidden">
                    <step.Visual />
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(50vh-150px)] flex min-h-[300px] items-center justify-center">
              <div key={active} className="step-scene flex w-full justify-center">
                <Visual />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
