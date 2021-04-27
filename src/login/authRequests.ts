import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";
import { LoginData } from "../types";
import getVerificationToken from "./getVerificationToken";

async function authRequests(data: LoginData) {
  const afasOnlineResponse: Response = await fetch(
    jar,
    "https://37432.afasinsite.nl/x3/timemanagement"
  );

  const stsAuthorizeResponse: Response = await fetch(
    jar,
    afasOnlineResponse.url
  );
  const tokens = await getVerificationToken(stsAuthorizeResponse);

  return { ...data, ...tokens };
}

export default authRequests;
