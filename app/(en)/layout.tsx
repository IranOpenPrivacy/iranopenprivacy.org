import type { Metadata } from 'next'
import '@fontsource-variable/vazirmatn'
import '../globals.css'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import { SITE_URL } from '@/lib/content'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Iran Open Privacy | An open privacy standard', template: '%s | Iran Open Privacy' },
  description: 'An open, community-run privacy standard and verification program for Iranian digital products.',
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
  alternates: { languages: { fa: '/' } },
  openGraph: { siteName: 'Iran Open Privacy', locale: 'en_US', type: 'website' },
}

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <SiteHeader lang="en" />
        <main id="main">{children}</main>
        <SiteFooter lang="en" />
      </body>
    </html>
  )
}
