export type LoginData = {
  token: string
  returnUrl: string
  email?: string
  password?: string
  method?: 'app' | 'sms'
  twoFaLocation?: string
  code?: string
}

export type HoursData = {
  secure: string
  id: string

  projects: Project[]
  project: Project
  projectCode?: string
  hours?: string
  description?: string
}

export type ProjectResponse = {
  scheduleHours: number
  projects: Project[]
  monthIsApproved: boolean
  lastApproved: number
  allowApproveMonth: boolean
}

export type Project = {
  wsts: { code: string; name: string }[]
  code: string
  name: string
  general: number
  start: string
  end: string
  billable: boolean | string
  internal?: boolean
}
