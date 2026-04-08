import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowUpRight } from 'lucide-react'
import { getAllPosts } from '@/lib/markdown'

export const metadata: Metadata = {
  title: 'Docs | Medialane DAO',
  description: 'DAO founding documents, guidelines, and policies.',
}

const sections = [
  {
    label: 'Governance',
    docs: getAllPosts('dao'),
  },
  {
    label: 'Legal',
    docs: getAllPosts(''),
  },
]

export default function DocsPage() {
  return (
    <div className="p-6 max-w-3xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-1">
          Medialane · Documentation
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-1">Docs</h1>
        <p className="text-sm text-muted-foreground">
          DAO founding documents, governance charter, community guidelines, and legal policies.
        </p>
      </div>

      {sections.map((section) => {
        if (section.docs.length === 0) return null
        return (
          <div key={section.label}>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-3">
              {section.label}
            </p>
            <div className="rounded-xl border border-border bg-card divide-y divide-border/60">
              {section.docs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/docs/${doc.slug}`}
                  className="group flex items-center gap-4 px-4 py-3.5 hover:bg-muted/30 transition-colors"
                >
                  <FileText className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {doc.title}
                    </p>
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
