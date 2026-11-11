import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { nav, profile } from '../data/resume'
import { useActiveSection, useFocusTrap, useScrollLock } from '../hooks'
import { ease } from './ui'

const ids = nav.map((n) => n.id)

export function Nav() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sheet = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })

  useScrollLock(open)
  useFocusTrap(sheet, open, () => setOpen(false))

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-accent/0 via-accent to-accent-2"
        style={{ scaleX: progress }}
      />

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.9 }}
        className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a
            href="#home"
            className={`group flex h-11 items-center gap-2.5 rounded-full pl-1.5 pr-4 transition-all duration-500 ${scrolled ? 'glass' : ''}`}
            aria-label={`${profile.name} — back to top`}
          >
            <span className="grid size-8 place-items-center rounded-full bg-white/[0.06] font-serif text-[17px] italic text-accent ring-1 ring-white/10">
              {profile.initials}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-fg/90 sm:block">{profile.name}</span>
          </a>

          <nav aria-label="Primary" className="glass hidden rounded-full p-1 lg:block">
            <ul className="flex items-center">
              {nav.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? 'true' : undefined}
                      className={`relative z-10 block rounded-full px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {item.label}
                    </a>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                        aria-hidden
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.resumeFile}
              download
              target="_blank"
              rel="noopener"
              className="glass hidden h-11 items-center gap-2 rounded-full px-4 text-[13px] font-medium text-fg transition hover:border-white/20 hover:bg-white/10 sm:flex"
            >
              <Download className="size-4 text-accent" aria-hidden /> Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="glass grid size-11 place-items-center rounded-full lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[70] flex flex-col bg-ink/85 px-6 pb-10 pt-5 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl italic text-accent">{profile.initials}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="glass grid size-11 place-items-center rounded-full"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <ul className="mt-12 flex flex-1 flex-col justify-center gap-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.05 + i * 0.045 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-2.5 text-[2.1rem] font-medium tracking-[-0.03em] text-fg/90"
                  >
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    <span className={active === item.id ? 'text-accent-gradient' : ''}>{item.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={profile.resumeFile}
              download
              target="_blank"
              rel="noopener"
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-white text-[15px] font-medium text-ink"
            >
              <Download className="size-4" aria-hidden /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Short intro curtain on first paint. Skipped for reduced-motion users. */
export function Loader({ reduced }: { reduced: boolean }) {
  const [show, setShow] = useState(!reduced)
  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => setShow(false), 1050)
    return () => clearTimeout(t)
  }, [reduced])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[80] grid place-items-center bg-ink"
          exit={{ opacity: 0, transition: { duration: 0.7, ease } }}
        >
          <div className="flex flex-col items-center gap-5">
            <motion.span
              className="font-serif text-6xl italic text-accent-gradient"
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.7, ease }}
            >
              {profile.initials}
            </motion.span>
            <div className="h-px w-28 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-2"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.9, ease }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
