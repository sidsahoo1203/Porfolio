import { AnimatePresence, motion } from 'framer-motion'
import { Brain, Cloud, Code2, Database, Layout, Server, Wrench } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Spotlight } from '../components/Spotlight'
import { ease, Reveal, Section, SectionHeader } from '../components/ui'
import { skills } from '../data/resume'
import { usageOf } from '../lib/skillIndex'

const icons: Record<string, ReactNode> = {
  lang: <Code2 className="size-4" />,
  fe: <Layout className="size-4" />,
  be: <Server className="size-4" />,
  db: <Database className="size-4" />,
  cloud: <Cloud className="size-4" />,
  ai: <Brain className="size-4" />,
  tools: <Wrench className="size-4" />,
}

export function Skills() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <Section id="skills">
      <SectionHeader
        id="skills"
        index="04"
        eyebrow="Skills"
        title={
          <>
            The{' '}
            <span className="font-serif font-normal italic tracking-normal text-accent-gradient">toolkit</span>
          </>
        }
        lead="Select any skill to see the projects, roles and certifications behind it."
      />

      <div className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4">
        {skills.map((g, gi) => {
          const selectedHere = g.items.find((i) => i === selected)
          const used = selectedHere ? usageOf(selectedHere) : []
          return (
            <Reveal key={g.id} delay={(gi % 3) * 0.06} className="break-inside-avoid">
              <Spotlight className="p-6 md:p-7" hue={200 + gi * 15}>
                <h3 className="flex items-center gap-2.5 text-[15px] font-medium text-fg">
                  <span className="grid size-8 place-items-center rounded-xl bg-white/[0.05] text-accent ring-1 ring-white/10">
                    {icons[g.id]}
                  </span>
                  {g.label}
                  <span className="ml-auto font-mono text-[11px] text-faint">{String(g.items.length).padStart(2, '0')}</span>
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={g.label}>
                  {g.items.map((s, i) => {
                    const on = selected === s
                    return (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.03 }}
                      >
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setSelected(on ? null : s)}
                          className={`rounded-full border px-3 py-1.5 text-[13px] transition-all duration-300 hover:-translate-y-0.5 ${
                            on
                              ? 'border-accent/60 bg-accent/15 text-white shadow-[0_0_24px_-6px_rgba(169,193,255,0.7)]'
                              : 'border-white/[0.08] bg-white/[0.035] text-[#c3c8d2] hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      </motion.li>
                    )
                  })}
                </ul>

                <AnimatePresence initial={false}>
                  {selectedHere && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                      aria-live="polite"
                    >
                      <div className="mt-5 border-t border-white/[0.07] pt-4">
                        <p className="eyebrow !text-[10px]">Used in</p>
                        {used.length ? (
                          <ul className="mt-3 space-y-1.5">
                            {used.map((u) => (
                              <li key={u.kind + u.name}>
                                <a href={u.href} className="flex items-center justify-between gap-3 text-[13.5px] text-fg/90 hover:text-white">
                                  {u.name}
                                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-faint">{u.kind}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mt-2 text-[13px] text-muted">Listed on my resume — not tied to a specific project here.</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Spotlight>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}
