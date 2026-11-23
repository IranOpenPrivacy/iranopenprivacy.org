import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import matter from 'gray-matter'
import { CONTENT_DIR, renderMarkdown } from './content'

export interface CompanyVersion {
  version: string
  date: string
  change_type: string
}

export interface Company {
  slug: string
  company: string
  domain: string
  domain_proof: string
  contact_email: string
  level: 'none' | 'declared' | 'verified' | 'continuously-verified'
  level_granted: string | null
  level_expires: string | null
  document_versions: CompanyVersion[]
  fictional: boolean
  docs: { lang: string; file: string }[]
}

const DIR = () => path.join(CONTENT_DIR, 'company-docs')

export function listCompanies(): Company[] {
  if (!fs.existsSync(DIR())) return []
  return fs
    .readdirSync(DIR(), { withFileTypes: true })
    .filter((e) => e.isDirectory() && fs.existsSync(path.join(DIR(), e.name, 'meta.yaml')))
    .map((e) => loadCompany(e.name))
    .sort((a, b) => a.company.localeCompare(b.company))
}

export function loadCompany(slug: string): Company {
  const dir = path.join(DIR(), slug)
  const metaRaw = fs.readFileSync(path.join(dir, 'meta.yaml'), 'utf8')
  const meta = yaml.load(metaRaw) as any
  const docs = fs
    .readdirSync(dir)
    .map((f) => f.match(/^privacy\.([a-z]{2})\.md$/))
    .filter(Boolean)
    .map((m) => ({ lang: m![1], file: `company-docs/${slug}/${m![0]}` }))
    .sort((a, b) => (a.lang === 'fa' ? -1 : b.lang === 'fa' ? 1 : 0))
  // Prefer the company name from the Persian document's front matter.
  const faDoc = docs.find((d) => d.lang === 'fa')
  const fmName = faDoc ? (matter(fs.readFileSync(path.join(CONTENT_DIR, faDoc.file), 'utf8')).data as any).company : null
  return {
    ...meta,
    company: fmName || meta.company,
    slug,
    document_versions: (meta.document_versions || []).map((v: any) => ({ ...v, date: String(v.date) })),
    fictional: /fictional/i.test(metaRaw.split('\n')[0]) || /fictional|ساختگی/i.test(String(meta.company) + String(fmName)),
    docs,
  }
}

export async function renderCompanyDoc(file: string) {
  return renderMarkdown(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'), file)
}

export const LEVEL_LABEL: Record<Company['level'], { fa: string; en: string }> = {
  none: { fa: 'بدون سطح', en: 'No level' },
  declared: { fa: 'اظهارشده', en: 'Declared' },
  verified: { fa: 'تأییدشده', en: 'Verified' },
  'continuously-verified': { fa: 'تأیید مستمر', en: 'Continuously Verified' },
}

export const CHANGE_LABEL: Record<string, string> = {
  initial: 'نسخهٔ اول',
  patch: 'اصلاح جزئی',
  minor: 'افزودن یا روشن‌تر کردن',
  major: 'تغییر عمده',
}
