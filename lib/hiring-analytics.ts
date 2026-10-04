import { track } from "@vercel/analytics"

export type HiringEvent =
  | "hiring_nav_click"
  | "hiring_page_view"
  | "hiring_primary_cta_click"
  | "hiring_try_mcp_click"

export function trackHiring(event: HiringEvent, properties?: Record<string, string>) {
  try {
    track(event, properties)
  } catch {
    // Analytics must never break navigation.
  }
}
