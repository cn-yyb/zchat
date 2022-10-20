/*
 * @Author: zq
 * @Date: 2022-10-20 11:32:39
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-20 11:36:59
 * @desc: 全局指令，方法，变量，mixin 注册插件
 */

import type { App, Plugin } from 'vue';

const globalPlugin: Plugin = {
  install(_app: App) {},
};

export default globalPlugin;
