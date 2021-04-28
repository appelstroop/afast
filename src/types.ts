export interface LoginData {
  token: string;
  returnUrl: string;
  email?: string;
  password?: string;
  method?: "app" | "sms";
  twoFaLocation?: string;
  code?: string;
}

export interface AuthData {
  secure: string;
  id: string;
}
