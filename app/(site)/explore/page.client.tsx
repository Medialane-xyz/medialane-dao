'use client'

import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { FadeIn } from '@medialane/ui'

type Item = { title: string; desc: string; href?: string; external?: boolean }
type Section = { eyebrow: string; accent: string; heading: string; intro: string; items: Item[] }

const sections: Section[] = [
  {
    eyebrow: 'Create',
    accent: 'text-brand-purple',
    heading: 'Publish and shape your work',
    intro: 'Turn what you make into something you fully own — in seconds, with no fees and no paperwork.',
    items: [
      {
        title: 'Publish your work',
        desc: 'Register art, music, writing, or video as work you own and can sell. It takes seconds and costs nothing.',
        href: 'https://medialane.io/create/asset',
        external: true,
      },
      {
        title: 'Create a collection',
        desc: 'Group related work into a branded collection — an album, a series, a gallery.',
        href: 'https://medialane.io/create/collection',
        external: true,
      },
      {
        title: 'Remix and license',
        desc: 'Let others build on your work under terms you choose. Every remix credits the original automatically.',
        href: 'https://medialane.io/create/remix',
        external: true,
      },
    ],
  },
  {
    eyebrow: 'Trade',
    accent: 'text-brand-blue',
    heading: 'Sell, collect, and earn',
    intro: 'A full marketplace for creative work — sell yours, collect others, and earn every time your work changes hands.',
    items: [
      {
        title: 'Sell and make offers',
        desc: 'List your work at a fixed price or take offers from buyers. You stay in control until the moment of sale.',
        href: 'https://medialane.io/marketplace',
        external: true,
      },
      {
        title: 'Earn royalties forever',
        desc: 'Set a royalty once and receive it automatically every time your work is resold — no chasing payments.',
        href: 'https://medialane.io/marketplace',
        external: true,
      },
      {
        title: 'Build your profile',
        desc: 'A dedicated page for your work, your collections, and your story — with content only your collectors can see.',
        href: 'https://medialane.io/creators',
        external: true,
      },
    ],
  },
  {
    eyebrow: 'Launch',
    accent: 'text-brand-orange',
    heading: 'Release work to the world',
    intro: 'Bring an audience to a launch — on your terms, on a schedule you set.',
    items: [
      {
        title: 'Run a drop',
        desc: 'Release a collection to the public with a set size, price, and timing. The rules run themselves.',
        href: 'https://medialane.io/launchpad',
        external: true,
      },
      {
        title: 'Sell editions',
        desc: 'Offer multiple copies of the same work — ideal for music, writing, and prints.',
        href: 'https://medialane.io/launchpad',
        external: true,
      },
      {
        title: 'Give participation badges',
        desc: 'Hand out collectible badges for events, courses, and communities. They belong to the holder for good.',
        href: 'https://medialane.io/launchpad',
        external: true,
      },
    ],
  },
  {
    eyebrow: 'Protect',
    accent: 'text-brand-rose',
    heading: 'Your rights, built in',
    intro: 'Ownership and protection are not extra steps — they come the moment you publish.',
    items: [
      {
        title: 'Copyright in 181 countries',
        desc: 'Publishing creates a copyright record recognised across 181 countries — instantly, with no registration or lawyers.',
      },
      {
        title: 'You set the terms',
        desc: 'Decide how your work can be used — commercial use, remixes, AI training — and the platform holds everyone to it.',
      },
      {
        title: 'Credit that lasts',
        desc: 'Every use and remix traces back to you. The record cannot be altered, hidden, or taken down.',
      },
    ],
  },
  {
    eyebrow: 'Build',
    accent: 'text-brand-purple',
    heading: 'Open for developers and AI',
    intro: 'Medialane is an open protocol — anyone, human or AI agent, can build on it.',
    items: [
      {
        title: 'Developer tools and docs',
        desc: 'The SDK, contracts, and guides for building on Medialane.',
        href: 'https://docs.medialane.org/docs/developers',
        external: true,
      },
      {
        title: 'For AI agents',
        desc: 'Autonomous agents take part as first-class participants — no special access needed.',
        href: '/build',
        external: false,
      },
    ],
  },
]

function ItemRow({ item }: { item: Item }) {
  const inner = (
    <div className="flex items-start justify-between gap-6 py-5">
      <div>
        <p className="text-base font-bold text-foreground">{item.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
      </div>
      {item.href &&
        (item.external ? (
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
        ) : (
          <ArrowRight className="mt-1 size-5 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-foreground" />
        ))}
    </div>
  )
  if (!item.href) return inner
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
      {inner}
    </a>
  ) : (
    <Link href={item.href} className="group block">
      {inner}
    </Link>
  )
}

export default function ExplorePageClient() {
  return (
    <div className="space-y-20 sm:space-y-24">

      {/* Hero */}
      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-10 lg:pt-24 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Explore
          </p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Everything you can do on Medialane
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            One place to create, protect, sell, and grow your creative work — and a community that
            owns the platform together.
          </p>
        </FadeIn>
      </section>

      {/* Sections */}
      {sections.map((s) => (
        <section key={s.eyebrow} className="px-4 sm:px-6 lg:px-10 xl:px-14">
          <FadeIn>
            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.2em] ${s.accent}`}>{s.eyebrow}</p>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl">{s.heading}</h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">{s.intro}</p>
            <div className="mt-6 divide-y divide-border/50 border-t border-border/50">
              {s.items.map((item) => (
                <ItemRow key={item.title} item={item} />
              ))}
            </div>
          </FadeIn>
        </section>
      ))}

      {/* Simple by design */}
      <section className="px-4 pb-8 sm:px-6 lg:px-10 xl:px-14">
        <FadeIn className="max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Simple by design</p>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl">No crypto experience needed</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Sign in with an email and start in minutes. You never pay a network fee, and there are
            no wallets to manage or jargon to learn — Medialane handles the hard parts so you can
            focus on your work.
          </p>
          <a
            href="https://medialane.io"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-purple/90"
          >
            Open the app <ArrowUpRight className="size-4" />
          </a>
        </FadeIn>
      </section>

    </div>
  )
}
