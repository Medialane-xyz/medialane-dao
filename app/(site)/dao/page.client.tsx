'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig, mdln } from '@/lib/site-config'
import type { SnapshotProposal, MdlnStats } from '@/lib/governance'
import { ArrowUpRight, ChevronDown, ExternalLink } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
  active:  { label: 'Live',    dotClass: 'bg-emerald-500', pulse: true,  textClass: 'text-emerald-600 dark:text-emerald-400' },
  pending: { label: 'Pending', dotClass: 'bg-amber-500',   pulse: false, textClass: 'text-amber-600 dark:text-amber-400'   },
  closed:  { label: 'Closed',  dotClass: 'bg-muted-foreground/40', pulse: false, textClass: 'text-muted-foreground' },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBlock({
  label,
  value,
  sub,
  accentHex,
  delay,
}: {
  label: string
  value: string
  sub: string
  accentHex: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      className="flex gap-3 items-stretch"
    >
      <div className="w-0.5 shrink-0 rounded-full" style={{ backgroundColor: accentHex }} />
      <div className="py-0.5">
        <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted-foreground mb-0.5">{label}</p>
        <p className="font-mono text-2xl font-bold leading-none text-foreground">{value}</p>
        <p className="mt-1 text-[11px] text-muted-foreground/70">{sub}</p>
      </div>
    </motion.div>
  )
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
      transition={{ delay: 0.08 + index * 0.06, duration: 0.35 }}
      className="group flex items-start gap-4 border-b border-border py-5 first:pt-0 last:border-0 outline-none hover:bg-muted/20 -mx-5 px-5 transition-colors rounded-lg"
    >
      <span className="mt-0.5 font-mono text-[11px] text-muted-foreground/50 w-5 shrink-0 select-none tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex size-2 shrink-0">
            {cfg.pulse && (
              <span className={`animate-ping absolute inline-flex size-full rounded-full opacity-60 ${cfg.dotClass}`} />
            )}
            <span className={`relative inline-flex rounded-full size-2 ${cfg.dotClass}`} />
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase ${cfg.textClass}`}>
            {cfg.label}
          </span>
          {remaining && (
            <span className="text-[10px] text-muted-foreground">· {remaining}</span>
          )}
        </div>
        <p className="text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {p.title}
        </p>
        {(p.votes > 0 || p.scores_total > 0) && (
          <p className="mt-1.5 text-[11px] text-muted-foreground/70">
            {p.votes} vote{p.votes !== 1 ? 's' : ''}
            {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
          </p>
        )}
      </div>

      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/30 group-hover:text-primary mt-0.5 transition-colors" />
    </motion.a>
  )
}

function DocAccordion({ title, contentHtml, index }: { title: string; contentHtml: string; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const stripped = stripFirstH1(contentHtml)

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.12 + index * 0.07, duration: 0.35 }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left outline-none group cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-muted-foreground/40 select-none w-5 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ScrollArea className="max-h-[60vh] pb-6 pr-2">
              <article
                className="prose prose-sm max-w-none pb-4"
                dangerouslySetInnerHTML={{ __html: stripped }}
              />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

interface DAOPageClientProps {
  documents: Record<string, { title: string; contentHtml: string }>
  proposals: SnapshotProposal[]
  stats: MdlnStats
}

export default function DAOPageClient({ documents, proposals, stats }: DAOPageClientProps) {
  const operationalRunway = stats.treasuryBalance ?? 2_100_000
  const vestingPct        = ((stats.vestingLocked / mdln.totalSupply) * 100).toFixed(0)
  const runwayPct         = ((operationalRunway / mdln.totalSupply) * 100).toFixed(0)

  const statBlocks = [
    { label: 'Total Supply',    value: '21M',                  sub: 'MDLN · Fixed, no minting ever',  accentHex: '#EC796B', delay: 0.08  },
    { label: 'Vested Treasury', value: `${vestingPct}%`,        sub: '18.9M · Unlocks 2.1M per year',  accentHex: '#E175B1', delay: 0.15  },
    { label: 'Operational',     value: `${runwayPct}%`,         sub: '2.1M · DAO operational runway',  accentHex: '#0000FF', delay: 0.22  },
    { label: 'Token Holders',   value: stats.holders ? stats.holders.toLocaleString() : '—', sub: 'MDLN on Ethereum mainnet', accentHex: 'oklch(0.55 0.04 264)', delay: 0.29 },
  ]

  const onchainLinks = [
    { label: 'MDLN Contract',             href: mdln.etherscanToken   },
    { label: 'Vesting Contract',          href: mdln.etherscanVesting },
    { label: 'DAO Treasury',              href: mdln.etherscanTreasury },
    { label: 'Snapshot · medialane.eth',  href: siteConfig.snapshot   },
  ]

  return (
    <div className="min-h-screen bg-background px-4 py-14 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-12"
        >
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Medialane · Utah DAO LLC
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-[0.95]">
            Governance
          </h1>
          <p className="mt-3 text-muted-foreground text-base max-w-sm leading-relaxed">
            Community-owned, creator-first. All decisions made by MDLN holders — no VCs, no insiders.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10 lg:items-start">

          {/* ── LEFT: MDLN stats ── */}
          <div className="lg:sticky lg:top-8 lg:w-60 shrink-0">
            <div className="rounded-2xl bg-card border border-border p-6 space-y-6">
              <div>
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-foreground mb-5">
                  MDLN Token
                </p>
                <div className="space-y-5">
                  {statBlocks.map((s) => (
                    <StatBlock key={s.label} {...s} />
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div className="space-y-1">
                <p className="font-mono text-[9px] tracking-[0.22em] uppercase text-muted-foreground mb-3">
                  On-chain
                </p>
                {onchainLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors group py-1"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="size-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: proposals + documents ── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Proposals */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-1 h-4 rounded-full bg-ml-orange" />
                  <h2 className="text-xs font-bold tracking-[0.16em] uppercase text-foreground">
                    Proposals
                  </h2>
                </div>
                <a
                  href={siteConfig.snapshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-ml-orange hover:text-ml-orange/80 transition-colors font-semibold"
                >
                  Vote on Snapshot
                  <ArrowUpRight className="size-3" />
                </a>
              </div>

              <div className="rounded-2xl bg-card border border-border px-5">
                {proposals.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-muted-foreground mb-3">No proposals yet.</p>
                    <a
                      href={siteConfig.snapshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-ml-orange hover:underline font-semibold"
                    >
                      Be the first to propose
                      <ArrowUpRight className="size-3" />
                    </a>
                  </div>
                ) : (
                  proposals.map((p, i) => <ProposalRow key={p.id} p={p} index={i} />)
                )}
              </div>
            </section>

            {/* Documents */}
            {Object.keys(documents).length > 0 && (
              <section>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-1 h-4 rounded-full bg-ml-mauve" />
                  <h2 className="text-xs font-bold tracking-[0.16em] uppercase text-foreground">
                    Founding Documents
                  </h2>
                </div>

                <div className="rounded-2xl bg-card border border-border px-5">
                  {Object.entries(documents).map(([key, doc], i) => (
                    <DocAccordion
                      key={key}
                      title={doc.title}
                      contentHtml={doc.contentHtml}
                      index={i}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
