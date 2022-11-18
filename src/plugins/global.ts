/*
 * @Author: zq
 * @Date: 2022-10-20 11:32:39
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-18 11:18:11
 * @desc: 全局指令，方法，变量，mixin 注册插件
 */

import type { App, Plugin } from 'vue';
import LayoutHeader from '@/layout/components/header/index.vue';

function setupGlobalComp(app: App) {
  app.component('LayoutHeader', LayoutHeader);
}

function setupGlobalDirectives(_app: App) {}

function setupGlobalFuncAndVar(_app: App) {}

function setupGlobalMixin(_app: App) {}

export const globalPlugin: Plugin = {
  install(app: App) {
    // 挂载全局组件
    setupGlobalComp(app);
    // 挂载全局指令
    setupGlobalDirectives(app);
    // 挂载全局方法 & 变量
    setupGlobalFuncAndVar(app);
    // 添加全局混入
    setupGlobalMixin(app);
  },
};

export function setupGlobPlugin(app: App) {
  app.use(globalPlugin);
}
