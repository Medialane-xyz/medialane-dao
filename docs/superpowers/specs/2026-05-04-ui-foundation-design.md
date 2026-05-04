# UI Foundation Redesign — Implementation Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the medialane-dao visual foundation to match the medialane.io aesthetic — bold typography, animated gradient borders, branded colors, mobile-first, high-fidelity light/dark support — by fully leveraging `@medialane/ui` primitives already available in the package.

**Architecture:** Wire `@medialane/ui/styles` and its Tailwind preset into the DAO site, then rebuild the four shared components (PageHero, FeatureCard, StatCard, SectionHeader) using the design system's card primitives, motion components, aurora blobs, and animation utilities.

**Tech Stack:** Next.js 16 / React 19, Tailwind v4, `@medialane/ui` (styles, preset, MotionCard, FadeIn, Stagger, StaggerItem, KineticWords, BRAND), framer-motion

---

## Design Principles

1. **No fake data, no placeholders** — every number and label must come from real sources
2. **Medialane identity, not generic SaaS** — match medialane.io's bold, creator-first visual language
3. **Both themes must be beautiful** — light and dark are equal citizens, not an afterthought
4. **Mobile-first** — layouts start at `grid-cols-1`, scale up at `sm:` and `lg:`
5. **`@medialane/ui` is the source of truth** — do not duplicate CSS that already exists in `medialane.css`

---

## Section 1 — Foundation Wiring

### What changes

**`globals.css`**
- Import `@medialane/ui/styles` at the top (gives: `glass`, `glass-light`, `bento-cell`, `card-base`, `aurora-*`, `pill-badge`, `gradient-text`, `gradient-text-warm`, `gradient-text-gold`, `btn-border-animated`, `bg-grid`, `animate-blob`, `animate-float`, `animate-pulse-glow`, `section-label`, all keyframes)
- Remove duplicate definitions already covered by medialane.css: `gradient-text`, `.aurora-*` classes, `border-flow` keyframe if duplicated
- Keep DAO-specific tokens: `--ml-blue`, `--ml-orange`, `--ml-mauve`, `--ml-deep`, `--ml-glow`, `--ml-glass`, `--ml-glass-border`, oklch color definitions

**`tailwind.config.ts` (or equivalent for Tailwind v4)**
- Add `@medialane/ui` preset so `brand-blue`, `brand-purple`, `brand-orange`, `brand-rose`, `brand-navy` work as Tailwind utility classes
- In Tailwind v4, this means adding `@plugin` or `@import` of the preset — check current config pattern

**`package.json` / dependencies**
- Verify `framer-motion` is installed (peer dep of `@medialane/ui`) — add if missing

### Animated gradient border technique

For cards and CTAs that need animated gradient borders:
```html
<!-- Wrapper carries the animated gradient as background -->
<div class="p-[1px] rounded-2xl btn-border-animated">
  <!-- Inner card clips the gradient, shows only as border -->
  <div class="rounded-[calc(1rem-1px)] bg-card h-full">
    <!-- content -->
  </div>
</div>
```
The `btn-border-animated` class animates `background-position` across `270deg, brand-blue, brand-purple, brand-rose, brand-orange` at 5s infinite. The `p-[1px]` creates a 1px border effect.

---

## Section 2 — Typography & Spacing

### Hero headings
- From: `text-4xl sm:text-5xl font-bold`
- To: `text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02]`
- Single gradient via `gradient-text` class (purple→indigo→blue) — not multi-color competing gradients
- Non-gradient line: `text-foreground` — high contrast, no opacity

### Eyebrow labels
- From: `text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40`
- To: `pill-badge` class — proper pill with `border border-primary/25 bg-primary/8 text-primary text-[11px] font-bold tracking-widest uppercase rounded-full px-3.5 py-1`

### Body text
- From: `text-base text-muted-foreground/70` (too dim)
- To: `text-base sm:text-lg text-muted-foreground leading-relaxed` (full opacity, larger on desktop)

### Section headings
- Major sections: `text-2xl sm:text-3xl font-bold tracking-tight` — replaces mono-uppercase pattern for primary breaks
- Subsections: keep accent-line style but upgrade to `text-sm font-bold` with the colored line

### Page padding (mobile-first)
- From: `px-6 lg:px-10 xl:px-14 py-8`
- To: `px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16`

---

## Section 3 — Component Redesign

### `components/page-hero.tsx`

```tsx
interface PageHeroProps {
  eyebrow: string
  title: string        // first line — gets gradient-text
  titlePlain?: string  // optional second line — plain foreground
  gradient?: boolean
  description: string
  children?: React.ReactNode
}
```

Structure:
- Outer: `relative overflow-hidden` with `bg-grid` subtle texture and 2 `aurora-purple`/`aurora-blue` blobs (absolute, pointer-events-none)
- `FadeIn` wrapper (from `@medialane/ui`)
- Eyebrow: `pill-badge` class
- Title: `KineticWords` on the gradient line, plain `<span>` on the second line
- Description: `text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl`
- Children slot for CTA buttons

### `components/feature-card.tsx`

Rebuilt to match `LaunchpadServicesGrid` card style:

```tsx
interface FeatureCardProps {
  title: string
  description: string
  tags?: string[]
  href?: string | null
  external?: boolean
  status?: string           // 'Live' | 'Audited' | 'Core' | 'Soon' | semver
  icon?: React.ElementType
  iconColor?: string        // Tailwind bg+text classes for icon pill
  gradient?: string         // Tailwind bg-gradient-to-br classes for card tint
  buttonColor?: string      // Tailwind bg class for CTA button
  featured?: boolean        // if true, wraps in animated gradient border
}
```

Structure:
- `MotionCard` wrapper (press-scale on tap)
- Card: `bento-cell` + `bg-gradient-to-br {gradient}` background tint
- If `featured`: wrap in `p-[1px] rounded-2xl btn-border-animated` container
- Icon: `h-10 w-10 rounded-2xl flex items-center justify-center {iconColor}` (solid colored, not transparent)
- Title: `text-xl font-bold` (not `text-sm font-semibold`)
- Status badge: inline `pill-badge` variant (emerald for Live/Audited/Core, muted for Soon, primary for version)
- Description: `text-sm text-muted-foreground leading-relaxed` (no opacity hack)
- Tags: unchanged — small rounded chips
- CTA: full-width `<a>` or `<Link>` button `h-10 px-4 rounded-xl text-sm font-semibold text-white {buttonColor} flex items-center justify-between` with `ArrowRight`
- No href: render non-interactive card, no CTA row

### `components/stat-card.tsx`

```tsx
interface StatCardProps {
  label: string
  value: string
  sub?: string
  accent?: string    // aurora blob class: 'aurora-purple' | 'aurora-blue' | 'aurora-orange' | 'aurora-rose'
  accentPos?: string // Tailwind position for blob: default '-bottom-4 -right-4'
}
```

Structure:
- `bento-cell p-5 sm:p-6 relative overflow-hidden`
- Aurora blob: `absolute {accentPos} w-24 h-24 {accent} animate-blob pointer-events-none`
- Label: `text-xs text-muted-foreground font-medium mb-2`
- Value: `text-4xl sm:text-5xl font-black font-mono tabular-nums text-foreground`
- Sub: `text-xs text-muted-foreground/60 mt-1`

### `components/section-header.tsx`

Two variants, cleaner:

```tsx
interface SectionHeaderProps {
  label: string
  size?: 'sm' | 'lg'   // sm = accent-line style, lg = bold heading style
  color?: string        // text color class
  bg?: string           // accent line color class
}
```

- `lg` (default for major sections): `text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6`
- `sm` (subsections): accent line + `text-sm font-bold {color} uppercase tracking-widest`

---

## Section 4 — Animated Borders, Aurora, Light/Dark, Mobile

### Animated gradient border
Applied via wrapper pattern (see Section 1). Used on:
- Homepage: Integrity Web card, DAO Treasury card
- `/members`: primary stat row
- `/build`: Install code block
- `/airdrop`: How Revenue Works card
- Any `featured: true` FeatureCard

### Aurora blobs
- `PageHero`: 1 `aurora-purple` (top-left, `w-72 h-72`) + 1 `aurora-blue` (bottom-right, `w-56 h-56`) with `animate-blob` / `animate-blob-slow`
- `StatCard`: small `w-20 h-20` aurora blob in corner, color matched to accent
- Hero sections on individual pages: inherit from PageHero

### Light theme
- `glass-light` class for explanation/prose cards (Integrity Web, treasury, disclaimer blocks)
- Aurora blobs use `.aurora-*` base opacity (lower than dark) — already handled by the CSS
- Brand colors stay vivid in light mode (no inversion needed)

### Dark theme
- `glass` class for the same prose cards
- `bento-cell` cards read clearly because gradient tints are now visible against the dark background
- Aurora blobs animate at `.dark .aurora-*` opacity levels (higher) — already in medialane.css

### Mobile-first grid rules
| Component | Mobile | SM | LG |
|-----------|--------|----|----|
| StatCard grid | `grid-cols-2` | `grid-cols-2` | `grid-cols-4` |
| FeatureCard grid | `grid-cols-1` | `grid-cols-2` | `grid-cols-3` |
| CtaCard grid | `grid-cols-1` | `grid-cols-2` | `grid-cols-2` |
| Pillar grid | `grid-cols-1` | `grid-cols-2` | `grid-cols-4` |

### Scroll animation
- `FadeIn` wraps every `PageHero`
- `Stagger` + `StaggerItem` wraps every card grid (7% stagger delay)
- `MotionCard` wraps every `FeatureCard` for `whileTap` press-scale

---

## Files Modified

| File | Change |
|------|--------|
| `app/globals.css` | Import `@medialane/ui/styles`, remove duplicates, keep DAO tokens |
| `tailwind.config.ts` or equivalent | Add `@medialane/ui` preset |
| `components/page-hero.tsx` | Full rebuild |
| `components/feature-card.tsx` | Full rebuild |
| `components/stat-card.tsx` | Full rebuild |
| `components/section-header.tsx` | Full rebuild |
| `package.json` | Add `framer-motion` if missing |

## Files NOT Modified (yet)

Individual page files (`page.client.tsx`) — they consume the shared components and inherit improvements automatically. Per-page layout passes come after the foundation is solid.
