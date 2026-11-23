import Link from 'next/link'
import type { Metadata } from 'next'
import { PageHeader } from '@/components/DocArticle'
import { REPO_URL } from '@/lib/content'

export const metadata: Metadata = { title: 'تماس', alternates: { canonical: '/contact/' } }

const ITEMS = [
  { t: 'ایمیل عمومی', d: 'پرسش، پیشنهاد، همکاری حقوقی یا رسانه‌ای.', v: 'contact@iranopenprivacy.org', href: 'mailto:contact@iranopenprivacy.org', ltr: true },
  { t: 'گزارش مشکل امنیتی', d: 'دربارهٔ خود پروژه یا این سایت. پیش از ارسال، سیاست امنیتی را بخوانید.', v: 'سیاست امنیتی', href: '/security/' },
  { t: 'گفت‌وگوی عمومی', d: 'نظر روی پیش‌نویس، گزارش خطا در متن یا پیشنهاد تغییر.', v: 'Issueهای گیت‌هاب', href: `${REPO_URL}/issues/new/choose` },
  { t: 'نام مستعار', d: 'برای مشارکت لازم نیست نام واقعی خود را اعلام کنید. در Issueهای عمومی نام واقعی ننویسید.', v: 'ایمنی مشارکت‌کنندگان', href: '/safety/' },
]

export default function ContactPage() {
  return (
    <>
      <PageHeader title="تماس" lead="IOP فرم تماس یا ردیاب ندارد. از یکی از مسیرهای زیر استفاده کنید." />
      <div className="container-page py-12">
        <ul className="grid gap-4 md:grid-cols-2">
          {ITEMS.map((i) => {
            const external = i.href.startsWith('http')
            const Comp: any = i.href.startsWith('/') ? Link : 'a'
            return (
              <li key={i.t} className="rounded-xl border border-neutral-200 p-6">
                <h2 className="font-bold text-neutral-950">{i.t}</h2>
                <p className="mt-2 leading-8 text-neutral-600">{i.d}</p>
                <Comp
                  href={i.href}
                  className="mt-3 inline-block font-medium text-accent hover:underline"
                  dir={i.ltr ? 'ltr' : undefined}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {i.v}
                </Comp>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
