import Image from 'next/image'

interface GraphicSlotProps {
  /** When set, the graphic renders; when unset, a branded placeholder shows. */
  src?: string
  alt?: string
  /** CSS aspect-ratio, e.g. '16/10'. */
  ratio?: string
  /** Placeholder caption shown until a real graphic is dropped in. */
  label?: string
}

/**
 * A slot for the team's future generated graphics. Set `src` to render an
 * image; leave it unset for a tasteful branded placeholder — so graphics can be
 * added later with no rebuild. Both themes.
 */
export function GraphicSlot({ src, alt = '', ratio = '16/10', label = 'Graphic' }: GraphicSlotProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-border/60"
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-brand-purple/15 via-card to-brand-blue/15">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}
