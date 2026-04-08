import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowUpRight } from 'lucide-react'
import { getAllPosts } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Docs | Medialane DAO',
  description: 'DAO founding documents, guidelines, and policies.',
}

const sections = [
  { label: 'Governance', color: 'text-violet-500', bg: 'bg-violet-500', docs: getAllPosts('dao') },
  { label: 'Legal',      color: 'text-blue-500',   bg: 'bg-blue-500',   docs: getAllPosts('')    },
]

export default function DocsPage() {
  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">Medialane · Documentation</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">Docs</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          DAO founding documents, governance charter, community guidelines, and legal policies.
        </p>
      </div>

      {sections.map((section) => {
        if (section.docs.length === 0) return null
        return (
          <div key={section.label}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`block w-6 h-0.5 rounded-full ${section.bg}`} />
              <p className={`text-[10px] font-mono uppercase tracking-[0.18em] font-bold ${section.color}`}>
                {section.label}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card divide-y divide-border/60">
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
