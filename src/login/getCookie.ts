import Configstore from 'configstore'
import keytar from 'keytar'
import { jar } from '../cookieJar'
import { HoursData } from '../types'

async function getCookie(data: HoursData) {
  let cookie
  try {
    cookie = await keytar.findPassword('afast')
  } catch (err) {
    const store = new Configstore('afast')
    cookie = store.get('nodum')
    // if keytar doesnt work use config store
  }

  if (cookie) jar.setCookie(cookie, 'https://x3.nodum.io/')
  return data
}

export default getCookie
