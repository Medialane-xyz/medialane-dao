'use client'

import { ArrowUpRight, CheckCircle, Zap, Shield, Coins, Globe } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'
import { AddressRow } from '@/components/address-row'

const tiers = [
  {
    title: 'Observer',
    requirement: '1+ MDLN',
    description: 'Follow governance and join the community.',
    perks: ['View all proposals', 'Community forums', 'Discussions & feedback'],
    accent: 'border-t-violet-500',
    color: 'text-violet-500',
  },
  {
    title: 'Contributor',
    requirement: '100+ MDLN',
    description: 'Vote on proposals and shape the platform.',
    perks: ['Submit governance proposals', 'Vote on Snapshot', 'Early feature access', 'Contributor channels'],
    featured: true,
    accent: 'border-t-blue-500',
    color: 'text-blue-500',
  },
  {
    title: 'Guardian',
    requirement: '1,000+ MDLN',
    description: 'Lead working groups and represent creators.',
    perks: ['Council nomination rights', 'Working group leadership', 'Ecosystem grants', 'Priority API access'],
    accent: 'border-t-indigo-500',
    color: 'text-indigo-500',
  },
]

const starknetBenefits = [
  { icon: Zap,    color: 'bg-violet-500/10 text-violet-500', title: 'Fraction-of-cent fees',      body: 'Starknet transactions cost a fraction of Ethereum mainnet. Mint, list, and trade IP assets with near-zero gas.' },
  { icon: Shield, color: 'bg-blue-500/10 text-blue-500',     title: 'ZK-STARK security',          body: 'Every transaction batch is verified by STARK proofs on Ethereum. Cryptographic security without trusting a sequencer.' },
  { icon: Coins,  color: 'bg-indigo-500/10 text-indigo-500', title: 'Sponsored transactions',     body: 'Medialane sponsors gas for creator actions via native account abstraction. No ETH required to start creating.' },
  { icon: Globe,  color: 'bg-primary/10 text-primary',        title: 'Native account abstraction', body: 'Wallets are smart contracts. Session keys (SNIP-9) enable PIN-authenticated gasless sessions across multiple actions.' },
]

export default function MembersPageClient() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">Medialane · Membership</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">MDLN Token</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          21 million fixed supply. 100% DAO treasury. No VCs, no insiders, no preferential allocation. Governance is earned, not bought.
        </p>
      </div>

      {/* Tokenomics stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Supply', value: '21,000,000', sub: 'MDLN · Fixed forever',    accent: 'border-t-violet-500' },
          { label: 'DAO Treasury', value: '100%',        sub: 'No external investors',   accent: 'border-t-blue-500'   },
          { label: 'Vesting',      value: '9 years',     sub: 'Linear unlock schedule',  accent: 'border-t-indigo-500' },
          { label: 'Voting Power', value: '1:1',          sub: '1 MDLN = 1 vote',         accent: 'border-t-primary'    },
        ].map((s) => (
          <div key={s.label} className={`rounded-xl border border-border bg-card p-5 border-t-2 ${s.accent}`}>
            <p className="text-xs text-muted-foreground/60 mb-1">{s.label}</p>
            <p className="text-2xl font-bold font-mono text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground/50 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Distribution + Addresses */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">Token Distribution</p>
          {[
            { label: 'Vesting (9 years)',   value: '18,900,000', pct: '90%', bar: 'w-[90%] bg-violet-500' },
            { label: 'Operational runway',  value: '2,100,000',  pct: '10%', bar: 'w-[10%] bg-blue-500'   },
            { label: 'VC allocation',       value: '0',           pct: '0%',  bar: 'w-0'                    },
            { label: 'Team allocation',     value: '0',           pct: '0%',  bar: 'w-0'                    },
          ].map((row) => (
            <div key={row.label} className="py-2.5 border-b border-border/60 last:border-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground/70">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-foreground/70">{row.value}</span>
                  <span className="text-[10px] font-mono text-muted-foreground/40 w-8 text-right">{row.pct}</span>
                </div>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${row.bar}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">On-chain Addresses · Ethereum</p>
          <AddressRow label="Network"           value="Ethereum Mainnet" />
          <AddressRow label="Token Contract"    value={`${mdln.token.slice(0, 10)}…${mdln.token.slice(-6)}`}    href={mdln.etherscanToken}    />
          <AddressRow label="Vesting Contract"  value={`${mdln.vesting.slice(0, 10)}…${mdln.vesting.slice(-6)}`}  href={mdln.etherscanVesting}  />
          <AddressRow label="DAO Treasury"      value={`${mdln.treasury.slice(0, 10)}…${mdln.treasury.slice(-6)}`} href={mdln.etherscanTreasury} />
          <AddressRow label="Governance"        value="medialane.eth"    href={siteConfig.snapshot}            />
          <AddressRow label="MDLN on Starknet"  value={`${starknet.mdlnL2.slice(0, 10)}…${starknet.mdlnL2.slice(-6)}`} href={starknet.voyagerMdln} />
        </div>
      </div>

      {/* Bridge & Trade on Starknet */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-6 h-0.5 rounded-full bg-violet-500" />
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-violet-500">Bridge & Trade on Starknet</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href={`https://starkgate.starknet.io/token/${starknet.mdlnL2}`} target="_blank" rel="noopener noreferrer"
            className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-150">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Starkgate Bridge</p>
              <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors shrink-0" />
            </div>
            <p className="text-xs text-muted-foreground/70 leading-relaxed flex-1">Bridge MDLN from Ethereum mainnet to Starknet via the official Starkgate bridge. MDLN is live on Starknet — same token, two networks.</p>
            <div className="flex flex-wrap gap-1.5">
              {['Ethereum → Starknet', 'Live on Starknet', 'ERC-20'].map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 border border-border">{t}</span>
              ))}
            </div>
          </a>

          <a href="https://app.ekubo.org" target="_blank" rel="noopener noreferrer"
            className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-150">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Ekubo Protocol</p>
              <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors shrink-0" />
            </div>
            <p className="text-xs text-muted-foreground/70 leading-relaxed flex-1">Trade MDLN on Starknet via Ekubo — Starknet's native concentrated liquidity AMM. MDLN/ETH and MDLN/USDC pools. Gasless swaps powered by account abstraction.</p>
            <div className="flex flex-wrap gap-1.5">
              {['AMM DEX', 'Starknet Native', 'Concentrated Liquidity'].map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 border border-border">{t}</span>
              ))}
            </div>
          </a>

          <div className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-card">
            <p className="text-sm font-semibold text-foreground">Zero-fee Tokenization</p>
            <p className="text-xs text-muted-foreground/70 leading-relaxed flex-1">Minting IP assets on Medialane costs zero platform fees. Starknet transactions cost a fraction of a cent. Creator economy without extractive fees — 1% only on marketplace monetization.</p>
            <div className="flex flex-wrap gap-1.5">
              {['Free to Mint', '1% Marketplace Fee', 'Starknet L2'].map((t) => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 border border-border">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Starknet benefits */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="block w-6 h-0.5 rounded-full bg-blue-500" />
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-blue-500">Why Starknet</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {starknetBenefits.map(({ icon: Icon, color, title, body }) => (
            <div key={title} className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-card">
              <div className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${color}`}>
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1.5">{title}</p>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Membership tiers */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">Membership Tiers</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div key={tier.title}
              className={`flex flex-col gap-4 p-5 rounded-xl border bg-card border-t-2 ${tier.accent} ${
                tier.featured ? 'border-primary/20' : 'border-border'
              }`}>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-bold ${tier.color}`}>{tier.title}</p>
                  <span className="text-[10px] font-mono text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-full">{tier.requirement}</span>
                </div>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{tier.description}</p>
              </div>
              <div className="h-px bg-border" />
              <ul className="space-y-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-xs text-muted-foreground/70">
                    <CheckCircle className="size-3.5 shrink-0 text-primary mt-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How to participate */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-6">How to Participate</p>
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          {[
            { step: '01', title: 'Acquire MDLN',  desc: 'Get MDLN via Uniswap on Ethereum mainnet, or bridge to Starknet and trade on Ekubo.' },
            { step: '02', title: 'Join Snapshot', desc: 'Connect to snapshot.org with your wallet holding MDLN to view and vote on proposals.' },
            { step: '03', title: 'Propose & Vote', desc: "Submit governance proposals, vote on platform decisions, and shape Medialane's future." },
          ].map((s) => (
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
          <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Vote on Snapshot <ArrowUpRight className="size-3.5" />
          </a>
          <a href={`https://starkgate.starknet.io/token/${starknet.mdlnL2}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
            Bridge via Starkgate <ArrowUpRight className="size-3.5" />
          </a>
          <a href="https://app.ekubo.org" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
            Trade on Ekubo <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
