# Medialane DAO — Revolution Design Spec
**Date:** 2026-05-04
**Status:** Approved

---

## Context & Goals

Medialane DAO is a Next.js 16 / React 19 governance and information site for the Medialane protocol — a live, production-grade monetization hub for onchain assets (IP, RWAs, NFTs, tokens) built on Starknet.

**Primary audience:** MDLN investors / holders and protocol builders (developers + autonomous AI agents).
**Secondary audience:** Creators evaluating the platform — they are served first by medialane.io (the app).

**The problem with the current site:**
- Leads with token supply numbers and governance stats — the typical DAO playbook, not Medialane's story
- The Integrity Web concept is in the tagline and explained nowhere
- AI agents as first-class participants are absent from the narrative
- Revenue/treasury governance is misrepresented — the site implies Creator's Airdrop is the permanent destination for all revenue, when in reality MDLN holders vote each year on allocation via Snapshot
- Massive dead code from a removed 3D scene and previous navigation system
- Shared UI patterns are copy-pasted across pages instead of extracted as components

**The correct narrative:** Medialane is the monetization hub for onchain assets. Creators — human and AI alike — generate new revenue streams from IP, NFTs, RWAs, and tokens with full ownership encoded in immutable Cairo smart contracts. The DAO treasury, funded by a 1% marketplace fee, is governed entirely by MDLN holders who vote each year on how it is used: Creator's Airdrop, token buyback, token burn, development, content acquisition, or operations. Everything is public. No VCs. No insiders. No gatekeepers.

---

## Section 1 — Cleanup & Dead Code Removal

### Files to delete
- `components/three/` — entire directory (scene.tsx, scene-canvas.tsx, scene-controller.tsx, media-lanes.tsx, integrity-web.tsx) — 3D scene was removed from AppShell but code was never cleaned up
- `components/site-nav.tsx` + `components/site-nav/` directory (DesktopNav.tsx, MobileBar.tsx, MobileDrawer.tsx, TopNav.tsx) — replaced by sidebar, fully orphaned
- `components/cursor.tsx` — orphaned
- `components/sidebar.tsx` — superseded by `components/ui/sidebar.tsx`
- `components/lenis-provider.tsx` — orphaned
- `components/page-transition.tsx` — orphaned
- `components/theme-toggle.tsx` — orphaned
- `components/site-menu.tsx` — orphaned
- `hooks/use-mobile.ts` — duplicate of `hooks/use-mobile.tsx`; delete the `.ts` version

### Dependencies to remove from package.json
`three`, `@react-three/fiber`, `@react-three/drei`, `maath`, `@types/three`, `lenis` — approximately 3MB off the client bundle.

### Config fixes
- `package.json` name: `"my-project"` → `"medialane-dao"`
- `lib/site-config.ts`: remove `cameraTargets` export (no consumers remain)
- `app/(site)/page.tsx` — remove the inline `<footer>` from `hero-section.tsx` (AppShell already renders a site-wide footer; the homepage currently has two)

---

## Section 2 — Shared Component Kit

Extract repeated patterns into reusable components. No visual change — purely structural. All new pages use these from day one.

### `components/stat-card.tsx`
Props: `label`, `value`, `sub?`, `accent?`
Currently copy-pasted in: `hero-section.tsx`, `dao/page.client.tsx`, `members/page.client.tsx`

### `components/section-header.tsx`
Props: `label`, `color?`
Renders the `[dot-line] SECTION LABEL` pattern used on every page in 6+ inline variations.

### `components/page-hero.tsx`
Props: `eyebrow`, `title`, `titleGradient?`, `description`, `children?`
Renders the standard page opener: mono eyebrow label + gradient h1 + description paragraph.
Currently copy-pasted with minor variations in every page client component.

### `components/feature-card.tsx`
Props: `title`, `description`, `tags?`, `href?`, `external?`, `status?`, `icon?`
The hover card with optional external link arrow and status badge.
Currently copy-pasted in `explore/page.client.tsx` (18 cards) and `members/page.client.tsx`.

`components/address-row.tsx` already exists — no change needed.

All existing pages refactored to use shared components. No visual regression.

---

## Section 3 — Narrative & Content Overhaul

Every page gets its hero copy and section framing rewritten to match the correct story. No mockup data. Only verifiable facts from the protocol docs and Constitution.

### Homepage (`app/(site)/page.tsx` + `components/hero-section.tsx`)

Complete rewrite. New structure:

1. **Hero block**
   - Headline: *"The monetization hub for onchain assets."*
   - Sub-copy: Creators — human and AI — generating new revenue from IP, NFTs, RWAs, and tokens. Full ownership. Immutable rules. No gatekeepers.
   - CTAs: `Open App ↗` (medialane.io) and `Read the Constitution →` (/docs/Constitution-of-Medialane-DAO)
   - No fake live indicators. No fake stats.

2. **What is the Integrity Web** — 3–4 sentence prose block defining the concept. The only place on the site that explains it directly.

3. **Four pillars** (replace current Principles section)
   - `Monetize anything` — IP, NFTs, RWAs, tokens. Royalties, licensing, trading. Programmable revenue enforced by Cairo smart contracts.
   - `Own it forever` — Berne Convention copyright proof in 181 countries. IPFS + Starknet timestamp. No registration. No lawyers.
   - `Built for all intelligences` — Human creators, organizations, autonomous AI agents. First-class DAO membership for any intelligence with a cryptographic identifier.
   - `Governed by the community` — 1% marketplace fee to the DAO treasury. MDLN holders vote on Snapshot each year: Creator's Airdrop, buybacks, burns, development, operations.
   All pillar copy drawn from the Constitution and Governance Charter — not invented.

4. **DAO Treasury** — short block explaining the governance model correctly. Revenue → DAO treasury → annual Snapshot vote by MDLN holders → allocation decided by the community. Links to medialane.eth. Replaces the misleading token stats grid.

5. **Quick links grid** — unchanged structure, updated copy using `FeatureCard` component.

### `/explore` page
- Hero copy rewritten: monetization hub framing, not "protocol features" list.
- First section renamed from "Create" to "Monetize".
- SDK and ZK Infrastructure items updated to link to new `/build` page.
- No structural change to the grid layout.

### `/dao` page
- Hero copy rewritten: governance model and DAO structure, not supply numbers.
- Stats section de-emphasized or removed; narrative replaces it.
- Revenue/treasury section corrected: DAO votes on allocation annually.

### `/members` page
- Hero copy rewritten: ownership and governance rights, not token supply.
- Stats grid stays but is no longer the lead story.
- "How to Participate" section updated to mention AI agent membership.

### `content/protocol/Airdrop.md`
- Governance clarification added at top: revenue allocation is an annual MDLN holder vote on Snapshot. The Creator's Airdrop is one option — alongside token buybacks, burns, development, content acquisition, and operational costs. This is not a guaranteed formula; it is community-governed.

---

## Section 4 — New Pages

### `/build` — Developer & AI Agent Hub

Route: `app/(site)/build/page.tsx` + `app/(site)/build/page.client.tsx`

Sections:
1. **Hero** — "Build on the Integrity Web." Permissionless access to the Medialane protocol for developers and autonomous AI agents.
2. **SDK quickstart** — real install command, three real code examples from `content/protocol/SDK.md`: fetch active listings, fetch creator portfolio, construct typed-data order. No invented examples.
3. **Contract reference** — all verified contract addresses from `lib/site-config.ts` and the Constitution. Starknet contracts (marketplace721, marketplace1155, collection721, collection1155, dropFactory, popFactory, mdlnL2) with Starkscan links. Ethereum contracts (MDLN token, vesting, treasury) with Etherscan links.
4. **AI agent access** — dedicated block: the medialane-portal is being upgraded to work fully onchain. Permissionless SDK access. AI agents with cryptographic identifiers are first-class DAO members per the Constitution. No KYC, no gatekeeping.
5. **Resources** — GitHub (SDK), Voyager, Starkscan, Snapshot, API docs.

Added to sidebar nav and `navSections`.

### `/airdrop` — Creator's Airdrop

Route: `app/(site)/airdrop/page.tsx` + `app/(site)/airdrop/page.client.tsx`

Content drawn entirely from `content/protocol/Airdrop.md` with corrected governance framing.

Sections:
1. **Hero** — "Revenue back to the community." Platform revenue flows to the DAO treasury. Allocation is a Snapshot vote.
2. **Governance-first framing** — MDLN holders vote annually on how treasury revenue is used. Creator's Airdrop is one option.
3. **How the airdrop works** — three participation tiers (Register, Create, Engage) from the existing doc. Unchanged.
4. **Fair by design** — on-chain verifiable, no gaming, community-governed rules. From existing doc.
5. **Campaigns** — Global and Brasil. From existing doc.
6. **CTA** — link to medialane.io and Snapshot.

Added to sidebar nav and `navSections`.

---

## Section 5 — Docs, Routing & Final Structural Fixes

### Content routing fix
`content/protocol/` files (Getting-Started.md, IP-Assets.md, SDK.md, Marketplace.md, Launchpad.md, Contracts.md) are not reachable via `/docs/[slug]` because `getPostBySlug` reads from the content root with no subdirectory support. Fix: update `getPostBySlug` in `lib/markdown.ts` to accept an optional `subdirectory` param and try `content/{subdirectory}/{slug}.md` before falling back to `content/{slug}.md`. The `/docs/[slug]` route passes the subdirectory via a URL prefix or query — simplest: update the route to try both `content/dao/` and `content/protocol/` in sequence until a match is found. Subdirectory structure stays intact; no files moved.

### `/docs` index page
`app/(site)/docs/page.tsx` currently renders with no useful content. After the routing fix, this page renders a two-section grid using existing `getAllPosts()` calls: `getAllPosts('dao')` for **DAO Documents** (Constitution, Charter, Compliance Guidelines, Community Guidelines, Terms of Use, Privacy Policy) and `getAllPosts('protocol')` for **Protocol Documents** (Getting Started, IP Assets, SDK, Marketplace, Launchpad, Contracts). Categorization is automatic from the subdirectory — no frontmatter changes needed.

### `CLAUDE.md` rewrite
Rewritten to reflect actual current architecture:
- No 3D scene (removed, deps uninstalled)
- Sidebar-based AppShell (SidebarProvider + AppSidebar + SidebarInset)
- New pages: `/build`, `/airdrop`
- New shared components: StatCard, SectionHeader, PageHero, FeatureCard
- Content routing: all markdown in `content/` root, no subdirectories
- Correct component inventory (no orphaned files)
- Updated commands if any change

---

## What Does Not Change

- The `AppShell` sidebar structure — it works well
- `components/ui/` — shadcn/ui components, never hand-edited
- `components/app-sidebar.tsx` — structure stays, nav items updated
- `components/address-row.tsx` — already correct
- `components/glass-card.tsx`, `page-header.tsx` — kept as-is
- `lib/markdown.ts` — no change to parsing logic
- `lib/motion.ts` — Framer Motion variants kept for future use
- `app/globals.css` — brand tokens and design system unchanged
- All existing DAO markdown documents in `content/dao/` — unchanged

---

## Implementation Notes

- All new pages follow the existing server component → client component split pattern
- No new dependencies introduced
- No live data fetching beyond existing Snapshot integration
- All copy drawn from existing documentation — no invented claims
- The `/build` SDK examples are copied verbatim from `content/protocol/SDK.md`
- The `/airdrop` content is drawn verbatim from `content/protocol/Airdrop.md` with the governance clarification added
