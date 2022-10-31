<template>
  <div class="layout-header">
    <van-nav-bar safe-area-inset-top>
      <template #title>
        <slot name="title">{{ title }}</slot>
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
  defineProps({
    title: {
      type: String,
    },
  });
</script>

<style lang="" scoped></style>
