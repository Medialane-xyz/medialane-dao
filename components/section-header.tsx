interface SectionHeaderProps {
  label: string
  size?: 'lg' | 'sm'
  color?: string
  bg?: string
  className?: string
}

export function SectionHeader({
  label,
  size = 'sm',
  color,
  bg,
  className = '',
}: SectionHeaderProps) {
  if (size === 'lg') {
    return (
      <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-6 ${className}`}>
        {label}
      </h2>
    )
  }

  if (bg) {
    return (
      <div className={`flex items-center gap-3 mb-5 ${className}`}>
        <span className={`block w-6 h-0.5 rounded-full ${bg} shrink-0`} />
        <p className={`text-xs font-bold uppercase tracking-widest ${color ?? 'text-muted-foreground'}`}>
          {label}
        </p>
      </div>
    )
  }

  return (
    <p className={`text-xs font-bold uppercase tracking-widest ${color ?? 'text-muted-foreground/60'} mb-5 ${className}`}>
      {label}
    </p>
  )
}
