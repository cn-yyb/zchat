export declare interface SendCodeForm {
  email: string;
  subject?: string;
  sign?: string;
}

export declare interface VerifyCodeForm {
  email: string;
  emailCode: string;
}
