export interface LoginData {
  token: string;
  returnUrl: string;
  email?: string;
  password?: string;
  method?: "Pocket app" | "SMS";
  twoFaLocation?: string;
  code?: string;
}
