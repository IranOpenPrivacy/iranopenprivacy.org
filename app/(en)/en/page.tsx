import type { Metadata } from 'next'
import Link from 'next/link'
import { dropSections, readContent, renderDoc, renderMarkdown } from '@/lib/content'

export const metadata: Metadata = {
  title: { absolute: 'Iran Open Privacy | An open privacy standard for Iranian digital products' },
  alternates: { canonical: '/en/', languages: { fa: '/' } },
}

export default async function EnHome() {
  const intro = await renderMarkdown(
    dropSections(readContent('README.en.md'), ['Repository map', 'Validate locally']),
    'README.en.md',
  )
  const overview = await renderDoc('docs/en/overview.md')
  return (
    <>
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="container-page py-16 sm:py-20">
          <p className="mb-4 inline-flex rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm text-amber-900">
            Draft 0.1, open for public comment. No company has been verified yet.
          </p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-neutral-950 sm:text-5xl">
            An open privacy standard for Iranian digital products
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
            Community-run, open source and non-profit. Checkable controls, versioned company privacy documents, and three levels
            named by what is actually proven.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/en/standard/" className="btn-primary">Read the controls</Link>
            <Link href="/" className="btn-ghost" hrefLang="fa">Persian site (full documentation)</Link>
          </div>
        </div>
      </section>
      <div className="container-page py-12">
        <article className="doc mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: intro.html }} />
        <hr className="mx-auto my-12 max-w-3xl border-neutral-200" />
        <article className="doc mx-auto max-w-3xl">
          <h2>{overview.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: overview.html }} />
        </article>
      </div>
    </>
  )
}
