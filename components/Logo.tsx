import Link from 'next/link'

export function LogoMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M8 4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 4H18C19.1 4 20 4.9 20 6V18C20 19.1 19.1 20 18 20H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill="#276EF6" />
    </svg>
  )
}

export default function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-neutral-950 hover:opacity-80" dir="ltr" aria-label="Iran Open Privacy">
      <LogoMark />
      <span className="text-xl font-bold tracking-tight">IOP.</span>
    </Link>
  )
}
