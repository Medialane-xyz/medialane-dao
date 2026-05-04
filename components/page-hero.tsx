interface PageHeroProps {
  eyebrow: string
  title: string
  gradient?: boolean
  description: string
  children?: React.ReactNode
}

export function PageHero({ eyebrow, title, gradient = true, description, children }: PageHeroProps) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">{eyebrow}</p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
        {gradient ? <span className="gradient-text">{title}</span> : title}
      </h1>
      <p className="text-base text-muted-foreground max-w-xl mb-4 leading-relaxed">{description}</p>
      {children}
    </div>
  )
}
