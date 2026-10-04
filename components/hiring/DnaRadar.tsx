import { DNA_DIMENSIONS } from "@/lib/hiring"

const SIZE = 200
const C = SIZE / 2
const R = 76

function point(i: number, value: number) {
  const angle = (Math.PI * 2 * i) / DNA_DIMENSIONS.length - Math.PI / 2
  const r = (R * value) / 100
  return [C + r * Math.cos(angle), C + r * Math.sin(angle)] as const
}

/** Ten-axis Developer DNA radar. Values are sample data supplied by the caller. */
export function DnaRadar({ values, className }: { values: number[]; className?: string }) {
  const shape = values.map((v, i) => point(i, v).join(",")).join(" ")
  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className={className} role="img" aria-label="Developer DNA radar across ten engineering dimensions (sample data)">
      {[25, 50, 75, 100].map((ring) => (
        <polygon
          key={ring}
          points={DNA_DIMENSIONS.map((_, i) => point(i, ring).join(",")).join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
        />
      ))}
      {DNA_DIMENSIONS.map((_, i) => {
        const [x, y] = point(i, 100)
        return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" />
      })}
      <polygon points={shape} className="dna-shape" fill="rgba(159,230,205,0.16)" stroke="#9FE6CD" strokeWidth={1.4} strokeLinejoin="round" />
      {values.map((v, i) => {
        const [x, y] = point(i, v)
        return <circle key={i} cx={x} cy={y} r={2.2} fill="#9FE6CD" className="dna-node" style={{ animationDelay: `${600 + i * 60}ms` }} />
      })}
    </svg>
  )
}
