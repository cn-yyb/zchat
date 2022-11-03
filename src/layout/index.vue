<template>
  <div class="app-layout">
    <!-- layout hearder => top nav bar & search & other actions -->
    <van-sticky>
      <layout-header :title="headerTitle" v-if="!$route.meta?.hiddenNavBar">
        <template #left>
          <user-status @show-setting="showSetting" v-if="!$route.meta?.showBackBtn" />
          <van-icon v-else name="arrow-left" size="large" color="#fff" @click="$router.back()" />
          <user-status
            v-if="$route.name === 'PrivateChat'"
            is-hidden-avatar
            :user-status="{ nickname: '张三', status: '离线' }"
          />
        </template>
        <template #right>
          <van-icon name="plus" class="nav-bar-icon" />
        </template>
      </layout-header>
    </van-sticky>

    <!-- context body & router view -->
    <router-view />

    <!-- layout footer => bottom nav bar & copyright -->
    <layout-footer />

    <!-- setting page -->
    <user-setting ref="settingCompRef" />
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from './components/header/index.vue';
  import LayoutFooter from './components/footer/index.vue';
  import UserStatus from './components/header/UserStatus.vue';
  import RouterView from './page/index.vue';
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import UserSetting from '@/views/system/User/index.vue';

  const settingCompRef = ref<InstanceType<typeof UserSetting> | null>(null);

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
  .app-layout {
    .nav-bar-icon {
      color: #fff;
      font-size: 0.5rem;
    }
    height: 100%;
    width: 100%;
  }
</style>
