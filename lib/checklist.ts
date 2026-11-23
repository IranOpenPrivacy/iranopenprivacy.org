import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { CONTENT_DIR } from './content'

export type CheckType = 'auto' | 'declared' | 'reviewed'

export interface Control {
  id: string
  level: 1 | 2 | 3
  check: CheckType
  title_fa: string
  title_en: string
  requirement_fa: string
  requirement_en: string
  evidence: string[]
  mappings?: {
    gdpr?: string[]
    iso27701?: string[]
    asvs?: string[]
    local?: { refs: string[] }
  }
}

export interface Domain {
  id: string
  number: number
  title_fa: string
  title_en: string
  summary_fa: string
  summary_en: string
  controls: Control[]
}

export function loadChecklist(): Domain[] {
  const dir = path.join(CONTENT_DIR, 'checklist')
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.yaml'))
    .sort()
    .map((f) => {
      const raw = yaml.load(fs.readFileSync(path.join(dir, f), 'utf8')) as any
      return { ...raw.domain, controls: raw.controls } as Domain
    })
}

export function checklistCounts(domains: Domain[]) {
  const c = { 1: 0, 2: 0, 3: 0, auto: 0 }
  for (const d of domains)
    for (const ctl of d.controls) {
      c[ctl.level]++
      if (ctl.check === 'auto') c.auto++
    }
  return { ...c, total: c[1] + c[2] + c[3] }
}

export const CHECK_LABEL = {
  fa: { auto: 'خودکار', declared: 'اظهار', reviewed: 'بازبینی' },
  en: { auto: 'Automated', declared: 'Declared', reviewed: 'Reviewed' },
} as const

export const EVIDENCE_LABEL: Record<'fa' | 'en', Record<string, string>> = {
  fa: {
    url: 'آدرس', document: 'سند', screenshot: 'تصویر صفحه', config: 'پیکربندی',
    'log-sample': 'نمونهٔ ثبت', interview: 'مصاحبه', contract: 'قرارداد',
    'test-result': 'نتیجهٔ آزمون', scan: 'اسکن',
  },
  en: {
    url: 'URL', document: 'Document', screenshot: 'Screenshot', config: 'Configuration',
    'log-sample': 'Log sample', interview: 'Interview', contract: 'Contract',
    'test-result': 'Test result', scan: 'Scan',
  },
}

export function mappingLines(m: Control['mappings'], lang: 'fa' | 'en'): string[] {
  if (!m) return []
  const sep = lang === 'fa' ? '، ' : ', '
  const out: string[] = []
  if (m.gdpr?.length) out.push('GDPR ' + m.gdpr.join(sep))
  if (m.iso27701?.length) out.push('ISO 27701 ' + m.iso27701.join(sep))
  if (m.asvs?.length) out.push('OWASP ASVS ' + m.asvs.join(sep))
  if (m.local)
    out.push(
      lang === 'fa'
        ? `محلی: ${m.local.refs?.length ? m.local.refs.join('؛ ') : 'نیازمند بررسی حقوقی'} (پیش‌نویس)`
        : 'Local law (draft, pending legal review)',
    )
  return out
}

/** Checklist with display labels resolved on the server, ready for the client explorer. */
export function prepareChecklist(lang: 'fa' | 'en') {
  return loadChecklist().map((d) => ({
    ...d,
    controls: d.controls.map((c) => ({
      ...c,
      evidenceLabels: c.evidence.map((e) => EVIDENCE_LABEL[lang][e] || e),
      mappingLines: mappingLines(c.mappings, lang),
    })),
  }))
}
