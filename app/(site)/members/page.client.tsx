'use client'

import { motion } from 'framer-motion'
import { Lock, Wallet, Users, Crown, Star, ExternalLink } from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { createContainerVariants, createItemVariants } from '@/lib/motion'
import { mdln, siteConfig } from '@/lib/site-config'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

const tiers = [
  {
    title: 'Observer',
    requirement: '1+ MDLN',
    icon: Users,
    perks: ['Access community forums', 'View governance proposals', 'Participate in discussions'],
    accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
  },
  {
    title: 'Contributor',
    requirement: '100+ MDLN',
    icon: Star,
    perks: ['Submit governance proposals', 'Vote on Snapshot', 'Access contributor channels', 'Early feature access'],
    accentColor: 'text-primary bg-primary/10',
  },
  {
    title: 'Guardian',
    requirement: '1,000+ MDLN',
    icon: Crown,
    perks: ['Council nomination rights', 'Working group leadership', 'Priority API access', 'Ecosystem grants eligibility', 'Exclusive community events'],
    accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
  },
]

export default function MembersPageClient() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-16 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <PageHeader
          title="Members"
          description="Token-gated access to the Medialane community and governance."
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-8"
        />

        {/* Gate notice */}
        <motion.div variants={itemVariants} className="mb-6">
          <GlassCard intensity="heavy" className="flex flex-col items-start gap-5 p-5 sm:p-6 sm:flex-row sm:items-center">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Lock className="size-5" />
            </div>
            <div className="relative z-10 flex-1">
              <h2 className="text-lg font-bold text-foreground">
                Connect your wallet to access member content
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Membership is verified on-chain through{' '}
                <span className="font-semibold text-foreground">MDLN</span> token holdings on Ethereum.
                Connect your wallet to unlock your tier.
              </p>
            </div>
            <Button size="default" className="w-full sm:w-auto mt-2 sm:mt-0 relative z-10 rounded-full" disabled>
              <Wallet className="size-4 mr-2" />
              Connect Wallet
            </Button>
          </GlassCard>
        </motion.div>

        {/* MDLN token info strip */}
        <motion.div variants={itemVariants} className="mb-10">
          <GlassCard intensity="light" className="flex flex-wrap items-center gap-4 p-4 bg-white/5 border-white/5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">MDLN</span>
              <span>·</span>
              <span>{mdln.totalSupply.toLocaleString()} total supply</span>
              <span>·</span>
              <span>{mdln.network}</span>
            </div>
            <div className="ml-auto flex gap-3">
              <a
                href={mdln.etherscanToken}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Etherscan <ExternalLink className="size-3" />
              </a>
              <a
                href={siteConfig.snapshot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Snapshot <ExternalLink className="size-3" />
              </a>
            </div>
          </GlassCard>
        </motion.div>

        {/* Membership tiers */}
        <motion.div variants={itemVariants}>
          <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/20 pb-2">
            Membership Tiers
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier, i) => (
              <GlassCard
                key={tier.title}
                intensity="light"
                className="flex flex-col gap-4 p-5 sm:p-6 transition-transform active:scale-[0.98] bg-white/5 border-white/5 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${tier.accentColor}`}>
                    <tier.icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">
                      {tier.title}
                    </h3>
                    <Badge variant={i === 2 ? 'default' : 'secondary'} className="mt-1 font-semibold">
                      {tier.requirement}
                    </Badge>
                  </div>
                </div>
                <div className="h-px w-full bg-border/50" />
                <ul className="flex flex-col gap-2.5">
                  {tier.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-1 inline-block size-[5px] shrink-0 rounded-full bg-primary" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
