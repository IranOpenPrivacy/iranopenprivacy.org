import type { Metadata } from 'next'
import '../globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ایران اوپن پرایوسی | استاندارد باز حریم خصوصی',
    template: '%s | ایران اوپن پرایوسی',
  },
  description: 'استانداردی باز و بی‌طرف برای حریم خصوصی در محصولات دیجیتال ایرانی، با سه سطح راستی‌آزمایی و سند نسخه‌دار برای هر شرکت.',
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  alternates: { languages: { en: '/en/' } },
  openGraph: { siteName: 'Iran Open Privacy', locale: 'fa_IR', type: 'website' },
}

export default function FaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preload" href="/fonts/DastkhatBar-Variable.woff2?v=1.210" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-white focus:p-2">
          رفتن به محتوا
        </a>
        <SiteHeader lang="fa" />
        <main id="main">{children}</main>
        <SiteFooter lang="fa" />
      </body>
    </html>
  )
}
