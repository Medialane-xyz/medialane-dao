import type { NavCommandGroup } from '@medialane/ui'
import { Home, Compass, Landmark, Coins, Wrench, Gift, BookOpen, Mail } from 'lucide-react'

/**
 * Navigation model for the command menu (⌘K). Mirrors the routes in
 * `navSections` (lib/site-config.ts) — site-config stays the source of truth
 * for which pages exist; this file maps them to icons + search keywords for
 * the NavCommandMenu. The first (unheaded) group renders as the emphasized
 * top-level menu.
 */
export const NAV_COMMANDS: NavCommandGroup[] = [
  {
    items: [
      { id: 'home',    label: 'Start',   icon: Home,     href: '/',        keywords: ['home', 'start', 'enter', 'medialane'] },
      { id: 'explore', label: 'Explore', icon: Compass,  href: '/explore', keywords: ['apps', 'features', 'services', 'protocol'] },
      { id: 'dao',     label: 'DAO',     icon: Landmark, href: '/dao',     keywords: ['governance', 'foundation', 'snapshot', 'vote', 'proposals'] },
      { id: 'token',   label: 'Token',   icon: Coins,    href: '/token',   keywords: ['mdln', 'membership', 'tokenomics', 'governance token'] },
    ],
  },
  {
    heading: 'Navigate',
    items: [
      { id: 'build',   label: 'Build',   icon: Wrench,   href: '/build',   keywords: ['sdk', 'contracts', 'developers', 'ai agents'] },
      { id: 'airdrop', label: 'Airdrop', icon: Gift,     href: '/airdrop', keywords: ['creators fund', 'rewards', 'claim', 'distribution'] },
      { id: 'docs',    label: 'Docs',    icon: BookOpen, href: '/docs',    keywords: ['documentation', 'guides', 'protocol docs'] },
      { id: 'connect', label: 'Connect', icon: Mail,     href: '/connect', keywords: ['get involved', 'contact', 'community'] },
    ],
  },
]
