import { listCompanies, loadCompany } from '@/lib/companies'
import { REPO_URL, SITE_URL } from '@/lib/content'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return listCompanies().map((c) => ({ slug: c.slug }))
}

const esc = (s: string) => s.replace(/[<>&"]/g, (ch) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' })[ch]!)

export function GET(_req: Request, { params }: { params: { slug: string } }) {
  const c = loadCompany(params.slug)
  const page = `${SITE_URL}/companies/${c.slug}/`
  const versions = [...c.document_versions].reverse()
  const updated = versions[0]?.date || '1970-01-01'
  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="fa">
  <title>${esc(c.company)}: تغییرات سند حریم خصوصی</title>
  <id>${page}</id>
  <link rel="alternate" href="${page}"/>
  <link rel="self" href="${page}feed.xml"/>
  <updated>${updated}T00:00:00Z</updated>
  <author><name>Iran Open Privacy</name></author>
${versions
  .map(
    (v) => `  <entry>
    <title>نسخهٔ ${esc(v.version)} (${esc(v.change_type)})</title>
    <id>${page}#v${esc(v.version)}</id>
    <link href="${REPO_URL}/commits/main/company-docs/${c.slug}"/>
    <updated>${v.date}T00:00:00Z</updated>
    <summary>${esc(c.company)}، نسخهٔ ${esc(v.version)}، ${esc(v.date)}</summary>
  </entry>`,
  )
  .join('\n')}
</feed>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } })
}
