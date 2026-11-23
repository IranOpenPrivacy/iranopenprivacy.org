import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/DocArticle'
import { DOC_PAGES, renderDoc } from '@/lib/content'

export const metadata: Metadata = { title: 'همهٔ اسناد', alternates: { canonical: '/docs/' } }

const GROUPS = { standard: 'استاندارد', project: 'پروژه و اداره‌اش', policy: 'مشارکت و قواعد' } as const

export default async function DocsIndex() {
  const docs = await Promise.all(
    DOC_PAGES.filter((d) => d.lang === 'fa').map(async (d) => ({ ...d, title: (await renderDoc(d.file)).title })),
  )
  const extra = { standard: [{ slug: 'standard', title: 'جدول کنترل‌ها', file: 'checklist/*.yaml' }] } as Record<string, any[]>
  return (
    <>
      <PageHeader title="همهٔ اسناد" lead="همهٔ این صفحه‌ها مستقیم از مخزن عمومی IOP ساخته می‌شوند. اگر متن فارسی و انگلیسی با هم فرق داشت، فارسی ملاک است." />
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        {(Object.keys(GROUPS) as (keyof typeof GROUPS)[]).map((g) => (
          <section key={g}>
            <h2 className="mb-4 text-lg font-bold text-neutral-950">{GROUPS[g]}</h2>
            <ul className="space-y-1">
              {[...(extra[g] || []), ...docs.filter((d) => d.group === g)].map((d) => (
                <li key={d.slug}>
                  <Link href={`/${d.slug}/`} className="group flex items-baseline justify-between gap-3 rounded-md px-3 py-2 hover:bg-neutral-50">
                    <span className="text-neutral-800 group-hover:text-accent">{d.title}</span>
                    <span className="font-mono text-xs text-neutral-400" dir="ltr">{d.file.split('/').pop()}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="container-page">
        <p className="text-sm text-neutral-500">
          <Link href="/en/" className="text-accent hover:underline">English overview</Link>
        </p>
      </div>
    </>
  )
}
