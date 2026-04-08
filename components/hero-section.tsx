'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Sparkles, Shield, Coins,
  Globe, Zap, Lock, Users, ExternalLink,
} from 'lucide-react'
import { mdln, starknet } from '@/lib/site-config'

// ── Animation helpers ────────────────────────────────────────────────────────

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
})

// ── Data ─────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: Sparkles,
    title: 'IP Marketplace',
    desc: 'Mint, license, and trade 12 IP types onchain. Gasless orders and atomic swaps on Starknet mainnet.',
    href: 'https://medialane.io/marketplace',
    cta: 'Open Marketplace',
    external: true,
    accentClass: 'text-[var(--ml-blue)] bg-[var(--ml-blue)]/10',
  },
  {
    icon: Shield,
    title: 'Creator Launchpad',
    desc: 'Deploy onchain collections, Collection Drops, and POP credentials — fully programmable and royalty-bearing.',
    href: 'https://medialane.io/launchpad',
    cta: 'Start Creating',
    external: true,
    accentClass: 'text-[var(--ml-mauve)] bg-[var(--ml-mauve)]/10',
  },
  {
    icon: Coins,
    title: 'DAO Governance',
    desc: '21M MDLN tokens — 100% community treasury. No VCs, no insiders. Governed via Snapshot by token holders.',
    href: '/dao',
    cta: 'View Governance',
    external: false,
    accentClass: 'text-[var(--ml-orange)] bg-[var(--ml-orange)]/10',
  },
]

const stats = [
  { value: '21M', label: 'MDLN Supply', sub: '100% DAO Treasury' },
  { value: '12', label: 'IP Types', sub: 'Art · Audio · Video · NFT +' },
  { value: '9yr', label: 'Vesting', sub: 'Long-term alignment' },
  { value: '∞', label: 'Gasless TXs', sub: 'Via ChipiPay · Starknet' },
]

const principles = [
  {
    icon: Globe,
    title: 'Protocol-Agnostic',
    desc: 'Designed for multichain from day one. Starknet mainnet today, expanding to any chain that supports the Integrity Web.',
  },
  {
    icon: Lock,
    title: 'Immutable by Design',
    desc: 'IP metadata is permanently anchored on IPFS. Contracts are non-upgradeable. Ownership is sovereign.',
  },
  {
    icon: Users,
    title: 'Community Governed',
    desc: 'Every protocol parameter and treasury decision is subject to MDLN token holder vote via Snapshot.',
  },
  {
    icon: Zap,
    title: 'Gasless for Creators',
    desc: 'Account abstraction and session keys make every marketplace action free for participants.',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">

      {/* ── Subtle background treatment ────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
        {/* Radial gradient glow — top center */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30 dark:opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, #0000FF 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <motion.div {...fade(0)} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="animate-ping absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Live on Starknet Mainnet · Utah DAO LLC
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.08)}
          className="max-w-4xl text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05]"
        >
          Intellectual Property
          <br />
          <span className="gradient-text">for the Integrity Web</span>
        </motion.h1>

        <motion.p
          {...fade(0.16)}
          className="mt-6 max-w-lg text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Medialane is the creator economy protocol where IP becomes sovereign,
          programmable, and permanently owned — governed entirely by its community.
        </motion.p>

        <motion.div {...fade(0.22)} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            Launch App <ArrowRight className="size-4" />
          </a>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-6 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm hover:bg-card transition-colors"
          >
            Explore Platform <ArrowUpRight className="size-3.5" />
          </Link>
          <Link
            href="/dao"
            className="inline-flex items-center gap-2 rounded-full border border-border/60 px-6 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors"
          >
            DAO Governance
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-2 text-muted-foreground/40"
        >
          <div className="h-8 w-px bg-gradient-to-b from-transparent to-border/60" />
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-border/40 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/40">
          {stats.map((s) => (
            <div key={s.label} className="px-8 py-8 text-center">
              <p className="text-3xl sm:text-4xl font-bold tabular-nums gradient-text">{s.value}</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{s.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PILLARS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 py-24 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">The Platform</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything a creator needs
            <br />
            <span className="text-muted-foreground font-normal">in one open protocol</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {pillars.map((p) => {
            const Inner = (
              <div className="group relative flex flex-col h-full gap-5 p-6 rounded-2xl border border-border/60 bg-card/50 hover:border-border hover:bg-card transition-all duration-200">
                <div className={`flex size-10 items-center justify-center rounded-xl ${p.accentClass}`}>
                  <p.icon className="size-5" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  {p.cta}
                  {p.external ? <ArrowUpRight className="size-3.5" /> : <ArrowRight className="size-3.5" />}
                </div>
              </div>
            )
            return p.external ? (
              <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer">
                {Inner}
              </a>
            ) : (
              <Link key={p.title} href={p.href}>
                {Inner}
              </Link>
            )
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          PRINCIPLES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border/40 bg-muted/5">
        <div className="max-w-6xl mx-auto px-6 py-24 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Protocol Design</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built for the long arc
              <br />
              <span className="text-muted-foreground font-normal">of the open creator economy</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((p) => (
              <div key={p.title} className="flex flex-col gap-3 p-5 rounded-2xl border border-border/50 bg-card/30">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="size-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          MDLN TOKEN
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">MDLN Token</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                Governance by
                <br />
                <span className="gradient-text">the community,</span>
                <br />
                for the community
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                21 million MDLN tokens, 100% held in the DAO treasury. Zero allocated to venture capital,
                zero to insiders. Fully community-governed via Snapshot with a 9-year vesting schedule
                that ensures long-term alignment with creators.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/members"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Token & Membership <ArrowRight className="size-4" />
                </Link>
                <a
                  href={mdln.etherscanToken}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border transition-colors"
                >
                  Etherscan <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total Supply', value: '21,000,000', sub: 'MDLN · Fixed forever' },
                { label: 'DAO Treasury', value: '100%', sub: 'No VC allocation' },
                { label: 'Vesting Period', value: '9 Years', sub: 'Long-term alignment' },
                { label: 'Network', value: 'Ethereum', sub: 'ERC-20 · Mainnet' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/60 bg-card/50 p-5 space-y-1"
                >
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{item.label}</p>
                  <p className="text-xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              ))}

              <div className="col-span-2 rounded-2xl border border-border/60 bg-card/30 p-4 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Treasury · Gnosis Safe</p>
                  <p className="text-xs font-mono text-foreground/70 truncate">{mdln.treasury}</p>
                </div>
                <a
                  href={mdln.etherscanTreasury}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="border-t border-border/40 bg-muted/5">
        <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Join the DAO</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            The creator economy
            <br />
            <span className="gradient-text">is being rebuilt.</span>
          </h2>
          <p className="max-w-lg mx-auto text-muted-foreground leading-relaxed">
            Participate in governance, use the protocol, build on the infrastructure.
            Medialane belongs to the creators who use it.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
            >
              Start Creating <ArrowRight className="size-4" />
            </a>
            <Link
              href="/connect"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur-sm hover:bg-card transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/40 bg-background">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Medialane DAO · Utah DAO LLC</p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/dao" className="hover:text-foreground transition-colors">Governance</Link>
            <Link href="/members" className="hover:text-foreground transition-colors">Token</Link>
            <Link href="/connect" className="hover:text-foreground transition-colors">Connect</Link>
            <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">App</a>
            <a href={mdln.etherscanToken} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Etherscan</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
