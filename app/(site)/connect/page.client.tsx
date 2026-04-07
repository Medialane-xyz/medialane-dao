'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Video, Vote, Copy, Check, ArrowUpRight } from 'lucide-react'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants(0.08, 0.05)
const itemVariants = createItemVariants({ y: 14, duration: 0.5 })

const socials = [
  {
    name: 'X / Twitter',
    handle: '@medialane_xyz',
    href: 'https://x.com/medialane_xyz',
    description: 'Latest updates and announcements.',
    color: '#1DA1F2',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
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
    icon: <Video className="size-4" />,
  },
  {
    name: 'Snapshot',
    handle: 'medialane.eth',
    href: 'https://snapshot.org/#/s:medialane.eth',
    description: 'Governance proposals and DAO voting.',
    color: '#F3B04E',
    icon: <Vote className="size-4" />,
  },
]

export default function ConnectPageClient() {
  const [hasCopied, setHasCopied] = useState(false)

  return (
    <div className="relative min-h-screen bg-background px-4 py-10 lg:px-6 overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="aurora-blob aurora-orange absolute top-1/3 right-1/4 h-72 w-72" />
        <div className="aurora-blob aurora-mauve  absolute bottom-1/4 left-1/3 h-56 w-56" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-10">
          <p className="section-label mb-2">Medialane · Contact</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">Connect</h1>
          <p className="mt-2 text-muted-foreground">
            Reach out for inquiries, partnerships, or anything else.
          </p>
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email the DAO</p>
                  <p className="text-sm text-muted-foreground">Inquiries, partnerships, support.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('dao@medialane.org')
                  setHasCopied(true)
                  setTimeout(() => setHasCopied(false), 2000)
                }}
                className="flex items-center gap-2.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors cursor-pointer w-full sm:w-auto justify-center"
              >
                dao@medialane.org
                <div className="size-4 relative overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {hasCopied ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="size-4 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy className="size-4 text-muted-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Socials */}
        <motion.div variants={itemVariants}>
          <h2 className="text-sm font-semibold text-foreground mb-4">Community Platforms</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-card shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-8 items-center justify-center rounded-lg"
                    style={{ color: s.color, backgroundColor: `${s.color}18` }}
                  >
                    {s.icon}
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">{s.handle}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
