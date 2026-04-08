'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'

// ── Reusable primitives ───────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60 mb-5">
      {children}
    </p>
  )
}

function Divider() {
  return <hr className="border-border/40 my-14" />
}

function DataRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-border/25 last:border-0">
      <span className="text-xs text-muted-foreground/70 shrink-0 w-32 sm:w-40">{label}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-foreground/80 hover:text-foreground transition-colors truncate text-right flex items-center gap-1"
        >
          {value} <ArrowUpRight className="size-3 shrink-0 opacity-50" />
        </a>
      ) : (
        <span className="text-sm font-mono text-foreground/80 text-right">{value}</span>
      )}
    </div>
  )
}

function ProtocolLink({ href, label, description, external = false }: {
  href: string; label: string; description: string; external?: boolean
}) {
  const Inner = (
    <div className="group flex items-start justify-between gap-6 py-5 border-b border-border/30 last:border-0">
      <div className="space-y-1 min-w-0">
        <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{label}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <ArrowUpRight className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
    </div>
  )
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer">{Inner}</a>
  ) : (
    <Link href={href}>{Inner}</Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 pt-28 pb-24">

      {/* ── Identity ──────────────────────────────────────────────────────── */}
      <section>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 mb-6">
          Medialane DAO · Utah LLC · Starknet Mainnet
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-foreground">
          Intellectual property
          <br />
          infrastructure for
          <br />
          the open web.
        </h1>
        <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-lg">
          Medialane is an open protocol for IP registration, licensing, and trade.
          Deployed on Starknet. Governed by MDLN token holders.
          No central authority. No intermediaries.
        </p>
        <div className="mt-8 flex items-center gap-5">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
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
      </section>

      <Divider />

      {/* ── Protocol ──────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Protocol</SectionLabel>
        <ProtocolLink
          href="https://medialane.io/marketplace"
          label="IP Marketplace"
          description="Mint, list, and trade intellectual property. 12 IP types. Gasless orders via account abstraction on Starknet mainnet."
          external
        />
        <ProtocolLink
          href="https://medialane.io/launchpad"
          label="Creator Launchpad"
          description="Deploy onchain collections, Collection Drops, and POP attendance credentials. Programmable licensing embedded in every token."
          external
        />
        <ProtocolLink
          href="/dao"
          label="DAO Governance"
          description="Protocol parameters, treasury allocation, and platform direction — decided by MDLN token holders through Snapshot."
        />
      </section>

      <Divider />

      {/* ── MDLN Token ────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>MDLN Token</SectionLabel>
        <DataRow label="Symbol" value="MDLN" />
        <DataRow label="Total Supply" value="21,000,000" />
        <DataRow label="DAO Treasury" value="100% — no VC allocation" />
        <DataRow label="Vesting" value="9 years" />
        <DataRow label="Network" value="Ethereum Mainnet" />
        <DataRow
          label="Token Contract"
          value={`${mdln.token.slice(0, 10)}…${mdln.token.slice(-6)}`}
          href={mdln.etherscanToken}
        />
        <DataRow
          label="Treasury (Gnosis)"
          value={`${mdln.treasury.slice(0, 10)}…${mdln.treasury.slice(-6)}`}
          href={mdln.etherscanTreasury}
        />
        <DataRow
          label="Governance"
          value="snapshot.org/#/s:medialane.eth"
          href={siteConfig.snapshot}
        />
      </section>

      <Divider />

      {/* ── Onchain Contracts ─────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Onchain Contracts · Starknet Mainnet</SectionLabel>
        <DataRow label="Network" value="Starknet Mainnet" />
        <DataRow
          label="Marketplace"
          value={`${starknet.marketplace.slice(0, 10)}…${starknet.marketplace.slice(-6)}`}
        />
        <DataRow
          label="Collection Drop Factory"
          value={`${starknet.dropFactory.slice(0, 10)}…${starknet.dropFactory.slice(-6)}`}
        />
        <DataRow
          label="POP Factory"
          value={`${starknet.popFactory.slice(0, 10)}…${starknet.popFactory.slice(-6)}`}
        />
      </section>

      <Divider />

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Principles</SectionLabel>
        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            <strong className="text-foreground font-semibold">Creator sovereignty.</strong>{' '}
            Every IP asset is a non-custodial onchain token. Ownership is direct,
            permanent, and requires no permission to transfer, license, or trade.
          </p>
          <p>
            <strong className="text-foreground font-semibold">Immutable by design.</strong>{' '}
            Protocol contracts are non-upgradeable. Metadata is permanently anchored on IPFS.
            What is registered cannot be altered or removed.
          </p>
          <p>
            <strong className="text-foreground font-semibold">Community governed.</strong>{' '}
            21 million MDLN tokens. 100% held in the DAO treasury.
            Every parameter change, treasury action, and protocol decision
            requires a community vote. No insiders, no VCs, no preferential allocations.
          </p>
          <p>
            <strong className="text-foreground font-semibold">Open infrastructure.</strong>{' '}
            The protocol is permissionless. Any creator, developer, or application
            can interact directly with the contracts. No gatekeeping.
          </p>
        </div>
      </section>

      <Divider />

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground/50">
        <p>© {new Date().getFullYear()} Medialane DAO · Utah DAO LLC</p>
        <nav className="flex items-center gap-4 flex-wrap">
          <Link href="/explore" className="hover:text-foreground transition-colors">Explore</Link>
          <Link href="/dao" className="hover:text-foreground transition-colors">Governance</Link>
          <Link href="/members" className="hover:text-foreground transition-colors">Members</Link>
          <Link href="/connect" className="hover:text-foreground transition-colors">Connect</Link>
          <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">App ↗</a>
        </nav>
      </footer>

    </div>
  )
}
