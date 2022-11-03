import { Layout } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const social: AppRouteModule = {
  name: 'SocialModule',
  path: '/social',
  redirect: '/social',
  component: Layout,
  meta: {
    title: 'Social',
  },
  children: [
    {
      path: '',
      name: 'SocialPage',
      component: () => import('@/views/Social/index.vue'),
      meta: {
        title: 'Social',
        isKeepAlive: true,
      },
    },
  ],
};

export default social;
