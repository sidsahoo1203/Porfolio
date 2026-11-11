import { motion } from 'framer-motion'
import { ArrowUp, ArrowUpRight, Check, Copy, Download, Globe, Mail, MapPin } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { ease, GitHubIcon, LinkedInIcon, Magnetic, Reveal } from '../components/ui'
import { profile } from '../data/resume'

function LinkRow({ href, icon, label, value }: { href: string; icon: ReactNode; label: string; value: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 border-t border-white/[0.07] py-5 transition-colors first:border-t-0 hover:text-white"
    >
      <span className="grid size-10 place-items-center rounded-full bg-white/[0.05] text-fg/80 ring-1 ring-white/10 transition group-hover:text-accent">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-faint">{label}</span>
        <span className="block text-[15px] text-fg/90">{value}</span>
      </span>
      <ArrowUpRight className="size-4 text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden />
    </a>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard can be blocked; the address is visible on screen */
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden px-5 pb-10 pt-24 sm:px-8 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[40rem] bg-[radial-gradient(50%_60%_at_50%_100%,rgba(169,193,255,0.14),transparent)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_bottom,black,transparent_70%)]" />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">08</span>
            <span className="h-px w-8 bg-white/15" aria-hidden />
            Contact
          </p>
        </Reveal>

        <h2 id="contact-title" className="mt-6 text-[clamp(2.75rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">
          {['Let’s build', 'something'].map((line, i) => (
            <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.16em]">
              <motion.span
                className="block text-gradient"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease, delay: i * 0.08 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="-mb-[0.12em] block overflow-hidden pb-[0.26em]">
            <motion.span
              className="block font-serif font-normal italic tracking-[-0.02em] text-accent-gradient"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease, delay: 0.16 }}
            >
              meaningful.
            </motion.span>
          </span>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <Reveal>
            <p className="max-w-md text-[16px] leading-relaxed text-muted">
              Open to roles where I can build, learn, and take ownership of how systems are delivered and run. The fastest way to
              reach me is email.
            </p>

            <div className="glass mt-8 flex flex-col gap-3 rounded-3xl p-3 sm:flex-row sm:items-center">
              <a
                href={`mailto:${profile.email}`}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-white/[0.04]"
              >
                <Mail className="size-5 shrink-0 text-accent" aria-hidden />
                <span className="truncate text-[15px] text-fg sm:text-base">{profile.email}</span>
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white/[0.06] px-4 text-[13px] text-fg transition hover:bg-white/10"
              >
                {copied ? <Check className="size-4 text-accent-2" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Magnetic
                href={profile.resumeFile}
                download
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink shadow-[0_10px_40px_-10px_rgba(169,193,255,0.6)]"
              >
                <Download className="size-4" aria-hidden /> Download Resume
              </Magnetic>
              <span className="flex items-center gap-1.5 text-[13px] text-muted">
                <MapPin className="size-3.5" aria-hidden /> {profile.location}
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-3xl px-6 py-2">
              <LinkRow href={profile.links.linkedin} icon={<LinkedInIcon />} label="LinkedIn" value="in/siddharth-sahoo-527b601ba" />
              <LinkRow href={profile.links.github} icon={<GitHubIcon />} label="GitHub" value="github.com/sidsahoo1203" />
              <LinkRow href={profile.links.website} icon={<Globe className="size-4" />} label="Website" value="siddharthsahoo.in" />
            </div>
          </Reveal>
        </div>

        <footer className="mt-24 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/[0.07] pt-6 text-[12px] text-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {profile.fullName} · <span className="text-muted">{profile.headline}</span>
          </p>
          <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
            Back to top <ArrowUp className="size-3.5" aria-hidden />
          </a>
        </footer>
      </div>
    </section>
  )
}
