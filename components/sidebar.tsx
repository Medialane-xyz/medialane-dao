'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Vote, Layers, Coins, BookOpen,
  MessageSquare, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV = [
  { href: '/',        label: 'Overview',    icon: LayoutDashboard },
  { href: '/dao',     label: 'Governance',  icon: Vote            },
  { href: '/explore', label: 'Protocol',    icon: Layers          },
  { href: '/members', label: 'Token',       icon: Coins           },
  { href: '/docs',    label: 'Docs',        icon: BookOpen        },
  { href: '/connect', label: 'Connect',     icon: MessageSquare   },
]

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* ── Desktop sidebar ──────────────────────────────────────────────── */}
      <aside
        className={`hidden md:flex flex-col h-screen sticky top-0 border-r border-border bg-card shrink-0 overflow-hidden transition-[width] duration-200 ease-out ${
          collapsed ? 'w-[60px]' : 'w-[200px]'
        }`}
      >
        {/* Logo + toggle */}
        <div className="flex items-center justify-between px-3 h-14 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-2.5 min-w-0 overflow-hidden">
            <Image src="/medialane-icon.png" alt="" width={22} height={22} className="shrink-0" priority />
            {!collapsed && (
              <span className="text-sm font-semibold text-foreground truncate">medialane</span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="shrink-0 ml-1 text-muted-foreground/40 hover:text-foreground transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="size-4" />
            </button>
          )}
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const active = isActive(item.href, pathname)
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm transition-colors duration-150 ${
                  active
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <item.icon className="size-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="shrink-0 p-2 border-t border-border">
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              className="flex w-full items-center justify-center py-2 text-muted-foreground/40 hover:text-foreground transition-colors"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono text-muted-foreground/30">medialane.org</span>
              <ThemeToggle />
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile bottom nav ────────────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-background/95 backdrop-blur-sm h-14 px-1">
        {NAV.slice(0, 5).map((item) => {
          const active = isActive(item.href, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-[10px] font-medium transition-colors ${
                active ? 'text-primary' : 'text-muted-foreground/50 hover:text-foreground'
              }`}
            >
              <item.icon className="size-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}
