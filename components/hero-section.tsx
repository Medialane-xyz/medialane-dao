'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { mdln, starknet, siteConfig } from '@/lib/site-config'

// ── Shared constants ─────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: EASE, delay },
})

const inView = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, ease: EASE },
}

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
}

const rowItem = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
}

// ── Primitives ────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      {...inView}
      className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 mb-5"
    >
      {children}
    </motion.p>
  )
}

function AnimatedDivider() {
  return (
    <div className="my-14 overflow-hidden">
      <motion.hr
        className="border-border/40 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.6, ease: EASE }}
      />
    </div>
  )
}

function DataRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <motion.div
      variants={rowItem}
      className="group flex items-baseline justify-between gap-4 py-2.5 border-b border-border/20 last:border-0 hover:bg-muted/5 transition-colors duration-150 -mx-2 px-2 rounded-sm"
    >
      <span className="text-xs text-muted-foreground/60 shrink-0 w-36 sm:w-44 font-medium">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-mono text-foreground/70 hover:text-foreground transition-colors duration-150 truncate text-right"
        >
          {value}
          <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-50 transition-opacity shrink-0" />
        </a>
      ) : (
        <span className="text-sm font-mono text-foreground/70 text-right">{value}</span>
      )}
    </motion.div>
  )
}

function DataSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={rowContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
    >
      {children}
    </motion.div>
  )
}

function ProtocolLink({ href, label, description, external = false }: {
  href: string; label: string; description: string; external?: boolean
}) {
  const inner = (
    <motion.div
      {...inView}
      className="group flex items-start justify-between gap-6 py-5 border-b border-border/25 last:border-0 cursor-pointer"
    >
      <div className="space-y-1 min-w-0">
        <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-150">
          {label}
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <ArrowUpRight className="size-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 shrink-0 mt-0.5" />
    </motion.div>
  )
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>
    : <Link href={href}>{inner}</Link>
}

// ── Page ──────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-8 pt-28 pb-24">

      {/* ── Identity ──────────────────────────────────────────────────────── */}
      <section>
        <motion.p
          {...(reduce ? {} : fadeUp(0.1))}
          className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/40 mb-7"
        >
          Medialane DAO · Utah LLC · Starknet Mainnet
        </motion.p>

        {/* Heading — lines clip in sequentially */}
        <div className="space-y-1 mb-7">
          {['Intellectual property', 'infrastructure for', 'the open web.'].map((line, i) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] text-foreground"
                initial={reduce ? false : { y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.08 }}
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.p
          {...(reduce ? {} : fadeUp(0.42))}
          className="text-base text-muted-foreground leading-relaxed max-w-lg"
        >
          An open protocol for IP registration, licensing, and trade.
          Deployed on Starknet. Governed by MDLN token holders.
          No central authority. No intermediaries.
        </motion.p>

        <motion.div
          {...(reduce ? {} : fadeUp(0.52))}
          className="mt-7 flex items-center gap-6"
        >
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
            className="text-sm text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
          >
            View Governance →
          </Link>
        </motion.div>
      </section>

      <AnimatedDivider />

      {/* ── Protocol ──────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Protocol</SectionLabel>
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
      </section>

      <AnimatedDivider />

      {/* ── MDLN Token ────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>MDLN Token</SectionLabel>
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

      <AnimatedDivider />

      {/* ── Onchain Contracts ─────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Onchain Contracts · Starknet Mainnet</SectionLabel>
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

      <AnimatedDivider />

      {/* ── Principles ────────────────────────────────────────────────────── */}
      <section>
        <SectionLabel>Principles</SectionLabel>
        <motion.div
          variants={rowContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="space-y-6 text-sm text-muted-foreground leading-relaxed"
        >
          {[
            { title: 'Creator sovereignty', body: 'Every IP asset is a non-custodial onchain token. Ownership is direct, permanent, and requires no permission to transfer, license, or trade.' },
            { title: 'Immutable by design', body: 'Protocol contracts are non-upgradeable. Metadata is permanently anchored on IPFS. What is registered cannot be altered or removed.' },
            { title: 'Community governed', body: '21 million MDLN tokens. 100% held in the DAO treasury. Every parameter change, treasury action, and protocol decision requires a community vote. No insiders, no VCs, no preferential allocations.' },
            { title: 'Open infrastructure', body: 'The protocol is permissionless. Any creator, developer, or application can interact directly with the contracts. No gatekeeping.' },
          ].map(({ title, body }) => (
            <motion.p key={title} variants={rowItem}>
              <strong className="text-foreground font-semibold">{title}.</strong>{' '}
              {body}
            </motion.p>
          ))}
        </motion.div>
      </section>

      <AnimatedDivider />

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <motion.footer
        {...inView}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground/40"
      >
        <p className="font-mono">© {new Date().getFullYear()} Medialane DAO · Utah DAO LLC</p>
        <nav className="flex items-center gap-4 flex-wrap">
          {[
            { href: '/explore', label: 'Explore' },
            { href: '/dao', label: 'Governance' },
            { href: '/members', label: 'Members' },
            { href: '/connect', label: 'Connect' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-foreground transition-colors duration-150">
              {l.label}
            </Link>
          ))}
          <a href="https://medialane.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors duration-150">
            App ↗
          </a>
        </nav>
      </motion.footer>

    </div>
  )
}
