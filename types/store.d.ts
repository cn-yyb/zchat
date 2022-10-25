declare interface UserInfo {
  userId: string | number;
  username: string;
  realName: string;
  avatar: string;
  desc?: string;
  state: 0;
  gender: number;
  role: number;
  menuCodes: string[];
  funcCodes: string[];
  [x: string]: any;
}
