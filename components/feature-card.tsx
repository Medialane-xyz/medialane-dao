import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

function StatusBadge({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase ${
      isLive
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
        : isSoon
        ? 'bg-muted text-muted-foreground/50'
        : 'bg-primary/10 text-primary'
    }`}>
      {isLive && <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />}
      {status}
    </span>
  )
}

interface FeatureCardProps {
  title: string
  description: string
  tags?: string[]
  href?: string | null
  external?: boolean
  status?: string
  icon?: React.ElementType
  iconColor?: string
}

export function FeatureCard({
  title,
  description,
  tags,
  href,
  external,
  status,
  icon: Icon,
  iconColor,
}: FeatureCardProps) {
  const card = (
    <div
      className={`group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card h-full transition-all duration-150 ${
        href ? 'hover:border-primary/30 hover:shadow-sm cursor-pointer' : ''
      }`}
    >
      {Icon && (
        <div className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${iconColor ?? 'bg-primary/10 text-primary'}`}>
          <Icon className="size-4" />
        </div>
      )}
      <div className="flex items-start justify-between gap-2">
        <p className={`text-sm font-semibold text-foreground ${href ? 'group-hover:text-primary transition-colors' : ''}`}>
          {title}
        </p>
        <div className="flex items-center gap-1.5 shrink-0">
          {status && <StatusBadge status={status} />}
          {href && (
            <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors" />
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground/70 leading-relaxed flex-1">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground/60 border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  if (!href) return <div>{card}</div>
  if (external) return <a href={href} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
  return <Link href={href} className="block">{card}</Link>
}
