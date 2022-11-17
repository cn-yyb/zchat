<template>
  <div class="layout-header">
    <van-sticky>
      <van-nav-bar safe-area-inset-top>
        <template #title>
          <slot name="title">{{ autoFix(title) }}</slot>
        </template>
        <template #left>
          <slot name="left"></slot>
        </template>
        <template #right>
          <slot name="right"></slot>
        </template>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script lang="ts" setup>
  import useTextOverFlow from '@/hooks/component/useTextOverFlow';

  defineProps({
    title: {
      type: String,
      default: '',
    },
  });

  const { autoFix } = useTextOverFlow(16);
</script>

<style lang="less" scoped></style>
