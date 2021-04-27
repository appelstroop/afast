import arg from "arg";
import inquirer from "inquirer";
import authRequests from "./login/authRequests";
import loginRequests from "./login/authRequests";
import confirm2FA from "./login/confirm2FA";
import emailRequest from "./login/emailRequest";
import passwordRequest from "./login/passwordRequest";
import twoFAMethodRequest from "./login/twoFAMethodRequest";
import { LoginData } from "./types";

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
export async function cli(args: string[]) {
  let options = parseArgumentsIntoOptions(args);

  // options = await promptForMissingOptions(options);
  //console.log(options);

  const bla = asyncPipe(
    askLoginQuestions,
    authRequests,
    emailRequest,
    passwordRequest,
    twoFAMethodRequest,
    askForVerificationToken,
    confirm2FA
  )();
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
