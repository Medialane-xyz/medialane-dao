interface StatCardProps {
  label: string
  value: string
  sub?: string
  aurora?: string
  auroraPos?: string
}

export function StatCard({
  label,
  value,
  sub,
  aurora = 'aurora-purple',
  auroraPos = '-bottom-6 -right-6',
}: StatCardProps) {
  return (
    <div className="bento-cell p-5 sm:p-6 relative overflow-hidden">
      <div
        className={`absolute ${auroraPos} w-28 h-28 ${aurora} animate-blob pointer-events-none`}
      />
      <p className="text-xs text-muted-foreground font-medium mb-3 relative z-10">{label}</p>
      <p className="text-4xl sm:text-5xl font-black font-mono tabular-nums text-foreground leading-none relative z-10">
        {value}
      </p>
      {sub && (
        <p className="text-xs text-muted-foreground/60 mt-2 relative z-10">{sub}</p>
      )}
    </div>
  )
}
