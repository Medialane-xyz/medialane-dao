'use client'

import { ArrowUpRight } from 'lucide-react'
import { starknet } from '@/lib/site-config'

const features = [
  {
    section: 'Create',
    items: [
      {
        title: 'Mint IP Asset',
        description: 'Register any creative work — art, music, video, code — as a programmable NFT. 12 IP types. Gasless. Metadata on IPFS.',
        status: 'Live',
        href: 'https://medialane.io/create/asset',
        tags: ['ERC-721', 'IPFS', 'Berne Convention'],
      },
      {
        title: 'Create Collection',
        description: 'Deploy branded ERC-721 collections on Starknet. Collection metadata anchored on IPFS — resolvable by any dApp, forever.',
        status: 'Live',
        href: 'https://medialane.io/create/collection',
        tags: ['ERC-721', 'Factory Pattern'],
      },
      {
        title: 'Remix & License',
        description: 'Create licensed derivatives of existing IP. CC0/CC BY assets auto-approve. Custom terms: price, scope, rights. Attribution on-chain.',
        status: 'Live',
        href: 'https://medialane.io/create/remix',
        tags: ['Creative Commons', 'Attribution'],
      },
    ],
  },
  {
    section: 'Marketplace',
    items: [
      {
        title: 'Browse & Discover',
        description: 'Full-featured marketplace with search, filter by currency and price, and dynamic themes per asset. Floor price, volume, holder stats.',
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        tags: ['USDC', 'ETH', 'STRK', 'WBTC'],
      },
      {
        title: 'Buy & Make Offers',
        description: 'Buy directly or make offers. Batch cart checkout — multiple items in one PIN-authenticated session key transaction.',
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        tags: ['Gasless', 'Session Keys', 'SNIP-9'],
      },
      {
        title: 'Creator Profiles',
        description: 'Dedicated pages with asset portfolios, collection stats, activity timelines. Gated content for token holders.',
        status: 'Live',
        href: 'https://medialane.io/creators',
        tags: ['Token Gating', 'Profiles'],
      },
    ],
  },
  {
    section: 'Launchpad',
    items: [
      {
        title: 'Collection Drop',
        description: 'Timed NFT releases with configurable supply, mint window, price, per-wallet limit, and allowlists. Gas-free for participants.',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        tags: ['Allowlist', 'Supply Cap', 'Timed'],
      },
      {
        title: 'POP Protocol',
        description: 'Issue soulbound proof-of-participation credentials for events, bootcamps, hackathons. One claim per wallet. Gas-free.',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        tags: ['Soulbound', 'Non-transferable'],
      },
      {
        title: 'Creator Coins',
        description: 'Community tokens for creators — launch your own token, govern your audience, and reward your most dedicated fans.',
        status: 'Soon',
        href: null,
        tags: ['Token Factory', 'Community'],
      },
    ],
  },
  {
    section: 'Developer',
    items: [
      {
        title: 'Medialane SDK',
        description: 'TypeScript SDK v0.6.4. Full on-chain and REST API coverage. Dual ESM + CJS. IP metadata aligned with Berne Convention.',
        status: 'v0.6.4',
        href: 'https://github.com/medialane-io/medialane-sdk',
        tags: ['TypeScript', 'ESM', 'Open Source'],
      },
      {
        title: 'Protocol v2',
        description: 'Audited marketplace contract on Starknet. CEI pattern, front-running protection, fixed-price enforcement.',
        status: 'Audited',
        href: `https://starkscan.co/contract/${starknet.marketplace}`,
        tags: ['Cairo', 'Starknet', 'Open Source'],
      },
      {
        title: 'ZK Infrastructure',
        description: 'STARK proofs secure every transaction. ZK-rollup architecture — Ethereum-level security at a fraction of the cost.',
        status: 'Core',
        href: null,
        tags: ['STARK', 'ZK-Rollup', 'L2'],
      },
    ],
  },
]

function StatusBadge({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
        isLive
          ? 'bg-emerald-500/10 text-emerald-500'
          : isSoon
          ? 'bg-muted text-muted-foreground/50'
          : 'bg-primary/10 text-primary'
      }`}
    >
      {isLive && <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />}
      {status}
    </span>
  )
}

export default function ExplorePageClient() {
  return (
    <div className="p-6 max-w-5xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-1">
          Medialane · Platform
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-1">Protocol</h1>
        <p className="text-sm text-muted-foreground">
          Everything live on Medialane — onchain IP tools to DAO governance.
        </p>
      </div>

      {/* Feature sections */}
      {features.map((section) => (
        <div key={section.section}>
          <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-3">
            {section.section}
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => {
              const card = (
                <div className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-150 h-full">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <StatusBadge status={item.status} />
                      {item.href && (
                        <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed flex-1">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )

              if (item.href?.startsWith('http')) {
                return (
                  <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="block">
                    {card}
                  </a>
                )
              }
              return <div key={item.title}>{card}</div>
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
