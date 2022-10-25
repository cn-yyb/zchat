/*
 * @Author: zq
 * @Date: 2022-10-24 16:54:20
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-25 10:31:02
 */

import { CACHE_KEYS } from '@/constants/enums/cacheKeysEnum';
import { createLocalStorage } from '@/utils/cache';

const tokenCacheStorage = createLocalStorage({});

export const getCacheToken = () => tokenCacheStorage.get(CACHE_KEYS.TOKEN_KEY);

export const setCacheToken = (token: string) => tokenCacheStorage.set(CACHE_KEYS.TOKEN_KEY, token);

export const removeCacheToken = () => tokenCacheStorage.get(CACHE_KEYS.TOKEN_KEY);

export const hasCacheToken = () => !!getCacheToken();
