import { jar } from "../cookieJar";
import { LoginData } from "../types";
import { fetch } from "node-fetch-cookies";
import getVerificationToken from "./getVerificationToken";

async function twoFAMethodRequest(data: LoginData) {
  let { twoFaLocation, method } = data;
  if (method === "SMS")
    twoFaLocation = twoFaLocation!.replace("Smartphone", "Sms");

  const sendsmsResponse = await fetch(jar, twoFaLocation);
  const tokens = await getVerificationToken(sendsmsResponse);
  return { ...data, ...tokens };
}

export default twoFAMethodRequest;
