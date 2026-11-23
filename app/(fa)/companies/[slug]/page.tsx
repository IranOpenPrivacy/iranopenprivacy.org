import type { Metadata } from 'next'
import { PageHeader } from '@/components/DocArticle'
import { CHANGE_LABEL, LEVEL_LABEL, listCompanies, loadCompany, renderCompanyDoc } from '@/lib/companies'
import { REPO_URL } from '@/lib/content'

export const dynamicParams = false

export function generateStaticParams() {
  return listCompanies().map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = loadCompany(params.slug)
  return {
    title: `صفحهٔ اعتماد ${c.company}`,
    alternates: { canonical: `/companies/${c.slug}/`, types: { 'application/atom+xml': `/companies/${c.slug}/feed.xml` } },
    robots: c.fictional ? { index: false } : undefined,
  }
}

const faDigits = (s: string) => s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[+d])

export default async function CompanyPage({ params }: { params: { slug: string } }) {
  const c = loadCompany(params.slug)
  const main = c.docs[0]
  const doc = main ? await renderCompanyDoc(main.file) : null
  const fm = (doc?.data || {}) as any
  const versions = [...c.document_versions].reverse()

  return (
    <>
      <PageHeader eyebrow="صفحهٔ اعتماد" title={c.company} lead={<span dir="ltr" className="font-mono text-base">{c.domain}</span>} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_20rem]">
        <div className="min-w-0">
          {c.fictional && (
            <p className="mb-8 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-950">
              این شرکت واقعی نیست. آن را ساخته‌ایم تا نشان دهیم صفحهٔ اعتماد و نسخه‌های سند چه شکلی دارند.
            </p>
          )}

          {fm.data?.collected?.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-4 text-xl font-bold text-neutral-950">چه داده‌هایی جمع می‌شود</h2>
              <div className="overflow-x-auto rounded-lg border border-neutral-200">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50 text-start text-neutral-600">
                    <tr>
                      {['داده', 'برای چه', 'مبنای قانونی', 'تا کی نگه داشته می‌شود'].map((h) => (
                        <th key={h} className="px-4 py-3 text-start font-medium">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {fm.data.collected.map((r: any) => (
                      <tr key={r.category}>
                        <td className="px-4 py-3 font-medium text-neutral-900">
                          {r.category}
                          {r.sensitive && <span className="chip ms-2 border-red-200 bg-red-50 text-red-800">حساس</span>}
                        </td>
                        <td className="px-4 py-3 text-neutral-700">{r.purpose}</td>
                        <td className="px-4 py-3 text-neutral-700">{r.basis}</td>
                        <td className="px-4 py-3 text-neutral-700">{r.retention}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {doc && (
            <section>
              <h2 className="mb-2 text-xl font-bold text-neutral-950">متن کامل سند</h2>
              <p className="mb-6 text-sm text-neutral-500">
                {doc.title} · نسخهٔ <span dir="ltr">{fm.document_version}</span>
              </p>
              <article className="doc rounded-xl border border-neutral-200 p-6 sm:p-8" dangerouslySetInnerHTML={{ __html: doc.html }} />
            </section>
          )}
        </div>

        <aside className="space-y-6 text-sm">
          <div className="rounded-xl border border-neutral-200 p-5">
            <h2 className="font-bold text-neutral-950">سطح</h2>
            <p className="mt-2 text-2xl font-bold text-neutral-950">{LEVEL_LABEL[c.level].fa}</p>
            <dl className="mt-3 space-y-1 text-neutral-600">
              <div className="flex justify-between gap-2"><dt>تاریخ اعطا</dt><dd dir="ltr">{c.level_granted ? faDigits(String(c.level_granted)) : '-'}</dd></div>
              <div className="flex justify-between gap-2"><dt>معتبر تا</dt><dd dir="ltr">{c.level_expires ? faDigits(String(c.level_expires)) : '-'}</dd></div>
              <div className="flex justify-between gap-2"><dt>روش اثبات دامنه</dt><dd dir="ltr" className="font-mono text-xs">{c.domain_proof}</dd></div>
            </dl>
          </div>

          {fm.data && (
            <div className="rounded-xl border border-neutral-200 p-5">
              <h2 className="font-bold text-neutral-950">خلاصه</h2>
              <dl className="mt-3 space-y-3 text-neutral-700">
                <div><dt className="text-neutral-500">داده‌ها کجا نگه داشته می‌شوند</dt><dd>{fm.data.data_location}</dd></div>
                <div>
                  <dt className="text-neutral-500">فروش داده یا دادن آن برای تبلیغات</dt>
                  <dd>{fm.data.sells_or_shares_for_ads ? 'بله' : 'خیر'}</dd>
                </div>
                {fm.data.third_parties?.length > 0 && (
                  <div>
                    <dt className="text-neutral-500">اشخاص ثالث</dt>
                    <dd>
                      <ul className="mt-1 space-y-1">
                        {fm.data.third_parties.map((t: any) => (
                          <li key={t.name}>{t.name} <span className="text-neutral-500">({t.purpose}، {t.country})</span></li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
                {fm.contact && (
                  <div>
                    <dt className="text-neutral-500">مسئول حریم خصوصی</dt>
                    <dd>{fm.contact.privacy_owner}<br /><span dir="ltr">{fm.contact.email}</span></dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <div className="rounded-xl border border-neutral-200 p-5">
            <h2 className="font-bold text-neutral-950">نسخه‌های سند</h2>
            <ol className="mt-3 space-y-3">
              {versions.map((v, i) => (
                <li key={v.version} className="flex items-baseline justify-between gap-2">
                  <span>
                    <span dir="ltr" className="font-mono">{v.version}</span>
                    {i === 0 && <span className="chip ms-2 border-accent/30 bg-accent-soft text-accent-ink">فعلی</span>}
                    <span className="block text-xs text-neutral-500">{CHANGE_LABEL[v.change_type] || v.change_type}</span>
                  </span>
                  <span dir="ltr" className="text-xs text-neutral-500">{faDigits(v.date)}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex flex-col gap-1 border-t border-neutral-100 pt-3">
              <a className="text-accent hover:underline" href={`${REPO_URL}/commits/main/company-docs/${c.slug}`} target="_blank" rel="noopener noreferrer">
                تاریخچهٔ کامل تغییرات
              </a>
              <a className="text-accent hover:underline" href={`/companies/${c.slug}/feed.xml`}>دنبال کردن تغییرات (خوراک Atom)</a>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
