import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Tone = "default" | "accent" | "coral" | "muted" | "product"

export type FlowNode = {
  id: string
  x: number
  y: number
  w: number
  h: number
  title: string
  sub?: string
  tone?: Tone
  icon?: LucideIcon
}

export type FlowEdge = { from: string; to: string; tone?: "accent" | "coral" | "muted" }

export type FlowLabel = { x: number; y: number; text: string; tone?: "accent" | "muted" }

interface FlowGraphProps {
  id: string
  width: number
  height: number
  nodes: FlowNode[]
  edges: FlowEdge[]
  labels?: FlowLabel[]
  orientation?: "h" | "v"
  ariaLabel: string
  className?: string
}

const nodeStyle: Record<Tone, { fill: string; stroke: string; title: string; sub: string; dash?: string }> = {
  default: { fill: "#0E1C19", stroke: "rgba(255,255,255,0.12)", title: "#EAF2EF", sub: "#7F948D" },
  accent: { fill: "rgba(159,230,205,0.09)", stroke: "rgba(159,230,205,0.5)", title: "#EAF2EF", sub: "#9FE6CD" },
  coral: { fill: "rgba(255,107,74,0.08)", stroke: "rgba(255,107,74,0.45)", title: "#EAF2EF", sub: "#FF9A82" },
  muted: { fill: "rgba(255,255,255,0.02)", stroke: "rgba(255,255,255,0.16)", title: "#A9BCB6", sub: "#7F948D", dash: "4 5" },
  product: { fill: "#051210", stroke: "#9FE6CD", title: "#EAF2EF", sub: "#9FE6CD" }
}

const edgeColor = { accent: "#9FE6CD", coral: "#FF6B4A", muted: "rgba(255,255,255,0.28)" }

function edgePath(a: FlowNode, b: FlowNode, orientation: "h" | "v") {
  if (orientation === "v") {
    const x1 = a.x + a.w / 2
    const y1 = a.y + a.h
    const x2 = b.x + b.w / 2
    const y2 = b.y
    const d = (y2 - y1) / 2
    return `M${x1},${y1} C${x1},${y1 + d} ${x2},${y2 - d} ${x2},${y2}`
  }
  const x1 = a.x + a.w
  const y1 = a.y + a.h / 2
  const x2 = b.x
  const y2 = b.y + b.h / 2
  const d = (x2 - x1) / 2
  return `M${x1},${y1} C${x1 + d},${y1} ${x2 - d},${y2} ${x2},${y2}`
}

/**
 * Animated SVG flow diagram. Connectors draw in when the parent [data-reveal] is
 * revealed, then a pulse travels along each one. Pulses are hidden for reduced motion.
 */
export function FlowGraph({ id, width, height, nodes, edges, labels = [], orientation = "h", ariaLabel, className }: FlowGraphProps) {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))
  const pad = 8

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
      className={cn("flow-graph h-auto w-full overflow-visible", className)}
      role="img"
      aria-label={ariaLabel}
    >
      <defs>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {edges.map((edge, i) => {
        const d = edgePath(byId[edge.from], byId[edge.to], orientation)
        const tone = edge.tone ?? "accent"
        const color = edgeColor[tone]
        const pathId = `${id}-e${i}`
        return (
          <g key={pathId}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} />
            <path
              id={pathId}
              d={d}
              fill="none"
              stroke={color}
              strokeOpacity={tone === "muted" ? 1 : 0.55}
              strokeWidth={1.5}
              strokeDasharray={tone === "muted" ? "3 6" : undefined}
              pathLength={tone === "muted" ? undefined : 1}
              className={tone === "muted" ? undefined : "flow-edge"}
              style={{ animationDelay: `${150 + i * 110}ms` }}
            />
            {tone !== "muted" && (
              <g className="flow-dot">
                <circle r={6} fill={color} opacity={0.35} filter={`url(#${id}-glow)`}>
                  <animateMotion dur="2.8s" begin={`${(i * 0.37) % 2.8}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
                <circle r={2.6} fill={color}>
                  <animateMotion dur="2.8s" begin={`${(i * 0.37) % 2.8}s`} repeatCount="indefinite">
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              </g>
            )}
          </g>
        )
      })}

      {nodes.map((node, i) => {
        const s = nodeStyle[node.tone ?? "default"]
        const Icon = node.icon
        const textX = node.x + (Icon ? 46 : 16)
        const cy = node.y + node.h / 2
        return (
          <g key={node.id} className="flow-node" style={{ animationDelay: `${i * 90}ms` }}>
            {node.tone === "product" && (
              <rect x={node.x - 4} y={node.y - 4} width={node.w + 8} height={node.h + 8} rx={18} fill="none" stroke="#9FE6CD" strokeOpacity={0.18} />
            )}
            <rect x={node.x} y={node.y} width={node.w} height={node.h} rx={14} fill={s.fill} stroke={s.stroke} strokeDasharray={s.dash} />
            {Icon && (
              <>
                <rect x={node.x + 12} y={cy - 13} width={26} height={26} rx={8} fill="rgba(255,255,255,0.05)" />
                <Icon x={node.x + 18} y={cy - 7} width={14} height={14} color={s.sub === "#7F948D" ? "#A9BCB6" : s.sub} strokeWidth={1.8} />
              </>
            )}
            <text
              x={textX}
              y={node.sub ? cy - 7 : cy}
              dominantBaseline="middle"
              fill={s.title}
              fontSize={14}
              fontWeight={600}
              fontFamily="var(--font-dm-sans), system-ui, sans-serif"
            >
              {node.title}
            </text>
            {node.sub && (
              <text x={textX} y={cy + 11} dominantBaseline="middle" fill={s.sub} fontSize={10.5} fontFamily="var(--font-mono), monospace" letterSpacing={0.4}>
                {node.sub}
              </text>
            )}
          </g>
        )
      })}

      {labels.map((label) => (
        <text
          key={label.text}
          x={label.x}
          y={label.y}
          fill={label.tone === "accent" ? "#9FE6CD" : "#7F948D"}
          fontSize={10.5}
          letterSpacing={1.6}
          fontFamily="var(--font-mono), monospace"
          className="flow-node"
        >
          {label.text.toUpperCase()}
        </text>
      ))}
    </svg>
  )
}

/** Renders a wide diagram from md up and a compact one below it. */
export function ResponsiveFlow({ desktop, mobile }: { desktop: FlowGraphProps; mobile: FlowGraphProps }) {
  return (
    <div data-reveal>
      <FlowGraph {...desktop} className={cn("hidden md:block", desktop.className)} />
      <FlowGraph {...mobile} className={cn("md:hidden", mobile.className)} />
    </div>
  )
}
