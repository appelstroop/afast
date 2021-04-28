import { AuthData } from "../types";
import { fetch } from "node-fetch-cookies";
import { jar } from "../cookieJar";

async function getProjects(authData: AuthData) {
  const { id, secure } = authData;
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const projectsResponse = await fetch(
    jar,
    `https://x3.nodum.io/json/geldig?employee=${id}&secure=${secure}&y=${year}&m=${month}`
  );
  const projects = await projectsResponse.json();
  return projects;
}

export default getProjects;
