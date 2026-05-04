'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MotionCard } from '@medialane/ui'
import { cn } from '@/lib/utils'

function StatusBadge({ status }: { status: string }) {
  const isLive = ['Live', 'Audited', 'Core'].includes(status)
  const isSoon = status === 'Soon'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase shrink-0',
        isLive
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
          : isSoon
          ? 'bg-muted text-muted-foreground/40'
          : 'bg-primary/10 text-primary'
      )}
    >
      {isLive && <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />}
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
  gradient?: string
  buttonColor?: string
  featured?: boolean
}

function CardInner({
  title,
  description,
  tags,
  href,
  external,
  status,
  icon: Icon,
  iconColor,
  gradient,
  buttonColor,
}: Omit<FeatureCardProps, 'featured'>) {
  const hasLink = !!href

  return (
    <MotionCard
      className={cn(
        'bento-cell flex flex-col gap-4 p-6 h-full relative overflow-hidden',
        'transition-all duration-200',
        hasLink && 'hover:border-border/80',
        gradient && `bg-gradient-to-br ${gradient}`
      )}
    >
      {gradient && (
        <div className={`absolute inset-0 opacity-[0.03] pointer-events-none bg-gradient-to-br ${gradient}`} />
      )}

      <div className="relative z-10 flex flex-col gap-4 flex-1">
        {Icon && (
          <div
            className={cn(
              'flex size-11 items-center justify-center rounded-2xl shrink-0 shadow-sm',
              iconColor ?? 'bg-primary/10 text-primary'
            )}
          >
            <Icon className="size-5" />
          </div>
        )}

        <div className="flex items-start justify-between gap-2">
          <p className={cn('text-xl font-bold text-foreground leading-snug', hasLink && 'group-hover:text-primary transition-colors')}>
            {title}
          </p>
          {status && <StatusBadge status={status} />}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{description}</p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full bg-background/50 border border-border/50 text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {hasLink && (
          <div className="mt-auto pt-2">
            {external ? (
              <a
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center justify-between w-full h-10 px-4 rounded-xl',
                  'text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
                  buttonColor
                    ? `${buttonColor} text-white`
                    : 'border border-border hover:border-primary/40 text-foreground'
                )}
              >
                Open <ArrowRight className="size-3.5" />
              </a>
            ) : (
              <Link
                href={href!}
                className={cn(
                  'flex items-center justify-between w-full h-10 px-4 rounded-xl',
                  'text-sm font-semibold transition-all duration-200 active:scale-[0.98]',
                  buttonColor
                    ? `${buttonColor} text-white`
                    : 'border border-border hover:border-primary/40 text-foreground'
                )}
              >
                Explore <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
        )}
      </div>
    </MotionCard>
  )
}

export function FeatureCard({ featured, ...props }: FeatureCardProps) {
  if (featured) {
    return (
      <div className="p-[1px] rounded-2xl btn-border-animated h-full">
        <div className="rounded-[calc(1rem-1px)] bg-card h-full">
          <CardInner {...props} />
        </div>
      </div>
    )
  }
  return <CardInner {...props} />
}
