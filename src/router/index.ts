import type { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'index',
      path: '/',
      component: () => import('@/layout/index.vue'),
      children: [
        {
          name: 'home',
          path: 'home',
          component: () => import('@/views/system/Home/index.vue'),
        },
      ],
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/system/Login/index.vue'),
    },
  ],
});

export function setupRouter(app: App) {
  app.use(router);
}
