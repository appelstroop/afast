import { gFetch } from '../cookieJar'
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import fetch from 'node-fetch'
import compareVersions from 'compare-versions'
import { aksForUpdate } from '../questions'
import Configstore from 'configstore'
import moment from 'moment'

export async function checkReleases(
  version: string,
  fetch: typeof gFetch,
  gitClient: Function,
  aksForUpdate: () => Promise<boolean>
) {
  // TODO: shorten this function

  // check if needs upd3ate check ;)
  const config = new Configstore('afast')
  const lastChecked = config.get('lastChecked')
  if (!lastChecked) config.set('lastChecked', moment())
  if (moment().diff(lastChecked, 'days') < 5) {
    return false
  }
  config.set('lastChecked', moment())

  let result

  const resp = await fetch(
    'https://api.github.com/repos/appelstroop/afast/releases'
  )

  if (resp.ok) result = await resp.json()
  else return false

  const newestReleaseVersion = result[0] ? result[0].tag_name : '0'
  const isNewer = compareVersions(newestReleaseVersion, version)
  if (isNewer < 1) return false
  const options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
  }

  const wantsUpdate = await aksForUpdate()
  if (!wantsUpdate) return false
  const git: SimpleGit = gitClient(options)
  if (result) {
    try {
      const result = await git.pull()
      console.log(result)
      return true
    } catch (err) {
      console.log(err)
    }
  }
  return false
}

const checkReleasesFactory = async (version: string) =>
  checkReleases(version, gFetch, simpleGit, aksForUpdate)

export default checkReleasesFactory
