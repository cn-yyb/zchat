<template>
  <div class="layout-header">
    <van-nav-bar :title="title" safe-area-inset-top />
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
