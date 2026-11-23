# Deployment

## Production (Vercel)

- Vercel project linked to `IranOpenPrivacy/website`, production branch `main`.
- Framework preset: Next.js. Build command `npm run build` (runs `prebuild`, which fetches the docs repo). Output: static export in `out/`.
- Domain: `iranopenprivacy.org` (DNS on Cloudflare). `www` should redirect to the apex.
- Old v1 URLs (`/about`, `/framework`, `/community`) redirect via `vercel.json`.

## Rebuild when the docs change

1. Vercel: Project > Settings > Git > Deploy Hooks > create hook `docs-main` for branch `main`. Copy the URL.
2. Docs repo: Settings > Secrets and variables > Actions > new secret `VERCEL_DEPLOY_HOOK` with that URL.
3. The docs repo workflow `.github/workflows/deploy-site.yml` calls the hook on every push to `main`.

## Mirror

`npm run build` produces a plain static site in `out/`. Upload it to any static host (GitHub Pages, Cloudflare Pages, S3, nginx). Directory URLs end in `/` and map to `index.html`.
