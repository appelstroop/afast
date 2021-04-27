import { jar } from "../cookieJar";
import keytar from "keytar";
async function storeCookie(res: Response) {
  console.log(res.headers.get("set-cookie"));
  const cookie = res.headers.get("set-cookie");
  if (cookie) {
    try {
      keytar.setPassword("gafas", "nodum", cookie);
    } catch (err) {
      console.log(err);
    }
  }
}

export default storeCookie;
