/*
 * @Author: zq
 * @Date: 2022-10-26 10:53:43
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-30 18:29:26
 * @ vite 插件主体配置文件
 */

import type { PluginOption } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { configHtmlPlugin } from './html';
import { autoImportPlugin } from './autoImport';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    // 新增 JSX 语法支持
    VueJsx(),
    // 自动导入插件
    ...autoImportPlugin(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}
