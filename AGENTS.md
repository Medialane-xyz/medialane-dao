# AGENTS.md — Medialane DAO Site

This file provides guidance for AI agents and LLM-based tools working with this repository.

## Repository Purpose

This is the **governance and documentation site** for Medialane DAO (`medialane.org`). It is a Next.js 16 static/SSR site — no backend, no database, no auth. It serves two audiences:

1. **Humans** — Token holders, creators, developers, and partners seeking governance documents, protocol documentation, and contact information.
2. **AI agents** — Systems that need structured facts about the Medialane protocol, contracts, token, and governance model.

The **application** lives at `medialane.io` (separate repo: `medialane-starknet`). Do not confuse the two.

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

## Contracts

The DAO's own governance contracts on **Ethereum mainnet**:

| Contract | Address |
|----------|---------|
| MDLN Token | `0x0DC90d57F3Aa3E836Ffd6E777E543a43A487dB15` |
| Vesting | `0x912f61d5e6db656ec1a7be8db8957c5f1e345d58` |
| Treasury (Gnosis Safe) | `0xA7603783edD8ee6FF4B085f90Af53341282d244C` |

The bridged **MDLN on Starknet** is `0x06730d6a357690cebffad800219e9630e15b6f44d35526e0fc9ee52bdf7418e8`.

Do **not** hardcode the live protocol contracts (marketplace venues, collection/launchpad factories, POP credentials) here — they redeploy and stale addresses become a hazard. The current, authoritative list is at [docs.medialane.io/dev/contracts](https://docs.medialane.io/dev/contracts).

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
