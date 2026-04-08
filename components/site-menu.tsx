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
const EASE = [0.76, 0, 0.24, 1] as const   // expo in-out — precise and decisive

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
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 sm:px-8 py-5 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pointer-events-auto"
        >
          <Link href="/" aria-label="Home" className="block opacity-60 hover:opacity-100 transition-opacity duration-200">
            <Image src="/medialane-icon.png" alt="" width={24} height={24} priority />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="pointer-events-auto flex items-center gap-4"
        >
          <ThemeToggle />
          <motion.button
            onClick={() => setOpen(true)}
            className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60 hover:text-foreground transition-colors duration-200 overflow-hidden group"
            aria-label="Open navigation"
          >
            <span className="relative">Menu</span>
            {/* underline wipe on hover */}
            <span className="absolute bottom-0 left-0 h-px w-full bg-foreground scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />
          </motion.button>
        </motion.div>
      </div>

      {/* ── Fullscreen overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-background flex flex-col overflow-hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
            exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 shrink-0">
              <Link href="/" onClick={() => setOpen(false)} className="opacity-60 hover:opacity-100 transition-opacity">
                <Image src="/medialane-icon.png" alt="" width={24} height={24} />
              </Link>
              <motion.button
                onClick={() => setOpen(false)}
                className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/60 hover:text-foreground transition-colors duration-200 overflow-hidden group"
              >
                Close
                <span className="absolute bottom-0 left-0 h-px w-full bg-foreground scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)]" />
              </motion.button>
            </div>

            {/* Nav — stagger after curtain lands */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-14 lg:px-20">
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}
                initial="hidden"
                animate="visible"
              >
                {NAV.map((s, i) => {
                  const isActive = pathname === s.href || (s.href !== '/' && pathname?.startsWith(s.href))
                  return (
                    <motion.div
                      key={s.href}
                      variants={{
                        hidden: { opacity: 0, y: 24 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                      }}
                    >
                      <Link
                        href={s.href}
                        className="group flex items-center justify-between py-5 border-b border-border/20 last:border-0"
                      >
                        <div className="flex items-baseline gap-5">
                          <span className="text-[10px] font-mono text-muted-foreground/20 w-6 tabular-nums">
                            0{i + 1}
                          </span>
                          <span className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-colors duration-200 ${isActive ? 'text-foreground' : 'text-muted-foreground/40 group-hover:text-foreground'}`}>
                            {s.label}
                          </span>
                        </div>
                        <ArrowUpRight className={`size-5 transition-all duration-200 ${isActive ? 'text-primary opacity-100' : 'text-muted-foreground/20 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-0 group-hover:opacity-100'}`} />
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="px-8 sm:px-14 lg:px-20 py-8 shrink-0 border-t border-border/20 flex items-center justify-between"
            >
              <a
                href="https://medialane.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-sm font-medium text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
              >
                Open App <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
              </a>
              <span className="text-[10px] font-mono text-muted-foreground/20">medialane.org</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
