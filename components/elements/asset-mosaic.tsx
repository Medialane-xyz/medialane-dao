'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import type { ShowcaseCollection } from '@/lib/showcase'

/**
 * Full-bleed horizontal filmstrip of real Medialane collection art. Square
 * tiles, flush together (no gap, no rounding, no edge fade) — the marquee
 * loops seamlessly because the strip is rendered exactly twice and animates
 * by exactly one half. Renders nothing when there is no data.
 */
export function AssetMosaic({ items }: { items: ShowcaseCollection[] }) {
  if (items.length === 0) return null
  // Render the strip twice so a 0% → -50% translate loops with no seam.
  const strip = [...items, ...items]
  return (
    <section aria-label="Collections on Medialane" className="overflow-hidden">
      <motion.div
        className="flex w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        {strip.map((c, i) => (
          <div
            key={`${c.contractAddress}-${i}`}
            className="group relative h-80 w-80 shrink-0 overflow-hidden bg-muted sm:h-96 sm:w-96"
          >
            <Image
              src={c.image}
              alt={c.name}
              fill
              sizes="384px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
              <p className="truncate text-sm font-semibold text-white">{c.name}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
