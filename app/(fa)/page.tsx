import Link from 'next/link'
import type { Metadata } from 'next'
import { checklistCounts, loadChecklist } from '@/lib/checklist'
import { REPO_URL } from '@/lib/content'

export const metadata: Metadata = { alternates: { canonical: '/', languages: { en: '/en/' } } }

const fa = (n: number) => n.toLocaleString('fa-IR')

const LEVELS = [
  {
    n: '۱',
    name: 'اظهارشده',
    en: 'Declared',
    what: 'شرکت چک‌لیست را علناً اظهار کرده و شواهد عمومی آن به‌صورت خودکار بررسی شده است.',
    who: 'ابزار خودکار، بدون قضاوت انسانی',
    when: 'بررسی ماهانه، انقضا پس از ۱۲ ماه',
  },
  {
    n: '۲',
    name: 'تأییدشده',
    en: 'Verified',
    what: 'شواهد واقعی (سیاست‌ها، جریان داده، پیکربندی) در یک زمان مشخص بازبینی شده است.',
    who: 'دو بازبین جامعه و تأیید یک نگهدارنده',
    when: 'هر ۱۲ ماه، با گزارش عمومی',
  },
  {
    n: '۳',
    name: 'تأیید مستمر',
    en: 'Continuously Verified',
    what: 'کنترل‌های تأییدشده در طول زمان هم برقرار می‌مانند.',
    who: 'ممیز پولی معتبر و بررسی‌های دوره‌ای IOP',
    when: 'فعلاً ارائه نمی‌شود',
    muted: true,
  },
]

const ROLES = [
  { who: 'کاربر یا علاقه‌مند', what: 'نظر دادن روی پیش‌نویس استاندارد', href: `${REPO_URL}/issues/new/choose`, cta: 'ثبت نظر' },
  { who: 'صاحب یا مدیر یک شرکت', what: 'شرکت‌کنندهٔ آزمایشی شدن (ماه‌های اول رایگان)', href: `${REPO_URL}/issues/new?template=company-application.yml`, cta: 'درخواست شرکت' },
  { who: 'متخصص امنیت یا حریم خصوصی', what: 'بازبین شدن، با نام مستعار هم ممکن است', href: `${REPO_URL}/issues/new?template=reviewer-application.yml`, cta: 'درخواست بازبین' },
  { who: 'وکیل حوزهٔ فناوری', what: 'بازبینی حقوقی حوزهٔ «زمینهٔ محلی»', href: '/contact/', cta: 'تماس' },
  { who: 'توسعه‌دهنده', what: 'ابزار بررسی خودکار و تولیدکنندهٔ صفحه', href: '/contribute/', cta: 'راهنمای مشارکت' },
  { who: 'مترجم', what: 'ترجمه و بازبینی متن فارسی و انگلیسی', href: '/contribute/', cta: 'راهنمای مشارکت' },
]

export default function Home() {
  const c = checklistCounts(loadChecklist())
  return (
    <>
      <section className="border-b border-neutral-200">
        <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-900">
              پیش‌نویس ۰٫۱، در حال نظرخواهی عمومی. هنوز به هیچ شرکتی سطحی داده نشده است.
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.35] text-neutral-950 sm:text-5xl">
              حریم خصوصی، <span className="text-accent">قابل بررسی</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-neutral-600">
              ایران اوپن پرایوسی (IOP) استانداردی باز، جامعه‌محور و غیرانتفاعی برای محصولات دیجیتال ایرانی است. ادعای شرکت‌ها
              دربارهٔ دادهٔ کاربران را با چک‌لیست عمومی، سند نسخه‌دار و شواهد قابل بررسی می‌کند.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/standard/" className="btn-primary">دیدن استاندارد</Link>
              <Link href="/contribute/" className="btn-ghost">مشارکت در پروژه</Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
            {[
              [fa(c.total), 'کنترل قابل بررسی'],
              ['۹', 'حوزه'],
              ['۳', 'سطح، بر اساس آنچه اثبات شده'],
              [fa(c.auto), 'کنترل با بررسی خودکار'],
            ].map(([v, l]) => (
              <div key={l} className="bg-white p-6">
                <dt className="sr-only">{l}</dt>
                <dd className="text-4xl font-bold text-neutral-950">{v}</dd>
                <dd className="mt-1 text-sm text-neutral-500">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-2xl font-bold text-neutral-950 sm:text-3xl">چرا این پروژه؟</h2>
        <p className="mt-4 max-w-3xl text-lg leading-9 text-neutral-600">
          کاربر ایرانی برای اعتماد به یک اپ یا سرویس اغلب فقط یک متن بی‌پشتوانه در صفحهٔ «قوانین و مقررات» می‌بیند. راهی ندارد
          بررسی کند شرکت واقعاً چه داده‌ای نگه می‌دارد، با چه کسانی به اشتراک می‌گذارد و چه زمانی حذف می‌کند. IOP سه چیز را
          عمومی منتشر می‌کند:
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ['یک استاندارد باز', 'چک‌لیست ماشین‌خوان حریم خصوصی، منطبق با GDPR، ISO 27701 و OWASP ASVS و تطبیق‌یافته با شرایط ایران.', '/standard/'],
            ['راستی‌آزمایی در سه سطح', 'هر سطح دقیقاً می‌گوید چه چیزی اثبات شده، چه کسی اثبات کرده و هر چند وقت یک‌بار.', '/process/'],
            ['سند نسخه‌دار و صفحهٔ اعتماد', 'سند حریم خصوصی هر شرکت با تاریخچهٔ کامل و شواهد قابل بررسی، روی یک صفحهٔ عمومی.', '/privacy-documents/'],
          ].map(([t, d, href], i) => (
            <Link key={t} href={href} className="group rounded-xl border border-neutral-200 p-6 transition-colors hover:border-accent">
              <span className="font-mono text-sm text-accent">{fa(i + 1)}</span>
              <h3 className="mt-2 text-lg font-bold text-neutral-950 group-hover:text-accent">{t}</h3>
              <p className="mt-2 leading-8 text-neutral-600">{d}</p>
            </Link>
          ))}
        </div>
        <blockquote className="mt-14 border-s-4 border-accent ps-5 text-xl font-medium leading-9 text-neutral-900">
          «نشان بدون شواهد، نمایش است.»
          <span className="mt-1 block text-base font-normal text-neutral-500">
            هیچ نشانی در IOP بدون پیوند به شواهد و تاریخ انقضا منتشر نمی‌شود.
          </span>
        </blockquote>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-950 sm:text-3xl">سه سطح</h2>
              <p className="mt-3 max-w-2xl leading-8 text-neutral-600">
                سطح‌ها بر اساس «چه چیزی اثبات شده» نام‌گذاری شده‌اند، نه با مدال. سطح ۱ هرگز «گواهی» نامیده نمی‌شود.
              </p>
            </div>
            <Link href="/levels/" className="text-accent hover:underline">جزئیات سطح‌ها ←</Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {LEVELS.map((l) => (
              <div key={l.n} className={`rounded-xl border bg-white p-6 ${l.muted ? 'border-dashed border-neutral-300' : 'border-neutral-200'}`}>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-neutral-500">سطح {l.n}</span>
                  <span className="text-xs text-neutral-400" dir="ltr">{l.en}</span>
                </div>
                <h3 className={`mt-2 text-2xl font-bold ${l.muted ? 'text-neutral-500' : 'text-neutral-950'}`}>{l.name}</h3>
                <p className="mt-3 leading-8 text-neutral-700">{l.what}</p>
                <dl className="mt-5 space-y-2 border-t border-neutral-100 pt-4 text-sm">
                  <div className="flex gap-2"><dt className="text-neutral-500">بررسی:</dt><dd className="text-neutral-800">{l.who}</dd></div>
                  <div className="flex gap-2"><dt className="text-neutral-500">تناوب:</dt><dd className="text-neutral-800">{l.when}</dd></div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-2xl font-bold text-neutral-950 sm:text-3xl">چطور کار می‌کند؟</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {[
            ['سند', 'شرکت سند حریم خصوصی خود را در قالب IOP می‌نویسد و مالکیت دامنه‌اش را ثابت می‌کند.'],
            ['نسخه', 'IOP سند را با شناسهٔ پایدار منتشر می‌کند. هر ویرایش یک نسخهٔ جدید و دائمی است.'],
            ['شواهد', 'شواهد بررسی می‌شود: خودکار برای سطح ۱، با بازبین انسانی برای سطح ۲.'],
            ['صفحهٔ اعتماد', 'صفحهٔ اعتماد عمومی و گواهی امضاشده برای همان نسخهٔ سند منتشر می‌شود.'],
          ].map(([t, d], i) => (
            <li key={t} className="relative rounded-xl border border-neutral-200 p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">{fa(i + 1)}</span>
              <h3 className="mt-4 font-bold text-neutral-950">{t}</h3>
              <p className="mt-2 text-[15px] leading-7 text-neutral-600">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 leading-8 text-neutral-600">
          تغییر عمده در رویهٔ داده، سطح را تا بازبینی دوباره به «تغییر کرده از زمان تأیید» تبدیل می‌کند.{' '}
          <Link href="/process/" className="text-accent hover:underline">فرایند راستی‌آزمایی</Link>
        </p>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-950 text-white">
        <div className="container-page py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">چطور مشارکت کنم؟</h2>
          <p className="mt-3 max-w-2xl leading-8 text-neutral-300">
            بازبین‌ها و مشارکت‌کنندگان می‌توانند با نام مستعار فعالیت کنند. هویت واقعی فقط نزد نگهدارنده‌هاست.{' '}
            <Link href="/safety/" className="text-white underline underline-offset-4">ایمنی مشارکت‌کنندگان</Link>
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => {
              const external = r.href.startsWith('http')
              return (
                <li key={r.who + r.what}>
                  <a
                    href={r.href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex h-full flex-col rounded-xl border border-neutral-800 p-5 transition-colors hover:border-accent"
                  >
                    <span className="text-sm text-neutral-400">{r.who}</span>
                    <span className="mt-1 flex-1 font-medium leading-7">{r.what}</span>
                    <span className="mt-4 text-sm text-accent">{r.cta} ←</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="container-page py-20">
        <h2 className="text-2xl font-bold text-neutral-950 sm:text-3xl">چه نیستیم</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            ['قانون نیستیم', 'و نهادی دولتی هم نیستیم. IOP از هر دولت و از هر شرکتی که بررسی می‌کند مستقل است.'],
            ['مشاور حقوقی نیستیم', 'هیچ‌چیز در این سایت و مخزن مشاورهٔ حقوقی نیست.'],
            ['فروشندهٔ امنیت نیستیم', 'خدمات امنیتی، در صورت لزوم، پروژه‌ای جدا با نامی جدا خواهد بود.'],
            ['نشان‌فروش نیستیم', 'هزینهٔ گواهی صرفاً بابت کار راستی‌آزمایی است، نه بابت نتیجه.'],
          ].map(([t, d]) => (
            <li key={t} className="border-s-2 border-neutral-200 ps-4">
              <h3 className="font-bold text-neutral-950">{t}</h3>
              <p className="mt-1 leading-8 text-neutral-600">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-neutral-600">
          نسخهٔ فعلی پیش‌نویس ۰٫۱ است (آذر ۱۴۰۵). حوزهٔ ۹ (زمینهٔ محلی) هنوز بازبینی حقوقی نشده.{' '}
          <Link href="/roadmap/" className="text-accent hover:underline">نقشهٔ راه</Link>
        </p>
      </section>
    </>
  )
}
