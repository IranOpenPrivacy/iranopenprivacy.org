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
    what: 'شرکت علناً اعلام کرده کنترل‌های سطح ۱ را رعایت می‌کند و ابزار خودکار آنچه را از بیرون دیدنی است با این ادعا مقایسه کرده.',
    who: 'ابزار خودکار، بدون داوری انسانی',
    when: 'بررسی هر ماه، اعتبار ۱۲ ماهه',
  },
  {
    n: '۲',
    name: 'تأییدشده',
    en: 'Verified',
    what: 'دو بازبین مستقل شواهد واقعی شرکت را دیده‌اند: سیاست‌های داخلی، مسیر داده‌ها و پیکربندی سامانه‌ها.',
    who: 'دو بازبین که تصادفی انتخاب می‌شوند و یک نگهدارنده',
    when: 'هر ۱۲ ماه، با گزارش عمومی',
  },
  {
    n: '۳',
    name: 'تأیید مستمر',
    en: 'Continuously Verified',
    what: 'کنترل‌ها فقط یک‌بار بررسی نمی‌شوند؛ در طول سال هم پایش می‌شوند.',
    who: 'ممیز حرفه‌ای و بررسی‌های دوره‌ای IOP',
    when: 'فعلاً ارائه نمی‌شود',
    muted: true,
  },
]

const ROLES = [
  { who: 'کاربر یا علاقه‌مند', what: 'پیش‌نویس را بخوانید و بگویید کجایش مبهم یا ناقص است', href: `${REPO_URL}/issues/new/choose`, cta: 'ثبت نظر' },
  { who: 'مدیر یا مالک یک شرکت', what: 'جزو سه شرکت آزمایشی باشید؛ بررسی این سه رایگان است', href: `${REPO_URL}/issues/new?template=company-application.yml`, cta: 'درخواست شرکت' },
  { who: 'متخصص امنیت یا حریم خصوصی', what: 'بازبین شوید، حتی با نام مستعار', href: `${REPO_URL}/issues/new?template=reviewer-application.yml`, cta: 'درخواست بازبین' },
  { who: 'وکیل حوزهٔ فناوری', what: 'حوزهٔ «زمینهٔ محلی» هنوز بازبینی حقوقی نشده و به کمک شما نیاز دارد', href: '/contact/', cta: 'تماس' },
  { who: 'برنامه‌نویس', what: 'ابزار بررسی خودکار هنوز ساخته نشده؛ از مشخصاتش شروع کنید', href: '/contribute/', cta: 'راهنمای مشارکت' },
  { who: 'مترجم یا ویراستار', what: 'متن فارسی و انگلیسی باید هم‌معنا و روان بمانند', href: '/contribute/', cta: 'راهنمای مشارکت' },
]

export default function Home() {
  const c = checklistCounts(loadChecklist())
  return (
    <>
      <section className="border-b border-neutral-200">
        <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <p className="mb-6 inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-900">
              پیش‌نویس ۰٫۱ برای نظرخواهی عمومی منتشر شده. هنوز به هیچ شرکتی سطحی داده نشده است.
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.35] text-neutral-950 sm:text-5xl">
              حریم خصوصی، <span className="text-accent">با شواهد</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-neutral-600">
              ایران اوپن پرایوسی (IOP) استانداردی باز و غیرانتفاعی برای محصولات دیجیتال ایرانی است که جامعه‌ای داوطلب آن
              را می‌نویسد. با آن می‌شود سنجید شرکتی که می‌گوید از دادهٔ کاربرانش مراقبت می‌کند، واقعاً چه کرده است.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/standard/" className="btn-primary">استاندارد را ببینید</Link>
              <Link href="/contribute/" className="btn-ghost">همراه ما شوید</Link>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200">
            {[
              [fa(c.total), 'کنترل قابل بررسی'],
              ['۹', 'حوزه'],
              ['۳', 'سطح راستی‌آزمایی'],
              [fa(c.auto), 'کنترل که ابزار خودکار می‌سنجد'],
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
          وقتی اپی را نصب می‌کنید، تنها چیزی که دربارهٔ داده‌هایتان می‌بینید معمولاً متنی است در صفحهٔ «قوانین و مقررات».
          نمی‌دانید آن متن کی عوض شده، و راهی ندارید بفهمید شرکت واقعاً چه چیزی نگه می‌دارد، به چه کسی می‌دهد و کی پاک
          می‌کند. IOP می‌خواهد این را عوض کند. برای همین سه چیز را عمومی منتشر می‌کنیم:
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ['استانداردی باز', 'فهرستی از کنترل‌های قابل بررسی که بر پایهٔ GDPR، ISO 27701 و OWASP ASVS نوشته شده و هر جا لازم بوده با شرایط ایران تطبیق داده شده.', '/standard/'],
            ['سه سطح راستی‌آزمایی', 'هر سطح روشن می‌گوید چه چیزی را چه کسی بررسی کرده و این بررسی هر چند وقت تکرار می‌شود.', '/process/'],
            ['سند نسخه‌دار و صفحهٔ اعتماد', 'سند حریم خصوصی هر شرکت با همهٔ نسخه‌های قبلی‌اش، روی صفحه‌ای که هر کسی می‌تواند ببیند.', '/privacy-documents/'],
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
            برای همین هیچ نشانی از IOP بدون پیوند به شواهد و بدون تاریخ انقضا منتشر نمی‌شود.
          </span>
        </blockquote>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="container-page py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-950 sm:text-3xl">سه سطح</h2>
              <p className="mt-3 max-w-2xl leading-8 text-neutral-600">
                نام هر سطح می‌گوید چه چیزی ثابت شده، نه اینکه شرکت چه مدالی گرفته. به همین دلیل سطح ۱ را هیچ‌وقت «گواهی» نمی‌نامیم.
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
                  <div className="flex gap-2"><dt className="text-neutral-500">بررسی‌کننده:</dt><dd className="text-neutral-800">{l.who}</dd></div>
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
            ['سند', 'شرکت سند حریم خصوصی‌اش را در قالب IOP می‌نویسد و نشان می‌دهد صاحب دامنهٔ سایتش است.'],
            ['نسخه', 'سند در نشانی ثابتی منتشر می‌شود. هر ویرایش نسخهٔ تازه‌ای می‌سازد و نسخه‌های قبلی پاک نمی‌شوند.'],
            ['شواهد', 'در سطح ۱ ابزار خودکار شواهد عمومی را می‌سنجد. در سطح ۲ دو بازبین شواهد واقعی را می‌بینند.'],
            ['صفحهٔ اعتماد', 'نتیجه روی صفحهٔ اعتماد شرکت می‌آید، با گواهی امضاشده‌ای که به همان نسخهٔ سند اشاره می‌کند.'],
          ].map(([t, d], i) => (
            <li key={t} className="relative rounded-xl border border-neutral-200 p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">{fa(i + 1)}</span>
              <h3 className="mt-4 font-bold text-neutral-950">{t}</h3>
              <p className="mt-2 text-[15px] leading-7 text-neutral-600">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 leading-8 text-neutral-600">
          اگر شرکت بعداً رویهٔ داده‌اش را به‌طور جدی عوض کند، کنار سطحش «تغییر کرده از زمان تأیید» می‌آید تا دوباره بررسی شود.{' '}
          <Link href="/process/" className="text-accent hover:underline">فرایند راستی‌آزمایی</Link>
        </p>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-950 text-white">
        <div className="container-page py-20">
          <h2 className="text-2xl font-bold sm:text-3xl">چطور مشارکت کنم؟</h2>
          <p className="mt-3 max-w-2xl leading-8 text-neutral-300">
            لازم نیست با نام واقعی بیایید. بازبین‌ها و مشارکت‌کنندگان می‌توانند با نام مستعار کار کنند و هویت واقعی‌شان فقط نزد نگهدارنده‌ها می‌ماند.{' '}
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
        <h2 className="text-2xl font-bold text-neutral-950 sm:text-3xl">IOP چه چیزی نیست</h2>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {[
            ['نهاد دولتی یا قانون‌گذار نیست', 'IOP از هر دولت و از هر شرکتی که بررسی می‌کند مستقل است و دنبال مجوز رسمی هم نیست.'],
            ['مشاور حقوقی نیست', 'سطحی که IOP می‌دهد نمی‌گوید شرکت «قانونی» کار می‌کند. هیچ چیز در این سایت مشاورهٔ حقوقی نیست.'],
            ['شرکت امنیتی نیست', 'تست نفوذ و خدمات امنیتی کار ما نیست. اگر روزی لازم شد، پروژه‌ای جدا با نامی دیگر خواهد بود.'],
            ['نشان نمی‌فروشد', 'هزینهٔ بررسی، وقتی دریافت شود، بابت کار بازبین‌هاست و به نتیجه ربطی ندارد.'],
          ].map(([t, d]) => (
            <li key={t} className="border-s-2 border-neutral-200 ps-4">
              <h3 className="font-bold text-neutral-950">{t}</h3>
              <p className="mt-1 leading-8 text-neutral-600">{d}</p>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-neutral-600">
          نسخهٔ فعلی پیش‌نویس ۰٫۱ است (آذر ۱۴۰۵). حوزهٔ ۹، یعنی «زمینهٔ محلی»، هنوز بازبینی حقوقی نشده است.{' '}
          <Link href="/roadmap/" className="text-accent hover:underline">نقشهٔ راه</Link>
        </p>
      </section>
    </>
  )
}
