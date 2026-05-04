'use client'

import { ArrowUpRight, CheckCircle } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { Stagger, StaggerItem } from '@medialane/ui'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'

const tiers = [
  {
    tier: '01',
    title: 'Register',
    share: 'Base share',
    color: 'text-brand-purple',
    borderColor: 'border-t-brand-purple',
    steps: [
      'Create your Medialane account at medialane.io',
      'Secure with PIN or passkey',
      'No further action required to qualify',
    ],
  },
  {
    tier: '02',
    title: 'Create',
    share: 'Higher share',
    color: 'text-brand-blue',
    borderColor: 'border-t-brand-blue',
    featured: true,
    steps: [
      'Mint original IP assets or collections',
      'Set up your creator profile',
      'Demonstrate legitimate creative activity',
    ],
  },
  {
    tier: '03',
    title: 'Engage',
    share: 'Largest share',
    color: 'text-brand-purple',
    borderColor: 'border-t-brand-purple',
    steps: [
      'Trade, collect, and make offers on the marketplace',
      'Collaborate and remix other creators\' work',
      'Maintain consistent, genuine on-chain activity',
    ],
  },
]

const phases = [
  { phase: 'Phase 1', trigger: '5,000 participants', type: 'Milestone' },
  { phase: 'Phase 2', trigger: '10,000 participants', type: 'Milestone' },
  { phase: 'Annual Cycle', trigger: 'Each year thereafter', type: 'Ongoing' },
]

const fairDesign = [
  'On-chain verifiable — all qualifying activity is recorded on Starknet and auditable by anyone.',
  'Automated disqualification — bot activity, duplicate accounts, and inorganic behavior are automatically excluded.',
  'No snapshots to game — activity is measured across the full cycle, not at a single point in time.',
  'Community-governed rules — MDLN holders can adjust criteria each cycle to prevent gaming.',
]

const howToParticipate = [
  {
    step: '01',
    title: 'Get on Starknet',
    desc: 'Install Argent X or Braavos, or use Medialane\'s built-in wallet (no extension required). Bridge ETH or USDC via StarkGate.',
  },
  {
    step: '02',
    title: 'Create your account',
    desc: 'Go to medialane.io and create your creator profile. Secure it with a PIN or passkey. This qualifies you for Tier 1.',
  },
  {
    step: '03',
    title: 'Create and engage',
    desc: 'Mint IP assets, set up a collection, trade on the marketplace. Every action is recorded on-chain and counted toward your tier.',
  },
  {
    step: '04',
    title: 'Hold MDLN to govern',
    desc: 'Acquire MDLN via Uniswap or Ekubo. MDLN holders vote on airdrop rules, pool size, cycle timing — and whether the airdrop runs at all.',
  },
]

export default function AirdropPageClient() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-12">

      <PageHero
        eyebrow="Medialane · Creator's Airdrop"
        title="Creator's Airdrop"
        description="Platform revenue flows to the Medialane DAO treasury. Each year, MDLN holders vote on how it's used — Creator's Airdrop, token buyback, token burn, development, or operations. The community decides."
      />

      {/* Governance framing */}
      <div className="p-[1px] rounded-2xl btn-border-animated max-w-3xl">
        <div className="rounded-[calc(1rem-1px)] bg-card p-6 sm:p-8">
          <SectionHeader label="How Revenue Works" className="mb-3" />
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            A 1% marketplace fee flows into the Medialane DAO treasury — held in a Gnosis Safe multisig on Ethereum, fully auditable on-chain.
            Each year, MDLN holders vote on Snapshot to decide allocation. The Creator&#39;s Airdrop is one option; others include token buyback,
            token burn, protocol development, and operations. No predetermined formula. Community-governed every cycle.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {['Creator\'s Airdrop', 'Token Buyback', 'Token Burn', 'Development', 'Operations', 'MDLN holders decide'].map((opt, i) => (
              <div
                key={opt}
                className={`rounded-lg px-3 py-2.5 text-xs font-medium border ${
                  i === 5
                    ? 'border-brand-purple/30 bg-brand-purple/5 text-brand-purple'
                    : 'border-border bg-muted/50 text-muted-foreground/70'
                }`}
              >
                {i < 5 && <span className="text-muted-foreground/30 font-mono mr-1.5">→</span>}
                {opt}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Participation tiers */}
      <div>
        <SectionHeader label="Participation Tiers" color="text-brand-purple" bg="bg-brand-purple" className="mb-3" />
        <p className="text-xs text-muted-foreground/60 mb-6 max-w-xl">
          If the Creator&#39;s Airdrop is voted in by MDLN holders, your share is determined by your tier. Higher engagement earns a larger portion of the pool.
        </p>
        <Stagger className="grid sm:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <StaggerItem key={tier.tier}>
              <div
                className={`flex flex-col gap-4 p-5 bento-cell border-t-2 ${tier.borderColor} h-full ${
                  tier.featured ? 'border-brand-blue/20' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm font-bold ${tier.color}`}>{tier.title}</p>
                    <span className="text-[10px] font-mono text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-full">{tier.share}</span>
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground/30">Tier {tier.tier}</p>
                </div>
                <div className="h-px bg-border" />
                <ul className="space-y-2">
                  {tier.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2 text-xs text-muted-foreground/70">
                      <CheckCircle className="size-3.5 shrink-0 text-brand-purple mt-0.5" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Distribution phases + fair design */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bento-cell p-5">
          <SectionHeader label="Distribution Phases" />
          <div className="space-y-0 divide-y divide-border/60">
            {phases.map((p) => (
              <div key={p.phase} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{p.phase}</p>
                  <p className="text-xs text-muted-foreground/60 mt-0.5">{p.trigger}</p>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-full">{p.type}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground/40 mt-4 leading-relaxed">
            Phases are not time-gated — they unlock when the community reaches the participation milestone. Annual cycles continue as long as the protocol generates revenue and MDLN holders vote to continue.
          </p>
        </div>

        <div className="bento-cell p-5">
          <SectionHeader label="Fair by Design" />
          <ul className="space-y-3">
            {fairDesign.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-xs text-muted-foreground/70 leading-relaxed">
                <CheckCircle className="size-3.5 shrink-0 text-brand-purple mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Campaigns */}
      <div>
        <SectionHeader label="Active Campaigns" color="text-brand-blue" bg="bg-brand-blue" className="mb-6" />
        <Stagger className="grid sm:grid-cols-2 gap-4">
          <StaggerItem>
            <div className="p-5 bento-cell h-full">
              <p className="text-sm font-bold text-foreground mb-1.5">Global Campaign</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Open to all participants worldwide. Participate at medialane.io. Activity tracked on Starknet — auditable by anyone.
              </p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="p-5 bento-cell h-full">
              <p className="text-sm font-bold text-foreground mb-1.5">Brasil Campaign</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Dedicated campaign for Portuguese-speaking creators in Brazil and the broader Portuguese-speaking community. Same structure, same rules — tracked as a separate cohort.
              </p>
            </div>
          </StaggerItem>
        </Stagger>
      </div>

      {/* How to participate */}
      <div className="bento-cell p-6 sm:p-8">
        <SectionHeader label="How to Participate" className="mb-5" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {howToParticipate.map((s) => (
            <div key={s.step} className="flex gap-3">
              <span className="font-mono text-xs font-bold text-muted-foreground/25 pt-0.5 shrink-0">{s.step}</span>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{s.title}</p>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-5 border-t border-border">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-purple/90 transition-colors"
          >
            Open Medialane <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href={siteConfig.snapshot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
          >
            Vote on Snapshot <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-[11px] text-muted-foreground/30 leading-relaxed max-w-2xl">
        Creator&#39;s Airdrop rules and pool sizes are governed by MDLN holders and may change between cycles. The airdrop is one of several options MDLN holders can vote to fund — not a guaranteed allocation. All qualifying activity is verified on-chain.
      </p>

    </div>
  )
}
