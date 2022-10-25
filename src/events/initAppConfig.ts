/*
 * @Author: zq
 * @Date: 2022-10-25 14:51:22
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-25 15:09:25
 * @desc: 初始化系统配置信息（主题，布局, 国际化等等）
 */
import type { App } from 'vue';
import { useAppStore } from '@/stores/modules/app';

export function initAppConfig(_app: App) {
  const appStore = useAppStore();
  // 初始化 appStore 基础数据
  appStore.initSetting();
}
