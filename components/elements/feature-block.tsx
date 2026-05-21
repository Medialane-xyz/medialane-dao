import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface FeatureBlockProps {
  eyebrow?: string
  title: string
  body: string
  cta?: { label: string; href: string; external?: boolean }
  /** Optional visual rendered beside the text (image, GraphicSlot, etc.). */
  graphic?: React.ReactNode
  tone?: 'purple' | 'blue' | 'orange'
}

const toneText: Record<NonNullable<FeatureBlockProps['tone']>, string> = {
  purple: 'text-brand-purple',
  blue: 'text-brand-blue',
  orange: 'text-brand-orange',
}

/**
 * A large editorial block — one big idea, oversized headline, optional visual.
 * The deliberate opposite of a small generic card.
 */
export function FeatureBlock({ eyebrow, title, body, cta, graphic, tone = 'purple' }: FeatureBlockProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-10 lg:p-12">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          {eyebrow && (
            <p className={`mb-4 text-xs font-bold uppercase tracking-widest ${toneText[tone]}`}>{eyebrow}</p>
          )}
          <h3 className="mb-4 text-3xl font-black leading-[1.05] tracking-tight sm:text-4xl">{title}</h3>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{body}</p>
          {cta && (
            <Link
              href={cta.href}
              {...(cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${toneText[tone]} transition-opacity hover:opacity-80`}
            >
              {cta.label} <ArrowUpRight className="size-4" />
            </Link>
          )}
        </div>
        {graphic && <div className="w-full lg:justify-self-end">{graphic}</div>}
      </div>
    </div>
  )
}
