/*
 * @Author: zq
 * @Date: 2022-10-25 14:44:44
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-25 16:15:53
 * @desc: 项目全局配置文件
 */
import type { TabbarItem } from '@/settings/layoutSetting';
import { tabbarItemsData } from '@/settings/layoutSetting';
import { defineStore } from 'pinia';

export interface AppState {
  layout: {
    activeTab: string;
    tabbar: TabbarItem[];
    header: any;
  };
  theme?: any;
}

export const useAppStore = defineStore({
  id: 'app-setting',
  state: (): AppState => ({
    layout: {
      activeTab: '',
      tabbar: [],
      header: {},
    },
  }),
  getters: {
    getTabbarItems(): TabbarItem[] {
      return this.layout.tabbar;
    },
  },
  actions: {
    initSetting() {
      this.layout.tabbar = tabbarItemsData.filter((v) => !v.isHidden);
    },
  },
});
