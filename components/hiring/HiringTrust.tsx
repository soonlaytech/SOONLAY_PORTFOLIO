import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Logo } from "@/components/ui/Logo"
import { MonoTag, ProductMark, SectionLabel } from "@/components/hiring/primitives"
import { HIRING_PRODUCT_NAME, HIRING_SOURCE_URL } from "@/lib/hiring"

const stack = ["Next.js 15", "NestJS 10", "PostgreSQL 16", "Prisma 5", "TypeScript", "Zod contracts", "Claude", "Docker", "Turborepo"]

export function HiringTrust() {
  return (
    <section id="built-by" className="relative scroll-mt-24 border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="grid gap-10 rounded-[1.75rem] bg-white/[0.025] p-7 ring-1 ring-white/[0.07] sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:p-14">
          <div>
            <SectionLabel index="07">Built by Soonlay</SectionLabel>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link href="/" aria-label="Soonlay home">
                <Logo />
              </Link>
              <span aria-hidden className="font-mono text-muted">→</span>
              <span className="flex items-center gap-2.5">
                <ProductMark className="h-9 w-9" />
                <span className="font-display text-xl font-medium tracking-tight text-primary">{HIRING_PRODUCT_NAME}</span>
              </span>
            </div>
            <h2 className="mt-7 font-display text-3xl font-medium leading-[1.12] tracking-[-0.025em] text-primary sm:text-4xl">
              A studio product, <span className="accent-serif">open to inspect.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-secondary">
              Built by the Soonlay team. The full source is public under MIT, so every score can be checked.
            </p>
            <a
              href={HIRING_SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary ring-1 ring-border-bright transition-colors hover:ring-primary/40"
            >
              <Github className="h-4 w-4" /> Read the source
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <div>
              <MonoTag>License</MonoTag>
              <p className="mt-1.5 text-primary">MIT, open source</p>
            </div>
            <div>
              <MonoTag>Stack</MonoTag>
              <ul className="mt-3 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s} className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[12.5px] text-secondary ring-1 ring-white/[0.07]">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
