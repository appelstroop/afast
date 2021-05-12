import { get } from 'https'
import { fetchCookieJar } from '../cookieJar'
import { LoginData } from '../types'
import getVerificationToken from './getVerificationToken'

async function emailRequest(data: LoginData) {
  const { returnUrl, email, token } = data
  const emailResponse = await fetchCookieJar(
    'https://idp.afasonline.com/Account/Email',
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },

      body: `ReturnUrl=${encodeURIComponent(
        returnUrl
      )}&Email=${encodeURIComponent(
        email!
      )}&__RequestVerificationToken=${encodeURIComponent(token)}`,
      method: 'POST',
    }
  )
  const tokens = await getVerificationToken(emailResponse)
  return { ...data, ...tokens }
}

export default emailRequest
