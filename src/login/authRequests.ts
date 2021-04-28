//import { fetch } from "node-fetch-cookies";
import { gFetch, jar } from "../cookieJar";
import { LoginData } from "../types";
import getVerificationToken from "./getVerificationToken";

async function authRequests(data: LoginData) {
  const afasOnlineResponse = await gFetch(
    "https://37432.afasinsite.nl/x3/timemanagement"
  );

  const stsAuthorizeResponse = await gFetch(afasOnlineResponse.url);
  const tokens = await getVerificationToken(stsAuthorizeResponse);

  return { ...data, ...tokens };
}

export default authRequests;
