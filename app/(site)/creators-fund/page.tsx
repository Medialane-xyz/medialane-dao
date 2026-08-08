import type { Metadata } from 'next'
import { getCreatorsFundStatus } from '@/lib/creators-fund'
import { CreatorsFundClient } from './page.client'

export const metadata: Metadata = {
  title: "Creator's Fund | Medialane DAO",
  description:
    "Track the Medialane Creator's Fund: the public wallet that collects the 1% platform fee and airdrops it back to creators and collectors.",
}

export default async function CreatorsFundPage() {
  const status = await getCreatorsFundStatus()
  return <CreatorsFundClient status={status} />
}
