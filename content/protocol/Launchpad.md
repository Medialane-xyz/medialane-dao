---
title: "Launchpad"
description: "Deploy Collection Drops, ERC-1155 editions, and POP credentials directly from the Medialane launchpad."
date: "2026-05-21"
author: "Medialane DAO"
---

# Launchpad

The Medialane Launchpad provides four launch formats for creators and organizations. All formats deploy audited Cairo smart contracts directly to Starknet Mainnet — no centralized mint server, no admin key, every rule enforced onchain.

---

## Formats at a Glance

| Format | Token Standard | Transferable | Best for |
|--------|---------------|-------------|----------|
| **ERC-721 Collection** | ERC-721 | Yes | Unique 1-of-1 digital art, photography |
| **ERC-1155 Edition** | ERC-1155 | Yes | Music albums, publications, multi-copy editions |
| **Collection Drop** | ERC-721 | Yes | Timed public mints with supply caps and allowlists |
| **POP Credential** | ERC-721 (soulbound) | No | Event attendance, DAO membership, hackathon completion |

---

## ERC-721 Collection

Deploy a branded collection contract where each token is a unique, individually identified digital asset.

### Features
- Factory pattern via the Collection Registry contract
- Each token has its own IPFS metadata URI
- Supports royalty configuration (ERC-2981)
- Compatible with the Medialane marketplace for secondary trading
- Berne Convention timestamp embedded at mint

### Contract
Collection Registry: `0x05c49ee5d3208a2c2e150fdd0c247d1195ed9ab54fa2d5dea7a633f39e4b205b`

---

## ERC-1155 Edition

Deploy a multi-token collection where each token ID can have multiple copies (editions). Ideal for music, publications, limited prints, and any creative work where multiple buyers should hold the same asset.

### Features
- One contract, multiple token IDs and quantities
- Partial listing support — list 5 of your 100 copies at once
- Independent price per token ID on the marketplace
- ERC-1155 receiver hooks for safe transfers
- Metadata resolves from IPFS `base_uri`

### Contract
ERC-1155 Collection Factory: `0x006b2dc7ca7c4f466bb4575ba043d934310f052074f849caf853a86bcb819fd6`

---

## Collection Drop

A timed NFT release with configurable supply, mint window, price, per-wallet limit, and optional allowlists. Every constraint is enforced by the contract — no Medialane backend involvement after deployment.

### Configuration Parameters

| Parameter | Description |
|-----------|-------------|
| `maxSupply` | Hard cap on total tokens that can ever be minted |
| `mintPrice` | Price per token (ERC-20: USDC, USDT, ETH, STRK, WBTC) |
| `startTime` | Unix timestamp when public mint opens |
| `endTime` | Unix timestamp when mint closes |
| `maxPerWallet` | Maximum mints per wallet address |
| `allowlist` | Merkle root of pre-approved addresses (optional) |
| `allowlistPrice` | Discounted price for allowlist wallets (optional) |

### Drop Lifecycle

```
Deploy → Allowlist phase (optional) → Public mint → Mint closes → Secondary trading
```

Once minted, tokens are standard ERC-721 and list freely on the Medialane marketplace.

### Contract
Drop Factory: `0x03587f42e29daee1b193f6cf83bf8627908ed6632d0d83fcb26225c50547d800`

---

## POP Protocol (Proof of Participation)

Soulbound credentials for events, DAO governance, education, and community milestones. POP tokens are non-transferable by design — they represent verifiable onchain proof that cannot be bought or sold.

### Use Cases
- **Events** — conference attendance, concert, workshop participation
- **Education** — bootcamp completion, course certificate
- **DAO membership** — verified contributor status, working group membership
- **Hackathons** — winner and finalist recognition
- **Community milestones** — early adopter, beta tester, governance participation

### Features
- Non-transferable (soulbound): `transfer` reverts
- Gas-free for recipients — organizer sponsors or AVNU paymaster covers fees
- Self-sovereign: credential belongs to the holder's wallet forever; Medialane cannot revoke
- onchain verification: any app or contract can read and verify POP ownership

### Minting a POP Credential

Organizers deploy a POP collection contract, upload credential artwork to IPFS, and define the claim window. Eligible addresses are added to an allowlist (Merkle tree or signature-based). Recipients claim directly to their wallet.

### Contract
POP Factory: `0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111`

---

## Metadata Standard

All Launchpad tokens follow the **OpenSea metadata standard** with Medialane extensions:

```json
{
  "name": "Asset Title",
  "description": "Description of the work",
  "image": "ipfs://Qm...",
  "external_url": "https://medialane.io/asset/...",
  "attributes": [
    { "trait_type": "IP Type", "value": "Music" },
    { "trait_type": "License", "value": "CC BY 4.0" },
    { "trait_type": "Commercial Use", "value": "Allowed" },
    { "trait_type": "AI Training", "value": "Prohibited" },
    { "trait_type": "Derivative Works", "value": "Allowed with attribution" }
  ]
}
```

IP-specific attributes (license, commercial use, AI policy, derivative rights) are machine-readable and indexable by any compatible platform.

---

## Gasless Minting

All Launchpad operations — collection deployment, minting, and drops — are sponsored by Medialane via the AVNU paymaster. Creators and minters need no ETH or STRK to participate.

The launchpad protocol itself is zero-fee — no fee logic lives in the contracts. A 1% fee is applied at the platform layer on launchpad drop mints and marketplace sales alike. For year one it funds the **Creator's Fund** and is airdropped back to the community.
