import { getUserInfo, userLogin } from '@/api/modules/user';
import { defineStore } from 'pinia';
import { router } from '@/router';
import { getCacheToken, setCacheToken } from '../auth';
import { PageEnum } from '@/constants/enums/pageEnum';
import type { UserLoginForm } from '@/api/modules/types/user';

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
    async loign(submitForm: UserLoginForm): Promise<UserInfo | null> {
      try {
        const { token } = await userLogin(submitForm);
        this.setToken(token);
        router.push('/');
        return this.refreshUserInfo(submitForm.username);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    logout() {
      // 清除用户信息和token, 并重新返回登录页面
      this.setToken('');
      this.userInfo = null;
      router.push('/login');
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

    async refreshUserInfo(username: string): Promise<Nullable<UserInfo>> {
      try {
        const userInfo = (await getUserInfo({
          username,
        })) as unknown as UserInfo;

        this.userInfo = userInfo;
        return userInfo;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
});
