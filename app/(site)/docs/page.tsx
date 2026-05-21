import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowUpRight } from 'lucide-react'
import { getAllPosts } from '@/lib/markdown'
import { PageHero } from '@/components/page-hero'
import { SectionHeader } from '@/components/section-header'

export const metadata: Metadata = {
  title: 'Docs | Medialane DAO',
  description: 'DAO founding documents, guidelines, and policies.',
}

const sections = [
  { label: 'Founding Documents', color: 'text-primary',  bg: 'bg-primary',  docs: getAllPosts('dao') },
  { label: 'Legal',              color: 'text-blue-500', bg: 'bg-blue-500', docs: getAllPosts('')    },
]

export default function DocsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-12 lg:py-16 space-y-12">

      <PageHero
        eyebrow="Medialane DAO · Library"
        title="DAO Library"
        description="The Medialane DAO's founding documents, governance charter, community guidelines, and legal policies. Product and protocol documentation lives at docs.medialane.org."
      />

      {sections.map((section) => {
        if (section.docs.length === 0) return null
        return (
          <div key={section.label}>
            <SectionHeader label={section.label} color={section.color} bg={section.bg} className="mb-4" />
            <div className="bento-cell divide-y divide-border/60">
              {section.docs.map((doc) => (
                <Link key={doc.slug} href={`/docs/${doc.slug}`}
                  className="group flex items-center gap-4 px-5 py-4 hover:bg-muted/30 transition-colors">
                  <FileText className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{doc.title}</p>
                    {doc.description && (
                      <p className="text-xs text-muted-foreground/50 mt-0.5 truncate">{doc.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {doc.date && (
                      <span className="text-[11px] font-mono text-muted-foreground/30">
                        {new Date(doc.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    )}
                    <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
