import { ArrowUpRight, BookOpen, Trophy } from 'lucide-react'
import { useState } from 'react'
import { Lightbox, Thumb, type LightboxItem } from '../components/Lightbox'
import { Spotlight } from '../components/Spotlight'
import { Reveal, Section, SectionHeader } from '../components/ui'
import { achievements, publications } from '../data/resume'

const badgeStyle = {
  gold: 'border-gold/40 bg-gold/10 text-gold',
  top: 'border-accent/40 bg-accent/10 text-accent',
  part: 'border-white/10 bg-white/[0.04] text-muted',
} as const

function MoreLink({ url, label }: { url?: string; label: string }) {
  if (!url) return null
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 text-[12.5px] text-fg/90 transition hover:border-white/25 hover:text-white"
    >
      View more <ArrowUpRight className="size-3.5" aria-hidden />
      <span className="sr-only"> — {label} (opens in new tab)</span>
    </a>
  )
}

export function Achievements() {
  const [img, setImg] = useState<LightboxItem | null>(null)
  return (
    <Section id="achievements" className="!pt-8 md:!pt-16">
      <SectionHeader
        id="achievements"
        index="07"
        eyebrow="Achievements"
        title={
          <>
            Hackathons{' '}
            <span className="font-serif font-normal italic tracking-normal text-accent-gradient">& papers</span>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={(i % 2) * 0.08} className="h-full">
            <Spotlight className="h-full p-7" hue={a.rank === 'gold' ? 40 : 225}>
              <div className="flex h-full flex-col">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-medium ${badgeStyle[a.rank ?? 'part']}`}
                  >
                    {a.rank !== 'part' && <Trophy className="size-3.5" aria-hidden />}
                    {a.badge}
                  </span>
                  <span className="font-mono text-[11px] text-faint">
                    {a.date} · {a.venue}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium leading-snug tracking-[-0.015em] text-fg">{a.title}</h3>
                <ul className="mt-3 space-y-2">
                  {a.points.map((p) => (
                    <li key={p} className="text-[14px] leading-relaxed text-muted">
                      {p}
                    </li>
                  ))}
                </ul>
                {(a.image || a.link) && (
                  <div className="mt-auto space-y-3 pt-5">
                    <Thumb
                      src={a.image}
                      title={a.title}
                      onOpen={() =>
                        a.image &&
                        setImg({
                          src: a.image,
                          title: a.title,
                          subtitle: `${a.badge} · ${a.date} · ${a.venue}`,
                          link: a.link ? { label: 'View more', url: a.link } : undefined,
                        })
                      }
                    />
                    <MoreLink url={a.link} label={a.title} />
                  </div>
                )}
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      {publications.map((p) => (
        <Reveal key={p.title} className="mt-4">
          <Spotlight className="p-7 md:p-9" hue={280}>
            <div className={`grid gap-6 ${p.image ? 'md:grid-cols-[1fr_18rem] md:items-center' : ''}`}>
              <div>
                <h3 className="flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.14em] text-muted">
                  <BookOpen className="size-4 text-accent" aria-hidden /> Publication
                </h3>
                <p className="mt-5 max-w-3xl font-serif text-[clamp(1.4rem,2.6vw,1.9rem)] leading-snug text-fg">{p.title}</p>
                {p.link && (
                  <div className="mt-5">
                    <MoreLink url={p.link} label={p.title} />
                  </div>
                )}
              </div>
              <Thumb src={p.image} title={p.title} onOpen={() => p.image && setImg({ src: p.image, title: p.title })} />
            </div>
          </Spotlight>
        </Reveal>
      ))}

      <Lightbox item={img} onClose={() => setImg(null)} />
    </Section>
  )
}
