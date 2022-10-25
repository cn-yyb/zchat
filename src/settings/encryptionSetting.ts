/*
 * @Author: zq
 * @Date: 2022-10-24 15:33:42
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-24 16:27:52
 * @desc: 项目数据加密密钥配置
 */

import { isDevMode } from '@/utils/env';

// 系统默认缓存时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

// 缓存加密密钥
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

// 生产模式进行数据加密处理
export const enableStorageEncryption = !isDevMode();
