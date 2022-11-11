/*
 * @Author: zq
 * @Date: 2022-10-25 15:41:47
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-25 15:49:48
 */
import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';
import type { AppState } from '@/stores/modules/app';

const appCacheStorage = createLocalStorage({});

export const getAppSettingCache = (): Nullable<AppState> =>
  JSON.parse(appCacheStorage.get(CACHE_KEYS.APP_SETTING)) || null;

export const setAppSettingCache = (appSetting: AppState) =>
  appCacheStorage.set(CACHE_KEYS.APP_SETTING, JSON.stringify(appSetting));

export const removeAppSettingCache = () => appCacheStorage.remove(CACHE_KEYS.APP_SETTING);
