# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Medialane DAO is the governance site for the Medialane protocol — a monetization hub for onchain assets (IP, RWAs, NFTs, tokens) built on Starknet. It is a Next.js 16 / React 19 static/SSR informational site. There is no backend, database, or authentication layer.

## Commands

```bash
pnpm dev          # Start dev server at localhost:3000
pnpm build        # Production build (TypeScript errors are ignored — see next.config.mjs)
pnpm lint         # ESLint
pnpm start        # Serve production build
```

There are no tests in this project.

## Architecture

### Route Structure

All public-facing pages live under `app/(site)/` (a route group wrapping every page in `AppShell`):

- `/` — Homepage (hero, pillars, treasury, quick links)
- `/explore` — Protocol features by section (Monetize, Marketplace, Launchpad, Developer, Creator Rights, Starknet)
- `/dao` — Governance: live Snapshot proposals, token stats, founding documents
- `/members` — MDLN token, tokenomics, distribution, bridge/trade links
- `/build` — Developer hub: SDK, AI agent access, Starknet contracts, protocol docs
- `/airdrop` — Creator's Airdrop: governance framing, participation tiers, campaigns
- `/connect` — Get-involved page
- `/docs` — Document index (lists all Markdown docs)
- `/docs/[slug]` — Individual Markdown document viewer

### The AppShell Pattern

Every `(site)` page is wrapped by `AppShell` (`components/app-shell.tsx`), which renders:

1. **`AppSidebar`** — collapsible icon sidebar (shadcn/ui Sidebar primitives). Collapses to icon-only on desktop, opens as sheet on mobile.
2. **`<main>`** — page content
3. **`<footer>`** — site-wide footer with nav links

The sidebar is provided via `SidebarProvider` with `defaultOpen={false}`.

### Shared Page Components

These components are used across all pages for visual consistency:

- `components/page-hero.tsx` — `PageHero` — eyebrow + gradient title + description + optional children (CTA buttons)
- `components/section-header.tsx` — `SectionHeader` — colored accent line + mono uppercase label
- `components/stat-card.tsx` — `StatCard` — metric card with colored top border accent
- `components/feature-card.tsx` — `FeatureCard` — card with optional icon, `StatusBadge`, tags, and link handling (internal/external/none)

When adding new pages, use these components first. Do not duplicate their markup inline.

### Server → Client Split

All data-fetching pages follow the `page.tsx` (server) → `page.client.tsx` (client) pattern:

- `page.tsx` — `async` server component; fetches data, exports `metadata`, renders `<PageClient />`
- `page.client.tsx` — `'use client'` component; receives props, renders UI

Static pages (no data fetching) can be a single `page.tsx` that renders the client component via `dynamic()` import, or simply inline a client component directly.

### Content / Markdown

Markdown content lives in subdirectories of `content/`:

| Directory | Purpose |
|-----------|---------|
| `content/dao/` | DAO founding documents (Constitution, Charter, Guidelines, etc.) |
| `content/protocol/` | Protocol documentation (Getting-Started, IP-Assets, SDK, Marketplace, etc.) |
| `content/` (root) | Legal docs (Terms-of-Use, Privacy-Policy) |

The `/docs/[slug]` route resolves slugs by trying `dao` → `protocol` → root (in that order). `generateStaticParams` covers all three directories.

`lib/markdown.ts` exports `getAllPosts(subdirectory)` and `getPostBySlug(slug, subdirectory)`.

Markdown files must include frontmatter:
```yaml
---
title: Document Title
date: YYYY-MM-DD
author: Optional Author
description: Optional description
---
```

### Live Governance Data

`lib/governance.ts` fetches:
- **Snapshot proposals** via the Snapshot GraphQL API (`getSnapshotProposals`)
- **MDLN holder count** via Etherscan API (`getMdlnStats`)

These are called server-side in `app/(site)/dao/page.tsx`. Both functions return empty/zero defaults on error — no loading states needed.

### Key Config (`lib/site-config.ts`)

Single source of truth for:
- `siteConfig` — name, URL, Snapshot URL, ENS
- `mdln` — MDLN token/vesting/treasury addresses + Etherscan links
- `starknet` — all Starknet contract addresses (marketplace 721/1155, collections, drop factory, POP factory, bridged MDLN) + Starkscan/Voyager links
- `colors` — brand color hex values (used in TypeScript where Tailwind classes can't reach)
- `navSections` — sidebar nav items (source of truth for what pages exist)

### Styling

- **Tailwind v4** with `@tailwindcss/typography` for prose content
- Custom brand tokens in `globals.css` as CSS variables, mapped via `@theme inline`:
  - `ml-blue` (#0000FF), `ml-deep` (#0C0C4F), `ml-orange` (#EC796B), `ml-mauve` (#E175B1)
- `gradient-text` utility class — applies the brand blue gradient to headings
- Fonts: Space Grotesk (sans) and Geist Mono (mono), loaded via `next/font`
- Dark mode default; `next-themes` with `class` strategy

### UI Components

`components/ui/` — shadcn/ui components (Radix UI primitives + Tailwind). Do not hand-edit these; regenerate via shadcn CLI if updates are needed.

`@medialane/ui` — shared component library. Imported where available.

### Key Config Files

- `lib/site-config.ts` — single source of truth for addresses, nav, brand colors
- `next.config.mjs` — TypeScript build errors suppressed (`ignoreBuildErrors: true`); images unoptimized

## Content Principles

No fake data, no mockups, no placeholder stats. Every number on the site must be derivable from on-chain addresses, the SDK, or the Markdown docs. If a stat is uncertain, omit it or show `—`.

Revenue framing: 1% marketplace fee → DAO treasury → MDLN holders vote annually on allocation (Creator's Airdrop, buyback, burn, development, operations). The Creator's Airdrop is one option, not a guaranteed formula. All copy must reflect this.
