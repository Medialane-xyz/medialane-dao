---
title: "Smart Contracts"
description: "Complete reference of all Medialane smart contract addresses on Starknet Mainnet and Ethereum Mainnet."
date: "2026-05-01"
author: "Medialane DAO"
---

# Smart Contracts

All Medialane protocol contracts are deployed on **Starknet Mainnet**. The MDLN governance token and DAO treasury are on **Ethereum Mainnet**.

---

## Starknet Mainnet

### Marketplace

| Contract | Address | Notes |
|----------|---------|-------|
| **Marketplace v2 (ERC-721)** | `0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6` | Audited, non-upgradeable |
| **Marketplace v2 (ERC-1155)** | `0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99` | Audited, non-upgradeable |

SNIP-12 domain: name `Medialane`, version `1` (ERC-721) / `2` (ERC-1155).

### Collection Factories

| Contract | Address | Deploys |
|----------|---------|---------|
| **Collection Registry (ERC-721)** | `0x05c49ee5d3208a2c2e150fdd0c247d1195ed9ab54fa2d5dea7a633f39e4b205b` | ERC-721 collection contracts |
| **Collection Factory (ERC-1155)** | `0x006b2dc7ca7c4f466bb4575ba043d934310f052074f849caf853a86bcb819fd6` | ERC-1155 edition contracts |
| **Drop Factory** | `0x03587f42e29daee1b193f6cf83bf8627908ed6632d0d83fcb26225c50547d800` | Timed-drop ERC-721 collections |
| **POP Factory** | `0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111` | Soulbound credential collections |

### Class Hashes (Cairo Sierra)

| Class | Hash |
|-------|------|
| Marketplace 721 | `0x03dff4f34b976207246207954263be9a28b51390321702443291088dcdf4b2e6` |
| Marketplace 1155 | `0x01b674aad934be85abc7c1970265cbf7e9bc7d586a90f0a67112c201636dbdd3` |
| ERC-721 Collection | (see Collection Registry) |
| ERC-1155 Collection | `0x39a85126c6627db263617e5bce2bb72e49d2bb1f20961efc8b8954665bcfd25` |
| Drop Collection | `0x00092e72cdb63067521e803aaf7d4101c3e3ce026ae6bc045ec4228027e58282` |
| POP Collection | `0x077c421686f10851872561953ea16898d933364b7f8937a5d7e2b1ba0a36263f` |

### MDLN on Starknet (Bridged)

| Contract | Address |
|----------|---------|
| **MDLN L2 (StarkGate)** | `0x06730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8` |
| **StarkGate L2 Bridge** | `0x0616757a151c21f9be8775098d591c2807316d992bbc3bb1a5c1821630589256` |

Explorer links: [Voyager](https://voyager.online/contract/0x06730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8) · [Starkscan Marketplace 721](https://starkscan.co/contract/0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6) · [Starkscan Marketplace 1155](https://starkscan.co/contract/0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99)

---

## Ethereum Mainnet

### MDLN Governance Token

| Contract | Address | Explorer |
|----------|---------|---------|
| **MDLN Token** | `0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15` | [Etherscan](https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15) |
| **Vesting Contract** | `0x912f61d5e6db656ec1a7be8db8957c5f1e345d58` | [Etherscan](https://etherscan.io/address/0x912f61d5e6db656ec1a7be8db8957c5f1e345d58) |
| **DAO Treasury (Gnosis Safe)** | `0xA7603783edD8ee6FF4B085f90Af53341282d244C` | [Etherscan](https://etherscan.io/address/0xA7603783edD8ee6FF4B085f90Af53341282d244C) |

### MDLN Token Properties

| Property | Value |
|----------|-------|
| Symbol | MDLN |
| Total Supply | 21,000,000 (fixed) |
| Decimals | 18 |
| Standard | ERC-20 with `ERC20Votes` + `ERC20Permit` |
| Chain ID | 1 (Ethereum Mainnet) |

---

## Contract Security

- **Audited** — All marketplace contracts have undergone professional third-party security audits
- **Non-upgradeable** — Marketplace contracts have no admin keys or proxy patterns; logic cannot be altered after deployment
- **CEI pattern** — Checks-effects-interactions ordering prevents reentrancy attacks
- **Open source** — Contract source code is publicly verifiable on Starkscan and Voyager

---

## Verified Sources

| Resource | Link |
|----------|------|
| Medialane SDK (includes ABIs) | [github.com/medialane-io/medialane-sdk](https://github.com/medialane-io/medialane-sdk) |
| Marketplace 721 on Starkscan | [starkscan.co](https://starkscan.co/contract/0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6) |
| Marketplace 1155 on Starkscan | [starkscan.co](https://starkscan.co/contract/0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99) |
| MDLN on Etherscan | [etherscan.io](https://etherscan.io/token/0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15) |
