'use client'

import { useState } from 'react'
import { Mail, Video, Vote, Copy, Check, ArrowUpRight } from 'lucide-react'

const socials = [
  {
    name: 'X / Twitter',
    handle: '@medialane_xyz',
    href: 'https://x.com/medialane_xyz',
    description: 'Latest updates and announcements.',
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
    icon: <Video className="size-4" />,
  },
  {
    name: 'Snapshot',
    handle: 'medialane.eth',
    href: 'https://snapshot.org/#/s:medialane.eth',
    description: 'Governance proposals and DAO voting.',
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
    <div className="p-6 max-w-3xl space-y-8">

      {/* Header */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/40 mb-1">
          Medialane · Contact
        </p>
        <h1 className="text-2xl font-bold text-foreground mb-1">Connect</h1>
        <p className="text-sm text-muted-foreground">
          Reach out for inquiries, partnerships, or anything else.
        </p>
      </div>

      {/* Email */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
            <Mail className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Email the DAO</p>
            <p className="text-xs text-muted-foreground/60">Inquiries, partnerships, support.</p>
          </div>
        </div>
        <button
          onClick={copyEmail}
          className="flex items-center justify-between w-full rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-mono text-foreground hover:bg-muted/60 transition-colors group"
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
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-3">
          Community Platforms
        </p>
        <div className="grid sm:grid-cols-3 gap-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:bg-primary/5 transition-all duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {s.icon}
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground/20 group-hover:text-primary transition-colors" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="text-xs font-mono text-muted-foreground/50">{s.handle}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{s.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-muted-foreground/40 mb-3">
          Quick Links
        </p>
        <div className="space-y-0">
          {[
            { label: 'Open App',          href: 'https://medialane.io',                         external: true },
            { label: 'Snapshot',          href: 'https://snapshot.org/#/s:medialane.eth',       external: true },
            { label: 'GitHub (SDK)',       href: 'https://github.com/medialane-io/medialane-sdk', external: true },
            { label: 'MDLN on Etherscan', href: 'https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15', external: true },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3 border-b border-border/60 last:border-0 text-sm text-muted-foreground/70 hover:text-foreground transition-colors group"
            >
              {l.label}
              <ArrowUpRight className="size-3.5 text-muted-foreground/20 group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
