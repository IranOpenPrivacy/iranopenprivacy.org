import { DOC_PAGES, REPO_URL, SITE_URL, renderDoc } from '@/lib/content'

export const dynamic = 'force-static'

export async function GET() {
  const docs = await Promise.all(DOC_PAGES.map(async (d) => ({ ...d, title: (await renderDoc(d.file)).title })))
  const body = `# Iran Open Privacy (IOP)

> An open, community-run privacy standard and verification program for Iranian digital products. Draft 0.1, open for public comment. Persian is the source of truth; English is a summary.

Source repository (standard, checklist YAML, schemas, company documents): ${REPO_URL}

## Key pages
- [Home (Persian)](${SITE_URL}/)
- [English overview](${SITE_URL}/en/)
- [Controls, Persian](${SITE_URL}/standard/)
- [Controls, English](${SITE_URL}/en/standard/)
- [Companies and trust pages](${SITE_URL}/companies/)

## Documents (Persian)
${docs.map((d) => `- [${d.title}](${SITE_URL}/${d.slug}/): ${REPO_URL}/blob/main/${d.file}`).join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
