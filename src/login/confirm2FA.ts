import { LoginData } from '../types'
import { fetchCookieJar, jar } from '../cookieJar'
import storeCookie from './storeCookie'
async function confirm2FA(data: LoginData) {
  const { returnUrl, code, token } = data

  const postCodeResponse = await fetchCookieJar(
    'https://idp.afasonline.com/Account/Confirm2Factor',
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: `EndPointSessionId=&LogonProcessId=&Method=Sms&LoginSessionId=&ReturnUrl=${encodeURIComponent(
        returnUrl
      )}&TwoFactorKey=&Code=${code}&__RequestVerificationToken=${encodeURIComponent(
        token
      )}&TrustedDevice=false`,
      method: 'POST',
      redirect: 'manual',
    }
  )
  const idp2Response = await fetchCookieJar(
    postCodeResponse.headers.get('Location')!
  )

  storeCookie(idp2Response)
}

export default confirm2FA
