import { LoginData } from "../types";
import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";
import storeCookie from "./storeCookie";
async function confirm2FA(data: LoginData) {
  const { returnUrl, code, token } = data;

  const postCodeResponse = await fetch(
    jar,
    "https://idp.afasonline.com/Account/Confirm2Factor",
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: `EndPointSessionId=&LogonProcessId=&Method=Sms&LoginSessionId=&ReturnUrl=${encodeURIComponent(
        returnUrl
      )}&TwoFactorKey=&Code=${code}&__RequestVerificationToken=${encodeURIComponent(
        token
      )}&TrustedDevice=false`,
      method: "POST",
      redirect: "manual",
    }
  );
  //   console.log(postCodeResponse);
  //   console.log(postCodeResponse.headers);
  const idp2Response = await fetch(
    jar,
    postCodeResponse.headers.get("Location")
  );

  storeCookie(idp2Response);
}

export default confirm2FA;
