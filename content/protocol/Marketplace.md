---
title: "Marketplace"
description: "Complete guide to listing, buying, bidding, counter-offers, and trading digital assets on the Medialane marketplace."
date: "2026-05-21"
author: "Medialane DAO"
---

# Marketplace

The Medialane marketplace runs on two audited Cairo smart contracts on Starknet Mainnet — one for ERC-721 (unique assets) and one for ERC-1155 (multi-edition assets). All orders are SNIP-12 typed-data signed off-chain and fulfilled atomically onchain.

---

## Order Model

Every marketplace action creates or fulfills an **order** — a typed-data structure signed by the creator's wallet and registered on the marketplace contract. Key properties:

| Field | Description |
|-------|-------------|
| `orderHash` | Unique identifier derived from the signed parameters |
| `offerer` | Address that signed the order (seller for listings, buyer for offers) |
| `offer` | The asset being offered (NFT token for listings; ERC-20 for bids) |
| `consideration` | What the offerer receives in return |
| `startTime` / `endTime` | Validity window (Unix timestamps) |
| `salt` | Replay-prevention nonce |
| `status` | `ACTIVE` | `FILLED` | `CANCELLED` | `COUNTER_OFFERED` |

---

## Supported Currencies

USDC · USDT · ETH · STRK · WBTC

All ERC-20 payments are transferred atomically with the NFT transfer inside a single Starknet multicall.

---

## Listings (Fixed-Price Sales)

### Creating a Listing

1. Approve the marketplace contract to transfer your NFT
2. Sign SNIP-12 typed data (`OrderParameters`) with your wallet
3. The dapp submits `register_order` via a multicall: `approve` + `register_order`

Gas is sponsored for ERC-721 and ERC-1155 listings via the AVNU paymaster.

**ERC-1155 specifics:** You can list a quantity (e.g. sell 5 of your 100 edition copies at once). The `offer.startAmount` and `offer.endAmount` specify the quantity.

### Duration options
`1 day · 3 days · 7 days · 14 days · 30 days`

### Cancelling a Listing

Sign a `CancellationParameters` typed-data message and submit `cancel_order`. The signature proves only the order creator can cancel.

---

## Offers (Bids)

Any wallet can make an offer on any indexed NFT — even assets not currently listed.

### Making an Offer

1. Approve the marketplace contract to transfer your ERC-20 payment token
2. Sign `OrderParameters` typed data with the ERC-20 as the `offer` item and the NFT as `consideration`
3. Dapp submits `approve` + `register_order` multicall

### Accepting an Offer

As the NFT owner (seller):

1. Review the incoming bid in your Portfolio → Received Offers
2. Click Accept — signs a `FulfillmentParameters` typed-data message
3. Dapp submits `approve` (ERC-721/1155) + `fulfill_order` multicall

Royalties are enforced by the contract at fulfillment time.

### Counter-offers

Sellers can respond to a bid with a counter-offer — a new order at a different price. The original bid enters `COUNTER_OFFERED` status. The buyer sees the counter in Portfolio → Counter-offers and can accept or ignore it.

---

## Cart Checkout (Batch Buying)

The cart allows purchasing multiple listings in a single atomic transaction:

1. Add items to cart (any combination of ERC-721 and ERC-1155)
2. Cart groups items by payment currency and computes approval amounts
3. One multicall: `approve(totalPerCurrency)` × N currencies + `fulfill_order` × N items
4. Session-key wallets (Cartridge Controller) sign the full batch once with a PIN

If any fulfillment fails, the entire multicall reverts — no partial purchases.

---

## Smart Contracts

| Contract | Address | Standard |
|----------|---------|---------|
| Marketplace v2 (ERC-721) | `0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6` | ERC-721 |
| Marketplace v2 (ERC-1155) | `0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99` | ERC-1155 |

Both contracts are **non-upgradeable by design** and have passed professional security audits.

---

## SNIP-12 Typed Data Domains

Typed data is signed against a specific domain to prevent cross-contract replay attacks.

| Contract | Domain name | Domain version |
|----------|-------------|----------------|
| ERC-721 marketplace | `Medialane` | `1` |
| ERC-1155 marketplace | `Medialane` | `2` |

---

## Fee Structure

| Event | Fee |
|-------|-----|
| List / make offer | Free |
| Sale completed | 1% of transaction value → Creator's Fund |
| Royalties | Set by the author (enforced by contract) |

The marketplace **protocol is zero-fee** — no fee logic lives in the immutable contracts. The 1% is applied at the platform layer, at settlement, where the DAO can change it without a contract migration. For year one it flows to the Creator's Fund and is airdropped back to the community.

---

## Portfolio Views

| Tab | Shows |
|-----|-------|
| **Listings** | Your active fixed-price listings |
| **Offers made** | Bids you've placed on other assets |
| **Received offers** | Incoming bids on your assets |
| **Counter-offers** | Seller responses to your bids awaiting your decision |

---

## Security Properties

- **CEI pattern** — checks, effects, interactions ordering prevents reentrancy
- **Front-running protection** — order hash includes price and asset; partial fills are impossible for fixed-price orders
- **Non-custodial** — assets stay in creator's wallet until the moment of sale
- **Atomic** — payment and NFT transfer happen in the same transaction; neither can succeed without the other
