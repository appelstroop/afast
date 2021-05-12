import nodefetchCookieJar from 'node-fetch'
import tough from 'tough-cookie'
const jar = new tough.CookieJar()

import fetch from 'fetch-cookie/node-fetch'
const fetchCookieJar = fetch(nodefetchCookieJar, jar)

export { jar, fetchCookieJar }
