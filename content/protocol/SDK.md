---
title: "SDK & Developer Integration"
description: "TypeScript SDK reference for building on the Medialane protocol — orders, collections, tokens, and marketplace operations."
date: "2026-05-21"
author: "Medialane DAO"
---

# SDK & Developer Integration

The `@medialane/sdk` is a TypeScript library that provides full coverage of the Medialane protocol: REST API queries, order construction, typed-data signing helpers, contract ABIs, and all mainnet addresses.

---

## Installation

```bash
npm install @medialane/sdk
# or
pnpm add @medialane/sdk
```

The SDK ships **dual ESM + CJS** and has no runtime dependencies beyond `starknet` (peer dep).

---

## API Client

```typescript
import { MedialaneClient } from '@medialane/sdk'

const client = new MedialaneClient({
  apiUrl: 'https://api.medialane.io',  // or your self-hosted backend
  apiKey: process.env.MEDIALANE_API_KEY,
})
```

### Available Methods

| Method | Description |
|--------|-------------|
| `client.api.getOrders(query)` | Paginated list of all orders |
| `client.api.getOrder(orderHash)` | Single order by hash |
| `client.api.getActiveOrdersForToken(contract, tokenId)` | All active listings + offers for one token |
| `client.api.getOrdersByUser(address)` | All orders (listings + offers) for a wallet |
| `client.api.getToken(contract, tokenId)` | Token metadata + owner + active orders |
| `client.api.getTokensByOwner(address)` | All tokens owned by a wallet |
| `client.api.getTokenHistory(contract, tokenId)` | Full provenance timeline |
| `client.api.getCollections(query)` | Paginated collection list |
| `client.api.getCollection(contract)` | Single collection metadata + stats |
| `client.api.getCollectionTokens(contract, query)` | Tokens within a collection |
| `client.api.getCollectionsByOwner(address)` | Collections deployed by a wallet |
| `client.api.getActivities(query)` | Global activity feed |
| `client.api.getActivitiesByAddress(address)` | Activity feed for a wallet |

---

## Typed Data Helpers (SNIP-12)

Order signing follows **SNIP-12** — Starknet's typed structured data signing standard. The SDK exports helpers for each contract version.

### ERC-721 Marketplace (domain version `1`)

```typescript
import {
  buildOrderTypedData,
  buildFulfillmentTypedData,
  buildCancellationTypedData,
} from '@medialane/sdk'

// Create a listing or offer typed data
const typedData = buildOrderTypedData(orderParameters, chainId)

// Fulfill (accept) an order
const fulfillData = buildFulfillmentTypedData(fulfillmentParams, chainId)

// Cancel an order
const cancelData = buildCancellationTypedData(cancelParams, chainId)
```

### ERC-1155 Marketplace (domain version `2`)

```typescript
import {
  build1155OrderTypedData,
  build1155FulfillmentTypedData,
  build1155CancellationTypedData,
} from '@medialane/sdk'
```

---

## Contract ABIs

```typescript
import {
  IPMarketplaceABI,    // ERC-721 marketplace
  Medialane1155ABI,    // ERC-1155 marketplace
  IPCollection1155ABI, // ERC-1155 collection
  CollectionRegistryABI,
  DropCollectionABI,
  DropFactoryABI,
  POPCollectionABI,
  POPFactoryABI,
} from '@medialane/sdk'
```

---

## Contract Addresses

```typescript
import {
  MARKETPLACE_721_CONTRACT_MAINNET,
  MARKETPLACE_1155_CONTRACT_MAINNET,
  COLLECTION_CONTRACT_MAINNET,        // ERC-721 collection registry
  COLLECTION_1155_CONTRACT_MAINNET,   // ERC-1155 collection factory
  DROP_FACTORY_CONTRACT_MAINNET,
  POP_FACTORY_CONTRACT_MAINNET,
} from '@medialane/sdk'
```

---

## Supported Tokens

```typescript
import { getListableTokens, getTokenBySymbol, getTokenByAddress } from '@medialane/sdk'

const tokens = getListableTokens()
// Returns: [{ symbol: 'USDC', address: '0x...', decimals: 6 }, ...]

const usdc = getTokenBySymbol('USDC')
const strk = getTokenByAddress('0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d')
```

### Supported Payment Tokens on Starknet

| Symbol | Decimals |
|--------|---------|
| USDC | 6 |
| USDT | 6 |
| ETH | 18 |
| STRK | 18 |
| WBTC | 8 |

---

## Utility Functions

```typescript
import {
  formatAmount,       // format raw BigInt amount to human-readable string
  parseAmount,        // parse human-readable string to raw amount (BigInt-compatible)
  normalizeAddress,   // normalize a Starknet address to padded hex
  shortenAddress,     // 0x1234...5678 format
  stringifyBigInts,   // recursively convert BigInt values to strings (JSON-safe)
  u256ToBigInt,       // convert Starknet u256 { low, high } to BigInt
} from '@medialane/sdk'
```

---

## IP Metadata Schema

```typescript
import type { IpNftMetadata, IpAttribute, IPType, OpenLicense } from '@medialane/sdk'

// IPType: 'Art' | 'Music' | 'Photography' | 'Writing' | 'Film' |
//         'Software' | 'Brand' | 'Design' | 'Research' | 'Education' | 'Game' | 'Other'

// OpenLicense: 'CC0' | 'CC BY' | 'CC BY-SA' | 'CC BY-NC' |
//              'CC BY-ND' | 'CC BY-NC-SA' | 'CC BY-NC-ND' | 'All Rights Reserved'
```

---

## Example: Fetch Active Listings

```typescript
import { MedialaneClient } from '@medialane/sdk'

const client = new MedialaneClient({ apiUrl: 'https://api.medialane.io' })

const { data: orders } = await client.api.getOrders({
  status: 'ACTIVE',
  offerItemType: 'ERC721',
  limit: 20,
  page: 1,
})

for (const order of orders) {
  console.log(order.token?.name, order.price.formatted, order.price.currency)
}
```

---

## Example: Fetch a Creator's Portfolio

```typescript
const { data: tokens } = await client.api.getTokensByOwner('0x...')
const { data: orders } = await client.api.getOrdersByUser('0x...')

const listings = orders.filter(
  (o) => o.offer.itemType !== 'ERC20' && o.status === 'ACTIVE'
)
const offers = orders.filter(
  (o) => o.offer.itemType === 'ERC20' && o.status === 'ACTIVE'
)
```

---

## Platform Fee

The marketplace and launchpad protocols are zero-fee — the 1% platform fee is applied at the **app layer**, not in the contracts. The SDK is the single source of truth for it:

```typescript
import { resolveFeeConfig, buildFeeCall } from '@medialane/sdk'

const cfg = resolveFeeConfig()
const feeCall = buildFeeCall(
  { surface: 'marketplace', token: usdcAddress, grossAmount: price },
  cfg,
)
// feeCall is a single ERC-20 transfer Call to the Creator's Fund —
// or null when the fee is disabled or floors to zero.
```

`buildFeeCall` returns `null` when no fund address is configured — fail-safe by design. For year one, fees route to the Creator's Fund.

---

## Source & License

- **Repository:** [github.com/medialane-io/medialane-sdk](https://github.com/medialane-io/medialane-sdk)
- **License:** MIT
- **npm:** `@medialane/sdk`
