import { jar } from "../cookieJar";
import { LoginData } from "../types";
import { fetch } from "node-fetch-cookies";
import getVerificationToken from "./getVerificationToken";

async function twoFAMethodRequest(data: LoginData) {
  let { twoFaLocation, method } = data;
  console.log("TWO FACTOR LOACTION", twoFaLocation);
  if (method === "sms") {
    const toReplace = twoFaLocation?.includes("AOLSmartphone")
      ? "AOLSmartphone"
      : "Smartphone";
    twoFaLocation = twoFaLocation!.replace(toReplace, "Sms");
  }

  const sendsmsResponse = await fetch(jar, twoFaLocation);
  const tokens = await getVerificationToken(sendsmsResponse);
  return { ...data, ...tokens };
}

export default twoFAMethodRequest;
