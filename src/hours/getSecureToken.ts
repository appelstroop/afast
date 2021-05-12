import { fetchCookieJar, jar } from '../cookieJar'
import { HoursData } from '../types'

async function getSecureToken(data: HoursData) {
  const response = await fetchCookieJar('https://x3.nodum.io/grid')

  const text = await response.text()
  const idMatchGroup = text.match(/id *: '(.*)',/)
  const secureMatchGroup = text.match(/secure *: '(.*)',/)
  const id = idMatchGroup && idMatchGroup[1]
  const secure = secureMatchGroup && secureMatchGroup[1]

  if (!id || !secure)
    throw new Error(
      'You are not logged in, or your credentials are expired. Use afast login!'
    )
  return { ...data, id, secure }
}

export default getSecureToken
