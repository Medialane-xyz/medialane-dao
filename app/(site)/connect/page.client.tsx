'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { Copy, Check, ArrowUpRight } from 'lucide-react'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants(0.08, 0.1)
const itemVariants = createItemVariants({ y: 16, blur: 4, duration: 0.6 })

const socials = [
  {
    name: 'X / Twitter',
    handle: '@medialane_xyz',
    href: 'https://x.com/medialane_xyz',
    description: 'Latest updates, announcements, and community.',
    color: '#1DA1F2',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L5.09 21.75H1.78l7.509-8.58L1.141 2.25H7.96l4.74 6.255 5.544-6.255zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    handle: '@medialanexyz',
    href: 'https://www.youtube.com/@medialanexyz',
    description: 'Tutorials, demos, and community calls.',
    color: '#FF0000',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: 'Snapshot',
    handle: 'medialane.eth',
    href: 'https://snapshot.org/#/s:medialane.eth',
    description: 'Governance proposals and DAO voting.',
    color: '#F3B04E',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden="true">
        <path d="M12.05 0C5.495 0 .18 5.3.18 11.837c0 3.313 1.35 6.302 3.534 8.476l-2.247 3.489 4.181-.898c1.744 1.01 3.78 1.59 5.953 1.59.314 0 .625-.013.933-.038-.015-.18-.024-.362-.024-.546 0-3.986 3.24-7.217 7.235-7.217.39 0 .773.031 1.147.09A11.823 11.823 0 0 0 23.9 11.837C23.9 5.3 18.604 0 12.05 0zm-1.02 16.82l-4.09-4.08 1.41-1.41 2.68 2.67 5.79-5.79 1.41 1.42-7.2 7.19z" />
      </svg>
    ),
  },
]

export default function ConnectPageClient() {
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('dao@medialane.org')
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <div className="min-h-screen px-4 py-14 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-5xl"
      >
        {/* Overline */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-[10px] tracking-[0.22em] uppercase text-white/30 mb-12"
        >
          Medialane · Contact
        </motion.p>

        {/* Main split layout */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">

          {/* Left: Email CTA — dominant */}
          <motion.div
            variants={itemVariants}
            className="lg:flex-[3] rounded-3xl border border-white/8 bg-black/35 backdrop-blur-2xl p-8 sm:p-10 flex flex-col justify-between gap-10 min-h-[340px]"
          >
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-4">Direct</p>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[0.95] mb-5">
                Connect
              </h1>
              <p className="text-white/45 text-base leading-relaxed max-w-sm">
                Reach out for inquiries, partnerships, grant applications, or anything else.
              </p>
            </div>

            <div>
              <button
                onClick={handleCopy}
                className="group flex items-center gap-4 w-full"
              >
                <div className="flex flex-col items-start flex-1">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/25 mb-1">Email</span>
                  <span className="text-2xl sm:text-3xl font-bold text-white group-hover:text-ml-orange transition-colors">
                    dao@medialane.org
                  </span>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 group-hover:border-ml-orange/40 group-hover:bg-ml-orange/10 transition-all">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {hasCopied ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="size-4 text-emerald-400" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy className="size-4 text-white/50 group-hover:text-ml-orange transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right: Social links */}
          <motion.div
            variants={itemVariants}
            className="lg:flex-[2] flex flex-col gap-3"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/30 mb-2">Community</p>

            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-black/25 backdrop-blur-xl px-5 py-4 transition-all hover:border-white/15 hover:bg-black/40"
              >
                <div
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ color: social.color, backgroundColor: `${social.color}18` }}
                >
                  {social.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                    {social.name}
                  </div>
                  <div className="text-[11px] text-white/35 truncate">{social.description}</div>
                </div>
                <ArrowUpRight className="size-4 text-white/20 group-hover:text-white/60 shrink-0 transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
