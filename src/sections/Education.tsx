import { GraduationCap, MapPin } from 'lucide-react'
import { Spotlight } from '../components/Spotlight'
import { Reveal, Section, SectionHeader } from '../components/ui'
import { education } from '../data/resume'

export function Education() {
  const major = education.filter((e) => e.major)
  const school = education.filter((e) => !e.major)
  return (
    <Section id="education">
      <SectionHeader
        id="education"
        index="05"
        eyebrow="Education"
        title={
          <>
            Computer Science,{' '}
            <span className="font-serif font-normal italic tracking-normal text-accent-gradient">twice over</span>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {major.map((e, i) => (
          <Reveal key={e.institution} delay={i * 0.08} className="h-full">
            <Spotlight className="h-full p-7 md:p-9 [&>div:last-child]:flex [&>div:last-child]:h-full [&>div:last-child]:flex-col" hue={i ? 170 : 225}>
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-2xl bg-white/[0.05] text-accent ring-1 ring-white/10">
                  <GraduationCap className="size-5" aria-hidden />
                </span>
                <span className="font-mono text-[12px] text-fg/75">
                  {e.start} — {e.end}
                </span>
              </div>
              <h3 className="mt-7 text-2xl font-medium tracking-[-0.025em] text-fg">{e.degree}</h3>
              {e.field && <p className="mt-1 font-serif text-lg italic text-accent">{e.field}</p>}
              <p className="mt-4 text-[15px] text-fg/85">{e.institution}</p>
              {e.description && <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{e.description}</p>}
              {e.activities && (
                <div className="mt-5">
                  <p className="eyebrow !text-[10px]">Activities & societies</p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {e.activities.map((a) => (
                      <li key={a} className="chip">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="mt-auto" />
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-5 text-[13px]">
                <span className="flex items-center gap-1.5 text-muted">
                  <MapPin className="size-3.5" aria-hidden /> {e.location}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[12px] text-fg/85">{e.score}</span>
              </div>
            </Spotlight>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <ul className="mt-4 divide-y divide-white/[0.06] overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02]">
          {school.map((e) => (
            <li key={e.institution} className="grid gap-1 px-6 py-5 md:grid-cols-[1fr_auto_auto] md:items-center md:gap-8 md:px-8">
              <div>
                <p className="flex flex-wrap items-center gap-2 text-[15px] text-fg/90">
                  {e.degree}
                  {e.board && (
                    <span className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] tracking-[0.12em] text-accent">
                      {e.board}
                    </span>
                  )}
                </p>
                <p className="text-[13px] text-muted">
                  {e.institution} · {e.location}
                </p>
                {e.description && <p className="mt-1.5 text-[13px] leading-relaxed text-faint">{e.description}</p>}
              </div>
              <span className="font-mono text-[12px] text-faint">
                {e.start} — {e.end}
              </span>
              <span className="font-mono text-[12px] text-fg/75">{e.score}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
