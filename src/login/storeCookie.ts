import { jar } from "../cookieJar";
import keytar from "keytar";
import { Response } from "node-fetch";
import Configstore from "configstore";
async function storeCookie(res: Response) {
  const cookie = await jar.getCookieString("https://x3.nodum.io");

  if (cookie) {
    try {
      await keytar.setPassword("afast", "nodum", cookie);
    } catch (err) {
      console.log("keytar error", err);
      new Configstore("afast", { nodum: cookie });
      // if keytar doesnt work use config store
    }
  }
}

export default storeCookie;
