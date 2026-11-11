import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, Trophy, X } from 'lucide-react'
import { useCallback, useRef, useState, type PointerEvent } from 'react'
import { Chip, ease, GitHubIcon, Reveal, Section, SectionHeader } from '../components/ui'
import { profile, projects, type Project } from '../data/resume'
import { useFocusTrap, useScrollLock } from '../hooks'

/** Browser-chrome frame around a screenshot, or a generated cover when there's no image. */
function Cover({ p, large }: { p: Project; large?: boolean }) {
  const live = p.links?.find((l) => l.kind === 'live')
  const host = (live ?? p.links?.[0])?.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1016]"
      style={{ boxShadow: `0 30px 80px -40px hsl(${p.hue} 90% 60% / 0.45)` }}
    >
      <div className="flex h-7 min-w-0 items-center gap-1.5 overflow-hidden border-b border-white/[0.06] bg-white/[0.03] px-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        {host && <span className="ml-3 min-w-0 truncate font-mono text-[10px] text-faint">{host}</span>}
      </div>
      <div className={`relative ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'} overflow-hidden`}>
        {p.image ? (
          <img
            src={p.image}
            alt={`${p.name} — interface preview`}
            loading="lazy"
            decoding="async"
            width={530}
            height={300}
            className="size-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
          />
        ) : (
          <div
            className="relative grid size-full place-items-center bg-grid"
            style={{
              backgroundColor: `hsl(${p.hue} 30% 7%)`,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: `radial-gradient(60% 70% at 30% 20%, hsl(${p.hue} 90% 65% / 0.28), transparent 60%), radial-gradient(50% 60% at 85% 90%, hsl(${(p.hue + 60) % 360} 80% 60% / 0.18), transparent 60%)`,
              }}
            />
            <span className={`relative px-6 text-center font-serif italic leading-[0.95] text-white/85 ${p.name.length > 12 ? 'text-4xl md:text-[2.6rem]' : 'text-5xl md:text-6xl'}`}>
              {p.name}
            </span>
          </div>
        )}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0d12]/70 via-transparent to-transparent" />
      </div>
    </div>
  )
}

function ProjectCard({ p, onOpen, large }: { p: Project; onOpen: () => void; large?: boolean }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 })
  const glare = useTransform(
    [mx, my],
    ([x, y]) => `radial-gradient(500px circle at ${(x as number) * 100}% ${(y as number) * 100}%, hsl(${p.hue} 100% 80% / 0.12), transparent 40%)`,
  )

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }
  const extra = p.tech.length - 4

  return (
    <div style={{ perspective: 1400 }} className="h-full">
      <motion.article
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="glass group relative flex h-full flex-col rounded-[1.75rem] p-3 transition-[border-color] duration-500 hover:border-white/15"
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem]" style={{ background: glare }} />
        {/* Whole card opens the details dialog; content above is click-through except the live link. */}
        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-label={`${p.name} — view project details`}
          className="absolute inset-0 z-[5] cursor-pointer rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <div className="pointer-events-none relative z-[6]" style={{ transform: 'translateZ(30px)' }}>
          <Cover p={p} large={large} />
        </div>
        <div className="pointer-events-none relative z-[6] flex flex-1 flex-col px-3 pb-3 pt-5 md:px-4" style={{ transform: 'translateZ(20px)' }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-medium tracking-[-0.02em] text-fg md:text-[1.4rem]">{p.name}</h3>
              <p className="mt-1 font-serif text-[1.05rem] italic text-accent">{p.tagline}</p>
            </div>
            <span
              aria-hidden
              className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-muted transition-all duration-500 group-hover:rotate-90 group-hover:border-white/25 group-hover:text-fg"
            >
              <Plus className="size-4" />
            </span>
          </div>

          {(p.highlights?.[0] || p.context) && (
            <p className="mt-3 flex items-start gap-2 text-[12.5px] leading-snug text-gold/90">
              {p.highlights?.[0] ? <Trophy className="mt-px size-3.5 shrink-0" aria-hidden /> : null}
              <span className={p.highlights?.[0] ? '' : 'text-faint'}>{p.highlights?.[0] ?? p.context}</span>
            </p>
          )}

          <p className="mt-3 line-clamp-3 text-[14.5px] leading-relaxed text-muted">{p.summary}</p>

          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-5">
            {p.tech.slice(0, 4).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
            {extra > 0 && <span className="chip text-faint">+{extra}</span>}
            {p.links && p.links.length > 0 && (
              <span className="pointer-events-auto ml-auto flex items-center gap-1">
                {p.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={l.kind === 'live' ? 'Live site' : 'GitHub repository'}
                    className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 text-[12px] text-fg/85 transition-colors hover:border-white/25 hover:text-white"
                  >
                    {l.kind === 'live' ? (
                      <>
                        Live <ArrowUpRight className="size-3.5" aria-hidden />
                      </>
                    ) : (
                      <>
                        <GitHubIcon className="size-3.5" /> Code
                      </>
                    )}
                    <span className="sr-only"> — {p.name} (opens in new tab)</span>
                  </a>
                ))}
              </span>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

function ProjectDialog({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (d: number) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const p = projects[index]
  useScrollLock(true)
  useFocusTrap(ref, true, onClose)

  return (
    <motion.div
      className="fixed inset-0 z-[75] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onStep(1)
        if (e.key === 'ArrowLeft') onStep(-1)
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} aria-hidden />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="glass relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-[2rem] !bg-[#0b0d12]/95 sm:rounded-[2rem]"
        initial={{ y: 40, scale: 0.97, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 30, scale: 0.98, opacity: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-white/[0.06] bg-[#0b0d12]/85 px-5 py-3 backdrop-blur-xl">
          <span className="font-mono text-[11px] tracking-[0.2em] text-faint">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={() => onStep(-1)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/5 hover:text-fg" aria-label="Previous project">
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={() => onStep(1)} className="grid size-9 place-items-center rounded-full text-muted hover:bg-white/5 hover:text-fg" aria-label="Next project">
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <button type="button" onClick={onClose} className="ml-1 grid size-9 place-items-center rounded-full bg-white/[0.06] text-fg hover:bg-white/10" aria-label="Close project details">
              <X className="size-4" aria-hidden />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease }}
            className="p-5 sm:p-8"
          >
            <Cover p={p} large />
            <div className="mt-7">
              <p className="font-serif text-lg italic text-accent">{p.tagline}</p>
              <h3 id="project-dialog-title" className="mt-1 text-3xl font-medium tracking-[-0.03em] text-fg md:text-4xl">
                {p.name}
              </h3>
              {p.context && <p className="mt-3 inline-flex rounded-full border border-white/10 px-3 py-1 text-[12px] text-muted">{p.context}</p>}
              <p className="mt-5 text-[15.5px] leading-relaxed text-fg/85">{p.summary}</p>

              <h4 className="eyebrow mt-8">What I built</h4>
              <ul className="mt-4 space-y-2.5">
                {p.details.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-accent/70" />
                    {d}
                  </li>
                ))}
              </ul>

              {p.highlights && (
                <>
                  <h4 className="eyebrow mt-8">Highlights</h4>
                  <ul className="mt-4 space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[15px] text-gold/90">
                        <Trophy className="mt-0.5 size-4 shrink-0" aria-hidden /> {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <h4 className="eyebrow mt-8">Technologies</h4>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>

              {p.links && (
                <div className="mt-9 flex flex-wrap gap-2.5">
                  {p.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition ${
                        l.kind === 'live' ? 'bg-white text-ink' : 'glass text-fg hover:border-white/20'
                      }`}
                    >
                      {l.kind === 'live' ? (
                        <>
                          Visit live site <ArrowUpRight className="size-4" aria-hidden />
                        </>
                      ) : (
                        <>
                          <GitHubIcon /> View source on GitHub
                        </>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function Projects() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + projects.length) % projects.length)), [])
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <Section id="projects">
      <SectionHeader
        id="projects"
        index="03"
        eyebrow="Selected work"
        title={
          <>
            Things I’ve{' '}
            <span className="font-serif font-normal italic tracking-normal text-accent-gradient">designed & built</span>
          </>
        }
        lead="Full-stack platforms, AI systems and production-hardening exercises. Open any card for the full breakdown."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.08} className="h-full min-w-0">
            <ProjectCard p={p} large onOpen={() => setOpen(projects.indexOf(p))} />
          </Reveal>
        ))}
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.06} className="h-full min-w-0">
            <ProjectCard p={p} onOpen={() => setOpen(projects.indexOf(p))} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="glass inline-flex h-12 items-center gap-2.5 rounded-full px-6 text-[14px] text-fg transition hover:border-white/20"
        >
          <GitHubIcon /> More on GitHub <ArrowUpRight className="size-4 text-muted" aria-hidden />
        </a>
      </Reveal>

      <AnimatePresence>{open !== null && <ProjectDialog index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </Section>
  )
}
