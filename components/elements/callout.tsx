/**
 * A pull-quote / emphasis callout — for the one line that should land.
 * Brand-gradient accent bar; works in both themes.
 */
export function Callout({
  children,
  attribution,
}: {
  children: React.ReactNode
  attribution?: string
}) {
  return (
    <figure className="relative max-w-3xl">
      <span
        aria-hidden
        className="absolute bottom-0 left-0 top-0 w-1 rounded-full bg-gradient-to-b from-brand-purple to-brand-blue"
      />
      <blockquote className="pl-6 sm:pl-8">
        <p className="text-xl font-bold leading-snug tracking-tight text-foreground sm:text-2xl">
          {children}
        </p>
        {attribution && (
          <figcaption className="mt-3 text-sm text-muted-foreground">— {attribution}</figcaption>
        )}
      </blockquote>
    </figure>
  )
}
