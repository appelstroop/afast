//import { fetch } from "node-fetch-cookies";
import { fetchCookieJar, jar } from '../cookieJar'
import { LoginData } from '../types'
import getVerificationToken from './getVerificationToken'

async function authRequests(data: LoginData) {
  const afasOnlineResponse = await fetchCookieJar(
    'https://37432.afasinsite.nl/x3/timemanagement'
  )

  const stsAuthorizeResponse = await fetchCookieJar(afasOnlineResponse.url)
  const tokens = await getVerificationToken(stsAuthorizeResponse)

  return { ...data, ...tokens }
}

export default authRequests
