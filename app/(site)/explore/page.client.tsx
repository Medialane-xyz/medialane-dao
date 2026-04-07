'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Palette, Music, FileCode, Image, Package, Sparkles, Shield, Vote, Coins, Server, Users, Zap, BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const sections = [
  {
    category: 'Create',
    accent: '#EC796B',
    description: 'Mint and manage intellectual property on Starknet.',
    items: [
      {
        title: 'Mint IP Asset',
        description: 'Register any creative work — art, music, video, code, patents — as a programmable NFT with licensing baked in. 12 IP types. Gasless. Metadata on IPFS.',
        icon: Sparkles,
        status: 'Live',
        href: 'https://medialane.io/create/asset',
        iconClass: 'text-primary bg-primary/10',
        tags: ['ERC-721', 'IPFS', 'Berne Convention'],
      },
      {
        title: 'Create Collection',
        description: 'Deploy branded ERC-721 collections on Starknet. Collection metadata anchored on IPFS — resolvable by any dApp, forever.',
        icon: Package,
        status: 'Live',
        href: 'https://medialane.io/create/collection',
        iconClass: 'text-primary bg-primary/10',
        tags: ['ERC-721', 'Factory Pattern'],
      },
      {
        title: 'Remix & License',
        description: 'Create licensed derivatives of existing IP. Open-license assets (CC0, CC BY) auto-approve. Custom terms: propose price, scope, rights. Parent attribution on-chain.',
        icon: Music,
        status: 'Live',
        href: 'https://medialane.io/create/remix',
        iconClass: 'text-primary bg-primary/10',
        tags: ['Creative Commons', 'On-chain Attribution'],
      },
    ],
  },
  {
    category: 'Marketplace',
    accent: '#EC796B',
    description: 'Buy, sell, and trade tokenized IP assets.',
    items: [
      {
        title: 'Browse & Discover',
        description: 'Full-featured marketplace with search, filter by currency and price, and dynamic color themes per asset. Collections with floor price, volume, and holder stats.',
        icon: Image,
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        iconClass: 'text-ml-orange bg-ml-orange/10',
        tags: ['USDC', 'USDT', 'ETH', 'STRK', 'WBTC'],
      },
      {
        title: 'Buy & Make Offers',
        description: 'Buy directly or make offers. Accept, counter, or cancel. Batch cart checkout — buy multiple items in one PIN-authenticated session key transaction.',
        icon: Coins,
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        iconClass: 'text-ml-orange bg-ml-orange/10',
        tags: ['Gasless', 'Session Keys', 'SNIP-9'],
      },
      {
        title: 'Creator Profiles',
        description: 'Dedicated creator pages with address-colored identity, asset portfolios, collection stats, and activity timelines. Gated content for token holders.',
        icon: Users,
        status: 'Live',
        href: 'https://medialane.io/creators',
        iconClass: 'text-ml-orange bg-ml-orange/10',
        tags: ['Token Gating', 'On-chain Comments'],
      },
    ],
  },
  {
    category: 'Launchpad',
    accent: '#E175B1',
    description: 'Launch and distribute IP to your community.',
    items: [
      {
        title: 'Collection Drop',
        description: 'Timed NFT releases with configurable supply, mint window, price (or free), per-wallet limit, and optional allowlists. Gas-free for participants.',
        icon: Zap,
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        iconClass: 'text-ml-mauve bg-ml-mauve/10',
        tags: ['Allowlist', 'Supply Cap', 'Timed Release'],
      },
      {
        title: 'POP Protocol',
        description: 'Issue soulbound proof-of-participation credentials for events, bootcamps, hackathons, and courses. One claim per wallet. Gas-free.',
        icon: Shield,
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        iconClass: 'text-ml-mauve bg-ml-mauve/10',
        tags: ['Soulbound', 'Non-transferable', 'On-chain'],
      },
      {
        title: 'Creator Coins',
        description: 'Community tokens for creators — launch your own token, govern your audience, and reward your most dedicated fans.',
        icon: Coins,
        status: 'Coming Soon',
        href: null,
        iconClass: 'text-muted-foreground bg-muted/50',
        tags: ['Token Factory', 'Community'],
      },
    ],
  },
  {
    category: 'Protocol',
    accent: '#0000FF',
    description: 'Open-source, audited infrastructure powering everything.',
    items: [
      {
        title: 'Medialane Protocol v2',
        description: 'Audited marketplace contract on Starknet. Order registration, fulfillment, and cancellation. Fixed-price enforcement, CEI pattern, front-running protection.',
        icon: FileCode,
        status: 'Audited',
        href: 'https://starkscan.co/contract/0x0234f4e8838801ebf01d7f4166d42aed9a55bc67c1301162decf9e2040e05f16',
        iconClass: 'text-primary bg-primary/10',
        tags: ['Cairo', 'Starknet', 'Open Source'],
      },
      {
        title: 'Zero-Knowledge Proofs',
        description: 'Starknet STARK proofs secure every transaction. ZK-rollup architecture gives Ethereum-level security at a fraction of the cost — with provably valid state transitions.',
        icon: Sparkles,
        status: 'Core',
        href: null,
        iconClass: 'text-primary bg-primary/10',
        tags: ['STARK', 'ZK-Rollup', 'Ethereum L2'],
      },
      {
        title: 'Medialane SDK',
        description: 'Framework-agnostic TypeScript SDK (v0.6.4). Full on-chain and REST API coverage. Dual ESM + CJS builds. IP metadata types aligned with Berne Convention.',
        icon: BookOpen,
        status: 'v0.6.4',
        href: 'https://github.com/medialane-io/medialane-sdk',
        iconClass: 'text-primary bg-primary/10',
        tags: ['TypeScript', 'ESM', 'Open Source'],
      },
    ],
  },
  {
    category: 'DAO & Governance',
    accent: '#F3B04E',
    description: 'Community-owned. No VCs. No insiders.',
    items: [
      {
        title: 'MDLN Token',
        description: '21M fixed supply governance token on Ethereum. 100% DAO treasury — 90% vested over 9 years, 10% operational runway. Open LP entry for everyone.',
        icon: Coins,
        status: 'Live',
        href: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15',
        iconClass: 'text-[#F3B04E] bg-[#F3B04E]/10',
        tags: ['ERC20Votes', 'ERC20Permit', 'Immutable'],
      },
      {
        title: 'Snapshot Governance',
        description: 'Gasless off-chain voting at medialane.eth. Propose protocol changes, treasury allocation, and platform parameters. 1 MDLN = 1 vote.',
        icon: Vote,
        status: 'Live',
        href: 'https://snapshot.org/#/s:medialane.eth',
        iconClass: 'text-[#F3B04E] bg-[#F3B04E]/10',
        tags: ['medialane.eth', 'EIP-712', 'Gasless'],
      },
      {
        title: 'StarkGate Bridge',
        description: 'Bridge MDLN from Ethereum to Starknet — use your governance token natively within the Medialane platform ecosystem.',
        icon: Server,
        status: 'Coming Soon',
        href: null,
        iconClass: 'text-muted-foreground bg-muted/50',
        tags: ['L1→L2', 'StarkGate'],
      },
    ],
  },
]

function statusVariant(status: string): 'default' | 'secondary' | 'outline' {
  switch (status) {
    case 'Live': case 'Active': case 'Core': case 'Onchain': case 'Mainnet': case 'Audited': return 'default'
    case 'Beta': case 'In Development': case 'v0.6.4': return 'secondary'
    default: return 'outline'
  }
}

const containerVariants = createContainerVariants(0.06, 0.1)
const itemVariants = createItemVariants()

export default function ExplorePageClient() {
  return (
    <div className="min-h-screen bg-background px-4 py-14 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        {/* Page header */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Medialane · Platform Overview
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-[0.95]">
            Explore
          </h1>
          <p className="mt-3 text-muted-foreground text-base max-w-md leading-relaxed">
            Everything live on Medialane — from onchain IP tools to DAO governance.
          </p>
        </motion.div>

        {sections.map((section) => (
          <motion.div key={section.category} variants={itemVariants} className="mb-14">
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-5 rounded-full shrink-0" style={{ backgroundColor: section.accent }} />
              <div>
                <h2 className="text-sm font-bold tracking-[0.14em] uppercase text-foreground">
                  {section.category}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">{section.description}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => {
                const card = (
                  <div className="group flex flex-col gap-4 p-5 rounded-2xl bg-card border border-border hover:border-border/80 hover:shadow-md transition-all h-full">
                    <div className="flex items-start justify-between">
                      <div className={`flex size-9 items-center justify-center rounded-lg ${item.iconClass}`}>
                        <item.icon className="size-4" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
                        {item.href && (
                          <ArrowUpRight className="size-3.5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground mb-1.5">{item.title}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                    </div>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )

                if (item.href?.startsWith('http')) {
                  return (
                    <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="block outline-none">
                      {card}
                    </a>
                  )
                }
                return <div key={item.title}>{card}</div>
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
