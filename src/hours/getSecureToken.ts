import { gFetch, jar } from "../cookieJar";

async function getSecureToken() {
  const response = await gFetch("https://x3.nodum.io/grid");
  const text = await response.text();
  const idMatchGroup = text.match(/id *: '(.*)',/);
  const secureMatchGroup = text.match(/secure *: '(.*)',/);
  const id = idMatchGroup && idMatchGroup[1];
  const secure = secureMatchGroup && secureMatchGroup[1];
  return { id, secure };
}

export default getSecureToken;
