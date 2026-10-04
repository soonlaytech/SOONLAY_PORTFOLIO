// Hiring product (EngineerDNA) configuration. Every product fact on /hiring is
// taken from the EngineerDNA repository; nothing here is a usage metric.

export const HIRING_PRODUCT_NAME = "EngineerDNA"
export const HIRING_PAGE_PATH = "/hiring"
export const HIRING_SOURCE_URL = "https://github.com/kuldeep31016/EngineerDNA"

// TODO(hiring): set NEXT_PUBLIC_HIRING_PRODUCT_URL to the live product/MCP URL.
// Until then the CTA points at the public repository so it never dead-ends.
export const HIRING_PRODUCT_URL = process.env.NEXT_PUBLIC_HIRING_PRODUCT_URL || HIRING_SOURCE_URL
export const HIRING_CTA_LABEL = "Try MCP"

export function isExternalUrl(url: string) {
  return /^https?:\/\//.test(url)
}

/** Candidate Ranking Engine factors and weights (apps/api/src/recruiter/ranking.service.ts). */
export const RANKING_FACTORS = [
  { label: "Skill match", weight: 0.3 },
  { label: "Engineering DNA", weight: 0.25 },
  { label: "Evidence depth", weight: 0.2 },
  { label: "Project signal", weight: 0.15 },
  { label: "Recent activity", weight: 0.1 }
] as const

/** Application lifecycle, as defined in the shared application contract. */
export const PIPELINE_STAGES = [
  "Applied",
  "Viewed",
  "Screening",
  "Shortlisted",
  "Interview Scheduled",
  "Offer Sent",
  "Offer Accepted",
  "Hired"
] as const
