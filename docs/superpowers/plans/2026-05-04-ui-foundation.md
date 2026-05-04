# UI Foundation Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the medialane-dao visual foundation — brand color tokens, animated gradient borders, aurora blobs, bold typography, mobile-first grids — by wiring `@medialane/ui` primitives and rebuilding the four shared components.

**Architecture:** Wire brand CSS variables + `@theme inline` entries into `globals.css` (Tailwind v4 pattern), then rebuild `StatCard`, `SectionHeader`, `PageHero`, and `FeatureCard` using `@medialane/ui` motion primitives (`FadeIn`, `Stagger`, `StaggerItem`, `KineticWords`, `MotionCard`) and CSS utilities (`bento-cell`, `btn-border-animated`, `pill-badge`, aurora blobs). Finally update all page files to pass the new props.

**Tech Stack:** Next.js 16 / React 19, Tailwind v4, `@medialane/ui` v0.4.3, framer-motion v12

---

## File Map

| File | Action |
|------|--------|
| `app/globals.css` | Add brand CSS vars + `@theme inline` entries, remove duplicate `gradient-text`/`section-label` |
| `components/stat-card.tsx` | Full rebuild — bento-cell, aurora blob, large mono number |
| `components/section-header.tsx` | Full rebuild — two variants: `lg` bold heading, `sm` accent line |
| `components/page-hero.tsx` | Full rebuild — KineticWords, FadeIn, pill-badge eyebrow, aurora bg |
| `components/feature-card.tsx` | Full rebuild — MotionCard, gradient tint, full-width CTA, animated border |
| `components/hero-section.tsx` | Update PageHero usage + new prop shapes |
| `app/(site)/explore/page.client.tsx` | Add gradient/buttonColor to FeatureCards, update SectionHeader |
| `app/(site)/dao/page.client.tsx` | Update StatCard aurora props, SectionHeader size |
| `app/(site)/members/page.client.tsx` | Update StatCard aurora props, SectionHeader size |
| `app/(site)/build/page.client.tsx` | Add gradient/buttonColor to FeatureCards, animated border on install block |
| `app/(site)/airdrop/page.client.tsx` | Update SectionHeader size, animated border on revenue card |

---

## Task 1: Wire brand colors into globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add brand color CSS variables to `:root` block**

In `app/globals.css`, after the `--ml-glass-border` line in `:root`, add:

```css
  /* Brand palette (matches @medialane/ui preset) */
  --brand-blue:   oklch(0.546 0.245 262);
  --brand-navy:   oklch(0.216 0.126 262);
  --brand-rose:   oklch(0.591 0.241 15);
  --brand-purple: oklch(0.558 0.267 301);
  --brand-orange: oklch(0.619 0.216 33);
```

- [ ] **Step 2: Add the same vars to `.dark` block**

After the `--ml-glass-border` line in `.dark`, add the same block — brand colors don't change between themes:

```css
  /* Brand palette */
  --brand-blue:   oklch(0.546 0.245 262);
  --brand-navy:   oklch(0.216 0.126 262);
  --brand-rose:   oklch(0.591 0.241 15);
  --brand-purple: oklch(0.558 0.267 301);
  --brand-orange: oklch(0.619 0.216 33);
```

- [ ] **Step 3: Register brand colors in `@theme inline`**

At the bottom of the `@theme inline` block, after `--color-ml-glass-border`, add:

```css
  --color-brand-blue:   var(--brand-blue);
  --color-brand-navy:   var(--brand-navy);
  --color-brand-rose:   var(--brand-rose);
  --color-brand-purple: var(--brand-purple);
  --color-brand-orange: var(--brand-orange);
```

- [ ] **Step 4: Remove duplicate `gradient-text` and `section-label` from globals.css**

`@medialane/ui/styles` (already imported) defines both. Our overrides change `gradient-text` to use DAO brand colors — keep it. But `section-label` is identical — remove the duplicate from globals.css.

Remove this block from globals.css (after the aurora blob rules):

```css
/* ── Section label ── */
.section-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}
```

Keep `gradient-text` override — DAO uses ml-mauve/ml-blue/ml-orange instead of purple/indigo/blue.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat: wire brand-* color tokens into Tailwind v4 globals"
```

---

## Task 2: Rebuild StatCard

**Files:**
- Modify: `components/stat-card.tsx`

- [ ] **Step 1: Write the new StatCard**

Replace the entire file with:

```tsx
interface StatCardProps {
  label: string
  value: string
  sub?: string
  aurora?: string
  auroraPos?: string
}

export function StatCard({
  label,
  value,
  sub,
  aurora = 'aurora-purple',
  auroraPos = '-bottom-6 -right-6',
}: StatCardProps) {
  return (
    <div className="bento-cell p-5 sm:p-6 relative overflow-hidden">
      <div
        className={`absolute ${auroraPos} w-28 h-28 ${aurora} animate-blob pointer-events-none`}
      />
      <p className="text-xs text-muted-foreground font-medium mb-3 relative z-10">{label}</p>
      <p className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-foreground leading-none relative z-10">
        {value}
      </p>
      {sub && (
        <p className="text-xs text-muted-foreground/60 mt-2 relative z-10">{sub}</p>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify the file looks correct**

```bash
cat components/stat-card.tsx
```

Expected: 26 lines, no imports needed (aurora/animate-blob are CSS classes from medialane.css).

- [ ] **Step 3: Commit**

```bash
git add components/stat-card.tsx
git commit -m "feat: rebuild StatCard — bento-cell, aurora blob, large mono number"
```

---

## Task 3: Rebuild SectionHeader

**Files:**
- Modify: `components/section-header.tsx`

- [ ] **Step 1: Write the new SectionHeader**

Replace the entire file with:

```tsx
interface SectionHeaderProps {
  label: string
  size?: 'lg' | 'sm'
  color?: string
  bg?: string
  className?: string
}

export function SectionHeader({
  label,
  size = 'sm',
  color,
  bg,
  className = '',
}: SectionHeaderProps) {
  if (size === 'lg') {
    return (
      <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6 ${className}`}>
        {label}
      </h2>
    )
  }

  if (bg) {
    return (
      <div className={`flex items-center gap-3 mb-5 ${className}`}>
        <span className={`block w-6 h-0.5 rounded-full ${bg} shrink-0`} />
        <p className={`text-xs font-bold uppercase tracking-widest ${color ?? 'text-muted-foreground'}`}>
          {label}
        </p>
      </div>
    )
  }

  return (
    <p className={`text-xs font-bold uppercase tracking-widest ${color ?? 'text-muted-foreground/60'} mb-5 ${className}`}>
      {label}
    </p>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/section-header.tsx
git commit -m "feat: rebuild SectionHeader — lg bold heading + sm accent-line variants"
```

---

## Task 4: Rebuild PageHero

**Files:**
- Modify: `components/page-hero.tsx`

- [ ] **Step 1: Write the new PageHero**

Replace the entire file with:

```tsx
'use client'

import { FadeIn, KineticWords } from '@medialane/ui'

interface PageHeroProps {
  eyebrow: string
  title: string
  titlePlain?: string
  gradient?: boolean
  description: string
  children?: React.ReactNode
}

export function PageHero({
  eyebrow,
  title,
  titlePlain,
  gradient = true,
  description,
  children,
}: PageHeroProps) {
  return (
    <div className="relative overflow-hidden pb-2">
      {/* Aurora blobs */}
      <div className="aurora-blob aurora-purple w-80 h-80 -top-16 -left-16 animate-blob pointer-events-none opacity-60" />
      <div className="aurora-blob aurora-blue w-64 h-64 -bottom-8 right-0 animate-blob-slow pointer-events-none opacity-40" />

      {/* Subtle grid texture */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <FadeIn className="relative z-10">
        {/* Eyebrow */}
        <div className="pill-badge inline-flex mb-5">{eyebrow}</div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] mb-5">
          {gradient ? (
            <KineticWords text={title} className="gradient-text block" />
          ) : (
            <span className="text-foreground">{title}</span>
          )}
          {titlePlain && (
            <span className="text-foreground block">{titlePlain}</span>
          )}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-6">
          {description}
        </p>

        {children}
      </FadeIn>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/page-hero.tsx
git commit -m "feat: rebuild PageHero — KineticWords, FadeIn, pill-badge, aurora bg"
```

---

## Task 5: Rebuild FeatureCard

**Files:**
- Modify: `components/feature-card.tsx`

- [ ] **Step 1: Write the new FeatureCard**

Replace the entire file with:

```tsx
'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MotionCard } from '@medialane/ui'
import { cn } from '@/lib/utils'

function StatusBadge({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase',
        isLive
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
          : isSoon
          ? 'bg-muted text-muted-foreground/40'
          : 'bg-primary/10 text-primary'
      )}
    >
      {isLive && <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />}
      {status}
    </span>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  tags?: string[]
  href?: string | null
  external?: boolean
  status?: string
  icon?: React.ElementType
  iconColor?: string
  gradient?: string
  buttonColor?: string
  featured?: boolean
}

function CardInner({
  title,
  description,
  tags,
  href,
  external,
  status,
  icon: Icon,
  iconColor,
  gradient,
  buttonColor,
}: Omit<FeatureCardProps, 'featured'>) {
  const hasLink = !!href

  return (
    <MotionCard
      className={cn(
        'bento-cell flex flex-col gap-4 p-6 h-full relative overflow-hidden',
        'transition-all duration-200',
        hasLink && 'hover:border-border/80',
        gradient && `bg-gradient-to-br ${gradient}`
      )}
    >
      {/* Gradient hover overlay */}
      {gradient && (
        <div className={`absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-br ${gradient}`} />
      )}

      <div className="relative z-10 flex flex-col gap-4 flex-1">
        {/* Icon */}
        {Icon && (
          <div
            className={cn(
              'flex size-11 items-center justify-center rounded-2xl shrink-0 shadow-sm',
              iconColor ?? 'bg-primary/10 text-primary'
            )}
          >
            <Icon className="size-5" />
          </div>
        )}

        {/* Title + status */}
        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-xl font-bold text-foreground leading-snug', hasLink && 'group-hover:text-primary transition-colors')}>
            {title}
          </p>
          {status && <StatusBadge status={status} />}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full bg-background/50 border border-border/50 text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA button */}
        {hasLink && (
          <div className="mt-auto pt-2">
            {external ? (
              <a
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center justify-between w-full h-10 px-4 rounded-xl',
                  'text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
                  buttonColor
                    ? `${buttonColor} text-white`
                    : 'border border-border hover:border-primary/40 text-foreground'
                )}
              >
                Open <ArrowRight className="size-3.5" />
              </a>
            ) : (
              <Link
                href={href!}
                className={cn(
                  'flex items-center justify-between w-full h-10 px-4 rounded-xl',
                  'text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
                  buttonColor
                    ? `${buttonColor} text-white`
                    : 'border border-border hover:border-primary/40 text-foreground'
                )}
              >
                Explore <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </MotionCard>
  )
}

export function FeatureCard({ featured, ...props }: FeatureCardProps) {
  if (featured) {
    return (
      <div className="p-[1px] rounded-2xl btn-border-animated h-full">
        <div className="rounded-[calc(1rem-1px)] bg-card h-full">
          <CardInner {...props} />
        </div>
      </div>
    )
  }
  return <CardInner {...props} />
}
```

- [ ] **Step 2: Commit**

```bash
git add components/feature-card.tsx
git commit -m "feat: rebuild FeatureCard — MotionCard, gradient tint, full-width CTA, animated border"
```

---

## Task 6: Update hero-section.tsx

**Files:**
- Modify: `components/hero-section.tsx`

- [ ] **Step 1: Update PageHero usage and pillar/quicklink sections**

The homepage uses `PageHero` and inline `FeatureCard`. Update to use `titlePlain`, larger body text, and `Stagger`/`StaggerItem` on card grids.

Replace the entire file with:

```tsx
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
    body: 'IP assets, NFTs, RWAs, and tokens. Royalties, licensing, and trading with programmable revenue enforced by immutable Cairo smart contracts. Your rules, encoded in code.',
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

      {/* Hero */}
      <PageHero
        eyebrow="Medialane · Utah DAO LLC · Starknet Mainnet"
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
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
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
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* DAO Treasury */}
      <div className="bento-cell p-6 sm:p-8">
        <SectionHeader label="DAO Treasury & Governance" className="mb-3" />
        <p className="text-base text-muted-foreground leading-relaxed mb-5 max-w-2xl">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/hero-section.tsx
git commit -m "feat: update HeroSection — brand colors, Stagger grids, animated border, PageHero titlePlain"
```

---

## Task 7: Update /explore page

**Files:**
- Modify: `app/(site)/explore/page.client.tsx`

- [ ] **Step 1: Add gradient/buttonColor props to each FeatureCard section and update SectionHeader**

Replace the entire file with:

```tsx
'use client'

import { starknet } from '@/lib/site-config'
import { Stagger, StaggerItem } from '@medialane/ui'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { FeatureCard } from '@/components/feature-card'

const features = [
  {
    section: 'Monetize',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    items: [
      {
        title: 'Mint IP Asset',
        status: 'Live',
        href: 'https://medialane.io/create/asset',
        external: true,
        description: 'Register any creative work as a programmable NFT. 12 IP types. Gasless. Metadata anchored on IPFS — permanent and censorship-resistant.',
        tags: ['ERC-721', 'IPFS', 'Berne Convention'],
      },
      {
        title: 'Create Collection',
        status: 'Live',
        href: 'https://medialane.io/create/collection',
        external: true,
        description: 'Deploy branded ERC-721 collections on Starknet. Factory pattern via Cairo smart contract. Metadata on IPFS, resolvable by any dApp forever.',
        tags: ['ERC-721', 'Cairo', 'Factory Pattern'],
      },
      {
        title: 'Remix & License',
        status: 'Live',
        href: 'https://medialane.io/create/remix',
        external: true,
        description: 'Create licensed derivatives. CC0/CC BY assets auto-approve. Custom terms: price, scope, rights, AI policy. Attribution chain recorded on-chain forever.',
        tags: ['Creative Commons', 'Attribution', 'Remix Graph'],
      },
    ],
  },
  {
    section: 'Marketplace',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    items: [
      {
        title: 'Browse & Discover',
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        external: true,
        description: 'Full marketplace with search, currency filters, dynamic asset themes. Floor price, volume, holder stats. USDC, USDT, ETH, STRK, WBTC.',
        tags: ['USDC', 'ETH', 'STRK', 'WBTC'],
      },
      {
        title: 'Buy & Make Offers',
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        external: true,
        description: 'Buy directly or make offers. Batch cart checkout — multiple items in one PIN-authenticated session key transaction. Royalties enforced by contract.',
        tags: ['Gasless', 'Session Keys', 'SNIP-9'],
      },
      {
        title: 'Creator Profiles',
        status: 'Live',
        href: 'https://medialane.io/creators',
        external: true,
        description: 'Dedicated pages with portfolio, collection stats, activity timelines. Token-gated content for MDLN and NFT holders.',
        tags: ['Token Gating', 'Profiles'],
      },
    ],
  },
  {
    section: 'Launchpad',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple',
    gradient: 'from-brand-purple/15 to-transparent',
    buttonColor: 'bg-brand-purple',
    items: [
      {
        title: 'Collection Drop',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        external: true,
        description: 'Timed ERC-721 releases with configurable supply, mint window, price, per-wallet limit, and allowlists. Contract enforces every rule — no centralized mint server.',
        tags: ['Allowlist', 'Supply Cap', 'Timed'],
      },
      {
        title: 'ERC-1155 Edition',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        external: true,
        description: 'Multi-copy editions for music, publications, and prints. One contract, multiple token IDs and quantities. Partial listing support.',
        tags: ['ERC-1155', 'Editions', 'Multi-copy'],
      },
      {
        title: 'POP Protocol',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        external: true,
        description: 'Soulbound proof-of-participation credentials for events, bootcamps, hackathons, DAO membership. Gas-free. Self-sovereign — cannot be taken away.',
        tags: ['Soulbound', 'Non-transferable', 'Credentials'],
      },
    ],
  },
  {
    section: 'Developer',
    color: 'text-brand-orange',
    bg: 'bg-brand-orange',
    gradient: 'from-brand-orange/10 to-transparent',
    buttonColor: 'bg-brand-orange',
    items: [
      {
        title: 'Medialane SDK',
        status: 'v0.6.4',
        href: '/build',
        external: false,
        description: 'TypeScript SDK. Full on-chain and REST API coverage. Dual ESM + CJS. Berne Convention-aligned IP metadata schema. Framework-agnostic.',
        tags: ['TypeScript', 'ESM', 'Open Source'],
      },
      {
        title: 'Protocol v2',
        status: 'Audited',
        href: `https://starkscan.co/contract/${starknet.marketplace721}`,
        external: true,
        description: 'Audited ERC-721 and ERC-1155 marketplace contracts on Starknet. CEI pattern, front-running protection, SNIP-12 typed-data orders. Non-upgradeable by design.',
        tags: ['Cairo', 'ERC-721', 'ERC-1155'],
      },
      {
        title: 'ZK Infrastructure',
        status: 'Core',
        href: '/build',
        external: false,
        description: 'STARK proofs secure every transaction. STWO prover for faster finality. Recursive proofs for unlimited scale. Ethereum-level security at a fraction of cost.',
        tags: ['STARK', 'STWO Prover', 'ZK-Rollup'],
      },
    ],
  },
  {
    section: 'Creator Rights',
    color: 'text-brand-rose',
    bg: 'bg-brand-rose',
    gradient: 'from-brand-rose/10 to-transparent',
    buttonColor: 'bg-brand-rose',
    items: [
      {
        title: 'Born Protected',
        status: 'Core',
        href: null,
        external: false,
        description: 'Minting timestamps your work under the Berne Convention — instant copyright proof in 181 countries. No registration fees, no WIPO filings, no lawyers. Protected the moment it exists.',
        tags: ['181 Countries', 'Automatic', 'No Lawyers'],
      },
      {
        title: 'Programmable Revenue',
        status: 'Live',
        href: 'https://medialane.io/create/asset',
        external: true,
        description: 'Royalties, licensing terms, and revenue splits encoded in Cairo smart contracts. 9 Creative Commons variants + custom terms — commercial use, AI policy, derivative rights, geographic scope.',
        tags: ['Royalties', 'CC0', 'CC BY', 'AI Policy'],
      },
      {
        title: 'Immutable Attribution',
        status: 'Core',
        href: null,
        external: false,
        description: 'Every record lives on Starknet and IPFS — not on Medialane servers. Remix graph traces creative lineage back to the original source. Cannot be altered, delisted, or censored by anyone.',
        tags: ['IPFS', 'Remix Graph', 'Censorship-proof'],
      },
    ],
  },
  {
    section: 'Starknet Infrastructure',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    items: [
      {
        title: 'Native Account Abstraction',
        status: 'Core',
        href: null,
        external: false,
        description: 'Wallets are smart contracts on Starknet. Session keys (SNIP-9) enable PIN-authenticated gasless sessions — mint, list, and trade multiple items without re-signing each action.',
        tags: ['SNIP-9', 'Session Keys', 'Gasless'],
      },
      {
        title: 'STWO Prover & ZK-STARK',
        status: 'Core',
        href: null,
        external: false,
        description: "Cairo's next-generation STARK prover. Recursive proofs verify other proofs — unlimited scale while maintaining full cryptographic integrity. Ethereum-level finality.",
        tags: ['STWO', 'Recursive Proofs', 'ZK-STARK'],
      },
      {
        title: 'Sponsored Transactions',
        status: 'Core',
        href: null,
        external: false,
        description: 'Medialane sponsors gas fees for creator actions via Starknet paymaster. No ETH required. Zero-fee IP tokenization — creators keep 100% of what they earn.',
        tags: ['Paymaster', 'Zero Gas', 'Creator First'],
      },
    ],
  },
]

export default function ExplorePageClient() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-12">
      <PageHero
        eyebrow="Medialane · Protocol"
        title="Protocol"
        description="New revenue tools for creators, collectors, organizations, and autonomous AI. Mint, license, trade, and build capital markets around your work — on Starknet, governed by the community."
      />

      {features.map((section) => (
        <div key={section.section}>
          <SectionHeader label={section.section} color={section.color} bg={section.bg} />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  {...item}
                  gradient={section.gradient}
                  buttonColor={section.buttonColor}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add "app/(site)/explore/page.client.tsx"
git commit -m "feat: update /explore — brand colors, Stagger grids, FeatureCard gradient/CTA"
```

---

## Task 8: Update /dao, /members, /build, /airdrop pages

**Files:**
- Modify: `app/(site)/dao/page.client.tsx`
- Modify: `app/(site)/members/page.client.tsx`
- Modify: `app/(site)/build/page.client.tsx`
- Modify: `app/(site)/airdrop/page.client.tsx`

- [ ] **Step 1: Update /dao — StatCard aurora props + SectionHeader**

In `app/(site)/dao/page.client.tsx`:

1. Change the 4 `StatCard` calls — replace `accent="border-t-*"` with `aurora` prop:

```tsx
<StatCard label="Total Supply" value="21,000,000" sub="MDLN · Fixed forever" aurora="aurora-purple" />
<StatCard
  label="Vested"
  value={`${Math.round((stats.vestingLocked / mdln.totalSupply) * 100)}%`}
  sub="9-year linear vesting"
  aurora="aurora-blue"
/>
<StatCard label="Operational" value="10%" sub="2.1M · protocol runway" aurora="aurora-purple" auroraPos="-bottom-6 -left-6" />
<StatCard
  label="Holders"
  value={stats.holders ? stats.holders.toLocaleString() : '—'}
  sub="Ethereum mainnet"
  aurora="aurora-blue"
  auroraPos="-top-6 -right-6"
/>
```

2. Add `Stagger` + `StaggerItem` import from `@medialane/ui` and wrap the stat grid:

```tsx
import { Stagger, StaggerItem } from '@medialane/ui'

// stat grid:
<Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <StaggerItem><StatCard label="Total Supply" value="21,000,000" sub="MDLN · Fixed forever" aurora="aurora-purple" /></StaggerItem>
  <StaggerItem><StatCard label="Vested" value={`${Math.round((stats.vestingLocked / mdln.totalSupply) * 100)}%`} sub="9-year linear vesting" aurora="aurora-blue" /></StaggerItem>
  <StaggerItem><StatCard label="Operational" value="10%" sub="2.1M · protocol runway" aurora="aurora-purple" auroraPos="-bottom-6 -left-6" /></StaggerItem>
  <StaggerItem><StatCard label="Holders" value={stats.holders ? stats.holders.toLocaleString() : '—'} sub="Ethereum mainnet" aurora="aurora-blue" auroraPos="-top-6 -right-6" /></StaggerItem>
</Stagger>
```

3. Wrap the Integrity Web / treasury card in animated border:

```tsx
{/* How Revenue Works — wrap in animated gradient border */}
<div className="p-[1px] rounded-2xl btn-border-animated max-w-3xl">
  <div className="rounded-[calc(1rem-1px)] bg-card p-6">
    <SectionHeader label="Treasury & Revenue" />
    <p className="text-sm text-muted-foreground leading-relaxed">...</p>
  </div>
</div>
```

4. Update page padding: `px-6 lg:px-10 xl:px-14 py-8` → `px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16`

- [ ] **Step 2: Update /members — StatCard aurora props + Stagger + page padding**

In `app/(site)/members/page.client.tsx`:

1. Replace stat grid with:

```tsx
<Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <StaggerItem><StatCard label="Total Supply" value="21,000,000" sub="MDLN · Fixed forever" aurora="aurora-purple" /></StaggerItem>
  <StaggerItem><StatCard label="DAO Treasury" value="100%" sub="No external investors" aurora="aurora-blue" /></StaggerItem>
  <StaggerItem><StatCard label="Vesting" value="9 years" sub="Linear unlock schedule" aurora="aurora-purple" auroraPos="-bottom-6 -left-6" /></StaggerItem>
  <StaggerItem><StatCard label="Voting Power" value="1:1" sub="1 MDLN = 1 vote" aurora="aurora-orange" /></StaggerItem>
</Stagger>
```

2. Add `import { Stagger, StaggerItem } from '@medialane/ui'`

3. Update page padding to `px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16`

- [ ] **Step 3: Update /build — FeatureCard gradient/buttonColor + animated border on install block + Stagger**

In `app/(site)/build/page.client.tsx`:

1. Add `import { Stagger, StaggerItem } from '@medialane/ui'`

2. Update `sdkCapabilities` to add gradient + buttonColor. Keep all existing `description` values exactly as they are in the current file — only change `iconColor`, `gradient`, and `buttonColor`:

```tsx
const sdkCapabilities = [
  {
    title: 'API Client',
    status: 'v0.6.4',
    icon: Code2,
    iconColor: 'bg-brand-purple/10 text-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    description: 'Full REST API coverage — orders, tokens, collections, activity feeds, and user portfolios. TypeScript-first with inferred return types.',
    tags: ['TypeScript', 'ESM + CJS', 'No runtime deps'],
    href: '/docs/SDK',
    external: false,
  },
  {
    title: 'SNIP-12 Typed Data',
    status: 'Live',
    icon: FileCode2,
    iconColor: 'bg-brand-blue/10 text-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    description: 'Order signing helpers for ERC-721 and ERC-1155 marketplaces. Build, sign, and submit listings and offers without manual ABI encoding.',
    tags: ['SNIP-12', 'ERC-721', 'ERC-1155'],
    href: '/docs/SDK',
    external: false,
  },
  {
    title: 'Contract ABIs & Addresses',
    status: 'Audited',
    icon: Boxes,
    iconColor: 'bg-brand-purple/10 text-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    description: 'All mainnet contract addresses and Cairo ABIs exported directly from the SDK. No copy-pasting hex strings from block explorers.',
    tags: ['Cairo', 'Starknet Mainnet', 'Non-upgradeable'],
    href: '/docs/Contracts',
    external: false,
  },
  {
    title: 'IP Metadata Schema',
    status: 'Live',
    icon: Shield,
    iconColor: 'bg-brand-orange/10 text-brand-orange',
    gradient: 'from-brand-orange/10 to-transparent',
    buttonColor: 'bg-brand-orange',
    description: 'Berne Convention-aligned TypeScript types for IP assets. 12 IP categories, 9 Creative Commons variants, AI training policy fields.',
    tags: ['Berne Convention', 'CC0/CC BY', 'AI Policy'],
    href: '/docs/IP-Assets',
    external: false,
  },
]
```

3. Wrap the install code block in animated border:

```tsx
<div className="p-[1px] rounded-2xl btn-border-animated max-w-2xl">
  <div className="rounded-[calc(1rem-1px)] bg-card p-6">
    <SectionHeader label="Install" />
    <pre>...</pre>
    <pre>...</pre>
  </div>
</div>
```

4. Wrap SDK grid in `<Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">` + `<StaggerItem>` per card.

5. Update page padding.

- [ ] **Step 4: Update /airdrop — animated border on revenue card + Stagger + padding**

In `app/(site)/airdrop/page.client.tsx`:

1. Add `import { Stagger, StaggerItem } from '@medialane/ui'`

2. Wrap the "How Revenue Works" card in animated border:

```tsx
<div className="p-[1px] rounded-2xl btn-border-animated max-w-3xl">
  <div className="rounded-[calc(1rem-1px)] bg-card p-6">
    <SectionHeader label="How Revenue Works" />
    <p>...</p>
    <div className="grid sm:grid-cols-3 gap-3">...</div>
  </div>
</div>
```

3. Wrap the tiers grid in `<Stagger className="grid sm:grid-cols-3 gap-4">` + `<StaggerItem>` per card.

4. Update page padding.

- [ ] **Step 5: Commit all four page updates**

```bash
git add "app/(site)/dao/page.client.tsx" "app/(site)/members/page.client.tsx" "app/(site)/build/page.client.tsx" "app/(site)/airdrop/page.client.tsx"
git commit -m "feat: update all pages — aurora StatCards, Stagger grids, animated borders, mobile padding"
```

---

## Task 9: Push to production

- [ ] **Step 1: Verify dev server starts without errors**

```bash
bun dev
```

Expected: server starts at localhost:3000, no TypeScript errors in terminal.

- [ ] **Step 2: Check all routes visually**

Open browser and verify: `/`, `/explore`, `/dao`, `/members`, `/build`, `/airdrop`. Look for: hero animations, aurora blobs, animated gradient borders, large stat numbers, colored CTA buttons on cards, pill-badge eyebrows.

- [ ] **Step 3: Push**

```bash
git push origin main
```
