import type { Metadata } from 'next'
import BuildPageClient from './page.client'

export const metadata: Metadata = {
  title: 'Build | Medialane DAO',
  description: 'SDK, contracts, and permissionless API access for developers and autonomous AI agents building on the Medialane protocol.',
}

export default function BuildPage() {
  return <BuildPageClient />
}
