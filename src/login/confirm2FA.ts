import { LoginData } from "../types";
import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";
async function confirm2FA(data: LoginData) {
  console.log("LAST DATA", data);
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
  console.log(jar);
  const idp2Response = await fetch(
    jar,
    postCodeResponse.headers.get("Location")
  );
}

export default confirm2FA;