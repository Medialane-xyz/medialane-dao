'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { navSections } from '@/lib/site-config'
import { ThemeToggle } from '@/components/theme-toggle'
import { ArrowRight, Menu, X } from 'lucide-react'

interface TopNavProps {
  pathname: string
}

const NAV_LINKS = navSections.filter((s) => s.href !== '/')

export function TopNav({ pathname }: TopNavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto flex h-16 items-center px-6">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/medialane.png"
              alt="Medialane"
              width={112}
              height={22}
              className="dark:brightness-200 brightness-0"
              priority
            />
          </Link>

          {/* Desktop links — centered */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((s) => {
              const isActive = pathname === s.href || (s.href !== '/' && pathname?.startsWith(s.href))
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className={cn(
                    'px-3.5 py-1.5 text-sm rounded-lg transition-colors',
                    isActive
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                  )}
                >
                  {s.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            <a
              href="https://medialane.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Launch App <ArrowRight className="size-3" />
            </a>
            <ThemeToggle />
            <button
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="relative z-10 flex flex-col gap-1 px-6 pt-24 pb-8">
            {NAV_LINKS.map((s) => {
              const isActive = pathname === s.href
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className={cn(
                    'flex flex-col px-4 py-4 rounded-xl transition-colors border',
                    isActive
                      ? 'border-primary/30 bg-primary/5 text-foreground'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  )}
                >
                  <span className="font-semibold text-base">{s.label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{s.description}</span>
                </Link>
              )
            })}
            <div className="mt-4 pt-4 border-t border-border/40">
              <a
                href="https://medialane.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Launch App <ArrowRight className="size-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
