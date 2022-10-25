import { userLogin } from '@/api/modules/login';
import { defineStore } from 'pinia';
import { router } from '@/router';
import { getCacheToken, setCacheToken } from '../auth';
import { PageEnum } from '@/constants/enums/pageEnum';

interface LoginFormType {
  username: string;
  password: string;
}

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  refreshToken?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    userInfo: null,
    token: undefined,
    refreshToken: undefined,
  }),
  getters: {
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo;
    },
    getToken(): string {
      if (!this.token) {
        this.token = getCacheToken();
      }
      return this.token || '';
    },
  },
  actions: {
    async loign(submitForm: LoginFormType): Promise<UserInfo | null> {
      try {
        const userinfo = await userLogin(submitForm);
        this.setToken(userinfo.token);
        router.push('/');
        return userinfo;
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async afterLoginAction() {
      try {
        await router.replace(
          (router.currentRoute.value.query.redirect as string) || PageEnum.BASE_HOME,
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },

    setToken(token: string) {
      this.token = token || '';
      setCacheToken(token);
    },

    async refreshUserInfo(): Promise<Nullable<UserInfo>> {
      return null;
    },
  },
});
