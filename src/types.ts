export type LoginData = {
  token: string;
  returnUrl: string;
  email?: string;
  password?: string;
  method?: "app" | "sms";
  twoFaLocation?: string;
  code?: string;
};

export type HoursData = {
  secure: string;
  id: string;

  projects: Project[];

  project?: string;
  hours?: string;
};

export type ProjectResponse = {
  scheduleHours: number;
  projects: Project[];
  monthIsApproved: boolean;
  lastApproved: number;
  allowApproveMonth: boolean;
};

export type Project = {
  wsts: [];
  code: string;
  name: string;
  general: number;
  start: number;
  end: number;
  billable: string; //actually boolean in string
};
