export const siteConfig = {
  name: 'Medialane',
  title: 'Medialane DAO',
  description: 'Monetization hub for the integrity web.',
  tagline: 'Creators Capital Markets on the Integrity Web',
  url: 'https://medialane.org',
  email: 'dao@medialane.org',
  snapshot: 'https://snapshot.org/#/s:medialane.eth',
  ens: 'medialane.eth',
} as const

/** MDLN Governance Token — Ethereum mainnet */
export const mdln = {
  symbol: 'MDLN',
  name: 'Medialane',
  totalSupply: 21_000_000,
  decimals: 18,
  network: 'Ethereum Mainnet',
  chainId: 1,
  token: '0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15',
  vesting: '0x912f61d5e6db656ec1a7be8db8957c5f1e345d58',
  treasury: '0xA7603783edD8ee6FF4B085f90Af53341282d244C',
  etherscanToken: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15',
  etherscanVesting: 'https://etherscan.io/address/0x912f61d5e6db656ec1a7be8db8957c5f1e345d58',
  etherscanTreasury: 'https://etherscan.io/address/0xA7603783edD8ee6FF4B085f90Af53341282d244C',
} as const

/** Core Starknet contracts */
export const starknet = {
  network: 'Starknet Mainnet',
  marketplace: '0x0234f4e8838801ebf01d7f4166d42aed9a55bc67c1301162decf9e2040e05f16',
  popFactory: '0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111',
  dropFactory: '0x03587f42e29daee1b193f6cf83bf8627908ed6632d0d83fcb26225c50547d800',
} as const

// brand colors used throughout the app; pulling from a single source makes
// it trivial to adjust the palette without hunting through JSX files.
export const colors = {
  primary: '#0000FF',
  secondary: '#EC796B',
  accent: '#E175B1',
} as const

export type NavSection = {
  label: string
  href: string
  description: string
}

export const navSections: NavSection[] = [
  {
    label: 'Start',
    href: '/',
    description: 'Enter Medialane',
  },
  {
    label: 'Explore',
    href: '/explore',
    description: 'Apps, Features & Services',
  },
  {
    label: 'DAO',
    href: '/dao',
    description: 'Foundation & Governance',
  },
  {
    label: 'Members',
    href: '/members',
    description: 'Membership & Token',
  },
  {
    label: 'Connect',
    href: '/connect',
    description: 'Get involved',
  },
]

/** Camera positions per route for the 3D scene */
export const cameraTargets: Record<string, [number, number, number]> = {
  '/': [0, 0, 8],
  '/explore': [5, 2, 6],
  '/dao': [-4, 3, 7],
  '/members': [0, -2, 5],
  '/connect': [3, -1, 9],
}
