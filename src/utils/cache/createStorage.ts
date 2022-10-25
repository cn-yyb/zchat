/*
 * @Author: zq
 * @Date: 2022-10-24 15:04:00
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-24 16:56:17
 * @desc: 本地数据缓存
 */

import { cacheCipher } from '@/settings/encryptionSetting';
import type { EncryptionParams } from '@/utils/cipher';
import { AesEncryption } from '@/utils/cipher';
import { isNullOrUnDef } from '@/utils/is';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

export interface WebStorageOptions {
  storage: Storage;
  prefixKey?: string;
  encryption: AesEncryption;
  hasEncrypt: boolean;
  timeout: Nullable<number>;
}

export interface WebStorageObject {
  get: (key: string, def?: any) => any;
  set: (key: string, value: any, expire?: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

/**
 * Cache class
 * Construction parameters can be passed into sessionStorage, localStorage,
 * @class Cache
 * @example
 */
class WebStorage {
  private storage: Storage;
  private prefixKey?: string;
  private encryption: AesEncryption;
  private hasEncrypt: boolean;
  private timeout: Nullable<number>;
  /**
   *
   * @param {*} storage
   */
  constructor(options: WebStorageOptions) {
    this.storage = options.storage;
    this.prefixKey = options.prefixKey;
    this.encryption = options.encryption;
    this.hasEncrypt = options.hasEncrypt;
    this.timeout = options.timeout;
  }

  private getKey(key: string) {
    return `${this.prefixKey}${key}`.toUpperCase();
  }

  /**
   * Set cache
   * @param {string} key
   * @param {*} value
   * @param {*} expire Expiration time in seconds
   * @memberof Cache
   */
  set(key: string, value: any, expire: number | null = this.timeout) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
    });
    const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
    this.storage.setItem(this.getKey(key), stringifyValue);
  }

  /**
   * Read cache
   * @param {string} key
   * @param {*} def
   * @memberof Cache
   */
  get(key: string, def: any = null): any {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;

    try {
      const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
      const data = JSON.parse(decVal);
      const { value, expire } = data;
      if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
        return value;
      }
      this.remove(key);
    } catch (e) {
      return def;
    }
  }

  /**
   * Delete cache based on key
   * @param {string} key
   * @memberof Cache
   */
  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * Delete all caches of this instance
   */
  clear(): void {
    this.storage.clear();
  }
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  return new WebStorage({
    encryption,
    storage,
    prefixKey,
    hasEncrypt,
    timeout,
  }) as WebStorageObject;
};
