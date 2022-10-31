<template>
  <div class="not-found">
    <layout-header title="404" />
    <van-empty description="抱歉，当前页面不存在！">
      <van-button round type="primary" class="bottom-button" to="/">返回首页</van-button>
    </van-empty>
    <copyright :style="{ color: '#aaa' }" />
  </div>
</template>

<script lang="ts" setup>
  import LayoutHeader from '@/layout/components/header/index.vue';
  import copyright from '@/layout/components/copyright/index.vue';
</script>

<style lang="less" scoped>
  .bottom-button {
    width: 160px;
    height: 40px;
  }
</style>
