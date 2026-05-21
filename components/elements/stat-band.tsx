interface Stat {
  value: string
  label: string
}

/**
 * A band of featured numbers — numbers presented as a feature, not buried in
 * cards. Full-width within its container; works in both themes.
 */
export function StatBand({ stats }: { stats: Stat[] }) {
  return (
    <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-brand-purple/8 via-card to-brand-blue/8 px-6 py-10 sm:px-10">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-mono text-4xl font-black leading-none tabular-nums gradient-text sm:text-5xl">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
