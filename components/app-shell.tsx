'use client'

import { SiteNav } from '@/components/site-nav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <main className="relative min-h-screen">
        {children}
      </main>
    </>
  )
}
