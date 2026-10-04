"use client"

import { useState } from "react"
import { ChevronDown, Columns3, KanbanSquare, Search, SlidersHorizontal } from "lucide-react"
import { MonoTag, PreviewFrame, SectionLabel } from "@/components/hiring/primitives"
import { RANKING_FACTORS } from "@/lib/hiring"
import { cn } from "@/lib/utils"

type Candidate = {
  id: string
  name: string
  location: string
  dna: number
  verified: number
  matched: string
  strengths: string[]
  factors: number[]
}

// Anonymised sample data. Factor order matches RANKING_FACTORS.
const candidates: Candidate[] = [
  { id: "a", name: "Candidate A", location: "Remote", dna: 81, verified: 14, matched: "3 / 3", strengths: ["Backend", "API Design", "Database"], factors: [100, 81, 88, 70, 92] },
  { id: "b", name: "Candidate B", location: "Bangalore", dna: 76, verified: 11, matched: "3 / 3", strengths: ["Frontend", "Testing", "API Design"], factors: [100, 76, 74, 62, 80] },
  { id: "c", name: "Candidate C", location: "Pune", dna: 72, verified: 9, matched: "2 / 3", strengths: ["DevOps", "Cloud", "Backend"], factors: [67, 72, 66, 78, 85] },
  { id: "d", name: "Candidate D", location: "Remote", dna: 64, verified: 7, matched: "2 / 3", strengths: ["Database", "Backend"], factors: [67, 64, 58, 44, 60] }
]

function rankScore(c: Candidate) {
  return Math.round(RANKING_FACTORS.reduce((sum, f, i) => sum + f.weight * c.factors[i], 0))
}

const factorDetail = (c: Candidate, i: number) =>
  [
    `${c.matched} required skills proven in code.`,
    `Developer DNA ${c.dna}/100, strongest in ${c.strengths.slice(0, 2).join(" and ")}.`,
    `${c.verified} verified technologies across public repositories.`,
    "Public repositories and stars, weighted logarithmically.",
    "Recency of the latest push to a public repository."
  ][i]

function FindTalent() {
  const [open, setOpen] = useState("a")
  return (
    <div className="grid md:grid-cols-[13.5rem_1fr]">
      <aside className="hidden border-r border-white/[0.06] p-4 md:block">
        <p className="flex items-center gap-2 text-xs font-semibold text-secondary">
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
        </p>
        <MonoTag className="mt-5 block text-[9.5px]">Required skills</MonoTag>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["TypeScript", "PostgreSQL", "Docker"].map((s) => (
            <span key={s} className="rounded-md bg-accent-2/10 px-2 py-1 text-[11px] text-accent-2 ring-1 ring-accent-2/25">
              {s}
            </span>
          ))}
        </div>
        <MonoTag className="mt-5 block text-[9.5px]">Min DNA score · 60</MonoTag>
        <div className="relative mt-3 h-1 rounded-full bg-white/10">
          <span className="absolute inset-y-0 left-0 w-[60%] rounded-full bg-accent-2/70" />
          <span className="absolute left-[60%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
        </div>
        <MonoTag className="mt-5 block text-[9.5px]">Verified skills · 5+</MonoTag>
        <MonoTag className="mt-5 block text-[9.5px]">Sort</MonoTag>
        <p className="mt-2 flex items-center justify-between rounded-md bg-white/[0.04] px-2.5 py-1.5 text-[11.5px] text-secondary ring-1 ring-white/[0.06]">
          Rank score <ChevronDown className="h-3 w-3" />
        </p>
      </aside>

      <div className="p-3 sm:p-4">
        <div className="mb-3 flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-[12.5px] text-muted ring-1 ring-white/[0.06]">
          <Search className="h-3.5 w-3.5" /> TypeScript, PostgreSQL, Docker
        </div>
        <ul className="space-y-2">
          {candidates.map((c, idx) => {
            const isOpen = open === c.id
            return (
              <li key={c.id} className={cn("rounded-xl ring-1 transition-colors", isOpen ? "bg-white/[0.05] ring-accent-2/25" : "bg-white/[0.02] ring-white/[0.06]")}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? "" : c.id)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[1.5rem_1fr_auto] items-center gap-3 rounded-xl px-3 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2/60 sm:grid-cols-[1.5rem_1fr_auto_auto_auto]"
                >
                  <span className="font-mono text-[11px] text-muted">#{idx + 1}</span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-primary">{c.name}</span>
                    <span className="block truncate text-[11.5px] text-muted">
                      {c.location} · {c.strengths.join(", ")}
                    </span>
                  </span>
                  <span className="hidden text-right sm:block">
                    <MonoTag className="block text-[9px]">DNA</MonoTag>
                    <span className="font-mono text-xs text-secondary">{c.dna}</span>
                  </span>
                  <span className="hidden text-right sm:block">
                    <MonoTag className="block text-[9px]">Match</MonoTag>
                    <span className="font-mono text-xs text-secondary">{c.matched}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="rounded-lg bg-ink px-2.5 py-1 font-display text-lg leading-none text-primary ring-1 ring-white/10">{rankScore(c)}</span>
                    <ChevronDown className={cn("h-4 w-4 text-muted transition-transform duration-300", isOpen && "rotate-180")} />
                  </span>
                </button>
                {isOpen && (
                  <div className="step-scene border-t border-white/[0.06] px-3 pb-4 pt-3 sm:px-4">
                    <MonoTag className="text-[9.5px]">Why this rank</MonoTag>
                    <ul className="mt-2.5 space-y-2.5">
                      {RANKING_FACTORS.map((f, i) => (
                        <li key={f.label} className="grid gap-1 text-[12px] sm:grid-cols-[8.5rem_3rem_3.2rem_1fr] sm:items-center sm:gap-3">
                          <span className="font-medium text-primary">
                            {f.label}
                            <span className="ml-2 font-mono font-normal text-accent-2/80 sm:hidden">
                              {c.factors[i]} × {f.weight.toFixed(2)}
                            </span>
                          </span>
                          <span className="hidden font-mono text-secondary sm:block">{c.factors[i]}</span>
                          <span className="hidden font-mono text-accent-2/80 sm:block">×{f.weight.toFixed(2)}</span>
                          <span className="text-muted">{factorDetail(c, i)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

function Compare() {
  const picked = candidates.slice(0, 3)
  const rows: { label: string; value: (c: Candidate) => string }[] = [
    { label: "Rank score", value: (c) => String(rankScore(c)) },
    { label: "Developer DNA", value: (c) => `${c.dna}/100` },
    { label: "Verified skills", value: (c) => String(c.verified) },
    { label: "Required skills proven", value: (c) => c.matched },
    { label: "Strongest in", value: (c) => c.strengths.slice(0, 2).join(", ") }
  ]
  return (
    <div className="overflow-x-auto p-3 sm:p-5">
      <table className="w-full min-w-[520px] text-left text-[12.5px]">
        <caption className="sr-only">Sample side-by-side candidate comparison</caption>
        <thead>
          <tr>
            <th scope="col" className="pb-3 font-normal">
              <MonoTag className="text-[9.5px]">Up to 4 candidates</MonoTag>
            </th>
            {picked.map((c) => (
              <th key={c.id} scope="col" className="pb-3 text-sm font-medium text-primary">
                {c.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.06]">
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="py-3 pr-4 font-normal text-muted">
                {row.label}
              </th>
              {picked.map((c) => (
                <td key={c.id} className="py-3 pr-4 font-mono text-secondary">
                  {row.value(c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Pipeline() {
  const columns = [
    { stage: "Applied", cards: ["Candidate E", "Candidate F"] },
    { stage: "Screening", cards: ["Candidate D"] },
    { stage: "Shortlisted", cards: ["Candidate B", "Candidate C"] },
    { stage: "Interview Scheduled", cards: ["Candidate A"] },
    { stage: "Offer Sent", cards: [] as string[] }
  ]
  return (
    <div className="overflow-x-auto p-3 sm:p-4">
      <div className="grid min-w-[760px] grid-cols-5 gap-3">
        {columns.map((col, ci) => (
          <div key={col.stage} className="rounded-xl bg-white/[0.025] p-2.5 ring-1 ring-white/[0.05]">
            <p className="flex items-center justify-between px-1 pb-2.5 text-[11.5px] font-medium text-secondary">
              {col.stage}
              <span className="font-mono text-muted">{col.cards.length}</span>
            </p>
            <div className="space-y-2">
              {col.cards.map((name, i) => (
                <div key={name} className="sv-bubble rounded-lg bg-surface-2/80 p-2.5 ring-1 ring-white/[0.06]" style={{ animationDelay: `${ci * 0.08 + i * 0.06}s` }}>
                  <p className="text-[12px] font-medium text-primary">{name}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted">Backend Engineer</p>
                  <span className="mt-2 block h-1 w-2/3 rounded-full bg-accent-2/30" />
                </div>
              ))}
              {col.cards.length === 0 && <div className="rounded-lg border border-dashed border-white/10 p-4 text-center text-[11px] text-muted">Drop here</div>}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 px-1 text-[11.5px] text-muted">
        Every move writes to an append-only timeline on the application, with interview scheduling and offers alongside.
      </p>
    </div>
  )
}

const tabs = [
  { id: "talent", label: "Find Talent", path: "/recruiter", icon: Search, View: FindTalent },
  { id: "compare", label: "Compare", path: "/recruiter", icon: Columns3, View: Compare },
  { id: "pipeline", label: "Pipeline", path: "/recruiter/jobs/backend-engineer", icon: KanbanSquare, View: Pipeline }
]

export function HiringProductPreview() {
  const [active, setActive] = useState(tabs[0].id)
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <section id="in-action" className="relative scroll-mt-24 overflow-hidden border-t border-border py-20 md:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(143,220,194,0.09),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionLabel index="03">Product in action</SectionLabel>
          </div>
          <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-[-0.025em] text-primary sm:text-4xl lg:text-[2.9rem]">
            The recruiter workspace, <span className="accent-serif">built on proof.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-secondary sm:text-lg">
            Open a candidate to see exactly why they rank where they do.
          </p>
        </div>

        <div data-reveal className="mx-auto mt-12 max-w-5xl">
          <div role="tablist" aria-label="Recruiter workspace views" className="mx-auto mb-4 flex w-fit gap-1 rounded-full bg-white/[0.04] p-1 ring-1 ring-white/10">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={active === t.id}
                aria-controls="workspace-panel"
                onClick={() => setActive(t.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2/60 sm:px-4",
                  active === t.id ? "bg-white/10 text-primary" : "text-secondary hover:text-primary"
                )}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
              </button>
            ))}
          </div>

          <PreviewFrame path={tab.path} note="Illustrative recreation of the EngineerDNA recruiter UI · sample data">
            <div id="workspace-panel" role="tabpanel" aria-labelledby={`tab-${tab.id}`} key={tab.id} className="step-scene min-h-[360px]">
              <tab.View />
            </div>
          </PreviewFrame>
        </div>
      </div>
    </section>
  )
}
