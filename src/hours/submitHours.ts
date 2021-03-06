import { fetchCookieJar } from '../cookieJar'
import { HoursData } from '../types'
import chalk from 'chalk'

async function submitHours(data: HoursData) {
  const { id, secure, projectCode, project, hours, description } = data
  const today = new Date()
  const day = today.getDate()
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()

  // just copied this from request data. TODO: format this nicely
  const json = `{\"eventType\":\"update\",\"moment\":{\"day\":${day},\"month\":\"${month}\",\"year\":\"${year}\"},\"user\":{\"id\":\"${id}\",\"secure\":\"${secure}\",\"see\":\"false\"},\"project\":\"${projectCode}\",\"wst\":\"${project.wsts[0].code}\",\"_lines\":[{\"desc\":\"${description}\",\"time\":${hours}}]}`

  const updateResponse = await fetchCookieJar(
    'https://x3.nodum.io/json/update',
    {
      headers: {
        'content-type':
          'multipart/form-data; boundary=----WebKitFormBoundary98yEVAsfukRofPMV',
      },
      body: `------WebKitFormBoundary98yEVAsfukRofPMV\r\nContent-Disposition: form-data; name=\"json\"\r\n\r\n${json}\r\n------WebKitFormBoundary98yEVAsfukRofPMV--\r\n`,
      method: 'POST',
    }
  )
  // Crappy API, seems to always return 200 :(
  if (updateResponse.ok)
    console.log(
      `\nYeah 🚀 Submitted ${hours} hours on ${chalk.cyan(
        project.name
      )} for today `
    )
}

export default submitHours
