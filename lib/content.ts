import fs from 'node:fs'
import path from 'node:path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { visit } from 'unist-util-visit'
import matter from 'gray-matter'

/**
 * All site content comes from the IranOpenPrivacy/iran-open-privacy repository,
 * checked out as a git submodule at ./content (override with IOP_CONTENT_DIR).
 */
export const CONTENT_DIR = path.resolve(process.cwd(), process.env.IOP_CONTENT_DIR || 'content')
export const REPO_URL = 'https://github.com/IranOpenPrivacy/iran-open-privacy'
export const SITE_URL = 'https://iranopenprivacy.org'

export type Lang = 'fa' | 'en'

export interface DocPage {
  slug: string
  file: string
  lang: Lang
  group: 'standard' | 'project' | 'policy'
}

/** Documents rendered as generic pages at /<slug> (fa) or /en/<slug> (en). */
export const DOC_PAGES: DocPage[] = [
  { slug: 'manifesto', file: 'docs/fa/00-manifesto.md', lang: 'fa', group: 'standard' },
  { slug: 'scope', file: 'docs/fa/01-scope.md', lang: 'fa', group: 'standard' },
  { slug: 'levels', file: 'docs/fa/02-levels.md', lang: 'fa', group: 'standard' },
  { slug: 'process', file: 'docs/fa/04-verification-process.md', lang: 'fa', group: 'standard' },
  { slug: 'trust-page', file: 'docs/fa/08-trust-page.md', lang: 'fa', group: 'standard' },
  { slug: 'privacy-documents', file: 'docs/fa/09-privacy-documents.md', lang: 'fa', group: 'standard' },
  { slug: 'glossary', file: 'docs/fa/14-glossary.md', lang: 'fa', group: 'standard' },
  { slug: 'governance', file: 'docs/fa/06-governance.md', lang: 'fa', group: 'project' },
  { slug: 'conflict-of-interest', file: 'docs/fa/05-conflict-of-interest.md', lang: 'fa', group: 'project' },
  { slug: 'funding', file: 'docs/fa/07-funding.md', lang: 'fa', group: 'project' },
  { slug: 'roadmap', file: 'docs/fa/10-roadmap.md', lang: 'fa', group: 'project' },
  { slug: 'safety', file: 'docs/fa/11-risks-and-safety.md', lang: 'fa', group: 'project' },
  { slug: 'legal-notes', file: 'docs/fa/12-legal-notes.md', lang: 'fa', group: 'project' },
  { slug: 'faq', file: 'docs/fa/13-faq.md', lang: 'fa', group: 'project' },
  { slug: 'contribute', file: 'CONTRIBUTING.md', lang: 'fa', group: 'policy' },
  { slug: 'code-of-conduct', file: 'CODE_OF_CONDUCT.md', lang: 'fa', group: 'policy' },
  { slug: 'security', file: 'SECURITY.md', lang: 'fa', group: 'policy' },
  { slug: 'licenses', file: 'LICENSES.md', lang: 'fa', group: 'policy' },
  { slug: 'changelog', file: 'CHANGELOG.md', lang: 'fa', group: 'policy' },
  { slug: 'maintainers', file: 'governance/MAINTAINERS.md', lang: 'fa', group: 'policy' },
  { slug: 'conflicts', file: 'governance/CONFLICTS.md', lang: 'fa', group: 'policy' },
]

/** Repo file -> site route, used to rewrite relative links inside documents. */
function routeForFile(file: string): string | null {
  const f = file.replace(/^\.?\//, '')
  const doc = DOC_PAGES.find((d) => d.file === f)
  if (doc) return doc.lang === 'en' ? `/en/${doc.slug}/` : `/${doc.slug}/`
  const special: Record<string, string> = {
    'README.md': '/',
    'README.en.md': '/en/',
    'docs/en/overview.md': '/en/',
    'docs/fa/03-checklist-table.md': '/standard/',
    'docs/en/checklist-table.md': '/en/standard/',
    'company-docs': '/companies/',
    'company-docs/README.md': '/companies/',
  }
  if (special[f]) return special[f]
  const company = f.match(/^company-docs\/([^/]+)(\/.*)?$/)
  if (company && company[1] !== 'README.md') return `/companies/${company[1]}/`
  return null
}

export function contentPath(file: string) {
  return path.join(CONTENT_DIR, file)
}

export function readContent(file: string) {
  return fs.readFileSync(contentPath(file), 'utf8')
}

export function contentExists(file: string) {
  return fs.existsSync(contentPath(file))
}

/** Rewrite relative links so they point at site routes, or at GitHub when there is no page. */
function rehypeRewriteLinks(fromFile: string) {
  const baseDir = path.posix.dirname(fromFile)
  return () => (tree: any) => {
    visit(tree, 'element', (node: any) => {
      if (node.tagName !== 'a' || typeof node.properties?.href !== 'string') return
      const href: string = node.properties.href
      if (/^[a-z]+:/i.test(href)) {
        if (/^https?:/i.test(href)) {
          node.properties.target = '_blank'
          node.properties.rel = 'noopener noreferrer'
        }
        return
      }
      if (href.startsWith('#')) return
      const [rawPath, hash] = href.split('#')
      const [p] = rawPath.split('?')
      if (!p) return
      const resolved = path.posix.normalize(path.posix.join(baseDir, decodeURI(p))).replace(/\/$/, '')
      // links that escape the repo root (e.g. ../../issues/new) point at GitHub itself
      if (resolved.startsWith('..')) {
        const rest = resolved.replace(/^(\.\.\/)+/, '')
        node.properties.href = `${REPO_URL}/${rest}${rawPath.includes('?') ? '?' + rawPath.split('?')[1] : ''}`
        node.properties.target = '_blank'
        node.properties.rel = 'noopener noreferrer'
        return
      }
      const route = routeForFile(resolved)
      if (route) {
        node.properties.href = route + (hash ? `#${hash}` : '')
      } else {
        const abs = contentPath(resolved)
        const isDir = fs.existsSync(abs) ? fs.statSync(abs).isDirectory() : !path.posix.extname(resolved)
        node.properties.href = `${REPO_URL}/${isDir ? 'tree' : 'blob'}/main/${resolved}${hash ? `#${hash}` : ''}`
        node.properties.target = '_blank'
        node.properties.rel = 'noopener noreferrer'
      }
    })
  }
}

/** Remove the first h1 (returned as the page title) and the outer <div dir> wrapper. */
function rehypeExtractTitle(out: { title?: string }) {
  return () => (tree: any) => {
    let done = false
    visit(tree, 'element', (node: any, index: number | undefined, parent: any) => {
      if (done || node.tagName !== 'h1' || !parent || index === undefined) return
      out.title = textOf(node)
      parent.children.splice(index, 1)
      done = true
      return index
    })
  }
}

function textOf(node: any): string {
  if (node.type === 'text') return node.value
  return (node.children || []).map(textOf).join('')
}

export interface Rendered {
  title: string
  html: string
  data: Record<string, any>
}

export async function renderMarkdown(md: string, fromFile: string): Promise<Rendered> {
  const { content, data } = matter(md)
  // Docs wrap themselves in <div dir="rtl"> for GitHub; the site handles direction itself.
  const body = content.replace(/^\s*<div dir="(rtl|ltr)">\s*/i, '').replace(/\s*<\/div>\s*$/i, '')
  const out: { title?: string } = {}
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeExtractTitle(out))
    .use(rehypeRewriteLinks(fromFile))
    .use(rehypeStringify)
    .process(body)
  return { title: out.title || '', html: String(file), data }
}

export async function renderDoc(file: string) {
  return renderMarkdown(readContent(file), file)
}

export function findDoc(slug: string, lang: Lang) {
  return DOC_PAGES.find((d) => d.slug === slug && d.lang === lang)
}

export function repoFileUrl(file: string) {
  return `${REPO_URL}/blob/main/${file}`
}

/** Drop "## Title" sections (up to the next h2) from a Markdown string. */
export function dropSections(md: string, titles: string[]) {
  const parts = md.split(/^(?=## )/m)
  return parts.filter((p) => !titles.some((t) => p.startsWith(`## ${t}`))).join('')
}
