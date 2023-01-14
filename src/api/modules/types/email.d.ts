export interface SendCodeForm {
  email: string;
  subject?: string;
  sign?: string;
}

export interface VerifyCodeForm {
  email: string;
  emailCode: string;
}
