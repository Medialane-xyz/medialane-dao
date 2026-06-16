# Medialane DAO

**medialane.org** — Governance app for Medialane, the creator capital markets platform built on the Integrity Web.


---

## What is Medialane?

Medialane is a monetization layer for creators, collectors, organizations, and autonomous AI — deployed onchain, governed by the Medialane DAO. Creators mint and monetize digital assets as programmable NFTs. Every mint timestamps the work under the Berne Convention — instant copyright proof in 181 countries.

- **Protocols**: Zero knowledge proof with immutable Cairo smart contracts on Starknet mainnet
- **Governance**: [medialane.eth](https://snapshot.org/#/s:medialane.eth)

---

## MDLN Token

| | |
|---|---|
| **Symbol** | MDLN |
| **Supply** | 21,000,000 (fixed forever) |
| **Treasury** | 100% DAO-controlled (no VC, no team allocation) |
| **Vesting** | 9-year linear unlock (2.1M/year) |
| **Voting** | 1 MDLN = 1 vote (gasless via Snapshot) |
| **L1 (Ethereum)** | `0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15` |
| **L2 (Starknet)** | `0x06730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8` |
| **DAO Treasury** | `0xA7603783edD8ee6FF4B085f90Af53341282d244C` (Gnosis Safe) |
| **Vesting Contract** | `0x912f61d5e6db656ec1a7be8db8957c5f1e345d58` |
| **Bridge** | [StarkGate](https://starkgate.starknet.io) |

---

## Starknet Contracts

| Contract | Address |
|---|---|
| Marketplace (ERC-721) | `0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6` |
| Marketplace (ERC-1155) | `0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99` |
| Collection Registry (ERC-721) | `0x05c49ee5d3208a2c2e150fdd0c247d1195ed9ab54fa2d5dea7a633f39e4b205b` |
| Collection Factory (ERC-1155) | `0x006b2dc7ca7c4f466bb4575ba043d934310f052074f849caf853a86bcb819fd6` |
| Drop Factory | `0x03587f42e29daee1b193f6cf83bf8627908ed6632d0d83fcb26225c50547d800` |
| POP Factory | `0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111` |
| MDLN (bridged) | `0x06730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8` |

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

| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| UI Components | `@medialane/ui` (shared component library) + shadcn/ui primitives |
| Content | Markdown via gray-matter + remark |
| Package manager | bun |
| Deploy | medialane.org |

---

## Development

```bash
bun install
bun dev         # localhost:3000
bun run build   # production build
bun lint
```

### Adding content

**Governance / founding documents** — drop a `.md` file in `content/dao/`:

```yaml
---
title: Document Title
date: YYYY-MM-DD
author: Medialane DAO
description: One-line summary
---
```

Founding documents in `content/dao/` are indexed by AI agents via `llms.txt`. (Protocol/developer documentation lives on [docs.medialane.io](https://docs.medialane.io), not here.)

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — what Medialane is, the four pillars, "What you can count on" (the foundational guarantees), current launchpad services, Creator's Airdrop callout |
| `/explore` | What you can do — create, trade, launch, protect your rights, build (open to people and AI agents) |
| `/dao` | Governance — live Snapshot proposals, how to vote, founding documents |
| `/token` | The MDLN token — distribution, how to take part, where to get it (was `/members`) |
| `/airdrop` | The Creator's Airdrop — how revenue flows back to the community |
| `/creators-fund` | Creator's Fund dashboard — live multi-token balance, tip the fund (was `/airdrop/fund`) |
| `/build` | Developer signpost into docs.medialane.io |
| `/connect` | Contact — email, socials, quick links |
| `/guidelines`, `/guidelines/[slug]` | The DAO library — founding + legal documents (was `/docs`) |

---

## AI Agent Files

- **`AGENTS.md`** — authoritative guidance for agentic workers (file map, conventions, common tasks)
- **`llms.txt`** — machine-readable protocol summary for LLM consumption

---

## Links

- Site: [medialane.org](https://medialane.org)
- App: [medialane.io](https://medialane.io)
- Docs: [docs.medialane.io](https://docs.medialane.io)
- Snapshot: [snapshot.org/#/s:medialane.eth](https://snapshot.org/#/s:medialane.eth)
- GitHub: [github.com/medialane-io](https://github.com/medialane-io)
- X: [@medialane_io](https://x.com/medialane_io)
- YouTube: [@medialaneio](https://www.youtube.com/@medialaneio)

---

© 2026 Medialane DAO
