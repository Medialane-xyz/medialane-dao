import Link from 'next/link'
import { ArrowUpRight, Vote, Layers, Coins, BookOpen, ExternalLink } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'

function PageHeader() {
  return (
    <div className="px-6 py-6 border-b border-border">
      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50 mb-1">
        Medialane · Utah DAO LLC
      </p>
      <h1 className="text-2xl font-bold text-foreground">Overview</h1>
    </div>
  )
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted-foreground/60 mb-1">{label}</p>
      <p className="text-xl font-bold font-mono text-foreground">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground/40 mt-0.5">{sub}</p>}
    </div>
  )
}

function QuickLink({ href, icon: Icon, title, description, external }: {
  href: string; icon: React.ElementType; title: string; description: string; external?: boolean
}) {
  const inner = (
    <div className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-150 cursor-pointer h-full">
      <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 mt-0.5">
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <ArrowUpRight className="size-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground/60 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  )
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  return <Link href={href}>{inner}</Link>
}

function AddressRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0 gap-4">
      <span className="text-xs text-muted-foreground/60 shrink-0">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-mono text-foreground/70 hover:text-primary transition-colors truncate"
        >
          {value}
          <ExternalLink className="size-3 shrink-0 opacity-50" />
        </a>
      ) : (
        <span className="text-xs font-mono text-foreground/70 truncate text-right">{value}</span>
      )}
    </div>
  )
}

export function HeroSection() {
  return (
    <div className="p-6 max-w-5xl space-y-8">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">
          Medialane · Utah DAO LLC · Starknet Mainnet
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-3">
          Intellectual property infrastructure<br className="hidden sm:block" /> for the open web.
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl leading-relaxed mb-5">
          An open protocol for IP registration, licensing, and trade. Deployed on Starknet. Governed by MDLN token holders. No central authority. No intermediaries.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Open App <ArrowUpRight className="size-3.5" />
          </a>
          <Link
            href="/dao"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View Governance →
          </Link>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="MDLN Supply" value="21,000,000" sub="Fixed forever" />
        <StatCard label="DAO Treasury" value="100%" sub="No VC allocation" />
        <StatCard label="Vesting" value="9 years" sub="Linear unlock" />
        <StatCard label="Network" value="Starknet" sub="+ Ethereum (MDLN)" />
      </div>

      {/* ── Quick links ───────────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-3">Explore</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickLink
            href="/dao"
            icon={Vote}
            title="Governance"
            description="Proposals, voting, and founding documents."
          />
          <QuickLink
            href="/explore"
            icon={Layers}
            title="Protocol"
            description="Apps, features, and onchain contracts."
          />
          <QuickLink
            href="/members"
            icon={Coins}
            title="MDLN Token"
            description="Tokenomics, distribution, and how to participate."
          />
          <QuickLink
            href="/docs"
            icon={BookOpen}
            title="Docs"
            description="DAO constitution, charter, and guidelines."
          />
        </div>
      </div>

      {/* ── MDLN token ────────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">MDLN Token · Ethereum Mainnet</p>
          <AddressRow label="Symbol" value="MDLN" />
          <AddressRow label="Total Supply" value="21,000,000" />
          <AddressRow label="Treasury" value="100% — no VCs" />
          <AddressRow
            label="Token Contract"
            value={`${mdln.token.slice(0, 10)}…${mdln.token.slice(-6)}`}
            href={mdln.etherscanToken}
          />
          <AddressRow
            label="Gnosis Safe"
            value={`${mdln.treasury.slice(0, 10)}…${mdln.treasury.slice(-6)}`}
            href={mdln.etherscanTreasury}
          />
          <AddressRow label="Governance" value="medialane.eth" href={siteConfig.snapshot} />
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">Onchain Contracts · Starknet Mainnet</p>
          <AddressRow label="Network" value="Starknet Mainnet" />
          <AddressRow
            label="Marketplace"
            value={`${starknet.marketplace.slice(0, 10)}…${starknet.marketplace.slice(-6)}`}
          />
          <AddressRow
            label="Drop Factory"
            value={`${starknet.dropFactory.slice(0, 10)}…${starknet.dropFactory.slice(-6)}`}
          />
          <AddressRow
            label="POP Factory"
            value={`${starknet.popFactory.slice(0, 10)}…${starknet.popFactory.slice(-6)}`}
          />
        </div>
      </div>

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">Principles</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { title: 'Creator sovereignty', body: 'Every IP asset is a non-custodial onchain token. No permission required to transfer, license, or trade.' },
            { title: 'Immutable by design', body: 'Contracts are non-upgradeable. Metadata anchored on IPFS. What is registered cannot be altered.' },
            { title: 'Community governed', body: '21M MDLN. 100% DAO treasury. Every protocol decision requires a community vote. No insiders.' },
            { title: 'Open infrastructure', body: 'Permissionless. Any creator, developer, or app can interact directly with the contracts.' },
          ].map(({ title, body }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border text-[11px] font-mono text-muted-foreground/30">
        <p>© {new Date().getFullYear()} Medialane DAO · Utah DAO LLC</p>
        <div className="flex items-center gap-4">
          <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
          <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Snapshot ↗</a>
          <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">App ↗</a>
        </div>
      </footer>

    </div>
  )
}
