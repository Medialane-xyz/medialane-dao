'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { siteConfig, mdln } from '@/lib/site-config'
import type { SnapshotProposal, MdlnStats } from '@/lib/governance'
import { ArrowUpRight, ChevronDown, ExternalLink, Dot } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function timeLeft(end: number): string | null {
  const diff = end * 1000 - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  return days > 0 ? `${days}d left` : `${hours}h left`
}

/** Strip the first <h1> from rendered markdown — title is shown by the UI */
function stripFirstH1(html: string): string {
  return html.replace(/^<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '')
}

const stateConfig = {
  active:  { label: 'Live',    dot: 'bg-emerald-400', pulse: true,  text: 'text-emerald-400' },
  pending: { label: 'Pending', dot: 'bg-amber-400',   pulse: false, text: 'text-amber-400'   },
  closed:  { label: 'Closed',  dot: 'bg-white/25',    pulse: false, text: 'text-white/40'    },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatLine({
  label,
  value,
  sub,
  accent,
  delay,
}: {
  label: string
  value: string
  sub: string
  accent: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="flex gap-3"
    >
      {/* Accent bar */}
      <div className={`w-0.5 shrink-0 rounded-full ${accent}`} />
      <div>
        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/40 mb-0.5">{label}</p>
        <p className="font-mono text-3xl font-bold leading-none text-white">{value}</p>
        <p className="mt-1 text-[11px] text-white/35">{sub}</p>
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
      className="group flex items-start gap-4 border-b border-white/6 py-5 first:pt-0 last:border-0 outline-none"
    >
      {/* Index */}
      <span className="mt-0.5 font-mono text-xs text-white/20 w-5 shrink-0 select-none">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          {/* State dot */}
          <span className="relative flex size-2 shrink-0">
            {cfg.pulse && (
              <span className={`animate-ping absolute inline-flex size-full rounded-full opacity-75 ${cfg.dot}`} />
            )}
            <span className={`relative inline-flex rounded-full size-2 ${cfg.dot}`} />
          </span>
          <span className={`text-[10px] font-semibold tracking-widest uppercase ${cfg.text}`}>
            {cfg.label}
          </span>
          {remaining && (
            <span className="text-[10px] text-white/30">· {remaining}</span>
          )}
        </div>
        <p className="text-sm font-medium text-white/85 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {p.title}
        </p>
        {(p.votes > 0 || p.scores_total > 0) && (
          <p className="mt-1.5 text-[11px] text-white/30">
            {p.votes} vote{p.votes !== 1 ? 's' : ''}
            {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
          </p>
        )}
      </div>

      <ArrowUpRight className="size-4 shrink-0 text-white/20 group-hover:text-white/60 mt-0.5 transition-colors" />
    </motion.a>
  )
}

function DocAccordion({
  title,
  contentHtml,
  index,
}: {
  title: string
  contentHtml: string
  index: number
}) {
  const [open, setOpen] = useState(index === 0)
  const stripped = stripFirstH1(contentHtml)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.4 }}
      className="border-b border-white/8 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left outline-none group"
      >
        <span className="flex items-center gap-3">
          <span className="font-mono text-xs text-white/25 select-none w-5">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
            {title}
          </span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-white/30 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ScrollArea className="max-h-[60vh] pb-6 pr-2">
              <article
                className="prose prose-sm prose-invert max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h1:text-xl prose-h2:text-base prose-h3:text-sm
                  prose-p:text-white/65 prose-p:leading-relaxed
                  prose-strong:text-white/90
                  prose-a:text-[#EC796B] hover:prose-a:text-[#EC796B]/80
                  prose-ul:text-white/60 prose-li:text-white/60
                  prose-table:text-white/70
                  prose-th:text-white/50 prose-th:font-semibold
                  prose-td:text-white/60 prose-td:border-white/10
                  prose-hr:border-white/10
                  prose-code:text-[#E175B1] prose-code:bg-white/5 prose-code:rounded prose-code:px-1"
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

  const statLines = [
    { label: 'Total Supply',      value: '21M',         sub: 'MDLN · Fixed, no minting',    accent: 'bg-[#EC796B]', delay: 0.1  },
    { label: 'Vested Treasury',   value: `${vestingPct}%`,  sub: '18.9M · Unlocks 2.1M/year', accent: 'bg-[#E175B1]', delay: 0.18 },
    { label: 'Operational',       value: `${runwayPct}%`,   sub: '2.1M · DAO runway',          accent: 'bg-[#0000FF]', delay: 0.26 },
    { label: 'Token Holders',     value: stats.holders ? stats.holders.toLocaleString() : '—', sub: 'MDLN on Ethereum mainnet', accent: 'bg-white/30', delay: 0.34 },
  ]

  return (
    /* Page shell — strong backdrop so 3D bg is visible but text is crisp */
    <div className="min-h-screen px-4 py-16 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30">
              Medialane · Utah DAO LLC
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent max-w-[200px]" />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-none">
            Governance
          </h1>
          <p className="mt-3 text-white/45 text-base max-w-md leading-relaxed">
            Community-owned, creator-first. All decisions made by MDLN holders — no VCs, no insiders.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12 lg:items-start">

          {/* ── LEFT: sticky MDLN stats panel ── */}
          <div className="lg:sticky lg:top-8 lg:w-64 shrink-0">
            {/* Panel */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-xl p-6 space-y-7">
              <div>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-4">
                  MDLN Token
                </p>
                <div className="space-y-6">
                  {statLines.map((s) => (
                    <StatLine key={s.label} {...s} />
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

              {/* Links */}
              <div className="space-y-2.5">
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/25 mb-3">
                  On-chain
                </p>
                {[
                  { label: 'MDLN Contract', href: mdln.etherscanToken },
                  { label: 'Vesting Contract', href: mdln.etherscanVesting },
                  { label: 'DAO Treasury', href: mdln.etherscanTreasury },
                  { label: 'Snapshot · medialane.eth', href: siteConfig.snapshot },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 text-[11px] text-white/40 hover:text-white/80 transition-colors group py-0.5"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="size-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: proposals + documents ── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Proposals section */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40">
                    Proposals
                  </h2>
                  <div className="h-px w-8 bg-white/10" />
                </div>
                <a
                  href={siteConfig.snapshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#EC796B] hover:text-[#EC796B]/80 transition-colors font-medium"
                >
                  Vote on Snapshot
                  <ArrowUpRight className="size-3" />
                </a>
              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-xl px-5">
                {proposals.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm text-white/25 mb-3">No proposals yet.</p>
                    <a
                      href={siteConfig.snapshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#EC796B] hover:underline"
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

            {/* Documents section */}
            {Object.keys(documents).length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-5">
                  <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-white/40">
                    Founding Documents
                  </h2>
                  <div className="h-px w-8 bg-white/10" />
                </div>

                <div className="rounded-2xl bg-white/[0.03] border border-white/8 backdrop-blur-xl px-5">
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
