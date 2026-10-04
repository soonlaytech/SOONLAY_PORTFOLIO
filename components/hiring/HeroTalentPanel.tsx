"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Activity, ArrowRight, ChevronDown, FolderGit2, GitCommitHorizontal, Github, Search, SlidersHorizontal, Sparkles } from "lucide-react"
import { MonoTag, ProductMark } from "@/components/hiring/primitives"
import { cn } from "@/lib/utils"

type Candidate = {
  id: string
  name: string
  role: string
  years: number
  skills: string[]
  more: number
  match: number
  repos: number
  contributions: string
  hue: string
}

// Illustrative sample profiles for the hero animation, not real people.
const candidates: Candidate[] = [
  { id: "rs", name: "Rahul Sharma", role: "Full Stack Developer", years: 3, skills: ["React", "Node.js", "PostgreSQL"], more: 3, match: 94, repos: 32, contributions: "1.2K", hue: "from-[#9FE6CD] to-[#3f8f78]" },
  { id: "pn", name: "Priya Nair", role: "Backend Engineer", years: 4, skills: ["Python", "AWS", "Docker"], more: 2, match: 91, repos: 27, contributions: "980", hue: "from-[#FFB49E] to-[#c4563d]" },
  { id: "av", name: "Aman Verma", role: "ML Engineer", years: 2, skills: ["Python", "TensorFlow", "ML"], more: 2, match: 87, repos: 18, contributions: "640", hue: "from-[#B9D7FF] to-[#4f6fa8]" },
  { id: "si", name: "Sneha Iyer", role: "Frontend Engineer", years: 3, skills: ["TypeScript", "Next.js", "Tailwind"], more: 1, match: 89, repos: 24, contributions: "870", hue: "from-[#E7C6FF] to-[#8a5bb0]" },
  { id: "km", name: "Karan Mehta", role: "DevOps Engineer", years: 5, skills: ["Kubernetes", "Terraform", "AWS"], more: 2, match: 92, repos: 41, contributions: "1.6K", hue: "from-[#FFE29E] to-[#b08a2e]" },
  { id: "ar", name: "Ananya Rao", role: "Data Engineer", years: 2, skills: ["SQL", "Spark", "Airflow"], more: 1, match: 85, repos: 15, contributions: "520", hue: "from-[#A8F0E6] to-[#2f8c80]" }
]

const VISIBLE = 3
const CYCLE_MS = 2800

function matchLabel(match: number) {
  return match >= 92 ? "Strong" : match >= 88 ? "Great" : "Good"
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

function MatchRing({ value, animate }: { value: number; animate: boolean }) {
  const r = 20
  const c = 2 * Math.PI * r
  return (
    <span className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center sm:h-14 sm:w-14">
      <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3.5" />
        <motion.circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="#9FE6CD"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: animate ? c : c * (1 - value / 100) }}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        />
      </svg>
      <span className="font-display text-[13px] font-semibold text-primary sm:text-sm">{value}%</span>
    </span>
  )
}

function CandidateCard({ candidate, animate }: { candidate: Candidate; animate: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/[0.035] p-3 ring-1 ring-white/[0.07] sm:gap-4 sm:p-3.5">
      <span className="relative flex-shrink-0">
        <span className={cn("flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-semibold text-ink sm:h-12 sm:w-12", candidate.hue)}>
          {initials(candidate.name)}
        </span>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0b1715]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold text-primary sm:text-[15px]">{candidate.name}</span>
        <span className="block truncate text-[12px] text-secondary">
          {candidate.role} · {candidate.years} yrs
        </span>
        <span className="mt-1.5 hidden gap-1.5 sm:flex">
          {candidate.skills.map((skill) => (
            <span key={skill} className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[11px] text-primary/85 ring-1 ring-white/[0.06]">
              {skill}
            </span>
          ))}
          <span className="rounded-md px-1.5 py-0.5 text-[11px] text-muted">+{candidate.more}</span>
        </span>
      </span>
      <MatchRing value={candidate.match} animate={animate} />
      <span className="hidden w-12 text-[12px] leading-tight text-secondary sm:block">
        {matchLabel(candidate.match)}
        <br />
        Match
      </span>
      <ArrowRight className="hidden h-4 w-4 flex-shrink-0 text-muted sm:block" />
    </div>
  )
}

/** Hero visual: a recruiter search where ranked candidate profiles keep rotating through. */
export function HeroTalentPanel() {
  const reduceMotion = useReducedMotion()
  const [start, setStart] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduceMotion || paused) return
    const id = setInterval(() => setStart((s) => (s + 1) % candidates.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [reduceMotion, paused])

  const visible = Array.from({ length: VISIBLE }, (_, i) => candidates[(start + i) % candidates.length])
  const top = visible[0]

  return (
    <div
      className="hero-fade relative mx-auto w-full max-w-[620px] lg:[perspective:1800px]"
      style={{ animationDelay: "300ms" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <svg aria-hidden viewBox="0 0 600 520" className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)] opacity-70">
        <path d="M40 420 C 60 120, 380 -40, 560 120 S 560 470, 300 500" fill="none" stroke="#9FE6CD" strokeOpacity="0.22" strokeWidth="1.5" />
        <path d="M80 470 C 140 200, 420 40, 580 230" fill="none" stroke="#9FE6CD" strokeOpacity="0.1" strokeWidth="1" />
      </svg>
      <div aria-hidden className="absolute inset-10 -z-10 rounded-full bg-accent-2/10 blur-3xl" />

      {/* Left rail: where the evidence comes from */}
      <div aria-hidden className="absolute -left-28 top-10 hidden w-36 rounded-2xl bg-[#0b1715]/80 p-3 ring-1 ring-white/10 backdrop-blur-xl xl:block xl:[transform:rotateY(14deg)_translateZ(-40px)]">
        {[
          { icon: Github, label: "GitHub" },
          { icon: FolderGit2, label: "Projects" },
          { icon: Sparkles, label: "Skills" },
          { icon: Activity, label: "Activity" }
        ].map((item) => (
          <p key={item.label} className="flex items-center gap-2.5 rounded-lg px-2 py-2.5 text-[12.5px] text-secondary">
            <item.icon className="h-4 w-4 text-primary/80" strokeWidth={1.6} /> {item.label}
          </p>
        ))}
      </div>

      {/* Main panel */}
      <div className="relative overflow-hidden rounded-[1.6rem] bg-[#0a1614]/90 p-4 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9),0_0_0_1px_rgba(159,230,205,0.14)] backdrop-blur-xl sm:p-5 lg:[transform:rotateY(-8deg)_rotateX(3deg)]">
        <div className="flex items-center gap-3">
          <span aria-hidden className="hidden gap-1.5 sm:flex">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </span>
          <ProductMark className="h-6 w-6 sm:ml-2" />
          <span className="text-sm font-semibold text-primary">EngineerDNA</span>
          <span aria-hidden className="ml-auto hidden h-9 w-9 items-center justify-center rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] sm:flex">
            <SlidersHorizontal className="h-4 w-4 text-secondary" />
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-xl bg-white/[0.04] px-3 py-2 text-[12px] text-primary ring-1 ring-white/[0.07] sm:ml-0">
            <span className="sm:hidden">All roles</span>
            <span className="hidden sm:inline">All engineering roles</span>
            <ChevronDown className="h-3.5 w-3.5 text-muted" />
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/[0.035] py-1.5 pl-4 pr-1.5 ring-1 ring-white/[0.08]">
          <Search className="h-4 w-4 flex-shrink-0 text-secondary" />
          <span className="min-w-0 flex-1 truncate text-[13px] text-muted">Search by skills, experience, or keywords…</span>
          <span aria-hidden className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-accent-2 text-ink">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>

        <ul className="relative mt-4 flex h-[252px] flex-col gap-2.5 overflow-hidden sm:h-[316px]" aria-live="off">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((candidate) => (
              <motion.li
                key={candidate.id}
                layout
                initial={{ opacity: 0, y: 48, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -48, scale: 0.96, filter: "blur(4px)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <CandidateCard candidate={candidate} animate={!reduceMotion} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <MonoTag className="mt-3 block text-right text-[9.5px] text-muted/80">Illustrative preview · sample profiles</MonoTag>
      </div>

      {/* Right panel: verified work for the candidate at the top of the list */}
      <div className="absolute -right-14 bottom-20 z-10 hidden w-44 rounded-2xl bg-[#0b1715]/85 p-4 ring-1 ring-white/10 backdrop-blur-xl xl:block xl:[transform:rotateY(-16deg)_translateZ(30px)]">
        <p className="flex items-center gap-2 text-[12.5px] font-semibold text-primary">
          <Github className="h-4 w-4" /> Verified Work
        </p>
        <motion.ul
            key={top.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-3 space-y-2.5 text-[12px] text-secondary"
          >
            <li className="flex items-center gap-2">
              <FolderGit2 className="h-3.5 w-3.5 text-accent-2" /> {top.repos} repositories
            </li>
            <li className="flex items-center gap-2">
              <GitCommitHorizontal className="h-3.5 w-3.5 text-accent-2" /> {top.contributions} contributions
            </li>
            <li className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-accent-2" /> Active in last 6 months
            </li>
          </motion.ul>
      </div>
    </div>
  )
}
