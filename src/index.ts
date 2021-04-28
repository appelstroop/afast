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
import Configstore from "configstore";
import getCookie from "./login/getCookie";
import getSecureToken from "./hours/getSecureToken";
import getProjects from "./hours/getProjects";

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

  console.log("ARGS", args);
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
    login: args._[0] === "login" ? true : false,
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
    {
      name: "password",
      message: "What is your password?",
      type: "password",
      mask: true,
    },
    {
      type: "list",
      name: "method",
      message: "How would you like to login?",
      choices: [
        { name: "SMS", value: "sms" },
        { name: "Pocket app (not yet supported)", value: "app" },
      ],
      default: "sms",
      loop: false,
    },
  ]);
  return answers;
};

const askForVerificationToken = async (data: LoginData) => {
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
  const { login } = parseArgumentsIntoOptions(args);
  //if (login) await loginPipe();
  await getCookie();

  const { id, secure } = await getSecureToken();

  if (!id || !secure || login) {
    console.log("logging in");
    await loginPipe();
    console.log("You are logged in :)");
    cli([]);
  } else {
    //console.log("no need for login!");

    const projects = await getProjects({ id, secure });

    const { project, hours } = await inquirer.prompt([
      {
        name: "project",
        type: "list",
        choices: projects.projects.map((p: any) => ({
          name: p.name,
          value: p.code,
        })),
        loop: false,
      },
      { name: "hours", type: "number" },
    ]);

    const today = new Date();
    const day = today.getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const json = `{\"eventType\":\"create\",\"moment\":{\"day\":${day},\"month\":\"${month}\",\"year\":\"${year}\"},\"user\":{\"name\":\"Jasper Hoving\",\"id\":\"${id}\",\"secure\":\"${secure}\",\"see\":\"false\"},\"project\":\"${project}\",\"wst\":\"100\",\"_lines\":[{\"desc\":\"\",\"time\":${hours}}]}`;

    const bloeh = {
      eventType: "create",
      moment: {
        day: 16,
        month: "4",
        year: "2021",
      },
      user: {
        name: "Jasper Hoving",
        id,
        secure,
        see: false,
      },
      project: "5115",
      wst: "100",
      _lines: {
        desc: "",
        time: 8,
      },
    };

    await fetch(jar, "https://x3.nodum.io/json/update", {
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary98yEVAsfukRofPMV",
      },

      body: `------WebKitFormBoundary98yEVAsfukRofPMV\r\nContent-Disposition: form-data; name=\"json\"\r\n\r\n${json}\r\n------WebKitFormBoundary98yEVAsfukRofPMV--\r\n`,
      method: "POST",
      mode: "cors",
    });
  }
  // options = await promptForMissingOptions(options);
  // console.log(options);
}
