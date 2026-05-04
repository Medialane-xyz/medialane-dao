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
  /** ERC-721 marketplace v2 — audited, non-upgradeable */
  marketplace721: '0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6',
  /** ERC-1155 marketplace v2 */
  marketplace1155: '0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99',
  /** ERC-721 collection registry */
  collection721: '0x05c49ee5d3208a2c2e150fdd0c247d1195ed9ab54fa2d5dea7a633f39e4b205b',
  /** ERC-1155 collection factory */
  collection1155: '0x006b2dc7ca7c4f466bb4575ba043d934310f052074f849caf853a86bcb819fd6',
  /** Drop collection factory (timed mint with supply cap) */
  dropFactory: '0x03587f42e29daee1b193f6cf83bf8627908ed6632d0d83fcb26225c50547d800',
  /** POP factory (proof-of-participation soulbound credentials) */
  popFactory: '0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111',
  /** Bridged MDLN on Starknet */
  mdlnL2: '0x6730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8',
  starkgateL2Bridge: '0x0616757a151c21f9be8775098d591c2807316d992bbc3bb1a5c1821630589256',
  voyagerMdln: 'https://voyager.online/contract/0x6730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8',
  starkscanMarketplace721: 'https://starkscan.co/contract/0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6',
  starkscanMarketplace1155: 'https://starkscan.co/contract/0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99',
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
    label: 'Build',
    href: '/build',
    description: 'SDK, contracts & AI agents',
  },
  {
    label: 'Airdrop',
    href: '/airdrop',
    description: "Creator's Airdrop",
  },
  {
    label: 'Connect',
    href: '/connect',
    description: 'Get involved',
  },
]

