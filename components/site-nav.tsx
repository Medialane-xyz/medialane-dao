'use client'

import { usePathname } from 'next/navigation'
import { TopNav } from '@/components/site-nav/TopNav'
import { MobileBar } from '@/components/site-nav/MobileBar'

export function SiteNav() {
  const pathname = usePathname()
  return (
    <>
      <TopNav pathname={pathname} />
      <MobileBar pathname={pathname} />
    </>
  )
}
