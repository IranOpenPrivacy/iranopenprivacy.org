'use client'

import { useMemo, useState } from 'react'
import type { Domain, CheckType } from '@/lib/checklist'

type Lang = 'fa' | 'en'

const T = {
  fa: {
    level: 'سطح',
    all: 'همه',
    check: 'نوع بررسی',
    evidence: 'شواهد',
    mappings: 'مرجع',
    search: 'جست‌وجو در کنترل‌ها…',
    shown: (n: string) => `${n} کنترل`,
    none: 'با این فیلترها کنترلی پیدا نشد.',
    upTo: 'تا سطح',
  },
  en: {
    level: 'Level',
    all: 'All',
    check: 'Check',
    evidence: 'Evidence',
    mappings: 'Mappings',
    search: 'Search controls…',
    shown: (n: string) => `${n} controls`,
    none: 'No controls match this filter.',
    upTo: 'Up to level',
  },
}

const CHECK = {
  fa: { auto: 'خودکار', declared: 'اظهار', reviewed: 'بازبینی' },
  en: { auto: 'Automated', declared: 'Declared', reviewed: 'Reviewed' },
}

const CHECK_STYLE: Record<CheckType, string> = {
  auto: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  declared: 'border-amber-200 bg-amber-50 text-amber-800',
  reviewed: 'border-violet-200 bg-violet-50 text-violet-800',
}

const num = (n: number, lang: Lang) => (lang === 'fa' ? n.toLocaleString('fa-IR') : String(n))

export interface PreparedDomain extends Domain {
  controls: (Domain['controls'][number] & { evidenceLabels: string[]; mappingLines: string[] })[]
}

export default function ChecklistExplorer({ domains, lang }: { domains: PreparedDomain[]; lang: Lang }) {
  const t = T[lang]
  const [maxLevel, setMaxLevel] = useState<0 | 1 | 2 | 3>(0)
  const [check, setCheck] = useState<CheckType | 'all'>('all')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return domains
      .map((d) => ({
        ...d,
        controls: d.controls.filter((c) => {
          if (maxLevel && c.level > maxLevel) return false
          if (check !== 'all' && c.check !== check) return false
          if (!query) return true
          const hay = [c.id, c.title_fa, c.title_en, c.requirement_fa, c.requirement_en].join(' ').toLowerCase()
          return hay.includes(query)
        }),
      }))
      .filter((d) => d.controls.length)
  }, [domains, maxLevel, check, q])

  const shown = filtered.reduce((n, d) => n + d.controls.length, 0)
  const title = (o: any, k: string) => o[`${k}_${lang}`]

  const pill = (active: boolean) =>
    `rounded-md px-3 py-1.5 text-sm transition-colors ${active ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'}`

  return (
    <div className="grid gap-10 lg:grid-cols-[14rem_1fr]">
      <aside className="hidden lg:block">
        <nav className="sticky top-24 space-y-1 text-sm">
          {domains.map((d) => (
            <a key={d.id} href={`#${d.id}`} className="flex items-baseline gap-2 rounded-md px-2 py-1.5 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950">
              <span className="font-mono text-xs text-neutral-400">{d.id}</span>
              {title(d, 'title')}
            </a>
          ))}
        </nav>
      </aside>

      <div>
        <div className="z-20 -mx-4 mb-8 lg:sticky lg:top-16 flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-lg sm:border sm:px-4">
          <div className="flex items-center gap-1" role="group" aria-label={t.level}>
            <span className="me-1 text-sm text-neutral-500">{t.upTo}</span>
            {([0, 1, 2, 3] as const).map((l) => (
              <button key={l} className={pill(maxLevel === l)} onClick={() => setMaxLevel(l)} aria-pressed={maxLevel === l}>
                {l === 0 ? t.all : num(l, lang)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1" role="group" aria-label={t.check}>
            {(['all', 'auto', 'declared', 'reviewed'] as const).map((c) => (
              <button key={c} className={pill(check === c)} onClick={() => setCheck(c)} aria-pressed={check === c}>
                {c === 'all' ? t.all : CHECK[lang][c]}
              </button>
            ))}
          </div>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t.search}
            className="min-w-0 basis-full rounded-md border sm:basis-0 sm:flex-1 border-neutral-300 px-3 py-1.5 text-sm focus:border-accent focus:outline-none"
          />
          <span className="text-sm text-neutral-500">{t.shown(num(shown, lang))}</span>
        </div>

        {filtered.length === 0 && <p className="py-10 text-neutral-500">{t.none}</p>}

        <div className="space-y-14">
          {filtered.map((d) => (
            <section key={d.id} id={d.id} className="scroll-mt-36">
              <div className="mb-5">
                <p className="font-mono text-sm text-accent">
                  {num(d.number, lang)} · {d.id}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-neutral-950">{title(d, 'title')}</h2>
                <p className="mt-2 max-w-3xl leading-8 text-neutral-600">{title(d, 'summary')}</p>
              </div>
              <ul className="divide-y divide-neutral-200 rounded-lg border border-neutral-200">
                {d.controls.map((c) => (
                  <li key={c.id} id={c.id} className="scroll-mt-36 p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="font-mono text-sm font-semibold text-neutral-950" dir="ltr">{c.id}</code>
                      <span className="chip border-neutral-300 text-neutral-700">
                        {t.level} {num(c.level, lang)}
                      </span>
                      <span className={`chip ${CHECK_STYLE[c.check]}`}>{CHECK[lang][c.check]}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-neutral-950">{title(c, 'title')}</h3>
                    <p className="mt-1 leading-8 text-neutral-700">{title(c, 'requirement')}</p>
                    <dl className="mt-3 grid gap-x-8 gap-y-1 text-sm text-neutral-500 sm:grid-cols-[auto_1fr]">
                      <dt className="font-medium text-neutral-600">{t.evidence}</dt>
                      <dd>{c.evidenceLabels.join(lang === 'fa' ? '، ' : ', ')}</dd>
                      {c.mappingLines.length > 0 && (
                        <>
                          <dt className="font-medium text-neutral-600">{t.mappings}</dt>
                          <dd>
                            {c.mappingLines.map((m) => (
                              <span key={m} className="block">{m}</span>
                            ))}
                          </dd>
                        </>
                      )}
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
