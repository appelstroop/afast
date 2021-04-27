import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";
import { LoginData } from "../types";

async function passwordRequest(data: LoginData) {
  const { returnUrl, email, token, password } = data;
  const passwordResponse = await fetch(
    jar,
    "https://idp.afasonline.com/Account/Password",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },

      body: `ReturnUrl=${encodeURIComponent(
        returnUrl
      )}&Username=${encodeURIComponent(email!)}&Password=${encodeURIComponent(
        password!
      )}&__RequestVerificationToken=${encodeURIComponent(
        token
      )}&Captcha=False&Token=`,
      method: "POST",
      mode: "cors",
      redirect: "manual",
    }
  );
  return { twoFaLocation: passwordResponse.headers.get("Location"), ...data };
}

export default passwordRequest;
