import type { Metadata } from 'next'
import { HeroSection } from '@/components/hero-section'

export const metadata: Metadata = {
  title: 'Medialane | Creator Capital Markets on the Integrity Web',
}

export default function StartPage() {
  return <HeroSection />
}
