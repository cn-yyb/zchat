export interface UserLoginForm {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
}

export interface UserRegisterForm {
  accountName: string;
  password: string;
  repassword: string;
  email: string;
  gender: number;
  birthday: string;
  emailCode: string;
}

export interface UserInfoResponse {
  userId: number;
  uid: string;
  accountName: string;
  nickName: string;
  realName: string;
  email: string;
  mobile: string;
  role: number;
  status: number;
  bio: string;
  gender: number;
  birthday: string;
  city: string;
  province: string;
  address: string;
  sign: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserInfoForm {
  username?: string;
  uid?: string;
  usreId?: number;
}
