/*
 * @Author: zq
 * @Date: 2022-10-24 18:06:11
 * @Last Modified by: zq
 * @Last Modified time: 2022-11-01 17:26:00
 * @desc: 路由常量
 */
// 权限路由白名单
export const WHITE_LIST = ['/login', '/404'];

export const Layout = () => import('@/layout/index.vue');

export const NotFound = () => import('@/views/system/NotFound/index.vue');

export const RootRouteComp = () => import('@/layout/page/index.vue');
