'use client'

import { PageHero } from '@/components/page-hero'
import { StatCard } from '@/components/stat-card'
import { AddressRow } from '@/components/address-row'
import { SectionHeader } from '@/components/section-header'
import type { CreatorsFundStatus } from '@/lib/creators-fund'

/** Format a USD number, or `—` when the value is unavailable. */
function usd(value: number | null): string {
  if (value === null) return '—'
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
}

const STEPS = [
  {
    title: 'You buy or sell',
    body: 'Every sale on Medialane has a 1% fee. That fee goes straight to the Creator’s Fund.',
  },
  {
    title: 'The fund fills up',
    body: 'Each time the fund reaches $1,000, that money is ready to go back out to the community.',
  },
  {
    title: 'Everyone gets a share',
    body: 'The $1,000 is airdropped to everyone taking part. Your share is set by your Score Board points — earned by creating, collecting, and trading on Medialane.',
  },
]

export function CreatorsFundClient({ status }: { status: CreatorsFundStatus }) {
  const { totalUsd, progressUsd, nextRoundUsd, readyToDistribute } = status
  const progressPct =
    progressUsd === null ? 0 : Math.min((progressUsd / nextRoundUsd) * 100, 100)

  return (
    <div className="space-y-16">
      <PageHero
        eyebrow="Creator's Fund"
        title="Every dollar comes back to you"
        description="Medialane charges a 1% fee on sales. All of it goes into one public wallet — and all of it is airdropped back to the creators and collectors who use the platform."
      />

      {/* Live status */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="In the fund now" value={usd(totalUsd)} aurora="aurora-blue" />
          <StatCard
            label={readyToDistribute ? 'Status' : 'Next airdrop at'}
            value={readyToDistribute ? 'Ready' : usd(nextRoundUsd)}
            sub={
              readyToDistribute
                ? 'The fund has reached the threshold'
                : `${usd(progressUsd)} of ${usd(nextRoundUsd)}`
            }
            aurora="aurora-purple"
          />
          <StatCard
            label="Airdrops paid"
            value={String(status.roundsPaid)}
            aurora="aurora-rose"
          />
          <StatCard
            label="Returned to community"
            value={usd(status.totalReturnedUsd)}
            aurora="aurora-orange"
          />
        </div>

        {/* Progress bar toward the next round */}
        {!readyToDistribute && (
          <div className="mt-4 bento-cell p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-muted-foreground font-medium">
                Progress to the next $1,000 airdrop
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                {usd(progressUsd)} / {usd(nextRoundUsd)}
              </p>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </section>

      {/* See it yourself — the wallet */}
      <section>
        <SectionHeader label="See it yourself" size="lg" />
        <p className="text-sm text-foreground max-w-2xl mb-5">
          The Creator&apos;s Fund is a public multisig wallet on Starknet. Anyone
          can watch every dollar move in and out — nothing is hidden, nothing is
          promised that the chain can&apos;t prove.
        </p>
        <div className="bento-cell p-5 max-w-2xl">
          <AddressRow label="Creator's Fund wallet" value={status.address} href={status.voyager} />
          {status.tokens.map((t) => (
            <AddressRow
              key={t.symbol}
              label={`Holding (${t.symbol})`}
              value={`${t.balance.toLocaleString('en-US', { maximumFractionDigits: 4 })} ${t.symbol}`}
            />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section>
        <SectionHeader label="How it works" size="lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <div key={step.title} className="bento-cell p-6">
              <p className="text-3xl font-black font-mono text-primary mb-3">{i + 1}</p>
              <p className="font-bold text-foreground mb-2">{step.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-5 max-w-2xl">
          This runs until July 1, 2027. After that, MDLN holders vote each year
          on what happens with the fee.
        </p>
      </section>

      {/* Airdrop history */}
      <section>
        <SectionHeader label="Airdrop history" size="lg" />
        {status.distributions.length === 0 ? (
          <div className="bento-cell p-8 text-center">
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              No airdrops yet. The first round goes out the moment the fund
              reaches $1,000 — it will appear here with its transaction link.
            </p>
          </div>
        ) : (
          <div className="bento-cell overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/60 text-left text-xs text-muted-foreground/60">
                  <th className="p-4 font-medium">Round</th>
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Amount</th>
                  <th className="p-4 font-medium">Participants</th>
                  <th className="p-4 font-medium">Transaction</th>
                </tr>
              </thead>
              <tbody>
                {status.distributions.map((d) => (
                  <tr key={d.round} className="border-b border-border/40 last:border-0">
                    <td className="p-4 font-mono">#{d.round}</td>
                    <td className="p-4 text-muted-foreground">{d.date}</td>
                    <td className="p-4 font-mono">{usd(d.amountUsd)}</td>
                    <td className="p-4 text-muted-foreground">
                      {d.participants.toLocaleString('en-US')}
                    </td>
                    <td className="p-4">
                      <a
                        href={`https://voyager.online/tx/${d.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-mono text-xs"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
