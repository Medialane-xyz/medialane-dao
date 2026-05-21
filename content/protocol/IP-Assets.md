---
title: "IP Assets"
description: "How Medialane registers, protects, and licenses intellectual property using Starknet and IPFS."
date: "2026-05-21"
author: "Medialane DAO"
---

# IP Assets

An IP asset on Medialane is a programmable NFT that encodes both **ownership proof** and **licensing terms** as onchain, immutable attributes. The combination of a Starknet transaction hash and an IPFS CID creates a Berne Convention-compatible copyright record valid in 181 countries.

---

## The Registration Model

When you mint an IP asset, three things happen simultaneously:

1. **Media upload** — The file is pinned to IPFS via Pinata. The CID is a cryptographic fingerprint of the content — if the file changes, the CID changes.
2. **Metadata anchoring** — A JSON metadata file (also IPFS-pinned) records title, description, IP type, license terms, and a pointer to the media CID.
3. **onchain mint** — The NFT is minted with the metadata IPFS URI. The Starknet transaction timestamp is immutable and globally verifiable.

Together, the IPFS CID + Starknet block timestamp = **permanent proof of prior art**, enforceable under Berne Convention Article 5 (automatic protection upon creation, no registration required).

---

## IP Types

Medialane supports 12 IP categories, each with appropriate metadata schema guidance:

| Type | Examples |
|------|---------|
| Art | Digital paintings, illustrations, generative art |
| Music | Songs, albums, beats, sound design |
| Photography | Photos, photo series, documentary work |
| Writing | Articles, books, poetry, scripts |
| Film | Short films, animations, video essays |
| Software | Source code, algorithms, programs |
| Brand | Logos, trademarks, brand identity systems |
| Design | UI/UX, product design, architecture |
| Research | Academic papers, datasets, analysis |
| Education | Courses, curricula, educational materials |
| Game | Games, game assets, game design documents |
| Other | Work that doesn't fit the above categories |

---

## Licensing System

Every digital asset carries machine-readable license terms embedded as NFT attributes. The licensing framework covers nine dimensions:

### Creative Commons Presets

| License | Commercial Use | Derivative Works | Attribution Required |
|---------|---------------|-----------------|---------------------|
| **CC0** (Public Domain) | ✅ | ✅ | No |
| **CC BY** | ✅ | ✅ | Yes |
| **CC BY-SA** | ✅ | ✅ (ShareAlike) | Yes |
| **CC BY-NC** | ❌ | ✅ | Yes |
| **CC BY-ND** | ✅ | ❌ | Yes |
| **CC BY-NC-SA** | ❌ | ✅ (ShareAlike) | Yes |
| **CC BY-NC-ND** | ❌ | ❌ | Yes |
| **All Rights Reserved** | ❌ | ❌ | — |

### Custom License Terms

Beyond CC presets, creators can define:

| Term | Options |
|------|---------|
| **Commercial use** | Allowed / Prohibited / Requires license agreement |
| **Derivative works** | Allowed / Allowed with attribution / Prohibited |
| **AI training** | Allowed / Prohibited / Allowed for non-commercial |
| **Geographic scope** | Worldwide / Specific regions |
| **Royalty %** | 0–25% (enforced at onchain sale) |
| **Sublicensing** | Allowed / Prohibited |
| **Exclusivity** | Non-exclusive / Exclusive (requires negotiation) |

License terms are stored as IPFS metadata attributes and are indexable by any compatible aggregator, AI system, or marketplace.

---

## Remix & Attribution Graph

When a creator builds a derivative work, they reference the original asset's token ID and contract address in their mint transaction. This creates an **onchain attribution chain** — a graph tracing creative lineage back to the originating work.

- CC0 and CC BY assets auto-approve remix requests
- Custom license terms require explicit onchain acceptance by the original creator
- Attribution is permanent — the remix record cannot be altered or deleted

---

## IPFS Storage & Gateways

All media and metadata files are pinned to IPFS via Pinata. The protocol resolves content through a multi-gateway fallback:

1. Pinata gateway (primary)
2. ipfs.io
3. Cloudflare IPFS
4. dweb.link

A 24-hour local cache prevents redundant gateway requests. `ipfs://` URIs are always resolved through the Pinata gateway first — this ensures fast access while maintaining decentralization.

---

## Metadata Schema

### Token Metadata (OpenSea-compatible)

```json
{
  "name": "string",
  "description": "string",
  "image": "ipfs://...",
  "external_url": "https://medialane.io/asset/{contract}/{tokenId}",
  "attributes": [
    { "trait_type": "IP Type",           "value": "Music" },
    { "trait_type": "License",           "value": "CC BY 4.0" },
    { "trait_type": "Commercial Use",    "value": "Allowed" },
    { "trait_type": "Derivative Works",  "value": "Allowed with attribution" },
    { "trait_type": "AI Training",       "value": "Prohibited" },
    { "trait_type": "Geographic Scope",  "value": "Worldwide" },
    { "trait_type": "Royalty",           "value": "10%" }
  ]
}
```

### Collection Metadata (OpenSea-compatible)

```json
{
  "name": "Collection Name",
  "description": "string",
  "image": "ipfs://...",
  "external_link": "https://medialane.io/collections/{contract}"
}
```

---

## Berne Convention Compliance

The Berne Convention (181 signatory countries, administered by WIPO) grants automatic copyright from the moment of creation. No registration is required. Medialane's onchain timestamp provides:

1. **Prior art evidence** — Immutable proof of existence before any given date
2. **Ownership proof** — Wallet signature establishes the creator's identity at mint time
3. **Content integrity** — IPFS CID is a cryptographic hash; any modification would produce a different CID

This does **not** replace legal counsel for disputes — it provides the evidence record that legal proceedings may require. Enforcement is the creator's responsibility through the jurisdiction's legal system.

---

## onchain Provenance

Every digital asset accrues a provenance record — a chain of transfer, sale, and remix events indexed from Starknet. The Medialane API (`getTokenHistory`) returns a full timeline for any asset, including:

- Mint event (creator, timestamp, tx hash)
- Transfer history (from/to, timestamps)
- Sale history (price, currency, buyer, seller)
- Remix events (derivative works referencing this asset)
