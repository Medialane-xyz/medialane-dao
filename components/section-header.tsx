interface SectionHeaderProps {
  label: string
  color?: string
  bg?: string
}

export function SectionHeader({ label, color = 'text-muted-foreground/40', bg }: SectionHeaderProps) {
  if (bg) {
    return (
      <div className="flex items-center gap-3 mb-4">
        <span className={`block w-6 h-0.5 rounded-full ${bg}`} />
        <p className={`text-[10px] font-mono uppercase tracking-[0.18em] font-bold ${color}`}>{label}</p>
      </div>
    )
  }
  return (
    <p className={`text-[10px] font-mono uppercase tracking-[0.18em] ${color} mb-4`}>{label}</p>
  )
}
