import { Cloud, Code2, Compass, GraduationCap, Languages, Sparkles, Users } from 'lucide-react'
import type { ReactNode } from 'react'
import { Spotlight } from '../components/Spotlight'
import { Chip, Reveal, Section, SectionHeader } from '../components/ui'
import { about, profile } from '../data/resume'

function CardTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h3 className="flex items-center gap-2.5 text-[13px] font-medium uppercase tracking-[0.14em] text-muted">
      <span className="grid size-8 place-items-center rounded-xl bg-white/[0.05] text-accent ring-1 ring-white/10">{icon}</span>
      {children}
    </h3>
  )
}

export function About() {
  return (
    <Section id="about">
      <SectionHeader
        id="about"
        index="01"
        eyebrow="About"
        title={
          <>
            Builder first.{' '}
            <span className="font-serif font-normal italic tracking-normal text-accent-gradient">Production-minded</span> always.
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-6">
        <Reveal className="md:col-span-4 md:row-span-2">
          <Spotlight className="h-full p-7 md:p-10">
            <div className="flex h-full flex-col justify-between gap-10">
              <blockquote className="font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.12] text-fg">
                <span className="text-accent">“</span>
                {profile.quote}
                <span className="text-accent">”</span>
              </blockquote>
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <CardTitle icon={<GraduationCap className="size-4" />}>Background</CardTitle>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{about.background}</p>
                </div>
                <div>
                  <CardTitle icon={<Sparkles className="size-4" />}>In short</CardTitle>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{about.summary}</p>
                </div>
              </div>
            </div>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.05}>
          <Spotlight className="h-full p-7" hue={200}>
            <CardTitle icon={<Code2 className="size-4" />}>Professional focus</CardTitle>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{about.focus}</p>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.1}>
          <Spotlight className="h-full p-7" hue={165}>
            <CardTitle icon={<Cloud className="size-4" />}>Career direction</CardTitle>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{about.direction}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-[13px] text-accent-2">
              <span className="size-1.5 rounded-full bg-accent-2" aria-hidden /> {about.seeking}
            </p>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.05}>
          <Spotlight className="h-full p-7">
            <CardTitle icon={<Compass className="size-4" />}>Interests</CardTitle>
            <div className="mt-5 flex flex-wrap gap-2">
              {about.interests.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.1}>
          <Spotlight className="h-full p-7" hue={260}>
            <CardTitle icon={<Users className="size-4" />}>Key strengths</CardTitle>
            <div className="mt-5 flex flex-wrap gap-2">
              {about.strengths.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </Spotlight>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.15}>
          <Spotlight className="h-full p-7" hue={40}>
            <CardTitle icon={<Languages className="size-4" />}>Languages I speak</CardTitle>
            <div className="mt-5 flex flex-wrap gap-2">
              {about.languages.map((l) => (
                <span key={l.name} className="chip gap-1.5">
                  {l.name} <span className="text-faint">· {l.level}</span>
                </span>
              ))}
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </Section>
  )
}
