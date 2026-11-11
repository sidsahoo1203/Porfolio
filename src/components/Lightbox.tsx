import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useRef } from 'react'
import { useFocusTrap, useScrollLock } from '../hooks'
import { ease } from './ui'

export type LightboxItem = { src: string; title: string; subtitle?: string; link?: { label: string; url: string } }

function Panel({ item, onClose }: { item: LightboxItem; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useScrollLock(true)
  useFocusTrap(ref, true, onClose)
  return (
    <motion.div
      className="fixed inset-0 z-[78] flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} aria-hidden />
      <motion.figure
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="relative flex max-h-full w-full max-w-4xl flex-col"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.97, y: 10 }}
        transition={{ duration: 0.4, ease }}
      >
        <button
          type="button"
          onClick={onClose}
          className="glass absolute -top-2 right-0 z-10 grid size-10 -translate-y-full place-items-center rounded-full"
          aria-label="Close image"
        >
          <X className="size-4" aria-hidden />
        </button>
        <img src={item.src} alt={item.title} className="max-h-[75svh] w-full rounded-2xl border border-white/10 bg-white object-contain" />
        <figcaption className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span>
            <span className="block text-[15px] text-fg">{item.title}</span>
            {item.subtitle && <span className="block text-[13px] text-muted">{item.subtitle}</span>}
          </span>
          {item.link && (
            <a
              href={item.link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-medium text-ink"
            >
              {item.link.label} <ArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

export function Lightbox({ item, onClose }: { item: LightboxItem | null; onClose: () => void }) {
  return <AnimatePresence>{item && <Panel key={item.src} item={item} onClose={onClose} />}</AnimatePresence>
}

/** Thumbnail that opens the lightbox. Renders nothing until an image path is set in the data file. */
export function Thumb({ src, title, onOpen }: { src?: string; title: string; onOpen: () => void }) {
  if (!src) return null
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group/thumb relative block w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
      aria-label={`View image: ${title}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover/thumb:scale-[1.04]"
      />
      <span className="absolute inset-0 grid place-items-center bg-black/0 text-[12px] text-white opacity-0 transition group-hover/thumb:bg-black/40 group-hover/thumb:opacity-100">
        View full image
      </span>
    </button>
  )
}
