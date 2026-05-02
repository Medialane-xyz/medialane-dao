'use client'

import { useState } from 'react'
import { Mail, Video, Vote, Copy, Check, ArrowUpRight } from 'lucide-react'

const socials = [
  {
    name: 'X / Twitter',
    handle: '@medialane_xyz',
    href: 'https://x.com/medialane_xyz',
    description: 'Latest updates and announcements.',
    color: 'bg-violet-500/10 text-violet-500',
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
    color: 'bg-blue-500/10 text-blue-500',
    icon: <Video className="size-4" />,
  },
  {
    name: 'Snapshot',
    handle: 'medialane.eth',
    href: 'https://snapshot.org/#/s:medialane.eth',
    description: 'Governance proposals and DAO voting.',
    color: 'bg-indigo-500/10 text-indigo-500',
    icon: <Vote className="size-4" />,
  },
]

export default function ConnectPageClient() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('dao@medialane.org')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="px-6 lg:px-10 xl:px-14 py-8 space-y-10">

      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">Medialane · Contact</p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">Connect</span>
        </h1>
        <p className="text-base text-muted-foreground max-w-xl">
          Reach out for inquiries, partnerships, or anything else. Join the community and help shape the future of open IP infrastructure.
        </p>
      </div>

      {/* Email */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
            <Mail className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Email the DAO</p>
            <p className="text-xs text-muted-foreground/60">Inquiries, partnerships, support.</p>
          </div>
        </div>
        <button
          onClick={copyEmail}
          className="flex items-center justify-between w-full rounded-xl border border-border bg-muted/30 px-4 py-3.5 text-sm font-mono text-foreground hover:bg-muted/60 transition-colors group"
        >
          dao@medialane.org
          <span className="flex items-center gap-1.5 text-muted-foreground/50 group-hover:text-foreground transition-colors text-xs">
            {copied ? (
              <>
                <Check className="size-3.5 text-emerald-500" />
                <span className="text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="size-3.5" />
                <span>Copy</span>
              </>
            )}
          </span>
        </button>
      </div>

      {/* Community platforms */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-4">Community Platforms</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {socials.map((s) => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              className="group flex flex-col gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all duration-150">
              <div className="flex items-center justify-between">
                <div className={`flex size-9 items-center justify-center rounded-lg shrink-0 ${s.color}`}>
                  {s.icon}
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</p>
                <p className="text-xs font-mono text-muted-foreground/40 mt-0.5">{s.handle}</p>
                <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed">{s.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-4">Quick Links</p>
        {[
          { label: 'Open App',          href: 'https://medialane.io'                                            },
          { label: 'Snapshot',          href: 'https://snapshot.org/#/s:medialane.eth'                         },
          { label: 'GitHub',             href: 'https://github.com/medialane-io'                               },
          { label: 'GitHub (SDK)',       href: 'https://github.com/medialane-io/medialane-sdk'                  },
          { label: 'Docs',              href: 'https://docs.medialane.io'                                       },
          { label: 'MDLN on Etherscan', href: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15' },
        ].map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-between py-3 border-b border-border/60 last:border-0 text-sm text-muted-foreground/70 hover:text-foreground transition-colors group">
            {l.label}
            <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </div>
  )
}
