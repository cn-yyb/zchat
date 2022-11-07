/*
 * @Author: zq
 * @Date: 2022-10-24 19:01:39
 * @Last Modified by: zq
 * @Last Modified time: 2022-10-25 11:32:54
 * @desc: 基础路由
 */
import { NotFound } from '../constant';
import type { AppRouteRecordRaw } from '../types';

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/system/Login/index.vue'),
  meta: {
    title: '登录',
  },
};

export const RegisterRoute: AppRouteRecordRaw = {
  path: '/register',
  name: 'Register',
  component: () => import('@/views/system/Register/index.vue'),
  meta: {
    title: '注册',
  },
};

export const NotFoundRoute: AppRouteRecordRaw = {
  name: 'NotFound',
  path: '/:path(.*)*',
  component: NotFound,
  meta: {
    title: 'Not Found.',
  },
};

export const basicRouteList = [RootRoute, LoginRoute, NotFoundRoute, RegisterRoute];
