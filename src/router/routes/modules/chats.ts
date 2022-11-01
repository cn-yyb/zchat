/*
 * @Author: zq
 * @Date: 2022-11-01 17:16:42
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-01 17:26:52
 */
import { RootRouteComp } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const chats: AppRouteModule = {
  name: 'ChatsModule',
  path: '/chats',
  component: RootRouteComp,
  redirect: '/private',
  meta: {
    title: 'chats',
  },
  children: [
    {
      path: 'private',
      name: 'PrivateChat',
      component: () => import('@/views/ChatRoom/PrivateChat.vue'),
      meta: {
        title: 'PrivateChat',
        isKeepAlive: true,
      },
    },
    {
      path: 'group',
      name: 'GroupChat',
      component: () => import('@/views/ChatRoom/GroupChat.vue'),
      meta: {
        title: 'GroupChat',
        isKeepAlive: true,
      },
    },
  ],
};

export default chats;
