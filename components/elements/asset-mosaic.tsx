'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ShowcaseCollection } from '@/lib/showcase'

/**
 * Full-bleed horizontal marquee of real Medialane collection art. Brings the
 * io/dapp asset-driven vibrancy to the DAO site. Renders nothing when there is
 * no data — the page omits it cleanly rather than showing an empty band.
 */
export function AssetMosaic({ items }: { items: ShowcaseCollection[] }) {
  if (items.length === 0) return null
  // Duplicate the strip so the marquee loops seamlessly.
  const strip = [...items, ...items]
  return (
    <section aria-label="Collections on Medialane" className="relative overflow-hidden py-2">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex w-max gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {strip.map((c, i) => (
          <div
            key={`${c.contractAddress}-${i}`}
            className="group relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl border border-border/60 bg-muted sm:h-52 sm:w-52"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="208px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3">
              <p className="truncate text-xs font-semibold text-white">{c.name}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
