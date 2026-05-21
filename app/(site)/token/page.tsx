import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

const TokenPageClient = dynamic(() => import('./page.client'))

export const metadata: Metadata = {
  title: 'Token | Medialane DAO',
}

// server wrapper (client loaded dynamically)
export default function TokenPage() {
  return <TokenPageClient />
}
