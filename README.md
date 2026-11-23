# iranopenprivacy.org

The website for [Iran Open Privacy (IOP)](https://iranopenprivacy.org): an open privacy standard and verification program for Iranian digital products.

This repo holds **only the site**. All content (standard, checklist, docs, company privacy documents) lives in [IranOpenPrivacy/iran-open-privacy](https://github.com/IranOpenPrivacy/iran-open-privacy) and is pulled in at build time. To change what the site says, edit that repo.

## How it works

- `scripts/fetch-content.mjs` clones the docs repo (`main`) into `./content` before every build.
- Next.js 14 (App Router) reads Markdown and YAML from `./content` and renders a **fully static** site to `out/` (`output: 'export'`), so it can be mirrored on any static host.
- Persian is the main site (`/`, RTL). English summary lives under `/en/`.

| Route | Source in the docs repo |
| --- | --- |
| `/` | hand-written home, numbers from `checklist/*.yaml` |
| `/standard/`, `/en/standard/` | `checklist/*.yaml` (filterable) |
| `/manifesto/`, `/levels/`, `/process/`, ... | `docs/fa/*.md`, see `DOC_PAGES` in `lib/content.ts` |
| `/companies/`, `/companies/<slug>/` | `company-docs/<slug>/` (+ Atom feed at `feed.xml`) |
| `/contribute/`, `/security/`, `/licenses/`, ... | root Markdown files |
| `/en/` | `README.en.md`, `docs/en/overview.md` |

Relative links between docs are rewritten to site routes; links to files without a page go to GitHub.

## Develop

```bash
npm install
echo "IOP_CONTENT_DIR=../iran-open-privacy" > .env.local   # optional: use a local docs checkout
npm run dev
```

Without `.env.local`, the docs repo is cloned into `./content`.

## Deploy

Hosted on Vercel (project linked to this repo, domain `iranopenprivacy.org`). Every push to `main` here deploys. Pushes to `main` in the docs repo trigger a rebuild through a Vercel deploy hook (see `DEPLOYMENT.md`).

## License

Code: AGPL-3.0. Content: see the docs repo.
