import Configstore from 'configstore'
import { jar } from '../cookieJar'
import { HoursData } from '../types'

async function getCookie(data: HoursData) {
  const store = new Configstore('afast')
  const cookie = store.get('nodum')
  if (cookie) jar.setCookie(cookie, 'https://x3.nodum.io/')
  return data
}

export default getCookie
