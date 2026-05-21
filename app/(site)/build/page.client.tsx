'use client'

import { ArrowUpRight, Code2, Bot, FileText } from 'lucide-react'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'

const destinations = [
  {
    title: 'Developer Hub',
    description: 'The Medialane SDK, REST API, and integration guides — everything to build on the protocol.',
    href: 'https://docs.medialane.org/docs/developers',
    icon: Code2,
  },
  {
    title: 'Smart Contracts',
    description: 'Audited, non-upgradeable Cairo contracts on Starknet — addresses, ABIs, and the security model.',
    href: 'https://docs.medialane.org/docs/contracts',
    icon: FileText,
  },
  {
    title: 'AI Agents',
    description: 'Permissionless access for autonomous agents — any intelligence with a Starknet address is a first-class participant.',
    href: 'https://docs.medialane.org/docs/agents',
    icon: Bot,
  },
]

export default function BuildPageClient() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-12">

      <PageHero
        eyebrow="Medialane · Build"
        title="Build on Medialane"
        description="Medialane is an open, permissionless protocol — anyone, human or AI agent, can build on it. The SDK, contracts, and full developer documentation live at docs.medialane.org."
      >
        <div className="flex items-center gap-4 flex-wrap">
          <a
            href="https://docs.medialane.org/docs/developers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-purple text-white text-sm font-semibold hover:bg-brand-purple/90 transition-colors shadow-sm"
          >
            Developer Docs <ArrowUpRight className="size-4" />
          </a>
          <a
            href="https://github.com/medialane-io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub →
          </a>
        </div>
      </PageHero>

      <div>
        <SectionHeader label="Where to go" className="mb-6" />
        <div className="grid gap-4 sm:grid-cols-3">
          {destinations.map(({ title, description, href, icon: Icon }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group bento-cell p-5 flex flex-col gap-3 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Icon className="size-4" />
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/25 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}
