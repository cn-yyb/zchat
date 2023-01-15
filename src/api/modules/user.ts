/*
 * @Author: zq
 * @Date: 2023-01-12 14:42:26
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-15 11:27:47
 * @Dest: 用户相关接口
 */

import type { ErrorMessageMode } from '#/axios';
import { http } from '../config';
import type {
  UserLoginForm,
  UserLoginResponse,
  UserRegisterForm,
  UserInfoResponse,
} from './types/user';

enum Api {
  LOGIN = '/user/login',
  REGISTER = '/user/register',
  USER_INFO = '/user/getUserInfo',
}

/**
 * @description: user login api
 */
export function userLogin(data: UserLoginForm, mode: ErrorMessageMode = 'notify') {
  return http.post<UserLoginResponse>(
    {
      url: Api.LOGIN,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user register
 */
export function userRegister(data: UserRegisterForm, mode: ErrorMessageMode = 'notify') {
  return http.post<any>(
    {
      url: Api.REGISTER,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: get user info
 */
export function getUserInfo(data = {}, mode: ErrorMessageMode = 'notify') {
  return http.post<UserInfoResponse>(
    {
      url: Api.USER_INFO,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}
