<template>
  <div class="layout-footer">
    <van-tabbar v-model="activeKey" route safe-area-inset-bottom>
      <van-tabbar-item
        v-for="tabItem of appStore.getTabbarItems"
        :key="tabItem.key"
        :icon="tabItem.icon"
        :name="tabItem.key"
        :to="tabItem.path"
        :dot="tabItem.isShowDot"
        :badge="tabItem.badge"
      >
        {{ tabItem.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/modules/app';
  import useLocalStorage from '@/hooks/component/useLocalStorage';

  const appStore = useAppStore();
  const activeKey = useLocalStorage<string>(
    'ACTIVE_TABKEY',
    appStore.getTabbarItems[0].key || '',
    (value) => {
      appStore.layout.activeTab = value || appStore.getTabbarItems[0].key || '';
    },
  );
</script>

<style lang="" scoped></style>
