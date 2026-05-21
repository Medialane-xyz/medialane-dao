interface EditorialSplitProps {
  eyebrow?: string
  title: string
  body: React.ReactNode
  /** The visual half — image, GraphicSlot, stat, etc. */
  visual: React.ReactNode
  /** Put the visual on the left instead of the right. */
  reverse?: boolean
}

/**
 * Two-column editorial layout: text beside a visual. Stacks on mobile.
 * Used to break up the page rhythm — not every section is a card grid.
 */
export function EditorialSplit({ eyebrow, title, body, visual, reverse }: EditorialSplitProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div className={reverse ? 'lg:order-2' : ''}>
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">{eyebrow}</p>
        )}
        <h3 className="mb-4 text-2xl font-black leading-tight tracking-tight sm:text-3xl">{title}</h3>
        <div className="space-y-3 text-base leading-relaxed text-muted-foreground">{body}</div>
      </div>
      <div className={reverse ? 'lg:order-1' : ''}>{visual}</div>
    </div>
  )
}
