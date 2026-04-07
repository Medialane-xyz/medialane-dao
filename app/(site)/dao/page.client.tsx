'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig, mdln } from '@/lib/site-config'
import type { SnapshotProposal, MdlnStats } from '@/lib/governance'
import { ArrowUpRight, ChevronDown, ExternalLink, TrendingUp, Users, Lock, Vote } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

function timeLeft(end: number): string | null {
  const diff = end * 1000 - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  return days > 0 ? `${days}d left` : `${hours}h left`
}

function stripFirstH1(html: string): string {
  return html.replace(/^<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '')
}

const stateConfig = {
  active:  { label: 'Active',  dotClass: 'bg-emerald-500', pulse: true,  textClass: 'text-emerald-600 dark:text-emerald-400' },
  pending: { label: 'Pending', dotClass: 'bg-amber-500',   pulse: false, textClass: 'text-amber-600 dark:text-amber-400'   },
  closed:  { label: 'Closed',  dotClass: 'bg-muted-foreground/40', pulse: false, textClass: 'text-muted-foreground' },
}

function ProposalRow({ p, index }: { p: SnapshotProposal; index: number }) {
  const cfg = stateConfig[p.state] ?? stateConfig.closed
  const remaining = p.state === 'active' ? timeLeft(p.end) : null

  return (
    <motion.a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
      className="group flex items-start gap-3 border-b border-border py-4 first:pt-0 last:border-0 hover:bg-accent/30 -mx-4 px-4 rounded-lg transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex size-2 shrink-0">
            {cfg.pulse && <span className={`animate-ping absolute inline-flex size-full rounded-full opacity-75 ${cfg.dotClass}`} />}
            <span className={`relative inline-flex rounded-full size-2 ${cfg.dotClass}`} />
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase ${cfg.textClass}`}>{cfg.label}</span>
          {remaining && <span className="text-[10px] text-muted-foreground">· {remaining}</span>}
        </div>
        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {p.title}
        </p>
        {p.votes > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            {p.votes} vote{p.votes !== 1 ? 's' : ''}
            {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
          </p>
        )}
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 group-hover:text-primary mt-0.5 transition-colors" />
    </motion.a>
  )
}

function DocAccordion({ title, contentHtml, index }: { title: string; contentHtml: string; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-3.5 text-left cursor-pointer group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{title}</span>
        <ChevronDown className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ScrollArea className="max-h-[60vh] pb-5 pr-1">
              <article
                className="prose prose-sm max-w-none pb-4"
                dangerouslySetInnerHTML={{ __html: stripFirstH1(contentHtml) }}
              />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface DAOPageClientProps {
  documents: Record<string, { title: string; contentHtml: string }>
  proposals: SnapshotProposal[]
  stats: MdlnStats
}

const containerVariants = createContainerVariants(0.08, 0.05)
const itemVariants = createItemVariants({ y: 14, duration: 0.5 })

export default function DAOPageClient({ documents, proposals, stats }: DAOPageClientProps) {
  const vestingPct = Math.round((stats.vestingLocked / mdln.totalSupply) * 100)
  const runway = stats.treasuryBalance ?? 2_100_000
  const runwayPct = Math.round((runway / mdln.totalSupply) * 100)

  const tokenStats = [
    { icon: TrendingUp, label: 'Total Supply', value: '21,000,000', sub: 'MDLN · Fixed forever' },
    { icon: Lock,       label: 'Vested',       value: `${vestingPct}%`,    sub: `18.9M · 2.1M / year` },
    { icon: TrendingUp, label: 'Operational',  value: `${runwayPct}%`,     sub: `2.1M · DAO runway`   },
    { icon: Users,      label: 'Holders',      value: stats.holders ? stats.holders.toLocaleString() : '—', sub: 'On Ethereum mainnet' },
  ]

  return (
    <div className="relative min-h-screen bg-background px-4 py-10 lg:px-6 overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-blue   absolute -top-20 right-1/4 h-80 w-80" />
        <div className="aurora-blob aurora-mauve  absolute bottom-1/4 left-1/4 h-64 w-64" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="section-label mb-2">Medialane · Utah DAO LLC</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Governance</h1>
          <p className="mt-2 text-muted-foreground max-w-lg">
            Community-owned, creator-first. All decisions made by MDLN holders — no VCs, no insiders.
          </p>
        </motion.div>

        {/* Token stats */}
        <motion.div variants={itemVariants} className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tokenStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className="size-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
              <p className="text-2xl font-bold font-mono text-foreground tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left: proposals */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <Vote className="size-4 text-muted-foreground" />
                  <h2 className="font-semibold text-sm text-foreground">Proposals</h2>
                </div>
                <a
                  href={siteConfig.snapshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Vote on Snapshot <ArrowUpRight className="size-3" />
                </a>
              </div>
              <div className="px-4 py-2">
                {proposals.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-sm text-muted-foreground mb-2">No proposals yet.</p>
                    <a
                      href={siteConfig.snapshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
                    >
                      Be the first to propose <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                ) : (
                  proposals.map((p, i) => <ProposalRow key={p.id} p={p} index={i} />)
                )}
              </div>
            </div>

            {/* Documents */}
            {Object.keys(documents).length > 0 && (
              <div className="rounded-xl border border-border bg-card shadow-sm">
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold text-sm text-foreground">Founding Documents</h2>
                </div>
                <div className="px-4 py-2">
                  {Object.entries(documents).map(([key, doc], i) => (
                    <DocAccordion key={key} title={doc.title} contentHtml={doc.contentHtml} index={i} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Right: onchain links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="rounded-xl border border-border bg-card shadow-sm p-4">
              <p className="section-label mb-3">On-chain</p>
              <div className="space-y-2">
                {[
                  { label: 'MDLN Contract',            href: mdln.etherscanToken   },
                  { label: 'Vesting Contract',         href: mdln.etherscanVesting },
                  { label: 'DAO Treasury (Gnosis)',     href: mdln.etherscanTreasury},
                  { label: 'Snapshot · medialane.eth', href: siteConfig.snapshot   },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors group border-b border-border last:border-0"
                  >
                    {l.label}
                    <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card shadow-sm p-4">
              <p className="section-label mb-3">Tokenomics</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📌 21M MDLN — fixed, immutable</p>
                <p>🔒 18.9M locked in vesting (9 years)</p>
                <p>💼 2.1M operational runway</p>
                <p>🗳️ 1 MDLN = 1 vote on Snapshot</p>
                <p>🌉 Starknet bridge — coming soon</p>
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <p className="section-label mb-2">Get Involved</p>
              <p className="text-sm text-muted-foreground mb-3">
                MDLN holders govern the protocol. Acquire MDLN to participate.
              </p>
              <a
                href={siteConfig.snapshot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Join Governance <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
