'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, Check, PenLine, Layers, Copy, Rocket, Award } from 'lucide-react'
import { FadeIn } from '@medialane/ui'
import type { ShowcaseCollection } from '@/lib/showcase'
import { siteConfig } from '@/lib/site-config'
import { AssetMosaic } from '@/components/elements/asset-mosaic'

/* ── Interactive feature showcase ──────────────────────────────────────── */

type Feature = {
  id: string
  tab: string
  title: string
  body: string
  points: string[]
  fill: string
  text: string
  soft: string
}

const FEATURES: Feature[] = [
  {
    id: 'earn',
    tab: 'Earn',
    title: 'Earn from your work',
    body: 'Sell your creations, license them, and collect royalties automatically every time they are used. You choose the price and the terms.',
    points: ['Sell directly or take offers', 'Royalties on every resale', 'Licensing terms you set'],
    fill: 'bg-brand-purple',
    text: 'text-brand-purple',
    soft: 'bg-brand-purple/10 text-brand-purple',
  },
  {
    id: 'own',
    tab: 'Own',
    title: 'Ownership that stays yours',
    body: 'Publish your work and get a copyright record recognised in 181 countries — instantly, with no registration, no paperwork, and no lawyers.',
    points: ['Recognised in 181 countries', 'Timestamped the moment you publish', 'Always provably yours'],
    fill: 'bg-brand-blue',
    text: 'text-brand-blue',
    soft: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    id: 'open',
    tab: 'Open',
    title: 'Open to every creator',
    body: 'Anyone can join. Artists, collectors, studios, and AI creators all take part as equals — no applications, no approvals, no gatekeepers.',
    points: ['Free to join', 'No application or approval', 'For people and AI alike'],
    fill: 'bg-brand-orange',
    text: 'text-brand-orange',
    soft: 'bg-brand-orange/10 text-brand-orange',
  },
  {
    id: 'community',
    tab: 'Community',
    title: 'Run by its community',
    body: 'Medialane answers to no company. The people who use it govern it together and decide how it grows.',
    points: ['Governed by MDLN holders', 'Every decision is public', 'No company in control'],
    fill: 'bg-brand-rose',
    text: 'text-brand-rose',
    soft: 'bg-brand-rose/10 text-brand-rose',
  },
]

function FeatureShowcase() {
  const [active, setActive] = useState(0)
  const f = FEATURES[active]
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {FEATURES.map((feat, i) => (
          <button
            key={feat.id}
            type="button"
            onClick={() => setActive(i)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              i === active ? `${feat.fill} text-white` : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {feat.tab}
          </button>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div>
          <h3 className={`text-3xl font-black leading-tight tracking-tight sm:text-4xl ${f.text}`}>{f.title}</h3>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{f.body}</p>
        </div>
        <ul className="space-y-3 lg:pt-2">
          {f.points.map((p) => (
            <li key={p} className="flex items-center gap-3">
              <span className={`flex size-7 shrink-0 items-center justify-center rounded-full ${f.soft}`}>
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span className="text-base font-medium text-foreground">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ── Launchpad cards ───────────────────────────────────────────────────── */

const launchpad = [
  {
    icon: PenLine,
    title: 'Mint your work',
    desc: 'Publish a song, photo, piece of writing, or video as work you fully own.',
    href: 'https://medialane.io/create/asset',
    text: 'text-brand-purple',
    soft: 'bg-brand-purple/10 text-brand-purple',
  },
  {
    icon: Layers,
    title: 'Create a collection',
    desc: 'Group your work into a branded collection with its own page.',
    href: 'https://medialane.io/create/collection',
    text: 'text-brand-blue',
    soft: 'bg-brand-blue/10 text-brand-blue',
  },
  {
    icon: Copy,
    title: 'Limited editions',
    desc: 'Release your work in a set number of numbered copies.',
    href: 'https://medialane.io/launchpad',
    text: 'text-brand-rose',
    soft: 'bg-brand-rose/10 text-brand-rose',
  },
  {
    icon: Rocket,
    title: 'Collection drop',
    desc: 'Run a timed public release with a set size and price.',
    href: 'https://medialane.io/launchpad',
    text: 'text-brand-orange',
    soft: 'bg-brand-orange/10 text-brand-orange',
  },
  {
    icon: Award,
    title: 'Participation badges',
    desc: 'Hand out collectible badges for events and communities.',
    href: 'https://medialane.io/launchpad',
    text: 'text-brand-purple',
    soft: 'bg-brand-purple/10 text-brand-purple',
  },
]

/* ── Homepage ──────────────────────────────────────────────────────────── */

const stats = [
  { value: '21M', label: 'MDLN — the fixed community supply', text: 'text-brand-purple' },
  { value: '181', label: 'countries recognise your copyright', text: 'text-brand-blue' },
  { value: '100%', label: 'community-owned', text: 'text-brand-orange' },
  { value: '1%', label: 'fee on every transaction — returned to creators', text: 'text-brand-rose' },
]

const explore = [
  { href: '/explore', title: 'Explore Medialane', desc: 'What you can do and how it works.' },
  { href: '/dao', title: 'Governance', desc: 'Proposals, voting, and the DAO.' },
  { href: '/token', title: 'MDLN Token', desc: 'How the community owns Medialane.' },
  { href: '/guidelines', title: 'Guidelines', desc: 'The documents that govern the DAO.' },
]

export function HeroSection({ collections }: { collections: ShowcaseCollection[] }) {
  return (
    <div className="space-y-20 sm:space-y-28">

      {/* Hero */}
      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Medialane</p>
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="text-brand-purple">Create it.</span>{' '}
            <span className="text-brand-blue">Own it.</span>
            <br />
            <span className="text-brand-orange">Earn from it.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Medialane is the home for creative work — where artists, musicians, writers, and
            designers earn from what they make and keep full ownership of it. Built and run by the
            people who use it.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple/90"
            >
              Open the app <ArrowUpRight className="size-4" />
            </a>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-brand-purple"
            >
              See how it works <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Real collections */}
      {collections.length > 0 && (
        <section>
          <p className="mb-5 px-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 sm:px-6 lg:px-10 xl:px-14">
            Created on Medialane
          </p>
          <AssetMosaic items={collections} />
        </section>
      )}

      {/* Feature showcase */}
      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <h2 className="mb-2 text-3xl font-black tracking-tight sm:text-4xl">
            What you can do on Medialane
          </h2>
          <p className="mb-10 max-w-2xl text-base text-muted-foreground">
            One platform for creating, owning, and earning from your work — and a community that
            owns the platform itself.
          </p>
          <FeatureShowcase />
        </FadeIn>
      </section>

      {/* Launchpad */}
      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Launchpad</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Ways to launch your work</h2>
            </div>
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-opacity hover:opacity-80"
            >
              Explore all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto pb-2">
            {launchpad.map(({ icon: Icon, title, desc, href, text, soft }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-72 shrink-0 flex-col rounded-2xl border border-border/60 p-6 transition-colors hover:border-foreground/20"
              >
                <span className={`flex size-11 items-center justify-center rounded-xl ${soft}`}>
                  <Icon className="size-5" />
                </span>
                <p className="mt-5 text-lg font-bold text-foreground">{title}</p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${text}`}>
                  Open <ArrowUpRight className="size-4" />
                </span>
              </a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="grid gap-10 border-t border-border/50 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className={`text-5xl font-black leading-none tabular-nums sm:text-6xl ${s.text}`}>{s.value}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* Airdrop callout */}
      <section className="px-4 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <div className="rounded-2xl bg-gradient-to-br from-brand-orange/12 via-brand-rose/6 to-brand-purple/12 p-8 sm:p-12">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-orange" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-orange">
                Live · Creator&apos;s Airdrop
              </span>
            </div>
            <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl">
              Every fee comes back to the community
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Medialane gives all of its 1% fee back. Each time the Creator&apos;s Fund reaches
              $1,000, it is shared with everyone taking part — and joining is free.
            </p>
            <Link
              href="/airdrop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange/90"
            >
              See the Creator&apos;s Airdrop <ArrowRight className="size-4" />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Go further */}
      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn>
          <h2 className="mb-8 text-3xl font-black tracking-tight sm:text-4xl">Go further</h2>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-border/60 sm:grid-cols-2">
            {explore.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between gap-4 bg-background p-6 transition-colors hover:bg-muted/40"
              >
                <span>
                  <span className="block text-base font-bold text-foreground transition-colors group-hover:text-brand-purple">
                    {l.title}
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">{l.desc}</span>
                </span>
                <ArrowRight className="size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-brand-purple" />
              </Link>
            ))}
          </div>
          <a
            href={siteConfig.snapshot}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-purple transition-opacity hover:opacity-80"
          >
            Vote on Snapshot <ArrowUpRight className="size-4" />
          </a>
        </FadeIn>
      </section>

    </div>
  )
}
