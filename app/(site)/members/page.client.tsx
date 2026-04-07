'use client'

import { motion } from 'framer-motion'
import { Lock, Wallet, Users, Crown, Star, ExternalLink, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createContainerVariants, createItemVariants } from '@/lib/motion'
import { mdln, siteConfig } from '@/lib/site-config'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

const tiers = [
  {
    title: 'Observer',
    requirement: '1+ MDLN',
    icon: Users,
    description: 'Join the community and follow governance.',
    perks: [
      'Access community forums',
      'View governance proposals',
      'Participate in discussions',
    ],
    accentHex: '#1DA1F2',
    highlight: false,
  },
  {
    title: 'Contributor',
    requirement: '100+ MDLN',
    icon: Star,
    description: "Vote and shape the platform's direction.",
    perks: [
      'Submit governance proposals',
      'Vote on Snapshot',
      'Access contributor channels',
      'Early feature access',
    ],
    accentHex: '#0000FF',
    highlight: true,
  },
  {
    title: 'Guardian',
    requirement: '1,000+ MDLN',
    icon: Crown,
    description: 'Lead working groups and represent the DAO.',
    perks: [
      'Council nomination rights',
      'Working group leadership',
      'Priority API access',
      'Ecosystem grants eligibility',
      'Exclusive community events',
    ],
    accentHex: '#F3B04E',
    highlight: false,
  },
]

export default function MembersPageClient() {
  return (
    <div className="min-h-screen bg-background px-4 py-14 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Medialane · Membership
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-[0.95]">
            Members
          </h1>
          <p className="mt-3 text-muted-foreground text-base max-w-sm leading-relaxed">
            Token-gated access to the Medialane community and governance.
          </p>
        </motion.div>

        {/* Wallet gate */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Lock className="size-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-foreground">
                  Connect your wallet to access member content
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Membership is verified on-chain through{' '}
                  <span className="font-semibold text-foreground">MDLN</span> token holdings on Ethereum.
                </p>
              </div>
              <Button size="default" className="w-full sm:w-auto rounded-full shrink-0" disabled>
                <Wallet className="size-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </motion.div>

        {/* MDLN info strip */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="rounded-xl bg-secondary/50 border border-border px-4 py-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-bold text-foreground">MDLN</span>
              <span>·</span>
              <span>{mdln.totalSupply.toLocaleString()} total supply</span>
              <span>·</span>
              <span>{mdln.network}</span>
            </div>
            <div className="ml-auto flex gap-4">
              <a
                href={mdln.etherscanToken}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                Etherscan <ExternalLink className="size-3" />
              </a>
              <a
                href={siteConfig.snapshot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                Snapshot <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tiers */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-1 h-4 rounded-full bg-ml-orange" />
            <h2 className="text-xs font-bold tracking-[0.16em] uppercase text-foreground">
              Membership Tiers
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.title}
                className={`relative flex flex-col gap-5 p-5 rounded-2xl border transition-shadow ${
                  tier.highlight
                    ? 'bg-card border-primary/30 shadow-md shadow-primary/5'
                    : 'bg-card border-border'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute top-3 right-3">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                      Most Common
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                    style={{ color: tier.accentHex, backgroundColor: `${tier.accentHex}18` }}
                  >
                    <tier.icon className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{tier.title}</h3>
                    <span className="font-mono text-[10px] text-muted-foreground">{tier.requirement}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">{tier.description}</p>

                <div className="h-px bg-border" />

                <ul className="flex flex-col gap-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="size-3.5 shrink-0 mt-0.5 text-primary" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
