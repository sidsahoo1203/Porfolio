import { certifications, experience, projects } from '../data/resume'

/** Different spellings of the same skill collapse to one key. */
const alias: Record<string, string> = {
  nextjs14: 'nextjs',
  springboot35: 'springboot',
  reduxtoolkit: 'redux',
  jwtauthentication: 'jwt',
  stripeapi: 'stripe',
  tailwind: 'tailwindcss',
  react19: 'reactjs',
  express5: 'expressjs',
  mongodbatlas: 'mongodb',
  // AWS family
  awssespinpoint: 'aws',
  amazonwebservicesaws: 'aws',
  amazonses: 'aws',
  amazonpinpoint: 'aws',
  amazonworkmail: 'aws',
  amazonaurora: 'aws',
  salesforceonaws: 'aws',
  // certification skill names
  cascadingstylesheetscss: 'css',
  artificialintelligenceai: 'ai',
  generativeai: 'ai',
  machinelearning: 'ml',
}

export const skillKey = (s: string) => {
  const k = s.toLowerCase().replace(/[^a-z0-9]/g, '')
  return alias[k] ?? k
}

export type Usage = { kind: 'Project' | 'Experience' | 'Certification'; name: string; href: string }

const index = new Map<string, Usage[]>()
const add = (skill: string, u: Usage) => {
  const k = skillKey(skill)
  const list = index.get(k) ?? []
  if (!list.some((x) => x.name === u.name && x.kind === u.kind)) list.push(u)
  index.set(k, list)
}
for (const p of projects) for (const t of p.tech) add(t, { kind: 'Project', name: p.name, href: '#projects' })
for (const e of experience) for (const t of e.tech) add(t, { kind: 'Experience', name: e.company, href: '#experience' })
for (const c of certifications)
  for (const t of c.skills) add(t, { kind: 'Certification', name: c.name, href: `#cert-${c.id}` })

/** Everywhere a skill shows up on the site: projects, jobs and certifications. */
export function usageOf(skill: string): Usage[] {
  return index.get(skillKey(skill)) ?? []
}
