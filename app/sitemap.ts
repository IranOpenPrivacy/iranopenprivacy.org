import type { MetadataRoute } from 'next'
import { DOC_PAGES, SITE_URL } from '@/lib/content'
import { listCompanies } from '@/lib/companies'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/standard/', '/companies/', '/contact/', '/docs/', '/en/', '/en/standard/',
    ...DOC_PAGES.map((d) => (d.lang === 'en' ? `/en/${d.slug}/` : `/${d.slug}/`)),
    ...listCompanies().filter((c) => !c.fictional).map((c) => `/companies/${c.slug}/`),
  ]
  return paths.map((p) => ({ url: SITE_URL + p }))
}
