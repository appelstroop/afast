import arg from "arg";
import inquirer from "inquirer";
import authRequests from "./login/authRequests";
import loginRequests from "./login/authRequests";
import confirm2FA from "./login/confirm2FA";
import emailRequest from "./login/emailRequest";
import passwordRequest from "./login/passwordRequest";
import storeCookie from "./login/storeCookie";
import twoFAMethodRequest from "./login/twoFAMethodRequest";
import { LoginData } from "./types";
import keytar from "keytar";
import { gFetch, jar } from "./cookieJar";
import getCookie from "./login/getCookie";
import getSecureToken from "./hours/getSecureToken";
import getProjects from "./hours/getProjects";
import yargs from "yargs";
import {
  askForProjectAndHours,
  askForVerificationToken,
  askLoginQuestions,
} from "./questions";
import submitHours from "./hours/submitHours";

function asyncPipe(...fns: Function[]) {
  return (x?: any) => fns.reduce(async (y, fn) => fn(await y), x);
}

const loginPipe = asyncPipe(
  askLoginQuestions,
  authRequests,
  emailRequest,
  passwordRequest,
  twoFAMethodRequest,
  askForVerificationToken,
  confirm2FA
);

const hoursPipe = asyncPipe(getProjects, askForProjectAndHours, submitHours);

var argv = yargs(process.argv.slice(2))
  .command("login", "reboot login")
  .alias("e", "email")
  .alias("p", "password")
  .string(["e", "p"])
  .describe("e", "Email adress")
  .describe("p", "Password for x3").argv;

export async function cli(args: string[]) {
  const { email, password } = argv;
  const login = argv._[0] === "login";
  await getCookie();

  const { id, secure } = await getSecureToken();

  if (!id || !secure || login) {
    console.log("logging in...");
    await loginPipe({ email, password });
    console.log("You are logged in :)");
    cli([]);
  } else {
    await hoursPipe({ id, secure });
  }
}
