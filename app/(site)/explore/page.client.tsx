'use client'

import { Stagger, StaggerItem } from '@medialane/ui'
import { starknet } from '@/lib/site-config'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { FeatureCard } from '@/components/feature-card'

const features = [
  {
    section: 'Monetize',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    items: [
      {
        title: 'Mint digital asset',
        status: 'Live',
        href: 'https://medialane.io/create/asset',
        external: true,
        description: 'Register any creative work as a programmable NFT. 12 IP types. Gasless. Metadata anchored on IPFS — permanent and censorship-resistant.',
        tags: ['ERC-721', 'IPFS', 'Berne Convention'],
      },
      {
        title: 'Create Collection',
        status: 'Live',
        href: 'https://medialane.io/create/collection',
        external: true,
        description: 'Deploy branded ERC-721 collections on Starknet. Factory pattern via Cairo smart contract. Metadata on IPFS, resolvable by any dApp forever.',
        tags: ['ERC-721', 'Cairo', 'Factory Pattern'],
      },
      {
        title: 'Remix & License',
        status: 'Live',
        href: 'https://medialane.io/create/remix',
        external: true,
        description: 'Create licensed derivatives. CC0/CC BY assets auto-approve. Custom terms: price, scope, rights, AI policy. Attribution chain recorded on-chain forever.',
        tags: ['Creative Commons', 'Attribution', 'Remix Graph'],
      },
    ],
  },
  {
    section: 'Marketplace',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    items: [
      {
        title: 'Browse & Discover',
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        external: true,
        description: 'Full marketplace with search, currency filters, dynamic asset themes. Floor price, volume, holder stats. USDC, USDT, ETH, STRK, WBTC.',
        tags: ['USDC', 'ETH', 'STRK', 'WBTC'],
      },
      {
        title: 'Buy & Make Offers',
        status: 'Live',
        href: 'https://medialane.io/marketplace',
        external: true,
        description: 'Buy directly or make offers. Batch cart checkout — multiple items in one PIN-authenticated session key transaction. Royalties enforced by contract.',
        tags: ['Gasless', 'Session Keys', 'SNIP-9'],
      },
      {
        title: 'Creator Profiles',
        status: 'Live',
        href: 'https://medialane.io/creators',
        external: true,
        description: 'Dedicated pages with portfolio, collection stats, activity timelines. Token-gated content for MDLN and NFT holders.',
        tags: ['Token Gating', 'Profiles'],
      },
    ],
  },
  {
    section: 'Launchpad',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    items: [
      {
        title: 'Collection Drop',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        external: true,
        description: 'Timed ERC-721 releases with configurable supply, mint window, price, per-wallet limit, and allowlists. Contract enforces every rule — no centralized mint server.',
        tags: ['Allowlist', 'Supply Cap', 'Timed'],
      },
      {
        title: 'ERC-1155 Edition',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        external: true,
        description: 'Multi-copy editions for music, publications, and prints. One contract, multiple token IDs and quantities. Partial listing support.',
        tags: ['ERC-1155', 'Editions', 'Multi-copy'],
      },
      {
        title: 'POP Protocol',
        status: 'Live',
        href: 'https://medialane.io/launchpad',
        external: true,
        description: 'Soulbound proof-of-participation credentials for events, bootcamps, hackathons, DAO membership. Gas-free. Self-sovereign — cannot be taken away.',
        tags: ['Soulbound', 'Non-transferable', 'Credentials'],
      },
    ],
  },
  {
    section: 'Developer',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    items: [
      {
        title: 'Medialane SDK',
        status: 'v0.6.4',
        href: '/build',
        external: false,
        description: 'TypeScript SDK. Full on-chain and REST API coverage. Dual ESM + CJS. Berne Convention-aligned IP metadata schema. Framework-agnostic.',
        tags: ['TypeScript', 'ESM', 'Open Source'],
      },
      {
        title: 'Protocol v2',
        status: 'Audited',
        href: `https://voyager.online/contract/${starknet.marketplace721}`,
        external: true,
        description: 'Audited ERC-721 and ERC-1155 marketplace contracts on Starknet. CEI pattern, front-running protection, SNIP-12 typed-data orders. Non-upgradeable by design.',
        tags: ['Cairo', 'ERC-721', 'ERC-1155'],
      },
      {
        title: 'ZK Infrastructure',
        status: 'Core',
        href: '/build',
        external: false,
        description: 'STARK proofs secure every transaction. STWO prover for faster finality. Recursive proofs for unlimited scale. Ethereum-level security at a fraction of cost.',
        tags: ['STARK', 'STWO Prover', 'ZK-Rollup'],
      },
    ],
  },
  {
    section: 'Creator Rights',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    items: [
      {
        title: 'Born Protected',
        status: 'Core',
        href: null,
        external: false,
        description: 'Minting timestamps your work under the Berne Convention — instant copyright proof in 181 countries. No registration fees, no WIPO filings, no lawyers. Protected the moment it exists.',
        tags: ['181 Countries', 'Automatic', 'No Lawyers'],
      },
      {
        title: 'Programmable Revenue',
        status: 'Live',
        href: 'https://medialane.io/create/asset',
        external: true,
        description: 'Royalties, licensing terms, and revenue splits encoded in Cairo smart contracts. 9 Creative Commons variants + custom terms — commercial use, AI policy, derivative rights, geographic scope.',
        tags: ['Royalties', 'CC0', 'CC BY', 'AI Policy'],
      },
      {
        title: 'Immutable Attribution',
        status: 'Core',
        href: null,
        external: false,
        description: 'Every record lives on Starknet and IPFS — not on Medialane servers. Remix graph traces creative lineage back to the original source. Cannot be altered, delisted, or censored by anyone.',
        tags: ['IPFS', 'Remix Graph', 'Censorship-proof'],
      },
    ],
  },
  {
    section: 'Starknet Infrastructure',
    color: 'text-brand-blue',
    bg: 'bg-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    items: [
      {
        title: 'Native Account Abstraction',
        status: 'Core',
        href: null,
        external: false,
        description: 'Wallets are smart contracts on Starknet. Session keys (SNIP-9) enable PIN-authenticated gasless sessions — mint, list, and trade multiple items without re-signing each action.',
        tags: ['SNIP-9', 'Session Keys', 'Gasless'],
      },
      {
        title: 'STWO Prover & ZK-STARK',
        status: 'Core',
        href: null,
        external: false,
        description: "Cairo's next-generation STARK prover. Recursive proofs verify other proofs — unlimited scale while maintaining full cryptographic integrity. Ethereum-level finality.",
        tags: ['STWO', 'Recursive Proofs', 'ZK-STARK'],
      },
      {
        title: 'Sponsored Transactions',
        status: 'Core',
        href: null,
        external: false,
        description: 'Medialane sponsors gas fees for creator actions via Starknet paymaster. No ETH required. Zero-fee IP tokenization — creators keep 100% of what they earn.',
        tags: ['Paymaster', 'Zero Gas', 'Creator First'],
      },
    ],
  },
]

export default function ExplorePageClient() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-12">
      <PageHero
        eyebrow="Medialane · Protocol"
        title="Protocol"
        description="New revenue tools for creators, collectors, organizations, and autonomous AI. Mint, license, trade, and build capital markets around your work — on Starknet, governed by the community."
      />

      {features.map((section) => (
        <div key={section.section}>
          <SectionHeader label={section.section} color={section.color} bg={section.bg} className="mb-6" />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  {...item}
                  gradient={section.gradient}
                  buttonColor={section.buttonColor}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      ))}
    </div>
  )
}
