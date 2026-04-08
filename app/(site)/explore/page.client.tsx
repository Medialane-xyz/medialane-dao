'use client'

import { ArrowUpRight } from 'lucide-react'
import { starknet } from '@/lib/site-config'

const features = [
  {
    section: 'Create',
    color: 'text-violet-500',
    bg: 'bg-violet-500',
    items: [
      { title: 'Mint IP Asset',      status: 'Live',   href: 'https://medialane.io/create/asset',
        description: 'Register any creative work as a programmable NFT. 12 IP types. Gasless. Metadata anchored on IPFS — permanent and censorship-resistant.',
        tags: ['ERC-721', 'IPFS', 'Berne Convention'] },
      { title: 'Create Collection', status: 'Live',   href: 'https://medialane.io/create/collection',
        description: 'Deploy branded ERC-721 collections on Starknet. Factory pattern via Cairo smart contract. Metadata on IPFS, resolvable by any dApp forever.',
        tags: ['ERC-721', 'Cairo', 'Factory Pattern'] },
      { title: 'Remix & License',   status: 'Live',   href: 'https://medialane.io/create/remix',
        description: 'Create licensed derivatives. CC0/CC BY assets auto-approve. Custom terms: price, scope, rights, AI policy. Attribution chain recorded on-chain forever.',
        tags: ['Creative Commons', 'Attribution', 'Remix Graph'] },
    ],
  },
  {
    section: 'Marketplace',
    color: 'text-blue-500',
    bg: 'bg-blue-500',
    items: [
      { title: 'Browse & Discover',  status: 'Live',   href: 'https://medialane.io/marketplace',
        description: 'Full marketplace with search, currency filters, dynamic asset themes. Floor price, volume, holder stats. USDC, USDT, ETH, STRK, WBTC.',
        tags: ['USDC', 'ETH', 'STRK', 'WBTC'] },
      { title: 'Buy & Make Offers',  status: 'Live',   href: 'https://medialane.io/marketplace',
        description: 'Buy directly or make offers. Batch cart checkout — multiple items in one PIN-authenticated session key transaction. Royalties enforced by contract.',
        tags: ['Gasless', 'Session Keys', 'SNIP-9'] },
      { title: 'Creator Profiles',   status: 'Live',   href: 'https://medialane.io/creators',
        description: 'Dedicated pages with portfolio, collection stats, activity timelines. Token-gated content for MDLN and NFT holders.',
        tags: ['Token Gating', 'Profiles'] },
    ],
  },
  {
    section: 'Launchpad',
    color: 'text-indigo-500',
    bg: 'bg-indigo-500',
    items: [
      { title: 'Collection Drop',    status: 'Live',   href: 'https://medialane.io/launchpad',
        description: 'Timed NFT releases with configurable supply, mint window, price, per-wallet limit, and allowlists. Contract enforces every rule — no centralized mint server.',
        tags: ['Allowlist', 'Supply Cap', 'Timed'] },
      { title: 'POP Protocol',       status: 'Live',   href: 'https://medialane.io/launchpad',
        description: 'Soulbound proof-of-participation credentials for events, bootcamps, hackathons, DAO membership. Gas-free. Self-sovereign — cannot be taken away.',
        tags: ['Soulbound', 'Non-transferable', 'Credentials'] },
      { title: 'Creator Coins',      status: 'Soon',   href: null,
        description: 'Community tokens for creators — launch your own token, govern your audience, and unlock new monetization models.',
        tags: ['Token Factory', 'Community'] },
    ],
  },
  {
    section: 'Developer',
    color: 'text-primary',
    bg: 'bg-primary',
    items: [
      { title: 'Medialane SDK',      status: 'v0.6.4', href: 'https://github.com/medialane-io/medialane-sdk',
        description: 'TypeScript SDK. Full on-chain and REST API coverage. Dual ESM + CJS. Berne Convention-aligned IP metadata schema. Framework-agnostic.',
        tags: ['TypeScript', 'ESM', 'Open Source'] },
      { title: 'Protocol v1.1',      status: 'Audited', href: `https://starkscan.co/contract/${starknet.marketplace}`,
        description: 'Audited marketplace contract on Starknet. CEI pattern, front-running protection, fixed-price enforcement. Non-upgradeable by design.',
        tags: ['Cairo', 'Starknet', 'Immutable'] },
      { title: 'ZK Infrastructure',  status: 'Core',   href: null,
        description: 'STARK proofs secure every transaction. STWO prover for faster finality. Recursive proofs for unlimited scale. Ethereum-level security at a fraction of cost.',
        tags: ['STARK', 'STWO Prover', 'ZK-Rollup'] },
    ],
  },
  {
    section: 'IP Protection',
    color: 'text-violet-500',
    bg: 'bg-violet-500',
    items: [
      { title: 'Berne Convention',    status: 'Core',   href: null,
        description: 'Immutable onchain timestamp creates copyright proof valid in 181 countries. No registration fee, no WIPO filing, no lawyer. Automatic protection from the moment of minting.',
        tags: ['181 Countries', 'WIPO', 'Copyright'] },
      { title: 'Programmable Licensing', status: 'Live', href: 'https://medialane.io/create/asset',
        description: '9 Creative Commons variants + custom terms. Commercial use, derivative rights, AI training policy, geographic scope, and royalty % — all embedded in IPFS metadata as machine-readable attributes.',
        tags: ['CC0', 'CC BY', 'Custom Terms', 'AI Policy'] },
      { title: 'Immutable Attribution', status: 'Core', href: null,
        description: 'Every IP record lives on Starknet and IPFS — not on Medialane servers. Remix graph traces creative lineage back to the original source. Cannot be altered, delisted, or censored.',
        tags: ['IPFS', 'Remix Graph', 'On-chain'] },
    ],
  },
  {
    section: 'Starknet Infrastructure',
    color: 'text-blue-500',
    bg: 'bg-blue-500',
    items: [
      { title: 'Native Account Abstraction', status: 'Core', href: null,
        description: 'Wallets are smart contracts on Starknet. Session keys (SNIP-9) enable PIN-authenticated gasless sessions — mint, list, and trade multiple items without re-signing each action.',
        tags: ['SNIP-9', 'Session Keys', 'Gasless'] },
      { title: 'STWO Prover & ZK-STARK',    status: 'Core', href: null,
        description: "Cairo's next-generation STARK prover. Recursive proofs verify other proofs — unlimited scale while maintaining full cryptographic integrity. Ethereum-level finality.",
        tags: ['STWO', 'Recursive Proofs', 'ZK-STARK'] },
      { title: 'Sponsored Transactions',     status: 'Core', href: null,
        description: 'Medialane sponsors gas fees for creator actions via Starknet paymaster. No ETH required. Zero-fee IP tokenization — creators keep 100% of what they earn.',
        tags: ['Paymaster', 'Zero Gas', 'Creator First'] },
    ],
  },
]

function StatusBadge({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
      isLive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
             : isSoon ? 'bg-muted text-muted-foreground/50'
             : 'bg-primary/10 text-primary'
    }`}>
      {isLive && <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />}
      {status}
    </span>
  )
}

export default function ExplorePageClient() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">Medialane · Platform</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">Protocol</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Everything live on Medialane — from creator tools and onchain IP protection to Starknet infrastructure and DAO governance.
        </p>
      </div>

      {features.map((section) => (
        <div key={section.section}>
          <div className="flex items-center gap-3 mb-4">
            <span className={`block w-6 h-0.5 rounded-full ${section.bg}`} />
            <p className={`text-[10px] font-mono uppercase tracking-[0.18em] font-bold ${section.color}`}>
              {section.section}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => {
              const card = (
                <div className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-150 h-full">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <StatusBadge status={item.status} />
                      {item.href && <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors" />}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed flex-1">{item.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 border border-border">{tag}</span>
                    ))}
                  </div>
                </div>
              )
              if (item.href?.startsWith('http')) {
                return <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
              }
              return <div key={item.title}>{card}</div>
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
