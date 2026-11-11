import type { ReactNode, PointerEvent } from 'react'

/** Glass card with a soft light that follows the cursor (pure CSS variables, no re-renders). */
export function Spotlight({ children, className = '', hue = 225 }: { children: ReactNode; className?: string; hue?: number }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--sx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }
  return (
    <div
      onPointerMove={onMove}
      className={`glass group/spot relative overflow-hidden rounded-3xl transition-colors duration-500 hover:border-white/15 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--sx, 50%) var(--sy, 0%), hsl(${hue} 100% 80% / 0.09), transparent 45%)`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
