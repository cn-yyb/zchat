/*
 * @Author: zq
 * @Date: 2022-10-26 10:53:43
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-10 17:15:56
 * @ vite 插件主体配置文件
 */

import type { PluginOption } from 'vite';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

import { configHtmlPlugin } from './html';
import { autoImportPlugins } from './autoImport';
import { cdnImportPlugin } from './cdnImport';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    Vue(),
    // 新增 JSX 语法支持
    VueJsx(),
    // 支持在scipt标签中使用name属性设置组件名
    VueSetupExtend(),
    // 自动导入插件
    ...autoImportPlugins(),
    // cdn 自动导入
    cdnImportPlugin(),
  ];

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  return vitePlugins;
}
