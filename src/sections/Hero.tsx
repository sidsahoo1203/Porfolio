import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Download, MapPin } from 'lucide-react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ease, Magnetic } from '../components/ui'
import { heroFacts, profile } from '../data/resume'
import { useMediaQuery, useOnScreen } from '../hooks'

const HeroScene = lazy(() => import('../three/HeroScene'))

function webglAvailable() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = !!useReducedMotion()
  const compact = useMediaQuery('(max-width: 767px)')
  const onScreen = useOnScreen(ref, '0px 0px -10% 0px')
  const [gl, setGl] = useState(false)

  // Mount WebGL after first paint so text is interactive immediately.
  useEffect(() => {
    if (!webglAvailable()) return
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback
    const start = () => setGl(true)
    if (idle) idle(start)
    else setTimeout(start, 200)
  }, [])

  // Portrait tilt follows the cursor across the hero.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-1, 1], [7, -7]), { stiffness: 120, damping: 20 })
  const ry = useSpring(useTransform(mx, [-1, 1], [-9, 9]), { stiffness: 120, damping: 20 })
  const glowX = useTransform(mx, [-1, 1], ['30%', '70%'])
  const glowY = useTransform(my, [-1, 1], ['25%', '75%'])
  const glare = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(40% 35% at ${x} ${y}, rgba(255,255,255,0.35), transparent 70%)`,
  )

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse') return
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }

  const words = profile.name.split(' ')

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      aria-labelledby="home-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8 md:pt-32"
    >
      {/* Ambient light + 3D layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(169,193,255,0.14),transparent)] blur-2xl" />
        <div className="absolute right-[-10%] top-[20%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(134,227,204,0.08),transparent)] blur-2xl" />
        {gl && (
          <Suspense fallback={null}>
            <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              <HeroScene active={onScreen} reduced={reduce} compact={compact} />
            </motion.div>
          </Suspense>
        )}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div className="order-2 lg:order-1">
          <motion.p
            className="eyebrow flex items-center gap-2.5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.05 }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-2 opacity-50 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-2" />
            </span>
            M.Tech CSE · SRM IST, Chennai
          </motion.p>

          <h1 id="home-title" className="mt-6 text-[clamp(3rem,9vw,6.75rem)] font-medium leading-[0.92] tracking-[-0.055em]">
            {words.map((w, i) => (
              <span key={w} className="-mb-[0.1em] block overflow-hidden pb-[0.16em]">
                <motion.span
                  className="block text-gradient"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, ease, delay: 1.1 + i * 0.09 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 text-xl font-medium tracking-[-0.02em] text-fg md:text-2xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.3 }}
          >
            {profile.title}{' '}
            <span className="font-serif text-[1.15em] font-normal italic tracking-normal text-accent-gradient">
              {profile.titleAccent}
            </span>
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted md:text-[17px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.4 }}
          >
            {profile.intro}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.5 }}
          >
            <Magnetic
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white pl-6 pr-5 text-[15px] font-medium text-ink shadow-[0_10px_40px_-10px_rgba(169,193,255,0.6)] transition-shadow hover:shadow-[0_14px_50px_-8px_rgba(169,193,255,0.8)]"
            >
              View My Work
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Magnetic>
            <Magnetic
              href={profile.resumeFile}
              download
              target="_blank"
              rel="noopener"
              className="glass inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium text-fg transition hover:border-white/20"
            >
              <Download className="size-4 text-accent" aria-hidden />
              Download Resume
            </Magnetic>
          </motion.div>

          <motion.dl
            className="mt-12 grid max-w-xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.06] sm:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.7 }}
          >
            {heroFacts.map((f) => (
              <div key={f.label} className="bg-ink/80 px-4 py-3.5 backdrop-blur">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{f.label}</dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-fg/90">{f.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Portrait */}
        <motion.div
          className="order-1 mx-auto w-full max-w-[12.5rem] sm:max-w-[17rem] lg:order-2 lg:max-w-[23rem]"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 1 }}
          style={{ perspective: 1200 }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }} className="relative">
            {/* soft light orb behind the portrait */}
            <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(169,193,255,0.35),rgba(134,227,204,0.08)_60%,transparent)] blur-2xl" />
            {/* orbit ring */}
            <div
              aria-hidden
              className="absolute -inset-5 rounded-t-[12rem] rounded-b-[2.25rem] border border-white/[0.07] motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
              style={{ transform: 'translateZ(-40px)' }}
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[11rem] rounded-b-[2rem] border border-white/10 bg-gradient-to-b from-[#141924] to-[#090b10] shadow-[0_40px_120px_-40px_rgba(169,193,255,0.45)]">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  className="size-full object-cover"
                  width={736}
                  height={920}
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <div className="relative grid size-full place-items-center bg-grid">
                  <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(169,193,255,0.18),transparent)]" />
                  <span
                    role="img"
                    aria-label={`${profile.name} monogram`}
                    className="relative font-serif text-[6.5rem] italic leading-none text-accent-gradient sm:text-[8.5rem] lg:text-[11rem]"
                  >
                    {profile.initials}
                  </span>
                </div>
              )}
              {/* moving glare */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                style={{ background: glare }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div
              className="glass absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[12px] text-fg/90"
              style={{ transform: 'translateZ(50px)' }}
            >
              <MapPin className="size-3.5 text-accent-2" aria-hidden />
              {profile.location}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-fg md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowDown className="size-4 motion-safe:animate-bounce" aria-hidden />
      </motion.a>
    </section>
  )
}
