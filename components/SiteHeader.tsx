'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Logo from './Logo'

const NAV = {
  fa: [
    { href: '/standard/', label: 'استاندارد' },
    { href: '/levels/', label: 'سطح‌ها' },
    { href: '/process/', label: 'فرایند' },
    { href: '/companies/', label: 'شرکت‌ها' },
    { href: '/governance/', label: 'شیوهٔ اداره' },
    { href: '/contribute/', label: 'مشارکت' },
    { href: '/faq/', label: 'پرسش‌ها' },
  ],
  en: [
    { href: '/en/', label: 'Overview' },
    { href: '/en/standard/', label: 'Standard' },
  ],
}

export default function SiteHeader({ lang }: { lang: 'fa' | 'en' }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname() || '/'
  const links = NAV[lang]
  const isActive = (href: string) =>
    href === '/en/' ? pathname === '/en/' || pathname === '/en' : pathname.startsWith(href)

  const langSwitch =
    lang === 'fa'
      ? { href: '/en/', label: 'English', hreflang: 'en' }
      : { href: '/', label: 'فارسی', hreflang: 'fa' }

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label={lang === 'fa' ? 'ناوبری اصلی' : 'Main'}>
        <Logo href={lang === 'fa' ? '/' : '/en/'} />
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-md px-3 py-2 text-[15px] transition-colors ${
                  isActive(l.href) ? 'bg-accent-soft text-accent-ink' : 'text-neutral-700 hover:text-neutral-950'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ms-2 border-s border-neutral-200 ps-3">
            <Link href={langSwitch.href} hrefLang={langSwitch.hreflang} className="text-sm text-neutral-500 hover:text-neutral-900">
              {langSwitch.label}
            </Link>
          </li>
        </ul>
        <button
          className="-me-2 rounded-md p-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={lang === 'fa' ? 'منو' : 'Menu'}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
          </svg>
        </button>
      </nav>
      {open && (
        <ul className="container-page border-t border-neutral-200 pb-4 pt-2 lg:hidden">
          {[...links, langSwitch].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className={`block rounded-md px-3 py-2.5 ${isActive(l.href) ? 'text-accent' : 'text-neutral-800'}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
