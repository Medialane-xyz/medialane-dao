'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingBag, Layers, Coins } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/glass-card'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const pillars = [
  {
    icon: ShoppingBag,
    title: 'IP Marketplace',
    description: 'Buy, sell, and trade tokenized intellectual property on Starknet mainnet.',
    status: 'Live',
  },
  {
    icon: Layers,
    title: 'Collection Drop',
    description: 'Launch limited edition mints and timed exclusive drops for your audience.',
    status: 'Live',
  },
  {
    icon: Coins,
    title: 'Creator Coins',
    description: 'Community tokens for creators — launch, govern, and reward your community.',
    status: 'Coming Soon',
  },
]

const containerVariants = createContainerVariants(0.15, 0.3)
const itemVariants = createItemVariants({ y: 30, blur: 8, duration: 0.7 })

export function HeroSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 py-20 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex max-w-3xl flex-col items-center gap-8 text-center"
      >
        {/* Overline */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 rounded-full border border-ml-glass-border bg-ml-glass px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-muted-foreground backdrop-blur-md"
        >
          DAO · Utah DAO LLC
        </motion.div>

        {/* Logo */}
        <motion.h1 variants={itemVariants}>
          <Image src="/medialane.png" alt="Medialane" width={300} height={62} className="inline-block" />
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Creators Capital Markets on the Integrity Web
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <Button asChild size="lg" className="gap-2 shadow-lg shadow-ml-glow rounded-full">
            <Link href="/explore">
              Explore
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-ml-glass-border bg-ml-glass backdrop-blur-md rounded-full">
            <Link href="/dao">Governance</Link>
          </Button>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          variants={itemVariants}
          className="mt-4 grid w-full gap-4 sm:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <GlassCard
              key={pillar.title}
              intensity="light"
              className="flex flex-col items-center gap-3 p-6 text-center transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-ml-glow/20"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <pillar.icon className="size-5" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {pillar.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                pillar.status === 'Live'
                  ? 'bg-primary/10 text-primary'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {pillar.status}
              </span>
            </GlassCard>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
