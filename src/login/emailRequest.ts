import { get } from "https";
import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";
import { LoginData } from "../types";
import getVerificationToken from "./getVerificationToken";

async function emailRequest(data: LoginData) {
  const { returnUrl, email, token } = data;
  const emailResponse = await fetch(
    jar,
    "https://idp.afasonline.com/Account/Email",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },

      body: `ReturnUrl=${encodeURIComponent(
        returnUrl
      )}&Email=${encodeURIComponent(
        email!
      )}&__RequestVerificationToken=${encodeURIComponent(token)}`,
      method: "POST",
      mode: "cors",
    }
  );
  const tokens = await getVerificationToken(emailResponse);
  return { ...data, ...tokens };
}

export default emailRequest;
