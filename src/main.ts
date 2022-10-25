import { createApp } from 'vue';
import App from './App.vue';

import { setupRouter } from './router';
import { setupStore } from '@/stores';

import { setupGlobPlugin } from './plugins/global';
import { setupGlobDirectives } from './directives';
import { registerGlobComp } from '@/components/registerGlobalComp';

// 新增浏览器适配
import 'lib-flexible';
// 适配PC端 mouse 事件
import '@vant/touch-emulator';

import './assets/main.css';
import { initAppConfig } from './events/initAppConfig';

async function bootstrap() {
  const app = createApp(App);

  // 配置 pinia store
  setupStore(app);

  // 初始化系统配置
  initAppConfig(app);

  // 配置路由
  setupRouter(app);

  // 挂载全局插件
  setupGlobPlugin(app);

  // 注册全局指令
  setupGlobDirectives(app);

  // 注册全局组件
  registerGlobComp(app);

  app.mount('#app');
}
bootstrap();
