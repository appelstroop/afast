import keytar from "keytar";
import { jar } from "../cookieJar";

async function getCookie() {
  let cookie;
  try {
    const credentials = await keytar.findCredentials("gafas");

    cookie = credentials[0].password;
  } catch (err) {
    // if keytar doesnt work use config store
    // const store = new Configstore("gafas");
    // cookie = store.get("nodum");
  }
  if (cookie) jar.setCookie(cookie, "https://x3.nodum.io/");
  return cookie;
}

export default getCookie;
