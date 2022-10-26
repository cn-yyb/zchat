/*
 * @Author: zq
 * @Date: 2022-10-24 17:40:31
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-26 09:36:31
 * @Desc： 路由守卫配置文件
 */

import { AxiosCanceler } from '@/api/config/axiosCancel';
import { hasCacheToken } from '@/stores/auth';
import type { Router } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { getAppEnvConfig } from '@/utils/env';

const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();

// 路由白名单
export const WHITE_LIST = ['/login', '/404'];

// 挂载路由守卫函数
export function setupRouterGuard(router: Router) {
  createHttpGuard(router);
  createPermissionGuard(router);
  createTitleFixGuard(router);
}

/**
 * The interface used to close the current page to complete the request when the route is switched
 * 切换页面时，将取消所有的正在等待的请求
 * @param router
 */
function createHttpGuard(router: Router) {
  const axiosCanceler = new AxiosCanceler();

  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending();
    return true;
  });
}

/**
 * 权限校验路由守卫，不存在token时，将强制返回登录页面
 * @param router
 */
function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  // 权限拦截
  router.beforeEach(async (to, _from, next) => {
    if (hasCacheToken()) {
      // 2. 判断是否为登录页
      if (to.path === '/login') {
        next('/');
      } else {
        // 解决页面刷新后用户信息丢失问题
        if (!userStore.userInfo) {
          await userStore.refreshUserInfo();
        }
        next();
      }
    } else {
      // 3. 判断是否是白名单内的路由
      if (WHITE_LIST.includes(to.path)) {
        next();
      } else {
        // 记录当前路径,在登录成功后重定向回原来的页面
        next(`/login?redirect=${to.fullPath}`);
      }
    }
  });
}
/**
 * 修改页面标题
 * @param router
 */
function createTitleFixGuard(router: Router) {
  router.afterEach((to) => {
    document.title = VITE_GLOB_APP_TITLE + (to.meta.title ? `-${to.meta.title}` : '');
  });
}
