# Medialane DAO

**medialane.org** — Governance hub for Medialane, the IP infrastructure protocol for the open web.

Built on Starknet. Governed by MDLN token holders. No VCs, no insiders.

---

## What is Medialane?

Medialane is an open protocol for IP registration, licensing, and trade — deployed on Starknet, governed by the MDLN DAO. Creators register works as programmable NFTs with Berne Convention-compliant copyright proof valid in 181 countries. License terms are enforced by immutable Cairo smart contracts, not platform policy.

- **Protocol**: Starknet mainnet (Cairo smart contracts)
- **Governance token**: MDLN on Ethereum mainnet, bridged to Starknet via StarkGate
- **DAO structure**: Utah DAO LLC
- **Snapshot**: [medialane.eth](https://snapshot.org/#/s:medialane.eth)

---

## MDLN Token

| | |
|---|---|
| **Symbol** | MDLN |
| **Supply** | 21,000,000 (fixed forever) |
| **Treasury** | 100% DAO — no VCs, no insiders |
| **Vesting** | 9-year linear unlock (2.1M/year) |
| **Voting** | 1 MDLN = 1 vote (gasless via Snapshot) |
| **L1 (Ethereum)** | `0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15` |
| **L2 (Starknet)** | `0x6730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8` |
| **DAO Treasury** | `0xA7603783edD8ee6FF4B085f90Af53341282d244C` (Gnosis Safe) |
| **Bridge** | [StarkGate](https://starkgate.starknet.io) |
| **Trade on Starknet** | [Ekubo](https://app.ekubo.org) |

---

## Starknet Contracts

| Contract | Address |
|---|---|
| Marketplace v1.1 | `0x0234f4e8838801ebf01d7f4166d42aed9a55bc67c1301162decf9e2040e05f16` |
| POP Factory | `0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111` |
| Drop Factory | `0x03587f42e29daee1b193f6cf83bf8627908ed6632d0d83fcb26225c50547d800` |
| MDLN (bridged) | `0x6730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8` |

---

## Why Starknet

- **ZK-STARK proofs** — every transaction batch verified on Ethereum. Trustless.
- **STWO prover** — next-gen Cairo prover for faster finality and lower cost.
- **Recursive proofs** — unlimited scale while maintaining cryptographic integrity.
- **Native account abstraction** — session keys (SNIP-9) enable gasless multi-step flows.
- **Sponsored transactions** — Medialane covers gas for most creator actions.
- **Fraction-of-cent fees** — Starknet L2 costs orders of magnitude less than Ethereum mainnet.

---

## Site Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Theme | next-themes (dark default) |
| Fonts | Space Grotesk + Geist Mono |
| Content | Markdown via gray-matter + remark |
| Governance data | Snapshot API (Revalidate 1h) |
| Analytics | Vercel Analytics |
| Deploy | medialane.org |

---

## Development

```bash
pnpm install
pnpm dev        # localhost:3000
pnpm build      # production build
pnpm lint
```

### Adding governance documents

Drop a `.md` file in `content/dao/` with frontmatter:

```yaml
---
title: Document Title
date: YYYY-MM-DD
author: Medialane DAO
description: One-line summary
---
```

It will appear automatically in `/dao` and `/docs`.

---

## Pages

| Route | Description |
|---|---|
| `/` | Overview — protocol, stats, token, contracts, principles |
| `/dao` | Governance — Snapshot proposals, voting, founding documents |
| `/explore` | Protocol — create, marketplace, launchpad, developer, IP protection, Starknet infra |
| `/members` | MDLN token — tokenomics, distribution, bridge, Starknet benefits, membership tiers |
| `/connect` | Contact — email, socials, quick links |
| `/docs` | All founding documents index |
| `/docs/[slug]` | Individual document viewer |

---

## Links

- Site: [medialane.org](https://medialane.org)
- App: [medialane.io](https://medialane.io)
- Snapshot: [snapshot.org/#/s:medialane.eth](https://snapshot.org/#/s:medialane.eth)
- Voyager (MDLN L2): [voyager.online/contract/0x6730d6a3...](https://voyager.online/contract/0x6730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8)
- X: [@medialane_xyz](https://x.com/medialane_xyz)

---

© 2026 Medialane DAO · Utah DAO LLC
