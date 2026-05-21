import type { Metadata } from 'next'
import { HeroSection } from '@/components/hero-section'
import { getShowcaseCollections } from '@/lib/showcase'

export const metadata: Metadata = {
  title: 'Medialane | Creator Capital Markets on the Integrity Web',
}

export default async function StartPage() {
  const collections = await getShowcaseCollections()
  return <HeroSection collections={collections} />
}
