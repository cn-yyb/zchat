/*
 * @Author: zq
 * @Date: 2022-11-01 15:28:27
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-01 15:35:01
 */

export interface NavItem {
  title: string;
  icon: string;
  path: string;
}

export default function useUserSettingData() {
  function getBottomNavItem(): NavItem[] {
    return [
      {
        title: '设置',
        icon: 'mdi-light:cog',
        path: '/setting',
      },
      {
        title: '天气',
        icon: 'mdi-light:cloud',
        path: '/weather',
      },
    ];
  }
  return {
    getBottomNavItem,
  };
}
