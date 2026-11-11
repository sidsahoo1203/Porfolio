import { motion, useScroll, useSpring } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { useRef } from 'react'
import { Spotlight } from '../components/Spotlight'
import { Chip, ease, Section, SectionHeader } from '../components/ui'
import { experience } from '../data/resume'

export function Experience() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 75%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.4 })

  return (
    <Section id="experience">
      <SectionHeader
        id="experience"
        index="02"
        eyebrow="Experience"
        title={
          <>
            Where I’ve{' '}
            <span className="font-serif font-normal italic tracking-normal text-accent-gradient">shipped & learned</span>
          </>
        }
        lead="Internships across cloud business applications, MERN development and public-sector data work."
      />

      <ol ref={list} className="relative">
        {/* timeline rail */}
        <div aria-hidden className="absolute bottom-2 left-[11px] top-2 w-px bg-white/[0.08] md:left-[calc(11rem+11px)]" />
        <motion.div
          aria-hidden
          style={{ scaleY: fill }}
          className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-gradient-to-b from-accent via-accent to-accent-2 shadow-[0_0_12px_rgba(169,193,255,0.8)] md:left-[calc(11rem+11px)]"
        />

        {experience.map((job, i) => (
          <motion.li
            key={job.company + job.start}
            className="relative grid gap-3 pb-10 pl-10 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 0.9, ease, delay: 0.04 * i }}
          >
            {/* date column */}
            <div className="md:pr-8 md:pt-7 md:text-right">
              <p className="font-mono text-[12px] tracking-wide text-fg/80">
                <time>{job.start}</time> — <time>{job.end}</time>
              </p>
              <p className="mt-1 hidden items-center justify-end gap-1 text-[12px] text-faint md:flex">
                <MapPin className="size-3" aria-hidden /> {job.location}
              </p>
            </div>

            {/* node */}
            <span
              aria-hidden
              className="absolute left-0 top-1 grid size-[23px] place-items-center rounded-full border border-white/15 bg-ink md:left-[11rem] md:top-7"
            >
              <span className="size-2 rounded-full bg-accent shadow-[0_0_10px_2px_rgba(169,193,255,0.7)]" />
            </span>

            <div className="md:pl-12">
              <Spotlight className="p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.015em] text-fg md:text-xl">{job.role}</h3>
                    <p className="mt-1 text-[15px] text-accent">{job.company}</p>
                  </div>
                  <p className="flex items-center gap-1 text-[12px] text-faint md:hidden">
                    <MapPin className="size-3" aria-hidden /> {job.location}
                  </p>
                </div>
                {job.points.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[14.5px] leading-relaxed text-muted">
                        <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-white/30" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {job.tech.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {job.tech.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                )}
              </Spotlight>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  )
}
