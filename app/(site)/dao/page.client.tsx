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
  active:  { label: 'Live',    dot: 'bg-emerald-400', pulse: true,  text: 'text-emerald-400' },
  pending: { label: 'Pending', dot: 'bg-amber-400',   pulse: false, text: 'text-amber-400'   },
  closed:  { label: 'Closed',  dot: 'bg-white/20',    pulse: false, text: 'text-white/30'    },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatBlock({ label, value, sub, accentHex, delay }: {
  label: string; value: string; sub: string; accentHex: string; delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      className="flex flex-col gap-1"
    >
      <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-white/30">{label}</span>
      <span
        className="font-mono text-4xl font-bold leading-none"
        style={{ color: accentHex }}
      >
        {value}
      </span>
      <span className="text-[11px] text-white/35 leading-tight mt-0.5">{sub}</span>
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
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.06 + index * 0.05, duration: 0.35 }}
      className="group flex items-start gap-4 border-b border-white/6 py-5 first:pt-0 last:border-0 outline-none hover:-mx-5 hover:px-5 hover:bg-white/3 transition-all rounded-xl"
    >
      <span className="mt-0.5 font-mono text-[11px] text-white/18 w-5 shrink-0 select-none tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="relative flex size-2 shrink-0">
            {cfg.pulse && <span className={`animate-ping absolute inline-flex size-full rounded-full opacity-75 ${cfg.dot}`} />}
            <span className={`relative inline-flex rounded-full size-2 ${cfg.dot}`} />
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase ${cfg.text}`}>{cfg.label}</span>
          {remaining && <span className="text-[10px] text-white/25">· {remaining}</span>}
        </div>
        <p className="text-sm font-semibold text-white/75 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {p.title}
        </p>
        {(p.votes > 0 || p.scores_total > 0) && (
          <p className="mt-1.5 text-[11px] text-white/25">
            {p.votes} vote{p.votes !== 1 ? 's' : ''}
            {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
          </p>
        )}
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-white/15 group-hover:text-white/50 mt-0.5 transition-colors" />
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
      transition={{ delay: 0.1 + index * 0.06, duration: 0.35 }}
      className="border-b border-white/6 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left outline-none group cursor-pointer"
      >
        <span className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/20 select-none w-5 tabular-nums">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors">
            {title}
          </span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-white/25 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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
                className="prose prose-sm prose-invert max-w-none
                  prose-headings:text-white prose-p:text-white/60 prose-strong:text-white/85
                  prose-a:text-ml-orange prose-ul:text-white/55 prose-li:text-white/55
                  prose-code:text-ml-mauve prose-code:bg-white/5 prose-code:rounded prose-code:px-1
                  prose-hr:border-white/10 prose-th:text-white/40 prose-td:text-white/55"
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
  const vestingPct        = Math.round((stats.vestingLocked / mdln.totalSupply) * 100)
  const runwayPct         = Math.round((operationalRunway / mdln.totalSupply) * 100)

  const statBlocks = [
    { label: 'Total Supply',    value: '21M',               sub: 'MDLN · Fixed, immutable',        accentHex: '#EC796B', delay: 0.08 },
    { label: 'Vested Treasury', value: `${vestingPct}%`,    sub: `18.9M · 2.1M unlocks / year`,    accentHex: '#E175B1', delay: 0.14 },
    { label: 'Operational',     value: `${runwayPct}%`,     sub: '2.1M · DAO runway',               accentHex: '#6060ff', delay: 0.20 },
    { label: 'Holders',         value: stats.holders ? stats.holders.toLocaleString() : '—', sub: 'MDLN on Ethereum', accentHex: 'rgba(255,255,255,0.45)', delay: 0.26 },
  ]

  return (
    <div className="min-h-screen px-4 py-14 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30 mb-3">
            Medialane · Utah DAO LLC
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[0.95]">
            Governance
          </h1>
          <p className="mt-3 text-white/40 text-base max-w-sm leading-relaxed">
            Community-owned, creator-first. All decisions made by MDLN holders.
          </p>
        </motion.div>

        {/* MDLN stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.45 }}
          className="mb-10 rounded-2xl border border-white/8 bg-black/30 backdrop-blur-2xl p-6"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {statBlocks.map((s) => (
              <StatBlock key={s.label} {...s} />
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-white/6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">On-chain</p>
            {[
              { label: 'MDLN Token',    href: mdln.etherscanToken   },
              { label: 'Vesting',       href: mdln.etherscanVesting },
              { label: 'Treasury',      href: mdln.etherscanTreasury },
              { label: 'medialane.eth', href: siteConfig.snapshot   },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-white/30 hover:text-white/70 transition-colors"
              >
                {link.label}
                <ExternalLink className="size-3" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Two-column: proposals + documents */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">

          {/* Proposals */}
          <div className="lg:flex-[3]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="block w-1 h-4 rounded-full bg-ml-orange" />
                <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">Proposals</h2>
              </div>
              <a
                href={siteConfig.snapshot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-ml-orange hover:text-ml-orange/70 transition-colors font-semibold"
              >
                Vote on Snapshot
                <ArrowUpRight className="size-3" />
              </a>
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/25 backdrop-blur-xl px-5">
              {proposals.length === 0 ? (
                <div className="py-14 text-center">
                  <p className="text-sm text-white/25 mb-3">No proposals yet.</p>
                  <a
                    href={siteConfig.snapshot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-ml-orange hover:underline font-semibold"
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
            <div className="lg:flex-[2]">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="block w-1 h-4 rounded-full bg-ml-mauve" />
                <h2 className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
                  Founding Documents
                </h2>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/25 backdrop-blur-xl px-5">
                {Object.entries(documents).map(([key, doc], i) => (
                  <DocAccordion key={key} title={doc.title} contentHtml={doc.contentHtml} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
