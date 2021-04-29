import inquirer from "inquirer";
import { HoursData, LoginData } from "./types";

export const askLoginQuestions = async (data: LoginData) => {
  let questions = [];
  if (!data.email) {
    questions.push({ name: "email", message: "What is your email?" });
  }
  if (!data.password) {
    questions.push({
      name: "password",
      message: "What is your password?",
      type: "password",
      mask: true,
    });
  }
  const answers = await inquirer.prompt([
    ...questions,

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
  return { ...data, ...answers };
};

export const askForVerificationToken = async (data: LoginData) => {
  const answers = await inquirer.prompt([
    {
      name: "code",
      message: "Type the code you received:",
    },
  ]);
  return { ...data, ...answers };
};

export const askForProjectAndHours = async (data: HoursData) => {
  const answers = await inquirer.prompt([
    {
      name: "project",
      type: "list",
      choices: data.projects!.map((p: any) => ({
        name: p.name,
        value: p.code,
      })),
      loop: false,
    },
    { name: "hours", type: "number" },
  ]);
  return { ...data, ...answers };
};
