import { fileURLToPath, URL } from 'node:url';

import { loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// import { resolve } from "path";
// function pathResolve(dir: string) {
//   return resolve(process.cwd(), ".", dir);
// }

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const isBuild = command === 'build';

  console.log(isBuild, mode);

  return {
    base: '/',
    root,
    server: {
      https: false,
      host: true,
      port: Number(env.VITE_PORT),
      // proxy: [],
    },
    plugins: [
      vue(),
      // JSX 语法支持
      vueJsx(),
      // vant 组件按需导入
      Components({
        resolvers: [VantResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '#': fileURLToPath(new URL('./types', import.meta.url)),
      },
    },
    define: {
      'process.env': env,
    },
  };
};
