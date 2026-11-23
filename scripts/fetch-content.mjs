// Fetches the IOP docs repository (standard, checklist, company documents) into ./content
// before every build, so the site always reflects the latest `main` of the docs repo.
// Local development: set IOP_CONTENT_DIR=../iran-open-privacy in .env.local to use a local checkout.
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const repo = process.env.IOP_CONTENT_REPO || 'https://github.com/IranOpenPrivacy/iran-open-privacy.git'
const ref = process.env.IOP_CONTENT_REF || 'main'

function readEnvLocal() {
  try {
    const m = fs.readFileSync('.env.local', 'utf8').match(/^IOP_CONTENT_DIR=(.+)$/m)
    return m && m[1].trim()
  } catch {
    return null
  }
}

const localDir = process.env.IOP_CONTENT_DIR || readEnvLocal()
if (localDir && localDir !== 'content') {
  if (!fs.existsSync(path.join(localDir, 'checklist'))) {
    console.error(`IOP_CONTENT_DIR=${localDir} does not look like the docs repo (no checklist/).`)
    process.exit(1)
  }
  console.log(`Using local content from ${localDir}`)
  process.exit(0)
}

fs.rmSync('content', { recursive: true, force: true })
console.log(`Cloning ${repo} (${ref}) into ./content`)
execFileSync('git', ['clone', '--depth', '1', '--branch', ref, repo, 'content'], { stdio: 'inherit' })
const sha = execFileSync('git', ['-C', 'content', 'rev-parse', '--short', 'HEAD']).toString().trim()
console.log(`Content at ${sha}`)
