import { FetchError, Response } from "node-fetch";
import { parse } from "node-html-parser";

async function getVerificationToken(res: Response) {
  const text = await res.text();
  const token = parse(text)
    .querySelector('[name="__RequestVerificationToken"]')
    .getAttribute("value");
  const returnUrl = parse(text)
    .querySelector('[name="ReturnUrl"]')
    .getAttribute("value");
  if (!returnUrl || !token) throw new Error("Tokens could not be found");
  return { token, returnUrl };
}

export default getVerificationToken;
