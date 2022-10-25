/*
 * @Author: zq
 * @Date: 2022-10-25 14:47:46
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-25 15:05:39
 * @desc: layout setting
 */
export interface TabbarItem {
  title: string;
  path: string;
  icon: string;
  key: string;
  isHidden?: boolean;
  isShowDot?: boolean;
  badge?: number;
}

export const tabbarItemsData: TabbarItem[] = [
  {
    key: 'home',
    title: '消息',
    path: '/home',
    icon: 'chat-o',
  },
  {
    key: 'contacts',
    title: '联系人',
    path: '/contacts',
    icon: 'friends-o',
  },
  {
    key: 'applets',
    title: '应用',
    path: '/applets',
    icon: 'apps-o',
  },
  {
    key: 'social',
    title: '动态',
    path: '/social',
    icon: 'link-o',
  },
];
