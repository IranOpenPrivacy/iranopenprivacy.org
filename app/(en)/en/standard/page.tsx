import type { Metadata } from 'next'
import { PageHeader } from '@/components/DocArticle'
import ChecklistExplorer from '@/components/ChecklistExplorer'
import { checklistCounts, loadChecklist, prepareChecklist } from '@/lib/checklist'
import { REPO_URL } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Standard: privacy controls',
  description: 'The checkable controls of the IOP standard in 9 domains, with check type, evidence and mappings to GDPR, ISO 27701 and OWASP ASVS.',
  alternates: { canonical: '/en/standard/', languages: { fa: '/standard/' } },
}

export default function StandardPageEn() {
  const domains = prepareChecklist('en')
  const c = checklistCounts(loadChecklist())
  return (
    <>
      <PageHeader
        eyebrow="IOP standard · draft 0.1"
        title="Privacy controls"
        lead={`${c.total} checkable controls in ${domains.length} domains: Level 1 (${c[1]}), Level 2 (+${c[2]}), Level 3 (+${c[3]}). Level 2 requires every Level 1 and Level 2 control. The Persian text is authoritative.`}
      />
      <div className="container-page py-10">
        <ChecklistExplorer domains={domains} lang="en" />
        <p className="mt-14 text-sm text-neutral-500">
          Machine-readable source:{' '}
          <a className="text-accent hover:underline" href={`${REPO_URL}/tree/main/checklist`}>checklist/*.yaml</a>. Local-law
          mappings are drafts pending legal review.
        </p>
      </div>
    </>
  )
}
