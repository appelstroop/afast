import { jar } from "../cookieJar";
import keytar from "keytar";
import { Response } from "node-fetch";
async function storeCookie(res: Response) {
  const cookie = await jar.getCookieString("https://x3.nodum.io");

  if (cookie) {
    try {
      await keytar.setPassword("gafas", "nodum", cookie);
    } catch (err) {
      console.log("keytar error", err);
      // if keytar doesnt work use config store
      // new Configstore("gafas", { nodum: cookie });
    }
  }
}

export default storeCookie;
