import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import DocArticle from '@/components/DocArticle'
import { DOC_PAGES, findDoc, renderDoc } from '@/lib/content'

export const dynamicParams = false

export function generateStaticParams() {
  return DOC_PAGES.filter((d) => d.lang === 'fa').map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doc = findDoc(params.slug, 'fa')
  if (!doc) return {}
  const { title } = await renderDoc(doc.file)
  return { title, alternates: { canonical: `/${doc.slug}/` } }
}

export default async function DocPage({ params }: { params: { slug: string } }) {
  const doc = findDoc(params.slug, 'fa')
  if (!doc) notFound()
  const { title, html } = await renderDoc(doc.file)
  return <DocArticle title={title} html={html} file={doc.file} />
}
