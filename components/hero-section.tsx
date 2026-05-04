import Link from 'next/link'
import { ArrowUpRight, Vote, Layers, Coins, Wrench } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { FeatureCard } from '@/components/feature-card'

const pillars = [
  {
    title: 'Monetize anything',
    body: 'IP assets, NFTs, RWAs, and tokens. Royalties, licensing, and trading with programmable revenue enforced by immutable Cairo smart contracts. Your rules, encoded in code.',
    color: 'text-violet-500',
  },
  {
    title: 'Own it forever',
    body: 'Minting creates a Berne Convention-compatible copyright record — IPFS content fingerprint plus a Starknet block timestamp. Proof of prior art valid in 181 countries. No registration. No lawyers.',
    color: 'text-blue-500',
  },
  {
    title: 'Built for all intelligences',
    body: 'Human creators, organizations, and autonomous AI agents are first-class participants. Any intelligence with a cryptographic identifier can register, license, and govern. No KYC. No gatekeeping.',
    color: 'text-indigo-500',
  },
  {
    title: 'Governed by the community',
    body: "A 1% marketplace fee funds the DAO treasury. MDLN holders vote on Snapshot each year: Creator's Airdrop, token buyback, token burn, development, or operations. Community-governed — not predetermined.",
    color: 'text-primary',
  },
]

const quickLinks = [
  {
    href: '/dao',
    title: 'Governance',
    description: 'Proposals, voting, and founding documents.',
    icon: Vote,
    iconColor: 'bg-violet-500/10 text-violet-500',
  },
  {
    href: '/explore',
    title: 'Protocol',
    description: 'Monetization tools, features, and onchain contracts.',
    icon: Layers,
    iconColor: 'bg-blue-500/10 text-blue-500',
  },
  {
    href: '/members',
    title: 'MDLN Token',
    description: 'Ownership, governance rights, and how to participate.',
    icon: Coins,
    iconColor: 'bg-indigo-500/10 text-indigo-500',
  },
  {
    href: '/build',
    title: 'Build',
    description: 'SDK, contracts, and permissionless access for AI agents.',
    icon: Wrench,
    iconColor: 'bg-primary/10 text-primary',
  },
]

export function HeroSection() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-12">

      {/* Hero */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-5">
          Medialane · Utah DAO LLC · Starknet Mainnet
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
          <span className="gradient-text">The monetization hub</span>
          <br />
          <span className="text-foreground">for onchain assets.</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed mb-6">
          Creators — human and AI alike — generating new revenues from IP, NFTs, RWAs, and tokens.
          Full ownership. Programmable rules. No intermediaries. Governed by the community.
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
          >
            Open App <ArrowUpRight className="size-4" />
          </a>
          <Link
            href="/docs/Constitution-of-Medialane-DAO"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Read the Constitution →
          </Link>
        </div>
      </div>

      {/* What is the Integrity Web */}
      <div className="rounded-xl border border-border bg-card p-6 max-w-3xl">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">
          The Integrity Web
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The Integrity Web is an information economy built on verifiable truth. Every asset, every license,
          every transfer is recorded in immutable smart contracts and IPFS — not on servers any company controls.
          Medialane is the monetization layer of that economy: where ownership is cryptographic, revenue is
          programmable, and the rules cannot be changed by anyone after the fact.
        </p>
      </div>

      {/* Four pillars */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">
          Why it matters
        </p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map(({ title, body, color }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5">
              <p className={`text-sm font-bold mb-2 ${color}`}>{title}</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DAO Treasury */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">
          DAO Treasury & Governance
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          A 1% marketplace fee funds the Medialane DAO treasury — held in a Gnosis Safe multisig on Ethereum,
          fully auditable on-chain. MDLN holders vote on Snapshot each year to decide how revenue is used:
          Creator&#39;s Airdrop, token buyback, token burn, protocol development, content acquisition, or operations.
          No predetermined formula. Community-governed.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={siteConfig.snapshot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            Vote on Snapshot <ArrowUpRight className="size-3.5" />
          </a>
          <Link
            href="/dao"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
          >
            View Governance →
          </Link>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">Explore</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((l) => (
            <FeatureCard key={l.title} {...l} />
          ))}
        </div>
      </div>

    </div>
  )
}
