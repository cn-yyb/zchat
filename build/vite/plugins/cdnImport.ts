/*
 * @Author: zq
 * @Date: 2023-01-10 17:00:14
 * @Last Modified by: zq
 * @Last Modified time: 2023-01-10 18:20:28
 */
import importToCDN from 'vite-plugin-cdn-import';

const CDN_BASE_URL = 'https://cdn.jsdelivr.net/npm/';

export function createCdnUrl(cdnPath: string): string {
  return `${CDN_BASE_URL}${cdnPath}`;
}

export function cdnImportPlugin() {
  return importToCDN({
    modules: [
      {
        name: 'vue',
        var: 'Vue',
        path: createCdnUrl('vue@3.2.38/dist/vue.global.prod.js'),
      },
      {
        name: 'axios',
        var: 'axios',
        path: createCdnUrl('axios@1.1.3/dist/axios.min.js'),
      },
      {
        name: 'vue-demi',
        var: 'VueDemi',
        path: createCdnUrl('vue-demi@0.13.11/lib/index.iife.min.js'),
      },
      {
        name: 'pinia',
        var: 'Pinia',
        path: createCdnUrl('pinia@2.0.21/dist/pinia.iife.min.js'),
      },
      {
        name: 'vue-router',
        var: 'VueRouter',
        path: createCdnUrl('vue-router@4.1.5/dist/vue-router.global.min.js'),
      },
      {
        name: 'dayjs',
        var: 'dayjs',
        path: createCdnUrl('dayjs@1.11.6/dayjs.min.js'),
      },
      {
        name: 'crypto-js',
        var: 'crypto-js',
        path: createCdnUrl('crypto-js@4.1.1/index.min.js'),
      },
      {
        name: 'vant',
        var: 'Vant',
        path: createCdnUrl('vant@3.6.4/lib/vant.min.js'),
        css: createCdnUrl('vant@3.6.4/lib/index.css'),
      },
    ],
  });
}
