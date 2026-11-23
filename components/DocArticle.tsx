import { repoFileUrl } from '@/lib/content'

export function PageHeader({ title, lead, eyebrow }: { title: string; lead?: React.ReactNode; eyebrow?: string }) {
  return (
    <div className="border-b border-neutral-200 bg-neutral-50">
      <div className="container-page py-12 sm:py-16">
        {eyebrow && <p className="mb-3 text-sm font-medium text-accent">{eyebrow}</p>}
        <h1 className="text-3xl font-bold leading-tight text-neutral-950 sm:text-4xl">{title}</h1>
        {lead && <div className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600">{lead}</div>}
      </div>
    </div>
  )
}

export default function DocArticle({
  title,
  html,
  file,
  lang = 'fa',
  eyebrow,
}: {
  title: string
  html: string
  file?: string
  lang?: 'fa' | 'en'
  eyebrow?: string
}) {
  return (
    <>
      <PageHeader title={title} eyebrow={eyebrow} />
      <div className="container-page py-12">
        <article className="doc mx-auto max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />
        {file && (
          <p className="mx-auto mt-14 max-w-3xl border-t border-neutral-200 pt-6 text-sm text-neutral-500">
            {lang === 'fa' ? 'این صفحه از مخزن باز IOP ساخته می‌شود. ' : 'This page is built from the open IOP repository. '}
            <a href={repoFileUrl(file)} className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
              {lang === 'fa' ? 'مشاهده و پیشنهاد ویرایش در گیت‌هاب' : 'View or suggest an edit on GitHub'}
            </a>
          </p>
        )}
      </div>
    </>
  )
}
