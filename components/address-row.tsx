import { ExternalLink } from 'lucide-react'

export function AddressRow({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border/60 last:border-0 gap-4">
      <span className="text-xs text-muted-foreground/60 shrink-0">{label}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-mono text-foreground/70 hover:text-primary transition-colors truncate">
          {value} <ExternalLink className="size-3 shrink-0 opacity-40" />
        </a>
      ) : (
        <span className="text-xs font-mono text-foreground/70 truncate text-right">{value}</span>
      )}
    </div>
  )
}
