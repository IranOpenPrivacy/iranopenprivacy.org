import Link from 'next/link'
import { REPO_URL } from '@/lib/content'
import { LogoMark } from './Logo'

const COLS_FA = [
  {
    title: 'استاندارد',
    links: [
      ['/manifesto/', 'بیانیه'],
      ['/scope/', 'دامنه'],
      ['/standard/', 'کنترل‌ها'],
      ['/levels/', 'سطح‌ها'],
      ['/process/', 'فرایند راستی‌آزمایی'],
      ['/privacy-documents/', 'سند حریم خصوصی'],
      ['/trust-page/', 'صفحهٔ اعتماد'],
      ['/glossary/', 'واژه‌نامه'],
    ],
  },
  {
    title: 'پروژه',
    links: [
      ['/governance/', 'اداره و تصمیم‌گیری'],
      ['/conflict-of-interest/', 'تعارض منافع'],
      ['/funding/', 'تأمین مالی'],
      ['/roadmap/', 'نقشهٔ راه'],
      ['/safety/', 'ایمنی و ریسک‌ها'],
      ['/legal-notes/', 'یادداشت‌های حقوقی'],
      ['/faq/', 'پرسش‌های متداول'],
    ],
  },
  {
    title: 'مشارکت',
    links: [
      ['/contribute/', 'راهنمای مشارکت'],
      ['/code-of-conduct/', 'آیین‌نامهٔ رفتار'],
      ['/security/', 'سیاست امنیتی'],
      ['/licenses/', 'مجوزها'],
      ['/changelog/', 'تغییرنامه'],
      ['/docs/', 'همهٔ اسناد'],
      ['/contact/', 'تماس'],
    ],
  },
]

export default function SiteFooter({ lang }: { lang: 'fa' | 'en' }) {
  if (lang === 'en') {
    return (
      <footer className="mt-24 border-t border-neutral-200 bg-neutral-50">
        <div className="container-page flex flex-col gap-4 py-10 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-neutral-900">
            <LogoMark className="h-5 w-5" /> Iran Open Privacy
          </div>
          <p>
            Standard and docs: CC BY-SA 4.0. Code: AGPL-3.0.{' '}
            <a className="text-accent hover:underline" href={REPO_URL}>Source on GitHub</a> ·{' '}
            <a className="text-accent hover:underline" href="mailto:contact@iranopenprivacy.org">contact@iranopenprivacy.org</a>
          </p>
        </div>
      </footer>
    )
  }
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-neutral-50">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-neutral-950">
            <LogoMark className="h-6 w-6" /> ایران اوپن پرایوسی
          </div>
          <p className="mt-3 text-sm leading-7 text-neutral-600">
            استانداردی باز و بی‌طرف برای حریم خصوصی در محصولات دیجیتال ایرانی. از هر دولت و از هر شرکتی که بررسی می‌کنیم مستقلیم.
          </p>
          <p className="mt-4 text-sm">
            <a href={REPO_URL} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              مخزن در گیت‌هاب
            </a>
          </p>
        </div>
        {COLS_FA.map((col) => (
          <div key={col.title}>
            <h2 className="text-sm font-semibold text-neutral-950">{col.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-neutral-600 hover:text-accent">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-200">
        <p className="container-page py-5 text-xs leading-6 text-neutral-500">
          متن استاندارد و مستندات با مجوز CC BY-SA 4.0 و کد با مجوز AGPL-3.0 منتشر می‌شود. مطالب این سایت مشاورهٔ حقوقی نیست.
        </p>
      </div>
    </footer>
  )
}
