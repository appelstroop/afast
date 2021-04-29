export interface LoginData {
  token: string;
  returnUrl: string;
  email?: string;
  password?: string;
  method?: "app" | "sms";
  twoFaLocation?: string;
  code?: string;
}

export interface HoursData {
  secure: string;
  id: string;

  projects: any[];

  project?: string;
  hours?: string;
}
