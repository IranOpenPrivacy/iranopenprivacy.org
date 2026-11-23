import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/DocArticle'
import { LEVEL_LABEL, listCompanies } from '@/lib/companies'
import { REPO_URL } from '@/lib/content'

export const metadata: Metadata = { title: 'شرکت‌ها', alternates: { canonical: '/companies/' } }

export default function CompaniesPage() {
  const companies = listCompanies()
  const real = companies.filter((c) => !c.fictional)
  return (
    <>
      <PageHeader
        title="شرکت‌ها"
        lead="صفحهٔ اعتماد هر شرکت شرکت‌کننده: سند حریم خصوصی نسخه‌دار، سطح فعلی، تاریخ انقضا و تاریخچهٔ تغییرات."
      />
      <div className="container-page py-12">
        {real.length === 0 && (
          <div className="mb-10 rounded-xl border border-amber-300 bg-amber-50 p-6 leading-8 text-amber-950">
            هنوز هیچ شرکتی در IOP ثبت نشده و تا پایان نظرخواهی عمومی هیچ سطحی صادر نمی‌شود. اگر شرکت شما می‌خواهد
            شرکت‌کنندهٔ آزمایشی باشد،{' '}
            <a
              href={`${REPO_URL}/issues/new?template=company-application.yml`}
              className="font-medium text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              درخواست بدهید
            </a>
            .
          </div>
        )}
        <ul className="grid gap-4 md:grid-cols-2">
          {companies.map((c) => (
            <li key={c.slug}>
              <Link href={`/companies/${c.slug}/`} className="block rounded-xl border border-neutral-200 p-6 hover:border-accent">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip border-neutral-300 text-neutral-700">{LEVEL_LABEL[c.level].fa}</span>
                  {c.fictional && <span className="chip border-amber-300 bg-amber-50 text-amber-900">نمونهٔ ساختگی</span>}
                </div>
                <h2 className="mt-3 text-lg font-bold text-neutral-950">{c.company}</h2>
                <p className="mt-1 font-mono text-sm text-neutral-500" dir="ltr">{c.domain}</p>
                <p className="mt-3 text-sm text-neutral-600">
                  نسخهٔ فعلی سند: <span dir="ltr">{c.document_versions.at(-1)?.version}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-sm text-neutral-500">
          قالب سند و قواعد نسخه‌گذاری: <Link href="/privacy-documents/" className="text-accent hover:underline">سند حریم خصوصی</Link> ·{' '}
          <Link href="/trust-page/" className="text-accent hover:underline">صفحهٔ اعتماد</Link>
        </p>
      </div>
    </>
  )
}
