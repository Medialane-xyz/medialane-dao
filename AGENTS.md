# AGENTS.md — Medialane DAO Site

This file provides guidance for AI agents and LLM-based tools working with this repository.

## Repository Purpose

This is the **governance and documentation site** for Medialane DAO (`medialane.org`). It is a Next.js 16 static/SSR site — no backend, no database, no auth. It serves two audiences:

1. **Humans** — Token holders, creators, developers, and partners seeking governance documents, protocol documentation, and contact information.
2. **AI agents** — Systems that need structured facts about the Medialane protocol, contracts, token, and governance model.

The **application** lives at `medialane.io` (separate repo: `medialane-dapp`). Do not confuse the two.

---

## Key Source of Truth Files

| File | Contains |
|------|----------|
| `lib/site-config.ts` | All contract addresses, MDLN token details, nav structure, camera positions |
| `llms.txt` | Machine-readable protocol summary (addresses, token, governance, API) |
| `content/protocol/` | Protocol documentation (Markdown) |
| `content/dao/` | Governance documents (Markdown) |
| `content/Privacy-Policy.md` | Privacy policy |
| `content/Terms-of-Use.md` | Terms of use |

When contract addresses or token details change, **always update `lib/site-config.ts` AND `llms.txt` together**.

---

## Content Architecture

```
content/
├── protocol/          ← Protocol docs (Getting-Started, Marketplace, Launchpad, IP-Assets, Contracts, SDK)
├── dao/               ← Governance docs (Constitution, Charter, Community-Guidelines, Compliance-Guidelines)
├── Privacy-Policy.md
└── Terms-of-Use.md
```

The `/docs` page renders sections from `content/dao/` (Governance) and `content/` root (Legal), plus `content/protocol/` (Protocol). Each `.md` file must have frontmatter: `title`, `description`, `date`, `author`.

---

## Page Structure

| Route | Source file | Purpose |
|-------|-------------|---------|
| `/` | `app/(site)/page.tsx` + `components/hero-section.tsx` | Homepage: stats, quick links, principles |
| `/explore` | `app/(site)/explore/page.client.tsx` | Platform features, contracts |
| `/dao` | `app/(site)/dao/` | Governance document index |
| `/members` | `app/(site)/members/page.client.tsx` | MDLN token, distribution, membership tiers |
| `/connect` | `app/(site)/connect/page.client.tsx` | Contact, social channels |
| `/docs` | `app/(site)/docs/page.tsx` | Documentation index |
| `/docs/[slug]` | `app/(site)/docs/[slug]/page.tsx` | Individual document viewer |

---

## Contracts — Current Authoritative Addresses

### Starknet Mainnet

| Contract | Address |
|----------|---------|
| Marketplace v2 (ERC-721) | `0x00f8ccaae0bc811c79605974cc1dab769b9cea8877f033f8e3c17f30457caba6` |
| Marketplace v2 (ERC-1155) | `0x02bfa521c25461a09d735889b469418608d7d92f8b26e3d37ef174a4c2e22f99` |
| Collection Registry (ERC-721) | `0x05c49ee5d3208a2c2e150fdd0c247d1195ed9ab54fa2d5dea7a633f39e4b205b` |
| Collection Factory (ERC-1155) | `0x006b2dc7ca7c4f466bb4575ba043d934310f052074f849caf853a86bcb819fd6` |
| Drop Factory | `0x03587f42e29daee1b193f6cf83bf8627908ed6632d0d83fcb26225c50547d800` |
| POP Factory | `0x00b32c34b427d8f346b5843ada6a37bd3368d879fc752cd52b68a87287f60111` |
| MDLN L2 (bridged) | `0x06730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8` |

### Ethereum Mainnet

| Contract | Address |
|----------|---------|
| MDLN Token | `0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15` |
| Vesting | `0x912f61d5e6db656ec1a7be8db8957c5f1e345d58` |
| Treasury (Gnosis Safe) | `0xA7603783edD8ee6FF4B085f90Af53341282d244C` |

---

## Common Tasks for Agents

### Update a contract address
1. Edit `lib/site-config.ts` — update the relevant field
2. Edit `llms.txt` — update the contracts table
3. Edit `content/protocol/Contracts.md` — update the relevant table row
4. If the address appears in `content/dao/Compliance-Guidelines.md`, update it there too

### Add a new protocol document
1. Create `content/protocol/YourDoc.md` with frontmatter: `title`, `description`, `date`, `author`
2. It will auto-appear in the Protocol section of `/docs` (via `getAllPosts('protocol')`)
3. Update `llms.txt` if the document covers new protocol facts

### Update page content (features list)
- `/explore` features: edit `app/(site)/explore/page.client.tsx` — the `features` array
- `/members` stats/tiers: edit `app/(site)/members/page.client.tsx`
- Homepage stats: edit `components/hero-section.tsx`
- Contract addresses on homepage: driven by `lib/site-config.ts`

### Add a governance document
1. Add `.md` file to `content/dao/`
2. It auto-appears on `/dao` and `/docs` pages

---

## Style Conventions

- **No TypeScript errors** — run `pnpm build` or `tsc --noEmit` after edits
- **No custom CSS** — Tailwind v4 only
- **Markdown dates** — format `YYYY-MM-DD` in frontmatter
- **Addresses** — always include the full hex address; never truncate in config files
- **Content tone** — factual, precise, no marketing puffery; governance docs are legally significant

---

## What NOT to Do

- Do not add database connections, auth, or API routes — this is a static governance site
- Do not modify `components/ui/` directly — regenerate via `shadcn` CLI if needed
- Do not add external analytics beyond `@vercel/analytics` (already included)
- Do not commit `.env` files or API keys
- Do not change the Three.js scene without understanding `lib/site-config.ts` camera targets
