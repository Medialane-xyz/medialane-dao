'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { navSections } from '@/lib/site-config'

const NAV = navSections.filter((s) => s.href !== '/')

// Ease curve used throughout — fast out, technically precise
const EASE = [0.22, 1, 0.36, 1] as const

export function SiteMenu() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const reduce = useReducedMotion()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Fixed chrome ──────────────────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 pointer-events-none">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="pointer-events-auto"
        >
          <Link href="/" aria-label="Medialane home" className="block opacity-70 hover:opacity-100 transition-opacity duration-200">
            <Image src="/medialane-icon.png" alt="Medialane" width={26} height={26} priority />
          </Link>
        </motion.div>

        {/* Right controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="pointer-events-auto flex items-center gap-4"
        >
          <ThemeToggle />
          <motion.button
            onClick={() => setOpen(true)}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
            whileHover={reduce ? {} : { letterSpacing: '0.28em' }}
            transition={{ duration: 0.25, ease: EASE }}
            aria-label="Open menu"
          >
            Menu
          </motion.button>
        </motion.div>
      </div>

      {/* ── Overlay ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background flex flex-col will-change-transform"
            initial={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 3.5rem) 2.8rem)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'circle(150% at calc(100% - 3.5rem) 2.8rem)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'circle(0% at calc(100% - 3.5rem) 2.8rem)' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* Top bar inside overlay */}
            <div className="flex items-center justify-between px-6 py-5 shrink-0">
              <Link href="/" onClick={() => setOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">
                <Image src="/medialane-icon.png" alt="Medialane" width={26} height={26} />
              </Link>
              <motion.button
                onClick={() => setOpen(false)}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors"
                whileHover={reduce ? {} : { letterSpacing: '0.28em' }}
                transition={{ duration: 0.25, ease: EASE }}
                aria-label="Close menu"
              >
                Close
              </motion.button>
            </div>

            {/* Nav links — stagger after curtain opens */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-14">
              <motion.div
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
                }}
                initial="hidden"
                animate="visible"
              >
                {NAV.map((s) => {
                  const isActive = pathname === s.href || (s.href !== '/' && pathname?.startsWith(s.href))
                  return (
                    <motion.div
                      key={s.href}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
                      }}
                    >
                      <Link
                        href={s.href}
                        className="group flex items-baseline justify-between py-4 border-b border-border/25 last:border-0"
                      >
                        <span className={`text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-150 ${isActive ? 'text-foreground' : 'text-muted-foreground/60 group-hover:text-foreground'}`}>
                          {s.label}
                        </span>
                        <span className="hidden sm:block text-xs text-muted-foreground/30 group-hover:text-muted-foreground/70 transition-colors duration-150">
                          {s.description}
                        </span>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </nav>

            {/* Bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.3 }}
              className="px-8 sm:px-14 py-8 shrink-0 border-t border-border/25 flex items-center justify-between"
            >
              <a
                href="https://medialane.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                Open App
                <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </a>
              <span className="text-[10px] font-mono text-muted-foreground/25">medialane.org</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
