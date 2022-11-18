/*
 * @Author: zq
 * @Date: 2022-11-12 13:58:10
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-12 13:59:21
 */
import type { Component } from 'vue';

export interface TabItem {
  title: string;
  key: string;
  component: Component;
  icon: Component | string;
}

export function useContactsPageData() {
  function getTabList() {
    return [] as TabItem[];
  }

  return {
    getTabList,
  };
}
