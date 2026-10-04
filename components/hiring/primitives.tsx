"use client"

import { ArrowUpRight } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { HIRING_CTA_LABEL, HIRING_PRODUCT_URL, isExternalUrl } from "@/lib/hiring"
import { trackHiring } from "@/lib/hiring-analytics"

/** EngineerDNA mark: two strands joined by rungs, i.e. evidence linked to claims. */
export function ProductMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-ink text-accent-2 ring-1 ring-accent-2/30",
        className
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[62%] w-[62%]" strokeWidth={1.8} strokeLinecap="round">
        <path d="M7 3c0 4.5 10 4.5 10 9s-10 4.5-10 9" stroke="currentColor" />
        <path d="M17 3c0 4.5-10 4.5-10 9s10 4.5 10 9" stroke="currentColor" opacity={0.45} />
        <path d="M9 6.5h6M9 17.5h6" stroke="currentColor" opacity={0.7} />
      </svg>
    </span>
  )
}

/** Small mono label used for product UI chrome, e.g. "USED", "sample data". */
export function MonoTag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted", className)}>{children}</span>
  )
}

interface TryMcpLinkProps {
  location: string
  size?: "md" | "lg"
  primary?: boolean
  className?: string
}

/** The product's own CTA. Light-on-dark so it never reads as the studio's "Start a Project". */
export function TryMcpLink({ location, size = "md", primary = false, className }: TryMcpLinkProps) {
  const external = isExternalUrl(HIRING_PRODUCT_URL)
  return (
    <a
      href={HIRING_PRODUCT_URL}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => {
        if (primary) trackHiring("hiring_primary_cta_click", { location })
        trackHiring("hiring_try_mcp_click", { location })
      }}
      className={cn(
        "group inline-flex items-center justify-between gap-4 rounded-full bg-primary font-semibold text-ink shadow-[0_0_0_1px_rgba(159,230,205,0.35),0_22px_50px_-20px_rgba(159,230,205,0.55)] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-spring)] hover:shadow-[0_0_0_4px_rgba(159,230,205,0.25),0_22px_50px_-16px_rgba(159,230,205,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98]",
        size === "lg" ? "py-2 pl-7 pr-2 text-base" : "py-1.5 pl-5 pr-1.5 text-[15px]",
        className
      )}
    >
      {HIRING_CTA_LABEL}
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-ink text-accent-2 transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-px group-hover:translate-x-0.5",
          size === "lg" ? "h-10 w-10" : "h-8 w-8"
        )}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}

/** Window chrome for product previews. Always discloses that it is a recreation with sample data. */
export function PreviewFrame({
  path,
  children,
  className,
  note = "Illustrative preview · sample data"
}: {
  path: string
  children: ReactNode
  className?: string
  note?: string
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[1.4rem] bg-[#0a1614]/90 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.85)] ring-1 ring-white/10",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-muted">
          engineerdna{path}
        </span>
      </div>
      {children}
      <figcaption className="border-t border-white/[0.06] px-4 py-2 text-right">
        <MonoTag className="text-[9.5px] text-muted/80">{note}</MonoTag>
      </figcaption>
    </figure>
  )
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-secondary">
      <span className="text-accent-2">{index}</span>
      <span aria-hidden className="h-px w-8 bg-border-bright" />
      {children}
    </p>
  )
}
