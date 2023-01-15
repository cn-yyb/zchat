<template>
  <van-config-provider :theme-vars="THEME_VARS" class="config-provider">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
  import { THEME_VARS } from '@/constants/modules/theme';
  import { onMounted } from 'vue';
  import useLocalStorage from './hooks/component/useLocalStorage';

  const winh = useLocalStorage('curwinh', window.innerHeight);

  onMounted(() => {
    window.onresize = function () {
      document.getElementById('app')!.style.height = winh.value + 'px';
    };
  });
</script>

<style lang="less" scoped>
  .config-provider {
    height: 100%;
    width: 100%;
  }
</style>
