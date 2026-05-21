/**
 * Creator's Fund data layer.
 *
 * Reads the public fund multisig's token balances from a Starknet RPC and
 * token prices from CoinGecko, then derives the airdrop-round status.
 *
 * Discipline (mirrors lib/governance.ts): best-effort, never throws. Anything
 * that cannot be fetched becomes `null` so the UI can render `—`.
 */

export interface Distribution {
  round: number
  date: string
  amountUsd: number
  participants: number
  txHash: string
}

export interface FundToken {
  symbol: string
  balance: number
  /** USD value of the held balance. `null` when the price or balance is unknown. */
  usd: number | null
}

export interface CreatorsFundStatus {
  address: string
  voyager: string
  /** Tokens with a non-zero balance. */
  tokens: FundToken[]
  /** Total USD across all tokens. `null` if any balance/price could not be read. */
  totalUsd: number | null
  /** USD threshold that triggers the next airdrop. */
  nextRoundUsd: number
  /** Progress toward the next round, capped at `nextRoundUsd`. `null` if unknown. */
  progressUsd: number | null
  /** True when the fund has reached the next-round threshold. */
  readyToDistribute: boolean
  /** Number of airdrop rounds already paid out. */
  roundsPaid: number
  /** Total USD returned to the community across all past rounds. */
  totalReturnedUsd: number
  distributions: Distribution[]
}

/** Combine a Starknet u256 call result `[low, high]` into a single bigint. */
export function parseU256(result: string[]): bigint {
  const low = BigInt(result[0] ?? '0x0')
  const high = BigInt(result[1] ?? '0x0')
  return low + (high << 128n)
}

/** Scale a raw on-chain token amount to human units. */
export function toHuman(raw: bigint, decimals: number): number {
  return Number(raw) / 10 ** decimals
}

/**
 * Derive the round-status fields from fetched token data and distributions.
 *
 * `rawTokens` may include zero-balance tokens; they are dropped from the
 * displayed `tokens` list. A token with `usd === null` (failed balance fetch
 * or missing price) forces `totalUsd` to `null` — the page shows `—` rather
 * than an inaccurate number.
 */
export function deriveFundStatus(
  rawTokens: FundToken[],
  distributions: Distribution[],
): Omit<CreatorsFundStatus, 'address' | 'voyager' | 'nextRoundUsd'> {
  const tokens = rawTokens.filter((t) => t.balance > 0)
  const anyValueMissing = rawTokens.some((t) => t.usd === null)
  const totalUsd = anyValueMissing
    ? null
    : tokens.reduce((sum, t) => sum + (t.usd as number), 0)
  const progressUsd = totalUsd === null ? null : Math.min(totalUsd, 1000)
  const readyToDistribute = totalUsd !== null && totalUsd >= 1000
  return {
    tokens,
    totalUsd,
    progressUsd,
    readyToDistribute,
    roundsPaid: distributions.length,
    totalReturnedUsd: distributions.reduce((s, d) => s + d.amountUsd, 0),
    distributions,
  }
}
