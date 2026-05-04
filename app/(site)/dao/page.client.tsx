'use client'

import Link from 'next/link'
import { siteConfig, mdln } from '@/lib/site-config'
import type { SnapshotProposal, MdlnStats } from '@/lib/governance'
import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { StatCard } from '@/components/stat-card'
import { SectionHeader } from '@/components/section-header'

function timeLeft(end: number): string | null {
  const diff = end * 1000 - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  return days > 0 ? `${days}d left` : `${hours}h left`
}

const stateConfig = {
  active:  { label: 'Active',  dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', pulse: true  },
  pending: { label: 'Pending', dot: 'bg-amber-500',   text: 'text-amber-600 dark:text-amber-400',     pulse: false },
  closed:  { label: 'Closed',  dot: 'bg-muted-foreground/30', text: 'text-muted-foreground/50',        pulse: false },
}

function ProposalRow({ p }: { p: SnapshotProposal }) {
  const cfg = stateConfig[p.state] ?? stateConfig.closed
  const remaining = p.state === 'active' ? timeLeft(p.end) : null
  return (
    <a href={p.link} target="_blank" rel="noopener noreferrer"
      className="group flex items-start gap-3 py-4 border-b border-border/60 last:border-0 hover:bg-muted/30 -mx-5 px-5 transition-colors rounded-lg">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex size-2 shrink-0">
            {cfg.pulse && <span className={`animate-ping absolute inline-flex size-full rounded-full opacity-75 ${cfg.dot}`} />}
            <span className={`relative inline-flex rounded-full size-2 ${cfg.dot}`} />
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase ${cfg.text}`}>{cfg.label}</span>
          {remaining && <span className="text-[10px] text-muted-foreground/40">· {remaining}</span>}
        </div>
        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{p.title}</p>
        {p.votes > 0 && (
          <p className="mt-1 text-xs text-muted-foreground/50">
            {p.votes.toLocaleString()} vote{p.votes !== 1 ? 's' : ''}
            {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
          </p>
        )}
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/20 group-hover:text-primary mt-0.5 transition-colors" />
    </a>
  )
}

interface DAOPageClientProps {
  documents: Record<string, { title: string; contentHtml: string }>
  proposals: SnapshotProposal[]
  stats: MdlnStats
}

export default function DAOPageClient({ documents, proposals, stats }: DAOPageClientProps) {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      <PageHero
        eyebrow="Medialane · Utah DAO LLC"
        title="Governance"
        description="Medialane is governed by its community — creators, collectors, builders, and autonomous AI that hold MDLN. Every protocol upgrade and revenue decision is voted on-chain. No VCs. No insiders. No company."
      />

      {/* Token Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Supply" value="21,000,000" sub="MDLN · Fixed forever" accent="border-t-violet-500" />
        <StatCard
          label="Vested"
          value={`${Math.round((stats.vestingLocked / mdln.totalSupply) * 100)}%`}
          sub="9-year linear vesting"
          accent="border-t-blue-500"
        />
        <StatCard label="Operational" value="10%" sub="2.1M · protocol runway" accent="border-t-indigo-500" />
        <StatCard
          label="Holders"
          value={stats.holders ? stats.holders.toLocaleString() : '—'}
          sub="Ethereum mainnet"
          accent="border-t-primary"
        />
      </div>

      {/* How Revenue Works */}
      <div className="rounded-xl border border-border bg-card p-6 max-w-3xl">
        <SectionHeader label="Treasury & Revenue" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          A 1% marketplace fee flows into the Medialane DAO treasury — a Gnosis Safe multisig on Ethereum, fully auditable on-chain.
          Each year, MDLN holders vote on Snapshot to decide how that revenue is used: Creator&#39;s Airdrop, token buyback, token burn,
          protocol development, or operations. No predetermined formula. Community-governed every cycle.
        </p>
      </div>

      {/* Proposals + sidebar */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Proposals</h2>
            <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
              Vote on Snapshot <ArrowUpRight className="size-3" />
            </a>
          </div>
          <div className="px-5 py-3">
            {proposals.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground mb-3">No proposals yet.</p>
                <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                  Be the first to propose <ArrowUpRight className="size-3" />
                </a>
              </div>
            ) : proposals.map((p) => <ProposalRow key={p.id} p={p} />)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader label="On-chain" />
            {[
              { label: 'MDLN Contract',            href: mdln.etherscanToken    },
              { label: 'Vesting Contract',         href: mdln.etherscanVesting  },
              { label: 'Treasury (Gnosis Safe)',   href: mdln.etherscanTreasury },
              { label: 'Snapshot · medialane.eth', href: siteConfig.snapshot    },
            ].map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between py-2.5 text-sm text-muted-foreground/70 hover:text-primary transition-colors group border-b border-border/60 last:border-0">
                {l.label}
                <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader label="How to vote" />
            <div className="space-y-3 text-xs text-muted-foreground/70 leading-relaxed">
              {[
                'Get MDLN on Ethereum via Uniswap, or on Starknet via Ekubo.',
                'Connect your wallet to Snapshot at medialane.eth.',
                'Vote on proposals. 1 MDLN = 1 vote. Gasless.',
              ].map((s, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="font-mono font-bold text-muted-foreground/30 shrink-0">0{i + 1}</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
            <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Open Snapshot <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Founding Documents */}
      {Object.keys(documents).length > 0 && (
        <div>
          <SectionHeader label="Founding Documents" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(documents).map(([slug, doc]) => (
              <Link key={slug} href={`/docs/${slug}`}
                className="group flex items-start gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-150">
                <FileText className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{doc.title}</p>
                  <p className="text-[11px] text-muted-foreground/40 mt-1">Read document →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
