# Medialane DAO Revolution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor medialane-dao from a generic DAO token site into an authentic monetization hub narrative — removing dead code, extracting shared components, rewriting all page copy, adding /build and /airdrop pages, and fixing docs routing.

**Architecture:** Sidebar-based AppShell wraps all pages. New shared components (StatCard, SectionHeader, PageHero, FeatureCard) eliminate copy-paste across pages. New pages /build and /airdrop follow the existing server→client component split. No new dependencies.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, shadcn/ui, Framer Motion, gray-matter + remark for Markdown, TypeScript 5.7

---

## File Map

**Delete:**
- `components/three/` (entire directory — 5 files)
- `components/site-nav.tsx`, `components/site-nav/` (entire directory — 4 files)
- `components/cursor.tsx`, `components/sidebar.tsx`, `components/lenis-provider.tsx`
- `components/page-transition.tsx`, `components/theme-toggle.tsx`, `components/site-menu.tsx`
- `hooks/use-mobile.ts` (duplicate of `.tsx`)

**Create:**
- `components/stat-card.tsx`
- `components/section-header.tsx`
- `components/page-hero.tsx`
- `components/feature-card.tsx`
- `app/(site)/build/page.tsx`
- `app/(site)/build/page.client.tsx`
- `app/(site)/airdrop/page.tsx`
- `app/(site)/airdrop/page.client.tsx`

**Modify:**
- `package.json` — name fix, remove 6 deps
- `lib/site-config.ts` — remove cameraTargets, add /build and /airdrop to navSections
- `components/hero-section.tsx` — complete rewrite
- `components/app-shell.tsx` — add /build and /airdrop to footer nav
- `components/app-sidebar.tsx` — add Build and Airdrop nav items
- `app/(site)/explore/page.client.tsx` — copy + shared components
- `app/(site)/dao/page.client.tsx` — copy + shared components
- `app/(site)/members/page.client.tsx` — copy + shared components
- `app/(site)/docs/[slug]/page.tsx` — add protocol subdirectory to search
- `content/protocol/Airdrop.md` — governance clarification at top
- `CLAUDE.md` — full rewrite

---

## Task 1: Dead Code Deletion and Package Cleanup

**Files:**
- Delete: `components/three/`, `components/site-nav.tsx`, `components/site-nav/`, `components/cursor.tsx`, `components/sidebar.tsx`, `components/lenis-provider.tsx`, `components/page-transition.tsx`, `components/theme-toggle.tsx`, `components/site-menu.tsx`, `hooks/use-mobile.ts`
- Modify: `package.json`, `lib/site-config.ts`, `components/hero-section.tsx` (remove inline footer only)

- [ ] **Step 1: Delete orphaned files**

```bash
rm -rf components/three/
rm -f components/site-nav.tsx
rm -rf components/site-nav/
rm -f components/cursor.tsx
rm -f components/sidebar.tsx
rm -f components/lenis-provider.tsx
rm -f components/page-transition.tsx
rm -f components/theme-toggle.tsx
rm -f components/site-menu.tsx
rm -f hooks/use-mobile.ts
```

- [ ] **Step 2: Fix package.json — update name, remove unused dependencies**

Open `package.json`. Make these changes:

```json
{
  "name": "medialane-dao",
  ...
  "dependencies": {
    // Remove these entries entirely:
    // "@react-three/drei": "^10.0.0",
    // "@react-three/fiber": "^9.1.2",
    // "lenis": "^1.3.21",
    // "maath": "^0.10.8",
    // "three": "^0.175.0",
    ...keep all other dependencies...
  },
  "devDependencies": {
    // Remove this entry:
    // "@types/three": "^0.175.0",
    ...keep all other devDependencies...
  }
}
```

- [ ] **Step 3: Remove cameraTargets from site-config.ts**

In `lib/site-config.ts`, delete the entire `cameraTargets` export (lines 93–100):

```typescript
// DELETE this entire block:
/** Camera positions per route for the 3D scene */
export const cameraTargets: Record<string, [number, number, number]> = {
  '/': [0, 0, 8],
  '/explore': [5, 2, 6],
  '/dao': [-4, 3, 7],
  '/members': [0, -2, 5],
  '/connect': [3, -1, 9],
}
```

- [ ] **Step 4: Remove inline footer from hero-section.tsx**

In `components/hero-section.tsx`, delete the `{/* ── Footer ── */}` block (the last section before the closing `</div>`):

```tsx
// DELETE this entire block:
{/* ── Footer ────────────────────────────────────────────────────────── */}
<footer className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border text-[11px] font-mono text-muted-foreground/30">
  <p>© {new Date().getFullYear()} Medialane DAO · Utah DAO LLC</p>
  <div className="flex items-center gap-4">
    <Link href="/docs" className="hover:text-foreground transition-colors">Docs</Link>
    <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Snapshot ↗</a>
    <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">App ↗</a>
  </div>
</footer>
```

- [ ] **Step 5: Reinstall dependencies**

```bash
pnpm install
```

Expected: `node_modules/.pnpm/` no longer contains `three`, `@react-three/fiber`, `@react-three/drei`, `maath`, `lenis`.

- [ ] **Step 6: Verify build**

```bash
pnpm build
```

Expected: Build completes. No errors referencing three.js or deleted components.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove dead code — three.js scene, orphaned components, unused deps"
```

---

## Task 2: Site Config Updates

**Files:**
- Modify: `lib/site-config.ts`

- [ ] **Step 1: Add /build and /airdrop to navSections**

In `lib/site-config.ts`, replace the `navSections` array:

```typescript
export const navSections: NavSection[] = [
  {
    label: 'Start',
    href: '/',
    description: 'Enter Medialane',
  },
  {
    label: 'Explore',
    href: '/explore',
    description: 'Apps, Features & Services',
  },
  {
    label: 'DAO',
    href: '/dao',
    description: 'Foundation & Governance',
  },
  {
    label: 'Members',
    href: '/members',
    description: 'Membership & Token',
  },
  {
    label: 'Build',
    href: '/build',
    description: 'SDK, contracts & AI agents',
  },
  {
    label: 'Airdrop',
    href: '/airdrop',
    description: 'Creator\'s Airdrop',
  },
  {
    label: 'Connect',
    href: '/connect',
    description: 'Get involved',
  },
]
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: No errors in site-config.ts.

- [ ] **Step 3: Commit**

```bash
git add lib/site-config.ts
git commit -m "feat: add /build and /airdrop to navSections"
```

---

## Task 3: StatCard Shared Component

**Files:**
- Create: `components/stat-card.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/stat-card.tsx
interface StatCardProps {
  label: string
  value: string
  sub?: string
  accent?: string
}

export function StatCard({ label, value, sub, accent = 'border-t-primary' }: StatCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 flex flex-col gap-1 border-t-2 ${accent}`}>
      <p className="text-xs text-muted-foreground/60 font-medium">{label}</p>
      <p className="text-2xl font-bold font-mono text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground/50 mt-0.5">{sub}</p>}
    </div>
  )
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/stat-card.tsx
git commit -m "feat: add StatCard shared component"
```

---

## Task 4: SectionHeader and PageHero Shared Components

**Files:**
- Create: `components/section-header.tsx`, `components/page-hero.tsx`

- [ ] **Step 1: Create SectionHeader**

```tsx
// components/section-header.tsx
interface SectionHeaderProps {
  label: string
  color?: string
  bg?: string
}

export function SectionHeader({ label, color = 'text-muted-foreground/40', bg }: SectionHeaderProps) {
  if (bg) {
    return (
      <div className="flex items-center gap-3 mb-4">
        <span className={`block w-6 h-0.5 rounded-full ${bg}`} />
        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] font-bold ${color}`}>{label}</p>
      </div>
    )
  }
  return (
    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${color} mb-4`}>{label}</p>
  )
}
```

- [ ] **Step 2: Create PageHero**

```tsx
// components/page-hero.tsx
interface PageHeroProps {
  eyebrow: string
  title: string
  gradient?: boolean
  description: string
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, gradient = true, description, children }: PageHeroProps) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">{eyebrow}</p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
        {gradient ? <span className="gradient-text">{title}</span> : title}
      </h1>
      <p className="text-base text-muted-foreground max-w-xl mb-4 leading-relaxed">{description}</p>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Verify**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add components/section-header.tsx components/page-hero.tsx
git commit -m "feat: add SectionHeader and PageHero shared components"
```

---

## Task 5: FeatureCard Shared Component

**Files:**
- Create: `components/feature-card.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/feature-card.tsx
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

function StatusBadge({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
      isLive
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
        : isSoon
        ? 'bg-muted text-muted-foreground/50'
        : 'bg-primary/10 text-primary'
    }`}>
      {isLive && <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />}
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
}

export function FeatureCard({
  title,
  description,
  tags,
  href,
  external,
  status,
  icon: Icon,
  iconColor,
}: FeatureCardProps) {
  const card = (
    <div
      className={`group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card h-full transition-all duration-150 ${
        href ? 'hover:border-primary/30 hover:shadow-sm cursor-pointer' : ''
      }`}
    >
      {Icon && (
        <div className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${iconColor ?? 'bg-primary/10 text-primary'}`}>
          <Icon className="size-4" />
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sm font-semibold text-foreground ${href ? 'group-hover:text-primary transition-colors' : ''}`}>
          {title}
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          {status && <StatusBadge status={status} />}
          {href && (
            <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors" />
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground/70 leading-relaxed flex-1">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  if (!href) return <div>{card}</div>
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
  return <Link href={href} className="block">{card}</Link>
}
```

- [ ] **Step 2: Verify**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add components/feature-card.tsx
git commit -m "feat: add FeatureCard shared component with StatusBadge"
```

---

## Task 6: Homepage Rewrite

**Files:**
- Modify: `components/hero-section.tsx` (complete rewrite)

- [ ] **Step 1: Rewrite hero-section.tsx**

Replace the entire file content:

```tsx
// components/hero-section.tsx
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
    body: 'A 1% marketplace fee funds the DAO treasury. MDLN holders vote on Snapshot each year: Creator\'s Airdrop, token buyback, token burn, development, or operations. Community-governed — not predetermined.',
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
          Creator's Airdrop, token buyback, token burn, protocol development, content acquisition, or operations.
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
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. Homepage renders without errors.

- [ ] **Step 3: Commit**

```bash
git add components/hero-section.tsx
git commit -m "feat: rewrite homepage — monetization hub narrative, Integrity Web, correct treasury governance"
```

---

## Task 7: /explore Page Refresh

**Files:**
- Modify: `app/(site)/explore/page.client.tsx`

- [ ] **Step 1: Rewrite the file**

Replace the entire file content:

```tsx
// app/(site)/explore/page.client.tsx
'use client'

import { starknet } from '@/lib/site-config'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { FeatureCard } from '@/components/feature-card'

const features = [
  {
    section: 'Monetize',
    color: 'text-violet-500',
    bg: 'bg-violet-500',
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
    color: 'text-blue-500',
    bg: 'bg-blue-500',
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
    color: 'text-indigo-500',
    bg: 'bg-indigo-500',
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
    color: 'text-primary',
    bg: 'bg-primary',
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
    color: 'text-violet-500',
    bg: 'bg-violet-500',
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
    color: 'text-blue-500',
    bg: 'bg-blue-500',
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
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">
      <PageHero
        eyebrow="Medialane · Protocol"
        title="Protocol"
        description="New revenue tools for creators, collectors, organizations, and autonomous AI. Mint, license, trade, and build capital markets around your work — on Starknet, governed by the community."
      />

      {features.map((section) => (
        <div key={section.section}>
          <SectionHeader label={section.section} color={section.color.replace('text-', 'text-')} bg={section.bg} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. /explore renders with updated copy and shared components.

- [ ] **Step 3: Commit**

```bash
git add app/(site)/explore/page.client.tsx
git commit -m "feat: refactor /explore — monetization framing, shared components, /build links"
```

---

## Task 8: /dao Page Refresh

**Files:**
- Modify: `app/(site)/dao/page.client.tsx`

- [ ] **Step 1: Rewrite the file**

Replace the entire file content:

```tsx
// app/(site)/dao/page.client.tsx
'use client'

import Link from 'next/link'
import { siteConfig, mdln } from '@/lib/site-config'
import type { SnapshotProposal, MdlnStats } from '@/lib/governance'
import { ArrowUpRight, ExternalLink, FileText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { StatCard } from '@/components/stat-card'

function timeLeft(end: number): string | null {
  const diff = end * 1000 - Date.now()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  return days > 0 ? `${days}d left` : `${hours}h left`
}

const stateConfig = {
  active:  { label: 'Active',  dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400', pulse: true  },
  pending: { label: 'Pending', dot: 'bg-amber-500',   text: 'text-amber-600 dark:text-amber-400',     pulse: false },
  closed:  { label: 'Closed',  dot: 'bg-muted-foreground/30', text: 'text-muted-foreground/50',        pulse: false },
}

function ProposalRow({ p }: { p: SnapshotProposal }) {
  const cfg = stateConfig[p.state] ?? stateConfig.closed
  const remaining = p.state === 'active' ? timeLeft(p.end) : null
  return (
    <a
      href={p.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 py-4 border-b border-border/60 last:border-0 hover:bg-muted/30 -mx-5 px-5 transition-colors rounded-lg"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex size-2 shrink-0">
            {cfg.pulse && <span className={`animate-ping absolute inline-flex size-full rounded-full opacity-75 ${cfg.dot}`} />}
            <span className={`relative inline-flex rounded-full size-2 ${cfg.dot}`} />
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase ${cfg.text}`}>{cfg.label}</span>
          {remaining && <span className="text-[10px] text-muted-foreground/40">· {remaining}</span>}
        </div>
        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">{p.title}</p>
        {p.votes > 0 && (
          <p className="mt-1 text-xs text-muted-foreground/50">
            {p.votes.toLocaleString()} vote{p.votes !== 1 ? 's' : ''}
            {p.scores_total > 0 && ` · ${(p.scores_total / 1_000_000).toFixed(2)}M MDLN`}
          </p>
        )}
      </div>
      <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/20 group-hover:text-primary mt-0.5 transition-colors" />
    </a>
  )
}

interface DAOPageClientProps {
  documents: Record<string, { title: string; contentHtml: string }>
  proposals: SnapshotProposal[]
  stats: MdlnStats
}

export default function DAOPageClient({ documents, proposals, stats }: DAOPageClientProps) {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      <PageHero
        eyebrow="Medialane · Utah DAO LLC"
        title="Governance"
        description="Medialane is governed by its community — creators, collectors, builders, and autonomous AI that hold MDLN. Every protocol decision is proposed and voted on-chain. No VCs. No insiders. No company."
      />

      {/* Treasury governance explanation */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">Treasury & Revenue</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          A 1% marketplace fee funds the DAO treasury — held in a Gnosis Safe multisig, fully auditable on Ethereum.
          MDLN holders vote on Snapshot each year to decide allocation: Creator's Airdrop, token buyback, token burn,
          protocol development, content acquisition, or operations. No predetermined formula. The community decides.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total Supply" value="21,000,000" sub="MDLN · Fixed" accent="border-t-violet-500" />
          <StatCard label="Vested" value={`${Math.round(((mdln.totalSupply - 2_100_000) / mdln.totalSupply) * 100)}%`} sub="9-year linear" accent="border-t-blue-500" />
          <StatCard label="Operational" value="10%" sub="2.1M runway" accent="border-t-indigo-500" />
          <StatCard label="Holders" value={stats.holders ? stats.holders.toLocaleString() : '—'} sub="Ethereum mainnet" accent="border-t-primary" />
        </div>
      </div>

      {/* Proposals + sidebar */}
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">Proposals</h2>
            <a
              href={siteConfig.snapshot}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Vote on Snapshot <ArrowUpRight className="size-3" />
            </a>
          </div>
          <div className="px-5 py-3">
            {proposals.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm text-muted-foreground mb-3">No proposals yet.</p>
                <a
                  href={siteConfig.snapshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                >
                  Be the first to propose <ArrowUpRight className="size-3" />
                </a>
              </div>
            ) : proposals.map((p) => <ProposalRow key={p.id} p={p} />)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">On-chain</p>
            {[
              { label: 'MDLN Contract',            href: mdln.etherscanToken    },
              { label: 'Vesting Contract',         href: mdln.etherscanVesting  },
              { label: 'Treasury (Gnosis)',        href: mdln.etherscanTreasury },
              { label: 'Snapshot · medialane.eth', href: siteConfig.snapshot    },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2.5 text-sm text-muted-foreground/70 hover:text-primary transition-colors group border-b border-border/60 last:border-0"
              >
                {l.label}
                <ExternalLink className="size-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">How to vote</p>
            <div className="space-y-3 text-xs text-muted-foreground/70 leading-relaxed">
              {[
                'Get MDLN on Ethereum via Uniswap, or on Starknet via Ekubo.',
                'Connect your wallet to Snapshot at medialane.eth.',
                'Vote on proposals. 1 MDLN = 1 vote. Gasless.',
              ].map((s, i) => (
                <div key={i} className="flex gap-2.5">
                  <span className="font-mono font-bold text-muted-foreground/30 shrink-0">0{i + 1}</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
            <a
              href={siteConfig.snapshot}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Open Snapshot <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Founding Documents */}
      {Object.keys(documents).length > 0 && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">Founding Documents</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(documents).map(([slug, doc]) => (
              <Link
                key={slug}
                href={`/docs/${slug}`}
                className="group flex items-start gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-sm transition-all duration-150"
              >
                <FileText className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">{doc.title}</p>
                  <p className="text-[11px] text-muted-foreground/40 mt-1">Read document →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/(site)/dao/page.client.tsx
git commit -m "feat: rewrite /dao — governance narrative, correct treasury framing, StatCard + PageHero"
```

---

## Task 9: /members Page Refresh

**Files:**
- Modify: `app/(site)/members/page.client.tsx`

- [ ] **Step 1: Rewrite the file**

Replace the entire file content:

```tsx
// app/(site)/members/page.client.tsx
'use client'

import { ArrowUpRight, CheckCircle, Zap, Shield, Coins, Globe } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'
import { AddressRow } from '@/components/address-row'
import { PageHero } from '@/components/page-hero'
import { StatCard } from '@/components/stat-card'
import { SectionHeader } from '@/components/section-header'
import { FeatureCard } from '@/components/feature-card'

const tiers = [
  {
    title: 'Observer',
    requirement: '1+ MDLN',
    description: 'Follow governance and join the community.',
    perks: ['View all proposals', 'Community forums', 'Discussions & feedback'],
    accent: 'border-t-violet-500',
    color: 'text-violet-500',
  },
  {
    title: 'Contributor',
    requirement: '100+ MDLN',
    description: 'Vote on proposals and shape the platform.',
    perks: ['Submit governance proposals', 'Vote on Snapshot', 'Early feature access', 'Contributor channels'],
    featured: true,
    accent: 'border-t-blue-500',
    color: 'text-blue-500',
  },
  {
    title: 'Guardian',
    requirement: '1,000+ MDLN',
    description: 'Lead working groups and represent creators.',
    perks: ['Council nomination rights', 'Working group leadership', 'Ecosystem grants', 'Priority API access'],
    accent: 'border-t-indigo-500',
    color: 'text-indigo-500',
  },
]

const starknetBenefits = [
  { icon: Zap,    iconColor: 'bg-violet-500/10 text-violet-500', title: 'Fraction-of-cent fees',      description: 'Starknet transactions cost a fraction of Ethereum mainnet. Mint, list, and trade IP assets with near-zero gas.' },
  { icon: Shield, iconColor: 'bg-blue-500/10 text-blue-500',     title: 'ZK-STARK security',          description: 'Every transaction batch is verified by STARK proofs on Ethereum. Cryptographic security without trusting a sequencer.' },
  { icon: Coins,  iconColor: 'bg-indigo-500/10 text-indigo-500', title: 'Sponsored transactions',     description: 'Medialane sponsors gas for creator actions via native account abstraction. No ETH required to start creating.' },
  { icon: Globe,  iconColor: 'bg-primary/10 text-primary',        title: 'Native account abstraction', description: 'Wallets are smart contracts. Session keys (SNIP-9) enable PIN-authenticated gasless sessions across multiple actions.' },
]

export default function MembersPageClient() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      <PageHero
        eyebrow="Medialane · Membership"
        title="MDLN Token"
        description="MDLN is the governance and utility token of Medialane DAO. Holding MDLN means owning a vote in how the protocol evolves, how revenue is used, and what the community builds next. Open to humans, organizations, and autonomous AI agents."
      />

      {/* Tokenomics stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Supply" value="21,000,000" sub="MDLN · Fixed forever"   accent="border-t-violet-500" />
        <StatCard label="DAO Treasury" value="100%"        sub="No external investors"  accent="border-t-blue-500"   />
        <StatCard label="Vesting"      value="9 years"     sub="Linear unlock schedule" accent="border-t-indigo-500" />
        <StatCard label="Voting Power" value="1:1"          sub="1 MDLN = 1 vote"        accent="border-t-primary"    />
      </div>

      {/* Distribution + Addresses */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">Token Distribution</p>
          {[
            { label: 'Vesting (9 years)',  value: '18,900,000', pct: '90%', bar: 'w-[90%] bg-violet-500' },
            { label: 'Operational runway', value: '2,100,000',  pct: '10%', bar: 'w-[10%] bg-blue-500'   },
            { label: 'VC allocation',      value: '0',           pct: '0%',  bar: 'w-0'                    },
            { label: 'Team allocation',    value: '0',           pct: '0%',  bar: 'w-0'                    },
          ].map((row) => (
            <div key={row.label} className="py-2.5 border-b border-border/60 last:border-0">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground/70">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-foreground/70">{row.value}</span>
                  <span className="text-[10px] font-mono text-muted-foreground/40 w-8 text-right">{row.pct}</span>
                </div>
              </div>
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${row.bar}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">On-chain Addresses · Ethereum</p>
          <AddressRow label="Network"          value="Ethereum Mainnet" />
          <AddressRow label="Token Contract"   value={`${mdln.token.slice(0, 10)}…${mdln.token.slice(-6)}`}    href={mdln.etherscanToken}    />
          <AddressRow label="Vesting Contract" value={`${mdln.vesting.slice(0, 10)}…${mdln.vesting.slice(-6)}`}  href={mdln.etherscanVesting}  />
          <AddressRow label="DAO Treasury"     value={`${mdln.treasury.slice(0, 10)}…${mdln.treasury.slice(-6)}`} href={mdln.etherscanTreasury} />
          <AddressRow label="Governance"       value="medialane.eth"    href={siteConfig.snapshot}            />
          <AddressRow label="MDLN on Starknet" value={`${starknet.mdlnL2.slice(0, 10)}…${starknet.mdlnL2.slice(-6)}`} href={starknet.voyagerMdln} />
        </div>
      </div>

      {/* Bridge & Trade */}
      <div>
        <SectionHeader label="Bridge & Trade on Starknet" color="text-violet-500" bg="bg-violet-500" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard
            title="Starkgate Bridge"
            description="Bridge MDLN from Ethereum mainnet to Starknet via the official Starkgate bridge. MDLN is live on Starknet — same token, two networks."
            tags={['Ethereum → Starknet', 'Live on Starknet', 'ERC-20']}
            href={`https://starkgate.starknet.io/token/${starknet.mdlnL2}`}
            external
          />
          <FeatureCard
            title="Ekubo Protocol"
            description="Trade MDLN on Starknet via Ekubo — Starknet's native concentrated liquidity AMM. MDLN/ETH and MDLN/USDC pools. Gasless swaps powered by account abstraction."
            tags={['AMM DEX', 'Starknet Native', 'Concentrated Liquidity']}
            href="https://app.ekubo.org"
            external
          />
          <FeatureCard
            title="Zero-fee Tokenization"
            description="Minting IP assets on Medialane costs zero platform fees. Starknet transactions cost a fraction of a cent. Creator economy without extractive fees — 1% only on marketplace monetization."
            tags={['Free to Mint', '1% Marketplace Fee', 'Starknet L2']}
          />
        </div>
      </div>

      {/* Starknet benefits */}
      <div>
        <SectionHeader label="Why Starknet" color="text-blue-500" bg="bg-blue-500" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {starknetBenefits.map((b) => (
            <FeatureCard key={b.title} {...b} />
          ))}
        </div>
      </div>

      {/* Membership tiers */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">Membership Tiers</p>
        <p className="text-xs text-muted-foreground/60 mb-4 max-w-xl">
          Membership is open to individuals, legal entities, DAOs, and autonomous AI agents with cryptographic identifiers. No KYC. No gatekeeping.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.title}
              className={`flex flex-col gap-4 p-5 rounded-xl border bg-card border-t-2 ${tier.accent} ${
                tier.featured ? 'border-primary/20' : 'border-border'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className={`text-sm font-bold ${tier.color}`}>{tier.title}</p>
                  <span className="text-[10px] font-mono text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-full">{tier.requirement}</span>
                </div>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{tier.description}</p>
              </div>
              <div className="h-px bg-border" />
              <ul className="space-y-2">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-xs text-muted-foreground/70">
                    <CheckCircle className="size-3.5 shrink-0 text-primary mt-0.5" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How to participate */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-6">How to Participate</p>
        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          {[
            { step: '01', title: 'Acquire MDLN',   desc: 'Get MDLN on Ethereum via Uniswap, or trade directly on Starknet via Ekubo. Bridge between networks using Starkgate.' },
            { step: '02', title: 'Join Snapshot',  desc: 'Connect to snapshot.org with your wallet holding MDLN to view and vote on proposals. AI agents may participate via delegated smart contracts.' },
            { step: '03', title: 'Propose & Vote', desc: "Submit governance proposals, vote on protocol decisions, and shape how Medialane's treasury is used each year." },
          ].map((s) => (
            <div key={s.step} className="flex gap-3">
              <span className="font-mono text-xs font-bold text-muted-foreground/25 pt-0.5 shrink-0">{s.step}</span>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">{s.title}</p>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-5 border-t border-border">
          <a href={siteConfig.snapshot} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
            Vote on Snapshot <ArrowUpRight className="size-3.5" />
          </a>
          <a href={`https://starkgate.starknet.io/token/${starknet.mdlnL2}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
            Bridge via Starkgate <ArrowUpRight className="size-3.5" />
          </a>
          <a href="https://app.ekubo.org" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
            Trade on Ekubo <ArrowUpRight className="size-3.5" />
          </a>
          <a href={`https://app.uniswap.org/swap?outputCurrency=${mdln.token}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
            Buy on Uniswap <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/(site)/members/page.client.tsx
git commit -m "feat: rewrite /members — ownership/governance framing, AI agent membership, shared components"
```

---

## Task 10: Docs Routing Fix

**Files:**
- Modify: `app/(site)/docs/[slug]/page.tsx`

- [ ] **Step 1: Add protocol subdirectory to the slug route**

Replace the entire file content:

```tsx
// app/(site)/docs/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAllPosts, getPostBySlug } from '@/lib/markdown'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const root     = getAllPosts('')
  const dao      = getAllPosts('dao')
  const protocol = getAllPosts('protocol')
  return [...root, ...dao, ...protocol].map((post) => ({ slug: post.slug }))
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params

  const post =
    (await getPostBySlug(slug, 'dao'))      ??
    (await getPostBySlug(slug, 'protocol')) ??
    (await getPostBySlug(slug, ''))

  if (!post) notFound()

  const { metadata, contentHtml } = post

  return (
    <div className="p-6 max-w-3xl">

      {/* Back */}
      <Link
        href="/docs"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft className="size-3.5" />
        All Docs
      </Link>

      {/* Header */}
      <div className="mb-6 pb-5 border-b border-border">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-2">
          Medialane · Documentation
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-2">{metadata.title}</h1>
        {(metadata.date || metadata.author) && (
          <div className="flex items-center gap-3 text-xs text-muted-foreground/50 font-mono">
            {metadata.date && (
              <time dateTime={metadata.date}>
                {new Date(metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </time>
            )}
            {metadata.author && (
              <>
                <span>·</span>
                <span>{metadata.author}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <article
        className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Verify all docs are reachable**

```bash
pnpm build
```

Expected: Build succeeds. `generateStaticParams` now includes all 14 docs (6 DAO + 8 protocol + 2 legal root).

- [ ] **Step 3: Commit**

```bash
git add "app/(site)/docs/[slug]/page.tsx"
git commit -m "fix: docs routing — add protocol subdirectory so all 14 docs are reachable via /docs/[slug]"
```

---

## Task 11: /build New Page

**Files:**
- Create: `app/(site)/build/page.tsx`, `app/(site)/build/page.client.tsx`

- [ ] **Step 1: Create the server component**

```tsx
// app/(site)/build/page.tsx
import type { Metadata } from 'next'
import BuildPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Build | Medialane DAO',
  description: 'SDK, contracts, and permissionless access for developers and autonomous AI agents.',
}

export default function BuildPage() {
  return <BuildPageClient />
}
```

- [ ] **Step 2: Create the client component**

```tsx
// app/(site)/build/page.client.tsx
'use client'

import { ArrowUpRight, Code, Bot, BookOpen } from 'lucide-react'
import { mdln, starknet } from '@/lib/site-config'
import { AddressRow } from '@/components/address-row'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'

export default function BuildPageClient() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      <PageHero
        eyebrow="Medialane · Developer"
        title="Build"
        description="Permissionless access to the Medialane protocol for developers and autonomous AI agents. TypeScript SDK, Cairo contract ABIs, SNIP-12 typed-data helpers, and all mainnet addresses."
      />

      {/* SDK Quickstart */}
      <div>
        <SectionHeader label="SDK Quickstart" color="text-violet-500" bg="bg-violet-500" />
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-500 shrink-0">
                <Code className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Install</p>
                <p className="text-xs text-muted-foreground/60">Dual ESM + CJS, no extra runtime deps beyond starknet.</p>
              </div>
            </div>
            <pre className="rounded-lg bg-muted px-4 py-3 text-xs font-mono text-foreground overflow-x-auto">
              <code>pnpm add @medialane/sdk</code>
            </pre>
            <pre className="rounded-lg bg-muted px-4 py-3 text-xs font-mono text-foreground overflow-x-auto">
              <code>{`import { MedialaneClient } from '@medialane/sdk'

const client = new MedialaneClient({
  apiUrl: 'https://api.medialane.io',
})`}</code>
            </pre>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold text-foreground mb-3">Fetch active listings</p>
              <pre className="rounded-lg bg-muted px-4 py-3 text-xs font-mono text-foreground overflow-x-auto">
                <code>{`const { data: orders } = await client.api.getOrders({
  status: 'ACTIVE',
  offerItemType: 'ERC721',
  limit: 20,
  page: 1,
})`}</code>
              </pre>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-semibold text-foreground mb-3">Fetch a creator's portfolio</p>
              <pre className="rounded-lg bg-muted px-4 py-3 text-xs font-mono text-foreground overflow-x-auto">
                <code>{`const { data: tokens } = await client.api
  .getTokensByOwner('0x...')

const { data: orders } = await client.api
  .getOrdersByUser('0x...')`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agent Access */}
      <div>
        <SectionHeader label="AI Agent Access" color="text-primary" bg="bg-primary" />
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-start gap-4 mb-5">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
              <Bot className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Permissionless access for all intelligences</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-2xl">
                The Medialane SDK has no KYC, no registration, and no API key required for read access.
                The medialane-portal is being upgraded to work fully onchain, enabling autonomous AI agents to
                interact with the protocol permissionlessly via smart contract calls. Any intelligence with a
                cryptographic identifier is a first-class DAO member per the Constitution — able to register IP,
                license work, trade, and vote.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: 'Onchain portal',    desc: 'Fully onchain interaction — no centralized API dependency required.' },
              { label: 'No KYC',            desc: 'Any wallet address can read, write, and govern. No identity verification.' },
              { label: 'DAO membership',    desc: 'AI agents with cryptographic identifiers participate as full DAO members per the Constitution.' },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-muted/20 p-4">
                <p className="text-xs font-semibold text-foreground mb-1">{item.label}</p>
                <p className="text-xs text-muted-foreground/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contract Addresses */}
      <div>
        <SectionHeader label="Contract Addresses" color="text-blue-500" bg="bg-blue-500" />
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-5">Starknet Mainnet</p>
            <AddressRow label="Marketplace 721 v2"  value={`${starknet.marketplace721.slice(0, 10)}…${starknet.marketplace721.slice(-6)}`}   href={starknet.starkscanMarketplace721}  />
            <AddressRow label="Marketplace 1155 v2" value={`${starknet.marketplace1155.slice(0, 10)}…${starknet.marketplace1155.slice(-6)}`}  href={starknet.starkscanMarketplace1155} />
            <AddressRow label="Drop Factory"        value={`${starknet.dropFactory.slice(0, 10)}…${starknet.dropFactory.slice(-6)}`}           />
            <AddressRow label="POP Factory"         value={`${starknet.popFactory.slice(0, 10)}…${starknet.popFactory.slice(-6)}`}             />
            <AddressRow label="MDLN on Starknet"    value={`${starknet.mdlnL2.slice(0, 10)}…${starknet.mdlnL2.slice(-6)}`}                    href={starknet.voyagerMdln}              />
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-5">Ethereum Mainnet</p>
            <AddressRow label="MDLN Token"   value={`${mdln.token.slice(0, 10)}…${mdln.token.slice(-6)}`}    href={mdln.etherscanToken}    />
            <AddressRow label="Vesting"      value={`${mdln.vesting.slice(0, 10)}…${mdln.vesting.slice(-6)}`}  href={mdln.etherscanVesting}  />
            <AddressRow label="DAO Treasury" value={`${mdln.treasury.slice(0, 10)}…${mdln.treasury.slice(-6)}`} href={mdln.etherscanTreasury} />
          </div>
        </div>
      </div>

      {/* Resources */}
      <div>
        <SectionHeader label="Resources" color="text-indigo-500" bg="bg-indigo-500" />
        <div className="rounded-xl border border-border bg-card divide-y divide-border/60">
          {[
            { label: 'SDK — github.com/medialane-io/medialane-sdk', href: 'https://github.com/medialane-io/medialane-sdk' },
            { label: 'SDK Reference',                                href: '/docs/SDK'                                     },
            { label: 'IP Assets Guide',                              href: '/docs/IP-Assets'                               },
            { label: 'Getting Started',                              href: '/docs/Getting-Started'                          },
            { label: 'Voyager Explorer',                             href: 'https://voyager.online'                        },
            { label: 'Starkscan',                                    href: 'https://starkscan.co'                          },
            { label: 'Snapshot · medialane.eth',                     href: 'https://snapshot.org/#/s:medialane.eth'        },
          ].map((l) => {
            const isExternal = l.href.startsWith('http')
            const inner = (
              <div className="group flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <BookOpen className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors">{l.label}</p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
              </div>
            )
            if (isExternal) {
              return (
                <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{inner}</a>
              )
            }
            return (
              <a key={l.label} href={l.href}>{inner}</a>
            )
          })}
        </div>
      </div>

    </div>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. `/build` route renders.

- [ ] **Step 4: Commit**

```bash
git add "app/(site)/build/"
git commit -m "feat: add /build page — SDK quickstart, AI agent access, contract addresses, resources"
```

---

## Task 12: /airdrop New Page

**Files:**
- Create: `app/(site)/airdrop/page.tsx`, `app/(site)/airdrop/page.client.tsx`

- [ ] **Step 1: Create the server component**

```tsx
// app/(site)/airdrop/page.tsx
import type { Metadata } from 'next'
import AirdropPageClient from './page.client'

export const metadata: Metadata = {
  title: "Creator's Airdrop | Medialane DAO",
  description: "Platform revenue distributed to the community. Governed annually by MDLN holders on Snapshot.",
}

export default function AirdropPage() {
  return <AirdropPageClient />
}
```

- [ ] **Step 2: Create the client component**

```tsx
// app/(site)/airdrop/page.client.tsx
'use client'

import { ArrowUpRight, CheckCircle } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'

const tiers = [
  {
    tier: 'Tier 1',
    label: 'Register',
    share: 'Base share',
    color: 'text-violet-500',
    accent: 'border-t-violet-500',
    steps: [
      'Create your Medialane account',
      'Secure with PIN or passkey',
      'No further action required to qualify for Tier 1',
    ],
  },
  {
    tier: 'Tier 2',
    label: 'Create',
    share: 'Higher share',
    color: 'text-blue-500',
    accent: 'border-t-blue-500',
    steps: [
      'Publish original content (IP assets, collections)',
      'Set up your creator profile',
      'Demonstrate legitimate creative activity',
    ],
  },
  {
    tier: 'Tier 3',
    label: 'Engage',
    share: 'Largest share',
    color: 'text-primary',
    accent: 'border-t-primary',
    steps: [
      'Trade, collect, and make offers',
      "Collaborate and remix other creators' work",
      'Maintain consistent, genuine activity',
    ],
  },
]

export default function AirdropPageClient() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      <PageHero
        eyebrow="Medialane · Community"
        title="Creator's Airdrop"
        description="Platform revenue flows to the Medialane DAO treasury. MDLN holders vote on Snapshot each year to decide how it is used — Creator's Airdrop is one option, alongside token buybacks, burns, development, and operations."
      />

      {/* Governance model */}
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-3">
          DAO-Governed Revenue
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          Medialane charges a 1% marketplace fee. That revenue funds the DAO treasury — not a company, not investors.
          MDLN holders submit proposals and vote on Snapshot each year to decide allocation. The Creator's Airdrop
          distributes a portion of that revenue to creators, collectors, and active participants. Pool size, tier
          weights, and eligibility rules are all community-governed and may change each cycle.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'Revenue source',   value: '1% marketplace fee'                    },
            { label: 'Recipient',        value: '100% to DAO treasury'                  },
            { label: 'Governance',       value: 'MDLN holders vote on Snapshot annually' },
            { label: 'Verification',     value: 'On-chain activity — fully auditable'    },
            { label: 'Cadence',          value: 'Milestone triggers + annual cycles'     },
            { label: 'Allocation',       value: 'Community-governed each year'           },
          ].map((r) => (
            <div key={r.label} className="rounded-lg border border-border bg-muted/20 p-4">
              <p className="text-[10px] font-mono uppercase tracking-[0.12em] text-muted-foreground/40 mb-1">{r.label}</p>
              <p className="text-xs text-foreground font-medium">{r.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Participation tiers */}
      <div>
        <SectionHeader label="Participation Tiers" color="text-muted-foreground/40" />
        <div className="grid sm:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div key={tier.tier} className={`rounded-xl border border-border bg-card p-5 border-t-2 ${tier.accent}`}>
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-bold ${tier.color}`}>{tier.label}</p>
                <span className="text-[10px] font-mono text-muted-foreground/50 bg-muted px-2 py-0.5 rounded-full">{tier.share}</span>
              </div>
              <p className="text-[10px] font-mono text-muted-foreground/30 mb-3">{tier.tier}</p>
              <ul className="space-y-2">
                {tier.steps.map((step) => (
                  <li key={step} className="flex items-start gap-2 text-xs text-muted-foreground/70">
                    <CheckCircle className="size-3.5 shrink-0 text-primary mt-0.5" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Distribution phases */}
      <div>
        <SectionHeader label="Distribution Phases" color="text-muted-foreground/40" />
        <div className="rounded-xl border border-border bg-card divide-y divide-border/60">
          {[
            { phase: 'Phase 1',       trigger: '5,000 participants',  type: 'Milestone' },
            { phase: 'Phase 2',       trigger: '10,000 participants', type: 'Milestone' },
            { phase: 'Annual Cycle',  trigger: 'Each year thereafter', type: 'Ongoing'  },
          ].map((row) => (
            <div key={row.phase} className="grid grid-cols-3 px-5 py-4 text-sm">
              <span className="font-semibold text-foreground">{row.phase}</span>
              <span className="text-muted-foreground/70">{row.trigger}</span>
              <span className="text-muted-foreground/50 text-right">{row.type}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground/50 mt-3 leading-relaxed">
          Phases unlock when the community reaches the participation milestone — not time-gated. Annual cycles
          continue indefinitely as long as the protocol generates revenue and MDLN holders vote to allocate funds to the airdrop.
        </p>
      </div>

      {/* Fair by design */}
      <div>
        <SectionHeader label="Fair by Design" color="text-muted-foreground/40" />
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { title: 'On-chain verifiable',         desc: 'All qualifying activity is recorded on Starknet and auditable by anyone.' },
            { title: 'Automated disqualification',  desc: 'Bot activity, duplicate accounts, and inorganic behavior are automatically excluded.' },
            { title: 'No snapshots to game',        desc: 'Activity is measured across the full cycle, not at a single point in time.' },
            { title: 'Community-governed rules',    desc: 'MDLN holders can adjust criteria each cycle via Snapshot proposals to prevent gaming.' },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-semibold text-foreground mb-1.5">{item.title}</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Campaigns */}
      <div>
        <SectionHeader label="Active Campaigns" color="text-muted-foreground/40" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground mb-1">Global Campaign</p>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">Open to all participants worldwide. Participate at medialane.io.</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground mb-1">Brasil Campaign</p>
            <p className="text-xs text-muted-foreground/70 leading-relaxed">Dedicated campaign for Portuguese-speaking creators in Brazil and the broader Portuguese-speaking community. Same structure, same rules, tracked as a separate cohort.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href="https://medialane.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Participate at medialane.io <ArrowUpRight className="size-3.5" />
        </a>
        <a
          href="https://snapshot.org/#/s:medialane.eth"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
        >
          Govern on Snapshot <ArrowUpRight className="size-3.5" />
        </a>
      </div>

      <p className="text-xs text-muted-foreground/40 leading-relaxed max-w-2xl">
        Creator's Airdrop rules and pool sizes are governed by MDLN holders and may change between cycles.
        All qualifying activity is verified on-chain. Medialane DAO does not guarantee specific airdrop amounts.
        Revenue allocation is determined by annual Snapshot vote — the Creator's Airdrop is one option available to MDLN holders.
      </p>

    </div>
  )
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. `/airdrop` route renders.

- [ ] **Step 4: Commit**

```bash
git add "app/(site)/airdrop/"
git commit -m "feat: add /airdrop page — DAO-governed revenue framing, participation tiers, campaigns"
```

---

## Task 13: Sidebar and Footer Navigation Updates

**Files:**
- Modify: `components/app-sidebar.tsx`, `components/app-shell.tsx`

- [ ] **Step 1: Add Build and Airdrop to app-sidebar TOP_NAV**

In `components/app-sidebar.tsx`, update the imports and `TOP_NAV` array:

```tsx
// Update imports — add Zap and Gift icons:
import {
  LayoutDashboard, Vote, Layers, Coins, BookOpen,
  MessageSquare, Sun, Moon, ArrowUpRight, FileText,
  ChevronRight, Wrench, Gift,
} from "lucide-react"

// Update TOP_NAV array:
const TOP_NAV = [
  { href: "/",        label: "Overview",   icon: LayoutDashboard },
  { href: "/dao",     label: "Governance", icon: Vote            },
  { href: "/explore", label: "Protocol",   icon: Layers          },
  { href: "/members", label: "Token",      icon: Coins           },
  { href: "/build",   label: "Build",      icon: Wrench          },
  { href: "/airdrop", label: "Airdrop",    icon: Gift            },
  { href: "/connect", label: "Connect",    icon: MessageSquare   },
]
```

- [ ] **Step 2: Add Build and Airdrop to app-shell footer nav**

In `components/app-shell.tsx`, update the footer `<nav>`:

```tsx
<nav className="flex items-center gap-4 flex-wrap justify-center text-xs">
  <Link href="/dao"     className="hover:text-foreground transition-colors">Governance</Link>
  <Link href="/explore" className="hover:text-foreground transition-colors">Protocol</Link>
  <Link href="/members" className="hover:text-foreground transition-colors">Token</Link>
  <Link href="/build"   className="hover:text-foreground transition-colors">Build</Link>
  <Link href="/airdrop" className="hover:text-foreground transition-colors">Airdrop</Link>
  <Link href="/docs"    className="hover:text-foreground transition-colors">Docs</Link>
  <Link href="/connect" className="hover:text-foreground transition-colors">Connect</Link>
  <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">App ↗</a>
</nav>
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: Build succeeds. Sidebar and footer render with all nav items.

- [ ] **Step 4: Commit**

```bash
git add components/app-sidebar.tsx components/app-shell.tsx
git commit -m "feat: add Build and Airdrop to sidebar nav and footer"
```

---

## Task 14: Airdrop.md Governance Clarification

**Files:**
- Modify: `content/protocol/Airdrop.md`

- [ ] **Step 1: Add governance clarification at the top of the document**

In `content/protocol/Airdrop.md`, insert a new section immediately after the frontmatter block (after the `---` closing line) and before `# Creator's Airdrop`:

```markdown
> **Governance note:** Revenue allocation is determined by an annual Snapshot vote by MDLN holders. The Creator's Airdrop is one option available to the community — alongside token buybacks, token burns, protocol development, content acquisition, and operational costs. This is not a guaranteed formula; it is community-governed and may change each cycle. See [DAO Governance](/dao) and [Snapshot](https://snapshot.org/#/s:medialane.eth) for current proposals.
```

- [ ] **Step 2: Verify the file parses correctly**

```bash
node -e "const matter = require('gray-matter'); const fs = require('fs'); const r = matter(fs.readFileSync('content/protocol/Airdrop.md', 'utf8')); console.log('title:', r.data.title);"
```

Expected output: `title: Creator's Airdrop`

- [ ] **Step 3: Commit**

```bash
git add content/protocol/Airdrop.md
git commit -m "docs: add governance clarification to Airdrop.md — revenue allocation is annual DAO vote"
```

---

## Task 15: CLAUDE.md Rewrite

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Rewrite CLAUDE.md**

Replace the entire file content:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medialane DAO is a Next.js 16 / React 19 governance and information site for the Medialane protocol — a monetization hub for onchain assets (IP, RWAs, NFTs, tokens) built on Starknet. It is a static/SSR informational site — there is no backend, database, or authentication layer.

## Commands

\`\`\`bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build (TypeScript errors are ignored — see next.config.mjs)
pnpm lint         # ESLint
pnpm start        # Serve production build
\`\`\`

There are no tests in this project.

## Architecture

### Route Structure

All public-facing pages live under `app/(site)/` (a route group wrapping every page in `AppShell`):

- `/` — Homepage
- `/explore` — Protocol features and services
- `/dao` — DAO governance, live Snapshot proposals, founding documents
- `/members` — MDLN token, tokenomics, membership tiers
- `/build` — Developer hub: SDK, contracts, AI agent access
- `/airdrop` — Creator's Airdrop with DAO governance framing
- `/connect` — Contact and community links
- `/docs` — Documentation index (DAO + Protocol + Legal)
- `/docs/[slug]` — Individual Markdown document viewer

### The AppShell Pattern

Every (site) page is wrapped by `AppShell` (`components/app-shell.tsx`), which renders:

1. **`AppSidebar`** — collapsible sidebar (desktop icon-only or expanded, mobile sheet)
2. **`<header>`** — sticky top bar with `SidebarTrigger` and mobile logo link
3. **`<main>`** — page content
4. **`<footer>`** — site-wide footer with nav links

There is no 3D scene. The `components/three/` directory was removed along with all Three.js dependencies.

### Navigation

`components/app-sidebar.tsx` — sidebar with `TOP_NAV` (all 7 routes) and a collapsible Docs sub-menu.

`lib/site-config.ts` — `navSections` array is the single source of truth for nav labels, hrefs, and descriptions. Update here when adding routes.

### Content / Markdown

Documents live in two subdirectories and one root location:

- `content/dao/*.md` — DAO founding documents (Constitution, Charter, Compliance, Community, Terms, Privacy)
- `content/protocol/*.md` — Protocol guides (Getting-Started, IP-Assets, SDK, Marketplace, Launchpad, Contracts, Airdrop)
- `content/*.md` — Legal root docs (Privacy-Policy, Terms-of-Use)

The `/docs/[slug]` route searches all three locations in order: `dao/` → `protocol/` → root.
The `/dao` page server component fetches DAO docs via `getAllPosts('dao')`.
The `/docs` index page calls `getAllPosts('protocol')`, `getAllPosts('dao')`, and `getAllPosts('')` separately.

All Markdown files must include frontmatter:
\`\`\`yaml
---
title: Document Title
date: YYYY-MM-DD
author: Optional Author
description: Optional description
---
\`\`\`

### Shared Components

Custom project components (do not confuse with `components/ui/` — those are shadcn/ui, never hand-edit):

- `StatCard` — metric card with accent top stripe. Props: `label`, `value`, `sub?`, `accent?`
- `SectionHeader` — `[dot-line] SECTION LABEL` pattern. Props: `label`, `color?`, `bg?`
- `PageHero` — standard page opener: eyebrow + gradient h1 + description. Props: `eyebrow`, `title`, `gradient?`, `description`, `children?`
- `FeatureCard` — hover card with optional icon, status badge, tags, external link. Props: `title`, `description`, `tags?`, `href?`, `external?`, `status?`, `icon?`, `iconColor?`
- `GlassCard` — frosted glass card using `ml-glass`/`ml-glass-border` tokens. Accepts `intensity` prop
- `AddressRow` — contract address row with optional external link
- `PageHeader` — legacy page title/description header (prefer `PageHero` for new pages)

### Styling

- **Tailwind v4** with `@tailwindcss/typography` for prose content
- Custom brand tokens in `globals.css` as CSS variables mapped via `@theme inline`:
  - `ml-blue` (#0000FF), `ml-deep` (#0C0C4F), `ml-orange` (#EC796B), `ml-mauve` (#E175B1)
  - `ml-glass` / `ml-glass-border` — used by `GlassCard`
- Brand colors also in `lib/site-config.ts → colors` for TypeScript usage
- Fonts: Space Grotesk (sans) and Geist Mono (mono) via `next/font`
- Dark mode default; `next-themes` with `class` strategy

### Animation

`lib/motion.ts` exports `createContainerVariants` and `createItemVariants` — shared Framer Motion variant factories for staggered entrance animations.

### Key Config Files

- `lib/site-config.ts` — single source of truth for site name/URL, nav sections, brand colors, onchain addresses (MDLN, Starknet contracts)
- `next.config.mjs` — TypeScript build errors suppressed (`ignoreBuildErrors: true`); images unoptimized
```

- [ ] **Step 2: Verify**

```bash
pnpm lint
```

Expected: No lint errors in the project.

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: rewrite CLAUDE.md — current architecture, new pages, shared components, correct content routing"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Section 1 (cleanup + dead code) — Task 1
- ✅ Section 2 (shared components) — Tasks 3, 4, 5
- ✅ Section 3 (homepage rewrite) — Task 6
- ✅ Section 3 (/explore refresh) — Task 7
- ✅ Section 3 (/dao refresh) — Task 8
- ✅ Section 3 (/members refresh) — Task 9
- ✅ Section 3 (Airdrop.md correction) — Task 14
- ✅ Section 4 (/build page) — Task 11
- ✅ Section 4 (/airdrop page) — Task 12
- ✅ Section 4 (nav updates) — Tasks 2, 13
- ✅ Section 5 (docs routing fix) — Task 10
- ✅ Section 5 (CLAUDE.md rewrite) — Task 15
- ✅ Section 5 (/docs index page) — already well-built; no changes needed

**Type consistency:**
- `FeatureCard` props used in Tasks 6, 7, 9, 12 match the definition in Task 5 ✅
- `StatCard` props used in Tasks 8, 9 match the definition in Task 3 ✅
- `PageHero` props used in Tasks 6, 7, 8, 9, 11, 12 match the definition in Task 4 ✅
- `SectionHeader` props used in Tasks 7, 9, 11, 12 match the definition in Task 4 ✅
- `MdlnStats` type in Task 8 comes from `lib/governance` — already imported in the original, unchanged ✅
```
