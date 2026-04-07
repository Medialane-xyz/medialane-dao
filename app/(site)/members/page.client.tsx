'use client'

import { motion } from 'framer-motion'
import { Lock, Wallet, CheckCircle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createContainerVariants, createItemVariants } from '@/lib/motion'
import { mdln, siteConfig } from '@/lib/site-config'

const containerVariants = createContainerVariants(0.08, 0.1)
const itemVariants = createItemVariants({ y: 16, duration: 0.55 })

const tiers = [
  {
    title: 'Observer',
    requirement: '1+',
    unit: 'MDLN',
    icon: '○',
    description: 'Follow governance and join the community.',
    perks: ['Community forums', 'View proposals', 'Discussions'],
    accentHex: '#6699ff',
  },
  {
    title: 'Contributor',
    requirement: '100+',
    unit: 'MDLN',
    icon: '◈',
    description: 'Vote and shape platform direction.',
    perks: ['Submit proposals', 'Vote on Snapshot', 'Contributor channels', 'Early access'],
    accentHex: '#EC796B',
    featured: true,
  },
  {
    title: 'Guardian',
    requirement: '1,000+',
    unit: 'MDLN',
    icon: '◆',
    description: 'Lead working groups and represent the DAO.',
    perks: ['Council nomination', 'Working group lead', 'Priority API', 'Ecosystem grants', 'Exclusive events'],
    accentHex: '#F3B04E',
  },
]

export default function MembersPageClient() {
  return (
    <div className="min-h-screen px-4 py-14 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30 mb-3">
            Medialane · Membership
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[0.95]">
            Members
          </h1>
          <p className="mt-3 text-white/40 text-base max-w-xs leading-relaxed">
            Token-gated access to the Medialane community and governance.
          </p>
        </motion.div>

        {/* Wallet gate */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="rounded-2xl border border-white/8 bg-black/30 backdrop-blur-2xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <Lock className="size-5" />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-bold text-white mb-1">
                  Connect wallet to verify membership
                </h2>
                <p className="text-sm text-white/40">
                  MDLN holdings on Ethereum verify your tier on-chain.
                </p>
              </div>
              <Button size="default" className="w-full sm:w-auto rounded-full shrink-0 bg-white/10 hover:bg-white/15 text-white border border-white/15 cursor-not-allowed" disabled>
                <Wallet className="size-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </motion.div>

        {/* MDLN strip */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="rounded-xl border border-white/6 bg-white/3 px-4 py-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-white/30">
              <span className="font-bold text-white/70">MDLN</span>
              <span>·</span>
              <span>{mdln.totalSupply.toLocaleString()} total supply</span>
              <span>·</span>
              <span>{mdln.network}</span>
            </div>
            <div className="ml-auto flex gap-4">
              <a href={mdln.etherscanToken} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-white/30 hover:text-ml-orange transition-colors">
                Etherscan <ExternalLink className="size-3" />
              </a>
              <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-white/30 hover:text-ml-orange transition-colors">
                Snapshot <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Tiers */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-6">
            <span className="block w-5 h-0.5 rounded-full bg-ml-orange" />
            <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
              Membership Tiers
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.title}
                className={`flex flex-col gap-5 p-5 rounded-2xl border backdrop-blur-xl transition-all ${
                  tier.featured
                    ? 'border-ml-orange/25 bg-ml-orange/5'
                    : 'border-white/8 bg-black/25'
                }`}
              >
                {/* Tier header */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs text-white/25 mb-1 block">{tier.unit}</span>
                    <span
                      className="font-mono text-3xl font-bold"
                      style={{ color: tier.accentHex }}
                    >
                      {tier.requirement}
                    </span>
                  </div>
                  <span
                    className="font-mono text-2xl leading-none mt-0.5"
                    style={{ color: tier.accentHex, opacity: 0.5 }}
                  >
                    {tier.icon}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white mb-1">{tier.title}</h3>
                  <p className="text-xs text-white/40 leading-relaxed">{tier.description}</p>
                </div>

                <div className="h-px bg-white/6" />

                <ul className="flex flex-col gap-2">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-xs text-white/45">
                      <CheckCircle className="size-3.5 shrink-0" style={{ color: tier.accentHex, opacity: 0.7 }} />
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
