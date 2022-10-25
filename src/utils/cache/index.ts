/*
 * @Author: zq
 * @Date: 2022-10-24 16:12:22
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-24 17:05:49
 * @desc：创建缓存对象
 */
import { createStorage as create } from './createStorage';
import type { CreateStorageParams } from './createStorage';
import { enableStorageEncryption } from '@/settings/encryptionSetting';
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting';
import { getStorageShortName } from '@/utils/env';

export type Options = Partial<CreateStorageParams>;

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // No encryption in debug mode
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const WebStorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export default WebStorage;
