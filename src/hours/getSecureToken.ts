import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";

async function getSecureToken() {
  const response = await fetch(jar, "https://x3.nodum.io/grid");
  const text = await response.text();
  const idMatchGroup = text.match(/id *: '(.*)',/);
  const secureMatchGroup = text.match(/secure *: '(.*)',/);
  const id: string | undefined = idMatchGroup && idMatchGroup[1];
  const secure: string | undefined = secureMatchGroup && secureMatchGroup[1];
  return { id, secure };
}

export default getSecureToken;
