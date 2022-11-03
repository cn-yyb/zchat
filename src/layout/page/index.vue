<template>
  <RouterView>
    <template #default="{ Component, route }">
      <transition name="fade" mode="out-in" appear>
        <keep-alive :include="cacheList">
          <component :name="route.name" :is="Component" :key="route.fullPath" />
        </keep-alive>
        <!-- <component v-else :is="Component" :key="route.fullPath" /> -->
      </transition>
    </template>
  </RouterView>
</template>
<script lang="ts" setup>
  import { useRouteCacheStore } from '@/stores/modules/routeCache';

  const routeCacheStore = useRouteCacheStore();

  const cacheList = routeCacheStore.getCacheList;
</script>

<style lang="less" scoped>
  .fade-enter-active {
    transition: all 0.25s ease-out;
    // transition-delay: 0.4s; // 或使用 mode="out-in"
  }

  .fade-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .fade-enter-from {
    transform: translateX(-20px);
    opacity: 1;
  }
  .fade-leave-to {
    transform: translateX(20px);
    opacity: 0.5;
  }
</style>
