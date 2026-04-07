'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const stats = [
  { value: '21M',   label: 'MDLN Supply',   mono: true  },
  { value: '100%',  label: 'DAO Treasury',  mono: true  },
  { value: '12',    label: 'IP Types',      mono: true  },
  { value: 'L2',    label: 'Starknet',      mono: false },
]

const containerVariants = createContainerVariants(0.1, 0.1)
const itemVariants = createItemVariants({ y: 20, blur: 6, duration: 0.7 })

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 lg:px-8 overflow-hidden">

      {/* Ambient color glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute top-2/3 left-1/3 h-[300px] w-[400px] rounded-full bg-ml-orange/15 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 h-[200px] w-[300px] rounded-full bg-ml-mauve/10 blur-[100px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-2xl flex-col items-center gap-8 text-center"
      >
        {/* Status pill */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-white/60 backdrop-blur-md"
        >
          <span className="relative flex size-1.5">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full size-1.5 bg-emerald-400" />
          </span>
          Mainnet · Utah DAO LLC
        </motion.div>

        {/* Logo */}
        <motion.div variants={itemVariants}>
          <Image
            src="/medialane.png"
            alt="Medialane"
            width={300}
            height={62}
            className="inline-block brightness-200"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="max-w-lg text-pretty text-lg leading-relaxed text-white/50 sm:text-xl"
        >
          The creator economy for the Integrity Web — where intellectual property becomes sovereign, programmable, and permanently owned.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90 hover:shadow-primary/50"
          >
            Launch App
            <ArrowRight className="size-4" />
          </a>
          <Link
            href="/dao"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/25 hover:text-white"
          >
            Governance
          </Link>
        </motion.div>

        {/* Quick links */}
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          {[
            { label: 'Marketplace', href: 'https://medialane.io/marketplace', ext: true },
            { label: 'Launchpad',   href: 'https://medialane.io/launchpad',   ext: true },
            { label: 'Explore',     href: '/explore',                          ext: false },
          ].map((link) =>
            link.ext ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-white/35 hover:text-white/70 transition-colors"
              >
                {link.label}
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-white/35 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={itemVariants}
          className="mt-2 w-full rounded-2xl border border-white/8 bg-black/30 backdrop-blur-xl px-6 py-5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center gap-1 ${i < 3 ? 'sm:border-r border-white/8' : ''}`}
              >
                <span className={`text-2xl font-bold text-white leading-none ${s.mono ? 'font-mono' : ''}`}>
                  {s.value}
                </span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-white/35">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
