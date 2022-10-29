/*
 * @Author: zq
 * @Date: 2022-10-26 10:53:43
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-29 16:38:08
 * @ vite 插件主体配置文件
 */

import type { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { configHtmlPlugin } from './html';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue(),
    // 新增 JSX 语法支持
    vueJsx(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}
