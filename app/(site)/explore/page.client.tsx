'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Music, FileCode, Image, Package, Sparkles, Shield, Vote, Coins, Server, Users, Zap, BookOpen } from 'lucide-react'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const sections = [
  {
    category: 'Create',
    accentHex: '#EC796B',
    items: [
      {
        title: 'Mint IP Asset',
        description: 'Register any creative work — art, music, video, code — as a programmable NFT. 12 IP types. Gasless. Metadata on IPFS.',
        icon: Sparkles,
        status: 'Live',
        href: 'https://medialane.io/create/asset',
        tags: ['ERC-721', 'IPFS', 'Berne Convention'],
      },
      {
        title: 'Create Collection',
        description: 'Deploy branded ERC-721 collections on Starknet. Collection metadata anchored on IPFS — resolvable by any dApp, forever.',
        icon: Package,
        status: 'Live',
        href: 'https://medialane.io/create/collection',
        tags: ['ERC-721', 'Factory Pattern'],
      },
      {
        title: 'Remix & License',
        description: 'Create licensed derivatives of existing IP. CC0/CC BY assets auto-approve. Custom terms: propose price, scope, rights. Attribution on-chain.',
        icon: Music,
        status: 'Live',
        href: 'https://medialane.io/create/remix',
        tags: ['Creative Commons', 'Attribution'],
      },
    ],
  },
  {
    category: 'Marketplace',
    accentHex: '#E175B1',
    items: [
      {
        title: 'Browse & Discover',
        description: 'Full-featured marketplace with search, filter by currency and price, and dynamic color themes per asset. Floor price, volume, holder stats.',
        icon: Image,
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        tags: ['USDC', 'ETH', 'STRK', 'WBTC'],
      },
      {
        title: 'Buy & Make Offers',
        description: 'Buy directly or make offers. Batch cart checkout — multiple items in one PIN-authenticated session key transaction.',
        icon: Coins,
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        tags: ['Gasless', 'Session Keys', 'SNIP-9'],
      },
      {
        title: 'Creator Profiles',
        description: 'Dedicated creator pages with asset portfolios, collection stats, activity timelines. Gated content for token holders.',
        icon: Users,
        status: 'Live',
        href: 'https://medialane.io/creators',
        tags: ['Token Gating', 'On-chain Comments'],
      },
    ],
  },
  {
    category: 'Launchpad',
    accentHex: '#6060ff',
    items: [
      {
        title: 'Collection Drop',
        description: 'Timed NFT releases with configurable supply, mint window, price, per-wallet limit, and allowlists. Gas-free for participants.',
        icon: Zap,
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        tags: ['Allowlist', 'Supply Cap', 'Timed'],
      },
      {
        title: 'POP Protocol',
        description: 'Issue soulbound proof-of-participation credentials for events, bootcamps, hackathons. One claim per wallet. Gas-free.',
        icon: Shield,
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        tags: ['Soulbound', 'Non-transferable'],
      },
      {
        title: 'Creator Coins',
        description: 'Community tokens for creators — launch your own token, govern your audience, and reward your most dedicated fans.',
        icon: Coins,
        status: 'Soon',
        href: null,
        tags: ['Token Factory', 'Community'],
      },
    ],
  },
  {
    category: 'Protocol',
    accentHex: '#EC796B',
    items: [
      {
        title: 'Protocol v2',
        description: 'Audited marketplace contract on Starknet. CEI pattern, front-running protection, fixed-price enforcement.',
        icon: FileCode,
        status: 'Audited',
        href: 'https://starkscan.co/contract/0x0234f4e8838801ebf01d7f4166d42aed9a55bc67c1301162decf9e2040e05f16',
        tags: ['Cairo', 'Starknet', 'Open Source'],
      },
      {
        title: 'ZK Proofs',
        description: 'STARK proofs secure every transaction. ZK-rollup architecture — Ethereum-level security at a fraction of the cost.',
        icon: Sparkles,
        status: 'Core',
        href: null,
        tags: ['STARK', 'ZK-Rollup', 'L2'],
      },
      {
        title: 'Medialane SDK',
        description: 'TypeScript SDK v0.6.4. Full on-chain and REST API coverage. Dual ESM + CJS. IP metadata aligned with Berne Convention.',
        icon: BookOpen,
        status: 'v0.6.4',
        href: 'https://github.com/medialane-io/medialane-sdk',
        tags: ['TypeScript', 'ESM', 'Open Source'],
      },
    ],
  },
  {
    category: 'DAO',
    accentHex: '#F3B04E',
    items: [
      {
        title: 'MDLN Token',
        description: '21M fixed supply governance token on Ethereum. 100% DAO treasury — 90% vested over 9 years, 10% operational runway.',
        icon: Coins,
        status: 'Live',
        href: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15',
        tags: ['ERC20Votes', 'Immutable', 'No VCs'],
      },
      {
        title: 'Snapshot Governance',
        description: 'Gasless off-chain voting at medialane.eth. Protocol changes, treasury allocation, platform parameters. 1 MDLN = 1 vote.',
        icon: Vote,
        status: 'Live',
        href: 'https://snapshot.org/#/s:medialane.eth',
        tags: ['medialane.eth', 'EIP-712', 'Gasless'],
      },
      {
        title: 'StarkGate Bridge',
        description: 'Bridge MDLN from Ethereum to Starknet — use your governance token natively within the Medialane ecosystem.',
        icon: Server,
        status: 'Soon',
        href: null,
        tags: ['L1→L2', 'StarkGate'],
      },
    ],
  },
]

function StatusDot({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase
      ${isLive ? 'bg-emerald-500/15 text-emerald-400' : isSoon ? 'bg-white/6 text-white/30' : 'bg-primary/15 text-primary/80'}`}
    >
      {isLive && <span className="inline-block size-1.5 rounded-full bg-emerald-400" />}
      {status}
    </span>
  )
}

const containerVariants = createContainerVariants(0.05, 0.08)
const sectionVariants = createItemVariants({ y: 20, duration: 0.55 })

export default function ExplorePageClient() {
  return (
    <div className="min-h-screen px-4 py-14 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        {/* Header */}
        <motion.div variants={sectionVariants} className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30 mb-3">
            Medialane · Platform
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[0.95]">
            Explore
          </h1>
          <p className="mt-3 text-white/40 text-base max-w-sm leading-relaxed">
            Everything live on Medialane — onchain IP tools to DAO governance.
          </p>
        </motion.div>

        {/* Sections */}
        {sections.map((section) => (
          <motion.div key={section.category} variants={sectionVariants} className="mb-12">
            {/* Section label */}
            <div className="flex items-center gap-3 mb-5">
              <span
                className="block w-6 h-0.5 rounded-full"
                style={{ backgroundColor: section.accentHex }}
              />
              <h2
                className="font-mono text-[10px] tracking-[0.22em] uppercase font-bold"
                style={{ color: section.accentHex }}
              >
                {section.category}
              </h2>
            </div>

            {/* Cards grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => {
                const card = (
                  <div className="group flex flex-col gap-4 p-5 rounded-2xl border border-white/8 bg-black/25 backdrop-blur-xl hover:border-white/15 hover:bg-black/35 transition-all h-full">
                    <div className="flex items-start justify-between">
                      <div
                        className="flex size-8 items-center justify-center rounded-lg"
                        style={{ color: section.accentHex, backgroundColor: `${section.accentHex}18` }}
                      >
                        <item.icon className="size-4" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <StatusDot status={item.status} />
                        {item.href && (
                          <ArrowUpRight className="size-3.5 text-white/15 group-hover:text-white/50 transition-colors" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white/85 mb-1.5 group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-white/40">{item.description}</p>
                    </div>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/30 border border-white/6"
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
