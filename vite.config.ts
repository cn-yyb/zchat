import { fileURLToPath, URL } from "node:url";

import { loadEnv, type ConfigEnv, type UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// import { resolve } from "path";
// function pathResolve(dir: string) {
//   return resolve(process.cwd(), ".", dir);
// }

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const isBuild = command === "build";

  console.log(isBuild);

  return {
    base: "/",
    root,
    server: {
      https: false,
      host: true,
      port: Number(env.VITE_PORT),
      // proxy: [],
    },
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
};
