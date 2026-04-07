'use client'

import { SceneCanvas } from '@/components/three/scene-canvas'
import { SiteNav } from '@/components/site-nav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SceneCanvas />
      <SiteNav />
      <main className="relative min-h-screen pt-14 pb-20 lg:pb-0">
        {children}
      </main>
    </>
  )
}
