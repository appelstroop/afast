import { HoursData, Project, ProjectResponse } from '../types'
import { gFetch } from '../cookieJar'

async function getProjects(data: HoursData) {
  const { id, secure } = data
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const projectsResponse = await gFetch(
    `https://x3.nodum.io/json/geldig?employee=${id}&secure=${secure}&y=${year}&m=${month}`
  )
  const projectResponse: ProjectResponse = await projectsResponse.json()
  const projects = projectResponse.projects
    .map((p) => {
      // map to real boolean
      p.billable = p.billable === 'true'
      return p
    })
    .sort(sortProjects)

  return { ...data, projects }
}

export default getProjects

export const sortProjects = (a: Project, b: Project) =>
  a.billable === b.billable ? 0 : a.billable ? -1 : 1
