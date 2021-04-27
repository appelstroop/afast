import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";
import getVerificationToken from "./getVerificationToken";

export default async function () {
  const afasOnlineResponse: Response = await fetch(
    jar,
    "https://37432.afasinsite.nl/x3/timemanagement"
  );

  const stsAuthorizeResponse: Response = await fetch(
    jar,
    afasOnlineResponse.url
  );
  const { token, returnUrl } = await getVerificationToken(stsAuthorizeResponse);
  console.log(token, returnUrl);
}
