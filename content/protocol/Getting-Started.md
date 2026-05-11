---
title: "Getting Started"
description: "Create your first digital asset on Medialane in seconds — no gas required, no registration fee, no intermediaries."
date: "2026-05-01"
author: "Medialane DAO"
---

# Getting Started with Medialane

Medialane is an open protocol for intellectual property monetization **onchain**. Every asset you create is a programmable NFT with Berne Convention-backed copyright proof valid in 181 countries.

---

## Step 1: Open the App

Navigate to [medialane.io](https://medialane.io). Sign up with Google. First-time users are walked through wallet creation automatically.

---

## Step 2: Create a Collection (optional but recommended)

Before minting individual assets, creators needs to deploy a **collection** — a branded smart contract that groups related work.

**Go to** → Launchpad → Create Collection

Two collection formats are available:

| Format | Standard | Best for |
|--------|----------|----------|
| **ERC-721 Collection** | One token = one asset | Photography, digital art, 1-of-1s |
| **ERC-1155 Edition** | One token = multiple copies | Music, publications, limited editions |

Collections are deployed as Cairo smart contracts on Starknet. Metadata resolves from IPFS — permanent and censorship-resistant.

---

## Step 3: Mint an digital asset

Each asset contains:

- **Title** and **description**
- **Media file** — uploaded to IPFS via Pinata (image, audio, video, document)
- **Metadata** - immutable via IPFS
- **IP Type** — choose from templates: Art, Music, Photography, Writing, Video, Software, Game, Other
- **License** — select from Creative Commons presets or define custom terms (commercial use, derivative rights, AI training policy, geographic scope, royalty %)

After signing, the mint transaction is submitted gaslessly. The IPFS CID and onchain transaction hash together form your immutable copyright proof.

---

## Step 4: Monetize

Once your asset exists onchain, you have three monetization paths:

1. **Fixed-price listing** — set a price in USDC, USDT, ETH, STRK, or WBTC
2. **Offer & negotiate** — receive bids from buyers; accept, counter, or decline
3. **Remix licensing** — enable other creators to build on your work with automatic onchain attribution

See the [Marketplace guide](./Marketplace) for full trading mechanics.

---

## Fee Structure

| Action | Fee |
|--------|-----|
| Mint digital asset | Free (gas sponsored) |
| Create collection | Free (gas sponsored) |
| List for sale | Free (gas sponsored) |
| Make offer | Free (gas sponsored) |
| Buy / sell | 1% platform fee on transaction value |
| Remix license | Custom (set by original creator) |

The 1% marketplace fee flows to the Medialane DAO treasury and is governed by MDLN token holders.

---

## Networks

| Chain | Purpose |
|-------|---------|
| **Starknet Mainnet** | All digital assets, marketplace, collections, launchpad |
| **Ethereum Mainnet** | MDLN governance token, Gnosis Safe treasury |

MDLN can be bridged from Ethereum to Starknet via [StarkGate](https://starkgate.starknet.io) and traded on Starknet via [Ekubo](https://app.ekubo.org).

---

## Wallet Options

| Wallet | Type | Notes |
|--------|------|-------|
| **Ready** | Browser extension | Full Starknet support, recommended for power users |
| **Braavos** | Browser extension | Full Starknet support |
| **Social (email/social)** | Custodial | No seed phrase, best for onboarding new creators |
| **Cartridge Controller** | Session-key | Gasless session-authenticated actions |

---

## Resources

- [Medialane App](https://medialane.io)
- [TypeScript SDK](https://github.com/medialane-io/medialane-sdk)
- [Snapshot governance](https://snapshot.org/#/s:medialane.eth)
- [Voyager block explorer](https://voyager.online)
