'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navSections } from '@/lib/site-config'
import { ThemeToggle } from '@/components/theme-toggle'

interface TopNavProps {
  pathname: string
}

export function TopNav({ pathname }: TopNavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="flex h-full items-center px-4 lg:px-6 max-w-7xl mx-auto gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 mr-2">
          <Image
            src="/medialane.png"
            alt="Medialane"
            width={120}
            height={25}
            className="dark:brightness-200 brightness-0"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1" aria-label="Main navigation">
          {navSections.map((section) => {
            const isActive = pathname === section.href
            return (
              <Link
                key={section.href}
                href={section.href}
                className={cn(
                  'relative px-3 py-1.5 text-sm rounded-md transition-colors',
                  isActive
                    ? 'text-foreground font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                )}
              >
                {section.label}
                {isActive && (
                  <motion.div
                    layoutId="top-nav-indicator"
                    className="absolute inset-x-0 -bottom-[9px] h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
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
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
          >
            Launch App
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
