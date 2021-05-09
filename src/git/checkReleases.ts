import { gFetch } from '../cookieJar'
import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git'
import fetch from 'node-fetch'
import compareVersions from 'compare-versions'

export async function checkReleases(
  version: string,
  fetch: typeof gFetch,
  gitClient: Function
) {
  let result

  const resp = await fetch(
    'https://api.github.com/repos/appelstroop/afast/releases'
  )
  if (resp.ok) result = await resp.json()
  else result = exampleResponseJson

  const isNewer = compareVersions(result[0].tag_name, version)
  if (isNewer < 1) return
  const options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
  }

  const git: SimpleGit = gitClient(options)
  if (result) {
    console.log('pulling...')
    try {
      const result = await git.pull()
      console.log('git result', result)
    } catch (err) {
      console.log(err)
    }
  }
}

const checkReleasesFactory = async (version: string) =>
  checkReleases(version, gFetch, simpleGit)

export default checkReleasesFactory

export const exampleResponseJson = [
  {
    url: 'https://api.github.com/repos/appelstroop/afast/releases/42470648',
    assets_url:
      'https://api.github.com/repos/appelstroop/afast/releases/42470648/assets',
    upload_url:
      'https://uploads.github.com/repos/appelstroop/afast/releases/42470648/assets{?name,label}',
    html_url: 'https://github.com/appelstroop/afast/releases/tag/0.5',
    id: 42470648,
    author: {
      login: 'appelstroop',
      id: 8784949,
      node_id: 'MDQ6VXNlcjg3ODQ5NDk=',
      avatar_url: 'https://avatars.githubusercontent.com/u/8784949?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/appelstroop',
      html_url: 'https://github.com/appelstroop',
      followers_url: 'https://api.github.com/users/appelstroop/followers',
      following_url:
        'https://api.github.com/users/appelstroop/following{/other_user}',
      gists_url: 'https://api.github.com/users/appelstroop/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/appelstroop/starred{/owner}{/repo}',
      subscriptions_url:
        'https://api.github.com/users/appelstroop/subscriptions',
      organizations_url: 'https://api.github.com/users/appelstroop/orgs',
      repos_url: 'https://api.github.com/users/appelstroop/repos',
      events_url: 'https://api.github.com/users/appelstroop/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/appelstroop/received_events',
      type: 'User',
      site_admin: false,
    },
    node_id: 'MDc6UmVsZWFzZTQyNDcwNjQ4',
    tag_name: '0.7',
    target_commitish: 'main',
    name: 'Version 0.5',
    draft: false,
    prerelease: false,
    created_at: '2021-05-05T11:48:59Z',
    published_at: '2021-05-05T11:50:08Z',
    assets: [],
    tarball_url: 'https://api.github.com/repos/appelstroop/afast/tarball/0.5',
    zipball_url: 'https://api.github.com/repos/appelstroop/afast/zipball/0.5',
    body: '',
  },
]
