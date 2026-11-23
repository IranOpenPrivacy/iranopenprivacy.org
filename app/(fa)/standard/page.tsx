import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/DocArticle'
import ChecklistExplorer from '@/components/ChecklistExplorer'
import { checklistCounts, loadChecklist, prepareChecklist } from '@/lib/checklist'
import { REPO_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'استاندارد: کنترل‌های حریم خصوصی',
  description: 'همهٔ کنترل‌های استاندارد IOP در ۹ حوزه: هر کنترل چه می‌خواهد، چطور بررسی می‌شود و به کدام بند GDPR، ISO 27701 و OWASP ASVS مربوط است.',
  alternates: { canonical: '/standard/', languages: { en: '/en/standard/' } },
}

const fa = (n: number) => n.toLocaleString('fa-IR')

export default function StandardPage() {
  const domains = prepareChecklist('fa')
  const c = checklistCounts(loadChecklist())
  return (
    <>
      <PageHeader
        eyebrow="استاندارد IOP · پیش‌نویس ۰٫۱"
        title="کنترل‌های حریم خصوصی"
        lead={
          <>
            {fa(c.total)} کنترل در {fa(domains.length)} حوزه. سطح ۱ با {fa(c[1])} کنترل شروع می‌شود، سطح ۲ {fa(c[2])} کنترل دیگر به آن
            اضافه می‌کند و سطح ۳ هم {fa(c[3])} کنترل. پس شرکتی که سطح ۲ می‌خواهد باید همهٔ کنترل‌های سطح ۱ و ۲ را داشته باشد.
            معنای هر سطح را در صفحهٔ{' '}
            <Link href="/levels/" className="text-accent hover:underline">سطح‌ها</Link> ببینید.
          </>
        }
      />
      <div className="container-page py-10">
        <div className="mb-10 grid gap-4 text-sm sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"><b>خودکار:</b> ابزار بررسی آن را از بیرون می‌سنجد، بی‌آنکه کسی داوری کند ({fa(c.auto)} کنترل).</div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900"><b>اظهار:</b> شرکت علناً اعلام می‌کند که آن را رعایت می‌کند و پای حرفش می‌ایستد.</div>
          <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 text-violet-900"><b>بازبینی:</b> بازبین شواهد واقعی را می‌بیند و دربارهٔ آن نظر می‌دهد.</div>
        </div>
        <ChecklistExplorer domains={domains} lang="fa" />
        <p className="mt-14 text-sm text-neutral-500">
          منبع ماشین‌خوان:{' '}
          <a className="text-accent hover:underline" href={`${REPO_URL}/tree/main/checklist`} target="_blank" rel="noopener noreferrer">
            checklist/*.yaml
          </a>
          . نگاشت‌ها به قوانین ایران (حوزهٔ ۹ و موارد «محلی») پیش‌نویس‌اند و هنوز وکیلی آن‌ها را بازبینی نکرده است.
        </p>
      </div>
    </>
  )
}
