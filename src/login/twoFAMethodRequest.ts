import { gFetch } from '../cookieJar'
import { LoginData } from '../types'
import getVerificationToken from './getVerificationToken'

async function twoFAMethodRequest(data: LoginData) {
  let { twoFaLocation, method } = data
  if (method === 'sms') {
    const toReplace = twoFaLocation!.includes('AOLSmartphone')
      ? 'AOLSmartphone'
      : 'Smartphone'
    twoFaLocation = twoFaLocation!.replace(toReplace, 'Sms')
  }
  const sendsmsResponse = await gFetch(twoFaLocation!)
  const tokens = await getVerificationToken(sendsmsResponse)
  return { ...data, ...tokens }
}

export default twoFAMethodRequest
