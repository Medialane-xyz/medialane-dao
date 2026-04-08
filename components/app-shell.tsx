'use client'

import { SiteMenu } from '@/components/site-menu'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteMenu />
      <main className="relative min-h-screen">
        {children}
      </main>
    </>
  )
}
