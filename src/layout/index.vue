<template>
  <div class="app-layout">
    <!-- layout hearder => top nav bar & search & other actions -->
    <layout-header :title="headerTitle">
      <template #left>
        <user-status @show-setting="showSetting" />
      </template>
      <template #right>
        <van-icon name="plus" class="nav-bar-icon" />
      </template>
    </layout-header>

    <!-- context body & router view -->
    <router-view />

    <!-- layout footer => bottom nav bar & copyright -->
    <layout-footer />

    <!-- setting page -->
    <setting ref="settingCompRef" />
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from './components/header/index.vue';
  import LayoutFooter from './components/footer/index.vue';
  import UserStatus from './components/header/UserStatus.vue';
  import RouterView from './page/index.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import Setting from '@/views/Setting/index.vue';

  const settingCompRef = ref<InstanceType<typeof Setting> | null>(null);

  const showSetting = () => {
    settingCompRef.value?.showSettingPopup();
  };

  const router = useRouter();
  const headerTitle = ref('');

  watch(
    () => router.currentRoute,
    (currentRoute) => {
      if (currentRoute.value.meta?.hiddenTitle) {
        headerTitle.value = '';
      } else {
        headerTitle.value = currentRoute.value.meta?.title;
      }
    },
    {
      immediate: true,
      deep: true,
    },
  );
</script>

<style lang="less" scoped>
  .nav-bar-icon {
    color: #fff;
    font-size: 0.5rem;
  }
</style>
