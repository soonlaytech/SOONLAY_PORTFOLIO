import { ProductMark, TryMcpLink } from "@/components/hiring/primitives"
import { HIRING_PRODUCT_NAME } from "@/lib/hiring"

export function HiringCTA() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="hiring-grid relative overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center ring-1 ring-accent-2/20 sm:px-12 lg:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgba(159,230,205,0.16),transparent_70%)]" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.05] py-1.5 pl-1.5 pr-4 text-sm font-semibold text-primary ring-1 ring-white/10">
              <ProductMark /> {HIRING_PRODUCT_NAME}
            </span>
            <h2 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-primary sm:text-5xl lg:text-6xl">
              Stop reading claims. <span className="accent-serif">Start reading evidence.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-secondary sm:text-lg">
              See how a GitHub profile becomes a verified, rankable hire.
            </p>
            <div className="mt-10 flex justify-center">
              <TryMcpLink location="closing-cta" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
