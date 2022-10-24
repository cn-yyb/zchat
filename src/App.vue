<template>
  <van-config-provider :theme-vars="themeVars" class="config-provider">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
  import { themeVars } from '@/constants/modules/theme';
</script>

<style lang="less" scoped>
  .config-provider {
    height: 100%;
    width: 100%;
  }
</style>
