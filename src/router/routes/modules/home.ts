import { Layout } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const home: AppRouteModule = {
  name: 'HomeModule',
  path: '/home',
  redirect: '/home',
  component: Layout,
  meta: {
    title: 'Home',
  },
  children: [
    {
      path: '',
      name: 'HomePage',
      component: () => import('@/views/system/Home/index.vue'),
      meta: {
        title: 'Home',
        // hiddenTitle: true,
      },
    },
  ],
};

export default home;
