'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeIn, KineticWords, Stagger, StaggerItem } from '@medialane/ui'
import type { ShowcaseCollection } from '@/lib/showcase'
import { siteConfig } from '@/lib/site-config'
import { SectionHeader } from '@/components/section-header'
import {
  AssetMosaic,
  FeatureBlock,
  EditorialSplit,
  StatBand,
  Callout,
  GraphicSlot,
} from '@/components/elements'

const pillars = [
  {
    eyebrow: 'Monetize',
    title: 'Turn any work into onchain revenue',
    body: 'Digital art, music, writing, NFTs, real-world assets, tokens — register them as programmable assets and earn through royalties, licensing, and trading. The revenue rules are yours, encoded in immutable Cairo smart contracts.',
    tone: 'purple' as const,
    cta: { label: 'Explore the protocol', href: '/explore' },
  },
  {
    eyebrow: 'Own',
    title: 'Proof of ownership that holds up anywhere',
    body: 'Minting writes a Berne Convention-compatible copyright record — an IPFS content fingerprint plus a Starknet timestamp. Proof of authorship valid in 181 countries. No registration, no filings, no lawyers.',
    tone: 'blue' as const,
    cta: { label: 'How ownership works', href: '/explore' },
  },
  {
    eyebrow: 'Participate',
    title: 'Built for every intelligence',
    body: 'Humans, organizations, and autonomous AI agents are first-class participants. Any intelligence with a cryptographic identity can create, license, trade, and govern. No KYC, no gatekeepers, no permission needed.',
    tone: 'orange' as const,
    cta: { label: 'Build on Medialane', href: '/build' },
  },
]

const stats = [
  { value: '21M', label: 'MDLN supply — fixed forever' },
  { value: '0%', label: 'Protocol fees — zero, by design' },
  { value: '181', label: 'Countries — Berne Convention reach' },
  { value: '100%', label: 'Community-owned — no VCs, no team allocation' },
]

export function HeroSection({ collections }: { collections: ShowcaseCollection[] }) {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-16 sm:space-y-20">

      {/* Hero — full-bleed, aurora contained within the rounded section */}
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card px-6 py-16 sm:px-12 sm:py-24">
        <div className="aurora-blob aurora-purple pointer-events-none absolute -top-24 -left-16 h-96 w-96 animate-blob opacity-60" />
        <div className="aurora-blob aurora-blue pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 animate-blob-slow opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-[0.18] pointer-events-none" />
        <FadeIn className="relative z-10 max-w-3xl">
          <div className="pill-badge mb-6 inline-flex">Medialane · Creator Capital Markets</div>
          <h1 className="mb-6 text-5xl font-black leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
            <KineticWords text="Create it. Own it." className="gradient-text block" />
            <span className="block text-foreground">Earn from it.</span>
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Medialane is the open protocol where creators — human and AI alike — turn IP, art,
            real-world assets, and tokens into programmable onchain revenue. Full ownership.
            No intermediaries. Governed by the community.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple/90"
            >
              Open the app <ArrowUpRight className="size-4" />
            </a>
            <Link
              href="/docs/Constitution-of-Medialane-DAO"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the Constitution →
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Real collections — live from the protocol */}
      {collections.length > 0 && (
        <FadeIn>
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
            Created on Medialane
          </p>
          <AssetMosaic items={collections} />
        </FadeIn>
      )}

      {/* The Integrity Web */}
      <FadeIn>
        <EditorialSplit
          eyebrow="The Integrity Web"
          title="An information economy built on verifiable truth"
          body={
            <>
              <p>
                Every asset, every license, every transfer lives in immutable smart contracts and
                IPFS — not on servers any company controls. Ownership is cryptographic. Revenue is
                programmable. The rules cannot be rewritten by anyone after the fact.
              </p>
              <p>Medialane is the monetization layer of that economy.</p>
            </>
          }
          visual={<GraphicSlot label="Integrity Web" ratio="4/3" />}
        />
      </FadeIn>

      {/* Pillars — each its own feature block */}
      <div className="space-y-6">
        <SectionHeader label="What Medialane gives creators" size="lg" />
        <Stagger className="space-y-6">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <FeatureBlock
                eyebrow={p.eyebrow}
                title={p.title}
                body={p.body}
                tone={p.tone}
                cta={p.cta}
                graphic={<GraphicSlot label={p.eyebrow} ratio="4/3" />}
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Stat band */}
      <FadeIn>
        <StatBand stats={stats} />
      </FadeIn>

      {/* Inspiring callout */}
      <FadeIn>
        <Callout>
          Medialane is built so the people who create the value are the people who capture it —
          and so no one can take that away.
        </Callout>
      </FadeIn>

      {/* Creator's Fund & governance */}
      <FadeIn>
        <FeatureBlock
          eyebrow="The Creator's Fund"
          title="Every dollar of revenue comes back to the community"
          body="The marketplace and launchpad protocols are zero-fee — no fee logic is baked into the contracts. Medialane applies a single 1% fee at the platform layer. For year one it flows to the Creator's Fund — a public Starknet multisig — and is airdropped back to participants. From year two, MDLN holders vote on what comes next."
          tone="blue"
          cta={{ label: 'View the Creator’s Fund', href: '/airdrop/fund' }}
          graphic={<GraphicSlot label="Creator's Fund" ratio="4/3" />}
        />
      </FadeIn>

      {/* Closing — explore the DAO */}
      <FadeIn>
        <div className="rounded-3xl border border-border/60 bg-card p-8 sm:p-10">
          <SectionHeader label="Go deeper" size="lg" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: '/dao', title: 'Governance', desc: 'Proposals, voting, and the founding documents.' },
              { href: '/token', title: 'MDLN Token', desc: 'Ownership, governance rights, and how to take part.' },
              { href: '/airdrop', title: "Creator's Airdrop", desc: 'How platform revenue returns to the community.' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group rounded-2xl border border-border/60 p-5 transition-colors hover:border-primary/40"
              >
                <p className="flex items-center justify-between text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {l.title}
                  <ArrowUpRight className="size-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{l.desc}</p>
              </Link>
            ))}
          </div>
          <a
            href={siteConfig.snapshot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            Vote on Snapshot <ArrowUpRight className="size-4" />
          </a>
        </div>
      </FadeIn>

    </div>
  )
}
