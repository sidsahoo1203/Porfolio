import { MotionConfig, useReducedMotion } from 'framer-motion'
import { Loader, Nav } from './components/Nav'
import { About } from './sections/About'
import { Achievements } from './sections/Achievements'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Skills } from './sections/Skills'
import { Analytics } from '@vercel/analytics/react'

export default function App() {
  const reduce = !!useReducedMotion()
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain relative">
        <a
          href="#about"
          className="sr-only z-[90] rounded-full bg-white px-4 py-2 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Loader reduced={reduce} />
        <Nav />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Certifications />
          <Achievements />
          <Contact />
        </main>
        <Analytics />
      </div>
    </MotionConfig>
  )
}
