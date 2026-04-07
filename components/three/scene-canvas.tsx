'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const Scene = dynamic(
  () => import('./scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-background" aria-hidden="true" />
    ),
  }
)

export function SceneCanvas() {
  const pathname = usePathname()
  // 3D canvas only on the homepage — other pages use aurora blobs
  if (pathname !== '/') {
    return <div className="fixed inset-0 -z-10 bg-background" aria-hidden="true" />
  }
  return <Scene />
}
