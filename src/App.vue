<template>
  <van-config-provider :theme-vars="themeVars" class="config-provider">
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts">
  const themeVars = {
    rateIconFullColor: '#7978FF',
    sliderBarHeight: '4px',
    sliderButtonWidth: '20px',
    sliderButtonHeight: '20px',
    sliderActiveBackgroundColor: '#7978FF',
    buttonPrimaryBorderColor: '#7978FF',
    buttonPrimaryBackgroundColor: '#7978FF',
  };
</script>

<style lang="less" scoped>
  .config-provider {
    height: 100%;
    width: 100%;
  }
</style>
