'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'

// ── Constants ─────────────────────────────────────────────────────────────────

const SCRAMBLE_CHARS = '0123456789ABCDEF·—/\\'
const EASE = [0.22, 1, 0.36, 1] as const

const SECTIONS = [
  { id: 'protocol', label: 'Protocol' },
  { id: 'token', label: 'Token' },
  { id: 'contracts', label: 'Contracts' },
  { id: 'principles', label: 'Principles' },
] as const

// ── Scramble hook ─────────────────────────────────────────────────────────────

function useScramble(target: string, active: boolean, delay = 0) {
  const [display, setDisplay] = useState(() => target.replace(/./g, ' '))
  const frame = useRef<ReturnType<typeof setTimeout> | null>(null)
  const resolved = useRef<boolean[]>([])

  useEffect(() => {
    if (!active) return
    resolved.current = Array(target.length).fill(false)

    const tick = (iter = 0) => {
      setDisplay(
        target
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (resolved.current[i]) return char
            if (iter > i * 1.4) {
              resolved.current[i] = true
              return char
            }
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')
      )

      if (resolved.current.every(Boolean)) return
      frame.current = setTimeout(() => tick(iter + 1), 40)
    }

    const t = setTimeout(() => tick(), delay)
    return () => {
      clearTimeout(t)
      if (frame.current) clearTimeout(frame.current)
    }
  }, [target, active, delay])

  return display
}

// ── Section dots ──────────────────────────────────────────────────────────────

function SectionDots({ active }: { active: string }) {
  return (
    <nav className="flex flex-col gap-5" aria-label="Page sections">
      {SECTIONS.map((s) => {
        const isActive = active === s.id
        return (
          <button
            key={s.id}
            onClick={() => {
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className="group flex items-center gap-3 text-left"
            aria-label={`Go to ${s.label}`}
          >
            <span
              className={`block rounded-full transition-all duration-400 ${
                isActive ? 'w-5 h-[2px] bg-foreground' : 'w-2 h-[2px] bg-muted-foreground/25 group-hover:bg-muted-foreground/50 group-hover:w-3'
              }`}
            />
            <span
              className={`text-[10px] font-mono uppercase tracking-[0.14em] transition-colors duration-300 ${
                isActive ? 'text-foreground' : 'text-muted-foreground/30 group-hover:text-muted-foreground/60'
              }`}
            >
              {s.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// ── Data primitives ───────────────────────────────────────────────────────────

const rowItem = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

function DataRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <motion.div
      variants={rowItem}
      className="group flex items-baseline justify-between gap-4 py-2.5 border-b border-border/15 last:border-0 -mx-3 px-3 rounded-sm hover:bg-muted/5 transition-colors duration-150"
    >
      <span className="text-xs text-muted-foreground/50 shrink-0 w-36 sm:w-44 font-medium tabular-nums">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-mono text-foreground/60 hover:text-foreground transition-colors duration-150 truncate text-right"
        >
          {value}
          <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
        </a>
      ) : (
        <span className="text-sm font-mono text-foreground/60 text-right">{value}</span>
      )}
    </motion.div>
  )
}

function DataSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
    >
      {children}
    </motion.div>
  )
}

function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="text-[10px] font-mono text-muted-foreground/20 tabular-nums">{index}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/40">{label}</span>
    </div>
  )
}

function ProtocolLink({
  href, label, description, external = false,
}: { href: string; label: string; description: string; external?: boolean }) {
  const inner = (
    <div className="group flex items-start justify-between gap-6 py-4 border-b border-border/15 last:border-0 cursor-pointer">
      <div className="space-y-0.5 min-w-0">
        <p className="text-sm font-semibold text-foreground/70 group-hover:text-foreground transition-colors duration-150">
          {label}
        </p>
        <p className="text-xs text-muted-foreground/40 leading-relaxed">{description}</p>
      </div>
      <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 shrink-0 mt-0.5" />
    </div>
  )
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
    : <Link href={href}>{inner}</Link>
}

// ── Left panel identity ───────────────────────────────────────────────────────

function LeftPanel({ activeSection, scrambled }: { activeSection: string; scrambled: string }) {
  return (
    <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-between py-16 px-8 lg:px-12 border-r border-border/10">

      {/* Wordmark + tagline */}
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/30 mb-8">
            medialane.org
          </p>
        </motion.div>

        {/* Scrambled heading */}
        <div className="space-y-0 mb-8 overflow-hidden">
          {['Intellectual', 'property', 'infrastructure', 'for the', 'open web.'].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                className="text-2xl font-bold tracking-tight leading-[1.15] text-foreground font-mono"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.07 }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.75 }}
          className="text-xs text-muted-foreground/40 leading-relaxed max-w-[200px]"
        >
          Open protocol. DAO governed.
          Deployed on Starknet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-6"
        >
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-foreground/50 hover:text-foreground transition-colors duration-200"
          >
            Open App
            <ArrowUpRight className="size-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
          </a>
        </motion.div>
      </div>

      {/* Section nav dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <SectionDots active={activeSection} />
      </motion.div>

      {/* Footer micro-text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="text-[9px] font-mono text-muted-foreground/20 space-y-1"
      >
        <p>Medialane DAO · Utah LLC</p>
        <p>© {new Date().getFullYear()}</p>
      </motion.div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const reduce = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('protocol')
  const scrambled = useScramble('MEDIALANE', mounted && !reduce, 800)

  useEffect(() => { setMounted(true) }, [])

  // IntersectionObserver for section dots
  useEffect(() => {
    const ids = SECTIONS.map((s) => s.id)
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[42%_58%]">

      {/* ── Left panel ──────────────────────────────────────────────────────── */}
      <div className="hidden lg:block">
        <LeftPanel activeSection={activeSection} scrambled={scrambled} />
      </div>

      {/* ── Right scrollable panel ──────────────────────────────────────────── */}
      <div className="px-6 sm:px-10 lg:px-14 pt-28 lg:pt-0 divide-y divide-border/15">

        {/* Mobile identity — visible only below lg */}
        <div className="lg:hidden pb-10">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/30 mb-6">
            medialane.org
          </p>
          <div className="space-y-0 mb-5">
            {['Intellectual property', 'infrastructure for the open web.'].map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="text-3xl font-bold tracking-tight leading-[1.15] text-foreground"
                  initial={reduce ? false : { y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.55, ease: EASE, delay: 0.1 + i * 0.08 }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground/50 leading-relaxed mb-5">
            Open protocol for IP registration, licensing, and trade. Deployed on Starknet.
            Governed by MDLN token holders.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors duration-150"
            >
              Open App
              <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </a>
            <Link
              href="/dao"
              className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors duration-150"
            >
              View Governance →
            </Link>
          </div>
        </div>

        {/* ── Protocol ──────────────────────────────────────────────────────── */}
        <section id="protocol" className="py-14">
          <SectionHead index="01" label="Protocol" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: EASE }}
          >
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
          </motion.div>
        </section>

        {/* ── MDLN Token ────────────────────────────────────────────────────── */}
        <section id="token" className="py-14">
          <SectionHead index="02" label="MDLN Token" />
          <DataSection>
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
          </DataSection>
        </section>

        {/* ── Onchain Contracts ─────────────────────────────────────────────── */}
        <section id="contracts" className="py-14">
          <SectionHead index="03" label="Onchain Contracts · Starknet" />
          <DataSection>
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
          </DataSection>
        </section>

        {/* ── Principles ────────────────────────────────────────────────────── */}
        <section id="principles" className="py-14">
          <SectionHead index="04" label="Principles" />
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            className="space-y-7"
          >
            {[
              {
                title: 'Creator sovereignty',
                body: 'Every IP asset is a non-custodial onchain token. Ownership is direct, permanent, and requires no permission to transfer, license, or trade.',
              },
              {
                title: 'Immutable by design',
                body: 'Protocol contracts are non-upgradeable. Metadata is permanently anchored on IPFS. What is registered cannot be altered or removed.',
              },
              {
                title: 'Community governed',
                body: '21 million MDLN tokens. 100% held in the DAO treasury. Every parameter change, treasury action, and protocol decision requires a community vote. No insiders, no VCs, no preferential allocations.',
              },
              {
                title: 'Open infrastructure',
                body: 'The protocol is permissionless. Any creator, developer, or application can interact directly with the contracts. No gatekeeping.',
              },
            ].map(({ title, body }) => (
              <motion.p
                key={title}
                variants={rowItem}
                className="text-sm text-muted-foreground/50 leading-relaxed"
              >
                <strong className="text-foreground/80 font-semibold">{title}.</strong>{' '}
                {body}
              </motion.p>
            ))}
          </motion.div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[10px] font-mono text-muted-foreground/25"
        >
          <p>© {new Date().getFullYear()} Medialane DAO · Utah DAO LLC</p>
          <nav className="flex items-center gap-4 flex-wrap">
            {[
              { href: '/explore', label: 'Explore' },
              { href: '/dao', label: 'Governance' },
              { href: '/members', label: 'Members' },
              { href: '/connect', label: 'Connect' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-foreground transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-150"
            >
              App ↗
            </a>
          </nav>
        </motion.footer>

      </div>
    </div>
  )
}
