import type { ErrorMessageMode } from '#/axios';
import { http } from '../config';

enum Api {
  LOGIN = '/user/login',
}
/**
 * @description: user login api
 */
export function userLogin(
  params: { username: string; password: string },
  mode: ErrorMessageMode = 'modal',
) {
  return http.post<any>(
    {
      url: Api.LOGIN,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
