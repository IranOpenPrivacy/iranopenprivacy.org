import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/DocArticle'
import ChecklistExplorer from '@/components/ChecklistExplorer'
import { checklistCounts, loadChecklist, prepareChecklist } from '@/lib/checklist'
import { REPO_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'استاندارد: کنترل‌های حریم خصوصی',
  description: 'کنترل‌های قابل بررسی استاندارد IOP در ۹ حوزه، با نوع بررسی، شواهد و نگاشت به GDPR، ISO 27701 و OWASP ASVS.',
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
            {fa(c.total)} کنترل قابل بررسی در {fa(domains.length)} حوزه. سطح ۱ ({fa(c[1])} کنترل)، سطح ۲ ({fa(c[2])} کنترل افزوده)
            و سطح ۳ ({fa(c[3])} کنترل افزوده). سطح ۲ همهٔ کنترل‌های سطح ۱ و ۲ را می‌خواهد. هر سطح چه معنایی دارد؟{' '}
            <Link href="/levels/" className="text-accent hover:underline">سطح‌ها</Link>
          </>
        }
      />
      <div className="container-page py-10">
        <div className="mb-10 grid gap-4 text-sm sm:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900"><b>خودکار:</b> ابزار بررسی، بدون قضاوت انسانی ({fa(c.auto)} کنترل).</div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900"><b>اظهار:</b> شرکت علناً اعلام می‌کند و مسئولیتش را می‌پذیرد.</div>
          <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 text-violet-900"><b>بازبینی:</b> بازبین انسانی شواهد را بررسی می‌کند.</div>
        </div>
        <ChecklistExplorer domains={domains} lang="fa" />
        <p className="mt-14 text-sm text-neutral-500">
          منبع ماشین‌خوان:{' '}
          <a className="text-accent hover:underline" href={`${REPO_URL}/tree/main/checklist`} target="_blank" rel="noopener noreferrer">
            checklist/*.yaml
          </a>
          . نگاشت به قوانین ایران (حوزهٔ ۹ و بخش «محلی») پیش‌نویس است و هنوز بازبینی حقوقی نشده.
        </p>
      </div>
    </>
  )
}
