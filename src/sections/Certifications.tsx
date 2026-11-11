import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, CalendarDays, Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Lightbox, Thumb, type LightboxItem } from '../components/Lightbox'
import { Spotlight } from '../components/Spotlight'
import { ease, Reveal, Section, SectionHeader } from '../components/ui'
import { certifications, issuerLogos, type Certification } from '../data/resume'
import { usageOf } from '../lib/skillIndex'

/** Neutral text monogram per issuer (no logos). */
const issuerMark: Record<string, { label: string; hue: number }> = {
  'Amazon Web Services (AWS)': { label: 'AWS', hue: 35 },
  Fortinet: { label: 'FTNT', hue: 2 },
  'Indian Institute of Remote Sensing (IIRS), ISRO': { label: 'IIRS', hue: 25 },
  freeCodeCamp: { label: 'fCC', hue: 140 },
  'HP LIFE': { label: 'HP', hue: 205 },
  'Parul University': { label: 'PU', hue: 260 },
  Cisco: { label: 'CSCO', hue: 195 },
  'Google · Coursera': { label: 'G', hue: 220 },
}

function CopyId({ id }: { id: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(id)
          setDone(true)
          setTimeout(() => setDone(false), 1500)
        } catch {
          /* clipboard blocked — ID is visible anyway */
        }
      }}
      className="grid size-7 shrink-0 place-items-center rounded-full text-faint transition hover:bg-white/5 hover:text-fg"
      aria-label="Copy credential ID"
    >
      {done ? <Check className="size-3.5 text-accent-2" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
    </button>
  )
}

function IssuerMark({ c }: { c: Certification }) {
  const [broken, setBroken] = useState(false)
  const src = c.logo ?? issuerLogos[c.issuer]
  const mark = issuerMark[c.issuer] ?? { label: c.issuer.slice(0, 2), hue: 225 }
  if (src && !broken)
    return (
      <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-white/10">
        <img
          src={src}
          alt={`${c.issuer} logo`}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain"
          onError={() => setBroken(true)}
        />
      </span>
    )
  return (
    <span
      aria-hidden
      className="grid size-12 shrink-0 place-items-center rounded-2xl font-mono text-[11px] font-medium tracking-wide ring-1 ring-white/10"
      style={{ background: `hsl(${mark.hue} 70% 55% / 0.12)`, color: `hsl(${mark.hue} 90% 75%)` }}
    >
      {mark.label}
    </span>
  )
}

function CertCard({ c, onImage }: { c: Certification; onImage: (i: LightboxItem) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const mark = issuerMark[c.issuer] ?? { label: c.issuer.slice(0, 2), hue: 225 }
  const used = selected ? usageOf(selected).filter((u) => !(u.kind === 'Certification' && u.name === c.name)) : []

  return (
    <Spotlight className="h-full p-6" hue={mark.hue}>
      <article id={`cert-${c.id}`} className="flex h-full scroll-mt-28 flex-col">
        <div className="flex items-start gap-4">
          <IssuerMark c={c} />
          <div className="min-w-0">
            <h3 className="text-[16.5px] font-medium leading-snug tracking-[-0.01em] text-fg">{c.name}</h3>
            <p className="mt-1 text-[13.5px] text-accent">{c.issuer}</p>
          </div>
        </div>

        {(c.issued || c.expires) && (
          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-muted">
            <CalendarDays className="size-3.5 text-faint" aria-hidden />
            {c.issued && <span>Issued {c.issued}</span>}
            {c.expires && (
              <>
                <span className="text-faint" aria-hidden>
                  ·
                </span>
                <span>Expires {c.expires}</span>
              </>
            )}
          </p>
        )}

        {c.credentialId && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.02] py-1.5 pl-3 pr-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-faint">ID</span>
            <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-fg/85" title={c.credentialId}>
              {c.credentialId}
            </code>
            <CopyId id={c.credentialId} />
          </div>
        )}

        {c.skills.length > 0 && (
          <div className="mt-5">
            <p className="eyebrow !text-[10px]">Skills</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {c.skills.map((s) => {
                const on = selected === s
                return (
                  <li key={s}>
                    <button
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSelected(on ? null : s)}
                      className={`rounded-full border px-2.5 py-1 text-[12px] transition-all duration-300 ${
                        on
                          ? 'border-accent/60 bg-accent/15 text-white shadow-[0_0_20px_-6px_rgba(169,193,255,0.7)]'
                          : 'border-white/[0.08] bg-white/[0.035] text-[#c3c8d2] hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  </li>
                )
              })}
            </ul>
            <AnimatePresence initial={false}>
              {selected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="overflow-hidden"
                  aria-live="polite"
                >
                  <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
                    <p className="eyebrow !text-[10px]">Also used in</p>
                    {used.length ? (
                      <ul className="mt-2 space-y-1">
                        {used.map((u) => (
                          <li key={u.kind + u.name}>
                            <a href={u.href} className="flex items-center justify-between gap-3 text-[13px] text-fg/90 hover:text-white">
                              <span className="truncate">{u.name}</span>
                              <span className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.15em] text-faint">{u.kind}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1.5 text-[12.5px] text-muted">Covered by this certification.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-auto space-y-3 pt-5">
          <Thumb
            src={c.image}
            title={c.name}
            onOpen={() =>
              c.image &&
              onImage({
                src: c.image,
                title: c.name,
                subtitle: [c.issuer, c.issued && `Issued ${c.issued}`].filter(Boolean).join(' · '),
                link: c.credentialUrl ? { label: 'Show credential', url: c.credentialUrl } : undefined,
              })
            }
          />
          {c.credentialUrl && (
            <a
              href={c.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[12.5px] text-fg/90 transition hover:border-white/25 hover:text-white"
            >
              <BadgeCheck className="size-3.5 text-accent-2" aria-hidden /> Show credential{' '}
              <ArrowUpRight className="size-3.5" aria-hidden />
              <span className="sr-only"> — {c.name} (opens in new tab)</span>
            </a>
          )}
        </div>
      </article>
    </Spotlight>
  )
}

export function Certifications() {
  const [img, setImg] = useState<LightboxItem | null>(null)
  return (
    <Section id="certifications" className="!pt-8 md:!pt-16">
      <SectionHeader
        id="certifications"
        index="06"
        eyebrow="Certifications"
        title={<span className="font-serif font-normal italic tracking-normal text-accent-gradient">Credentials</span>}
        lead="Cloud, security and data certifications. Select a skill to see where else I’ve used it."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.05} className="h-full">
            <CertCard c={c} onImage={setImg} />
          </Reveal>
        ))}
      </div>
      <Lightbox item={img} onClose={() => setImg(null)} />
    </Section>
  )
}
