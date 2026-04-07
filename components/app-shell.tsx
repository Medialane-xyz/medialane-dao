'use client'

import { SceneCanvas } from '@/components/three/scene-canvas'
import { SiteNav } from '@/components/site-nav'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SceneCanvas />
      {/* Atmospheric overlay — dark in both themes so 3D canvas always reads under glass */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#020215]/40 via-[#020215]/55 to-[#020215]/70 pointer-events-none" />
      <SiteNav />
      <main className="relative z-10 min-h-screen pb-20 lg:pb-0 lg:pr-20">
        {children}
      </main>
    </>
  )
}
