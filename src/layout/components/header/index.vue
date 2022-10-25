<template>
  <div class="layout-header">
    <van-nav-bar :title="title" />
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
