"use client"

import { useEffect } from "react"
import { trackHiring } from "@/lib/hiring-analytics"

export function HiringPageView() {
  useEffect(() => {
    trackHiring("hiring_page_view")
  }, [])
  return null
}
