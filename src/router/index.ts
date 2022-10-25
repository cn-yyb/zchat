import type { App } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { setupRouterGuard } from './guard';
import { basicRoutes } from './routes';

export * from './routes';
export * from './constant';
export * from './types';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  // 切换页面后重置页面滚动条
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 挂载路由守卫
  setupRouterGuard(router);
}
