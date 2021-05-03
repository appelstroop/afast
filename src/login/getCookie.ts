import Configstore from 'configstore'
import keytar from 'keytar'
import { jar } from '../cookieJar'

async function getCookie() {
  let cookie
  try {
    cookie = await keytar.findPassword('afast')
  } catch (err) {
    const store = new Configstore('afast')
    cookie = store.get('nodum')
    // if keytar doesnt work use config store
  }

  if (cookie) jar.setCookie(cookie, 'https://x3.nodum.io/')
  return cookie
}

export default getCookie
