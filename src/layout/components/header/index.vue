<template>
  <div class="layout-header">
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

  const { autoFix } = useTextOverFlow(6);
</script>

<style lang="" scoped></style>
