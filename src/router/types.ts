/*
 * @Author: zq
 * @Date: 2022-10-24 19:10:33
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-25 16:53:13
 */
import type { RouteRecordRaw, RouteMeta } from 'vue-router';
import type { Component } from 'vue';

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  props?: Recordable;
  fullPath?: string;
}

export type AppRouteModule = AppRouteRecordRaw;
