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
    // 是否缓存当前路由组件
    isKeepAlive?: boolean;
    // 是否显示返回按钮
    isShowBackBtn?: boolean;
    // 是否隐藏顶部navbar
    isHiddenNavBar?: boolean;
  }
}
