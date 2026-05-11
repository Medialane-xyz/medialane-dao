'use client'

import Link from 'next/link'
import { ArrowUpRight, Vote, Layers, Coins, Wrench } from 'lucide-react'
import { Stagger, StaggerItem } from '@medialane/ui'
import { siteConfig } from '@/lib/site-config'
import { PageHero } from '@/components/page-hero'
import { FeatureCard } from '@/components/feature-card'
import { SectionHeader } from '@/components/section-header'

const pillars = [
  {
    title: 'Monetize anything',
    body: 'digital assets, NFTs, RWAs, and tokens. Royalties, licensing, and trading with programmable revenue enforced by immutable Cairo smart contracts. Your rules, encoded in code.',
    color: 'text-brand-purple',
  },
  {
    title: 'Own it forever',
    body: 'Minting creates a Berne Convention-compatible copyright record — IPFS content fingerprint plus a Starknet block timestamp. Proof of prior art valid in 181 countries. No registration. No lawyers.',
    color: 'text-brand-blue',
  },
  {
    title: 'Built for all intelligences',
    body: 'Human creators, organizations, and autonomous AI agents are first-class participants. Any intelligence with a cryptographic identifier can register, license, and govern. No KYC. No gatekeeping.',
    color: 'text-brand-purple',
  },
  {
    title: 'Governed by the community',
    body: "A 1% marketplace fee funds the DAO treasury. MDLN holders vote on Snapshot each year: Creator's Airdrop, token buyback, token burn, development, or operations. Community-governed — not predetermined.",
    color: 'text-brand-blue',
  },
]

const quickLinks = [
  {
    href: '/dao',
    title: 'Governance',
    description: 'Proposals, voting, and founding documents.',
    icon: Vote,
    iconColor: 'bg-brand-purple/10 text-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    external: false,
  },
  {
    href: '/explore',
    title: 'Protocol',
    description: 'Monetization tools, features, and onchain contracts.',
    icon: Layers,
    iconColor: 'bg-brand-blue/10 text-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    external: false,
  },
  {
    href: '/members',
    title: 'MDLN Token',
    description: 'Ownership, governance rights, and how to participate.',
    icon: Coins,
    iconColor: 'bg-brand-purple/10 text-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    external: false,
  },
  {
    href: '/build',
    title: 'Build',
    description: 'SDK, contracts, and permissionless access for AI agents.',
    icon: Wrench,
    iconColor: 'bg-brand-orange/10 text-brand-orange',
    gradient: 'from-brand-orange/10 to-transparent',
    buttonColor: 'bg-brand-orange',
    external: false,
  },
]

export function HeroSection() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-14">

      <PageHero
        eyebrow="Medialane ·  · Starknet Mainnet"
        title="The monetization hub"
        titlePlain="for onchain assets."
        description="Creators — human and AI alike — generating new revenues from IP, NFTs, RWAs, and tokens. Full ownership. Programmable rules. No intermediaries. Governed by the community."
      >
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple/90 transition-colors shadow-sm"
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
      </PageHero>

      {/* Integrity Web */}
      <div className="p-[1px] rounded-2xl btn-border-animated max-w-3xl">
        <div className="rounded-[calc(1rem-1px)] bg-card p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
            The Integrity Web
          </p>
          <p className="text-sm text-foreground leading-relaxed">
            The Integrity Web is an information economy built on verifiable truth. Every asset, every license,
            every transfer is recorded in immutable smart contracts and IPFS — not on servers any company controls.
            Medialane is the monetization layer of that economy: where ownership is cryptographic, revenue is
            programmable, and the rules cannot be changed by anyone after the fact.
          </p>
        </div>
      </div>

      {/* Four pillars */}
      <div>
        <SectionHeader label="Why it matters" className="mb-6" />
        <Stagger className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map(({ title, body, color }) => (
            <StaggerItem key={title}>
              <div className="bento-cell p-5 h-full">
                <p className={`text-sm font-bold mb-2 ${color}`}>{title}</p>
                <p className="text-sm text-foreground leading-relaxed">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* DAO Treasury */}
      <div className="bento-cell p-6 sm:p-8">
        <SectionHeader label="DAO Treasury & Governance" className="mb-3" />
        <p className="text-sm text-foreground leading-relaxed mb-5 max-w-2xl">
          A 1% marketplace fee funds the Medialane DAO treasury — held in a Gnosis Safe multisig on Ethereum,
          fully auditable on-chain. MDLN holders vote on Snapshot each year to decide how revenue is used:
          Creator&#39;s Airdrop, token buyback, token burn, protocol development, or operations.
          No predetermined formula. Community-governed.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={siteConfig.snapshot}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple/90 transition-colors"
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
        <SectionHeader label="Explore" className="mb-6" />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((l) => (
            <StaggerItem key={l.title}>
              <FeatureCard {...l} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

    </div>
  )
}
