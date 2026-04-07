'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const stats = [
  { label: 'Token Supply',  value: '21M',     unit: 'MDLN' },
  { label: 'DAO Treasury',  value: '100%',    unit: 'Community' },
  { label: 'Network',       value: 'Mainnet', unit: 'Starknet' },
  { label: 'IP Types',      value: '12',      unit: 'Supported' },
]

const links = [
  { label: 'Marketplace',  href: 'https://medialane.io/marketplace', external: true },
  { label: 'Launchpad',    href: 'https://medialane.io/launchpad',   external: true },
  { label: 'Governance',   href: '/dao',                              external: false },
]

const containerVariants = createContainerVariants(0.12, 0.15)
const itemVariants = createItemVariants({ y: 24, blur: 6, duration: 0.65 })

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 lg:px-8">
      {/* Ambient glow – visible in both themes */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[800px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-2xl flex-col items-center gap-8 text-center"
      >
        {/* Status badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-muted-foreground shadow-sm"
        >
          <span className="relative flex size-1.5">
            <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full size-1.5 bg-emerald-500" />
          </span>
          Mainnet · Utah DAO LLC
        </motion.div>

        {/* Logo */}
        <motion.div variants={itemVariants}>
          <Image
            src="/medialane.png"
            alt="Medialane"
            width={280}
            height={58}
            className="inline-block dark:brightness-200 brightness-0"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          The creator economy for the Integrity Web — where intellectual property becomes sovereign, programmable, and permanently owned.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 items-center">
          <Button asChild size="lg" className="gap-2 rounded-full shadow-lg px-7">
            <a href="https://medialane.io" target="_blank" rel="noopener noreferrer">
              Launch App
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-7">
            <Link href="/dao">Governance</Link>
          </Button>
        </motion.div>

        {/* Quick nav links */}
        <motion.div variants={itemVariants} className="flex items-center gap-6">
          {links.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </Link>
            )
          )}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={itemVariants}
          className="mt-2 w-full rounded-2xl border border-border bg-card/80 backdrop-blur-md px-6 py-5"
        >
          <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center gap-0.5 ${i < stats.length - 1 ? 'sm:border-r border-border' : ''}`}
              >
                <span className="font-mono text-xl font-bold text-foreground">{stat.value}</span>
                <span className="text-[10px] font-semibold text-ml-orange uppercase tracking-wider">{stat.unit}</span>
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
