interface StatCardProps {
  label: string
  value: string
  sub?: string
  accent?: string
}

export function StatCard({ label, value, sub, accent = 'border-t-primary' }: StatCardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 flex flex-col gap-1 border-t-2 ${accent}`}>
      <p className="text-xs text-muted-foreground/60 font-medium">{label}</p>
      <p className="text-2xl font-bold font-mono text-foreground">{value}</p>
      {sub && <p className="text-xs text-muted-foreground/50 mt-0.5">{sub}</p>}
    </div>
  )
}
