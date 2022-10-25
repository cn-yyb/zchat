import { Layout } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const setting: AppRouteModule = {
  name: 'SettingModule',
  path: '/setting',
  redirect: '/setting',
  component: Layout,
  meta: {
    title: 'Setting',
  },
  children: [
    {
      path: '',
      name: 'SettingPage',
      component: () => import('@/views/Setting/index.vue'),
      meta: {
        title: 'Setting',
      },
    },
  ],
};

export default setting;
