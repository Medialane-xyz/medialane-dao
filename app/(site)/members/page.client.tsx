'use client'

import { ExternalLink, ArrowUpRight, CheckCircle } from 'lucide-react'
import { mdln, siteConfig } from '@/lib/site-config'

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

function AddressRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0 gap-4">
      <span className="text-xs text-muted-foreground/60 shrink-0">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-mono text-foreground/70 hover:text-primary transition-colors truncate">
          {value} <ExternalLink className="size-3 shrink-0 opacity-40" />
        </a>
      ) : (
        <span className="text-xs font-mono text-foreground/70 truncate text-right">{value}</span>
      )}
    </div>
  )
}

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
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">On-chain Addresses</p>
          <AddressRow label="Network"           value="Ethereum Mainnet" />
          <AddressRow label="Token Contract"    value={`${mdln.token.slice(0, 10)}…${mdln.token.slice(-6)}`}    href={mdln.etherscanToken}    />
          <AddressRow label="Vesting Contract"  value={`${mdln.vesting.slice(0, 10)}…${mdln.vesting.slice(-6)}`}  href={mdln.etherscanVesting}  />
          <AddressRow label="DAO Treasury"      value={`${mdln.treasury.slice(0, 10)}…${mdln.treasury.slice(-6)}`} href={mdln.etherscanTreasury} />
          <AddressRow label="Governance"        value="medialane.eth"    href={siteConfig.snapshot}            />
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
            { step: '01', title: 'Acquire MDLN',  desc: 'Get MDLN via Uniswap on Ethereum mainnet. Any amount qualifies as Observer.' },
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
          <a href={mdln.etherscanToken} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
            MDLN on Etherscan <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
