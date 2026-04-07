'use client'

import { motion } from 'framer-motion'
import {
  AppWindow,
  Sparkles,
  Server,
  ArrowUpRight,
  Coins,
} from 'lucide-react'
import { GlassCard } from '@/components/glass-card'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '@/components/page-header'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const features = [
  {
    category: 'Apps',
    items: [
      {
        title: 'NFT Marketplace',
        description: 'Buy, sell, and trade tokenized IP and digital assets on Starknet mainnet.',
        icon: AppWindow,
        status: 'Mainnet',
        href: 'https://medialane.io',
        accentColor: 'text-primary bg-primary/10',
      },
      {
        title: 'Creator Launchpad',
        description: 'Monetize collections, programmable IP, and real-world assets.',
        icon: AppWindow,
        status: 'Mainnet',
        href: 'https://medialane.io',
        accentColor: 'text-primary bg-primary/10',
      },
      {
        title: 'Collection Drop',
        description: 'Launch limited edition mints and timed exclusive content drops.',
        icon: AppWindow,
        status: 'Mainnet',
        href: 'https://medialane.io',
        accentColor: 'text-primary bg-primary/10',
      },
      {
        title: 'Creator Coins',
        description: 'Community tokens for creators — launch, govern, and reward your audience.',
        icon: Coins,
        status: 'Coming Soon',
        href: null,
        accentColor: 'text-muted-foreground bg-muted',
      },
    ],
  },
  {
    category: 'Protocol',
    items: [
      {
        title: 'Medialane Protocol',
        description: 'Audited marketplace smart contract for IP order registration, fulfillment, and cancellation on Starknet.',
        icon: Sparkles,
        status: 'Audited',
        href: 'https://starkscan.co/contract/0x0234f4e8838801ebf01d7f4166d42aed9a55bc67c1301162decf9e2040e05f16',
        accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
      },
      {
        title: 'POP Protocol',
        description: 'Soulbound proof-of-participation credentials. Factory + per-event collection pattern.',
        icon: Sparkles,
        status: 'Onchain',
        href: 'https://starkscan.co/contract/0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111',
        accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
      },
      {
        title: 'Zero-Knowledge Proofs',
        description: 'Privacy-preserving verification using Starknet STARK proofs for media authenticity.',
        icon: Sparkles,
        status: 'Core',
        href: null,
        accentColor: 'text-[#1DA1F2] bg-[#1DA1F2]/10',
      },
    ],
  },
  {
    category: 'DAO & Token',
    items: [
      {
        title: 'MDLN Token',
        description: '21M fixed supply governance token on Ethereum mainnet. 100% DAO treasury — no VCs, no insiders.',
        icon: Server,
        status: 'Live',
        href: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15',
        accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
      },
      {
        title: 'Snapshot Governance',
        description: 'Off-chain gasless voting for MDLN holders at medialane.eth. Propose and vote on protocol changes.',
        icon: Server,
        status: 'Live',
        href: 'https://snapshot.org/#/s:medialane.eth',
        accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
      },
      {
        title: 'Medialane API',
        description: 'RESTful API for third-party integration with Medialane platform services.',
        icon: Server,
        status: 'Active',
        href: null,
        accentColor: 'text-[#F3B04E] bg-[#F3B04E]/10',
      },
    ],
  },
]

const containerVariants = createContainerVariants(0.08, 0.2)
const itemVariants = createItemVariants()

function statusColor(status: string) {
  switch (status) {
    case 'Live':
    case 'Active':
    case 'Open':
    case 'Core':
    case 'Onchain':
    case 'Mainnet':
    case 'Audited':
      return 'default'
    case 'Beta':
    case 'In Development':
    case 'Testnet':
      return 'secondary'
    default:
      return 'outline'
  }
}

export default function ExplorePageClient() {
  return (
    <div className="flex min-h-screen flex-col px-4 py-16 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        <PageHeader
          title="Explore"
          description="Apps, protocol, and services powering the integrity web."
          maxWidth="max-w-5xl"
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          className="mb-8"
        />

        {features.map((section) => (
          <motion.div key={section.category} variants={itemVariants} className="mb-10">
            <h2 className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary border-b border-primary/20 pb-2">
              {section.category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => {
                const inner = (
                  <GlassCard
                    key={item.title}
                    intensity="light"
                    className="flex flex-col gap-4 p-5 sm:p-6 transition-transform active:scale-[0.98] bg-white/5 border-white/5 shadow-lg h-full"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`flex size-10 items-center justify-center rounded-lg ${item.accentColor}`}>
                        <item.icon className="size-5" />
                      </div>
                      <Badge variant={statusColor(item.status)}>{item.status}</Badge>
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
                        {item.title}
                        {item.href && (
                          <div className="rounded-full bg-white/5 p-1 ml-auto flex items-center justify-center">
                            <ArrowUpRight className="size-3 text-muted-foreground" />
                          </div>
                        )}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </GlassCard>
                )

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block outline-none"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.title}>{inner}</div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
