import authRequests from './login/authRequests'
import confirm2FA from './login/confirm2FA'
import emailRequest from './login/emailRequest'
import passwordRequest from './login/passwordRequest'
import twoFAMethodRequest from './login/twoFAMethodRequest'

import getCookie from './login/getCookie'
import getSecureToken from './hours/getSecureToken'
import getProjects from './hours/getProjects'
import yargs from 'yargs'
import {
  askForDescription,
  askForProjectAndHours,
  askForVerificationToken,
  askLoginQuestions,
} from './questions'
import submitHours from './hours/submitHours'
import findProject from './hours/findProject'
import checkReleases from './git/checkReleases'
const package_json = require('../package.json')

function asyncPipe(...fns: Function[]) {
  return (x?: any) => fns.reduce(async (y, fn) => fn(await y), x)
}

const loginPipe = asyncPipe(
  askLoginQuestions,
  authRequests,
  emailRequest,
  passwordRequest,
  twoFAMethodRequest,
  askForVerificationToken,
  confirm2FA
)

const hoursPipe = asyncPipe(
  getCookie,
  getSecureToken,
  getProjects,
  askForProjectAndHours,
  findProject,
  askForDescription,
  submitHours
)

var argv = yargs(process.argv.slice(2))
  .command('login', 'Login to afas (2FA)')
  .alias('E', 'email')
  .alias('P', 'password')
  .alias('p', 'project')
  .alias('h', 'hours')
  .alias('v', 'version')
  .string(['h', 'p', 'E', 'P'])
  .describe('E', 'Email adress')
  .describe('P', 'Password for x3')
  .describe('p', 'the project code')
  .describe('h', 'hours to write today')
  .describe('verbose', 'verbose error logging').argv

export async function cli(args: string[]) {
  await checkReleases(getVersion())
  const { email, password, project, hours } = argv

  await getVersion()
  const login = argv._[0] === 'login'
  try {
    if (login) {
      console.log('logging in...')
      await loginPipe({ email, password })
      console.log('You are logged in :)')
    } else {
      // await getCookie()

      // const { id, secure } = await getSecureToken()
      // if (!id || !secure) console.log('You are not logged in. Use afast login!')
      await hoursPipe({ projectCode: project, hours })
    }
  } catch (err) {
    // catch all async errors and just log them
    if (argv.verbose) console.error(err)
    else console.log(`Error: ${err.message}`)
  }
}

// maybe there is a better way?
const getVersion = () => package_json.version || ''
