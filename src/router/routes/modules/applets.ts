import { Layout } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const applets: AppRouteModule = {
  name: 'AppletsModule',
  path: '/applets',
  redirect: '/applets',
  component: Layout,
  meta: {
    title: 'Applets',
  },
  children: [
    {
      path: '',
      name: 'AppletsPage',
      component: () => import('@/views/Applets/index.vue'),
      meta: {
        title: 'Applets',
      },
    },
  ],
};

export default applets;
