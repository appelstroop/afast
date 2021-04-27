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
import { fetch, Cookie } from "node-fetch-cookies";
import { jar } from "./cookieJar";

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}

async function promptForMissingOptions(options: any) {
  const defaultTemplate = "JavaScript";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["JavaScript", "TypeScript"],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

function asyncPipe(...fns: Function[]) {
  return (x?: any) => fns.reduce(async (y, fn) => fn(await y), x);
}

const askLoginQuestions = async (data: LoginData) => {
  const answers = await inquirer.prompt([
    { name: "email", message: "What is your email?" },
    { name: "password", message: "What is your password?" },
    {
      name: "method",
      message: "How would you like to login?",
      choices: ["Pocket app", "SMS"],
      default: "SMS",
    },
  ]);
  return answers;
};

const askForVerificationToken = async (data: LoginData) => {
  console.log("DATA", data);
  const answers = await inquirer.prompt([
    {
      name: "code",
      message: "Type the code you received:",
    },
  ]);
  return { ...data, ...answers };
};

const loginPipe = asyncPipe(
  askLoginQuestions,
  authRequests,
  emailRequest,
  passwordRequest,
  twoFAMethodRequest,
  askForVerificationToken,
  confirm2FA
);
export async function cli(args: string[]) {
  let options = parseArgumentsIntoOptions(args);

  //console.log("cookie", getCookie());

  try {
    const credentials = await keytar.findCredentials("gafas");
    const bla = new Cookie(credentials[0].password, "https://x3.nodum.io/");
    jar.addCookie(bla);
  } catch (err) {
    console.log(err);
  }
  const response = await fetch(jar, "https://x3.nodum.io/grid", {
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
  });
  //console.log(response.status);
  const text = await response.text();
  const idMatchGroup = text.match(/id *: '(.*)',/);
  const secureMatchGroup = text.match(/secu *: '(.*)',/);
  const id = idMatchGroup && idMatchGroup[1];
  const secure = secureMatchGroup && secureMatchGroup[1];

  if (!id || !secure) {
    console.log("logging in");
    loginPipe();
  } else {
    console.log("no need for login!");
  }
  // options = await promptForMissingOptions(options);
  // console.log(options);
}
