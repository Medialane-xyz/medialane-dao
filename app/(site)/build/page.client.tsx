'use client'

import Link from 'next/link'
import { ArrowUpRight, Code2, FileCode2, Boxes, Zap, Bot, Shield } from 'lucide-react'
import { starknet } from '@/lib/site-config'
import { Stagger, StaggerItem } from '@medialane/ui'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'
import { FeatureCard } from '@/components/feature-card'

const sdkCapabilities = [
  {
    title: 'API Client',
    status: 'v0.14',
    icon: Code2,
    iconColor: 'bg-brand-purple/10 text-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    description: 'Full REST API coverage — orders, tokens, collections, activity feeds, and user portfolios. TypeScript-first with inferred return types.',
    tags: ['TypeScript', 'ESM + CJS', 'No runtime deps'],
    href: '/docs/SDK',
    external: false,
  },
  {
    title: 'SNIP-12 Typed Data',
    status: 'Live',
    icon: FileCode2,
    iconColor: 'bg-brand-blue/10 text-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    description: 'Order signing helpers for ERC-721 and ERC-1155 marketplaces. Build, sign, and submit listings and offers without manual ABI encoding.',
    tags: ['SNIP-12', 'ERC-721', 'ERC-1155'],
    href: '/docs/SDK',
    external: false,
  },
  {
    title: 'Contract ABIs & Addresses',
    status: 'Audited',
    icon: Boxes,
    iconColor: 'bg-brand-purple/10 text-brand-purple',
    gradient: 'from-brand-purple/10 to-transparent',
    buttonColor: 'bg-brand-purple',
    description: 'All mainnet contract addresses and Cairo ABIs exported directly from the SDK. No copy-pasting hex strings from block explorers.',
    tags: ['Cairo', 'Starknet Mainnet', 'Non-upgradeable'],
    href: '/docs/Contracts',
    external: false,
  },
  {
    title: 'IP Metadata Schema',
    status: 'Live',
    icon: Shield,
    iconColor: 'bg-brand-blue/10 text-brand-blue',
    gradient: 'from-brand-blue/10 to-transparent',
    buttonColor: 'bg-brand-blue',
    description: 'Berne Convention-aligned TypeScript types for digital assets. 12 IP categories, 9 Creative Commons variants, AI training policy fields.',
    tags: ['Berne Convention', 'CC0/CC BY', 'AI Policy'],
    href: '/docs/IP-Assets',
    external: false,
  },
]

const aiAgentCapabilities = [
  {
    title: 'Permissionless Access',
    icon: Bot,
    color: 'bg-brand-purple/10 text-brand-purple',
    body: 'Any intelligence with a Starknet address can interact with the protocol — no KYC, no API keys, no gatekeeping. AI agents are first-class participants.',
  },
  {
    title: 'Account Abstraction',
    icon: Zap,
    color: 'bg-brand-blue/10 text-brand-blue',
    body: 'Starknet wallets are smart contracts. AI agents can deploy their own accounts, sign transactions programmatically, and use session keys for batch operations.',
  },
  {
    title: 'Sponsored Gas',
    icon: Shield,
    color: 'bg-brand-purple/10 text-brand-purple',
    body: 'Medialane sponsors gas fees for creator actions via native paymaster. AI agents minting digital assets pay zero gas — no ETH required to start.',
  },
]

const contracts = [
  { label: 'ERC-721 Marketplace v2',      address: starknet.marketplace721,  href: starknet.starkscanMarketplace721  },
  { label: 'ERC-1155 Marketplace v2',     address: starknet.marketplace1155, href: starknet.starkscanMarketplace1155 },
  { label: 'ERC-721 Collection Registry', address: starknet.collection721,   href: `https://voyager.online/contract/${starknet.collection721}` },
  { label: 'ERC-1155 Collection Factory', address: starknet.collection1155,  href: `https://voyager.online/contract/${starknet.collection1155}` },
  { label: 'Drop Factory',                address: starknet.dropFactory,     href: `https://voyager.online/contract/${starknet.dropFactory}` },
  { label: 'POP Factory',                 address: starknet.popFactory,      href: `https://voyager.online/contract/${starknet.popFactory}` },
]

const protocolDocs = [
  { title: 'Getting Started',  slug: 'Getting-Started', description: 'First asset in minutes. Gasless. No registration.' },
  { title: 'IP Assets',        slug: 'IP-Assets',       description: '12 IP types, licensing terms, Berne Convention proof.' },
  { title: 'Marketplace',      slug: 'Marketplace',     description: 'Trading mechanics, SNIP-12 orders, royalties.' },
  { title: 'Launchpad',        slug: 'Launchpad',       description: 'Timed drops, editions, POP credentials.' },
  { title: 'Contracts',        slug: 'Contracts',       description: 'All Starknet contract addresses and ABI reference.' },
  { title: 'SDK Reference',    slug: 'SDK',             description: 'Full TypeScript SDK method listing and examples.' },
]

export default function BuildPageClient() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-12">

      <PageHero
        eyebrow="Medialane · Developer"
        title="Build"
        description="Open protocol. Permissionless access. TypeScript SDK, audited Cairo contracts, and a REST API — available to any developer or autonomous AI agent on Starknet."
      >
        <div className="flex items-center gap-4 flex-wrap mt-2">
          <a
            href="https://github.com/medialane-io/medialane-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple/90 transition-colors shadow-sm"
          >
            View on GitHub <ArrowUpRight className="size-4" />
          </a>
          <Link
            href="/docs/Getting-Started"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Read the docs →
          </Link>
        </div>
      </PageHero>

      {/* Quick install */}
      <div className="bento-cell p-6 max-w-2xl">
        <SectionHeader label="Install" />
        <pre className="text-xs font-mono text-foreground/80 leading-relaxed bg-muted/50 rounded-lg p-4 overflow-x-auto">
          <code>{`npm install @medialane/sdk
# or
bun add @medialane/sdk`}</code>
        </pre>
        <pre className="text-xs font-mono text-foreground/80 leading-relaxed bg-muted/50 rounded-lg p-4 mt-3 overflow-x-auto">
          <code>{`import { MedialaneClient } from '@medialane/sdk'

const client = new MedialaneClient({
  apiUrl: 'https://api.medialane.io',
})

// Fetch active listings
const { data: orders } = await client.api.getOrders({
  status: 'ACTIVE',
  offerItemType: 'ERC721',
  limit: 20,
})`}</code>
        </pre>
      </div>

      {/* SDK capabilities */}
      <div>
        <SectionHeader label="SDK" color="text-brand-purple" bg="bg-brand-purple" className="mb-6" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sdkCapabilities.map((item) => (
            <StaggerItem key={item.title}>
              <FeatureCard {...item} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* AI Agent access */}
      <div>
        <SectionHeader label="AI Agents" color="text-brand-blue" bg="bg-brand-blue" className="mb-6" />
        <Stagger className="grid sm:grid-cols-3 gap-4">
          {aiAgentCapabilities.map(({ icon: Icon, color, title, body }) => (
            <StaggerItem key={title}>
              <div className="flex flex-col gap-3 p-5 bento-cell h-full">
                <div className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${color}`}>
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1.5">{title}</p>
                  <p className="text-sm text-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Protocol contracts */}
      <div>
        <SectionHeader label="Starknet Contracts · Mainnet" color="text-brand-purple" bg="bg-brand-purple" className="mb-6" />
        <div className="bento-cell divide-y divide-border/60">
          {contracts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground group-hover:text-brand-purple transition-colors">{c.label}</p>
                <p className="text-[11px] font-mono text-muted-foreground/40 mt-0.5 truncate">{c.address.slice(0, 20)}…{c.address.slice(-6)}</p>
              </div>
              <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-brand-purple transition-colors shrink-0 ml-4" />
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/40 mt-2 font-mono">All contracts are non-upgradeable by design. Audited.</p>
      </div>

      {/* Protocol docs */}
      <div>
        <SectionHeader label="Protocol Docs" color="text-brand-blue" bg="bg-brand-blue" className="mb-6" />
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {protocolDocs.map((doc) => (
            <StaggerItem key={doc.slug}>
              <Link
                href={`/docs/${doc.slug}`}
                className="group flex flex-col gap-2 p-5 bento-cell hover:border-brand-blue/40 hover:shadow-sm transition-all duration-150 h-full"
              >
                <p className="text-sm font-semibold text-foreground group-hover:text-brand-blue transition-colors">{doc.title}</p>
                <p className="text-sm text-foreground leading-relaxed flex-1">{doc.description}</p>
                <p className="text-[11px] text-brand-blue/60 font-medium">Read →</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

    </div>
  )
}
