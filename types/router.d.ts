export {};

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // title
    title: string;
    // role info
    roles?: RoleEnum[];
    // 不进行缓存
    ignoreKeepAlive?: boolean;
    // 自定义路由权限标识
    menuCode?: string | string[];
    // 是否隐藏头部导航区的标题
    hiddenTitle?: boolean;
  }
}
