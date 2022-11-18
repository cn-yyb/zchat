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
    // 是否缓存当前路由组件
    isKeepAlive?: boolean;
    // 是否展示顶部默认navbar（默认不展示）
    showNavBar?: boolean;
    // 是否隐藏返回按钮
    hiddenBackBtn?: boolean;
    // 是否隐藏头部导航区的标题
    hiddenTitle?: boolean;
    // 是否隐藏底部导航栏
    hiddenTabbar?: boolean;
  }
}
