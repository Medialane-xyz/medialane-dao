import Link from 'next/link'
import { ArrowUpRight, Vote, Layers, Coins, BookOpen } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'
import { AddressRow } from '@/components/address-row'

function StatCard({ label, value, sub, accent }: {
  label: string; value: string; sub?: string; accent?: string
}) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 flex flex-col gap-1 border-t-2 ${accent ?? 'border-t-primary'}`}>
      <p className="text-xs text-muted-foreground/60 font-medium">{label}</p>
      <p className="text-2xl font-bold font-mono text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground/50 mt-0.5">{sub}</p>}
    </div>
  )
}

function QuickLink({ href, icon: Icon, title, description, external, color }: {
  href: string; icon: React.ElementType; title: string; description: string
  external?: boolean; color?: string
}) {
  const inner = (
    <div className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-150 cursor-pointer h-full">
      <div className={`flex size-9 items-center justify-center rounded-lg shrink-0 mt-0.5 ${color ?? 'bg-primary/10 text-primary'}`}>
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <ArrowUpRight className="size-3.5 text-muted-foreground/30 group-hover:text-primary transition-colors shrink-0" />
        </div>
        <p className="text-xs text-muted-foreground/60 leading-relaxed">{description}</p>
      </div>
    </div>
  )
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
  return <Link href={href}>{inner}</Link>
}


export function HeroSection() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-5">
          Medialane · Utah DAO LLC · Starknet Mainnet
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
          <span className="gradient-text">Creator capital markets.</span>
          <br /><span className="text-foreground">Open. Immutable. Yours.</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-6">
          New monetization revenues for creators, collectors, organizations, and autonomous AI.
          Earn royalties, license your work, and trade on-chain — secured by zero-knowledge proofs,
          governed by the community. No gatekeepers. No intermediaries.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a href="https://medialane.io" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            Open App <ArrowUpRight className="size-4" />
          </a>
          <Link href="/dao" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View Governance →
          </Link>
        </div>
      </div>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="MDLN Supply"    value="21,000,000" sub="Fixed forever"      accent="border-t-primary"   />
        <StatCard label="DAO Treasury"   value="100%"        sub="No VC allocation"   accent="border-t-violet-500" />
        <StatCard label="Vesting"        value="9 years"     sub="Linear unlock"      accent="border-t-blue-500"   />
        <StatCard label="Network"        value="Starknet"    sub="+ Ethereum (MDLN)"  accent="border-t-indigo-500" />
      </div>

      {/* ── Quick links ───────────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">Explore</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickLink href="/dao"     icon={Vote}    title="Governance" color="bg-violet-500/10 text-violet-500"
            description="Proposals, voting, and founding documents." />
          <QuickLink href="/explore" icon={Layers}  title="Protocol"   color="bg-blue-500/10 text-blue-500"
            description="Apps, features, and onchain contracts." />
          <QuickLink href="/members" icon={Coins}   title="MDLN Token" color="bg-indigo-500/10 text-indigo-500"
            description="Tokenomics, distribution, and how to participate." />
          <QuickLink href="/docs"    icon={BookOpen} title="Docs"      color="bg-primary/10 text-primary"
            description="DAO constitution, charter, and guidelines." />
        </div>
      </div>

      {/* ── Token + Contracts ─────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-1">MDLN Token</p>
          <p className="text-xs text-muted-foreground/50 mb-5">Ethereum Mainnet</p>
          <AddressRow label="Symbol"           value="MDLN" />
          <AddressRow label="Total Supply"     value="21,000,000" />
          <AddressRow label="Treasury"         value="100% — no VCs" />
          <AddressRow label="Token Contract"   value={`${mdln.token.slice(0,10)}…${mdln.token.slice(-6)}`}     href={mdln.etherscanToken} />
          <AddressRow label="Gnosis Safe"      value={`${mdln.treasury.slice(0,10)}…${mdln.treasury.slice(-6)}`} href={mdln.etherscanTreasury} />
          <AddressRow label="Governance"       value="medialane.eth" href={siteConfig.snapshot} />
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-1">Onchain Contracts</p>
          <p className="text-xs text-muted-foreground/50 mb-5">Starknet Mainnet</p>
          <AddressRow label="Network"               value="Starknet Mainnet" />
          <AddressRow label="Marketplace 721 v2"   value={`${starknet.marketplace721.slice(0,10)}…${starknet.marketplace721.slice(-6)}`} href={starknet.starkscanMarketplace721} />
          <AddressRow label="Marketplace 1155 v2"  value={`${starknet.marketplace1155.slice(0,10)}…${starknet.marketplace1155.slice(-6)}`} href={starknet.starkscanMarketplace1155} />
          <AddressRow label="Drop Factory"         value={`${starknet.dropFactory.slice(0,10)}…${starknet.dropFactory.slice(-6)}`} />
          <AddressRow label="POP Factory"          value={`${starknet.popFactory.slice(0,10)}…${starknet.popFactory.slice(-6)}`} />
        </div>
      </div>

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">Principles</p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            { title: 'Earn forever',      body: 'Royalties, licensing terms, and revenue splits live inside immutable Cairo smart contracts. Every resale, every license — revenue flows back automatically. Your rules. Your revenue.', color: 'text-violet-500' },
            { title: 'Born protected',    body: 'Minting timestamps your work under the Berne Convention — instant copyright proof in 181 countries, no lawyers, no registration fees, no WIPO filings required.', color: 'text-blue-500' },
            { title: 'Censorship-proof',  body: 'STARK proofs on Starknet, verified on Ethereum. No central authority can alter, delist, or censor your work. Open source, permissionless, and built to last.', color: 'text-indigo-500' },
            { title: 'Built for all intelligences', body: '21M MDLN. 100% DAO treasury. A permissionless layer for creators, organizations, and autonomous AI — governed by the community, not a company.', color: 'text-primary' },
          ].map(({ title, body, color }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5">
              <p className={`text-sm font-bold mb-2 ${color}`}>{title}</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}
