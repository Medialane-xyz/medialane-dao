'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { X, ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { navSections } from '@/lib/site-config'

const NAV = navSections.filter((s) => s.href !== '/')

export function SiteMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])
  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Fixed chrome ──────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 pointer-events-none">
        {/* Logo mark */}
        <Link href="/" className="pointer-events-auto shrink-0" aria-label="Medialane home">
          <Image
            src="/medialane-icon.png"
            alt="Medialane"
            width={28}
            height={28}
            className="opacity-80 hover:opacity-100 transition-opacity"
            priority
          />
        </Link>

        {/* Right controls */}
        <div className="pointer-events-auto flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen(true)}
            className="text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </div>

      {/* ── Fullscreen overlay menu ────────────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col">

          {/* Top bar inside overlay */}
          <div className="flex items-center justify-between px-6 py-5 shrink-0">
            <Link href="/" onClick={() => setOpen(false)} className="shrink-0">
              <Image
                src="/medialane-icon.png"
                alt="Medialane"
                width={28}
                height={28}
                className="opacity-80"
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              Close <X className="size-3.5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 flex flex-col justify-center px-8 sm:px-14 gap-1">
            {NAV.map((s) => {
              const isActive = pathname === s.href || (s.href !== '/' && pathname?.startsWith(s.href))
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex items-baseline justify-between py-4 border-b border-border/30 last:border-0"
                >
                  <span className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {s.label}
                  </span>
                  <span className="text-xs text-muted-foreground/50 group-hover:text-muted-foreground transition-colors hidden sm:block">
                    {s.description}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* Bottom bar */}
          <div className="px-8 sm:px-14 py-8 shrink-0 border-t border-border/30 flex items-center justify-between">
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Open App <ArrowUpRight className="size-3.5" />
            </a>
            <span className="text-xs text-muted-foreground/40">medialane.org</span>
          </div>

        </div>
      )}
    </>
  )
}
