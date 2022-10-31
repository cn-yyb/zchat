<template>
  <van-popup v-model:show="isShow" position="left" :style="{ width: '80%', height: '100%' }">
    <van-empty description="User & System Settings 模块未开发" />
  </van-popup>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const isShow = ref(false);

  const showSettingPopup = () => (isShow.value = true);
  defineExpose({
    showSettingPopup,
  });
</script>

<style lang="" scoped></style>
