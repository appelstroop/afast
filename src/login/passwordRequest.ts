import { gFetch } from '../cookieJar'
import { LoginData } from '../types'

async function passwordRequest(data: LoginData) {
  const { returnUrl, email, token, password } = data
  const passwordResponse = await gFetch(
    'https://idp.afasonline.com/Account/Password',
    {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },

      body: `ReturnUrl=${encodeURIComponent(
        returnUrl
      )}&Username=${encodeURIComponent(email!)}&Password=${encodeURIComponent(
        password!
      )}&__RequestVerificationToken=${encodeURIComponent(
        token
      )}&Captcha=False&Token=`,
      method: 'POST',
      redirect: 'manual',
    }
  )
  const nextLocation = passwordResponse.headers.get('Location')
  if (!nextLocation) throw new Error('Email or password incorrect')

  return { twoFaLocation: passwordResponse.headers.get('Location'), ...data }
}

export default passwordRequest
