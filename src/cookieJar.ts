import nodeFetch from "node-fetch";
import tough from "tough-cookie";
const jar = new tough.CookieJar();

import fetch from "fetch-cookie/node-fetch";
const gFetch = fetch(nodeFetch, jar);

export { jar, gFetch };
