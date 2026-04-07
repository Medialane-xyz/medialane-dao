'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles, Shield, Coins } from 'lucide-react'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const pillars = [
  {
    icon: Sparkles,
    title: 'IP Marketplace',
    desc: 'Mint, license, and trade intellectual property onchain. 12 IP types, gasless, on Starknet mainnet.',
    href: 'https://medialane.io/marketplace',
    status: 'Live',
  },
  {
    icon: Shield,
    title: 'Creator Launchpad',
    desc: 'Collection Drops, POP credentials, programmable licensing — all onchain with no gas for participants.',
    href: 'https://medialane.io/launchpad',
    status: 'Live',
  },
  {
    icon: Coins,
    title: 'DAO Governance',
    desc: '21M MDLN — 100% community treasury. No VCs, no insiders. Governed by creators via Snapshot.',
    href: '/dao',
    status: 'Live',
  },
]

const containerVariants = createContainerVariants(0.1, 0.1)
const itemVariants = createItemVariants({ y: 20, blur: 4, duration: 0.6 })

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-24 overflow-hidden">
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-blue  absolute top-1/4 left-1/4 h-96 w-96" />
        <div className="aurora-blob aurora-orange absolute bottom-1/3 right-1/4 h-80 w-80" />
        <div className="aurora-blob aurora-mauve  absolute top-1/2 right-1/3 h-64 w-64" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-8 text-center"
      >
        {/* Live badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-muted-foreground shadow-sm">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-1.5 bg-emerald-400" />
            </span>
            Mainnet · Utah DAO LLC
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
            Intellectual Property
            <br />
            <span className="gradient-text">for the Integrity Web</span>
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
            Medialane is the creator economy protocol where IP becomes sovereign, programmable, and permanently owned — governed by its community.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            Launch App
            <ArrowRight className="size-4" />
          </a>
          <Link
            href="/dao"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-accent/50 transition-colors"
          >
            View Governance
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-accent/50 transition-colors"
          >
            Explore Platform
            <ArrowUpRight className="size-3.5" />
          </Link>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          variants={itemVariants}
          className="mt-2 w-full grid gap-3 sm:grid-cols-3"
        >
          {pillars.map((p) => {
            const card = (
              <div className="group flex flex-col gap-3 p-5 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/30 hover:shadow-md transition-all text-left h-full">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <p.icon className="size-4" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {p.status}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            )

            return p.href.startsWith('http') ? (
              <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer" className="block">
                {card}
              </a>
            ) : (
              <Link key={p.title} href={p.href} className="block">
                {card}
              </Link>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
