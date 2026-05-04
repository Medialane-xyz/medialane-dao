import type { Metadata } from 'next'
import AirdropPageClient from './page.client'

export const metadata: Metadata = {
  title: "Creator's Airdrop | Medialane DAO",
  description: "Platform revenue governed by MDLN holders. Creator's Airdrop is one option — along with buybacks, burns, and development. Community decides each cycle.",
}

export default function AirdropPage() {
  return <AirdropPageClient />
}
