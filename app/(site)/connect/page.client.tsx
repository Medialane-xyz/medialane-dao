'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Video, Vote, Copy, Check, ArrowUpRight } from 'lucide-react'
import { createContainerVariants, createItemVariants } from '@/lib/motion'

const containerVariants = createContainerVariants()
const itemVariants = createItemVariants()

const socials = [
  {
    name: 'X / Twitter',
    href: 'https://x.com/medialane_xyz',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L5.09 21.75H1.78l7.509-8.58L1.141 2.25H7.96l4.74 6.255 5.544-6.255zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
      </svg>
    ),
    description: 'Follow our latest updates and announcements.',
    accentHex: '#1DA1F2',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@medialanexyz',
    icon: <Video className="size-5" />,
    description: 'Watch tutorials, demos, and community calls.',
    accentHex: '#FF0000',
  },
  {
    name: 'Snapshot',
    href: 'https://snapshot.org/#/s:medialane.eth',
    icon: <Vote className="size-5" />,
    description: 'Participate in governance proposals and voting.',
    accentHex: '#F3B04E',
  },
]

export default function ConnectPageClient() {
  const [hasCopied, setHasCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dao@medialane.org')
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-background px-4 py-14 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full max-w-3xl"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Medialane · Contact
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground leading-[0.95]">
            Connect
          </h1>
          <p className="mt-3 text-muted-foreground text-base max-w-xs leading-relaxed">
            Reach out to the team or find us on the platforms below.
          </p>
        </motion.div>

        {/* Email CTA */}
        <motion.div variants={itemVariants} className="mb-10">
          <div className="rounded-2xl bg-card border border-border p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-ml-orange/10 text-ml-orange">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">Email Us</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Inquiries, partnerships, or support.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto inline-flex justify-center sm:justify-start items-center gap-3 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary ring-1 ring-primary/20 transition-colors hover:bg-primary/15 hover:ring-primary/40 cursor-pointer"
              >
                dao@medialane.org
                <div className="relative flex size-4 items-center justify-center overflow-hidden shrink-0">
                  <AnimatePresence mode="popLayout" initial={false}>
                    {hasCopied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Check className="size-4 text-emerald-500" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <Copy className="size-4 text-primary" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Social platforms */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-1 h-4 rounded-full bg-ml-mauve" />
            <h2 className="text-xs font-bold tracking-[0.16em] uppercase text-foreground">
              Community Platforms
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 p-5 rounded-2xl bg-card border border-border hover:shadow-md hover:border-border/80 transition-all outline-none"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-9 items-center justify-center rounded-lg"
                    style={{ color: social.accentHex, backgroundColor: `${social.accentHex}18` }}
                  >
                    {social.icon}
                  </div>
                  <div className="flex size-7 items-center justify-center rounded-full bg-secondary">
                    <ArrowUpRight
                      className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{social.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{social.description}</p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
