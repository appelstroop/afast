import { HoursData } from '../types'

async function findProject(data: HoursData) {
  const project = data.projects.find((p) => p.code === data.projectCode)
  if (!project) throw new Error("Project code doesn't exist")
  return { ...data, project }
}

export default findProject
