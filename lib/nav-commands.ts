import type { NavCommandGroup } from '@medialane/ui'
import { Home, Compass, Landmark, Gift, ShieldCheck, Coins, Wrench, BookOpen, Mail } from 'lucide-react'

/**
 * Navigation model for the command menu (⌘K). The first (unheaded) group is
 * the emphasized primary menu; the "Navigate" group is secondary.
 */
export const NAV_COMMANDS: NavCommandGroup[] = [
  {
    items: [
      { id: 'home',       label: 'Start',      icon: Home,       href: '/',           keywords: ['home', 'start', 'medialane'] },
      { id: 'explore',    label: 'Explore',    icon: Compass,    href: '/explore',    keywords: ['features', 'protocol', 'what is medialane'] },
      { id: 'dao',        label: 'DAO',        icon: Landmark,   href: '/dao',        keywords: ['governance', 'foundation', 'snapshot', 'vote', 'proposals'] },
      { id: 'airdrop',    label: 'Airdrop',    icon: Gift,       href: '/airdrop',    keywords: ['creators fund', 'rewards', 'claim', 'distribution'] },
      { id: 'guidelines', label: 'Guidelines', icon: ShieldCheck, href: '/guidelines', keywords: ['community', 'compliance', 'rules', 'conduct', 'constitution', 'legal'] },
    ],
  },
  {
    heading: 'Navigate',
    items: [
      { id: 'token',   label: 'Token',   icon: Coins,    href: '/token',   keywords: ['mdln', 'tokenomics', 'governance token'] },
      { id: 'build',   label: 'Build',   icon: Wrench,   href: '/build',   keywords: ['sdk', 'developers', 'ai agents'] },
      {
        id: 'docs',
        label: 'Docs',
        icon: BookOpen,
        action: () => window.open('https://docs.medialane.io', '_blank', 'noopener,noreferrer'),
        keywords: ['documentation', 'guides', 'how to', 'learn'],
      },
      { id: 'connect', label: 'Connect', icon: Mail,     href: '/connect', keywords: ['get involved', 'contact', 'community'] },
    ],
  },
]
