/*
 * @Author: zq
 * @Date: 2022-11-01 17:16:42
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-02 11:17:05
 */
import { RootRouteComp } from '@/router/constant';
import type { AppRouteModule } from '@/router/types';

const chats: AppRouteModule = {
  name: 'ChatsModule',
  path: '/chats',
  component: RootRouteComp,
  meta: {
    title: 'Chats',
  },
  children: [
    {
      path: 'private',
      name: 'PrivateChat1',
      component: () => import('@/views/ChatRoom/PrivateChat.vue'),
      meta: {
        title: 'PrivateChat',
        isKeepAlive: true,
      },
    },
    {
      path: 'group',
      name: 'GroupChat2',
      component: () => import('@/views/ChatRoom/GroupChat.vue'),
      meta: {
        title: 'GroupChat',
        isKeepAlive: true,
      },
    },
  ],
};

export default chats;
