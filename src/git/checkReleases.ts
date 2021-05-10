import { gFetch } from '../cookieJar'
import fetch from 'node-fetch'
import compareVersions from 'compare-versions'
import Configstore from 'configstore'
import moment from 'moment'

export async function checkReleases(version: string, fetch: typeof gFetch) {
  // TODO: shorten this function

  // check if needs upd3ate check ;)
  const config = new Configstore('afast')
  const lastChecked = config.get('lastChecked')
  if (!lastChecked) config.set('lastChecked', moment())
  if (moment().diff(lastChecked, 'days') < 1) {
    return
  }
  config.set('lastChecked', moment())

  let result

  const resp = await fetch(
    'https://api.github.com/repos/appelstroop/afast/releases'
  )

  if (resp.ok) result = await resp.json()
  else return

  const newestReleaseVersion = result[0] ? result[0].tag_name : '0'
  const isNewer = compareVersions(newestReleaseVersion, version)
  if (isNewer < 1) return

  return newestReleaseVersion
}

const checkReleasesFactory = async (version: string) =>
  checkReleases(version, gFetch)

export default checkReleasesFactory
