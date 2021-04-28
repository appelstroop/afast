import { jar } from "../cookieJar";
import keytar from "keytar";
import Configstore from "configstore";
async function storeCookie(res: Response) {
  const cookie = res.headers.get("set-cookie");
  if (cookie) {
    try {
      await keytar.setPassword("gafas", "nodum", cookie);
    } catch (err) {
      // if keytar doesnt work use config store
      new Configstore("gafas", { nodum: cookie });
    }
  }
}

export default storeCookie;
