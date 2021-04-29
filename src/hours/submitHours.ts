import { gFetch } from "../cookieJar";
import { HoursData } from "../types";

async function submitHours(data: HoursData) {
  const { id, secure, project, hours } = data;
  const today = new Date();
  const day = today.getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();

  const json = `{\"eventType\":\"update\",\"moment\":{\"day\":${day},\"month\":\"${month}\",\"year\":\"${year}\"},\"user\":{\"id\":\"${id}\",\"secure\":\"${secure}\",\"see\":\"false\"},\"project\":\"${project}\",\"wst\":\"100\",\"_lines\":[{\"desc\":\"\",\"time\":${hours}}]}`;

  const updateResponse = await gFetch("https://x3.nodum.io/json/update", {
    headers: {
      "content-type":
        "multipart/form-data; boundary=----WebKitFormBoundary98yEVAsfukRofPMV",
    },

    body: `------WebKitFormBoundary98yEVAsfukRofPMV\r\nContent-Disposition: form-data; name=\"json\"\r\n\r\n${json}\r\n------WebKitFormBoundary98yEVAsfukRofPMV--\r\n`,
    method: "POST",
  });
  if (updateResponse.ok) console.log("Yeah 🚀");
}

export default submitHours;