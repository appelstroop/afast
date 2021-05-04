import { jar } from '../cookieJar'
import { Response } from 'node-fetch'
import Configstore from 'configstore'
async function storeCookie(res: Response) {
  const cookie = await jar.getCookieString('https://x3.nodum.io')

  if (cookie) {
    new Configstore('afast', { nodum: cookie })
  }
}

export default storeCookie
