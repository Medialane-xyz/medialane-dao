'use client'

import { usePathname } from 'next/navigation'
import { TopNav } from '@/components/site-nav/TopNav'

export function SiteNav() {
  const pathname = usePathname()
  return <TopNav pathname={pathname} />
}
