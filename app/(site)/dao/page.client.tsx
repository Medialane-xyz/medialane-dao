'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { GlassCard } from '@/components/glass-card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { createContainerVariants, createItemVariants } from '@/lib/motion'
import { siteConfig, mdln } from '@/lib/site-config'
import type { SnapshotProposal, MdlnStats } from '@/lib/governance'
import { ArrowUpRight, Vote, Coins, Lock, Users } from 'lucide-react'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

function ProposalState({ state }: { state: SnapshotProposal['state'] }) {
  const map = {
    active: { label: 'Active', cls: 'bg-green-500/20 text-green-400 border-green-500/30' },
    pending: { label: 'Pending', cls: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    closed: { label: 'Closed', cls: 'bg-white/10 text-muted-foreground border-white/10' },
  }
  const { label, cls } = map[state] ?? map.closed
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${cls}`}>
      {label}
    </span>
  )
}

function timeLeft(end: number) {
  const diff = end * 1000 - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  return days > 0 ? `${days}d left` : `${hours}h left`
}

interface DAOPageClientProps {
  documents: Record<string, { title: string; contentHtml: string }>
  proposals: SnapshotProposal[]
  stats: MdlnStats
}

export default function DAOPageClient({ documents, proposals, stats }: DAOPageClientProps) {
  const documentKeys = Object.keys(documents)
  const defaultTab = documentKeys[0] ?? ''

  const operationalRunway = stats.treasuryBalance ?? 2_100_000
  const vestingPct = ((stats.vestingLocked / mdln.totalSupply) * 100).toFixed(0)
  const runwayPct = ((operationalRunway / mdln.totalSupply) * 100).toFixed(0)

  return (
    <div className="flex min-h-screen flex-col px-4 py-16 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-4xl"
      >
        <PageHeader
          title="DAO"
          description="Foundation, governance, and the principles that guide us."
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-8"
        />

        {/* MDLN Stats strip */}
        <motion.div variants={itemVariants} className="mb-6 grid gap-3 sm:grid-cols-4">
          {[
            {
              icon: Coins,
              label: 'Total Supply',
              value: `${(mdln.totalSupply / 1_000_000).toFixed(0)}M MDLN`,
              sub: 'Fixed — no minting',
            },
            {
              icon: Lock,
              label: 'Vested',
              value: `${vestingPct}%`,
              sub: '9-year unlock',
            },
            {
              icon: Coins,
              label: 'Runway',
              value: `${runwayPct}%`,
              sub: 'Operational treasury',
            },
            {
              icon: Users,
              label: 'Holders',
              value: stats.holders ? stats.holders.toLocaleString() : '—',
              sub: 'MDLN on Ethereum',
            },
          ].map((stat) => (
            <GlassCard
              key={stat.label}
              intensity="light"
              className="flex items-center gap-3 p-4 bg-white/5 border-white/5"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <stat.icon className="size-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.sub}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>

        {/* Snapshot proposals */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-primary">
              Governance Proposals
            </h2>
            <a
              href={siteConfig.snapshot}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Vote className="size-3" />
              medialane.eth
              <ArrowUpRight className="size-3" />
            </a>
          </div>

          {proposals.length === 0 ? (
            <GlassCard intensity="light" className="p-6 bg-white/5 border-white/5 text-center">
              <Vote className="mx-auto mb-2 size-8 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No proposals yet.</p>
              <a
                href={siteConfig.snapshot}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Be the first to propose on Snapshot
                <ArrowUpRight className="size-3" />
              </a>
            </GlassCard>
          ) : (
            <div className="flex flex-col gap-3">
              {proposals.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block outline-none"
                >
                  <GlassCard
                    intensity="light"
                    className="flex items-start justify-between gap-4 p-4 bg-white/5 border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center gap-2 flex-wrap">
                        <ProposalState state={p.state} />
                        {p.state === 'active' && timeLeft(p.end) && (
                          <span className="text-[10px] text-muted-foreground">{timeLeft(p.end)}</span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-foreground line-clamp-2">{p.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {p.votes} vote{p.votes !== 1 ? 's' : ''}
                        {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
                      </p>
                    </div>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  </GlassCard>
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Governance documents */}
        {documentKeys.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/20 pb-2">
              Founding Documents
            </h2>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="mb-6 flex w-full flex-wrap bg-white/5 backdrop-blur-md border border-white/10 p-1 rounded-xl">
                {Object.entries(documents).map(([key, doc]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex-1 text-xs sm:text-sm py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg transition-colors"
                  >
                    {doc.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(documents).map(([key, doc]) => (
                <TabsContent key={key} value={key} className="mt-0 outline-none">
                  <GlassCard intensity="medium" className="p-5 sm:p-8 shadow-lg border-white/5 bg-white/5">
                    <h2 className="mb-5 text-xl sm:text-2xl font-bold text-foreground border-b border-primary/20 pb-3">
                      {doc.title}
                    </h2>
                    <ScrollArea className="h-[65vh] pr-4 sm:pr-6">
                      <article
                        className="prose prose-sm sm:prose-base prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:text-foreground prose-strong:text-foreground"
                        dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
                      />
                    </ScrollArea>
                  </GlassCard>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
