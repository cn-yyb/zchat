import { Layout } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const contacts: AppRouteModule = {
  name: 'ContactsModule',
  path: '/contacts',
  redirect: '/contacts',
  component: Layout,
  meta: {
    title: 'Contacts',
  },
  children: [
    {
      path: '',
      name: 'ContactsPage',
      component: () => import('@/views/Contacts/index.vue'),
      meta: {
        title: 'Contacts',
        isKeepAlive: true,
      },
    },
  ],
};

export default contacts;
