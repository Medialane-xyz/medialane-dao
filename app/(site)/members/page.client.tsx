'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ExternalLink, Users, Star, Crown, ArrowUpRight } from 'lucide-react'
import { createContainerVariants, createItemVariants } from '@/lib/motion'
import { mdln, siteConfig } from '@/lib/site-config'

const containerVariants = createContainerVariants(0.08, 0.05)
const itemVariants = createItemVariants({ y: 14, duration: 0.5 })

const tiers = [
  {
    title: 'Observer',
    requirement: '1+ MDLN',
    icon: Users,
    description: 'Follow governance and join the community.',
    perks: ['Community forums', 'View all proposals', 'Discussions & feedback'],
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'Contributor',
    requirement: '100+ MDLN',
    icon: Star,
    description: 'Vote on proposals and shape the platform.',
    perks: ['Submit governance proposals', 'Vote on Snapshot', 'Contributor channels', 'Early feature access'],
    color: 'text-primary',
    bg: 'bg-primary/10',
    featured: true,
  },
  {
    title: 'Guardian',
    requirement: '1,000+ MDLN',
    icon: Crown,
    description: 'Lead working groups and represent creators.',
    perks: ['Council nomination rights', 'Working group leadership', 'Priority API access', 'Ecosystem grants', 'Exclusive events'],
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
]

export default function MembersPageClient() {
  return (
    <div className="relative min-h-screen bg-background px-4 py-10 lg:px-6 overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-orange absolute top-1/4 right-1/4 h-64 w-64" />
        <div className="aurora-blob aurora-blue   absolute bottom-1/3 left-1/3 h-64 w-64" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="section-label mb-2">Medialane · Membership</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Members</h1>
          <p className="mt-2 text-muted-foreground max-w-md">
            Token-gated access to the Medialane community and governance. Hold MDLN to unlock your tier.
          </p>
        </motion.div>

        {/* MDLN info */}
        <motion.div variants={itemVariants} className="mb-8 rounded-xl border border-border bg-card shadow-sm p-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="text-xs font-bold">ML</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">MDLN Governance Token</p>
              <p className="text-xs text-muted-foreground">{mdln.totalSupply.toLocaleString()} supply · {mdln.network}</p>
            </div>
          </div>
          <div className="ml-auto flex gap-3">
            <a href={mdln.etherscanToken} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              Etherscan <ExternalLink className="size-3" />
            </a>
            <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              Snapshot <ExternalLink className="size-3" />
            </a>
          </div>
        </motion.div>

        {/* Tiers */}
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-sm font-semibold text-foreground mb-4">Membership Tiers</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.title}
                className={`flex flex-col gap-4 p-5 rounded-xl border shadow-sm transition-shadow hover:shadow-md ${
                  tier.featured
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex size-9 items-center justify-center rounded-lg ${tier.bg} ${tier.color}`}>
                    <tier.icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{tier.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{tier.requirement}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{tier.description}</p>
                <div className="h-px bg-border" />
                <ul className="space-y-1.5">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className={`size-3.5 shrink-0 ${tier.color}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How to participate */}
        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card shadow-sm p-6">
          <h2 className="font-semibold text-sm text-foreground mb-4">How to Participate</h2>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            {[
              { step: '01', title: 'Acquire MDLN', desc: 'Get MDLN via Uniswap on Ethereum mainnet. Any amount qualifies as Observer.' },
              { step: '02', title: 'Join Snapshot', desc: 'Connect to snapshot.org with your wallet holding MDLN to vote on proposals.' },
              { step: '03', title: 'Propose & Vote', desc: 'Submit governance proposals, vote on platform decisions, and shape Medialane\'s future.' },
            ].map((s) => (
              <div key={s.step} className="flex gap-3">
                <span className="font-mono text-xs font-bold text-muted-foreground/50 pt-0.5 shrink-0">{s.step}</span>
                <div>
                  <p className="font-semibold text-foreground mb-1">{s.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-3">
            <a
              href={siteConfig.snapshot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Vote on Snapshot <ArrowUpRight className="size-3.5" />
            </a>
            <a
              href={mdln.etherscanToken}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-accent/50 transition-colors"
            >
              MDLN on Etherscan <ExternalLink className="size-3.5" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
