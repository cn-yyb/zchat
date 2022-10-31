<template>
  <div class="copyright-info" :style="style">Copyright © 2021-2022 xx All Rights Reserved.</div>
</template>

<script lang="ts" setup>
  import type { StyleValue, PropType } from 'vue';

  defineProps({
    style: {
      type: Object as PropType<StyleValue>,
      default: () => {},
    },
  });
</script>

<style lang="less" scoped>
  .copyright-info {
    text-align: center;
    position: fixed;
    font-size: 12px;
    color: #fff;
    bottom: 4px;
    left: 0;
    right: 0;
  }
</style>
