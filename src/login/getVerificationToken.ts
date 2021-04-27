import { parse } from "node-html-parser";

async function getVerificationToken(res: Response) {
  const text = await res.text();
  const token = parse(text)
    .querySelector('[name="__RequestVerificationToken"]')
    .getAttribute("value");
  const returnUrl = parse(text)
    .querySelector('[name="ReturnUrl"]')
    .getAttribute("value");

  return { token, returnUrl };
}

export default getVerificationToken;
